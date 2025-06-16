import DuringDropdown from "@/components/Dropdown/DuringDropdown";
import { Icon } from "@iconify-icon/react";

const Affiliates = () => {
    return (
        <div className="relative w-full min-h-[calc(100vh-110px)] h-full px-6 md:px-10 lg:px-16 py-12 mb-20 mt-12 md:mt-16 lg:mt-28">
            <div className="opacity-100 translate-y-2 animate-fade-y">
                <div className="max-w-[1064px] mx-auto">
                    <div>
                        <h1 className="font-airstrike text-[40px] text-white m-0">Affiliates</h1>
                        <p className="text-[#A2A2A2] font-medium mb-8">Share your referral link with friends and get paid for each bet placed! The more you share, the more you earn!</p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-[340px] shrink-0">
                            <div className="relative bg-[#1d1d1d] h-[219px] rounded-xl">
                                <div className="bg-[#2c5fbf] w-16 h-16 rounded-full absolute inset-0 m-auto blur-2xl z-[3]"></div>
                                <button className="bg-gradient-to-t from-[#222222] to-[#303030] p-[3px] rounded-2xl transition-opacity duration-300 cursor-pointer absolute inset-0 m-auto z-[3] h-max w-32">
                                    <div className="p-0.5 rounded-xl w-full h-full relative bg-gradient-to-b from-[#6797df] to-[#2a64cf] border-[1px] border-[#1D1D1D]">
                                        <div className="group flex items-center justify-center relative h-10 min-w-10 overflow-hidden rounded-[10px] transition duration-300 px-4 w-full bg-[#2c5fbf] hover:bg-[#3b2cbf]/75 text-sm font-bold text-white gap-1.5 cursor-pointer" style={{ textShadow: "rgba(0, 0, 0, 0.5) 0px 2px" }}>
                                            <Icon icon="ion:wallet" width="16" height="16" style={{ color: "#FFFFFF" }} /> connect
                                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(68.53%_169.15%_at_50%_-27.56%,_#D787FF_0%,_#6741FF_100%)] transition-opacity duration-500 z-[1] opacity-0 group-hover:opacity-20 mix-blend-screen">
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div className="w-full bg-[#242424] rounded-lg overflow-hidden mt-6">
                                <div className="w-full p-4 bg-[#1D1D1D] border border-[#303030] rounded-lg">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-[#57A4FF] w-6 h-6 flex items-center justify-center rounded-md">
                                                <Icon icon="mingcute:telegram-fill" width="16" height="16" style={{ color: "#fff" }} />
                                            </div>
                                            <p className="text-sm font-semibold text-white tracking-wide">Telegram Panels</p>
                                        </div>
                                        <div className="flex gap-0.5">
                                            <button className="group flex items-center justify-center relative overflow-hidden transition duration-300 bg-[#303030] hover:bg-[#393939]/75 text-sm text-[#A2A2A2] font-semibold w-6 h-6 p-0 min-w-0 rounded-lg cursor-pointer">1</button>
                                            <button className="group flex items-center justify-center relative overflow-hidden transition duration-300 hover:bg-[#393939]/75 text-sm text-[#A2A2A2] font-semibold w-6 h-6 p-0 min-w-0 rounded-lg bg-transparent cursor-pointer">2</button>
                                        </div>
                                    </div>
                                    <div className="w-full aspect-square bg-[#141414] mt-4 rounded-lg">
                                        <canvas className="w-full h-auto animate-fade-in aspect-[10/11]" style={{ animationDuration: "500ms" }} width="1000" height="1100"></canvas>
                                    </div>
                                </div>
                                <div className="bg-[#242424]">
                                    <button className="group flex items-center justify-center relative h-10 min-w-10 overflow-hidden transition duration-300 px-4 hover:bg-[#393939]/75 text-sm w-full border-none bg-transparent text-[#A2A2A2] font-semibold rounded-none cursor-pointer">
                                        <Icon icon="ic:round-download" width="24" height="24" style={{ color: "#A2A2A2" }} />
                                        <div className="flex items-center justify-center gap-1 ">Download</div>
                                    </button>
                                </div>
                            </div>
                            <div className="w-full bg-[#242424] rounded-lg overflow-hidden mt-6">
                                <div className="w-full p-4 bg-[#1D1D1D] border border-[#303030] rounded-lg">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-[#EA2E32] w-6 h-6 flex items-center justify-center rounded-md">
                                                <Icon icon="gravity-ui:play-fill" width="14" height="14" style={{ color: "#fff" }} />
                                            </div>
                                            <p className="text-sm text-white font-semibold tracking-wide">Telegram Panels</p>
                                        </div>
                                        <div className="flex gap-0.5">
                                            <button className="group flex items-center justify-center relative overflow-hidden transition duration-300 bg-[#303030] hover:bg-[#393939]/75 text-sm text-[#A2A2A2] font-semibold w-6 h-6 p-0 min-w-0 rounded-lg cursor-pointer">1</button>
                                            <button className="group flex items-center justify-center relative overflow-hidden transition duration-300 hover:bg-[#393939]/75 text-sm text-[#A2A2A2] font-semibold w-6 h-6 p-0 min-w-0 rounded-lg bg-transparent cursor-pointer">2</button>
                                        </div>
                                    </div>
                                    <div className="w-full bg-[#141414] mt-4 rounded-lg">
                                        <canvas className="w-full h-auto animate-fade-in aspect-[306/70]" style={{ animationDuration: "500ms" }} width="1280" height="294"></canvas>
                                    </div>
                                </div>
                                <div className="bg-[#242424]">
                                    <button className="group flex items-center justify-center relative h-10 min-w-10 overflow-hidden transition duration-300 px-4 hover:bg-[#393939]/75 text-sm w-full border-none bg-transparent text-[#A2A2A2] font-semibold rounded-none cursor-pointer">
                                        <Icon icon="ic:round-download" width="24" height="24" style={{ color: "#A2A2A2" }} />
                                        <div className="flex items-center justify-center gap-1 ">Download</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-9 w-full grow">
                            <div>
                                <p className="text-white font-semibold mb-4">Statistics</p>
                                <div className="w-full bg-blurp-gradient p-[1px] rounded-xl max-w-[1064px] mx-auto">
                                    <div className="flex justify-between bg-blurp-card w-full h-full rounded-[11px] px-8 py-6 gap-1">
                                        <div className="flex flex-col">
                                            <p className="text-sm leading-[20px] text-[#A2A2A2] font-medium">You’ve earned</p>
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-8 h-8 flex items-center justify-center bg-[#171721] rounded-full">
                                                    <Icon icon="token-branded:solana" width="20" height="20" />
                                                </div>
                                                <h4 className="font-extrabold text-[24px] text-white">0</h4>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <button className="bg-gradient-to-t from-[#222222] to-[#303030] p-[3px] rounded-2xl transition-opacity duration-300 opacity-50" disabled>
                                                <div className="p-0.5 rounded-xl w-full h-full relative bg-gradient-to-b from-[#6797df] to-[#2a64cf] border-[1px] border-[#1D1D1D]">
                                                    <div className="group flex items-center justify-center relative h-10 min-w-10 overflow-hidden rounded-[10px] transition duration-300 px-4 w-full bg-[#2c5fbf] hover:bg-[#3b2cbf]/75 text-sm font-bold text-white opacity-50" style={{ textShadow: "#0000007f 0px 2px" }}>
                                                        Claim <span className="hidden md:inline ml-1">Earnings</span>
                                                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(68.53%_169.15%_at_50%_-27.56%,_#D787FF_0%,_#6741FF_100%)] transition-opacity duration-500 z-[1] opacity-0 group-hover:opacity-20 mix-blend-screen">
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row gap-2.5 mt-4">
                                    <div className="group flex gap-3 items-center p-4 bg-[#1D1D1D] border border-[#303030] h-[84px] w-full rounded-lg relative transition-colors duration-300 hover:bg-[#232323] hover:border-[#303030]">
                                        <div className="h-full aspect-square flex-none relative transition-all duration-300 group-hover:scale-110 group-hover:brightness-125 transform-gpu perspective will-change-transform">
                                            <img src="/images/usergroup.webp" className="object-cover object-center absolute inset-0 m-auto w-[2em] z-10" alt=""></img>
                                            <img src="/images/rarities/grid.34bbcfd0.webp" className="w-full object-cover object-center animate-rotate" alt="Grid"></img>
                                        </div>
                                        <div>
                                            <h4 className="text-base text-white font-bold">0</h4>
                                            <p className="text-sm font-medium text-[#A2A2A2] mt-1">Users</p>
                                        </div>
                                        <img src="/images/dot-pattern-stat.webp" className="object-cover object-center absolute right-0 top-0 h-full w-full" alt="Pattern"></img>
                                    </div>
                                    <div className="group flex gap-3 items-center p-4 bg-[#1D1D1D] border border-[#303030] h-[84px] w-full rounded-lg relative transition-colors duration-300 hover:bg-[#232323] hover:border-[#303030]">
                                        <div className="h-full aspect-square flex-none relative transition-all duration-300 group-hover:scale-110 group-hover:brightness-125 transform-gpu perspective will-change-transform">
                                            <img src="/images/3d-sol.webp" className="object-cover object-center absolute inset-0 m-auto w-[2em] z-10" alt=""></img>
                                            <img src="/images/rarities/grid.34bbcfd0.webp" className="w-full object-cover object-center animate-rotate" alt="Grid"></img>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 flex items-center justify-center bg-[#171721] rounded-full">
                                                    <Icon icon="token-branded:solana" width="12" height="12" />
                                                </div>
                                                <h4 className="text-base text-white font-bold">0</h4>
                                            </div>
                                            <p className="text-sm font-medium text-[#A2A2A2] mt-1">Total Wagered</p>
                                        </div>
                                        <img src="/images/dot-pattern-stat.webp" className="object-cover object-center absolute right-0 top-0 h-full w-full" alt="Pattern"></img>
                                    </div>
                                    <div className="group flex gap-3 items-center p-4 bg-[#1D1D1D] border border-[#303030] h-[84px] w-full rounded-lg relative transition-colors duration-300 hover:bg-[#232323] hover:border-[#303030]">
                                        <div className="h-full aspect-square flex-none relative transition-all duration-300 group-hover:scale-110 group-hover:brightness-125 transform-gpu perspective will-change-transform">
                                            <img src="/images/3d-sol.webp" className="object-cover object-center absolute inset-0 m-auto w-[2em] z-10" alt=""></img>
                                            <img src="/images/rarities/grid.34bbcfd0.webp" className="w-full object-cover object-center animate-rotate" alt="Grid"></img>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 flex items-center justify-center bg-[#171721] rounded-full">
                                                    <Icon icon="token-branded:solana" width="12" height="12" />
                                                </div>
                                                <h4 className="text-base text-white font-bold">0</h4>
                                            </div>
                                            <p className="text-sm font-medium text-[#A2A2A2] mt-1">Total Wagered</p>
                                        </div>
                                        <img src="/images/dot-pattern-stat.webp" className="object-cover object-center absolute right-0 top-0 h-full w-full" alt="Pattern"></img>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[461px]">
                                <div className="mb-4">
                                    <div className="flex justify-between items-center">
                                        <p className="text-white font-semibold">Wager Stats</p>
                                        <DuringDropdown />
                                    </div>
                                </div>
                                <div className="w-full h-[1px] bg-[#222222] mt-6 mb-0"></div>
                            </div>
                            <div className="flex flex-col p-3 rounded-lg bg-[#1d1d1d]">
                                <p className="text-white font-semibold mb-4">Top Depositors</p>
                                <div className="flex flex-col gap-3">
                                    <div className="flex px-4 text-sm text-[#A2A2A2] w-full gap-2">
                                        <div className="w-[25%]">Name</div>
                                        <div className="w-[20%]">Wagered</div>
                                        <div className="w-[30%]">Commission</div>
                                        <div className="w-[25%]">First Seen</div>
                                        <div className="w-[25%] text-right">Last Seen</div>
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

export default Affiliates
