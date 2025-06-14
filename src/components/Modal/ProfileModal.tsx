import { Icon } from "@iconify-icon/react";
import DuringDropdown from "../Dropdown/DuringDropdown";
// import { useState } from "react";
import { useUserProvider } from "@/contexts/UserContext";
import ChartComponent from "../charts/ohlc";
import { Params, useTokenHistory } from "@/utils/utils";

const initialParams: Params = {
    symbol: "Crypto.SOL/USD",
    resolution: "1",
    from: 1684137600,
    to: 1684141200,
};

const ProfileModal = () => {
    // const [isNext, setIsNext] = useState<boolean>(false);
    // const [isPrev, setIsPrev] = useState<boolean>(true)

    const { isProfileModal, setIsProfileModal } = useUserProvider();

    const { data: ohlc } = useTokenHistory(initialParams);

    // const handleSetState = () => {
    //     setIsNext(!isNext)
    //     setIsPrev(!isPrev)
    // }

    return (
        <div id="global-modal" className={`${isProfileModal ? "block" : "hidden"}`}>
            <div className="fixed top-0 left-0 w-full h-full bg-[#0D0D0D]/75 z-[1000] transition-opacity duration-300 opacity-100" onClick={() => setIsProfileModal(false)}></div>
            <div className="w-full sm:w-max max-w-[calc(100%-32px)] sm:max-w-full h-max absolute inset-0 m-auto z-[1001] transition-all duration-300 scale-100 opacity-100">
                <div className="relative p-[2px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#1e293a] to-[#232425]">
                    <div className="relative w-full h-full rounded-2xl main-background">
                        <div className="p-8 w-full md:w-[787px] h-[calc(100vh-275px)] sm:h-[650px] md:h-[800px] lg:h-auto overflow-y-scroll relative">
                            <div className="absolute top-0 right-0 cursor-pointer bg-[#222]/75 p-3 rounded-bl-xl block sm:hidden" onClick={() => setIsProfileModal(false)}>
                                <Icon icon="mingcute:close-line" width="24" height="24" style={{ color: "#373d3f" }} />
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-4 pb-5 mb-4 border-b border-[#222222]">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-[16px] overflow-hidden border-[1px] border-[#222222] aspect-square hover:brightness-125 transition-[filter] duration-300 cursor-pointer w-16 h-16 shrink-0 bg-[#303045] p-[1px] border-none">
                                        <div className="w-full h-full p-0.5 rounded-[16px] border-[1px] border-[#222222] bg-gradient-to-b from-[#8A8A8A] to-[#5A5A5A]">
                                            <div className="w-full h-full rounded-[16px] border-[1px] border-[#222222] overflow-hidden bg-black/75 shadow-avatar-emboss relative">
                                                <img src="/images/avatars/9fddb4e7b9f48a521886e34bd22474b9ae8da2665a6983b2923f5a3a6e60d81b.jpeg" className="object-cover object-center w-full h-full" alt=""></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-semibold text-xl text-white max-w-[200px] truncate">Terp</h4>
                                            <div className="p-[1px] rounded-md overflow-hidden bg-[#307293] text-[#75D1FF]">
                                                <div className="flex items-center justify-center rounded-[5px] overflow-hidden bg-[#22222D]/80 font-semibold w-[28px] h-5 text-[11px]">11</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex ml-auto mb-auto gap-2 w-full md:w-auto">
                                    <button className="group flex items-center justify-center relative min-w-10 overflow-hidden transition duration-300 px-4 w-full hover:bg-[#393939]/75 text-sm rounded-lg bg-[#222222] h-[36px] border-transparent text-[#A2A2A2] font-medium cursor-pointer">
                                        Joined
                                        <span className="font-semibold text-[#C4C4C4] ml-1">March 26, 2025</span>
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <p className="font-medium text-white text-sm mb-2.5">Statistics</p>
                                <div className="w-full bg-blurp-gradient p-[1px] rounded-xl mx-auto">
                                    <div className="flex flex-col md:flex-row justify-between md:items-center bg-gradient-to-t from-[#1f252d] to-[#171c21] w-full h-full rounded-[11px] px-6 py-5 gap-3 relative">
                                        <div>
                                            <p className="text-sm text-[#A2A2A2] font-medium mb-1">Net Profit</p>
                                            <div className="flex items-center gap-1.5">
                                                <Icon icon="tabler:minus" width="24" height="24" style={{ color: "#ff4d4f" }} />
                                                <div className="w-8 h-8 flex items-center justify-center bg-[#171721] rounded-full">
                                                    <Icon icon="token-branded:solana" width="24" height="24" />
                                                </div>
                                                <h4 className="font-bold text-[24px] text-white">0.6913</h4>
                                            </div>
                                        </div>
                                        <DuringDropdown />
                                    </div>
                                </div>
                            </div>
                            <div className={`flex justify-between gap-2 w-full h-[315px] mb-4 border-b border-[#222222] relative`}>
                                {/* <div className="bg-white/5 text-white/25 rounded-full h-max mt-auto mb-auto relative -top-7 transition-all duration-300 hover:bg-white/10 hover:text-white/50 cursor-pointer">
                                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#262b2b]" onClick={() => handleSetState}>
                                        <Icon icon={isNext ? "ic:round-keyboard-double-arrow-right" : "ic:round-keyboard-double-arrow-left"} width="16" height="16" style={{ color: "#373d3f" }} />
                                    </div>
                                </div> */}
                                <div className="flex w-full rounded-lg bg-[#272c33">
                                    {ohlc?.length && <ChartComponent data={ohlc} />}
                                </div>
                            </div>
                            <div>
                                <p className="font-medium text-white text-sm mb-2.5">Statistics</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative">
                                    <div className="flex items-center gap-4 w-full h-[96px] p-4 bg-[#1D1D1D] border border-[#303030] rounded-xl overflow-hidden relative">
                                        <img src="/images/prize-sol.webp" className="object-cover object-center w-auto h-full aspect-square flex-none" alt=""></img>
                                        <img src="/images/dot-pattern.webp" className="w-full object-cover object-center absolute h-full right-0" alt=""></img>
                                        <div className="bg-gradient-to-l from-[#9B29AC]/20 to-[#411348]/0 to-[40%] w-full h-full absolute top-0 right-0 z-10"></div>
                                        <div>
                                            <p className="text-sm font-medium text-[#A2A2A2]">Luckiest Win</p>
                                            <div className="flex items-center gap-1.5 mt-1.5">
                                                <Icon icon="bxs:rocket" width="24" height="24" style={{ color: "#9B29AC" }} />
                                                <p className="font-bold text-white">1060.10x</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 w-full h-[96px] p-4 bg-[#1D1D1D] border border-[#303030] rounded-xl overflow-hidden relative">
                                        <div>
                                            <div className="relative w-[70px] h-[70px]">
                                                <img src="/images/items/gold-logo.png" className="w-full object-cover object-center scale-[0.95]" alt=""></img>
                                                <div className="absolute inset-0 m-auto w-full h-full mix-blend-screen">
                                                    <img src="/images/rarities/wormhole.webp" className="object-cover object-center w-full hue-rotate-[40deg] brightness-[1.5] saturate-[0.3] opacity-75" alt=""></img>
                                                </div>
                                                <div className="w-2/3 h-auto aspect-square rounded-full absolute inset-0 m-auto opacity-25 mix-blend-plus-lighter bg-[#FF621F] blur-[28px]"></div>
                                            </div>
                                        </div>
                                        <img src="/images/dot-pattern.webp" className="w-full object-cover object-center absolute h-full right-0" alt=""></img>
                                        <div className="bg-gradient-to-l from-[#FFAB35]/20 to-[#483213]/0 to-[40%] w-full h-full absolute top-0 right-0 z-10"></div>
                                        <div>
                                            <p className="text-sm font-medium text-[#A2A2A2]">Luckiest Win</p>
                                            <div className="flex items-center gap-1.5 mt-1.5">
                                                <div className="w-6 h-6 flex items-center justify-center bg-[#171721] rounded-full">
                                                    <Icon icon="token-branded:solana" width="16" height="16" />
                                                </div>
                                                <p className="font-bold text-white">1060.10x</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 w-full h-[96px] p-4 bg-[#1D1D1D] border border-[#303030] rounded-xl overflow-hidden relative">
                                        <div>
                                            <div className="relative w-[70px] h-[70px]">
                                                <img src="/images/items/sol-stack.png" className="object-cover object-center w-full h-full relative z-[3] group-hover:scale-110 transition-transform duration-300 drop-shadow-[0px_10px_10px_rgba(0,0,0,0.75)]" alt=""></img>
                                                <div className="absolute inset-0 m-auto w-full h-full mix-blend-screen">
                                                    <img src="/images/rarities/wormhole.webp" className="object-cover object-center w-full hue-rotate-[200deg] brightness-[3] saturate-[0.2] opacity-75" alt=""></img>
                                                </div>
                                                <div className="w-2/3 h-auto aspect-square rounded-full absolute inset-0 m-auto opacity-25 mix-blend-plus-lighter bg-[#89B6FF] blur-[28px]"></div>
                                            </div>
                                        </div>
                                        <img src="/images/dot-pattern.webp" className="w-full object-cover object-center absolute h-full right-0" alt=""></img>
                                        <div className="bg-gradient-to-l from-[#4D94E9]/20 to-[#131748]/0 to-[40%] w-full h-full absolute top-0 right-0 z-10"></div>
                                        <div>
                                            <p className="text-sm font-medium text-[#A2A2A2]">Luckiest Win</p>
                                            <div className="flex items-center gap-1.5 mt-1.5">
                                                <div className="w-6 h-6 flex items-center justify-center bg-[#171721] rounded-full">
                                                    <Icon icon="token-branded:solana" width="16" height="16" />
                                                </div>
                                                <p className="font-bold text-white">1060.10x</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileModal
