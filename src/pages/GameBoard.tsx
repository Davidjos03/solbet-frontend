import Bonus from "@/components/GameBoard.tsx/Bonus";
import UserCard from "@/components/GameBoard.tsx/UserCard";
import { Icon } from "@iconify-icon/react";
import { useState } from "react";

const GameBoard = () => {
    const [value, setValue] = useState<string>("");

    return (
        <div className="relative w-full h-max overflow-hidden transition-[padding,opacity] will-change-[padding,opacity] duration-300 xl:pl-[300px] 2xl:pl-[350px]">
            <div className="absolute main-background h-full top-[70px] lg:top-[109px] transition-[width,left] duration-300 mix-blend-difference will-change-[padding,width] w-full xl:w-[calc(100%-300px)] 2xl:w-[calc(100%-350px)] xl:left-[300px] 2xl:left-[350px]"></div>
            <div className="relative w-full min-h-[calc(100vh-110px)] h-full px-6 md:px-10 lg:px-16 py-12 mb-20 mt-12 md:mt-16 lg:mt-28">
                <div className="opacity-100 translate-y-2 animate-fade-y">
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 max-w-[1440px] desktop:max-w-[1800px] mx-auto">
                        <div className="max-w-full lg:max-w-[calc(100%-250px)] custom-1:max-w-[880px] desktop:max-w-[1200px] mx-auto w-full">
                            <div className="flex flex-col gap-6 md:gap-7">
                                <div className="flex sm:items-center justify-between w-full gap-4">
                                    <div className="flex sm:items-center gap-4 sm:gap-1 grow">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2 mb-2.5">
                                                <Icon icon="gravity-ui:target-dart" width="24" height="24" style={{ color: "#6741ff" }} />
                                                <h2 className="font-airstrike text-[28px] 2xl:text-[32px] leading-[28px] my-0 text-white">Jackpot</h2>
                                            </div>
                                            <h4 className="text-[#BFBFCD] text-xs 2xl:text-sm font-medium whitespace-nowrap">Winner takes all...</h4>
                                        </div>
                                        <img src="/images/static/halftone.e9491561.webp" className="object-cover object-center w-[109px] aspect-[109/79] hidden sm:block" alt=""></img>
                                    </div>
                                    <div className="flex flex-col-reverse sm:flex-row items-end ml-auto shrink gap-2 sm:gap-0.5 md:gap-1 mt-auto">
                                        <div className="w-full md:w-auto mr-auto">
                                            <div className="flex gap-1 md:gap-1.5 h-[44px] w-full sm:w-auto">
                                                <div className="relative w-max hidden sm:block">
                                                    <div className="w-full relative">
                                                        <p className="mb-2 text-[#A2A2A2] text-xs font-book absolute -top-[24px] gap-1 hidden sm:flex">Bet Amount
                                                            <span className="text-white">~$0</span>
                                                        </p>
                                                        <div className="relative w-full">
                                                            <div className="absolute inset-y-0 my-auto left-2.5 h-max w-max">
                                                                <img src="/images/solana.png" className="object-cover object-center w-6 h-6 rounded-full" alt=""></img>
                                                            </div>
                                                            <input
                                                                className="border-[1px] transition-colors duration-300 px-3 h-[44px] rounded-lg text-sm focus:outline-none focus:border-[#3c3c3c] pl-11 bg-[#242424] border-[#292929] w-full lg:w-[220px] desktop:w-[260px] hide-input-arrows"
                                                                placeholder="0.00"
                                                                type="text"
                                                                value={value}
                                                                onChange={(e) => setValue(e.target.value)}
                                                            >
                                                            </input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="bg-gradient-to-t from-[#222222] to-[#303030] p-[3px] rounded-2xl transition-opacity duration-300 cursor-pointer block sm:ml-1">
                                                    <div className="p-0.5 rounded-xl w-full h-full relative bg-gradient-to-b from-[#454545] to-[#232323] border-[1px] border-[#1D1D1D]">
                                                        <div className="group flex items-center justify-center relative min-w-10 overflow-hidden transition duration-300 px-4 bg-[#303030] hover:bg-[#393939]/75 text-sm font-medium rounded-lg h-full w-[48px] text-[#C4C4C4] cursor-pointer [text-shadow: rgba(0, 0, 0, 0.5) 0px 2px]">+0.1</div>
                                                    </div>
                                                </button>
                                                <button className="bg-gradient-to-t from-[#222222] to-[#303030] p-[3px] rounded-2xl transition-opacity duration-300 cursor-pointer hidden min-[1440px]:block">
                                                    <div className="p-0.5 rounded-xl w-full h-full relative bg-gradient-to-b from-[#454545] to-[#232323] border-[1px] border-[#1D1D1D]">
                                                        <div className="group flex items-center justify-center relative min-w-10 overflow-hidden transition duration-300 px-4 bg-[#303030] hover:bg-[#393939]/75 text-sm font-medium rounded-lg h-full w-[48px] text-[#C4C4C4] cursor-pointer [text-shadow: rgba(0, 0, 0, 0.5) 0px 2px]">+1</div>
                                                    </div>
                                                </button>
                                                <div className="relative w-full h-max hidden sm:block">
                                                    <button className="bg-gradient-to-t from-[#222222] to-[#303030] p-[3px] rounded-2xl transition-opacity duration-300 opacity-50 w-full" disabled>
                                                        <div className="p-0.5 rounded-xl w-full h-full relative bg-gradient-to-b from-[#957AFF] to-[#6741FF] border-[1px] border-[#1D1D1D]">
                                                            <div className="group flex items-center justify-center relative min-w-10 overflow-hidden rounded-[10px] transition duration-300 px-4 w-full bg-[#6741FF] hover:bg-[#6741FF]/75 text-sm font-bold text-white h-[32px] whitespace-nowrap font-book opacity-50 [text-shadow: rgba(0, 0, 0, 0.5) 0px 2px]">
                                                                <span className="hidden sm:inline mr-1">Place</span> Bet
                                                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(68.53%_169.15%_at_50%_-27.56%,_#D787FF_0%,_#6741FF_100%)] transition-opacity duration-500 z-[1] opacity-0 group-hover:opacity-20 mix-blend-screen"></div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 2xl:gap-4 justify-between w-full -mt-1.5">
                                    <div className="transition-colors duration-300 p-[4px] rounded-xl h-[97px] relative w-full border-[#2D254B] bg-[#0D0D0D]">
                                        <div className="absolute w-[calc(100%+5px)] h-[calc(100%+4px)] inset-y-0 my-auto border-[2px] border-[#2D254B] top-0 -left-[3px] rounded-[14px]"></div>
                                        <div className="p-[1px] h-full rounded-lg relative border border-[#6741ff] overflow-hidden bg-conic-progress">
                                            <div className="flex flex-col items-center justify-center w-full h-full bg-[#1D1D1D] rounded-[7px] relative z-[3] overflow-hidden">
                                                <div className="bg-gradient-to-l from-[#6741FF]/15 to-[#6741FF]/0 w-full h-full absolute"></div>
                                                <img src="/images/dot-pattern-stat.webp" className="object-cover object-center absolute top-0 left-0 w-full h-full" alt=""></img>
                                                <div className="flex items-center gap-1.5">
                                                    <img src="/images/solana.png" className="object-cover object-center w-6 h-6" alt=""></img>
                                                    <div className="my-0 font-bold text-xl text-white"><span>0.146</span></div>
                                                </div>
                                                <p className="text-sm text-[#A2A2A2] font-medium">Jackpot Value</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full bg-transparent transition-colors duration-300 p-[4px] rounded-xl h-[97px] relative">
                                        <div className="p-[1px] h-full rounded-lg relative overflow-hidden">
                                            <div className="flex flex-col items-center justify-center w-full h-full bg-[#1D1D1D] rounded-[7px] relative z-[3] overflow-hidden">
                                                <div className="flex items-center gap-1.5">
                                                    <img src="/images/solana.png" className="object-cover object-center w-6 h-6" alt=""></img>
                                                    <div className="my-0 font-bold text-xl text-white"><span>0.000</span></div>
                                                </div>
                                                <p className="text-sm text-[#A2A2A2] font-medium">Your Wager</p>
                                            </div>
                                            <div id="progress" className="w-[calc(100%-2px)] h-[calc(100%-2px)] absolute bg-[#303030] top-[1px] right-[1px] rounded-[7px]"></div>
                                        </div>
                                    </div>
                                    <div className="w-full bg-transparent transition-colors duration-300 p-[4px] rounded-xl h-[97px] relative">
                                        <div className="p-[1px] h-full rounded-lg relative overflow-hidden">
                                            <div className="flex flex-col items-center justify-center w-full h-full bg-[#1D1D1D] rounded-[7px] relative z-[3] overflow-hidden">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="my-0 font-bold text-xl text-white"><span>0.00</span>%</div>
                                                </div>
                                                <p className="text-sm text-[#A2A2A2] font-medium">Your Chance</p>
                                            </div>
                                            <div id="progress" className="w-[calc(100%-2px)] h-[calc(100%-2px)] absolute bg-[#303030] top-[1px] right-[1px] rounded-[7px]"></div>
                                        </div>
                                    </div>
                                    <div className="w-full bg-transparent transition-colors duration-300 p-[4px] rounded-xl h-[97px] relative">
                                        <div className="p-[1px] h-full rounded-lg relative overflow-hidden">
                                            <div className="flex flex-col items-center justify-center w-full h-full bg-[#1D1D1D] rounded-[7px] relative z-[3] overflow-hidden">
                                                <div className="flex items-center gap-1.5">
                                                    <h1 className="my-0 font-bold text-xl">
                                                        <div className="flex overflow-hidden tabular-nums">
                                                            <div className="opacity-100">
                                                                <div>
                                                                    <div id="0" className="relative inline-flex items-center justify-center gap-1 animate-timer-digit w-[13px]">
                                                                        <span className="text-white absolute -top-full">0</span>
                                                                        <span className="text-white">0</span>
                                                                    </div>
                                                                    <div id="0" className="relative inline-flex items-center justify-center gap-1 animate-timer-digit w-[13px]">
                                                                        <span className="text-white absolute -top-full">0</span>
                                                                        <span className="text-white">0</span>
                                                                    </div>
                                                                    <div id=":" className="relative inline-flex items-center justify-center gap-1 animate-timer-digit w-[13px] -top-[2px]">
                                                                        <span className="text-white absolute -top-full">:</span>
                                                                        <span className="text-white">:</span>
                                                                    </div>
                                                                    <div id="0" className="relative inline-flex items-center justify-center gap-1 animate-timer-digit w-[13px]">
                                                                        <span className="text-white absolute -top-full">0</span>
                                                                        <span className="text-white">0</span>
                                                                    </div>
                                                                    <div id="0" className="relative inline-flex items-center justify-center gap-1 animate-timer-digit w-[13px]">
                                                                        <span className="text-white absolute -top-full">0</span>
                                                                        <span className="text-white">1</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </h1>
                                                </div>
                                                <p className="text-sm text-[#A2A2A2] font-medium">Time Remaining</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Bonus />
                                <div className="w-full min-h-[600px] border-t border-[#22222D]/50">
                                    <div className="flex md:hidden justify-center mt-4 items-center gap-1.5 pl-2 pr-3 py-2 rounded-lg bg-[#AD98FF]/10">
                                        <img src="/images/solana.png" className="object-cover object-center w-5 h-5" alt=""></img>
                                        <p className="text-[#AD98FF] font-medium text-sm">Payouts are settled in SOL</p>
                                    </div>
                                    <div className="flex justify-between pt-5 text-[#A2A2A2] text-sm font-book mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2">
                                                <Icon icon="material-symbols:person" width="24" height="24" style={{ color: "#9176FF" }} />
                                                <p>2 Players</p>
                                            </div>
                                            <div className="h-2/3 w-[1px] bg-[#303030]/50 hidden md:block"></div>
                                            <div className="hidden md:flex items-center gap-1.5 pl-2 pr-3 py-[5px] rounded-lg bg-[#AD98FF]/10">
                                                <img src="/images/solana.png" className="object-cover object-center w-4 h-4" alt=""></img>
                                                <p className="text-[#AD98FF] font-medium text-[13px]">Payouts are settled in SOL</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-[16px] text-[#AD98FF]">#</p>
                                            <p className="text-[#E3E3E3]">Round: <strong className="text-white font-bold">57518</strong></p>
                                        </div>
                                    </div>
                                    <div className="min-h-[92px]">
                                        <UserCard />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex md:flex-col gap-6 lg:max-w-[180px] 2xl:max-w-[225px] ml-auto w-full flex-wrap md:flex-nowrap shrink-0">
                            <div className="flex flex-col xs:flex-row lg:flex-col gap-6 w-full zoom-80 2xl:zoom-100">
                                <div className="relative h-max lg:h-[280px] w-full" style={{ animationDelay: "0s" }}>
                                    <div>
                                        <div className="backface-hidden preserve-3d" style={{ transform: "translateZ(-5px)" }}>
                                            <div className="w-full bg-gradient-to-t from-[#222222]/15 to-[#303030]/50 rounded-[14px] p-[3px]">
                                                <div className="flex flex-col shadow-bet h-full rounded-[11px]">
                                                    <div className="w-full rounded-t-[11px] bg-gradient-to-b from-[#282828] to-[#1E1A2D] p-[3px] pb-0 grow relative">
                                                        <div className="w-full h-full bg-gradient-to-b from-[#161618] to-[150%] to-[#1D192C] rounded-t-[8px] p-4">
                                                            <img src="/images/download.webp" className="object-cover object-center w-full absolute top-0 left-0" alt=""></img>
                                                            <div className="relative z-[3]">
                                                                <div className="flex justify-between uppercase text-xs text-[#8C8C8C] mb-3">
                                                                    <p>Round</p>
                                                                    <p>#57534</p>
                                                                </div>
                                                            </div>
                                                            <div className="rounded-[18px] overflow-hidden border-[1px] border-[#222222] aspect-square hover:brightness-125 transition-[filter] duration-300 cursor-pointer w-[72px] h-[72px] mx-auto bg-[#303045] p-[1px] border-none">
                                                                <div className="w-full h-full p-0.5 border-[1px] border-[#222222] rounded-[18px] bg-gradient-to-b from-[#8A8A8A] to-[#5A5A5A]">
                                                                    <div className="w-full h-full border-[1px] border-[#222222] rounded-[18px] overflow-hidden bg-black/75 shadow-avatar-emboss relative">
                                                                        <img src="/images/avatar.svg" className="object-cover object-center w-full h-full" alt=""></img>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-1 mt-3 mx-auto w-max mb-3">
                                                                <p className="text-sm font-semibold max-w-[75px] truncate text-white">Tommy9081</p>
                                                                <div className="p-[1px] rounded-md overflow-hidden bg-[#307293] text-[#75D1FF]">
                                                                    <div className="flex items-center justify-center rounded-[5px] overflow-hidden bg-[#22222D]/80 font-semibold w-[28px] h-5 text-[11px]">10</div>
                                                                </div>
                                                            </div>
                                                            <div className="relative">
                                                                <span className="text-[11px] italic absolute inset-0 m-auto w-max h-max uppercase text-white">Last Winner</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-full h-[1px] bg-[#0F0F0F]"></div>
                                                    <div className="w-full bg-gradient-to-b from-[#1D1D1D] to-[#141414] shrink-0 rounded-b-[11px] relative py-3 px-4">
                                                        <img src="/images/static/grid.bb6dda07.webp" className="object-cover object-center w-full h-full absolute top-0 left-0" alt=""></img>
                                                        <div className="flex flex-col gap-1">
                                                            <div className="flex items-center w-full justify-between relative z-[3]">
                                                                <p className="text-xs text-[#C4C4C4]">Won</p>
                                                                <div className="flex items-center gap-1.5">
                                                                    <img src="/images/solana.png" alt="" className="w-3 h-3" />
                                                                    <p className="text-sm font-semibold text-white">0.275</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center w-full justify-between relative z-[3]">
                                                                <p className="text-xs text-[#C4C4C4]">Chance</p>
                                                                <p className="text-sm font-semibold text-white">27.62%</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative h-max lg:h-[280px] w-full" style={{ animationDelay: "0s" }}>
                                    <div>
                                        <div className="backface-hidden preserve-3d" style={{ transform: "translateZ(-5px)" }}>
                                            <div className="w-full bg-gradient-to-t from-[#222222]/15 to-[#303030]/50 rounded-[14px] p-[3px]">
                                                <div className="flex flex-col shadow-bet h-full rounded-[11px]">
                                                    <div className="w-full rounded-t-[11px] bg-gradient-to-b from-[#282828] to-[#211D18] p-[3px] pb-0 grow relative">
                                                        <div className="w-full h-full bg-gradient-to-b from-[#161618] to-[150%] to-[#201C16] rounded-t-[8px] p-4">
                                                            <img src="/images/download.webp" className="object-cover object-center w-full absolute top-0 left-0" alt=""></img>
                                                            <div className="relative z-[3]">
                                                                <div className="flex justify-between uppercase text-xs text-[#8C8C8C] mb-3">
                                                                    <p>Round</p>
                                                                    <p>#57534</p>
                                                                </div>
                                                            </div>
                                                            <div className="rounded-[18px] overflow-hidden border-[1px] border-[#222222] aspect-square hover:brightness-125 transition-[filter] duration-300 cursor-pointer w-[72px] h-[72px] mx-auto bg-[#303045] p-[1px] border-none">
                                                                <div className="w-full h-full p-0.5 border-[1px] border-[#222222] rounded-[18px] bg-gradient-to-b from-[#8A8A8A] to-[#5A5A5A]">
                                                                    <div className="w-full h-full border-[1px] border-[#222222] rounded-[18px] overflow-hidden bg-black/75 shadow-avatar-emboss relative">
                                                                        <img src="/images/avatar.svg" className="object-cover object-center w-full h-full" alt=""></img>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-1 mt-3 mx-auto w-max mb-3">
                                                                <p className="text-sm font-semibold max-w-[75px] truncate text-white">Tommy9081</p>
                                                                <div className="p-[1px] rounded-md overflow-hidden bg-[#307293] text-[#75D1FF]">
                                                                    <div className="flex items-center justify-center rounded-[5px] overflow-hidden bg-[#22222D]/80 font-semibold w-[28px] h-5 text-[11px]">10</div>
                                                                </div>
                                                            </div>
                                                            <div className="relative">
                                                                <span className="text-[11px] italic absolute inset-0 m-auto w-max h-max uppercase text-white">Last Winner</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-full h-[1px] bg-[#0F0F0F]"></div>
                                                    <div className="w-full bg-gradient-to-b from-[#1D1D1D] to-[#141414] shrink-0 rounded-b-[11px] relative py-3 px-4">
                                                        <img src="/images/static/grid.bb6dda07.webp" className="object-cover object-center w-full h-full absolute top-0 left-0" alt=""></img>
                                                        <div className="flex flex-col gap-1">
                                                            <div className="flex items-center w-full justify-between relative z-[3]">
                                                                <p className="text-xs text-[#C4C4C4]">Won</p>
                                                                <div className="flex items-center gap-1.5">
                                                                    <img src="/images/solana.png" alt="" className="w-3 h-3" />
                                                                    <p className="text-sm font-semibold text-white">0.275</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center w-full justify-between relative z-[3]">
                                                                <p className="text-xs text-[#C4C4C4]">Chance</p>
                                                                <p className="text-sm font-semibold text-white">27.62%</p>
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
                    </div>
                </div>
            </div>
            <div className="w-full bg-gradient-to-br from-[#141414] to-[#0D0D0D] relative">
                <div
                    className="absolute inset-x-0 right-0 bottom-[100%] pointer-events-none -z-[1] w-full mix-blend-screen mx-auto bg-black h-[300px]"
                    style={{
                        maskImage: "linear-gradient(to top, black, transparent 90%)",
                        WebkitMaskImage: "linear-gradient(to top, black, transparent 90%)"
                    }}
                >
                    <video className="pointer-events-none -z-[1] w-full max-w-[2160px] mx-auto absolute bottom-0 opacity-0 animate-fade-in" poster="/img/background.webp" src="/video/grid.webm"></video>
                </div>
                <div className="flex flex-col py-9 px-6 md:px-10 lg:px-16 pb-[100px] md:pb-9">
                    <div className="w-full bg-blur p-gradient p-[1px] rounded-xl max-w-[1064px] mx-auto">
                        <div className="flex flex-col md:flex-row items-center bg-blurp-card w-full h-full rounded-[11px] px-8 py-6 gap-6 text-center md:text-left">
                            <div className="min-w-[140px] h-[103px]"></div>
                            <p className="grow text-xs leading-[20px] font-[500] text-[#e6e6e6]">
                                Welcome to Solpot. Play 100% fair on-chain Solana based gambling games like Coinflip and Jackpot. Solpot provides instant on-chain deposits and withdrawals for bets of any size. We are dedicated to providing gambling games solely for the SOL chain. Earn and play with free Solana by opening your Daily Case or participating in our Airdrop promotion.
                                <br />
                                <br />
                                In order to register for this website, the user is required to accept the
                                <a className="text-white font-semibold" href="/terms">General Terms and Conditions</a>
                                . In the event the
                                <a className="text-white font-semibold" href="/terms">General Terms and Conditions</a>
                                are updated, existing users may choose to discontinue using the products and services before the said update shall become effective, which is a minimum of two weeks after it has been announced.
                            </p>
                        </div>
                    </div>
                    <div className="rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.24)] overflow-hidden border border-[#6e6e8c42] max-w-[1064px] mx-auto mt-5">
                        <div className="rounded-xl bg-[#1C1B24]/25 bg-[linear-gradient(91deg,_rgba(110,110,140,0.1)_0%,_rgba(110,110,140,0.05)_100%)]">
                            <div className="flex flex-row justify-center items-center py-4 px-6 gap-6">
                                <div className="min-w-11 h-11"></div>
                                <p className="text-white/50 font-normal leading-[1.25rem] text-xs">Solpot.com is owned and operated by Solpot Ltd. registration number: 2024-00724, registered address: ACE CORPORATE SERVICES INC, Top Floor, Rodney Court Building, Rodney Bay, Gros Islet, Saint Lucia. Solpot.com is licensed and regulated by the Government of the Autonomous Island of Anjouan and operates under License No. ALSI-202504013-FI1. Solpot.com has passed all regulatory compliance and is legally authorized to conduct gaming operations for all games of chance and wagering.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-between items-center mt-[42px] max-w-[1064px] mx-auto w-full gap-12">
                        <div className="flex gap-6 w-max text-center lg:text-left">
                            <a className="" href="mailto:support@solpot.com">
                                <p className="text-[#A2A2A2] text-sm mb-2 font-medium leading-[17px]">Contact Support:</p>
                                <div className="text-white transition-colors duration-300 cursor-pointer font-book leading-[19px]">support@solpot.com</div>
                            </a>
                            <a className="" href="mailto:partners@solpot.com">
                                <p className="text-[#A2A2A2] text-sm mb-2 font-medium leading-[17px]">Marketing Inquiries:</p>
                                <div className="text-white transition-colors duration-300 cursor-pointer font-book leading-[19px]">partners@solpot.com</div>
                            </a>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-6 w-3/4 sm:w-max">
                            <a href="https://x.com/solpotcom" target="_blank" rel="noreferrer" className="group relative p-[1px] bg-gradient-to-r from-[#303030] to-[#2B2B2B] rounded-xl w-full sm:w-[236px] hover:brightness-125 transition-[filter] cursor-pointer">
                                <div className="absolute rounded-lg -top-1.5 -right-3 z-[3] rotate-3 p-[1px] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-6 transition-transform duration-300 ease-[cubic-bezier(.17,1.66,.68,1.01)] bg-green-shine">
                                    <div className="text-sm font-book w-full h-full py-[5px] px-3 rounded-[7px] border-[#00d289] bg-[#204E2D] text-white">Follow now</div>
                                </div>
                                <div className="flex items-center w-full h-full gap-2.5 p-3 bg-gradient-to-r from-[#1D1D1D] from-[50%] to-[120%] rounded-[11px] overflow-hidden relative to-[#27432F]">
                                    <div className="flex items-center justify-center rounded-md bg-[#0D0D0D] w-9 h-9">
                                        <Icon icon="fa6-brands:x-twitter" width="24" height="24" style={{ color: "#fff" }} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#C4C4C4]">Follow our</p>
                                        <p className="text-sm font-semibold text-white">X / Twitter</p>
                                    </div>
                                    <img src="/img/dot-pattern-referral.webp" className="w-full object-cover object-center absolute top-0 -right-5" alt=""></img>
                                </div>
                            </a>
                            <a href="https://discord.gg/solpot" target="_blank" rel="noreferrer" className="group relative p-[1px] bg-gradient-to-r from-[#303030] to-[#2B2B2B] rounded-xl w-full sm:w-[236px] hover:brightness-125 transition-[filter] cursor-pointer">
                                <div className="absolute rounded-lg -top-1.5 -right-3 z-[3] rotate-3 p-[1px] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-6 transition-transform duration-300 ease-[cubic-bezier(.17,1.66,.68,1.01)] bg-green-shine">
                                    <div className="text-sm font-book w-full h-full py-[5px] px-3 rounded-[7px] border-[00d289] bg-[#204E2D] text-white">Join</div>
                                </div>
                                <div className="flex items-center w-full h-full gap-2.5 p-3 bg-gradient-to-r from-[#1D1D1D] from-[50%] to-[120%] rounded-[11px] overflow-hidden relative to-[#27432F]">
                                    <div className="flex items-center justify-center rounded-md bg-[#0D0D0D] w-9 h-9">
                                        <Icon icon="flowbite:discord-solid" width="24" height="24" style={{ color: "#fff" }} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#C4C4C4]">Join our</p>
                                        <p className="text-sm font-semibold text-white">Discord</p>
                                    </div>
                                    <img src="/img/dot-pattern-referral.webp" className="w-full object-cover object-center absolute top-0 -right-5" alt=""></img>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-[42px] max-w-[1064px] mx-auto w-full">
                        <p className="text-sm text-[#A2A2A25C] font-book mr-2">© 2024 Solpot.com All Rights Reserved</p>
                        <button className="" id="headlessui-menu-button-:r8:" type="button" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="" aria-controls="headlessui-menu-items-:r9:">
                            <div className="group justify-center relative h-10 min-w-10 focus:outline-none overflow-hidden transition duration-300 gap-1 px-4 w-full bg-[#303030] hover:bg-[#393939]/75 text-sm font-medium text-white rounded-lg flex items-center border-[#3B3B3B] cursor-pointer">
                                <span>
                                    <div className="flex items-center gap-2">
                                        <div className="flag  size-s   border-radius ">
                                            <img src="/images/flags/US.svg"></img>
                                        </div>English</div>
                                </span>
                                <Icon icon="solar:alt-arrow-down-line-duotone" width="16" height="16" style={{ color: "#fff" }} />
                            </div>
                        </button>
                        <div className="z-[1002] origin-top w-[calc(var(--button-width)*1.5)] p-2 rounded-lg mt-2 bg-[#1D1D1D] border border-[#303030] transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0" data-floating-ui-focusable="" data-anchor="bottom end" id="headlessui-menu-items-:r9:" role="menu" hidden data-headlessui-state="" style={{ display: "none", overflow: "auto", maxWidth: "1422px", maxHeight: "37px" }} aria-labelledby="headlessui-menu-button-:r8:">
                            <div className="block data-[focus]:bg-[#303030] px-3 py-2 rounded-md text-sm font-semibold cursor-pointer transition-colors" id="headlessui-menu-item-:rc:" role="menuitem" tabIndex={-1} data-headlessui-state="">English</div>
                            <div className="block data-[focus]:bg-[#303030] px-3 py-2 rounded-md text-sm font-semibold cursor-pointer transition-colors" id="headlessui-menu-item-:rd:" role="menuitem" tabIndex={-1} data-headlessui-state="">Español</div>
                            <div className="block data-[focus]:bg-[#303030] px-3 py-2 rounded-md text-sm font-semibold cursor-pointer transition-colors" id="headlessui-menu-item-:re:" role="menuitem" tabIndex={-1} data-headlessui-state="">Français</div>
                            <div className="block data-[focus]:bg-[#303030] px-3 py-2 rounded-md text-sm font-semibold cursor-pointer transition-colors" id="headlessui-menu-item-:rf:" role="menuitem" tabIndex={-1} data-headlessui-state="">Türkçe</div>
                            <div className="block data-[focus]:bg-[#303030] px-3 py-2 rounded-md text-sm font-semibold cursor-pointer transition-colors" id="headlessui-menu-item-:rg:" role="menuitem" tabIndex={-1} data-headlessui-state="">简体中文</div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default GameBoard
