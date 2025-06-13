import { Icon } from "@iconify-icon/react";
import { useEffect, useState } from "react";

const PreHeader = () => {
    const [isHidden, setIsHidden] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const SCROLL_THRESHOLD = 10;

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
        <div className={`top-0 left-0 w-full h-full z-50 transition-all duration-300 ${isHidden ? 'border-b border-[#1D1D1D]' : 'translate-y-0'}`}>
            {/* Content */}
            <div className="relative flex flex-col w-full h-full">
                {/* Top Row */}
                <div className={`items-center w-full h-[40px] shrink-0 px-6 md:px-2.5 hidden lg:flex ${!isAtTop ? 'bg-[#0D0D0D]' : 'bg-[#0D0D0D]/20'}`}>
                    <div className="flex gap-1 md:gap-2.5">
                        <a href="https://x.com/lunabetis" target="_blank">
                            <button className="group relative overflow-hidden transition duration-300 bg-[#303030] hover:bg-[#393939]/75 text-sm font-medium h-6 w-6 p-0 min-w-0 flex items-center justify-center text-[#A2A2A2] hover:text-[#E3E3E3] rounded-[6px] cursor-pointer">
                                <Icon icon="fa6-brands:x-twitter" width="16" height="16" style={{ color: "#FFFFFF" }} />
                            </button>
                        </a>
                        <a href="https://discord.gg/solpot" target="_blank">
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
                <div className={`flex items-center justify-end md:justify-between w-full grow px-6 ${!isAtTop ? 'bg-[#141414]' : 'bg-[#141414]/20'}`}>
                    <div id="navigation" className="hidden md:flex items-center relative h-full">
                        <a href="/" className="flex justify-center items-center w-[110px] lg:w-[123px] text-base gap-1.5 transition-colors duration-300 text-[#6741FF]" aria-current="page">
                            <Icon icon="gravity-ui:target-dart" width="24" height="24" style={{ color: "#3b2cbf" }} />
                            <h1 className="transition-colors duration-300 font-semibold text-base block text-[#E3E3E3]">Jackpot</h1>
                        </a>
                        <a href="/affiliates" className="flex justify-center items-center w-[110px] lg:w-[123px] text-base gap-1.5 transition-colors duration-300 text-[#6741FF]" aria-current="page">
                            <Icon icon="material-symbols:person-rounded" width="24" height="24" style={{ color: "#3b2cbf" }} />
                            <h1 className="transition-colors duration-300 font-semibold text-base block text-[#A2A2A2]">Affiliates</h1>
                        </a>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-3 w-full md:w-auto h-full ml-auto md:m-0">
                        <button className="flex flex-col justify-center items-center w-[123px] text-base gap-0.5 transition-colors duration-300 text-[#6741FF] relative mr-auto ml-4 lg:mr-4 h-full">
                            <div className="flex items-center gap-0.5 mt-1">
                                <img src="/images/3d-sol.webp" className="object-cover object-center w-[16px] relative -top-[2px]" alt=""></img>
                                <img src="/images/leaderboard/250000-small.png" className="object-cover object-center w-auto h-[12px] aspect-[387/44]" alt=""></img>
                            </div>
                            <div className="w-[123px] h-[16px] relative z-10">
                                <img src="/images/leaderboard/leaderboard-text/en.webp" className="object-center w-full h-full object-contain" alt=""></img>
                            </div>
                            <div className="w-full h-1/3 absolute inset-0 m-auto bg-[#3b2cbf] rounded-[100%] blur-lg -z-[1] opacity-50"></div>
                            <div className="absolute h-[65px] -z-[1] [mask-image:linear-gradient(black,transparent)]">
                                <div className="absolute top-0 left-0 w-full h-full">
                                    <div className="particle-canvas">
                                        <canvas width="123" height="65"></canvas>
                                    </div>
                                </div>
                                <img src="/images/leaderboard/star-basic.webp" className="object-cover object-center w-[123px] animate-rotate duration-[60s]" alt=""></img>
                            </div>
                            <div className="w-full h-[1px] bg-gradient-to-r from-[#3b2cbf] via-[#98b0ff] to-[#3b2cbf] absolute -bottom-[1px] left-0"></div>
                        </button>
                        <button className="bg-gradient-to-t from-[#10101f] to-[#121229] p-[3px] rounded-2xl transition-opacity duration-300 cursor-pointer">
                            <div className="p-0.5 rounded-xl w-full h-full relative bg-gradient-to-b from-[#7c7aff] to-[#4232d3] border-[1px] border-[#1D1D1D]">
                                <div className="group relative h-10 min-w-10 overflow-hidden rounded-[10px] transition duration-300 px-4 w-full bg-[#3b2cbf] hover:bg-[#3b2cbf]/75 text-sm font-bold text-[#E3E3E3] flex items-center justify-center gap-1.5 ml-auto cursor-pointer" style={{ textShadow: "rgba(0, 0, 0, 0.5) 0px 2px" }}>
                                    <Icon icon="ion:wallet" width="16" height="16" style={{ color: "#FFFFFF" }} /> connect
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreHeader;