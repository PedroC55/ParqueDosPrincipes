import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useInView } from './hooks/useInView';
import { useLanguage } from '../context/LanguageContext';
import parqueLogo from '../../Assets/Logos/logo_parque_dos_principes_dourado.png';
import duplex01 from '../../Assets/Images/01_FINAL.png';
import duplex02 from '../../Assets/Images/02_FINAL.png';

const duplexImages = [duplex01, duplex02];

const translations = {
  PT: {
    title: 'Tipologias',
    features: [
      ['Acesso direto ao jardim', 'Vista panorâmica'],
      ['Ampla iluminação natural', 'Perfeito para famílias'],
    ],
    note: 'Todos os apartamentos com estacionamento coberto garantido.',
  },
  EN: {
    title: 'Typologies',
    features: [
      ['Direct garden access', 'Panoramic view'],
      ['Ample natural lighting', 'Perfect for families'],
    ],
    note: 'All apartments with guaranteed covered parking.',
  },
};

interface MasterplanSectionProps {
  planImage: string;
}

export function MasterplanSection({ planImage }: MasterplanSectionProps) {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const { lang } = useLanguage();
  const t = translations[lang];
  const [duplexLightbox, setDuplexLightbox] = useState<number | null>(null);

  const closeDuplex = useCallback(() => setDuplexLightbox(null), []);
  const prevDuplex = useCallback(() => setDuplexLightbox(i => i === null ? null : (i - 1 + duplexImages.length) % duplexImages.length), []);
  const nextDuplex = useCallback(() => setDuplexLightbox(i => i === null ? null : (i + 1) % duplexImages.length), []);

  useEffect(() => {
    if (duplexLightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDuplex();
      if (e.key === 'ArrowLeft') prevDuplex();
      if (e.key === 'ArrowRight') nextDuplex();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [duplexLightbox, closeDuplex, prevDuplex, nextDuplex]);

  return (
    <>
    <section id="masterplan" ref={ref} className="w-full bg-[#F5F0E8] py-16 lg:py-0 overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-stretch">

          {/* Left: Masterplan Image — full bleed */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 w-full lg:w-[65%] px-6 lg:px-0"
          >
            <img
              src={planImage}
              alt="Masterplan"
              className="w-full h-auto lg:h-full object-contain object-center"
              loading="lazy"
              decoding="async"
            />
          </motion.div>

          {/* Right: Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 w-full lg:w-[35%] flex flex-col items-center text-center px-6 lg:px-10 py-16 lg:py-20"
          >
            {/* Logo */}
            <div className="flex justify-center mb-10">
              <img src={parqueLogo} alt="Parque dos Príncipes" className="h-20 w-auto object-contain" />
            </div>

            {/* Title */}
            <h2
              className="text-[#2C2C2C]/50 mb-6 not-italic"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 400,
              }}
            >
              {t.title}
            </h2>

            {/* Top divider */}
            <div className="w-full h-px bg-[#C9A84C]/30 mb-8" />

            {/* Row 1: T2 | T1 | T3 */}
            <div className="flex items-center justify-center w-full gap-0 mb-4">
              {['T2', 'T1', 'T3'].map((typ, i) => (
                <div key={typ} className="flex items-center">
                  {i > 0 && <div className="w-px h-7 bg-[#C9A84C]/30 mx-5" />}
                  <span
                    className="text-[#2C2C2C]"
                    style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 500 }}
                  >
                    {typ}
                  </span>
                </div>
              ))}
            </div>

            {/* Row 2: T2 Duplex +1 | T3 Duplex +1 */}
            <div className="flex items-center justify-center w-full gap-0 mb-8">
              <span
                className="text-[#2C2C2C]"
                style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 500 }}
              >
                T2 Duplex +1
              </span>
              <div className="w-px h-7 bg-[#C9A84C]/30 mx-5" />
              <button
                onClick={() => setDuplexLightbox(0)}
                className="text-[#C9A84C] hover:text-[#a8873a] transition-colors cursor-pointer"
                style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 500 }}
              >
                T3 Duplex +1
              </button>
            </div>

            {/* Bottom divider */}
            <div className="w-full h-px bg-[#C9A84C]/30 mb-8" />

            {/* Features — 2 columns */}
            <div className="mb-8 w-full">
              {t.features.map((row, i) => (
                <div key={i} className="flex justify-center gap-8 mb-1">
                  {row.map((f) => (
                    <p
                      key={f}
                      className="text-[#2C2C2C]/65 w-[160px] text-center"
                      style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', lineHeight: '1.9' }}
                    >
                      {f}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* Note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[#2C2C2C] text-center"
              style={{ fontFamily: 'Lato, sans-serif', fontSize: '13px', fontWeight: 700, lineHeight: '1.7', letterSpacing: '0.02em' }}
            >
              {t.note}
            </motion.p>
          </motion.div>

      </div>
    </section>

      {/* Duplex Lightbox */}
      <AnimatePresence>
        {duplexLightbox !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.88)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDuplex}
          >
            <motion.div
              key={duplexLightbox}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="relative flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Counter + X — top row */}
              <div className="flex items-center justify-between w-full mb-3 px-1">
                <div
                  className="text-white/50"
                  style={{ fontFamily: 'Lato, sans-serif', fontSize: '12px', letterSpacing: '0.1em' }}
                >
                  Duplex · {duplexLightbox + 1} / {duplexImages.length}
                </div>
                <button onClick={closeDuplex} className="text-white/70 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Image */}
              <img
                src={duplexImages[duplexLightbox]}
                alt={`T3 Duplex ${duplexLightbox + 1}`}
                className="object-contain rounded"
                style={{ maxWidth: '88vw', maxHeight: '78vh' }}
              />

              {/* Chevrons below */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={(e) => { e.stopPropagation(); prevDuplex(); }}
                  className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all duration-200"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextDuplex(); }}
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
