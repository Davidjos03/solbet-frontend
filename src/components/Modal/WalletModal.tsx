import cn from "classnames";
import { useWallet, Wallet } from "@solana/wallet-adapter-react";
import { WalletIcon } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";

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

    const { wallets, select } = useWallet();

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

    return (
        <div
            id="global-modal"
            className={cn(
                `${isOpen ? "block" : "hidden"}`
            )}
        >
            <div
                className={`fixed top-0 left-0 w-full h-full bg-[#0D0D0D]/75 z-[1000] transition-opacity duration-300 opacity-100`}
                onClick={() => onClose()}
            />

            <div className="w-fit h-max absolute inset-0 m-auto z-[1001] transition-all duration-300 scale-100 opacity-100">
                <div className="relative p-[2px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#1e293a] to-[#232425]">
                    <div className="relative w-full h-full rounded-2xl main-background">
                        <div className="flex flex-col p-8 gap-5 w-[320px] 3xs:w-[365px] md:w-[420px] h-auto overflow-y-scroll relative">
                            <div className="flex items-center justify-between w-full">
                                <h1 className="font-extrabold text-2xl text-white max-w-[200px]">Connection</h1>
                                <img src="/images/icon.png" alt="" className='object-cover object-center w-[60px]' />
                            </div>
                            <div className="flex flex-col gap-3">
                                {customWallets.map((wallet) => (
                                    <button
                                        key={wallet.adapter.name}
                                        className="group relative min-w-10 overflow-hidden transition duration-300 text-sm font-medium text-white rounded-lg flex justify-start items-center gap-2 bg-[#070f27] hover:bg-[#2b2b2b] border-0 w-full h-[44px] px-3 cursor-pointer"
                                        onClick={() => {
                                            select(wallet.adapter.name);
                                            onClose();
                                        }}
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
