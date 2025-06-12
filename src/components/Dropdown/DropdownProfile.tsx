import { useUserProvider } from "@/contexts/UserContext";
import { Icon } from "@iconify-icon/react";

const DropdownProfile: React.FC<{ top: string; left: string }> = ({ top, left }) => {
    const { setIsProfileModal } = useUserProvider()

    return (
        <div
            className="fixed bg-[#242424] flex flex-col animate-popup-enter rounded-lg shadow-lg border border-[#303030] min-w-[176px] z-[999]"
            style={{
                top: `${top}px`,
                left: `${left}px`
            }}
        >
            <div className="flex items-center gap-2 p-4 border-b border-[#303030]">
                <div className="overflow-hidden border-[1px] border-[#222222] aspect-square hover:brightness-125 transition-[filter] duration-300 cursor-pointer w-6 h-6 rounded-full">
                    <img src="/images/avatars/9fddb4e7b9f48a521886e34bd22474b9ae8da2665a6983b2923f5a3a6e60d81b.jpeg" className="object-cover object-center w-full h-full" alt=""></img>
                </div>
                <p className="text-sm text-white font-bold max-w-[60px] truncate">Terp</p>
                <div className="p-[1px] rounded-md overflow-hidden bg-[#307293] text-[#75D1FF]">
                    <div className="flex items-center justify-center rounded-[5px] overflow-hidden bg-[#22222D]/80 font-semibold w-[28px] h-5 text-[11px]">11</div>
                </div>
            </div>
            <div className="flex flex-col gap-1 p-2">
                <button
                    className="flex items-center py-2 gap-1.5 text-sm hover:bg-[#303030] border border-transparent hover:border-[#3B3B3B] text-[#A2A2A2] hover:text-white transition-colors px-3 rounded-lg"
                    onClick={() => setIsProfileModal(true)}
                >
                    <Icon icon="material-symbols:person-rounded" width="16" height="16" style={{ color: "#a2a2a2" }} />
                    <p className="text-[#C4C4C4]">Profile</p>
                </button>
            </div>
        </div>
    )
}

export default DropdownProfile
