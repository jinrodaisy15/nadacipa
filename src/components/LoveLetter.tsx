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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="letter"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
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
        {Array.from({ length: 8 }).map((_, i) => (
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
            <span className="text-white/10 text-2xl">{['💌', '✨', '💕', '🌹'][i % 4]}</span>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-poppins text-rose-gold-light text-sm tracking-[0.3em] uppercase">Dari Hatiku</span>
          <h2 className="font-dancing text-5xl sm:text-6xl text-white mt-3 mb-4">Love Letter</h2>
          <div className="flex items-center justify-center gap-3">
            <span className="w-12 h-px bg-white/30" />
            <span className="text-xl">💌</span>
            <span className="w-12 h-px bg-white/30" />
          </div>
        </div>

        {/* Letter envelope */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {!isOpen ? (
            <div className="text-center">
              <button
                onClick={() => setIsOpen(true)}
                className="group relative inline-block"
              >
                {/* Envelope */}
                <div className="bg-cream rounded-2xl p-10 sm:p-16 shadow-2xl border border-rose-200/30 transition-all duration-500 group-hover:scale-105 group-hover:shadow-rose-500/20">
                  <div className="text-6xl sm:text-8xl mb-4 group-hover:animate-pulse-heart">💌</div>
                  <p className="font-dancing text-2xl sm:text-3xl text-rose-gold mb-2">Buka Surat Cintaku</p>
                  <p className="font-poppins text-warm-brown/50 text-sm">Klik untuk membaca surat spesial untukmu</p>
                  <div className="mt-4 inline-flex items-center gap-2 bg-rose-gold/10 text-rose-gold rounded-full px-4 py-2 text-sm">
                    <span>Buka</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <div className="animate-fade-in-up">
              <div className="bg-cream/95 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl border border-rose-200/30 relative">
                {/* Decorative corner */}
                <div className="absolute top-4 left-4 text-3xl opacity-20">🌹</div>
                <div className="absolute top-4 right-4 text-3xl opacity-20">🌹</div>
                <div className="absolute bottom-4 left-4 text-3xl opacity-20">🌸</div>
                <div className="absolute bottom-4 right-4 text-3xl opacity-20">🌸</div>

                {/* Letter content */}
                <div className="max-w-2xl mx-auto text-center">
                  <p className="font-dancing text-3xl sm:text-4xl text-rose-gold mb-8">Untuk Cintaku yang Terindah,</p>
                  
                  <div className="space-y-5 font-playfair text-warm-brown/80 text-base sm:text-lg leading-relaxed italic text-left sm:text-center">
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

                  <div className="mt-8 pt-6 border-t border-rose-200/50">
                    <p className="font-dancing text-2xl sm:text-3xl text-rose-gold">
                      Selalu dan Selamanya Mencintaimu,
                    </p>
                    <p className="font-dancing text-xl text-rose-gold/70 mt-2">
                      — Dengan Segenap Hatiku 💕
                    </p>
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-8 inline-flex items-center gap-2 bg-rose-gold/10 text-rose-gold rounded-full px-5 py-2 text-sm hover:bg-rose-gold/20 transition-colors font-poppins"
                  >
                    <span>Tutup Surat</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
