import React, { useEffect, useRef } from "react";

const cardWidth = 170;
const cardHeight = 210;
const autoRotate = true;
const rotateSpeed = 60;

export interface IPlayer {
  _id: string;
  user_id: {
    avatar: string;
    username: string;
  };
  price: number;
}

interface CardCarousel3DProps {
  cards: IPlayer[];
  remainingTime: number;
  selectCard: IPlayer | null;
  isNewRound: boolean;
}

const CardCarousel3D: React.FC<CardCarousel3DProps> = ({
  cards,
  remainingTime,
  selectCard,
  isNewRound,
}) => {
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0); // angle in degrees
  const rotatingTimeout = useRef<NodeJS.Timeout | null>(null);

  // State for rotation and radius
  const radius = useRef(1000);

  useEffect(() => {
    if (!selectCard || !cardContainerRef.current) return;

    const index = cards.findIndex((card) => card._id === selectCard._id);
    if (index === -1) return;

    const cardContainer = cardContainerRef.current;
    const totalCards = cards.length;
    const anglePerCard = 360 / totalCards;

    // Target rotation so the selected card is at the front (angle 0)
    const targetAngle = -index * anglePerCard;
    rotationRef.current = targetAngle;

    // Stop any ongoing animation
    cardContainer.style.animation = "none";

    // Apply manual transform
    cardContainer.style.transform = `rotateX(30deg) rotateY(${targetAngle}deg)`;

    // Optionally clear previous timeout
    if (rotatingTimeout.current) clearTimeout(rotatingTimeout.current);

    // Optional: allow animation to finish then stop
    rotatingTimeout.current = setTimeout(() => {
      cardContainer.style.animationPlayState = "paused";
    }, 1000);
  }, [selectCard, cards]);


  // Initialize carousel
  useEffect(() => {
    const cardContainer = cardContainerRef.current;
    if (!cardContainer) return;
    const imgs = Array.from(cardContainer.getElementsByClassName("carousel-card"));
    cardContainer.style.width = `${cardWidth}px`;
    cardContainer.style.height = `${cardHeight}px`;

    imgs.forEach((img, i) => {
      (img as HTMLElement).style.transform = `rotateY(${i * (360 / imgs.length)}deg) translateZ(${radius.current}px)`;
      (img as HTMLElement).style.transition = "transform 1s";
      (img as HTMLElement).style.transitionDelay = `${(imgs.length - i) / 4}s`;
    });
  }, [cards.length]);

  // Auto-rotate animation
  useEffect(() => {
    const cardContainer = cardContainerRef.current;
    if (!cardContainer) return;
    if (autoRotate && remainingTime > 0 && !isNewRound && !selectCard) {
      const animation = rotateSpeed > 0 ? "spin" : "spinRevert";
      cardContainer.style.animation = `${animation} ${Math.abs(rotateSpeed)}s infinite linear`;
      cardContainer.style.animationPlayState = "running";
    } else {
      const animation = rotateSpeed > 0 ? "spin" : "spinRevert";
      cardContainer.style.animation = `${animation} ${Math.abs(rotateSpeed)}s infinite linear`;
      cardContainer.style.animationPlayState = "paused";
    }

    return () => {
      cardContainer.style.animation = "";
    };
  }, [remainingTime, isNewRound]);

  return (
    <div
      className="relative flex items-center justify-center h-full w-full py-8 border border-[#22222D]/50 rounded-[12px] overflow-hidden"
      style={{ perspective: "9000px", transformStyle: "preserve-3d" }}
    >
      <div
        ref={cardContainerRef}
        className="relative gap-4"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(30deg)",
        }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className="carousel-card absolute left-0 top-0 w-full h-full flex flex-col justify-center aspect-[1/1.15] bg-gradient-to-b from-[#FFFFFF]/15 to-[#2A2E37]/20 rounded-[12px] p-[2px]"
          >
            <div className={`${card._id.length ? "bg-[#16253a]" : "bg-[#141414]"} w-full h-full absolute top-0 left-0 z-[3] rounded-[12px] flex flex-col justify-center`}>
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
        ))}
      </div>
      {/* Add keyframes for spin and spinRevert */}
      <style>{`
        @keyframes spin {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        @keyframes spinRevert {
          from { transform: rotateY(360deg); }
          to { transform: rotateY(0deg); }
        }
      `}</style>
    </div>
  );
};

export default CardCarousel3D;