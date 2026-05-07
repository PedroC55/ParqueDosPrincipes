import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Plus } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, animate, useMotionValueEvent } from 'motion/react';
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
    imageLabels: ['EXTERIOR', 'JARDIM', 'JARDIM', 'PISCINA', 'SALÃO DE JOGOS', 'INTERIOR', 'GARAGEM', 'JACUZZI', 'COZINHA', 'SALA', 'PARQUE', 'VARANDA', 'WC SUITE'],
  },
  EN: {
    label: 'GALLERY',
    title: 'Explore the Project',
    welcome: 'Welcome to this exclusive place, a few minutes from',
    highlight: 'Talatona',
    welcomeEnd: ', a new way of living emerges - Parque dos Príncipes Residence.',
    address1: 'Luanda - Camama',
    address2: 'Rua das artes, lote 10',
    imageLabels: ['EXTERIOR', 'GARDEN', 'GARDEN', 'POOL', 'GAMES ROOM', 'INTERIOR', 'GARAGE', 'JACUZZI', 'KITCHEN', 'LIVING ROOM', 'PARK', 'BALCONY', 'SUITE BATHROOM'],
  },
};

interface GallerySectionProps {
  images: string[];
}

const GAP = 16;
const MOBILE_CLONE = 3; // clones at each end for seamless looping

export function GallerySection({ images }: GallerySectionProps) {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [startIndex, setStartIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { lang } = useLanguage();
  const t = translations[lang];

  const containerRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);
  const x = useMotionValue(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const dragStartX = useRef(0);
  const isHorizontalDrag = useRef<boolean | null>(null);

  // Mobile: flat array [last CLONE images][all images][first CLONE images]
  const mobileFlatIndices = [
    ...Array.from({ length: MOBILE_CLONE }, (_, i) => (images.length - MOBILE_CLONE + i + images.length) % images.length),
    ...images.map((_, i) => i),
    ...Array.from({ length: MOBILE_CLONE }, (_, i) => i % images.length),
  ];

  useEffect(() => {
    const calc = () => {
      if (!containerRef.current) return;
      const isMobile = window.innerWidth < 1024;
      const vc = isMobile ? 1 : 3;
      const gap = isMobile ? 12 : GAP;
      const cw = isMobile
        ? containerRef.current.offsetWidth * 0.88
        : (containerRef.current.offsetWidth - (vc - 1) * gap) / vc;
      setVisibleCount(vc);
      setCardWidth(cw);
      // Mobile: start showing first real image (skip MOBILE_CLONE clones on the right)
      // Desktop: start with 1 prev card hidden
      x.set(isMobile ? -MOBILE_CLONE * (cw + gap) : -(cw + gap));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [x]);

  const effectiveGap = visibleCount === 1 ? 12 : GAP;

  // Mobile infinite loop: when x drifts out of the clone bounds, jump seamlessly
  useMotionValueEvent(x, 'change', (latest) => {
    if (visibleCount !== 1 || cardWidth === 0) return;
    const step = cardWidth + effectiveGap;
    const loopLen = images.length * step;
    if (latest > -step) {
      // Drifted into the right clones — jump back into real territory
      x.set(latest - loopLen);
      dragStartX.current -= loopLen;
    } else if (latest < -(MOBILE_CLONE + images.length) * step) {
      // Drifted into the left clones — jump forward into real territory
      x.set(latest + loopLen);
      dragStartX.current += loopLen;
    }
  });

  // Desktop carousel handlers (arrow buttons)
  const handleNext = async () => {
    if (animating.current || cardWidth === 0) return;
    animating.current = true;
    const step = cardWidth + effectiveGap;
    const restX = -step;
    await animate(x, restX - step, { duration: 0.45, ease: [0.4, 0, 0.2, 1] });
    x.set(restX);
    setStartIndex((prev) => (prev + 1) % images.length);
    animating.current = false;
  };

  const handlePrev = async () => {
    if (animating.current || cardWidth === 0) return;
    animating.current = true;
    const step = cardWidth + effectiveGap;
    const restX = -step;
    await animate(x, restX + step, { duration: 0.45, ease: [0.4, 0, 0.2, 1] });
    x.set(restX);
    setStartIndex((prev) => (prev - 1 + images.length) % images.length);
    animating.current = false;
  };

  // Desktop: circular buffer (prev + visible + next)
  const desktopCards = Array.from({ length: visibleCount + 2 }, (_, i) =>
    (startIndex - 1 + i + images.length * 10) % images.length
  );

  const cardsToRender = visibleCount === 1 ? mobileFlatIndices : desktopCards;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const lightboxPrev = useCallback(
    () => setLightboxIndex((p) => (p === null ? null : (p - 1 + images.length) % images.length)),
    [images.length]
  );
  const lightboxNext = useCallback(
    () => setLightboxIndex((p) => (p === null ? null : (p + 1) % images.length)),
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
          <div className="lg:grid lg:grid-cols-[1fr_3fr] lg:gap-4 lg:items-stretch">

            {/* Info Panel — desktop only */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex flex-col justify-between bg-[#2D6B79] p-8"
            >
              {/* Arrows — top right */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={handlePrev}
                  aria-label="Anterior"
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center transition-all duration-200"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Próximo"
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center transition-all duration-200"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Logo */}
              <img
                src={parqueLogo}
                alt="Parque dos Príncipes"
                className="h-14 w-auto object-contain self-start"
              />

              {/* Text */}
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
              className="relative overflow-hidden"
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0].clientX;
                touchStartY.current = e.touches[0].clientY;
                dragStartX.current = x.get();
                isHorizontalDrag.current = null;
              }}
              onTouchMove={(e) => {
                if (touchStartX.current === null || touchStartY.current === null) return;
                const dx = e.touches[0].clientX - touchStartX.current;
                const dy = e.touches[0].clientY - touchStartY.current;
                if (isHorizontalDrag.current === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
                  isHorizontalDrag.current = Math.abs(dx) > Math.abs(dy);
                }
                if (isHorizontalDrag.current) x.set(dragStartX.current + dx);
              }}
              onTouchEnd={() => {
                touchStartX.current = null;
                touchStartY.current = null;
                isHorizontalDrag.current = null;
              }}
            >
              {cardWidth > 0 && (
                <motion.div style={{ x }} className="flex">
                  {cardsToRender.map((imgIndex, i) => (
                    <div
                      key={`${visibleCount}-${i}`}
                      className="flex-shrink-0"
                      style={{
                        width: cardWidth,
                        marginRight: effectiveGap,
                      }}
                    >
                      {/* Image */}
                      <div
                        className="relative overflow-hidden cursor-pointer group h-64 lg:h-[400px]"
                        onClick={() => openLightbox(imgIndex)}
                      >
                        <img
                          src={images[imgIndex]}
                          alt={`Galeria ${imgIndex + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                        <button
                          aria-label="Ver imagem"
                          className="absolute bottom-4 left-4 w-9 h-9 rounded-full border border-white/60 text-white flex items-center justify-center bg-black/20 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300"
                          onClick={(e) => { e.stopPropagation(); openLightbox(imgIndex); }}
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Label below image */}
                      <div
                        className="pt-3 text-[#C9A84C] tracking-[0.15em] uppercase"
                        style={{ fontFamily: 'Lato, sans-serif', fontSize: '11px' }}
                      >
                        {t.imageLabels[imgIndex]}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>

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
