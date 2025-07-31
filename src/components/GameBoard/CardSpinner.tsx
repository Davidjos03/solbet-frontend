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
    // Configuration - Responsive card dimensions
    const [cardWidth, setCardWidth] = useState(180);
    const [cardHeight, setCardHeight] = useState(200);
    const visibleCardCount = 5; // 5 cards visible in center
    const totalCardCount = 7; // 7 cards total (5 visible + 2 hidden on each side)

    // Update card dimensions based on screen size
    useEffect(() => {
        const updateCardDimensions = () => {
            const screenWidth = window.innerWidth;
            
            if (screenWidth < 640) { // Mobile
                setCardWidth(140);
                setCardHeight(160);
            } else if (screenWidth < 768) { // Small tablet
                setCardWidth(160);
                setCardHeight(180);
            } else if (screenWidth < 1024) { // Tablet
                setCardWidth(170);
                setCardHeight(190);
            } else { // Desktop
                setCardWidth(180);
                setCardHeight(200);
            }
            
            // Debug logging for 900-1023px range (only on change)
            if (screenWidth >= 900 && screenWidth <= 1023) {
                const newCardWidth = screenWidth < 640 ? 140 : screenWidth < 768 ? 160 : screenWidth < 1024 ? 170 : 180;
                if (newCardWidth !== cardWidth) {
                    console.log('📱 Screen size update:', {
                        screenWidth,
                        cardWidth: newCardWidth,
                        cardHeight: screenWidth < 640 ? 160 : screenWidth < 768 ? 180 : screenWidth < 1024 ? 190 : 200
                    });
                }
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

    // Dynamic container width based on actual viewport
    const [containerWidth, setContainerWidth] = useState(0);
    const [containerCenterX, setContainerCenterX] = useState(0);

    // Update container dimensions dynamically
    useEffect(() => {
        const updateContainerDimensions = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const newWidth = rect.width;
                setContainerWidth(newWidth);
                setContainerCenterX(newWidth / 2);
            } else {
                // Fallback calculation when container ref is not available
                const fallbackWidth = Math.min(window.innerWidth * 0.9, totalCardCount * cardWidth);
                setContainerWidth(fallbackWidth);
                setContainerCenterX(fallbackWidth / 2);
            }
        };

        // Initial calculation with a small delay to ensure DOM is ready
        const initialTimer = setTimeout(() => {
            updateContainerDimensions();
        }, 100); // Increased delay to ensure card dimensions are set

        // Use ResizeObserver for more accurate resize detection
        const resizeObserver = new ResizeObserver(() => {
            updateContainerDimensions();
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        // Also listen for window resize as backup
        const handleWindowResize = () => {
            updateContainerDimensions();
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            clearTimeout(initialTimer);
            resizeObserver.disconnect();
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [cardWidth]); // Add cardWidth as dependency to recalculate when card dimensions change

    // Force container dimension recalculation when cardWidth changes
    useEffect(() => {
        if (cardWidth > 0 && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const newWidth = rect.width;
            setContainerWidth(newWidth);
            setContainerCenterX(newWidth / 2);
        }
    }, [cardWidth]);

    // Memoize card positions to prevent unnecessary re-renders
    const cardPositions = useMemo(() => {
        const positions: Array<{
            card: IPlayer;
            x: number;
            zIndex: number;
            isCenter: boolean;
            visibleIndex: number;
            isSelected: boolean;
        }> = [];
        
        // Return empty array if cards is undefined or null
        if (!cards) {
            return positions;
        }
        
        // Calculate the actual center position of the container
        const containerCenterX = containerWidth > 0 ? containerWidth / 2 : 0;
        const cardCenterX = cardWidth / 2;
        
        // Safety check for container width
        if (containerWidth === 0) {
            console.warn('⚠️ Container width is 0, using fallback calculation');
            return positions;
        }
        
        // Additional debug for 900-1023px range (reduced frequency)
        if (window.innerWidth >= 900 && window.innerWidth <= 1023 && Math.abs(offset) % 10 < 1) {
            console.log('🔧 Container dimensions:', {
                containerWidth,
                containerCenterX,
                cardWidth,
                cardHeight,
                windowWidth: window.innerWidth
            });
        }
        
        // If cards array is empty, create placeholder cards
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

        // Debug logging for 900-1023px range (reduced frequency)
        if (window.innerWidth >= 900 && window.innerWidth <= 1023 && Math.abs(offset) % 10 < 1) {
            console.log('🔍 900-1023px Debug:', {
                cardWidth,
                containerWidth,
                containerCenterX,
                offset: Math.round(offset * 100) / 100,
                startPos: Math.round(startPos * 100) / 100,
                startIndex,
                visibleCardCount
            });
        }

        for (let i = 0; i < visibleCardCount + 2; i++) {
            const cardIndex = (startIndex + i) % cards.length;
            const position = startPos + i * cardWidth;
            if (position < -cardWidth) continue;
            if (position > containerWidth) continue;

            // Apply dynamic offset for selected card
            const isSelected = !!(selectCard && selectCard._id === cards[cardIndex]._id);
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
        const cardCenterX = cardWidth / 2;
        const centerVisibleIndex = Math.floor(visibleCardCount / 2);

        // The offset that would put the card's center at the container's center
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
            setSteadySpeed(3); // Burst of speed before stopping
            // Calculate the offset needed to center the selected card
            const centerOffset = getCenterOffsetForCard(selectCard._id);
            // Ensure the targetOffset is the closest center position ahead of current offset
            const current = offset;
            let target = centerOffset;
            
            // Ensure we have cards to work with
            if (cards.length > 0) {
                // Always move forward to the next occurrence of the selected card at center
                while (target < current) target += cards.length * cardWidth;
            } else {
                target = current; // No cards available
            }
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
                const cardCenterX = cardWidth / 2;
                const cardCenterPosition = selectedCardPosition.x + cardCenterX;
                const centerVisibleIndex = Math.floor(visibleCardCount / 2);
                // Account for the fact that the middle card should be centered
                const centerPosition = containerCenterX - (centerVisibleIndex * cardWidth);
                const distanceFromCenter = cardCenterPosition - centerPosition;

                // If card is more than 10px off-center, auto-center it
                if (Math.abs(distanceFromCenter) > 10) {
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
    }, [selectCard, remainingTime, animationPhase, cardPositions, containerCenterX, cardWidth, visibleCardCount]);

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
                } else {
                    // Find the closest card to center (fallback)
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

                    // Move slider to center the target card
                    if (Math.abs(distanceFromCenter) > 1) { // Only move if not already centered
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
                                if (selectCard) {
                                    // Scale up winner card after slider stops
                                    setTimeout(() => {
                                        setWinnerScale(1.15);
                                        
                                        // Scale back down after a moment
                                        setTimeout(() => {
                                            setWinnerScale(1.05);
                                            
                                            // Start price counting animation after scaling is complete
                                            setTimeout(() => {
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
                                                    
                                                    if (progress < 1) {
                                                        requestAnimationFrame(animatePrice);
                                                    } else {
                                                        setAnimatedPrice(targetPrice); // Ensure final value is exact
                                                    }
                                                };
                                                
                                                requestAnimationFrame(animatePrice);
                                            }, 500); // Wait 500ms after scaling down
                                        }, 1000);
                                    }, 300);
                                }
                            }
                        };

                        requestAnimationFrame(smoothCenter);
                        moved.current = true;
                    } else {
                        // Card is already centered, check for selectCard and scale immediately
                        if (selectCard) {
                            setWinnerScale(1.15);
                            setTimeout(() => {
                                setWinnerScale(1.05);
                                
                                // Start price counting animation after scaling
                                setTimeout(() => {
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
                                        
                                        if (progress < 1) {
                                            requestAnimationFrame(animatePrice);
                                        } else {
                                            setAnimatedPrice(targetPrice); // Ensure final value is exact
                                        }
                                    };
                                    
                                    requestAnimationFrame(animatePrice);
                                }, 500); // Wait 500ms after scaling down
                            }, 1000);
                        }
                    }
                }
            }, 500); // Wait for all other animations to complete

            return () => clearTimeout(autoCenterTimer);
        }
    }, [remainingTime, selectCard, animationPhase, cardPositions, containerWidth, cardWidth, cards, visibleCardCount]);

    // Reset animated price when no card is selected
    useEffect(() => {
        if (!selectCard) {
            setAnimatedPrice(0);
            // Reset moved flag when selectCard is cleared (new round)
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
                className="relative flex items-center justify-between h-[260px] py-12 border border-[#555555] rounded-[12px] overflow-hidden w-full max-w-[900px] mx-auto"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, #000 10% 90%, transparent)',
                }}
            >
                {cardPositions.map(({ card, x, zIndex, isCenter, isSelected }) => {
                    // Handle undefined card by creating empty card data
                    if (!card) {
                        return null;
                    }

                    const width = cardWidth;
                    const height = cardHeight;
                    // Highlight center card, dim others
                    const opacity = isCenter ? 1 : 0.5;
                    
                    // Apply winner scaling when isSelected is true
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
                            // Add visual indicator during scaling
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