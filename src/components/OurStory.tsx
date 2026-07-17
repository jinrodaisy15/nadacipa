import { useEffect, useRef, useState } from 'react';

export default function OurStory() {
  const [isVisible, setIsVisible] = useState(false);
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
      id="story"
      ref={sectionRef}
      className="relative py-16 sm:py-24 md:py-32 bg-gradient-romantic overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-10 left-4 sm:left-10 text-4xl sm:text-6xl opacity-10 rotate-12">🌸</div>
      <div className="absolute bottom-10 right-4 sm:right-10 text-4xl sm:text-6xl opacity-10 -rotate-12">🌺</div>

      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        {/* Section header */}
        <div className={`text-center mb-10 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-poppins text-rose-gold text-xs sm:text-sm tracking-[0.25em] uppercase">Tentang Kita</span>
          <h2 className="font-dancing text-4xl sm:text-5xl md:text-6xl text-warm-brown mt-2 sm:mt-3 mb-3 sm:mb-4">Our Love Story</h2>
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 sm:w-12 h-px bg-rose-gold/40" />
            <span className="text-lg sm:text-xl">💝</span>
            <span className="w-8 sm:w-12 h-px bg-rose-gold/40" />
          </div>
        </div>

        {/* Story content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image side */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0 lg:translate-x-0' : 'opacity-0 translate-y-8 lg:-translate-x-12 lg:translate-y-0'}`}>
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-br from-rose-gold/20 to-lavender/30 rounded-2xl sm:rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-rose-200/50 border-[3px] sm:border-4 border-white">
                <img
                  src="/images/couple-date.jpg"
                  alt="Our special moment"
                  className="w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <p className="font-dancing text-white text-xl sm:text-2xl drop-shadow-lg">Moment Terindah Kita ✨</p>
                </div>
              </div>
              {/* Floating decoration */}
              <div className="absolute -top-4 -right-3 sm:-top-6 sm:-right-6 w-14 h-14 sm:w-20 sm:h-20 bg-soft-pink rounded-full flex items-center justify-center animate-float shadow-lg">
                <span className="text-2xl sm:text-3xl">💑</span>
              </div>
              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 bg-lavender rounded-full flex items-center justify-center animate-float shadow-lg" style={{ animationDelay: '1s' }}>
                <span className="text-xl sm:text-2xl">💖</span>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0 lg:translate-x-0' : 'opacity-0 translate-y-8 lg:translate-x-12 lg:translate-y-0'}`}>
            <div className="space-y-4 sm:space-y-5">
              {[
                {
                  emoji: '🥰',
                  title: 'Bagaimana Kita Bertemu',
                  text: 'Pertemuan kita bukan sebuah kebetulan, melainkan takdir yang sudah digariskan. Dari senyumanmu yang pertama, aku tahu bahwa kamu adalah orang yang selama ini aku cari. Setiap tatapan matamu membuat jantungku berdebar, dan sejak saat itu aku tahu — kamu adalah rumahku.',
                },
                {
                  emoji: '💞',
                  title: 'Jatuh Cinta Lebih Dalam',
                  text: 'Setiap hari bersamamu seperti menemukan alasan baru untuk jatuh cinta. Dari percakapan tengah malam hingga petualangan spontan kita, setiap momen terasa begitu berharga. Kamu mengajarkanku arti cinta yang sesungguhnya — yang tulus, sabar, dan tanpa syarat.',
                },
                {
                  emoji: '🌟',
                  title: 'Masa Depan Kita',
                  text: 'Aku tidak tahu apa yang menanti kita di masa depan, tapi satu hal yang pasti — aku ingin menjalani semuanya bersamamu. Setiap sunrise dan sunset, setiap musim yang berganti, aku ingin genggaman tanganmu selalu ada di sisiku. Kamu, selamanya.',
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-rose-100 shadow-lg active:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                    <span className="text-xl sm:text-2xl">{card.emoji}</span>
                    <h3 className="font-playfair text-base sm:text-xl font-semibold text-warm-brown">{card.title}</h3>
                  </div>
                  <p className="font-poppins text-warm-brown/70 leading-relaxed text-[13px] sm:text-sm">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
