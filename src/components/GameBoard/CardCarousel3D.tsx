import React, { useEffect, useRef } from "react";

const images = [
  "/3D_Carousel/1.jpg",
  "/3D_Carousel/2.jpg",
  "/3D_Carousel/3.jpg",
  "/3D_Carousel/4.jpg",
  "/3D_Carousel/5.jpg",
  "/3D_Carousel/6.jpg",
  "/3D_Carousel/7.jpg",
  "/3D_Carousel/8.jpg",
];

const CardCarousel3D: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const angleStep = 360 / images.length;
  const radius = 280; // Distance from center
  const rotationSpeed = -0.2; // Degrees per frame (negative for clockwise)
  const tiltAngle = -15; // Slight downward tilt in degrees

  // Initialize carousel positions and start animation
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Position each card in 3D space
    const cards = Array.from(carousel.children) as HTMLElement[];
    cards.forEach((card, i) => {
      const angle = i * angleStep;
      card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
      card.style.transition = "transform 0.8s ease-out";
    });

    // Auto-rotation animation
    let angle = 0;
    let animationId: number;

    const animate = () => {
      angle += rotationSpeed;
      carousel.style.transform = `rotateX(${tiltAngle}deg) rotateY(${angle}deg)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-[400px] bg-gray-900 p-4">
      <div
        className="relative h-[400px] w-full max-w-3xl"
        style={{ perspective: "1000px" }}
      >
        <div
          ref={carouselRef}
          className="top-1/2 left-1/2 w-full h-full"
          style={{
            transform: `translate(-50%, -50%) rotateX(${tiltAngle}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-44 h-64"
              style={{
                transform: `translate(-50%, -50%) rotateY(${i * angleStep}deg) translateZ(${radius}px)`,
              }}
            >
              <div className="relative w-full h-full">
                <img
                  src={src}
                  alt={`Card ${i + 1}`}
                  className="absolute w-full h-full object-cover rounded-xl shadow-2xl"
                  style={{
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl" />
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-white text-center">
          <p className="text-xl font-light">3D Auto-Rotating Carousel</p>
        </div>
      </div>
    </div>
  );
};

export default CardCarousel3D;