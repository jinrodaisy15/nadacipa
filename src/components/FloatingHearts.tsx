import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const newHearts: Heart[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.1,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-up"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
          }}
        >
          💕
        </div>
      ))}
    </div>
  );
}
