import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 300);
  }, []);

  // Love counter — TANGGAL JADIAN: 15 April 2026
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const startDate = new Date('2026-04-15T00:00:00');
    const updateCounter = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      if (diff < 0) {
        setDays(0); setHours(0); setMinutes(0); setSeconds(0);
        return;
      }
      setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((diff / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((diff / (1000 * 60)) % 60));
      setSeconds(Math.floor((diff / 1000) % 60));
    };
    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-couple.jpg"
          alt="Us"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/20 to-purple-900/20" />
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center px-5 w-full max-w-2xl mx-auto pt-16 pb-20 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <p className="font-poppins text-white/70 text-xs sm:text-sm tracking-[0.25em] uppercase mb-3 sm:mb-4">
          ✨ Kisah Cinta Kita ✨
        </p>

        <h1 className="font-dancing text-[3.2rem] leading-tight sm:text-7xl md:text-8xl text-white font-bold mb-3 sm:mb-4 drop-shadow-2xl">
          You & Me
        </h1>

        <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
          <span className="w-10 sm:w-16 h-px bg-white/40" />
          <span className="text-2xl sm:text-3xl animate-pulse-heart">💕</span>
          <span className="w-10 sm:w-16 h-px bg-white/40" />
        </div>

        <p className="font-playfair text-base sm:text-xl md:text-2xl text-white/85 italic mb-8 sm:mb-10 px-2 leading-relaxed">
          "Setiap detik bersamamu adalah kenangan terindah yang tak akan pernah terlupakan"
        </p>

        {/* Love Counter */}
        <div className="mb-8 sm:mb-10">
          <p className="font-poppins text-white/60 text-xs sm:text-sm mb-3 sm:mb-4 tracking-wider uppercase">
            💑 Bersama Sejak 15 April 2026
          </p>
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
            {[
              { value: days, label: 'Hari' },
              { value: hours, label: 'Jam' },
              { value: minutes, label: 'Menit' },
              { value: seconds, label: 'Detik' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl py-3 sm:py-4">
                <span className="font-poppins text-xl sm:text-3xl md:text-4xl font-bold text-white block leading-none">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="font-poppins text-[9px] sm:text-xs text-white/50 uppercase tracking-wider mt-1 block">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <a
          href="#story"
          className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 text-white font-poppins text-sm px-6 py-3 sm:px-8 sm:py-3.5 rounded-full hover:bg-white/25 active:bg-white/30 transition-all duration-300 group"
        >
          <span>Lihat Kisah Kita</span>
          <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>

      {/* Scroll indicator - hidden on very small screens */}
      <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 animate-float hidden sm:block">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center pt-1.5 sm:pt-2">
          <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-white/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
