import { useUserProvider } from "@/contexts/UserContext";
import { Icon } from "@iconify-icon/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const DropdownProfile: React.FC<{ user: IUser }> = ({ user }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>("Options")

    const { setSolBalance } = useUserProvider();
    const navigate = useNavigate();

    const dropdownRef = useRef<HTMLDivElement>(null);

    const { disconnect } = useWallet();

    const optList: IOptionList[] = [
        {
            name: "Options",
            icon: "iconamoon:options-fill",
        },
        {
            name: "Statistics",
            icon: "streamline-plump:content-statistic-solid",
        },
        {
            name: "Transations",
            icon: "icon-park-solid:transaction",
        },
        {
            name: "Disconnect",
            icon: "mdi:logout",
        },
    ]

    const handleClick = (data: string) => {
        setSelected(data);
        setIsOpen(false)
        switch (data) {
            case "Options":
                navigate('/account/options');
                break;
            case "Statistics":
                navigate('/account/statistics');
                break;
            case "Transations":
                navigate('/account/transactions');
                break;
            case "Disconnect":
                disconnect();
                setSolBalance(0)
                navigate('/');
                break;
            default:
                break;
        }
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="w-fit md:w-auto relative inline-block text-left" ref={dropdownRef}>
            <button className="outline-none" onClick={() => setIsOpen(true)}>
                <div className="flex items-center gap-3 transition-colors cursor-pointer lg:-mr-0.5">
                    <div
                        className="rounded-[8px] overflow-hidden border-[1px] border-[#222222] aspect-square hover:brightness-125 duration-300 cursor-pointer w-[46px] h-[46px] transition-[filter] will-change-[filter] group-hover:brightness-125 shrink-0 shadow-[0px_1.48px_0px_0px_#FFFFFF1A_inset] bg-[#303045] p-[1px] border-none"
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
                                    src={`/images/avatars/${user.avatar}`}
                                    className="object-cover object-center w-full h-full"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <Icon icon="icon-park-outline:hamburger-button" width="24" height="24" style={{ color: "#fff" }} />
                </div>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-3 w-[266px] z-[3000] bg-[#1D1D1D] border border-[#303030] rounded-lg focus:outline-none transition duration-200 ease-out">
                    <div className="flex justify-between items-center border-b border-[#303030] transition-colors hover:bg-white/5 p-4 cursor-pointer">
                        <div className="flex items-center gap-2.5">
                            <div
                                className="rounded-[8px] overflow-hidden border-b-[1px] border-[#222222] aspect-square hover:brightness-125 duration-300 cursor-pointer w-9 h-9 transition-[filter] will-change-[filter] group-hover:brightness-125 shrink-0 shadow-[0px_1.48px_0px_0px_#FFFFFF1A_inset] bg-[#303045] p-[1px] border-none"
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
                                            src={`/images/avatars/${user.avatar}`}
                                            className="object-cover object-center w-full h-full"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <p className="text-base font-semibold max-w-[70px] truncate">{user.username}</p>
                        </div>
                        <div className="p-[1px] rounded-md overflow-hidden bg-[#616161] text-[#D2D2D2]">
                            <div className="flex items-center justify-center rounded-[5px] overflow-hidden bg-[#22222D]/80 font-semibold w-[28px] h-5 text-[11px]">1</div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 p-3">
                        {optList.map((item, index) => (
                            <button
                                key={index}
                                className={`group flex items-center relative min-w-10 overflow-hidden duration-300 px-4 ${selected === item.name ? "bg-[#303030]" : ""
                                    } text-sm font-medium rounded-lg justify-start w-full text-[#C4C4C4] hover:text-white hover:bg-[#303030] hover:border-[#3B3B3B] h-[44px] transition-colors cursor-pointer`}
                                onClick={() => handleClick(item.name)}
                            >
                                <div className="flex items-center font-semibold">
                                    <div className="flex items-center drop-shadow-[0px_2px_0px_rgba(0,0,0,0.5)]">
                                        <Icon icon={item.icon} width="16" height="16" style={{ color: selected === item.name ? "#2c5fbf" : "#fff" }} />
                                    </div>
                                    <span className={`ml-2 text-sm ${selected === item.name ? "text-white" : "text-[#A2A2A2]"}`}>{item.name}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default DropdownProfile
