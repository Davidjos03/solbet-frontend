import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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

type AnimationPhase = 'idle' | 'starting' | 'spinning' | 'stopping';

const CardSpinner: React.FC<CardSliderProps> = ({
    cards,
    remainingTime,
    selectCard,
}) => {
    // Configuration
    const [cardWidth, setCardWidth] = useState(180);
    const [cardHeight, setCardHeight] = useState(200);
    const visibleCardCount = 5;
    const totalCardCount = 7;

    // Update card dimensions based on screen size
    useEffect(() => {
        const updateCardDimensions = () => {
            const screenWidth = window.innerWidth;

            if (screenWidth < 640) {
                setCardWidth(140);
                setCardHeight(160);
            } else if (screenWidth < 768) {
                setCardWidth(160);
                setCardHeight(180);
            } else if (screenWidth < 1024) {
                setCardWidth(170);
                setCardHeight(190);
            } else {
                setCardWidth(180);
                setCardHeight(200);
            }
        };

        updateCardDimensions();
        window.addEventListener('resize', updateCardDimensions);

        return () => {
            window.removeEventListener('resize', updateCardDimensions);
        };
    }, []);

    const moved = useRef(false);

    // State
    const [offset, setOffset] = useState(0);
    const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('idle');
    const [spinStartTime, setSpinStartTime] = useState<number | null>(null);
    const [targetOffset] = useState<number | null>(null);
    const [steadySpeed, setSteadySpeed] = useState(1);
    const [spinDirection, setSpinDirection] = useState<1 | -1>(1);
    const [winnerScale, setWinnerScale] = useState(1);
    const [animatedPrice, setAnimatedPrice] = useState(0);
    const [fastLoopActive, setFastLoopActive] = useState(false);

    const requestRef = useRef<number>();
    const previousTimeRef = useRef<number>();
    const containerRef = useRef<HTMLDivElement>(null);

    // Animation parameters
    const startDuration = 800;
    const stopDuration = 1200;

    // Container dimensions
    const [containerWidth, setContainerWidth] = useState(0);
    const [containerCenterX, setContainerCenterX] = useState(0);

    // Update container dimensions
    useEffect(() => {
        const updateContainerDimensions = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const newWidth = rect.width;
                setContainerWidth(newWidth);
                setContainerCenterX(newWidth / 2);
            }
        };

        const initialTimer = setTimeout(updateContainerDimensions, 100);

        const resizeObserver = new ResizeObserver(updateContainerDimensions);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        window.addEventListener('resize', updateContainerDimensions);

        return () => {
            clearTimeout(initialTimer);
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateContainerDimensions);
        };
    }, [cardWidth]);

    // Memoize card positions
    const cardPositions = useMemo(() => {
        const positions: Array<{
            card: IPlayer;
            x: number;
            zIndex: number;
            isCenter: boolean;
            visibleIndex: number;
            isSelected: boolean;
        }> = [];

        if (!cards) return positions;

        const containerCenterX = containerWidth > 0 ? containerWidth / 2 : 0;
        const cardCenterX = cardWidth / 2;

        if (containerWidth === 0) return positions;

        if (cards.length === 0) {
            const centerVisibleIndex = Math.floor(visibleCardCount / 2);
            const centerPosition = containerCenterX - (cardWidth / 2);
            const startPos = centerPosition - (centerVisibleIndex * cardWidth);

            for (let i = 0; i < totalCardCount; i++) {
                const position = startPos + i * cardWidth;
                positions.push({
                    card: {
                        _id: `placeholder-${i}`,
                        user_id: { username: 'Waiting...', avatar: '/images/avatar.png' },
                        price: 0
                    },
                    x: position,
                    zIndex: totalCardCount - Math.abs(i - centerVisibleIndex),
                    isCenter: i === centerVisibleIndex,
                    visibleIndex: i,
                    isSelected: false,
                });
            }
            return positions;
        }

        const startPos = -offset % cardWidth;
        const startIndex = Math.floor(offset / cardWidth) % cards.length;
        const centerVisibleIndex = Math.floor(visibleCardCount / 2);

        for (let i = 0; i < visibleCardCount + 2; i++) {
            const cardIndex = (startIndex + i) % cards.length;
            const position = startPos + i * cardWidth;
            if (position < -cardWidth) continue;
            if (position > containerWidth) continue;

            const isSelected = !!(selectCard && selectCard._id === cards[cardIndex]._id);
            const finalPosition = position;

            const cardCenterPosition = finalPosition + cardCenterX;
            const isAtCenter = Math.abs(cardCenterPosition - containerCenterX) < cardWidth / 4;

            positions.push({
                card: cards[cardIndex],
                x: finalPosition,
                zIndex: visibleCardCount - Math.abs(i - centerVisibleIndex),
                isCenter: isAtCenter,
                visibleIndex: i,
                isSelected,
            });
        }

        return positions;
    }, [offset, cards, selectCard, cardWidth, visibleCardCount, containerWidth]);

    // Easing functions
    function easeOutQuad(t: number) {
        return t * (2 - t);
    }
    function easeInQuad(t: number) {
        return t * t;
    }

    // Calculate center offset for card
    const getCenterOffsetForCard = useCallback((cardId: string) => {
        if (!containerRef.current) return offset;
        const cardIndex = cards.findIndex(c => c._id === cardId);
        if (cardIndex === -1) return offset;

        const cardCenterX = cardWidth / 2;
        const centerVisibleIndex = Math.floor(visibleCardCount / 2);

        const targetCardCenterX = cardIndex * cardWidth + cardCenterX;
        const centerPosition = containerCenterX - (centerVisibleIndex * cardWidth);
        const requiredOffset = targetCardCenterX - centerPosition;

        return requiredOffset;
    }, [offset, cards, cardWidth, containerCenterX, visibleCardCount]);

    // Animation loop
    const animate = useCallback((time: number) => {
        if (previousTimeRef.current === undefined) {
            previousTimeRef.current = time;
        }
        const deltaTime = time - previousTimeRef.current;
        previousTimeRef.current = time;

        if (animationPhase === 'starting' && spinStartTime !== null) {
            const elapsed = time - spinStartTime;
            const t = Math.min(elapsed / startDuration, 1);
            const speed = steadySpeed * easeInQuad(t);
            setOffset(prev => prev + spinDirection * (deltaTime / 1000) * speed * cardWidth);

            if (t >= 1) {
                setAnimationPhase('spinning');
                setSpinStartTime(time);
            }
        } else if (animationPhase === 'spinning' && spinStartTime !== null) {
            const currentSpeed = fastLoopActive ? 20 : steadySpeed;
            setOffset(prev => prev + spinDirection * (deltaTime / 1000) * currentSpeed * cardWidth);

            // Stop if selected card is at center (under triangle button)
            if (selectCard && fastLoopActive) {
                const centerCard = cardPositions.find(pos => pos.isCenter);
                if (centerCard && centerCard.card._id === selectCard._id) {
                    setFastLoopActive(false);
                    setSteadySpeed(1); // Reset to default speed
                    setAnimationPhase('idle');
                    return;
                }
            }
        } else if (animationPhase === 'stopping' && spinStartTime !== null && targetOffset !== null) {
            const elapsed = time - spinStartTime;
            const t = Math.min(elapsed / stopDuration, 1);
            const easedT = easeOutQuad(t);

            const startOffset = offset;
            const newOffset = startOffset + (targetOffset - startOffset) * easedT;
            setOffset(newOffset);

            if (t >= 1) {
                setOffset(targetOffset);
                setAnimationPhase('idle');
                setSteadySpeed(1);
                setSpinDirection(1);
            }
        }

        if (animationPhase !== 'idle') {
            requestRef.current = requestAnimationFrame(animate);
        }
    }, [animationPhase, spinStartTime, steadySpeed, spinDirection, cardWidth, targetOffset, offset, startDuration, stopDuration, fastLoopActive]);

    // Start animation when remainingTime triggers it
    useEffect(() => {
        if (remainingTime <= 59 && remainingTime > 0 && animationPhase === 'idle') {
            moved.current = false;
            setSteadySpeed(1);
            setSpinDirection(1);
            setAnimationPhase('starting');
            setSpinStartTime(performance.now());
        } else if (remainingTime <= 0 && animationPhase !== 'idle' && !selectCard) {
            setAnimationPhase('idle');
        }
    }, [remainingTime, animationPhase, selectCard]);

    // Start fast loop when selectCard is set
    useEffect(() => {
        if (selectCard && remainingTime === 0 && animationPhase === 'idle') {
            // Start fast loop animation with smooth transition
            setFastLoopActive(true);
            setSteadySpeed(20); // Much higher speed for dramatic effect
            setSpinDirection(1);
            setAnimationPhase('spinning'); // Skip starting phase for immediate fast spin
            setSpinStartTime(performance.now());
        }
    }, [selectCard, remainingTime, animationPhase, cards.length, cardWidth, getCenterOffsetForCard, cardPositions]);

    // Auto-center selected card
    useEffect(() => {
        if (remainingTime === 0 && animationPhase === 'idle') {
            const autoCenterTimer = setTimeout(() => {
                let targetCard = null;

                if (selectCard) {
                    targetCard = cardPositions.find(pos => pos.card._id === selectCard._id);
                } else {
                    const cardCenterX = cardWidth / 2;
                    let minDistance = Infinity;

                    cardPositions.forEach(pos => {
                        const cardCenterPosition = pos.x + cardCenterX;
                        const centerVisibleIndex = Math.floor(visibleCardCount / 2);
                        const centerPosition = containerCenterX - (centerVisibleIndex * cardWidth);
                        const distanceFromCenter = Math.abs(cardCenterPosition - centerPosition);

                        if (distanceFromCenter < minDistance) {
                            minDistance = distanceFromCenter;
                            targetCard = pos;
                        }
                    });
                }

                if (targetCard && !moved.current) {
                    const cardCenterX = cardWidth / 2;
                    const centerVisibleIndex = Math.floor(visibleCardCount / 2);

                    const targetCardCenterPosition = targetCard.x + cardCenterX;
                    const centerPosition = containerCenterX - (centerVisibleIndex * cardWidth);
                    const distanceFromCenter = targetCardCenterPosition - centerPosition;

                    if (Math.abs(distanceFromCenter) > 1) {
                        const startOffset = offset;
                        const targetOffset = startOffset + distanceFromCenter;
                        const startTime = performance.now();
                        const duration = 800;

                        const smoothCenter = (currentTime: number) => {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            const easeOutCubic = 1 - Math.pow(1 - progress, 3);

                            const currentOffset = startOffset + (targetOffset - startOffset) * easeOutCubic;
                            setOffset(currentOffset);

                            if (progress < 1) {
                                requestAnimationFrame(smoothCenter);
                            } else {
                                if (selectCard) {
                                    setTimeout(() => {
                                        setWinnerScale(1.15);
                                        setTimeout(() => {
                                            setWinnerScale(1.05);
                                            setTimeout(() => {
                                                const targetPrice = selectCard.price;
                                                const duration = 2000;
                                                const startTime = performance.now();
                                                const priceIncrement = targetPrice / 100;
                                                let currentStep = 0;
                                                const totalSteps = 100;

                                                const animatePrice = (currentTime: number) => {
                                                    const elapsed = currentTime - startTime;
                                                    const progress = Math.min(elapsed / duration, 1);
                                                    currentStep = Math.floor(progress * totalSteps);
                                                    const currentPrice = currentStep * priceIncrement;

                                                    setAnimatedPrice(currentPrice);

                                                    if (progress < 1) {
                                                        requestAnimationFrame(animatePrice);
                                                    } else {
                                                        setAnimatedPrice(targetPrice);
                                                    }
                                                };

                                                requestAnimationFrame(animatePrice);
                                            }, 500);
                                        }, 1000);
                                    }, 300);
                                }
                            }
                        };

                        requestAnimationFrame(smoothCenter);
                        moved.current = true;
                    } else {
                        if (selectCard) {
                            setWinnerScale(1.15);
                            setTimeout(() => {
                                setWinnerScale(1.05);
                                setTimeout(() => {
                                    const targetPrice = selectCard.price;
                                    const duration = 2000;
                                    const startTime = performance.now();
                                    const priceIncrement = targetPrice / 100;
                                    let currentStep = 0;
                                    const totalSteps = 100;

                                    const animatePrice = (currentTime: number) => {
                                        const elapsed = currentTime - startTime;
                                        const progress = Math.min(elapsed / duration, 1);
                                        currentStep = Math.floor(progress * totalSteps);
                                        const currentPrice = currentStep * priceIncrement;

                                        setAnimatedPrice(currentPrice);

                                        if (progress < 1) {
                                            requestAnimationFrame(animatePrice);
                                        } else {
                                            setAnimatedPrice(targetPrice);
                                        }
                                    };

                                    requestAnimationFrame(animatePrice);
                                }, 500);
                            }, 1000);
                        }
                    }
                }
            }, 500);

            return () => clearTimeout(autoCenterTimer);
        }
    }, [remainingTime, selectCard, animationPhase, cardPositions, containerWidth, cardWidth, cards, visibleCardCount]);

    // Reset animated price when no card is selected
    useEffect(() => {
        if (!selectCard) {
            setAnimatedPrice(0);
            moved.current = false;
        }
    }, [selectCard]);

    // Animation frame management
    useEffect(() => {
        if (animationPhase !== 'idle') {
            requestRef.current = requestAnimationFrame(animate);
        }
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
            previousTimeRef.current = undefined;
        };
    }, [animationPhase, animate]);

    return (
        <div className="relative flex items-center justify-center w-full h-full">
            <div className="absolute -top-2 flex items-center justify-center z-[100]">
                <TriangleButton />
            </div>
            <div
                ref={containerRef}
                className="relative flex items-center justify-between h-[260px] py-12 border border-[#555555] rounded-[12px] overflow-hidden w-full max-w-[900px] mx-auto"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, #000 10% 90%, transparent)',
                }}
            >
                {cardPositions.map(({ card, x, zIndex, isCenter, isSelected }) => {
                    if (!card) return null;

                    const width = cardWidth;
                    const height = cardHeight;
                    const opacity = isCenter ? 1 : 0.5;
                    const baseScale = isSelected ? 1.05 : 1;
                    const finalScale = isSelected ? Math.max(baseScale, winnerScale) : 1;

                    return <div
                        key={`${card._id || 'unknown'}-${x}`}
                        className={`absolute flex items-center justify-center ${isSelected ? "ring-[3px] ring-red-500 shadow-lg" : ""} text-white font-bold text-xl rounded-xl shadow-lg`}
                        style={{
                            width: `${width}px`,
                            height: `${height}px`,
                            transform: `translateX(${x}px) scale(${finalScale})`,
                            zIndex,
                            opacity,
                            transition: 'width 0.3s, height 0.3s, transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.3s',
                            backgroundColor: isSelected && winnerScale > 1.05 ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                        }}
                    >
                        <div className={`w-full h-full flex items-center justify-center ${isSelected ? "px-0" : "px-1"}`}>
                            <div
                                className={`carousel-card w-full h-full flex flex-col justify-center aspect-[1/1] bg-[#27354F] border-[0.5px] border-[#2E3E5A] rounded-[12px] ${isSelected ? "p-[2px]" : "p-[1.5px]"}`}
                            >
                                <div className={`flex w-full h-full ${card._id && card._id.length ? "bg-gradient-border" : "bg-gradient-card-border"} p-[1px] rounded-[12px] relative`}>
                                    <img src={card._id && card._id.length ? '/images/Vector.svg' : '/images/Vector-gray.svg'} alt="no image" className="absolute -top-[3px] left-[41%] z-[300] w-[30px] h-[3px]" />
                                    <div className={`${card._id && card._id.length ? "bg-gradient-color" : "bg-gradient-card-color"} w-full h-full absolute top-0 left-0 z-[3] rounded-[12px] flex flex-col justify-center p-4`}>
                                        <div
                                            className="rounded-[12px] overflow-hidden aspect-square hover:brightness-125 transition-[filter] duration-300 cursor-pointer w-[72px] h-[72px] mx-auto bg-layer2 p-[1px] border-none"
                                            style={{
                                                width: isSelected ? '84px' : '72px',
                                                height: isSelected ? '84px' : '72px',
                                            }}
                                        >
                                            <div className={`w-full h-full p-0.5 border-[1px] ${card._id && card._id.length ? "border-secondary" : "border-grey"} rounded-[12px] bg-layer2 p-[1px]`}>
                                                <div className="w-full h-full border-[1px] border-[#222222] rounded-[12px] overflow-hidden bg-black/75 shadow-avatar-emboss relative">
                                                    <img
                                                        src={card.user_id?.avatar || '/images/avatar.png'}
                                                        className={`object-cover object-center w-full h-full`}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 mt-3 mx-auto w-max">
                                            <p className={`${isSelected ? "text-lg" : "text-sm"} font-semibold max-w-[75px] truncate ${card._id && card._id.length ? "text-white" : "text-[#cacaca]"}`}>
                                                {card.user_id?.username || 'Unknown'}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1 mt-3 mx-auto w-max">
                                            <img src="/images/solana.png" className="object-cover object-center w-6 h-6" alt="" />
                                            <p className={`${isSelected ? "text-xl" : "text-base"} font-semibold max-w-[75px] truncate ${card._id && card._id.length ? "text-white" : "text-[#cacaca]"}`}>
                                                {isSelected ? animatedPrice.toFixed(4) : (card.price || 0).toFixed(4)}
                                            </p>
                                        </div>
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