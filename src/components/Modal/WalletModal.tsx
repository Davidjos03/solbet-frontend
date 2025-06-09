import cn from "classnames";
import { Icon } from "@iconify-icon/react";

import { useUserProvider } from "@/contexts/UserContext";
import WalletItem from "./WalletItem";

const WalletModal = () => {
    const { isWalletModal, setIsWalletModal } = useUserProvider();

    const walletList: IWalletItem[] = [
        {
            title: "Crypto",
            icon: "/images/user-logo-icon.png",
            subtitle: "Bitcoin",
            content: "~ $92,501.75",
        },
        {
            title: " ",
            icon: "/images/user-logo-icon.png",
            subtitle: "Ethereum",
            content: "~ $2,312.18",
        },
        {
            title: " ",
            icon: "/images/user-logo-icon.png",
            subtitle: "Litecoin",
            content: "~ $112.37",
        },
        {
            title: "Credit Card",
            icon: "/images/user-logo-icon.png",
            subtitle: "Credit Card",
            content: "Bank",
        },
        {
            title: "Gift Cards",
            icon: "/images/user-logo-icon.png",
            subtitle: "Gift Cards",
            content: "G2A / Kinguin",
        },
        {
            title: "In-game Items",
            icon: "/images/user-logo-icon.png",
            subtitle: "Limiteds",
            content: "Roblox",
        },
    ]

    return (
        <div
            className={`fixed inset-0 z-30 flex items-center justify-center transition-opacity duration-500 ${isWalletModal ? "" : "pointer-events-none"
                }`}
        >
            <div
                className={`fixed inset-0 bg-black transition-opacity bg-[#000000E5] duration-500 ${isWalletModal ? "opacity-75" : "opacity-0"
                    }`}
                onClick={() => setIsWalletModal(false)}
            />

            <div
                className={cn(
                    "flex flex-col",
                    "w-[700px]",
                    "items-center",
                    "rounded-2xl",
                    "bg-[#131123]",
                    "absolute",
                    "z-40",
                    "duration-500 ease-in-out",
                    `${isWalletModal ? "flex-none" : "scale-0"}`
                )}
            >
                <div className="flex w-full items-center justify-between h-[60px] px-7">
                    <div className="flex items-center gap-2">
                        <img
                            src="/images/wallet-icon.svg"
                            alt="No wallet icon"
                            className="w-[23px] h-[20px]"
                        />
                        <p className="font-bold w-full text-white text-center text-[1.5rem] leading-[1.5625rem]">
                            Wallet
                        </p>
                    </div>
                    <button
                        className="flex items-center justify-center"
                        onClick={() => setIsWalletModal(false)}
                    >
                        <Icon icon="lets-icons:close-round" width="24" height="24" style={{ color: "#B5C3D580" }} />
                    </button>
                </div>
                <div className="flex w-full border-b border-[#211C33]"></div>
                <div className="grid grid-cols-3 gap-x-[9px] gap-y-9 pt-8 px-[22px] pb-[54px] w-full">
                    {walletList.map((item, index) => (
                        <WalletItem
                            key={index}
                            title={item.title}
                            icon={item.icon}
                            subtitle={item.subtitle}
                            content={item.content}
                        />
                    ))}
                </div>
            </div>
        </div >
    );
};

export default WalletModal;
