import { Icon } from "@iconify-icon/react";

const Header = () => {

    return (
        <div className="fixed top-0 left-0 w-full h-[70px] lg:h-[110px] bg-[#141414] border-b border-[#1D1D1D] flex items-center z-[6]">
            <a href="/" className="flex items-center justify-center w-[100px] xl:w-[300px] 2xl:w-[350px] h-full flex-none relative border-r border-[#0D0D0D] active" aria-current="page">
                <img src="/images/header-glow.webp" alt="" className="object-cover object-center absolute top-0 left-0 w-full h-full -z-[1] opacity-50" />
                <div className="flex items-center gap-4">
                    <img src="/images/icon.png" alt="" className='object-cover object-center w-12' />
                    <p className="text-[#E3E3E3] text-[32px] font-extrabold uppercase xl:block hidden">solbet</p>
                </div>
            </a>
            <div className="flex flex-col w-full h-full">
                <div className="items-center w-full h-[40px] bg-[#0D0D0D] shrink-0 px-6 md:px-2.5 hidden lg:flex">
                    <div className="flex gap-1 md:gap-2.5">
                        <a href="https://x.com/solpotcom" target="_blank">
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
                <div className="flex items-center justify-end md:justify-between w-full px-6 grow">
                    <div id="navigation" className="hidden md:flex items-center relative h-full">
                        <a href="/" className="flex justify-center items-center w-[110px] lg:w-[123px] text-base gap-1.5 transition-colors duration-300 text-[#6741FF]" aria-current="page">
                            <Icon icon="gravity-ui:target-dart" width="24" height="24" style={{ color: "#6741ff" }} />
                            <h1 className="transition-colors duration-300 font-semibold text-base block text-[#E3E3E3]">Jackpot</h1>
                        </a>
                        <a href="/affiliates" className="flex justify-center items-center w-[110px] lg:w-[123px] text-base gap-1.5 transition-colors duration-300 text-[#6741FF]" aria-current="page">
                            <Icon icon="material-symbols:person-rounded" width="24" height="24" style={{ color: "#6741ff" }} />
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
                            <div className="w-full h-1/3 absolute inset-0 m-auto bg-[#6741FF] rounded-[100%] blur-lg -z-[1] opacity-50"></div>
                            <div className="absolute h-[65px] -z-[1] [mask-image:linear-gradient(black,transparent)]">
                                <div className="absolute top-0 left-0 w-full h-full">
                                    <div className="particle-canvas">
                                        <canvas width="123" height="65"></canvas>
                                    </div>
                                </div>
                                <img src="/images/leaderboard/star-basic.webp" className="object-cover object-center w-[123px] animate-rotate duration-[60s]" alt=""></img>
                            </div>
                            <div className="w-full h-[1px] bg-gradient-to-r from-[#6741FF] via-[#AD98FF] to-[#6741FF] absolute -bottom-[1px] left-0"></div>
                        </button>
                        <button className="bg-gradient-to-t from-[#222222] to-[#303030] p-[3px] rounded-2xl transition-opacity duration-300 cursor-pointer">
                            <div className="p-0.5 rounded-xl w-full h-full relative bg-gradient-to-b from-[#957AFF] to-[#6741FF] border-[1px] border-[#1D1D1D]">
                                <div className="group relative h-10 min-w-10 overflow-hidden rounded-[10px] transition duration-300 px-4 w-full bg-[#6741FF] hover:bg-[#6741FF]/75 text-sm font-bold text-[#E3E3E3] flex items-center justify-center gap-1.5 ml-auto cursor-pointer" style={{ textShadow: "rgba(0, 0, 0, 0.5) 0px 2px" }}>
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

export default Header
