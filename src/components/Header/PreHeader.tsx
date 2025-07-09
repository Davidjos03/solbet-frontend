import { useWalletProvider } from "@/contexts/WalletContext";
import { Icon } from "@iconify-icon/react";
import cn from "classnames";
import { useEffect, useState } from "react";
import { DropDownProfile } from "../Dropdown";
import { useUserProvider } from "@/contexts/UserContext";
import { useLocation } from "react-router-dom";

const PreHeader = () => {
    const [isHidden, setIsHidden] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [path, setPath] = useState<string>("/");
    const SCROLL_THRESHOLD = 10;

    const { userInfo, solBalance, totalAmount } = useUserProvider();

    const { setIsModalOpen } = useWalletProvider();
    const location = useLocation();

    useEffect(() => {
        console.log("🚀 ~ useEffect ~ location.pathname:", location.pathname)
        setPath(location.pathname);
    }, [location.pathname])

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

    return (
        <div className={`top-0 left-0 w-full h-full bg-main z-50 transition-all duration-30`}>
            {/* Content */}
            <div className="relative flex flex-col w-full h-full">
                {/* Top Row */}
                {/* <div className={`items-center w-full h-[40px] shrink-0 px-6 md:px-2.5 hidden lg:flex ${!isAtTop ? 'bg-border/90' : 'bg-[#0D0D0D]/50'}`}> */}
                <div className={`items-center w-full h-[40px] shrink-0 px-6 md:px-2.5 border-b border-border hidden lg:flex ${!isAtTop ? 'bg-main/90' : 'bg-main'}`}>
                    <div className="flex gap-1 md:gap-2.5">
                        <a href="https://x.com/lunabetis" target="_blank">
                            <button className="group relative overflow-hidden transition duration-300 bg-layer hover:bg-layer/75 text-sm font-medium h-6 w-6 p-0 min-w-0 flex items-center justify-center text-light-grey hover:text-[#E3E3E3] rounded-[6px] cursor-pointer">
                                <Icon icon="fa6-brands:x-twitter" width="16" height="16" style={{ color: "#B9BCC5" }} />
                            </button>
                        </a>
                        <a href="https://discord.gg/yTQpvNwE" target="_blank">
                            <button className="group relative overflow-hidden transition duration-300 bg-layer hover:bg-layer/75 text-sm font-medium h-6 w-6 p-0 min-w-0 flex items-center justify-center text-light-grey hover:text-[#E3E3E3] rounded-[6px] cursor-pointer">
                                <Icon icon="ri:discord-fill" width="16" height="16" style={{ color: "#B9BCC5" }} />
                            </button>
                        </a>
                        <div className="hidden md:flex items-center gap-4 ml-1">
                            <a className="" href="/fairness">
                                <p className="font-inter text-sm text-light-grey hover:text-[#E3E3E3] transition-colors font-medium">Provably Fair</p>
                            </a>
                            <a className="" href="/terms">
                                <p className="font-inter text-sm text-light-grey hover:text-[#E3E3E3] transition-colors font-medium">Terms of Service</p>
                            </a>
                            <p className="font-inter text-sm text-light-grey hover:text-[#E3E3E3] transition-colors font-medium cursor-pointer">Support</p>
                        </div>
                    </div>
                    <p className="font-inter text-sm text-light-grey font-semibold ml-auto md:mr-3.5">
                        <span className="mr-1 text-white font-bold">{totalAmount}</span>Total Bets
                    </p>
                </div>

                {/* Main Navigation */}
                <div className={`flex items-center justify-end md:justify-between border-b border-border w-full grow px-6 ${!isAtTop ? 'bg-main/90' : 'bg-main/50'}`}>
                    <div id="navigation" className="hidden md:flex items-center relative h-full">
                        <a href="/" className="flex justify-center items-center w-[110px] lg:w-[123px] text-base gap-1.5 transition-colors duration-300" aria-current="page">
                            <Icon icon="gravity-ui:target-dart" width="24" height="24" style={{ color: path == "/" ? "#09A0FC" : "#B9BCC5" }} />
                            <h1 className="font-inter transition-colors duration-300 font-semibold text-base block text-[#E3E3E3]">Jackpot</h1>
                        </a>
                        <a href="/affiliates" className="flex justify-center items-center w-[110px] lg:w-[123px] text-base gap-1.5 transition-colors duration-300" aria-current="page">
                            <Icon icon="material-symbols:person-rounded" width="24" height="24" style={{ color: path != "/" ? "#09A0FC" : "#B9BCC5" }} />
                            <h1 className="font-inter transition-colors duration-300 font-semibold text-base block text-[#A2A2A2]">Affiliates</h1>
                        </a>
                    </div>
                    <div className="flex justify-end items-center gap-1.5 sm:gap-3 w-full md:w-auto h-full ml-auto md:m-0">
                        <div className="flex py-[6px] pl-[6px] pr-3 w-[84px] xl:w-[100px] h-10 bg-layer2 rounded-lg items-center gap-1 px-2">
                            <img src="/images/3d-sol.png" className="object-cover object-center w-5 xl:w-8 h-5 2xl:h-8 drop-shadow-small" alt=""></img>
                            <span className="font-inter font-bold text-sm text-light-grey xl:text-base tracking-tighter drop-shadow-small">{solBalance.toFixed(3)}</span>
                        </div>
                        <button className="hidden xs:flex justify-center items-center w-[40px] text-base gap-0.5 transition-colors duration-300 mx-2 relative h-full">
                            <Icon icon="uiw:setting" width="24" height="24" style={{ color: "#B9BCC5" }} />
                        </button>
                        {userInfo != null ? (
                            <DropDownProfile user={userInfo} />
                        ) : (
                            <button
                                className={cn("p-[2px] rounded-lg w-fit h-10 bg-layer2 transition-opacity duration-300 cursor-pointer")}
                                onClick={() => setIsModalOpen(true)}
                            >
                                <div className="rounded-lg h-full relative bg-gradient-border-color-btn p-[1px]">
                                    <div className="group rounded-lg relative h-full min-w-10 overflow-hidden transition duration-300 px-4 py-[6px] w-full bg-prime hover:bg-prime/80 text-sm font-inter font-bold text-white drop-shadow-small flex items-center justify-center gap-1.5 ml-auto cursor-pointer">
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