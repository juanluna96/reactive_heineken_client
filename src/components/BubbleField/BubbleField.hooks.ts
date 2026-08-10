import { useEffect, useRef } from 'react';

interface Bubble {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
}

const BUBBLE_COUNT = 40;

export const useBubbleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let bubbles: Bubble[] = [];
    let frameId: number;

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      bubbles = Array.from({ length: BUBBLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedY: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.5,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const bubble of bubbles) {
        bubble.y -= bubble.speedY;
        if (bubble.y < -10) bubble.y = canvas.height + 10;
        ctx.fillStyle = `rgba(112, 220, 141, ${bubble.opacity})`;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fill();
      }
      frameId = requestAnimationFrame(animate);
    };

    setup();
    animate();
    window.addEventListener('resize', setup);

    return () => {
      window.removeEventListener('resize', setup);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return { canvasRef };
};
