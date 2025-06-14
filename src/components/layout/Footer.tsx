import { Icon } from "@iconify-icon/react";
import LanguageDropdown from "../Dropdown/LanguageDropdown";

const Footer = () => {
    return (
        <div className="w-full relative">
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
                            SolBet is a next-generation Web3 gaming platform built on Solana. We bring excitement, transparency, and innovation to online betting through jackpots, NFTs, and social features. All draws are powered by smart contracts and verified on-chain. Join a new era of fair and engaging crypto entertainment.
                        </p>
                    </div>
                </div>
                <div className="rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.24)] overflow-hidden border border-[#6e6e8c42] max-w-[1064px] mx-auto mt-5">
                    <div className="rounded-xl bg-[#1C1B24]/25 bg-[linear-gradient(91deg,_rgba(110,110,140,0.1)_0%,_rgba(110,110,140,0.05)_100%)]">
                        <div className="flex flex-row justify-center items-center py-4 px-6 gap-6">
                            <div className="min-w-11 h-11"></div>
                            <p className="text-white/50 font-normal leading-[1.25rem] text-xs">
                                SolBet is a decentralized platform operated by the SolBet team. All games on SolBet are powered by smart contracts on the Solana blockchain, ensuring transparency, fairness, and on-chain verification of results. SolBet does not currently operate under a gaming license and is offered as a community-based experimental Web3 platform. Use of the platform is at your own discretion and subject to applicable laws in your jurisdiction. By using SolBet, you agree to the platform’s Terms and Conditions and acknowledge the inherent risks of blockchain-based games.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between items-center mt-[42px] max-w-[1064px] mx-auto w-full gap-12">
                    <div className="flex gap-6 w-max text-center lg:text-left">
                        <a className="" href="mailto:Solbetplay@gmail.com">
                            <p className="text-[#A2A2A2] text-sm mb-2 font-medium leading-[17px]">Contact Support:</p>
                            <div className="text-white transition-colors duration-300 cursor-pointer font-book leading-[19px]">Solbetplay@gmail.com</div>
                        </a>
                        <a className="" href="mailto:lunabetis@hotmail.com">
                            <p className="text-[#A2A2A2] text-sm mb-2 font-medium leading-[17px]">Marketing Inquiries:</p>
                            <div className="text-white transition-colors duration-300 cursor-pointer font-book leading-[19px]">lunabetis@hotmail.com</div>
                        </a>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6 w-3/4 sm:w-max">
                        <a href="https://x.com/lunabetis" target="_blank" rel="noreferrer" className="group relative p-[1px] bg-gradient-to-r from-[#303030] to-[#2B2B2B] rounded-xl w-full sm:w-[236px] hover:brightness-125 transition-[filter] cursor-pointer">
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
                        <a href="https://discord.gg/yTQpvNwE" target="_blank" rel="noreferrer" className="group relative p-[1px] bg-gradient-to-r from-[#303030] to-[#2B2B2B] rounded-xl w-full sm:w-[236px] hover:brightness-125 transition-[filter] cursor-pointer">
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
                    <p className="text-sm text-[#A2A2A25C] font-book mr-2">© 2025 SolBet — Powered by Solana. All rights reserved.</p>
                    <LanguageDropdown />
                </div>
            </div>
        </div>
    )
}

export default Footer
