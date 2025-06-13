import { useUserProvider } from "@/contexts/UserContext"

const ChatItem: React.FC<IChatItem> = ({ image, time, user, msg }) => {
    const { setIsProfileModal } = useUserProvider();

    return (
        <div className="animate-popup-enter" onClick={() => { setIsProfileModal(true) }}>
            <div className="relative bg-[#161635]/70 hover:bg-[#161635] p-3 pl-8 rounded-lg cursor-pointer transition-colors duration-200">
                <div
                    className="w-9 h-9 rounded-[8px] overflow-hidden border-[1px] border-[#222222] aspect-square hover:brightness-125 transition-[filter] duration-300 cursor-pointer absolute -left-3 bg-[#303045] p-[1px] border-none"
                >
                    <div className="w-full h-full p-0.5 rounded-[8px] border-[1px] border-[#222222] bg-gradient-to-b from-[#8A8A8A] to-[#5A5A5A]">
                        <div className="w-full h-full rounded-[8px] border-[1px] border-[#222222] overflow-hidden bg-black/75 shadow-avatar-emboss relative">
                            <img src={`/images/avatars/${image}`} className="object-cover object-center w-full h-full" alt=""></img>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 px-1.5 py-0.5 bg-[#2a2a58] rounded-bl-md rounded-tr-lg">
                    <p className="text-[11px] leading-[16px] text-[#cecece]">{time}</p>
                </div>
                <div className="relative z-[3]">
                    <div className="flex items-center gap-1.5">
                        <p className="text-sm font-bold max-w-[150px] truncate text-white">{user}</p>
                        <div className="p-[1px] rounded-md overflow-hidden bg-[#2A417C] text-[#60AAFF]">
                            <div className="flex items-center justify-center rounded-[5px] overflow-hidden bg-[#22222D]/80 font-semibold w-[28px] h-5 text-[11px]">27</div>
                        </div>
                    </div>
                    <p className="text-sm lg:text-xs 2xl:text-sm text-[#A2A2A2] mt-1 2xl:mt-0.5 word-break select-text">{msg}</p>
                </div>
            </div>
        </div>
    )
}

export default ChatItem
