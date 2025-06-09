import { useState } from 'react'
import { Icon } from "@iconify-icon/react";
import ComingSoon from './ComingSoon';

const SlideHeader = () => {
    const [selected, setSelected] = useState<string>("All")
    const [onHoverLeft, setOnHoverLeft] = useState<boolean>(false)
    const [onHoverRight, setOnHoverRight] = useState<boolean>(false)
    const [onSlide, setOnSlide] = useState<string>("right")
    const [transitioning, setTransitioning] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);

    const headerList: string[] = ["All", "Cases", "Battles", "Blackjack", "Plinko"]

    const allData: string[] = [
        "/images/slide1.png",
        "/images/slide2.png",
        "/images/slide3.png",
        "/images/slide4.png",
        "/images/slide5.png",
        "/images/slide6.png",
    ]
    const caseData: string[] = []
    const jackData: string[] = []
    const battleData: string[] = []
    const plinkoData: string[] = []


    const goToNext = () => {
        setTransitioning(true);
        setCurrentIndex((prevIndex) =>
            prevIndex === allData.length - 1 ? 0 : prevIndex + 1
        );
        setTimeout(() => setTransitioning(false), 2000);
    };

    const goToPrev = () => {
        setTransitioning(true);
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? allData.length - 1 : prevIndex - 1
        );
        setTimeout(() => setTransitioning(false), 2000);
    };

    const handleSelect = (data: string) => {
        setSelected(data)
    }

    return (
        <div className="flex flex-col gap-[30px]">
            <div className='flex itmes-center justify-between w-full'>
                <div className="flex items-center gap-9">
                    <div className="flex items-center gap-4">
                        <img
                            src="/images/logo.png"
                            alt="No logo"
                            className="w-[38px] h-[37px]"
                        />
                        <p className="text-white text-[24px] font-medium font-inter">All games</p>
                    </div>
                    <div className="flex items-center p-[10px] bg-[#100E1D] gap-4 rounded-full">
                        {headerList.map((item, index) => (
                            <p key={index} className={`text-[#B5C3D580] text-[16px] py-[6px] px-[10px] rounded-full font-semibold ${selected === item ? "bg-[#349DFF] text-white" : "bg-[#100E1D]"
                                } font-inter cursor-pointer hover:text-white hover:bg-[#349DFF]`} onClick={() => handleSelect(item)}>{item}</p>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-9">
                    <button className="flex items-center px-5 py-[6px] text-white text-[16px] font-semibold font-inter bg-[#100E1D] border border-[#B5C3D512] rounded-full">See All</button>
                    <div className="flex items-center gap-6">
                        <div className={`flex items-center justify-center border-2 rounded-full ${onSlide === "right" ? "border-[#349DFF]" : "border-[#2B2B3C]"} hover:border-[#349DFF]`} onClick={() => { setOnSlide("right"); goToPrev() }} onMouseEnter={() => setOnHoverLeft(true)} onMouseLeave={() => setOnHoverLeft(false)}>
                            <Icon icon="ri:arrow-left-s-line" width="24" height="24" style={{ color: `${onHoverLeft || onSlide === "right" ? "#349DFF" : "#2B2B3B"}` }} />
                        </div>
                        <div className={`flex items-center justify-center border-2 rounded-full ${onSlide === "left" ? "border-[#349DFF]" : "border-[#2B2B3C]"} hover:border-[#349DFF]`} onClick={() => { setOnSlide("left"); goToNext() }} onMouseEnter={() => setOnHoverRight(true)} onMouseLeave={() => setOnHoverRight(false)}>
                            <Icon icon="ri:arrow-right-s-line" width="24" height="24" style={{ color: `${onHoverRight || onSlide === "left" ? "#349DFF" : "#2B2B3B"}` }} />
                        </div>
                    </div>
                </div>
            </div >
            {
                selected === "All" && allData.length > 0 ? (
                    <div className='grid grid-cols-6 gap-4 w-full'>
                        {allData.map((_, index) => {
                            const displayIndex = (currentIndex + index) % allData.length;
                            return (
                                <img
                                    key={index + 1}
                                    src={allData[displayIndex]}
                                    alt={`Slide ${index + 1}`}
                                    className="w-[206px] h-[260px] rounded-lg"
                                    style={{
                                        transition: 'opacity 2000ms ease-in-out',
                                        opacity: transitioning ? 0.8 : 1
                                    }}
                                />
                            );
                        })}
                    </div>
                ) : selected === "Cases" && caseData.length > 0 ? (
                    <div className="flex items-center gap-4"></div>
                ) : selected === "Battles" && battleData.length > 0 ? (
                    <div className="flex items-center gap-4"></div>
                ) : selected === "Blackjack" && jackData.length > 0 ? (
                    <div className="flex items-center gap-4"></div>
                ) : selected === "Plinko" && plinkoData.length > 0 ? (
                    <div className="flex items-center gap-4"></div>
                ) : (
                    <ComingSoon />
                )
            }
        </div >
    )
}

export default SlideHeader
