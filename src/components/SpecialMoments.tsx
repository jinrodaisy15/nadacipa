import { useEffect, useRef, useState } from 'react';

interface Moment {
  emoji: string;
  title: string;
  subtitle: string;
  color: string;
}

const moments: Moment[] = [
  { emoji: '🌅', title: 'Sunrise Pertama', subtitle: 'Melihat matahari terbit bersama', color: 'from-orange-100 to-amber-50' },
  { emoji: '🎵', title: 'Lagu Kita', subtitle: 'Lagu yang selalu mengingatkan akan kamu', color: 'from-purple-100 to-violet-50' },
  { emoji: '🍕', title: 'Makanan Favorit', subtitle: 'Selalu lebih enak kalau makan berdua', color: 'from-red-100 to-rose-50' },
  { emoji: '🌙', title: 'Malam Berbintang', subtitle: 'Menghitung bintang sambil bercerita', color: 'from-indigo-100 to-blue-50' },
  { emoji: '📸', title: 'Foto Berdua', subtitle: 'Mengabadikan setiap momen berharga', color: 'from-pink-100 to-rose-50' },
  { emoji: '🎁', title: 'Surprise Kecil', subtitle: 'Kejutan yang membuat hati berbunga', color: 'from-green-100 to-emerald-50' },
];

export default function SpecialMoments() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-16 sm:py-24 md:py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-rose-300 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-40 sm:w-64 h-40 sm:h-64 bg-purple-300 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-6 relative">
        <div className={`text-center mb-10 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-poppins text-rose-gold text-xs sm:text-sm tracking-[0.25em] uppercase">Hal-Hal Kecil</span>
          <h2 className="font-dancing text-4xl sm:text-5xl md:text-6xl text-warm-brown mt-2 sm:mt-3 mb-3 sm:mb-4">Special Moments</h2>
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 sm:w-12 h-px bg-rose-gold/40" />
            <span className="text-lg sm:text-xl">✨</span>
            <span className="w-8 sm:w-12 h-px bg-rose-gold/40" />
          </div>
          <p className="font-poppins text-warm-brown/60 mt-3 sm:mt-4 max-w-md mx-auto text-xs sm:text-sm">
            Hal-hal sederhana yang membuat hubungan kita begitu istimewa
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5 md:gap-6">
          {moments.map((moment, idx) => (
            <div
              key={idx}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${idx * 80 + 200}ms` }}
            >
              <div className={`bg-gradient-to-br ${moment.color} rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 text-center border border-white shadow-md sm:shadow-lg active:scale-[0.98] transition-all duration-300 group`}>
                <span className="text-3xl sm:text-4xl md:text-5xl block mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">{moment.emoji}</span>
                <h3 className="font-playfair text-xs sm:text-sm md:text-base font-semibold text-warm-brown mb-0.5 sm:mb-1">{moment.title}</h3>
                <p className="font-poppins text-warm-brown/50 text-[10px] sm:text-xs">{moment.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
