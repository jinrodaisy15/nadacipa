import { useEffect, useRef, useState } from 'react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  emoji: string;
}

const events: TimelineEvent[] = [
  {
    date: 'Februari 2023',
    title: 'Pertama Kali Bertemu',
    description: 'Hari di mana dunia terasa berbeda. Pertemuan yang tidak disengaja tapi terasa begitu istimewa. Senyumanmu langsung mencuri perhatianku.',
    emoji: '🥰',
  },
  {
    date: 'Maret 2023',
    title: 'Chat Pertama',
    description: 'Memberanikan diri untuk menyapamu. Dari "halo" sederhana berubah menjadi percakapan yang tidak pernah berakhir. Setiap notifikasi darimu membuat hatiku berdebar.',
    emoji: '💬',
  },
  {
    date: 'April 2023',
    title: 'Date Pertama Kita',
    description: 'Nervous setengah mati tapi semuanya terasa sempurna. Kopi, tawa, dan cerita yang tak pernah habis. Aku tahu sejak saat itu, kamu spesial.',
    emoji: '☕',
  },
  {
    date: 'Mei 2023',
    title: 'Resmi Pacaran! 💑',
    description: 'Akhirnya memberanikan diri untuk mengungkapkan perasaan. Dan jawabanmu "iya" adalah kata terbaik yang pernah aku dengar seumur hidupku.',
    emoji: '💕',
  },
  {
    date: 'Agustus 2023',
    title: 'Petualangan Pertama',
    description: 'Trip pertama kita bersama! Hiking ke gunung, melihat sunrise berdua. Capek tapi bahagia. Di situlah aku sadar, kamu partner terbaik untuk segala hal.',
    emoji: '⛰️',
  },
  {
    date: 'Desember 2023',
    title: 'Anniversary Pertama',
    description: 'Setahun bersama terasa seperti baru kemarin. Candlelight dinner, hadiah kecil, dan janji-janji manis. Terima kasih sudah bertahan bersamaku.',
    emoji: '🎂',
  },
  {
    date: 'Sekarang',
    title: 'Dan Cerita Kita Terus Berlanjut...',
    description: 'Setiap hari adalah halaman baru dalam buku kisah cinta kita. Dan aku tidak sabar untuk menulis ribuan halaman lagi bersamamu. I love you, always.',
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
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`flex items-center gap-4 md:gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}>
      {/* Content */}
      <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'} text-left transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-x-0' 
          : isLeft 
            ? 'opacity-0 md:-translate-x-8 -translate-x-0'
            : 'opacity-0 md:translate-x-8 translate-x-0'
      }`}>
        <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-rose-100 shadow-lg hover:shadow-xl transition-all duration-300 inline-block max-w-md ${isLeft ? 'md:ml-auto' : 'md:mr-auto'}`}>
          <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'md:justify-end' : ''}`}>
            <span className="text-2xl">{event.emoji}</span>
            <span className="font-poppins text-rose-gold text-xs font-medium tracking-wider uppercase bg-soft-pink px-3 py-1 rounded-full">
              {event.date}
            </span>
          </div>
          <h3 className="font-playfair text-lg font-semibold text-warm-brown mb-2">{event.title}</h3>
          <p className="font-poppins text-warm-brown/65 text-sm leading-relaxed">{event.description}</p>
        </div>
      </div>

      {/* Center dot */}
      <div className={`hidden md:flex flex-col items-center transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
        <div className="w-5 h-5 bg-rose-gold rounded-full border-4 border-white shadow-lg shadow-rose-200 relative">
          <div className="absolute inset-0 bg-rose-gold rounded-full animate-ping opacity-30" />
        </div>
      </div>

      {/* Empty space for the other side */}
      <div className="hidden md:block flex-1" />
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
      { threshold: 0.3 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" className="relative py-24 sm:py-32 bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-rose-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-300 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        {/* Section header */}
        <div ref={headerRef} className={`text-center mb-16 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-poppins text-rose-gold text-sm tracking-[0.3em] uppercase">Perjalanan Cinta</span>
          <h2 className="font-dancing text-5xl sm:text-6xl text-warm-brown mt-3 mb-4">Our Timeline</h2>
          <div className="flex items-center justify-center gap-3">
            <span className="w-12 h-px bg-rose-gold/40" />
            <span className="text-xl">📅</span>
            <span className="w-12 h-px bg-rose-gold/40" />
          </div>
          <p className="font-poppins text-warm-brown/60 mt-4 max-w-md mx-auto text-sm">
            Setiap momen bersamamu adalah sebuah cerita yang layak untuk dikenang selamanya
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 timeline-line" />

          <div className="space-y-8 md:space-y-12">
            {events.map((event, idx) => (
              <TimelineItem key={idx} event={event} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
