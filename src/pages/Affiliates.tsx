import { useState } from "react";
import DuringDropdown from "@/components/Dropdown/DuringDropdown";
import { Icon } from "@iconify-icon/react";
import cn from "classnames";

const duringList: string[] = [
    "All Time",
    "Last 7 Days",
    "Last 30 Days",
    "Last 90 Days",
]

const Affiliates = () => {
    const [date, setDate] = useState<string>(duringList[1])

    const handleSetData = (data: string) => {
        setDate(data);
    }

    return (
        <div className="relative w-full min-h-[calc(100vh-110px)] h-full px-6 md:px-10 lg:px-16 py-12 mb-20 mt-12 md:mt-16 lg:mt-28 font-inter">
            <div className="opacity-100 translate-y-2 animate-fade-y">
                <div className="max-w-[1064px] mx-auto">
                    <div>
                        <h1 className="font-racing text-[40px] text-white m-0">Affiliates</h1>
                        <p className="text-light-grey font-medium mb-8">Share your referral link with friends and get paid for each bet placed! The more you share, the more you earn!</p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-[340px] shrink-0">
                            <div className="relative flex items-center justify-center bg-layer h-[219px] rounded-xl">
                                <div className="bg-secondary w-16 h-16 rounded-full absolute inset-0 m-auto blur-2xl z-[3]"></div>
                                <button
                                    className={cn("p-[2px] rounded-lg w-fit h-10 bg-layer2 transition-opacity duration-300 cursor-pointer")}
                                >
                                    <div className="rounded-lg h-full relative bg-gradient-border-color-btn p-[1px]">
                                        <div className="group rounded-lg relative h-full min-w-10 overflow-hidden transition duration-300 px-4 py-[6px] w-full bg-prime hover:bg-prime/80 text-sm font-inter font-bold text-white drop-shadow-small flex items-center justify-center gap-1.5 ml-auto cursor-pointer">
                                            <Icon icon="ion:wallet" width="16" height="16" style={{ color: "#FFFFFF" }} /> connect
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div className="w-full bg-layer2 rounded-lg overflow-hidden mt-6">
                                <div className="w-full p-4 bg-layer border border-border rounded-lg">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-[#57A4FF] w-6 h-6 flex items-center justify-center rounded-md">
                                                <Icon icon="mingcute:telegram-fill" width="16" height="16" style={{ color: "#fff" }} />
                                            </div>
                                            <p className="text-sm font-semibold text-white tracking-wide">Telegram Panels</p>
                                        </div>
                                        <div className="flex gap-0.5">
                                            <button className="group flex items-center justify-center relative overflow-hidden transition duration-300 br-border hover:bg-[#27354F]/75 text-sm text-[#A2A2A2] font-semibold w-6 h-6 p-0 min-w-0 rounded-lg cursor-pointer">1</button>
                                            <button className="group flex items-center justify-center relative overflow-hidden transition duration-300 hover:bg-[#27354F]/75 text-sm text-[#A2A2A2] font-semibold w-6 h-6 p-0 min-w-0 rounded-lg bg-transparent cursor-pointer">2</button>
                                        </div>
                                    </div>
                                    <div className="w-full aspect-square bg-[#141414] mt-4 rounded-lg">
                                        <canvas className="w-full h-auto animate-fade-in aspect-[10/11]" style={{ animationDuration: "500ms" }} width="1000" height="1100"></canvas>
                                    </div>
                                </div>
                                <div className="bg-layer2">
                                    <button className="group flex items-center justify-center relative h-10 min-w-10 overflow-hidden transition duration-300 px-4 hover:bg-[#162135]/75 text-sm w-full border-none bg-transparent text-[#A2A2A2] font-semibold rounded-none cursor-pointer">
                                        <Icon icon="ic:round-download" width="24" height="24" style={{ color: "#A2A2A2" }} />
                                        <div className="flex items-center justify-center gap-1 ">Download</div>
                                    </button>
                                </div>
                            </div>
                            <div className="w-full bg-layer2 rounded-lg overflow-hidden mt-6">
                                <div className="w-full p-4 bg-layer border border-border rounded-lg">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-[#EA2E32] w-6 h-6 flex items-center justify-center rounded-md">
                                                <Icon icon="gravity-ui:play-fill" width="14" height="14" style={{ color: "#fff" }} />
                                            </div>
                                            <p className="text-sm text-white font-semibold tracking-wide">Telegram Panels</p>
                                        </div>
                                        <div className="flex gap-0.5">
                                            <button className="group flex items-center justify-center relative overflow-hidden transition duration-300 br-border hover:bg-[#27354F]/75 text-sm text-[#A2A2A2] font-semibold w-6 h-6 p-0 min-w-0 rounded-lg cursor-pointer">1</button>
                                            <button className="group flex items-center justify-center relative overflow-hidden transition duration-300 hover:bg-[#27354F]/75 text-sm text-[#A2A2A2] font-semibold w-6 h-6 p-0 min-w-0 rounded-lg bg-transparent cursor-pointer">2</button>
                                        </div>
                                    </div>
                                    <div className="w-full bg-[#141414] mt-4 rounded-lg">
                                        <canvas className="w-full h-auto animate-fade-in aspect-[306/70]" style={{ animationDuration: "500ms" }} width="1280" height="294"></canvas>
                                    </div>
                                </div>
                                <div className="bg-layer2">
                                    <button className="group flex items-center justify-center relative h-10 min-w-10 overflow-hidden transition duration-300 px-4 hover:bg-[#162135]/75 text-sm w-full border-none bg-transparent text-[#A2A2A2] font-semibold rounded-none cursor-pointer">
                                        <Icon icon="ic:round-download" width="24" height="24" style={{ color: "#A2A2A2" }} />
                                        <div className="flex items-center justify-center gap-1 ">Download</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-9 w-full grow">
                            <div>
                                <p className="text-white font-semibold mb-4">Statistics</p>
                                <div className="w-full bg-gradient-border-btn p-[1px] rounded-xl mx-auto">
                                    <div className="flex flex-col md:flex-row md:items-center bg-layer w-full h-full rounded-[10px] p-5 gap-3 relative">
                                        <div className="flex gap-1 items-center justify-between w-full h-full">
                                            <div className="flex flex-col">
                                                <p className="text-sm leading-[20px] text-[#A2A2A2] font-medium">You’ve earned</p>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-8 h-8 flex items-center justify-center bg-[#171721] rounded-full">
                                                        <Icon icon="token-branded:solana" width="20" height="20" />
                                                    </div>
                                                    <h4 className="font-extrabold text-[24px] text-white">0</h4>
                                                </div>
                                            </div>
                                            <button
                                                className={cn("p-[2px] rounded-lg w-fit h-10 bg-layer2 transition-opacity duration-300 cursor-pointer")}
                                            >
                                                <div className="rounded-lg h-full relative bg-gradient-border-color-btn p-[1px]">
                                                    <div className="group rounded-lg relative h-full min-w-10 overflow-hidden transition duration-300 px-4 py-[6px] w-full bg-prime hover:bg-prime/80 text-sm font-inter font-bold text-white drop-shadow-small flex items-center justify-center gap-1.5 ml-auto cursor-pointer">
                                                        Claim Earnings
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row gap-2.5 mt-4">
                                    <div className="group flex gap-3 items-center p-4 bg-layer border border-border h-[84px] w-full rounded-lg relative transition-colors duration-300 hover:bg-[#27354F]">
                                        <div className="h-full aspect-square flex-none relative transition-all duration-300 group-hover:scale-110 group-hover:brightness-125 transform-gpu perspective will-change-transform">
                                            <img src="/images/3d-sol.png" className="object-cover object-center absolute inset-0 m-auto w-[2em] z-10" alt=""></img>
                                        </div>
                                        <div>
                                            <h4 className="text-base text-white font-bold">0</h4>
                                            <p className="text-sm font-medium text-[#A2A2A2] mt-1">Users</p>
                                        </div>
                                    </div>
                                    <div className="group flex gap-3 items-center p-4 bg-layer border border-border h-[84px] w-full rounded-lg relative transition-colors duration-300 hover:bg-[#27354F]">
                                        <div className="h-full aspect-square flex-none relative transition-all duration-300 group-hover:scale-110 group-hover:brightness-125 transform-gpu perspective will-change-transform">
                                            <img src="/images/3d-sol.png" className="object-cover object-center absolute inset-0 m-auto w-[2em] z-10" alt=""></img>
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
                                    </div>
                                    <div className="group flex gap-3 items-center p-4 bg-layer border border-border h-[84px] w-full rounded-lg relative transition-colors duration-300 hover:bg-[#27354F]">
                                        <div className="h-full aspect-square flex-none relative transition-all duration-300 group-hover:scale-110 group-hover:brightness-125 transform-gpu perspective will-change-transform">
                                            <img src="/images/3d-sol.png" className="object-cover object-center absolute inset-0 m-auto w-[2em] z-10" alt=""></img>
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
                                    </div>
                                </div>
                            </div>
                            <div className="h-[461px]">
                                <div className="mb-4">
                                    <div className="flex justify-between items-center">
                                        <p className="text-white font-semibold">Wager Stats</p>
                                        <DuringDropdown duringList={duringList} duringTime={date} setDuringTime={handleSetData} />
                                    </div>
                                </div>
                                <div className="w-full h-[1px] bg-layer mt-6 mb-0"></div>
                            </div>
                            <div className="flex flex-col p-3 rounded-lg bg-layer">
                                <p className="text-white font-semibold mb-4">Top Depositors</p>
                                <div className="flex flex-col gap-3">
                                    <div className="flex px-4 text-sm text-light-grey w-full gap-2">
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
