import { useUserProvider } from "@/contexts/UserContext"

const UserCard = () => {
    const { setIsProfileModal } = useUserProvider()

    return (
        <div
            className="group w-full bg-gradient-to-t from-[#2c303b] to-[#1c222c] rounded-[15px] p-[3px] cursor-pointer mb-4 pointer-events-none md:pointer-events-auto opacity-100 "
            onClick={() => setIsProfileModal(true)}
        >
            <div
                className="w-full h-[92px] shadow-bet rounded-[13px] bg-gradient-to-b from-[#30343d] to-[#202733] p-[3px] relative overflow-hidden"
            >
                <div
                    className="flex justify-between items-center w-full h-full rounded-[11px] bg-gradient-to-b from-[#2e3647] to-[#111a27] p-4"
                >
                    <div className="flex items-center text-[#70d4ff]">
                        <div className="flex items-center">
                            <div
                                className="rounded-[8px] overflow-hidden border-[1px] border-[#222222] aspect-square hover:brightness-125 duration-300 cursor-pointer w-12 h-12 transition-[filter] will-change-[filter] group-hover:brightness-125 shrink-0 shadow-[0px_1.48px_0px_0px_#FFFFFF1A_inset] bg-[#303045] p-[1px] border-none"
                            >
                                <div
                                    className="w-full h-full p-0.5 border-[1px]  border-[#222222] rounded-[8px] bg-current relative overflow-hidden"
                                >
                                    <div
                                        className="bg-gradient-to-b from-[#668cd4] to-[#668cd4]/50 opacity-100 rounded-[8px] absolute top-0 left-0 w-full h-full"
                                    ></div>
                                    <div
                                        className="w-full h-full border-[1px] rounded-[8px] border-[#222222] rounded-2 overflow-hidden shadow-avatar-emboss relative z-[3] bg-[#595959]"
                                    >
                                        <img
                                            src="/images/avatars/9fddb4e7b9f48a521886e34bd22474b9ae8da2665a6983b2923f5a3a6e60d81b.jpeg"
                                            className="object-cover object-center w-full h-full"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-1 ml-2 -top-[2px] relative">
                            <p
                                className="font-bold text-sm font-book text-[#C4C4C4] w-[50px] sm:w-[75px] truncate"
                            >
                                XSpEN
                            </p>
                            <div
                                className="p-[1px] rounded-md overflow-hidden bg-[#307293] text-[#75D1FF]"
                            >
                                <div
                                    className="flex items-center justify-center rounded-[5px] overflow-hidden bg-[#22222D]/80 font-semibold w-[28px] h-5 text-[11px]"
                                >
                                    10
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex items-center h-[44px] gap-3 relative mb:absolute inset-0 m-auto w-max"
                    >
                        <div>
                            <div
                                className="relative scale-[0.85] sm:scale-100 w-[60px] h-[60px]"
                            >
                                <img
                                    src="/images/sols.png"
                                    className="object-cover object-center w-full h-full relative z-[3] group-hover:scale-110 transition-transform duration-300 drop-shadow-[0px_10px_10px_rgba(0,0,0,0.75)]"
                                    alt=""
                                />
                                <div className="absolute inset-0 m-auto w-full h-full mix-blend-screen">
                                    <img
                                        src="/images/rarities/purple.webp"
                                        className="object-cover object-center w-full"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="min-w-[80px] relative -left-1.5 sm:left-0">
                            <p className="text-xl text-white font-extrabold leading-7">0.001</p>
                            <p className="text-sm font-medium font-book text-[#C4C4C4]">~$0.15</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-book font-bold text-[#C4C4C4]">Chance</p>
                        <p className="font-bold text-white leading-7">0.43%</p>
                    </div>
                </div>
                <div
                    className="w-12 h-12 absolute -top-6 -left-6 rounded-full blur-[60px] pointer-events-none text-[#39c4ff]"
                ></div>
                <div
                    className="absolute right-0 inset-y-0 m-auto w-max h-max text-[#9176ff]"
                >
                    <div
                        className="bg-gradient-to-b from-transparent via-white to-transparent absolute right-0 w-1/2 h-full mix-blend-plus-lighter transition-opacity opacity-10 z-[3] duration-[1s]"
                    ></div>
                    <div
                        className="w-[200%] h-[200%] rounded-[100%] bg-current absolute top-1/2 -translate-y-1/2 left-[5px] blur-2xl opacity-100 transition-opacity duration-[1s]"
                    ></div>
                    <svg
                        width="9"
                        height="64"
                        viewBox="0 0 9 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g filter="url(#filter0_d_1277_23299)">
                            <path
                                d="M4 7.52179C4 6.80462 4.384 6.14235 5.00641 5.78606L7.5032 4.35681C8.16986 3.9752 9 4.45652 9 5.22468L9 58.7753C9 59.5435 8.16986 60.0248 7.5032 59.6432L5.00641 58.2139C4.384 57.8577 4 57.1954 4 56.4782L4 7.52179Z"
                                fill="currentColor"
                            ></path>
                            <path
                                d="M4.2 7.52179C4.2 6.87634 4.5456 6.28029 5.10577 5.95963L7.60256 4.53039C8.13589 4.22509 8.8 4.61016 8.8 5.22468L8.8 58.7753C8.8 59.3898 8.13589 59.7749 7.60256 59.4696L5.10577 58.0404C4.5456 57.7197 4.2 57.1237 4.2 56.4782L4.2 7.52179Z"
                                stroke="url(#paint0_linear_1277_23299)"
                                stroke-opacity="0.5"
                                stroke-width="0.4"
                            ></path>
                        </g>
                        <g opacity="0.5" filter="url(#filter1_f_1277_23299)">
                            <path
                                d="M5 10.4449C5 9.85277 5.26235 9.29111 5.71642 8.9111L6.35821 8.374C7.00915 7.82923 8 8.29206 8 9.14088L8 54.8591C8 55.7079 7.00915 56.1708 6.3582 55.626L5.71642 55.0889C5.26235 54.7089 5 54.1472 5 53.5551L5 10.4449Z"
                                fill="url(#paint1_linear_1277_23299)"
                            ></path>
                        </g>
                        <defs>
                            <filter
                                id="filter0_d_1277_23299"
                                x="0"
                                y="0.223145"
                                width="13"
                                height="63.5537"
                                filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB"
                            >
                                <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                ></feColorMatrix>
                                <feOffset></feOffset>
                                <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                                <feComposite in2="hardAlpha" operator="out"></feComposite>
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0.403922 0 0 0 0 0.254902 0 0 0 0 1 0 0 0 0.5 0"
                                ></feColorMatrix>
                                <feBlend
                                    mode="normal"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_1277_23299"
                                ></feBlend>
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_1277_23299"
                                    result="shape"
                                ></feBlend>
                            </filter>
                            <filter
                                id="filter1_f_1277_23299"
                                x="3"
                                y="6.13916"
                                width="7"
                                height="51.7217"
                                filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB"
                            >
                                <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="BackgroundImageFix"
                                    result="shape"
                                ></feBlend>
                                <feGaussianBlur
                                    stdDeviation="1"
                                    result="effect1_foregroundBlur_1277_23299"
                                ></feGaussianBlur>
                            </filter>
                            <linearGradient
                                id="paint0_linear_1277_23299"
                                x1="9"
                                y1="32"
                                x2="4"
                                y2="32"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stop-color="currentColor" stop-opacity="0"></stop>
                                <stop
                                    offset="1"
                                    stop-color="currentColor"
                                    stop-opacity="0.56"
                                ></stop>
                            </linearGradient>
                            <linearGradient
                                id="paint1_linear_1277_23299"
                                x1="6.5"
                                y1="7"
                                x2="6.5"
                                y2="57"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stop-color="currentColor" stop-opacity="0"></stop>
                                <stop offset="0.5" stop-color="currentColor"></stop>
                                <stop offset="1" stop-color="currentColor" stop-opacity="0"></stop>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>

    )
}

export default UserCard
