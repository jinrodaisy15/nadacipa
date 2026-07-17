import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 300);
  }, []);

  // Love counter
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const startDate = new Date('2023-02-14'); // Ganti dengan tanggal jadian kalian
    const updateCounter = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-couple.jpg"
          alt="Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/20 to-purple-900/20" />
      </div>

      {/* Sparkle decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-white/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 12 + 6}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          >
            ✦
          </div>
        ))}
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center px-4 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <p className="font-poppins text-white/80 text-sm tracking-[0.3em] uppercase mb-4">
          Kisah Cinta Kita
        </p>
        <h1 className="font-dancing text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-bold mb-4 drop-shadow-2xl">
          You & Me
        </h1>
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="w-16 h-px bg-white/50" />
          <span className="text-3xl animate-pulse-heart">💕</span>
          <span className="w-16 h-px bg-white/50" />
        </div>
        <p className="font-playfair text-xl sm:text-2xl text-white/90 italic mb-10 max-w-xl mx-auto">
          "Setiap detik bersamamu adalah kenangan terindah yang tak akan pernah terlupakan"
        </p>

        {/* Love Counter */}
        <div className="mb-10">
          <p className="font-poppins text-white/70 text-sm mb-4 tracking-wider uppercase">Kita Sudah Bersama Selama</p>
          <div className="flex items-center justify-center gap-3 sm:gap-6">
            {[
              { value: days, label: 'Hari' },
              { value: hours, label: 'Jam' },
              { value: minutes, label: 'Menit' },
              { value: seconds, label: 'Detik' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-3 py-3 sm:px-5 sm:py-4 min-w-[70px] sm:min-w-[90px]">
                <span className="font-poppins text-2xl sm:text-4xl font-bold text-white block">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="font-poppins text-[10px] sm:text-xs text-white/60 uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <a
          href="#story"
          className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 text-white font-poppins px-8 py-3 rounded-full hover:bg-white/25 transition-all duration-300 group"
        >
          <span>Lihat Kisah Kita</span>
          <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
