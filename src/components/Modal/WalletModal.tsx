import cn from "classnames";
import { useWallet, Wallet } from "@solana/wallet-adapter-react";
import { WalletIcon } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { WalletName } from "@solana/wallet-adapter-base";
import { fetchWithAuth, setAuthToken } from "@/utils/setAuthToken";
import { getBalance } from "@/utils/common";
import { useUserProvider } from "@/contexts/UserContext";

interface CustomWalletModalProps {
    isOpen: boolean;
    onClose: () => void;
}

let AUTOCONNECT_ATTEMPTED = false;

const WalletModal: React.FC<CustomWalletModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [customWallets, setCustomWallet] = useState<Wallet[]>([]);

    const {setIsSign, setSolBalance, setUserInfo} = useUserProvider();
    const { wallets, connected, publicKey, select } = useWallet();

    const handleSign = (data: WalletName<string>) => {
        select(data);
        onClose()
    }

    useEffect(() => {
        if (typeof window == "undefined" || !window.location) return;

        const url = new URL(window.location.href);
        if (!url.searchParams.has("connectWallet")) return;

        const connectWallet = url.searchParams.get("connectWallet");
        for (const wallet of customWallets)
            if (wallet.adapter.name === connectWallet) {
                if (AUTOCONNECT_ATTEMPTED) break;
                AUTOCONNECT_ATTEMPTED = true;
                select(wallet.adapter.name);
                url.searchParams.delete("connectWallet");
                window.history.pushState(null, "", url.toString());
                break;
            }
    }, [
        typeof window == "undefined" ? undefined : window.location.search,
        customWallets,
    ]);

    useEffect(() => {
        setCustomWallet(wallets);
    }, [wallets]);

    useEffect(() => {
        const getUser = async () => {
            if (publicKey) {
                const res = await fetchWithAuth(`/api/auth/check/${publicKey.toBase58()}`, {
                    method: 'GET',
                })
                if (res) {
                    console.log("🚀 ~ getUser ~ res:", res);
                    setAuthToken(res.token);
                    localStorage.setItem('userInfo', JSON.stringify(res.user));
                    setUserInfo(res.user);
                    // setOnlineUsers(res.number);
                    // localStorage.setItem('onlineUsers', JSON.stringify(res.number));
                    setIsSign(false);
                    const balance = await getBalance(publicKey)
                    setSolBalance(balance)
                } else {
                    setIsSign(true);
                }
            }
        }

        getUser();
    }, [connected, publicKey])

    return (
        <div
            id="global-modal"
            className={cn(
                `${isOpen ? "block" : "hidden"}`
            )}
        >
            <div
                className={`fixed top-0 left-0 w-full h-full bg-[#0C122C]/80 z-[1000] transition-opacity duration-300 opacity-100`}
                onClick={() => onClose()}
            />

            <div className="w-fit h-max absolute inset-0 m-auto z-[1001] transition-all duration-300 scale-100 opacity-100">
                <div className="relative p-[2px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#1e293a] to-[#232425]">
                    <div className="relative w-full h-full rounded-2xl bg-layer">
                        <div className="flex flex-col p-8 gap-5 w-[320px] 3xs:w-[365px] md:w-[420px] h-auto overflow-y-scroll relative">
                            <div className="flex items-center justify-between w-full">
                                <h4 className="text-4xl uppercase font-racing leading-[30px]">Connection</h4>
                                    <img src="/images/icon.gif" className="object-cover object-center w-[56px] gb-blur-image" alt=""></img>
                            </div>
                            <div className="flex flex-col gap-3">
                                {customWallets.map((wallet) => (
                                    <button
                                        key={wallet.adapter.name}
                                        className="group relative min-w-10 overflow-hidden transition duration-300 text-sm font-medium text-white rounded-lg flex justify-start items-center gap-2 bg-gradient-wallet-btn border border-[#57667F] w-full h-[44px] px-3 cursor-pointer"
                                        onClick={() => handleSign(wallet.adapter.name)}
                                    >
                                        <WalletIcon wallet={wallet} className="w-6 h-6 mr-3" />
                                        <span className="font-bold text-[18px] leading-5">{wallet.adapter.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default WalletModal;
