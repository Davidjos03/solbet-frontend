import { Icon } from "@iconify-icon/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AccountSidebar = () => {
    const [selected, setSelected] = useState<string>("Options")

    const navigate = useNavigate();
    const location = useLocation();
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
            name: "Transactions",
            icon: "icon-park-solid:transaction",
        },
        {
            name: "Disconnect",
            icon: "mdi:logout",
        },
    ]

    const handleClick = (data: string) => {
        setSelected(data);
        switch (data) {
            case "Options":
                navigate('/account/options');
                break;
            case "Statistics":
                navigate('/account/statistics');
                break;
            case "Transactions":
                navigate('/account/transactions');
                break;
            case "Disconnect":
                disconnect();
                navigate('/');
                break;
            default:
                break;
        }
    }
    // Set initial selected state based on current path
    useEffect(() => {
        const path = location.pathname;
        if (path.includes('/account/options')) setSelected("Options");
        else if (path.includes('/account/statistics')) setSelected("Statistics");
        else if (path.includes('/account/transactions')) setSelected("Transactions");
    }, [location.pathname]);

    return (
        <div className="flex-none md:w-[190px] sm:px-4 py-3">
            <div className="flex flex-col justify-center w-full">
                <h4 className="text-2xl font-black uppercase md:mb-5 font-airstrike">Profile</h4>
                <div className="flex flex-col gap-1">
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
        </div>
    )
}

export default AccountSidebar
