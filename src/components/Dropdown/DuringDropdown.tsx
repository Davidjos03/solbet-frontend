import { useEffect, useRef, useState } from 'react'
import { Icon } from "@iconify-icon/react";

const DuringDropdown: React.FC<{ duringList: string[]; duringTime: string; setDuringTime: (str: string) => void }> = ({ duringList, duringTime, setDuringTime }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
        <div className="w-full md:w-auto relative inline-block text-left cursor-pointer z-[4000]" ref={dropdownRef}>
            <div className="flex w-full bg-gradient-border-btn p-[1px] rounded-lg">
                <button className="group justify-center relative gap-1 h-10 min-w-10 overflow-hidden transition duration-300 px-4 w-full bg-layer hover:bg-[#162135]/75 text-sm font-medium text-white rounded-lg flex items-center border-[#3B3B3B] cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <p className="font-bold text-white font-inter drop-shadow-small">{duringTime}</p>
                    <Icon icon="ic:baseline-keyboard-arrow-down" width="24" height="24" style={{ color: "#fff" }} />
                </button>
            </div>
            {isOpen && (
                <div className="absolute right-0 p-2 mt-2 w-[200px] z-[3000] bg-layer border border-border rounded-lg focus:outline-none transition duration-200 ease-out">
                    {duringList.map((item, index) => (
                        <div key={index} className="block data-[focus]:bg-border text-white px-3 py-2 rounded-md text-sm font-semibold cursor-pointer transition-colors" onClick={() => { setIsOpen(false); setDuringTime(item) }}>
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DuringDropdown
