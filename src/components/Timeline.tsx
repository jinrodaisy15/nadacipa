import { useEffect, useRef, useState } from 'react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  emoji: string;
}

const events: TimelineEvent[] = [
  {
    date: 'April 2026',
    title: 'Pertama Kali Bertemu',
    description: 'Hari di mana dunia terasa berbeda. Pertemuan yang tidak disengaja tapi terasa begitu istimewa. Senyumanmu langsung mencuri perhatianku.',
    emoji: '🥰',
  },
  {
    date: 'April 2026',
    title: 'Mulai Dekat & Chat Setiap Hari',
    description: 'Dari "halo" sederhana berubah menjadi percakapan yang tidak pernah berakhir. Setiap notifikasi darimu membuat hatiku berdebar.',
    emoji: '💬',
  },
  {
    date: '15 April 2026',
    title: 'Resmi Pacaran! 💑',
    description: 'Akhirnya memberanikan diri untuk mengungkapkan perasaan. Dan jawabanmu "iya" adalah kata terbaik yang pernah aku dengar seumur hidupku.',
    emoji: '💕',
  },
  {
    date: 'Mei 2026',
    title: 'Date Pertama Kita',
    description: 'Nervous setengah mati tapi semuanya terasa sempurna. Tawa, cerita, dan tatapan mata yang tak pernah habis. Aku tahu kamu spesial.',
    emoji: '☕',
  },
  {
    date: 'Juni 2026',
    title: 'Petualangan Pertama',
    description: 'Trip pertama kita bersama! Capek tapi bahagia. Di situlah aku sadar, kamu partner terbaik untuk segala hal dalam hidupku.',
    emoji: '⛰️',
  },
  {
    date: 'Sekarang & Seterusnya',
    title: 'Cerita Kita Terus Berlanjut...',
    description: 'Setiap hari adalah halaman baru dalam buku kisah cinta kita. Aku tidak sabar untuk menulis ribuan halaman lagi bersamamu. I love you, always & forever.',
    emoji: '💝',
  },
];

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative">
      {/* Mobile layout (stacked) */}
      <div className={`md:hidden flex gap-3 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-20px]'
      }`}>
        {/* Dot */}
        <div className="flex flex-col items-center flex-shrink-0 pt-1">
          <div className="w-4 h-4 bg-rose-gold rounded-full border-[3px] border-white shadow-md shadow-rose-200 relative z-10">
            <div className="absolute inset-0 bg-rose-gold rounded-full animate-ping opacity-20" />
          </div>
          <div className="w-0.5 flex-1 bg-gradient-to-b from-rose-gold/40 to-rose-gold/10 mt-1" />
        </div>

        {/* Content card */}
        <div className="flex-1 pb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-rose-100 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{event.emoji}</span>
              <span className="font-poppins text-rose-gold text-[10px] font-medium tracking-wider uppercase bg-soft-pink px-2.5 py-0.5 rounded-full">
                {event.date}
              </span>
            </div>
            <h3 className="font-playfair text-base font-semibold text-warm-brown mb-1.5">{event.title}</h3>
            <p className="font-poppins text-warm-brown/60 text-[12px] leading-relaxed">{event.description}</p>
          </div>
        </div>
      </div>

      {/* Desktop layout (alternating) */}
      <div className={`hidden md:flex items-start gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'} transition-all duration-700 ${
          isVisible
            ? 'opacity-100 translate-x-0'
            : isLeft ? 'opacity-0 -translate-x-8' : 'opacity-0 translate-x-8'
        }`}>
          <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-rose-100 shadow-lg inline-block max-w-md ${isLeft ? 'ml-auto' : 'mr-auto'}`}>
            <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'justify-end' : ''}`}>
              <span className="text-2xl">{event.emoji}</span>
              <span className="font-poppins text-rose-gold text-xs font-medium tracking-wider uppercase bg-soft-pink px-3 py-1 rounded-full">
                {event.date}
              </span>
            </div>
            <h3 className="font-playfair text-lg font-semibold text-warm-brown mb-2">{event.title}</h3>
            <p className="font-poppins text-warm-brown/65 text-sm leading-relaxed">{event.description}</p>
          </div>
        </div>

        <div className={`flex flex-col items-center transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
          <div className="w-5 h-5 bg-rose-gold rounded-full border-4 border-white shadow-lg shadow-rose-200 relative">
            <div className="absolute inset-0 bg-rose-gold rounded-full animate-ping opacity-30" />
          </div>
        </div>

        <div className="flex-1" />
      </div>
    </div>
  );
}

export default function Timeline() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true);
      },
      { threshold: 0.2 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" className="relative py-16 sm:py-24 md:py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-48 sm:w-64 h-48 sm:h-64 bg-rose-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-56 sm:w-80 h-56 sm:h-80 bg-purple-300 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-6 relative">
        <div ref={headerRef} className={`text-center mb-10 sm:mb-16 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-poppins text-rose-gold text-xs sm:text-sm tracking-[0.25em] uppercase">Perjalanan Cinta</span>
          <h2 className="font-dancing text-4xl sm:text-5xl md:text-6xl text-warm-brown mt-2 sm:mt-3 mb-3 sm:mb-4">Our Timeline</h2>
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 sm:w-12 h-px bg-rose-gold/40" />
            <span className="text-lg sm:text-xl">📅</span>
            <span className="w-8 sm:w-12 h-px bg-rose-gold/40" />
          </div>
          <p className="font-poppins text-warm-brown/60 mt-3 sm:mt-4 max-w-md mx-auto text-xs sm:text-sm px-4">
            Setiap momen bersamamu adalah sebuah cerita yang layak untuk dikenang selamanya
          </p>
        </div>

        <div className="relative">
          {/* Vertical line — desktop only */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 timeline-line" />

          <div className="space-y-2 md:space-y-10">
            {events.map((event, idx) => (
              <TimelineItem key={idx} event={event} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
