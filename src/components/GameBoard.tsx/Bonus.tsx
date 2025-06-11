import { Icon } from "@iconify-icon/react";

const Bonus = () => {
    return (
        <div className='w-full bg-conic-progress rounded-[15px] p-[2px] mb-[11px] relative animate-flash-bonus'>
            <img src="/images/bonus-case.cc747557.webp" className="object-cover object-center absolute bottom-0.5 left-0.5 aspect-[180/206] w-[85px] z-[3] hidden sm:block" alt=""></img>
            <div className="w-full h-full shadow-bet rounded-[13px] bg-gradient-to-b from-[#2E2E35]/85 to-[#1A1A22]/85 p-[3px] relative overflow-hidden">
                <div className="absolute h-full w-auto aspect-square bg-[#8364ff]/75 left-0 z-[2] blur-[50px] hidden sm:block"></div>
                <img src="/images/bonus-grid.d6873489.webp" className="object-cover object-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none" alt=""></img>
                <div className="flex justify-between items-center w-full h-full rounded-[11px] bg-[#171721]/75 p-4 sm:pl-[106px]">
                    <div className="max-w-[150px] sm:max-w-[unset]">
                        <div className="flex items-center gap-1.5">
                            <img src="/images/bonus-text.681fd74c.webp" className="object-cover object-center w-[114px] aspect-[114/28]" alt=""></img>
                            <Icon icon="bi:info-circle-fill" width="16" height="16" style={{ color: "#A2A2A2" }} />
                        </div>
                        <p className="text-[#C4C4C4] font-medium text-sm">
                            <span className="text-white font-bold">00.00%</span>
                            This does not affect the player odds.
                        </p>
                    </div>
                    <div className="flex items-center h-[44px] gap-3 inset-0 ml-auto w-max">
                        <div className="text-right">
                            <p className="text-xl text-white font-bold leading-7">0.000051</p>
                            <p className="text-sm font-bold font-book text-[#C4C4C4]">~$0.01</p>
                        </div>
                        <div>
                            <div className="relative w-[60px] h-[60px]">
                                <img src="/images/sols.png" className="object-cover object-center w-full h-full relative z-[3] group-hover:scale-110 transition-transform duration-300 drop-shadow-[0px_10px_10px_rgba(0,0,0,0.75)]" alt=""></img>
                                <div className="absolute inset-0 m-auto w-full h-full mix-blend-screen">
                                    <img src="/images/rarities/wormhole.webp" className="object-cover object-center w-full hue-rotate-[-100deg] brightness-[3] saturate-[0.4] opacity-75" alt=""></img>
                                </div>
                                <div className="w-2/3 h-auto aspect-square rounded-full absolute inset-0 m-auto opacity-25 mix-blend-plus-lighter bg-[#571FFF] blur-xl">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-[#6741FF]/5 to-[#1F1F2D]/0 absolute top-0 left-0 w-full h-full pointer-events-none"></div>
                <svg width="9" height="66" viewBox="0 0 9 66" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-0 inset-y-0 m-auto pointer-events-none">
                    <g filter="url(#filter0_d_1614_8849)">
                        <path d="M4 8.52179C4 7.80462 4.384 7.14235 5.00641 6.78606L9 4.5L9 61.5L5.00641 59.2139C4.384 58.8577 4 58.1954 4 57.4782L4 8.52179Z" fill="url(#paint0_linear_1614_8849)"></path>
                        <path d="M4.2 8.52179C4.2 7.87634 4.5456 7.28029 5.10577 6.95963L8.8 4.84494L8.8 61.1551L5.10577 59.0404C4.5456 58.7197 4.2 58.1237 4.2 57.4782L4.2 8.52179Z" stroke="url(#paint1_linear_1614_8849)" stroke-opacity="0.5" stroke-width="0.4"></path>
                    </g>
                    <g opacity="0.5" filter="url(#filter1_f_1614_8849)">
                        <path d="M5 11.4449C5 10.8528 5.26235 10.2911 5.71642 9.9111L6.35821 9.374C7.00915 8.82923 8 9.29206 8 10.1409L8 55.8591C8 56.7079 7.00915 57.1708 6.3582 56.626L5.71642 56.0889C5.26235 55.7089 5 55.1472 5 54.5551L5 11.4449Z" fill="url(#paint2_linear_1614_8849)"></path>
                    </g>
                    <defs>
                        <filter id="filter0_d_1614_8849" x="0" y="0.5" width="13" height="65" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                            <feOffset></feOffset>
                            <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                            <feComposite in2="hardAlpha" operator="out"></feComposite>
                            <feColorMatrix type="matrix" values="0 0 0 0 0.796078 0 0 0 0 0.305882 0 0 0 0 0.909804 0 0 0 0.5 0"></feColorMatrix>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1614_8849"></feBlend>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1614_8849" result="shape"></feBlend>
                        </filter>
                        <filter id="filter1_f_1614_8849" x="3" y="7.13896" width="7" height="51.7221" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                            <feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur_1614_8849"></feGaussianBlur>
                        </filter>
                        <linearGradient id="paint0_linear_1614_8849" x1="6.5" y1="4.5" x2="6.5" y2="61.5" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#6741FF"></stop><stop offset="1" stop-color="#CB4EE8"></stop>
                        </linearGradient>
                        <linearGradient id="paint1_linear_1614_8849" x1="9" y1="33" x2="4" y2="33" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#CB4EE8" stop-opacity="0"></stop><stop offset="1" stop-color="#CB4EE8" stop-opacity="0.56"></stop>
                        </linearGradient>
                        <linearGradient id="paint2_linear_1614_8849" x1="6.5" y1="8" x2="6.5" y2="58" gradientUnits="userSpaceOnUse">
                            <stop stop-color="white" stop-opacity="0"></stop>
                            <stop offset="0.5" stop-color="white"></stop>
                            <stop offset="1" stop-color="white" stop-opacity="0"></stop>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    )
}

export default Bonus
