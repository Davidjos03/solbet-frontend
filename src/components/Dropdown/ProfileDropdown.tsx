import { useEffect, useRef, useState } from 'react'
import { Icon } from "@iconify-icon/react";
import { useUserProvider } from '@/contexts/UserContext';

const profileList: IGameItem[] = [
    { icon: "/images/logo.png", name: "Profile" },
    { icon: "/images/referral-icon.svg", name: "Referrals" },
    { icon: "/images/fairness-icon.svg", name: "Fairness" },
]

const otherList: string[] = ["Support", "Info", "Log-Out"]

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const { userInfo } = useUserProvider()

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
        <div className="w-fit relative inline-block text-left" ref={dropdownRef}>
            <div className="flex gap-[15px] items-center ml-[25px]">
                <p className="text-[#B5C3D575] text-base font-bold font-istok">{userInfo.name}</p>
                <img
                    src={userInfo.icon}
                    alt="No joystick icon"
                    className="w-[37px] h-[37px] rounded-full"
                />
                <div className="flex items-center justify-center" onClick={() => setIsOpen(!isOpen)}>
                    <Icon icon="bxs:down-arrow" width="10" height="10" style={{ color: "#B5C3D575" }} />
                </div>
            </div>
            {isOpen && (
                <div className="absolute right-0 z-20 mt-2 w-[200px] bg-[#1E1E2F] rounded-md shadow-lg focus:outline-none">
                    <div className="py-1" role="none">
                        {profileList.map((item, index) => (
                            <div key={index} className="flex items-center px-[10px] py-[6px] gap-2 hover:bg-[#141625] rounded-[15px] cursor-pointer">
                                <img
                                    src={item.icon}
                                    alt="No logo"
                                    className="w-[23px] h-[25px]"
                                />
                                <p className="text-[#B5C3D5] text-base font-bold font-istok">{item.name}</p>
                            </div>
                        ))}
                        <div className="mx-[10px] my-[6px] border-2 border-[#383462] w-[50%] rounded-full"></div>
                        {otherList.map((item, index) => (
                            <div key={index} className="flex items-center px-[10px] py-[6px] gap-2 hover:bg-[#141625] rounded-[15px] cursor-pointer">
                                <p className="text-[#B5C3D5] text-base font-bold font-istok">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileDropdown
