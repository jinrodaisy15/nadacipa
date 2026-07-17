import { useEffect, useRef, useState } from 'react';

interface Photo {
  src: string;
  title: string;
  description: string;
  category: string;
}

const photos: Photo[] = [
  {
    src: '/images/adventure-1.jpg',
    title: 'Hiking Bersama',
    description: 'Menaklukkan gunung bersama, melihat dunia dari ketinggian',
    category: 'adventure',
  },
  {
    src: '/images/adventure-2.jpg',
    title: 'Sunset di Danau',
    description: 'Menikmati keindahan sunset yang magis berdua',
    category: 'romantic',
  },
  {
    src: '/images/adventure-3.jpg',
    title: 'Taman Bunga',
    description: 'Dikelilingi keindahan bunga-bunga yang cantik',
    category: 'romantic',
  },
  {
    src: '/images/adventure-4.jpg',
    title: 'Bersepeda Berdua',
    description: 'Petualangan seru bersepeda di pedesaan',
    category: 'adventure',
  },
  {
    src: '/images/adventure-5.jpg',
    title: 'Camping Malam',
    description: 'Malam romantis di bawah bintang-bintang',
    category: 'adventure',
  },
  {
    src: '/images/adventure-6.jpg',
    title: 'Hutan Berkabut',
    description: 'Menjelajahi hutan yang misterius dan indah',
    category: 'adventure',
  },
  {
    src: '/images/couple-date.jpg',
    title: 'Dinner Romantis',
    description: 'Malam spesial dengan candlelight dinner',
    category: 'romantic',
  },
  {
    src: '/images/hero-couple.jpg',
    title: 'Silhouette Cinta',
    description: 'Bayangan kita di bawah langit senja',
    category: 'romantic',
  },
];

export default function Gallery() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [filter, setFilter] = useState<'all' | 'adventure' | 'romantic'>('all');
  const [lightbox, setLightbox] = useState<Photo | null>(null);
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

  const filteredPhotos = filter === 'all' ? photos : photos.filter(p => p.category === filter);

  const filters = [
    { key: 'all' as const, label: 'Semua', emoji: '📷' },
    { key: 'adventure' as const, label: 'Adventure', emoji: '🏔️' },
    { key: 'romantic' as const, label: 'Romantis', emoji: '💕' },
  ];

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-gradient-romantic overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-rose-300 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-300 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-12 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-poppins text-rose-gold text-sm tracking-[0.3em] uppercase">Kenangan Kita</span>
          <h2 className="font-dancing text-5xl sm:text-6xl text-warm-brown mt-3 mb-4">Photo Gallery</h2>
          <div className="flex items-center justify-center gap-3">
            <span className="w-12 h-px bg-rose-gold/40" />
            <span className="text-xl">📸</span>
            <span className="w-12 h-px bg-rose-gold/40" />
          </div>
          <p className="font-poppins text-warm-brown/60 mt-4 max-w-lg mx-auto text-sm">
            Kumpulan momen-momen terbaik yang kita habiskan bersama. Setiap foto menyimpan cerita yang tak ternilai.
          </p>
        </div>

        {/* Filter buttons */}
        <div className={`flex items-center justify-center gap-3 mb-10 flex-wrap transition-all duration-1000 delay-200 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`font-poppins text-sm px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 ${
                filter === f.key
                  ? 'bg-rose-gold text-white shadow-lg shadow-rose-200'
                  : 'bg-white/70 text-warm-brown hover:bg-white border border-rose-100'
              }`}
            >
              <span>{f.emoji}</span>
              {f.label}
            </button>
          ))}
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredPhotos.map((photo, idx) => (
            <GalleryCard
              key={photo.src + filter}
              photo={photo}
              index={idx}
              onClick={() => setLightbox(photo)}
            />
          ))}
        </div>

        {/* Hint text */}
        <div className={`text-center mt-10 transition-all duration-1000 delay-500 ${headerVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="font-poppins text-warm-brown/40 text-xs italic">
            💡 Klik foto untuk melihat lebih detail
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 lightbox-overlay bg-black/80 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl w-full animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl hover:bg-rose-50 transition-colors"
            >
              <span className="text-warm-brown text-lg">✕</span>
            </button>
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="w-full max-h-[70vh] object-cover"
              />
              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold text-warm-brown">{lightbox.title}</h3>
                <p className="font-poppins text-warm-brown/60 text-sm mt-1">{lightbox.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function GalleryCard({ photo, index, onClick }: { photo: Photo; index: number; onClick: () => void }) {
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

  return (
    <div
      ref={ref}
      className={`gallery-card cursor-pointer transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onClick={onClick}
    >
      <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-white group">
        <div className="overflow-hidden aspect-[4/5]">
          <img
            src={photo.src}
            alt={photo.title}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
          <span className="text-white font-playfair text-lg font-semibold">{photo.title}</span>
          <span className="text-white/80 font-poppins text-xs mt-1">{photo.description}</span>
        </div>
        {/* Category badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-md">
          <span className="text-xs">
            {photo.category === 'adventure' ? '🏔️' : '💕'}
          </span>
        </div>
      </div>
    </div>
  );
}
