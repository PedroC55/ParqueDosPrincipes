import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Plus } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, animate } from 'motion/react';
import { useInView } from './hooks/useInView';
import { useLanguage } from '../context/LanguageContext';
import parqueLogo from '../../Assets/Logos/logo_parque_dos_principes_dourado.png';

const translations = {
  PT: {
    label: 'GALERIA',
    title: 'Explore o Projeto',
    welcome: 'Seja bem-vindo a este lugar exclusivo, a poucos minutos de',
    highlight: 'Talatona',
    welcomeEnd: ', surge uma nova forma de viver - Parque dos Príncipes Residence.',
    address1: 'Luanda - Camama',
    address2: 'Rua das artes, lote 10',
    // mesma ordem que galleryImages em App.tsx
    imageLabels: ['EXTERIOR', 'JARDIM', 'JARDIM', 'PISCINA', 'GINÁSIO', 'BAR', 'SALÃO DE JOGOS', 'INTERIOR', 'GARAGEM'],
  },
  EN: {
    label: 'GALLERY',
    title: 'Explore the Project',
    welcome: 'Welcome to this exclusive place, a few minutes from',
    highlight: 'Talatona',
    welcomeEnd: ', a new way of living emerges - Parque dos Príncipes Residence.',
    address1: 'Luanda - Camama',
    address2: 'Rua das artes, lote 10',
    imageLabels: ['EXTERIOR', 'GARDEN', 'GARDEN', 'POOL', 'GYM', 'BAR', 'GAMES ROOM', 'INTERIOR', 'GARAGE'],
  },
};

interface GallerySectionProps {
  images: string[];
}

const GAP = 16; // px — gap entre cards no desktop

export function GallerySection({ images }: GallerySectionProps) {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [startIndex, setStartIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { lang } = useLanguage();
  const t = translations[lang];

  const containerRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);
  const x = useMotionValue(0);

  // Calcula largura do card e visíveis consoante o viewport
  useEffect(() => {
    const calc = () => {
      if (!containerRef.current) return;
      const isMobile = window.innerWidth < 1024;
      const vc = isMobile ? 1 : 4;
      const gap = isMobile ? 0 : GAP;
      const cw = (containerRef.current.offsetWidth - (vc - 1) * gap) / vc;
      setVisibleCount(vc);
      setCardWidth(cw);
      x.set(-(cw + gap)); // esconde o card "prev" à esquerda
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [x]);

  const effectiveGap = visibleCount === 1 ? 0 : GAP;

  const handleNext = async () => {
    if (animating.current || cardWidth === 0) return;
    animating.current = true;
    const step = cardWidth + effectiveGap;
    const initX = -step;
    await animate(x, initX - step, { duration: 0.45, ease: [0.4, 0, 0.2, 1] });
    x.set(initX);
    setStartIndex((prev) => (prev + 1) % images.length);
    animating.current = false;
  };

  const handlePrev = async () => {
    if (animating.current || cardWidth === 0) return;
    animating.current = true;
    const step = cardWidth + effectiveGap;
    const initX = -step;
    await animate(x, 0, { duration: 0.45, ease: [0.4, 0, 0.2, 1] });
    x.set(initX);
    setStartIndex((prev) => (prev - 1 + images.length) % images.length);
    animating.current = false;
  };

  // 1 escondido à esquerda + visíveis + 1 escondido à direita
  const totalCards = visibleCount + 2;
  const cardsToRender = Array.from({ length: totalCards }, (_, i) =>
    (startIndex - 1 + i + images.length) % images.length
  );

  // Lightbox
  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const lightboxPrev = useCallback(() =>
    setLightboxIndex((p) => (p === null ? null : (p - 1 + images.length) % images.length)),
    [images.length]
  );
  const lightboxNext = useCallback(() =>
    setLightboxIndex((p) => (p === null ? null : (p + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, closeLightbox, lightboxPrev, lightboxNext]);

  return (
    <>
      <section id="gallery" ref={ref} className="w-full bg-[#1C1C1C] py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div
              className="text-[#C9A84C] mb-4 tracking-[0.2em]"
              style={{ fontFamily: 'Lato, sans-serif', fontSize: '12px' }}
            >
              {t.label}
            </div>
            <h2
              className="text-[#F5F0E8]"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600 }}
            >
              {t.title}
            </h2>
          </motion.div>

          {/* Info panel + Carousel */}
          <div className="grid lg:grid-cols-5 gap-4 lg:gap-6">

            {/* Info Panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[#2D6B79] p-8 flex flex-col justify-between h-[300px] lg:h-[400px]"
            >
              <img
                src={parqueLogo}
                alt="Parque dos Príncipes"
                className="h-14 w-auto object-contain self-start mt-4"
              />
              <div>
                <p
                  className="text-white/90 mb-4"
                  style={{ fontFamily: 'Lato, sans-serif', fontSize: '13px', lineHeight: '1.7' }}
                >
                  {t.welcome} <strong>{t.highlight}</strong>{t.welcomeEnd}
                </p>
                <p
                  className="text-white/70"
                  style={{ fontFamily: 'Lato, sans-serif', fontSize: '13px', lineHeight: '1.6' }}
                >
                  {t.address1}<br />{t.address2}
                </p>
              </div>
            </motion.div>

            {/* Carousel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              ref={containerRef}
              className="lg:col-span-4 relative h-[300px] lg:h-[400px] overflow-hidden"
            >
              {cardWidth > 0 && (
                <motion.div
                  style={{ x }}
                  className="flex h-full"
                >
                  {cardsToRender.map((imgIndex, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 relative h-full overflow-hidden cursor-pointer group"
                      style={{
                        width: cardWidth,
                        marginRight: i < totalCards - 1 ? effectiveGap : 0,
                      }}
                      onClick={() => openLightbox(imgIndex)}
                    >
                      <img
                        src={images[imgIndex]}
                        alt={`Galeria ${imgIndex + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-8 gap-4">
                        <span
                          className="text-[#C9A84C] tracking-[0.15em]"
                          style={{ fontFamily: 'Lato, sans-serif', fontSize: '13px', fontWeight: 700 }}
                        >
                          {t.imageLabels[imgIndex]}
                        </span>
                        <button
                          aria-label="Ver imagem"
                          className="w-10 h-10 rounded-full border-2 border-white/60 text-white flex items-center justify-center hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300 bg-black/20"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center gap-4 mt-8"
          >
            <button
              onClick={handlePrev}
              className="w-12 h-12 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#1C1C1C] transition-all duration-300 flex items-center justify-center"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#1C1C1C] transition-all duration-300 flex items-center justify-center"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>

        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-8 text-white/70 hover:text-white transition-colors z-10"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10"
            >
              <ChevronLeft size={48} strokeWidth={1.5} />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="mx-20"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[lightboxIndex]}
                alt={`Galeria ${lightboxIndex + 1}`}
                className="object-contain rounded"
                style={{ maxWidth: '80vw', maxHeight: '85vh' }}
              />
            </motion.div>
            <button
              onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10"
            >
              <ChevronRight size={48} strokeWidth={1.5} />
            </button>
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50"
              style={{ fontFamily: 'Lato, sans-serif', fontSize: '12px', letterSpacing: '0.1em' }}
            >
              {lightboxIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
