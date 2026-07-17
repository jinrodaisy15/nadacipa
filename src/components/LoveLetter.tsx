import { useEffect, useRef, useState } from 'react';

export default function LoveLetter() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="letter"
      ref={sectionRef}
      className="relative py-16 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/90 via-pink-800/85 to-purple-900/90" />
        <img
          src="/images/adventure-5.jpg"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Floating decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <span className="text-white/10 text-xl sm:text-2xl">{['💌', '✨', '💕', '🌹'][i % 4]}</span>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-6 relative">
        {/* Header */}
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-poppins text-rose-gold-light text-xs sm:text-sm tracking-[0.25em] uppercase">Dari Hatiku</span>
          <h2 className="font-dancing text-4xl sm:text-5xl md:text-6xl text-white mt-2 sm:mt-3 mb-3 sm:mb-4">Love Letter</h2>
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 sm:w-12 h-px bg-white/30" />
            <span className="text-lg sm:text-xl">💌</span>
            <span className="w-8 sm:w-12 h-px bg-white/30" />
          </div>
        </div>

        {/* Letter envelope / content */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {!isOpen ? (
            <div className="text-center">
              <button
                onClick={() => setIsOpen(true)}
                className="group relative inline-block w-full max-w-sm"
              >
                <div className="bg-cream rounded-2xl p-8 sm:p-12 md:p-16 shadow-2xl border border-rose-200/30 transition-all duration-500 active:scale-[0.98] group-hover:scale-[1.02] group-hover:shadow-rose-500/20">
                  <div className="text-5xl sm:text-7xl md:text-8xl mb-3 sm:mb-4 group-hover:animate-pulse-heart">💌</div>
                  <p className="font-dancing text-xl sm:text-2xl md:text-3xl text-rose-gold mb-1 sm:mb-2">Buka Surat Cintaku</p>
                  <p className="font-poppins text-warm-brown/50 text-xs sm:text-sm">Tap untuk membaca surat spesial untukmu</p>
                  <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 bg-rose-gold/10 text-rose-gold rounded-full px-4 py-2 text-xs sm:text-sm">
                    <span>Buka Surat</span>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <div className="animate-fade-in-up">
              <div className="bg-cream/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-rose-200/30 relative">
                {/* Decorative corners */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 text-xl sm:text-3xl opacity-15">🌹</div>
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-xl sm:text-3xl opacity-15">🌹</div>
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-xl sm:text-3xl opacity-15">🌸</div>
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 text-xl sm:text-3xl opacity-15">🌸</div>

                {/* Letter content */}
                <div className="max-w-xl mx-auto">
                  <p className="font-dancing text-2xl sm:text-3xl md:text-4xl text-rose-gold mb-5 sm:mb-8 text-center">
                    Untuk Cintaku yang Terindah,
                  </p>

                  <div className="space-y-4 sm:space-y-5 font-playfair text-warm-brown/80 text-[13px] sm:text-base md:text-lg leading-relaxed italic text-left">
                    <p>
                      Hei sayang, aku ingin kamu tahu bahwa kamu adalah hal terbaik yang pernah terjadi
                      dalam hidupku. Setiap pagi ketika aku membuka mata, hal pertama yang aku syukuri
                      adalah kehadiranmu di hidupku.
                    </p>
                    <p>
                      Terima kasih sudah menjadi tempatku pulang, tempatku bersandar ketika dunia
                      terasa berat. Terima kasih sudah selalu sabar menghadapiku, tertawa bersama
                      di saat senang, dan memelukku di saat sedih.
                    </p>
                    <p>
                      Bersama kamu, aku belajar bahwa cinta bukan hanya tentang perasaan yang
                      menggebu-gebu, tapi juga tentang keberanian untuk terus memilih satu sama
                      lain setiap harinya, di saat mudah maupun sulit.
                    </p>
                    <p>
                      Kamu adalah petualangan terbaikku, sahabat terbaikku, dan cinta terbaikku.
                      Aku berjanji akan selalu ada untukmu, mencintaimu, dan membuatmu bahagia
                      sampai kapanpun.
                    </p>
                  </div>

                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-rose-200/50 text-center">
                    <p className="font-dancing text-xl sm:text-2xl md:text-3xl text-rose-gold">
                      Selalu dan Selamanya Mencintaimu,
                    </p>
                    <p className="font-dancing text-base sm:text-xl text-rose-gold/70 mt-1 sm:mt-2">
                      — Dengan Segenap Hatiku 💕
                    </p>
                  </div>

                  <div className="text-center mt-5 sm:mt-8">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-2 bg-rose-gold/10 text-rose-gold rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm active:bg-rose-gold/20 transition-colors font-poppins"
                    >
                      <span>Tutup Surat</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
