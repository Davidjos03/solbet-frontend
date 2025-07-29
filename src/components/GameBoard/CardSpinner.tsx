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
    const cardWidth = 180;
    const cardHeight = 200;
    const visibleCardCount = 5;

    const moved = useRef(false);

    // State
    const [offset, setOffset] = useState(0);
    const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('idle');
    const [spinStartTime, setSpinStartTime] = useState<number | null>(null);
    // const [spinDuration, setSpinDuration] = useState<number>(0);
    const [targetOffset, setTargetOffset] = useState<number | null>(null);
    const [steadySpeed, setSteadySpeed] = useState(1); // cards per second
    const [spinDirection, setSpinDirection] = useState<1 | -1>(1); // 1 = right-to-left, -1 = left-to-right

    // Dynamic centering adjustment
    const [selectedCardOffset, setSelectedCardOffset] = useState(0); // Offset for selected card
    const [sliderCompensation, setSliderCompensation] = useState(0); // Slider compensation
    const [winnerScale, setWinnerScale] = useState(1); // Scale for winner card
    const [animatedPrice, setAnimatedPrice] = useState(0); // Animated price for winner card

    const requestRef = useRef<number>();
    const previousTimeRef = useRef<number>();
    const containerRef = useRef<HTMLDivElement>(null);

    // Animation parameters
    const startDuration = 800; // ms
    const stopDuration = 1200; // ms

    // Calculate total width needed
    const containerWidth = visibleCardCount * cardWidth;

    // Memoize card positions to prevent unnecessary re-renders
    const cardPositions = useMemo(() => {
        const positions = [];
        const startPos = -offset % cardWidth;
        const startIndex = Math.floor(offset / cardWidth) % cards.length;
        const centerVisibleIndex = Math.floor(visibleCardCount / 2);

        // Calculate the actual center position of the container
        const containerCenterX = containerWidth / 2;
        const cardCenterX = cardWidth / 2;

        for (let i = 0; i < visibleCardCount + 2; i++) {
            const cardIndex = (startIndex + i) % cards.length;
            const position = startPos + i * cardWidth;
            if (position < -cardWidth) continue;
            if (position > containerWidth) continue;

            // Apply dynamic offset for selected card
            const isSelected = selectCard && selectCard._id === cards[cardIndex]._id;
            const dynamicOffset = isSelected ? selectedCardOffset : 0;

            // Apply slider compensation to all cards
            const finalPosition = position + sliderCompensation + dynamicOffset;

            // Calculate if this card is at the center (after all offsets are applied)
            const cardCenterPosition = finalPosition + cardCenterX;
            const isAtCenter = Math.abs(cardCenterPosition - containerCenterX) < cardWidth / 4; // Tolerance of 1/4 card width

            // Debug logging for selected card
            if (isSelected) {
                console.log('🎯 Selected card positioning:', {
                    cardId: cards[cardIndex]._id,
                    originalPosition: position,
                    finalPosition,
                    cardCenterPosition,
                    containerCenterX,
                    isAtCenter,
                    selectedCardOffset,
                    sliderCompensation
                });
            }

            positions.push({
                card: cards[cardIndex],
                x: finalPosition,
                zIndex: visibleCardCount - Math.abs(i - centerVisibleIndex),
                isCenter: isAtCenter, // Use actual center position after offsets
                visibleIndex: i,
                isSelected,
            });
        }

        return positions;
    }, [offset, cards, selectCard, selectedCardOffset, sliderCompensation, cardWidth, visibleCardCount, containerWidth]);

    // Easing functions
    // function easeInOutQuad(t: number) {
    //     return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    // }
    function easeOutQuad(t: number) {
        return t * (2 - t);
    }
    function easeInQuad(t: number) {
        return t * t;
    }

    // Calculate the offset needed to center a card
    const getCenterOffsetForCard = useCallback((cardId: string) => {
        if (!containerRef.current) return offset;
        const cardIndex = cards.findIndex(c => c._id === cardId);
        if (cardIndex === -1) return offset;

        // Calculate the exact offset needed to center the card
        // We want the center of the selected card to align with the center of the container
        const containerCenterX = containerWidth / 2;
        const cardCenterX = cardWidth / 2;

        // The offset that would put the card's center at the container's center
        const targetCardCenterX = cardIndex * cardWidth + cardCenterX;
        const requiredOffset = targetCardCenterX - containerCenterX;

        return requiredOffset;
    }, [offset, cards, cardWidth, containerWidth]);

    // Animation loop
    const animate = useCallback((time: number) => {
        if (previousTimeRef.current === undefined) {
            previousTimeRef.current = time;
        }
        const deltaTime = time - previousTimeRef.current;
        previousTimeRef.current = time;

        if (animationPhase === 'starting' && spinStartTime !== null) {
            // Ease-in
            const elapsed = time - spinStartTime;
            const t = Math.min(elapsed / startDuration, 1);
            const speed = steadySpeed * easeInQuad(t);
            setOffset(prev => prev + spinDirection * (deltaTime / 1000) * speed * cardWidth);

            if (t >= 1) {
                setAnimationPhase('spinning');
                setSpinStartTime(time);
            }
        } else if (animationPhase === 'spinning' && spinStartTime !== null) {
            // Steady speed
            setOffset(prev => prev + spinDirection * (deltaTime / 1000) * steadySpeed * cardWidth);
        } else if (animationPhase === 'stopping' && spinStartTime !== null && targetOffset !== null) {
            // Ease-out to target
            const elapsed = time - spinStartTime;
            const t = Math.min(elapsed / stopDuration, 1);
            const easedT = easeOutQuad(t);

            // Interpolate from current offset to targetOffset
            const startOffset = offset;
            const newOffset = startOffset + (targetOffset - startOffset) * easedT;
            setOffset(newOffset);

            if (t >= 1) {
                setOffset(targetOffset);
                setAnimationPhase('idle');
                setSteadySpeed(1); // Reset for next round
                setSpinDirection(1); // Reset spin direction
            }
        }

        if (animationPhase !== 'idle') {
            requestRef.current = requestAnimationFrame(animate);
        }
    }, [animationPhase, spinStartTime, steadySpeed, spinDirection, cardWidth, targetOffset, offset, startDuration, stopDuration]);

    // Start animation when remainingTime triggers it
    useEffect(() => {
        if (remainingTime <= 59 && remainingTime > 0 && animationPhase === 'idle') {
            // Reset moved flag for new round
            moved.current = false;
            console.log('🎯 New round started, resetting moved flag');
            
            setSteadySpeed(1); // Start slow
            setSpinDirection(1); // Default: right-to-left
            setAnimationPhase('starting');
            setSpinStartTime(performance.now());
        } else if (remainingTime <= 0 && animationPhase !== 'idle' && !selectCard) {
            setAnimationPhase('idle');
        }
    }, [remainingTime, animationPhase, selectCard]);

    // When selectCard is set and time is 0, start stopping animation
    useEffect(() => {
        if (selectCard && remainingTime === 0 && animationPhase !== 'stopping') {
            console.log('🎯 Setting winner:', selectCard._id);
            setSteadySpeed(3); // Burst of speed before stopping
            // Calculate the offset needed to center the selected card
            const centerOffset = getCenterOffsetForCard(selectCard._id);
            console.log('🎯 Center offset calculated:', centerOffset);
            // Ensure the targetOffset is the closest center position ahead of current offset
            const current = offset;
            let target = centerOffset;
            // Always move forward to the next occurrence of the selected card at center
            while (target < current) target += cards.length * cardWidth;
            console.log('🎯 Final target offset:', target);
            // Remove the following line to avoid overshooting:
            // while (target - current > cards.length * cardWidth / 2) target -= cards.length * cardWidth;
            setTargetOffset(target);
            setSpinStartTime(performance.now());
            setAnimationPhase('stopping');
        }
    }, [selectCard, remainingTime, animationPhase, offset, cards.length, cardWidth, getCenterOffsetForCard]);

    // Dynamic centering adjustment effect
    useEffect(() => {
        if (selectCard && remainingTime === 0 && animationPhase === 'idle') {
            // Wait a bit for the card to be centered first, then apply dynamic offset
            const offsetTimer = setTimeout(() => {
                // Different offset patterns for variety
                const offsetPatterns = [
                    { offset: 20, compensation: -20 },   // Right 20px
                    { offset: -15, compensation: 15 },   // Left 15px
                    { offset: 25, compensation: -25 },   // Right 25px
                    { offset: -20, compensation: 20 },   // Left 20px
                ];

                // Randomly select a pattern
                const pattern = offsetPatterns[Math.floor(Math.random() * offsetPatterns.length)];

                // Add a slight offset to the selected card
                setSelectedCardOffset(pattern.offset);

                // Compensate the slider by moving it in opposite direction
                setSliderCompensation(pattern.compensation);

                // Smooth transition for the compensation - gradually return to center
                const compensationTimer = setTimeout(() => {
                    setSliderCompensation(0);
                }, 1000); // Longer duration for smoother effect

                return () => clearTimeout(compensationTimer);
            }, 500); // Wait 500ms for centering to complete

            return () => clearTimeout(offsetTimer);
        } else {
            // Reset offsets when no card is selected
            setSelectedCardOffset(0);
            setSliderCompensation(0);
        }
    }, [selectCard, remainingTime, animationPhase]);

    // Auto-center selected card when it's off-center
    useEffect(() => {
        if (selectCard && remainingTime === 0 && animationPhase === 'idle') {
            // Find the selected card in current positions
            const selectedCardPosition = cardPositions.find(pos => pos.isSelected);

            if (selectedCardPosition) {
                const containerCenterX = containerWidth / 2;
                const cardCenterX = cardWidth / 2;
                const cardCenterPosition = selectedCardPosition.x + cardCenterX;
                const distanceFromCenter = cardCenterPosition - containerCenterX;

                console.log('🎯 Auto-centering check:', {
                    cardCenterPosition,
                    containerCenterX,
                    distanceFromCenter,
                    threshold: 10
                });

                // If card is more than 10px off-center, auto-center it
                if (Math.abs(distanceFromCenter) > 10) {
                    console.log('🎯 Auto-centering triggered:', distanceFromCenter);

                    // Calculate how much to move the slider
                    const sliderAdjustment = -distanceFromCenter;

                    // Apply smooth centering adjustment
                    setSliderCompensation(sliderAdjustment);

                    // Gradually return to center after adjustment
                    const centeringTimer = setTimeout(() => {
                        setSliderCompensation(0);
                    }, 800);

                    return () => clearTimeout(centeringTimer);
                }
            }
        }
    }, [selectCard, remainingTime, animationPhase, cardPositions, containerWidth, cardWidth]);

    // Post-zero actions - triggered when remainingTime reaches 0
    useEffect(() => {
        if (remainingTime === 0 && animationPhase === 'idle') {

            // Wait for all animations to settle, then auto-center
            const autoCenterTimer = setTimeout(() => {
                // If there's a selected card (winner), center that specific card
                // Otherwise, center the closest card to the center
                let targetCard = null;
                
                if (selectCard) {
                    // Find the selected card in current positions
                    targetCard = cardPositions.find(pos => pos.card._id === selectCard._id);
                    console.log('🎯 Auto-centering selected card (winner):', selectCard._id);
                } else {
                    // Find the closest card to center (fallback)
                    const containerCenterX = containerWidth / 2;
                    const cardCenterX = cardWidth / 2;
                    let minDistance = Infinity;

                    cardPositions.forEach(pos => {
                        const cardCenterPosition = pos.x + cardCenterX;
                        const distanceFromCenter = Math.abs(cardCenterPosition - containerCenterX);

                        if (distanceFromCenter < minDistance) {
                            minDistance = distanceFromCenter;
                            targetCard = pos;
                        }
                    });
                    console.log('🎯 Auto-centering closest card to center');
                }

                if (targetCard && !moved.current) {
                    const containerCenterX = containerWidth / 2;
                    const cardCenterX = cardWidth / 2;

                    const targetCardCenterPosition = targetCard.x + cardCenterX;
                    const distanceFromCenter = targetCardCenterPosition - containerCenterX;

                    // Move slider to center the target card
                    if (Math.abs(distanceFromCenter) > 1) { // Only move if not already centered
                        console.log('🎯 Moving slider to center target card:', distanceFromCenter);

                        // Smooth centering with easing
                        const startOffset = offset;
                        const targetOffset = startOffset + distanceFromCenter;
                        const startTime = performance.now();
                        const duration = 800; // 800ms for smooth movement

                        const smoothCenter = (currentTime: number) => {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);

                            // Easing function for smooth movement
                            const easeOutCubic = 1 - Math.pow(1 - progress, 3);

                            const currentOffset = startOffset + (targetOffset - startOffset) * easeOutCubic;
                            setOffset(currentOffset);

                            if (progress < 1) {
                                requestAnimationFrame(smoothCenter);
                            } else {
                                // Slider has completely stopped, now check for selectCard and scale
                                console.log('🎯 Slider stopped, checking for selectCard');
                                
                                if (selectCard) {
                                    console.log('🎯 selectCard found, starting winner scaling sequence');
                                    
                                    // Scale up winner card after slider stops
                                    setTimeout(() => {
                                        console.log('🎯 Starting winner scale up animation');
                                        setWinnerScale(1.15);
                                        console.log('🎯 Winner card scaled up to 1.15');
                                        
                                        // Scale back down after a moment
                                        setTimeout(() => {
                                            console.log('🎯 Starting winner scale down animation');
                                            setWinnerScale(1.05);
                                            console.log('🎯 Winner card scaled down to 1.05');
                                            
                                            // Start price counting animation after scaling is complete
                                            setTimeout(() => {
                                                console.log('🎯 Starting price counting animation');
                                                const targetPrice = selectCard.price;
                                                const duration = 2000; // 2 seconds for price counting
                                                const startTime = performance.now();
                                                
                                                // Price increase function - increment by small steps
                                                const priceIncrement = targetPrice / 100; // Divide into 100 steps
                                                let currentStep = 0;
                                                const totalSteps = 100;
                                                
                                                const animatePrice = (currentTime: number) => {
                                                    const elapsed = currentTime - startTime;
                                                    const progress = Math.min(elapsed / duration, 1);
                                                    
                                                    // Calculate current step based on progress
                                                    currentStep = Math.floor(progress * totalSteps);
                                                    const currentPrice = currentStep * priceIncrement;
                                                    
                                                    setAnimatedPrice(currentPrice);
                                                    
                                                    console.log(`🎯 Price animation: step=${currentStep}, currentPrice=${currentPrice.toFixed(4)}`);
                                                    
                                                    if (progress < 1) {
                                                        requestAnimationFrame(animatePrice);
                                                    } else {
                                                        console.log('🎯 Price counting animation complete');
                                                        setAnimatedPrice(targetPrice); // Ensure final value is exact
                                                    }
                                                };
                                                
                                                requestAnimationFrame(animatePrice);
                                            }, 500); // Wait 500ms after scaling down
                                        }, 1000);
                                    }, 300);
                                } else {
                                    console.log('🎯 No selectCard, skipping winner scaling');
                                }
                            }
                        };

                        requestAnimationFrame(smoothCenter);
                        moved.current = true;
                    } else {
                        // Card is already centered, check for selectCard and scale immediately
                        if (selectCard) {
                            console.log('🎯 Card already centered, scaling winner card');
                            setWinnerScale(1.15);
                            setTimeout(() => {
                                setWinnerScale(1.05);
                                
                                // Start price counting animation after scaling
                                setTimeout(() => {
                                    console.log('🎯 Starting price counting animation (already centered)');
                                    const targetPrice = selectCard.price;
                                    const duration = 2000; // 2 seconds for price counting
                                    const startTime = performance.now();
                                    
                                    // Price increase function - increment by small steps
                                    const priceIncrement = targetPrice / 100; // Divide into 100 steps
                                    let currentStep = 0;
                                    const totalSteps = 100;
                                    
                                    const animatePrice = (currentTime: number) => {
                                        const elapsed = currentTime - startTime;
                                        const progress = Math.min(elapsed / duration, 1);
                                        
                                        // Calculate current price based on progress
                                        currentStep = Math.floor(progress * totalSteps);
                                        const currentPrice = currentStep * priceIncrement;
                                        
                                        setAnimatedPrice(currentPrice);
                                        
                                        console.log(`🎯 Price animation (centered): step=${currentStep}, currentPrice=${currentPrice.toFixed(4)}`);
                                        
                                        if (progress < 1) {
                                            requestAnimationFrame(animatePrice);
                                        } else {
                                            console.log('🎯 Price counting animation complete (already centered)');
                                            setAnimatedPrice(targetPrice); // Ensure final value is exact
                                        }
                                    };
                                    
                                    requestAnimationFrame(animatePrice);
                                }, 500); // Wait 500ms after scaling down
                            }, 1000);
                        } else {
                            console.log('🎯 Card centered but no selectCard, skipping scaling');
                        }
                    }
                }
            }, 500); // Wait for all other animations to complete

            return () => clearTimeout(autoCenterTimer);
        }
    }, [remainingTime, selectCard, animationPhase, cardPositions, containerWidth, cardWidth, cards]);

    // Reset animated price when no card is selected
    useEffect(() => {
        if (!selectCard) {
            setAnimatedPrice(0);
            // Reset moved flag when selectCard is cleared (new round)
            moved.current = false;
            console.log('🎯 selectCard cleared, resetting moved flag for next round');
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
        // eslint-disable-next-line
    }, [animationPhase]);

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
                    // padding: `0 ${containerPadding}px`,
                    maskImage: 'linear-gradient(to right, transparent, #000 10% 90%, transparent)',
                }}
            >
                {cardPositions.map(({ card, x, zIndex, isCenter, isSelected }) => {
                    const width = cardWidth;
                    const height = cardHeight;
                    // Highlight center card, dim others
                    const opacity = isCenter ? 1 : 0.5;
                    
                    // Apply winner scaling when isSelected is true
                    // If isSelected is true, use winnerScale (which will be 1.15 or 1.05 during animation)
                    // If isSelected is false, use 1 (normal scale)
                    // For selected cards, start with a slight scale (1.05) even before animation
                    const baseScale = isSelected ? 1.05 : 1;
                    const finalScale = isSelected ? Math.max(baseScale, winnerScale) : 1;
                    
                    // Debug logging for selected card
                    if (isSelected) {
                        console.log(`🎯 Card ${card._id} - isSelected: ${isSelected}, winnerScale: ${winnerScale}, baseScale: ${baseScale}, finalScale: ${finalScale}`);
                    }

                    return <div
                        key={`${card._id}-${x}`}
                        className={`absolute flex items-center justify-center ${isSelected ? "ring-[3px] ring-red-500 shadow-lg" : ""} text-white font-bold text-xl rounded-xl shadow-lg`}
                        style={{
                            width: `${width}px`,
                            height: `${height}px`,
                            transform: `translateX(${x}px) scale(${finalScale})`,
                            zIndex,
                            opacity,
                            transition: 'width 0.3s, height 0.3s, transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.3s',
                            // Add visual indicator during scaling
                            backgroundColor: isSelected && winnerScale > 1.05 ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                        }}
                    >
                        <div className={`w-full h-full flex items-center justify-center ${isSelected ? "px-0" : "px-1"}`}>
                            <div
                                className={`carousel-card w-full h-full flex flex-col justify-center aspect-[1/1] bg-[#27354F] border-[0.5px] border-[#2E3E5A] rounded-[12px] ${isSelected ? "p-[2px]" : "p-[1.5px]"}`}
                            >
                                <div className={`flex w-full h-full ${card._id.length ? "bg-gradient-border" : "bg-gradient-card-border"} p-[1px] rounded-[12px] relative`}>
                                    <img src={card._id.length ? '/images/Vector.svg' : '/images/Vector-gray.svg'} alt="no image" className="absolute -top-[3px] left-[41%] z-[300] w-[30px] h-[3px]" />
                                    <div className={`${card._id.length ? "bg-gradient-color" : "bg-gradient-card-color"} w-full h-full absolute top-0 left-0 z-[3] rounded-[12px] flex flex-col justify-center p-4`}>
                                        <div
                                            className="rounded-[12px] overflow-hidden aspect-square hover:brightness-125 transition-[filter] duration-300 cursor-pointer w-[72px] h-[72px] mx-auto bg-layer2 p-[1px] border-none"
                                            style={{
                                                width: isSelected ? '84px' : '72px',
                                                height: isSelected ? '84px' : '72px',
                                            }}
                                        >
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
                                            <p className={`${isSelected ? "text-lg" : "text-sm"} font-semibold max-w-[75px] truncate ${card._id.length ? "text-white" : "text-[#cacaca]"}`}>
                                                {card.user_id.username}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1 mt-3 mx-auto w-max">
                                            <img src="/images/solana.png" className="object-cover object-center w-6 h-6" alt="" />
                                            <p className={`${isSelected ? "text-xl" : "text-base"} font-semibold max-w-[75px] truncate ${card._id.length ? "text-white" : "text-[#cacaca]"}`}>
                                                {isSelected ? animatedPrice.toFixed(4) : card.price.toFixed(4)}
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