import { useEffect, useRef, useState } from 'react';

export default function ParallaxQuote() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/adventure-2.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 40%' }}
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center px-6 sm:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-2xl mx-auto">
          <span className="text-3xl sm:text-4xl md:text-5xl block mb-4 sm:mb-6">❝</span>
          <p className="font-playfair text-lg sm:text-2xl md:text-3xl text-white leading-relaxed italic">
            Dalam setiap petualangan, dalam setiap detik kebersamaan,
            aku menemukan alasan baru untuk jatuh cinta kepadamu lagi dan lagi.
          </p>
          <span className="text-3xl sm:text-4xl md:text-5xl block mt-4 sm:mt-6">❞</span>
          <div className="flex items-center justify-center gap-3 mt-4 sm:mt-6">
            <span className="w-8 sm:w-12 h-px bg-white/40" />
            <span className="text-base sm:text-lg">💕</span>
            <span className="w-8 sm:w-12 h-px bg-white/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
