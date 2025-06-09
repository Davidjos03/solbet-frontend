import { useEffect, useRef, useState } from 'react'
import { Icon } from "@iconify-icon/react";

const gameList: IGameItem[] = [
    { icon: "/images/joystick-icon.svg", name: "Games" },
    { icon: "/images/joystick-icon.svg", name: "Cases" },
    { icon: "/images/joystick-icon.svg", name: "Battles" },
    { icon: "/images/joystick-icon.svg", name: "Blackjack" },
    { icon: "/images/joystick-icon.svg", name: "Plinko" },
]

const GameDropdown = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedGame, setSelectedGame] = useState<IGameItem>(gameList[0]);

    const dropdownRef = useRef<HTMLDivElement>(null);

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
        <div className="w-full relative inline-block text-left" ref={dropdownRef}>
            <button className="flex px-[10px] py-[6px] gap-2 items-center bg-[#141625] rounded-[15px] ml-[25px]" onClick={() => setIsOpen(!isOpen)}>
                <img
                    src={selectedGame.icon}
                    alt="No joystick icon"
                    className="w-[23px] h-[15px]"
                />
                <p className="text-[#B5C3D575] text-base font-bold font-istok">{selectedGame.name}</p>
                <Icon icon="bxs:down-arrow" width="10" height="10" style={{ color: "#B5C3D575" }} />
            </button>
            {isOpen && (
                <div className="absolute left-0 z-20 mt-2 w-[200px] bg-[#1E1E2F] rounded-md shadow-lg focus:outline-none">
                    <div className="py-1" role="none">
                        {gameList.map((item, index) => (
                            <div key={index} className="flex items-center px-[10px] py-[6px] gap-2 hover:bg-[#141625] rounded-[15px] cursor-pointer" onClick={() => { setIsOpen(false); setSelectedGame(item) }}>
                                <img
                                    src={item.icon}
                                    alt="No logo"
                                    className="w-[23px] h-[15px]"
                                />
                                <p className="text-[#B5C3D575] text-base font-bold font-istok">{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default GameDropdown
