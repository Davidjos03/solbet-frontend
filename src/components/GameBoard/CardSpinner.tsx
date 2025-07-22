import React, { useState, useEffect, useRef } from 'react';
import TriangleButton from './TriangleButton';

interface IPlayer {
    _id: string;
    user_id: {
        avatar: string;
        username: string;
    };
    price: number;
}

interface CardSliderProps {
    cards: IPlayer[];
    remainingTime: number;
    selectCard: IPlayer | null;
}

const CardSpinner: React.FC<CardSliderProps> = ({
    cards,
    remainingTime,
    selectCard,
}) => {
    // Configuration
    const cardWidth = 180;
    const cardHeight = 200;
    const visibleCardCount = 5;
    const containerPadding = 20;

    // State
    const [offset, setOffset] = useState(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [animationSpeed, setAnimationSpeed] = useState<number>(1);
    const requestRef = useRef<number>();
    const previousTimeRef = useRef<number>();
    const containerRef = useRef<HTMLDivElement>(null);

    // Calculate total width needed
    const containerWidth = visibleCardCount * cardWidth + containerPadding * 2;

    // Calculate visible card positions
    const getCardPositions = () => {
        const positions = [];
        const startPos = -offset % cardWidth;
        const startIndex = Math.floor(offset / cardWidth) % cards.length;

        for (let i = 0; i < visibleCardCount + 2; i++) {
            const cardIndex = (startIndex + i) % cards.length;
            const position = startPos + i * cardWidth;
            if (position < -cardWidth) continue;
            if (position > containerWidth) continue;

            positions.push({
                card: cards[cardIndex],
                x: position,
                zIndex: visibleCardCount - Math.abs(i - Math.floor(visibleCardCount / 2))
            });
        }

        return positions;
    };

    // Animation loop
    const animate = (time: number) => {
        if (previousTimeRef.current === undefined) {
            previousTimeRef.current = time;
        }

        const deltaTime = time - previousTimeRef.current;
        previousTimeRef.current = time;

        if (isPlaying) {
            setOffset((prev) => {
                const newOffset = prev + (deltaTime / 1000) * animationSpeed * cardWidth
                return newOffset
            });
        }
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [isPlaying]);

    useEffect(() => {
        if (remainingTime < 59 && remainingTime > 0 && !isPlaying) {
            setIsPlaying(true);
            setAnimationSpeed(1);
        } else if (remainingTime <= 0 && isPlaying) {
            setIsPlaying(false);
        }
    }, [remainingTime, isPlaying])

    useEffect(() => {
        if (selectCard && remainingTime == 0) {
            setIsPlaying(true);
            setAnimationSpeed(3);
        }
    }, [selectCard, remainingTime]);

    useEffect(() => {
        // Check if the selected card is centered and set winnerSelected
        if (!selectCard) return;
        const positions = getCardPositions();
        const centerX = containerRef.current ? containerRef.current.offsetWidth / 2 : 0;
        const selected = positions.find(p => p.card._id === selectCard._id);
        if (selected && typeof selected.x === 'number') {
            console.log("🚀 ~ useEffect ~ selectCard:", selectCard)
            const diff = Math.abs(selected.x + (cardWidth) / 2 + 17 - centerX);
            if (diff < 5) {
                console.log("centerx", centerX);
                console.log("position =>", diff);
                console.log("selected.x =>", selected.x);
                console.log("cardWidth => ", cardWidth);
                setIsPlaying(false);
            }
        }
    }, [offset, selectCard, containerWidth]);

    return (
        <div className="relative flex items-center justify-center w-full h-full">
            <div className="absolute -top-2 flex items-center justify-center z-[100]">
                <TriangleButton />
            </div>

            {/* Cards Container */}
            <div
                ref={containerRef}
                className="relative flex items-center justify-between h-[260px] py-12 border border-[#555555] rounded-[12px] overflow-hidden"
                style={{
                    width: `${containerWidth}px`,
                    padding: `0 ${containerPadding}px`,
                    maskImage: 'linear-gradient(to right, transparent, #000 10% 90%, transparent)',
                }}
            >
                {getCardPositions().map(({ card, x, zIndex }) => {
                    const isSelected = selectCard && selectCard._id === card._id;

                    return <div
                        key={`${card._id}-${x}`}
                        className={`absolute flex items-center justify-center ${isSelected ? "ring-[2px] ring-red-500 shadow-lg scale-[1.3]" : ""} text-white font-bold text-xl rounded-lg shadow-lg`}
                        style={{
                            width: `${cardWidth - 10}px`,
                            height: `${cardHeight}px`,
                            transform: `translateX(${x}px)`,
                            zIndex,
                            transition: 'transform 1s linear'
                        }}
                    >
                        <div
                            className={`carousel-card absolute left-0 top-0 w-full h-full flex flex-col justify-center aspect-[1/1.15] bg-[#27354F] border-[0.5px] border-[#2E3E5A] rounded-[12px] p-[1.5px]`}
                        >
                            <div className={`flex w-full h-full ${card._id.length ? "bg-gradient-border" : "bg-gradient-card-border"} p-[1px] rounded-[12px] relative`}>
                                <img src={card._id.length ? '/images/Vector.svg' : '/images/Vector-gray.svg'} alt="no image" className="absolute -top-[3px] left-[41%] z-[300] w-[30px] h-[3px]" />
                                <div className={`${card._id.length ? "bg-gradient-color" : "bg-gradient-card-color"} w-full h-full absolute top-0 left-0 z-[3] rounded-[12px] flex flex-col justify-center p-4`}>
                                    <div className="rounded-[12px] overflow-hidden aspect-square hover:brightness-125 transition-[filter] duration-300 cursor-pointer w-[72px] h-[72px] mx-auto bg-layer2 p-[1px] border-none">
                                        <div className={`w-full h-full p-0.5 border-[1px] ${card._id.length ? "border-secondary" : "border-grey"} rounded-[12px] bg-layer2 p-[1px]`}>
                                            <div className="w-full h-full border-[1px] border-[#222222] rounded-[12px] overflow-hidden bg-black/75 shadow-avatar-emboss relative">
                                                <img
                                                    src={card.user_id.avatar}
                                                    className={`object-cover object-center w-full h-full`}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 mt-3 mx-auto w-max">
                                        <p className={`text-sm font-semibold max-w-[75px] truncate ${card._id.length ? "text-white" : "text-[#cacaca]"}`}>
                                            {card.user_id.username}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1 mt-3 mx-auto w-max">
                                        <img src="/images/solana.png" className="object-cover object-center w-6 h-6" alt="" />
                                        <p className={`text-sm font-semibold max-w-[75px] truncate ${card._id.length ? "text-white" : "text-[#cacaca]"}`}>
                                            {card.price.toFixed(4)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })}

            </div>
        </div>
    );
};

export default CardSpinner;