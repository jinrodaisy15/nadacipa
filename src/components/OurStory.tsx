import { useEffect, useRef, useState } from 'react';

export default function OurStory() {
  const [isVisible, setIsVisible] = useState(false);
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
      id="story"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-gradient-romantic overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-10 rotate-12">🌸</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-10 -rotate-12">🌺</div>
      <div className="absolute top-1/2 left-5 text-4xl opacity-5">💫</div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-poppins text-rose-gold text-sm tracking-[0.3em] uppercase">Tentang Kita</span>
          <h2 className="font-dancing text-5xl sm:text-6xl text-warm-brown mt-3 mb-4">Our Love Story</h2>
          <div className="flex items-center justify-center gap-3">
            <span className="w-12 h-px bg-rose-gold/40" />
            <span className="text-xl">💝</span>
            <span className="w-12 h-px bg-rose-gold/40" />
          </div>
        </div>

        {/* Story content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-rose-gold/20 to-lavender/30 rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-rose-200/50 border-4 border-white">
                <img
                  src="/images/couple-date.jpg"
                  alt="Our special moment"
                  className="w-full h-[400px] sm:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-dancing text-white text-2xl drop-shadow-lg">Moment Terindah Kita ✨</p>
                </div>
              </div>
              {/* Floating decoration */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-soft-pink rounded-full flex items-center justify-center animate-float shadow-lg">
                <span className="text-3xl">💑</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-lavender rounded-full flex items-center justify-center animate-float shadow-lg" style={{ animationDelay: '1s' }}>
                <span className="text-2xl">💖</span>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="space-y-6">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-rose-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🥰</span>
                  <h3 className="font-playfair text-xl font-semibold text-warm-brown">Bagaimana Kita Bertemu</h3>
                </div>
                <p className="font-poppins text-warm-brown/70 leading-relaxed text-sm">
                  Pertemuan kita bukan sebuah kebetulan, melainkan takdir yang sudah digariskan. 
                  Dari senyumanmu yang pertama, aku tahu bahwa kamu adalah orang yang selama ini aku cari. 
                  Setiap tatapan matamu membuat jantungku berdebar, dan sejak saat itu aku tahu — kamu adalah rumahku.
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-rose-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">💞</span>
                  <h3 className="font-playfair text-xl font-semibold text-warm-brown">Jatuh Cinta Lebih Dalam</h3>
                </div>
                <p className="font-poppins text-warm-brown/70 leading-relaxed text-sm">
                  Setiap hari bersamamu seperti menemukan alasan baru untuk jatuh cinta. 
                  Dari percakapan tengah malam hingga petualangan spontan kita, setiap momen terasa begitu berharga. 
                  Kamu mengajarkanku arti cinta yang sesungguhnya — yang tulus, sabar, dan tanpa syarat.
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-rose-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🌟</span>
                  <h3 className="font-playfair text-xl font-semibold text-warm-brown">Masa Depan Kita</h3>
                </div>
                <p className="font-poppins text-warm-brown/70 leading-relaxed text-sm">
                  Aku tidak tahu apa yang menanti kita di masa depan, tapi satu hal yang pasti — 
                  aku ingin menjalani semuanya bersamamu. Setiap sunrise dan sunset, setiap musim yang berganti, 
                  aku ingin genggaman tanganmu selalu ada di sisiku. Kamu, selamanya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
