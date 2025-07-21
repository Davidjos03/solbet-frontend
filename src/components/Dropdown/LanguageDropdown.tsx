import { useEffect, useRef, useState } from 'react'
import { Icon } from "@iconify-icon/react";

const languageList: ILanguageItem[] = [
    { name: "English", logo: "/images/flags/US.svg" },
    { name: "Spanish", logo: "/images/flags/ES.svg" },
    { name: "French", logo: "/images/flags/FR.svg" },
    { name: "Turkish", logo: "/images/flags/TR.svg" },
    { name: "Chinese", logo: "/images/flags/CN.svg" },
]

const LanguageDropdown = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [languageItem, setLanguageItem] = useState<ILanguageItem>(languageList[0]);

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
        <div className="w-full md:w-auto relative inline-block text-left" ref={dropdownRef}>
            <button className="group justify-center relative bg-gradient-border-btn h-10 min-w-10 overflow-hidden transition duration-300 p-[1px] w-full text-sm font-medium text-white rounded-lg flex items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div className="flex w-full h-full items-center gap-2 rounded-lg bg-layer2 px-3">
                    <div className="flex items-center bg-layer2 gap-2">
                        <img src={languageItem.logo} alt="no logo" />
                        <p className="text-white">{languageItem.name}</p>
                    </div>
                    <Icon icon="ic:baseline-keyboard-arrow-down" width="24" height="24" style={{ color: "#fff" }} />
                </div>
            </button>
            {isOpen && (
                <div className="absolute bottom-12 right-0 p-2 w-[200px] z-[3000] bg-layer2 border border-border rounded-lg focus:outline-none transition duration-200 ease-out">
                    {languageList.map((item, index) => (
                        <div key={index} className="block data-[focus]:bg-[#0C122C] text-white px-3 py-2 rounded-md text-sm font-semibold cursor-pointer transition-colors" onClick={() => { setIsOpen(false); setLanguageItem(item) }}>
                            {item.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default LanguageDropdown
