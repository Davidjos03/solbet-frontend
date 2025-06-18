import { useWalletProvider } from "@/contexts/WalletContext";
// import api from "@/utils/auth";
// import setAuthToken from "@/utils/setAuthToken";
import { Icon } from "@iconify-icon/react";
import { useWallet } from "@solana/wallet-adapter-react";
import cn from "classnames";
import { useEffect, useState } from "react";
import { DropDownProfile } from "../Dropdown";
import { useUserProvider } from "@/contexts/UserContext";
import { setAuthToken, fetchWithAuth } from "@/utils/setAuthToken";

const PreHeader = () => {
    const [isHidden, setIsHidden] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const SCROLL_THRESHOLD = 10;

    const { userInfo, setUserInfo, setIsSign } = useUserProvider();
    const { setIsModalOpen } = useWalletProvider();
    const wallet = useWallet();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Check if at top of page
            const atTop = currentScrollY <= 0;
            setIsAtTop(atTop);

            // Ignore tiny scrolls
            if (Math.abs(currentScrollY - lastScrollY) < SCROLL_THRESHOLD) return;

            // Scroll down - hide header
            if (currentScrollY > lastScrollY && !isHidden && !atTop) {
                setIsHidden(true);
            }
            // Scroll up - show header
            else if (currentScrollY < lastScrollY && isHidden) {
                setIsHidden(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHidden, lastScrollY]);

    useEffect(() => {
        if (wallet.connected && !wallet.connecting) {
            const getUser = async () => {
                const address = wallet.publicKey?.toBase58();
                const res = await fetchWithAuth(`/api/auth/check/${address}`, {
                    method: 'GET',
                })
                console.log("🚀 ~ getUser ~ res:", res)

                if (res) {
                    setAuthToken(res.token);
                    setUserInfo(res.user)
                } else {
                    setIsSign(true);
                }
            }
            if (!userInfo) {
                getUser();
            }
        } else {
            setUserInfo(undefined)
        }
    }, [wallet.connected]);

    return (
        <div className={`top-0 left-0 w-full h-full z-50 transition-all duration-300 ${isHidden ? 'border-b border-[#1D1D1D]' : 'translate-y-0'}`}>
            {/* Content */}
            <div className="relative flex flex-col w-full h-full">
                {/* Top Row */}
                <div className={`items-center w-full h-[40px] shrink-0 px-6 md:px-2.5 hidden lg:flex ${!isAtTop ? 'bg-[#0D0D0D]/90' : 'bg-[#0D0D0D]/50'}`}>
                    <div className="flex gap-1 md:gap-2.5">
                        <a href="https://x.com/lunabetis" target="_blank">
                            <button className="group relative overflow-hidden transition duration-300 bg-[#303030] hover:bg-[#393939]/75 text-sm font-medium h-6 w-6 p-0 min-w-0 flex items-center justify-center text-[#A2A2A2] hover:text-[#E3E3E3] rounded-[6px] cursor-pointer">
                                <Icon icon="fa6-brands:x-twitter" width="16" height="16" style={{ color: "#FFFFFF" }} />
                            </button>
                        </a>
                        <a href="https://discord.gg/yTQpvNwE" target="_blank">
                            <button className="group relative overflow-hidden transition duration-300 bg-[#303030] hover:bg-[#393939]/75 text-sm font-medium h-6 w-6 p-0 min-w-0 flex items-center justify-center text-[#A2A2A2] hover:text-[#E3E3E3] rounded-[6px] cursor-pointer">
                                <Icon icon="ri:discord-fill" width="16" height="16" style={{ color: "#FFFFFF" }} />
                            </button>
                        </a>
                        <div className="hidden md:flex items-center gap-4 ml-1">
                            <a className="" href="/fairness">
                                <p className="text-sm text-[#A2A2A2] hover:text-[#E3E3E3] transition-colors font-medium">Provably Fair</p>
                            </a>
                            <a className="" href="/terms">
                                <p className="text-sm text-[#A2A2A2] hover:text-[#E3E3E3] transition-colors font-medium">Terms of Service</p>
                            </a>
                            <p className="text-sm text-[#A2A2A2] hover:text-[#E3E3E3] transition-colors font-medium cursor-pointer">Support</p>
                        </div>
                    </div>
                    <p className="text-sm text-[#BFBFCD] font-semibold ml-auto md:mr-3.5">
                        <span className="mr-1 text-[#E3E3E3] font-bold">4911521</span>Total Bets
                    </p>
                </div>

                {/* Main Navigation */}
                <div className={`flex items-center md:justify-between w-full grow px-6 ${!isAtTop ? 'bg-[#141414]/90' : 'bg-[#141414]/50'}`}>
                    <div id="navigation" className="hidden md:flex items-center relative h-full">
                        <a href="/" className="flex justify-center items-center w-[110px] lg:w-[123px] text-base gap-1.5 transition-colors duration-300 text-[#6741FF]" aria-current="page">
                            <Icon icon="gravity-ui:target-dart" width="24" height="24" style={{ color: "#2c5fbf" }} />
                            <h1 className="transition-colors duration-300 font-semibold text-base block text-[#E3E3E3]">Jackpot</h1>
                        </a>
                        <a href="/affiliates" className="flex justify-center items-center w-[110px] lg:w-[123px] text-base gap-1.5 transition-colors duration-300 text-[#6741FF]" aria-current="page">
                            <Icon icon="material-symbols:person-rounded" width="24" height="24" style={{ color: "#2c5fbf" }} />
                            <h1 className="transition-colors duration-300 font-semibold text-base block text-[#A2A2A2]">Affiliates</h1>
                        </a>
                    </div>
                    <div className="flex justify-end items-center gap-1.5 sm:gap-3 w-full md:w-auto h-full ml-auto md:m-0">
                        <button className="flex flex-col justify-center items-center w-[40px] text-base gap-0.5 transition-colors duration-300 text-[#6741FF] mx-2 relative h-full">
                            <Icon icon="uiw:setting" width="28" height="28" style={{ color: "#2c5fbf" }} />
                        </button>
                        <div className="flex items-center drop-shadow-icon gap-2 px-2">
                            <img src="/images/3d-sol.webp" className="object-cover object-center w-8 2xl:w-[32px] h-auto" alt=""></img>
                            <span className="font-black text-xl text-white 2xl:text-base">0.251</span>
                        </div>
                        {userInfo ? (
                            <DropDownProfile user={userInfo} />
                        ) : (
                            <button
                                className={cn("bg-gradient-to-t from-[#192130] to-[#162231] p-[3px] rounded-2xl transition-opacity duration-300 cursor-pointer")}
                                onClick={() => setIsModalOpen(true)}
                            >
                                <div className="p-0.5 rounded-xl w-full h-full relative bg-gradient-to-b from-[#6797df] to-[#2a64cf] border-[1px] border-[#1D1D1D]">
                                    <div className="group relative h-10 min-w-10 overflow-hidden rounded-[10px] transition duration-300 px-4 w-full bg-[#2c5fbf] hover:bg-[#3b2cbf]/75 text-sm font-bold text-[#E3E3E3] flex items-center justify-center gap-1.5 ml-auto cursor-pointer" style={{ textShadow: "rgba(0, 0, 0, 0.5) 0px 2px" }}>
                                        <Icon icon="ion:wallet" width="16" height="16" style={{ color: "#FFFFFF" }} /> connect
                                    </div>
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreHeader;