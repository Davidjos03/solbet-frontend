import { useEffect, useRef, useState } from 'react';

interface IPlayer {
  _id: string;
  user_id: {
    _id: string;
    username: string;
    avatar: string;
  };
  price: number;
}

const SmoothCardCarousel: React.FC<{
  cards: IPlayer[],
  remainingTime: number,
  selectCard: IPlayer | null
}> = ({ cards, remainingTime, selectCard }) => {
  const VISIBLE_CARDS = 5;
  const CENTER_INDEX = Math.floor(VISIBLE_CARDS / 2);
  const BASE_TRANSITION_DURATION = 500;
  const BASE_AUTO_ADVANCE_DELAY = 600;
  const CARD_WIDTH = 180;
  const CARD_HEIGHT = 220;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Get visible cards centered around currentIndex
  const getVisibleCards = () => {
    const visibleCards = [];
    for (let i = -CENTER_INDEX; i <= CENTER_INDEX; i++) {
      const index = (currentIndex + i + cards.length) % cards.length;
      visibleCards.push(cards[index]);
    }
    return visibleCards;
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % cards.length);
  };

  const startAutoRotation = () => {
    stopAutoRotation();
    setIsAutoRotating(true);
    intervalRef.current = setInterval(goToNext, BASE_AUTO_ADVANCE_DELAY);
  };

  const stopAutoRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsAutoRotating(false);
  };

  // Center the selectCard when it changes
  useEffect(() => {
    if (selectCard) {
      console.log("🚀 ~ useEffect ~ selectCard:", selectCard)
      const selectedIndex = cards.findIndex(c => c._id === selectCard._id);
      console.log("🚀 ~ useEffect ~ selectedIndex:", selectedIndex)
      if (selectedIndex !== -1) {
        setCurrentIndex(selectedIndex);
        stopAutoRotation();
      }
    } else if (remainingTime > 0) {
      startAutoRotation();
    }
  }, [selectCard]);

  // Handle timer changes
  useEffect(() => {
    if (remainingTime <= 0 && remainingTime == 59) {
      stopAutoRotation();
    } else if (isAutoRotating) {
      startAutoRotation();
    }
  }, [remainingTime]);

  // useEffect(() => {
  //   startAutoRotation();
  //   return () => stopAutoRotation();
  // }, []);

  const visibleCards = getVisibleCards();
  const containerWidth = CARD_WIDTH * VISIBLE_CARDS;

  return (
    <div className="flex flex-col items-center justify-center h-fit">
      <div className="w-full">
        {/* Carousel Container */}
        <div
          ref={containerRef}
          className="relative h-64 w-full overflow-hidden border border-[#444444] rounded-md"
        >
          <div
            className="absolute flex items-center h-full"
            style={{
              width: `${containerWidth}px`,
              left: '50%',
              transform: 'translateX(-10%)'
            }}
          >
            {visibleCards.map((card, index) => {
              const isCenter = index === CENTER_INDEX;
              const distanceFromCenter = Math.abs(index - CENTER_INDEX);
              const scale = 1 - (distanceFromCenter * 0.1);
              const opacity = 1 - (distanceFromCenter * 0.2);
              const zIndex = VISIBLE_CARDS - distanceFromCenter;
              const isSelected = selectCard ? card._id === selectCard._id : false;

              return (
                <div
                  key={`${card.user_id._id}-${index}`}
                  className={`absolute transition-all duration-${BASE_TRANSITION_DURATION} 
                    flex items-center justify-center ${card._id.length ? "bg-[#1e325c]" : "bg-[#272727]"} rounded-lg shadow-md
                    ${isCenter ? 'text-white' : 'text-[#2e2e2e]'}
                    ${isSelected ? 'ring-2 ring-[#ce3030]' : ''}`}
                  style={{
                    width: `${CARD_WIDTH}px`,
                    height: `${CARD_HEIGHT}px`,
                    transform: `translateX(${(index - CENTER_INDEX) * CARD_WIDTH}px) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    transition: `all ${BASE_TRANSITION_DURATION}ms ease-in-out`,
                    cursor: 'default'
                  }}
                >
                  <div className={`flex flex-col justify-center aspect-[1/1.15] bg-gradient-to-b from-[#FFFFFF]/15 to-[#2A2E37]/20 rounded-[12px] p-[2px] w-full h-full ${isSelected ? 'bg-yellow-400/10' : ''}`}>
                    <div className="bg-[#141414] w-full h-full absolute top-0 left-0 z-[3] rounded-[12px] duration-500 flex flex-col justify-center transition-opacity will-change-opacity">
                      <div className="rounded-[18px] overflow-hidden border-[1px] border-[#222222] aspect-square hover:brightness-125 transition-[filter] duration-300 cursor-pointer w-[72px] h-[72px] mx-auto bg-[#303045] p-[1px] border-none">
                        <div className="w-full h-full p-0.5 border-[1px] border-[#222222] rounded-[18px] bg-gradient-to-b from-[#8A8A8A] to-[#5A5A5A]">
                          <div className="w-full h-full border-[1px] border-[#222222] rounded-[18px] overflow-hidden bg-black/75 shadow-avatar-emboss relative">
                            <img
                              src={`/images/avatars/${card.user_id.avatar}`}
                              className={`object-cover ${card._id.length ? "opacity-100" : "opacity-30"} object-center w-full h-full`}
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
              );
            })}
          </div>
        </div>

        {/* Controls and Status */}
        {/* <div className="flex flex-col items-center mt-6 gap-4">
          <div className="text-center py-2">
            {currentIndex + 1} / {cards.length} •
            Time: {remainingTime > 0 ? `${remainingTime}s` : 'Selection made'}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SmoothCardCarousel;