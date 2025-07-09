import { useEffect, useRef } from 'react';

const WavingTextFlag = () => {
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const text = textRef.current;
        if (!text) return;

        const animate = () => {
            const time = Date.now() / 500; // Slower animation
            const letters = text.querySelectorAll('.letter');

            letters.forEach((letter, i) => {
                // Create wave pattern with offset for each letter
                const wave = Math.sin(time + i * 0.3) * 10; // Reduced wave height
                (letter as HTMLElement).style.transform = `translateY(${wave}px)`;
            });

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <div className="xl:flex hidden items-center justify-center h-fit">
            <div
                ref={textRef}
                className="flex font-racing text-4xl leading-9 text-center text-white uppercase drop-shadow-small"
            >
                {'SOLBET'.split('').map((letter, i) => (
                    <span
                        key={i}
                        className="letter inline-block transition-transform duration-300 ease-in-out"
                        style={{
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                            transformOrigin: 'bottom center'
                        }}
                    >
                        {letter}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default WavingTextFlag;