import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Plus } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useMotionValueEvent } from 'motion/react';
import { useInView } from './hooks/useInView';
import { useLanguage } from '../context/LanguageContext';
import parqueLogo from '../../Assets/Logos/logo_parque_dos_principes_dourado.png';

const translations = {
  PT: {
    label: 'GALERIA',
    title: 'Explore o Projeto',
    categories: ['Exterior', 'Interior', 'Amenities'],
    photos: 'fotos',
    welcome: 'Seja bem-vindo a este lugar exclusivo, a poucos minutos de',
    highlight: 'Talatona',
    welcomeEnd: ', surge uma nova forma de viver - Parque dos Príncipes Residence.',
    address1: 'Luanda - Camama',
    address2: 'Rua das artes, lote 10',
  },
  EN: {
    label: 'GALLERY',
    title: 'Explore the Project',
    categories: ['Exterior', 'Interior', 'Amenities'],
    photos: 'photos',
    welcome: 'Welcome to this exclusive place, a few minutes from',
    highlight: 'Talatona',
    welcomeEnd: ', a new way of living emerges - Parque dos Príncipes Residence.',
    address1: 'Luanda - Camama',
    address2: 'Rua das artes, lote 10',
  },
};

interface GallerySectionProps {
  exterior: string[];
  interior: string[];
  amenities: string[];
}

const MOBILE_GAP = 12;
const CLONE = 3;
const N_CARDS = 3; // exterior, interior, amenities

// [last CLONE cards][all N_CARDS][first CLONE cards]
const mobileFlatIndices = [
  ...Array.from({ length: CLONE }, (_, i) => (N_CARDS - CLONE + i) % N_CARDS),
  ...Array.from({ length: N_CARDS }, (_, i) => i),
  ...Array.from({ length: CLONE }, (_, i) => i % N_CARDS),
];

export function GallerySection({ exterior, interior, amenities }: GallerySectionProps) {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const { lang } = useLanguage();
  const t = translations[lang];

  const allCategories = [exterior, interior, amenities];

  // Lightbox
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openGallery = (catIndex: number) => { setActiveCategory(catIndex); setLightboxIndex(0); };
  const closeGallery = useCallback(() => setActiveCategory(null), []);

  const prevImage = useCallback(() => {
    setLightboxIndex(i => {
      if (activeCategory === null) return i;
      const len = allCategories[activeCategory].length;
      return (i - 1 + len) % len;
    });
  }, [activeCategory, exterior, interior, amenities]); // eslint-disable-line react-hooks/exhaustive-deps

  const nextImage = useCallback(() => {
    setLightboxIndex(i => {
      if (activeCategory === null) return i;
      const len = allCategories[activeCategory].length;
      return (i + 1) % len;
    });
  }, [activeCategory, exterior, interior, amenities]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (activeCategory === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeCategory, closeGallery, prevImage, nextImage]);

  // Mobile carousel
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const x = useMotionValue(0);
  const dragStartX = useRef(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isHorizontalDrag = useRef<boolean | null>(null);

  useEffect(() => {
    const calc = () => {
      if (!containerRef.current || window.innerWidth >= 1024) return;
      const cw = containerRef.current.offsetWidth;
      if (cw <= 0) return;
      setCardWidth(cw);
      x.set(-CLONE * (cw + MOBILE_GAP));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [x]);

  useMotionValueEvent(x, 'change', (latest) => {
    if (cardWidth === 0) return;
    const step = cardWidth + MOBILE_GAP;
    const loopLen = N_CARDS * step;
    if (latest > -step) {
      x.set(latest - loopLen);
      dragStartX.current -= loopLen;
    } else if (latest < -(CLONE + N_CARDS) * step) {
      x.set(latest + loopLen);
      dragStartX.current += loopLen;
    }
  });

  const cardHeight = cardWidth > 0 ? Math.round(cardWidth * 1.1) : 0;

  const currentImages = activeCategory !== null ? allCategories[activeCategory] : [];

  // Lightbox swipe (separate from carousel)
  const lbTouchStartX = useRef<number | null>(null);
  const onLbTouchStart = (e: React.TouchEvent) => { lbTouchStartX.current = e.touches[0].clientX; };
  const onLbTouchEnd = (e: React.TouchEvent) => {
    if (lbTouchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - lbTouchStartX.current;
    if (Math.abs(dx) > 50) dx < 0 ? nextImage() : prevImage();
    lbTouchStartX.current = null;
  };

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
            <div className="text-[#C9A84C] mb-4 tracking-[0.2em]" style={{ fontFamily: 'Lato, sans-serif', fontSize: '12px' }}>
              {t.label}
            </div>
            <h2 className="text-[#F5F0E8]" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600 }}>
              {t.title}
            </h2>
          </motion.div>

          {/* ── Mobile only ── */}
          <div className="lg:hidden">

            {/* Blue info card — static, full width */}
            <div className="flex flex-col justify-between bg-[#2D6B79] p-6 mb-4" style={{ minHeight: '220px' }}>
              <img src={parqueLogo} alt="Parque dos Príncipes" className="h-12 w-auto object-contain self-start mb-4" />
              <div>
                <p className="text-white/90 mb-3" style={{ fontFamily: 'Lato, sans-serif', fontSize: '13px', lineHeight: '1.7' }}>
                  {t.welcome} <strong>{t.highlight}</strong>{t.welcomeEnd}
                </p>
                <p className="text-white/70" style={{ fontFamily: 'Lato, sans-serif', fontSize: '13px', lineHeight: '1.6' }}>
                  {t.address1}<br />{t.address2}
                </p>
              </div>
            </div>

            {/* Category cards carousel — swipeable, infinite loop */}
            <div
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
                if (isHorizontalDrag.current) {
                  e.preventDefault();
                  x.set(dragStartX.current + dx);
                }
              }}
              onTouchEnd={() => {
                touchStartX.current = null;
                touchStartY.current = null;
                isHorizontalDrag.current = null;
              }}
            >
              {cardWidth > 0 && (
                <motion.div style={{ x }} className="flex">
                  {mobileFlatIndices.map((cardIdx, i) => (
                    <div
                      key={`m-${i}`}
                      className="flex-shrink-0"
                      style={{ width: cardWidth, marginRight: MOBILE_GAP, height: cardHeight }}
                    >
                      <div
                        className="relative w-full h-full overflow-hidden cursor-pointer group"
                        onClick={() => openGallery(cardIdx)}
                      >
                        <img
                          src={allCategories[cardIdx][0]}
                          alt={t.categories[cardIdx]}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 600 }}>
                            {t.categories[cardIdx]}
                          </h3>
                        </div>
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full border border-white/60 text-white flex items-center justify-center bg-black/20">
                          <Plus size={14} />
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* ── Desktop grid (4 columns) ── */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col justify-between bg-[#2D6B79] p-8"
              style={{ height: 'clamp(260px, 40vw, 480px)' }}
            >
              <img src={parqueLogo} alt="Parque dos Príncipes" className="h-14 w-auto object-contain self-start" />
              <div>
                <p className="text-white/90 mb-4" style={{ fontFamily: 'Lato, sans-serif', fontSize: '13px', lineHeight: '1.7' }}>
                  {t.welcome} <strong>{t.highlight}</strong>{t.welcomeEnd}
                </p>
                <p className="text-white/70" style={{ fontFamily: 'Lato, sans-serif', fontSize: '13px', lineHeight: '1.6' }}>
                  {t.address1}<br />{t.address2}
                </p>
              </div>
            </motion.div>

            {allCategories.map((images, catIndex) => (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.15 * (catIndex + 1) }}
                className="relative overflow-hidden cursor-pointer group"
                style={{ height: 'clamp(260px, 40vw, 480px)' }}
                onClick={() => openGallery(catIndex)}
              >
                <img
                  src={images[0]}
                  alt={t.categories[catIndex]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 600 }}>
                    {t.categories[catIndex]}
                  </h3>
                </div>
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/60 text-white flex items-center justify-center bg-black/20 group-hover:border-[#C9A84C] group-hover:text-[#C9A84C] transition-all duration-300">
                  <Plus size={16} />
                </div>
                <div className="absolute inset-0 ring-1 ring-inset ring-[#C9A84C]/0 group-hover:ring-[#C9A84C]/35 transition-all duration-300" />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {activeCategory !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeGallery}
            onTouchStart={onLbTouchStart}
            onTouchEnd={onLbTouchEnd}
          >
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="relative flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* X + legend row */}
              <div className="flex items-center justify-between w-full mb-3 px-1">
                <div
                  className="text-white/50"
                  style={{ fontFamily: 'Lato, sans-serif', fontSize: '12px', letterSpacing: '0.1em' }}
                >
                  {t.categories[activeCategory]} · {lightboxIndex + 1} / {currentImages.length}
                </div>
                <button onClick={closeGallery} className="text-white/70 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Image */}
              <img
                src={currentImages[lightboxIndex]}
                alt={`${t.categories[activeCategory]} ${lightboxIndex + 1}`}
                className="object-contain rounded"
                style={{ maxWidth: '88vw', maxHeight: '78vh' }}
              />

              {/* Chevrons below */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all duration-200"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all duration-200"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
