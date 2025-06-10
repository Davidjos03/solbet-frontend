import { Icon } from "@iconify-icon/react";
import { useState } from "react";

const PreHeader = () => {
    const [onHover, setOnHover] = useState<number>(100)
    const [selected, setSelected] = useState<number>(0)

    const list: { icon: string, colorIcon: string, text: string }[] = [
        { icon: "/images/sheld-icon.svg", colorIcon: "/images/cup-icon.svg", text: "Provably Fair" },
        { icon: "/images/sheld-icon.svg", colorIcon: "/images/cup-icon.svg", text: "FAQ" },
        { icon: "/images/sheld-icon.svg", colorIcon: "/images/cup-icon.svg", text: "Terms of Service" },
        { icon: "/images/sheld-icon.svg", colorIcon: "/images/cup-icon.svg", text: "Leaderboards" },
    ]

    return (
        <div className='flex items-center justify-between w-full px-[15px] py-[11px] bg-[#121322]'>
            <div className="flex items-center gap-4">
                {list.map((item, index) => (
                    <div key={index} className="flex items-center gap-1" onClick={() => setSelected(index)} onMouseEnter={() => setOnHover(index)} onMouseLeave={() => setOnHover(100)}>
                        <img
                            src={onHover === index || selected === index ? item.colorIcon : item.icon}
                            alt="No logo"
                            className={`${onHover === index || selected === index ? "w-[26px] h-[26px]" : "w-[14px] h-[15px] mx-[6px]"}`}
                        />
                        <p className={`text-white text-[16px] font-bold font-inter`}>{item.text}</p>
                    </div>
                ))}
            </div>
            <div className="flex gap-[21px]">
                <Icon icon="ri:discord-fill" width="19" height="15" style={{ color: "#349DFF" }} className="cursor-pointer" />
                <Icon icon="cib:twitter" width="19" height="15" style={{ color: "#349DFF" }} className="cursor-pointer" />
            </div>
        </div>
    )
}

export default PreHeader
