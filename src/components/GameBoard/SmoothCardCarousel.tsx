import { useEffect, useRef, useState } from 'react';

const SmoothCardCarousel: React.FC<{ cards: IPlayer[] }> = ({ cards }) => {
  const VISIBLE_CARDS = 5; // Show 5 cards at once
  const CENTER_INDEX = Math.floor(VISIBLE_CARDS / 2); // Index of the centered card (2 in 0-4)
  const TRANSITION_DURATION = 500;
  const AUTO_ADVANCE_DELAY = 600;

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Get the 5 visible cards centered around currentIndex
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
    intervalRef.current = setInterval(goToNext, AUTO_ADVANCE_DELAY);
  };

  const stopAutoRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startAutoRotation();
    return () => stopAutoRotation();
  }, []);

  const visibleCards = getVisibleCards();
  const cardWidth = 150; // Fixed width for each card
  const containerWidth = cardWidth * VISIBLE_CARDS;

  return (
    <div className="flex flex-col items-center justify-center h-fit">
      <div className="w-full max-w-3xl">
        {/* Carousel Container */}
        <div
          ref={containerRef}
          className="relative h-64 w-full overflow-hidden border"
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

              return (
                // <div
                //   className="preserve-3d backface-hidden will-change-transform"
                //   style={{
                //     width: `${cardWidth}px`,
                //     height: isCenter ? '200px' : '200px',
                //     transform: `translateX(${(index - CENTER_INDEX) * cardWidth}px) scale(${scale})`,
                //     opacity: opacity,
                //     zIndex: zIndex,
                //     transition: `all ${TRANSITION_DURATION}ms ease-in-out`
                //   }}
                // >
                //   <div className="flex flex-col justify-center aspect-[1/1.15] bg-gradient-to-b from-[#FFFFFF]/15 to-[#2A2E37]/0 rounded-[12px] p-[2px] w-full h-full">
                //     <div className="bg-[#141414] w-full h-full absolute top-0 left-0 z-[3] rounded-[12px] duration-500 hidden sm:block transition-opacity will-change-opacity">
                //       <div className="rounded-[18px] overflow-hidden border-[1px] border-[#222222] aspect-square hover:brightness-125 transition-[filter] duration-300 cursor-pointer w-[72px] h-[72px] mx-auto bg-[#303045] p-[1px] border-none">
                //         <div className="w-full h-full p-0.5 border-[1px] border-[#222222] rounded-[18px] bg-gradient-to-b from-[#8A8A8A] to-[#5A5A5A]">
                //           <div className="w-full h-full border-[1px] border-[#222222] rounded-[18px] overflow-hidden bg-black/75 shadow-avatar-emboss relative">
                //             <img src={card.user_id.avatar} className="object-cover object-center w-full h-full" alt=""></img>
                //           </div>
                //         </div>
                //       </div>
                //       <div className="flex items-center gap-1 mt-3 mx-auto w-max mb-3">
                //         <p className="text-sm font-semibold max-w-[75px] truncate text-white">{card.user_id.username}</p>
                //       </div>
                //       <div className="flex items-center gap-1 mt-3 mx-auto w-max mb-3">
                //         <p className="text-sm font-semibold max-w-[75px] truncate text-white">{card.price}</p>
                //       </div>
                //     </div>
                //   </div>
                // </div>
                <div
                  key={`${card.user_id._id}-${index}`}
                  className={`absolute transition-all duration-${TRANSITION_DURATION} 
                    flex items-center justify-center bg-dark rounded-lg shadow-md
                    ${isCenter ? 'text-white' : 'text-gray-800'}`}
                  style={{
                    width: `${cardWidth}px`,
                    height: isCenter ? '200px' : '200px',
                    transform: `translateX(${(index - CENTER_INDEX) * cardWidth}px) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    transition: `all ${TRANSITION_DURATION}ms ease-in-out`
                  }}
                >
                  <div className="flex flex-col justify-center aspect-[1/1.15] bg-gradient-to-b from-[#FFFFFF]/15 to-[#2A2E37]/0 rounded-[12px] p-[2px] w-full h-full">
                    <div className="bg-[#141414] w-full h-full absolute top-0 left-0 z-[3] rounded-[12px] duration-500 hidden sm:block transition-opacity will-change-opacity">
                      <div className="rounded-[18px] overflow-hidden border-[1px] border-[#222222] aspect-square hover:brightness-125 transition-[filter] duration-300 cursor-pointer w-[72px] h-[72px] mx-auto bg-[#303045] p-[1px] border-none">
                        <div className="w-full h-full p-0.5 border-[1px] border-[#222222] rounded-[18px] bg-gradient-to-b from-[#8A8A8A] to-[#5A5A5A]">
                          <div className="w-full h-full border-[1px] border-[#222222] rounded-[18px] overflow-hidden bg-black/75 shadow-avatar-emboss relative">
                            <img src={card.user_id.avatar} className="object-cover object-center w-full h-full" alt=""></img>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-3 mx-auto w-max mb-3">
                        <p className="text-sm font-semibold max-w-[75px] truncate text-white">{card.user_id.username}</p>
                      </div>
                      <div className="flex items-center gap-1 mt-3 mx-auto w-max mb-3">
                        <p className="text-sm font-semibold max-w-[75px] truncate text-white">{card.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center mt-6">
          <div className="text-center py-2">
            {currentIndex + 1} / {cards.length}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={startAutoRotation}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Auto Play
          </button>
          <button
            onClick={stopAutoRotation}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmoothCardCarousel;