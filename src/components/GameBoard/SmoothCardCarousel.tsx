import { useEffect, useRef, useState } from 'react';

const SmoothCardCarousel = () => {
  const TOTAL_CARDS = 20;
  const VISIBLE_CARDS = 5; // Show 5 cards at once
  const CENTER_INDEX = Math.floor(VISIBLE_CARDS / 2); // Index of the centered card (2 in 0-4)
  const TRANSITION_DURATION = 500;
  const AUTO_ADVANCE_DELAY = 600;

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Generate card data
  const cards = Array.from({ length: TOTAL_CARDS }, (_, i) => ({
    id: i + 1,
    content: `Card ${i + 1}`,
  }));

  // Get the 5 visible cards centered around currentIndex
  const getVisibleCards = () => {
    const visibleCards = [];
    for (let i = -CENTER_INDEX; i <= CENTER_INDEX; i++) {
      const index = (currentIndex + i + TOTAL_CARDS) % TOTAL_CARDS;
      visibleCards.push(cards[index]);
    }
    return visibleCards;
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % TOTAL_CARDS);
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
                <div
                  key={`${card.id}-${index}`}
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
                  <span className={`font-medium ${isCenter ? 'text-xl' : 'text-lg'}`}>
                    {card.content}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center mt-6">
          <div className="text-center py-2">
            {currentIndex + 1} / {TOTAL_CARDS}
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