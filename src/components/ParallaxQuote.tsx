import { useEffect, useRef, useState } from 'react';

export default function ParallaxQuote() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-32 sm:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/adventure-2.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 40%' }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-3xl mx-auto">
          <span className="text-5xl sm:text-6xl block mb-6">❝</span>
          <p className="font-playfair text-2xl sm:text-3xl md:text-4xl text-white leading-relaxed italic">
            Dalam setiap petualangan, dalam setiap detik kebersamaan, 
            aku menemukan alasan baru untuk jatuh cinta kepadamu lagi dan lagi.
          </p>
          <span className="text-5xl sm:text-6xl block mt-6">❞</span>
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="w-12 h-px bg-white/40" />
            <span className="text-lg">💕</span>
            <span className="w-12 h-px bg-white/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
