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
    title: 'Masterplan',
    columns: [
      { label: 'Dois Quartos', type: 'T2' },
      { label: 'Três Quartos', type: 'T3' },
      { label: 'Duplex', type: '' },
    ],
    features: [
      'Acesso direto ao jardim',
      'Ampla iluminação natural',
      'Vistas panorâmicas',
    ],
    note: 'Todos os apartamentos com estacionamento coberto garantido.',
  },
  EN: {
    title: 'Masterplan',
    columns: [
      { label: 'Two Bedroom', type: 'T2' },
      { label: 'Three Bedroom', type: 'T3' },
      { label: 'Duplex', type: '' },
    ],
    features: [
      'Direct garden access',
      'Ample natural lighting',
      'Panoramic views',
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

            {/* Masterplan Heading */}
            <h2
              className="text-[#C9A84C] mb-6 not-italic"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 600,
              }}
            >
              {t.title}
            </h2>

            {/* Top divider */}
            <div className="w-full h-px bg-[#C9A84C]/30 mb-8" />

            {/* Typology Columns */}
            <div className="flex items-stretch justify-center w-full mb-8">
              {t.columns.map((col, i) => (
                <div
                  key={col.label}
                  className="flex-1 flex flex-col items-center text-center px-4"
                  style={{
                    borderLeft: i > 0 ? '1px solid rgba(201,168,76,0.3)' : 'none',
                  }}
                >
                  <p
                    className="text-[#C9A84C] uppercase tracking-widest mb-3"
                    style={{ fontFamily: 'Lato, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em' }}
                  >
                    {col.label}
                  </p>
                  {i === 2 ? (
                    <div
                      className="text-[#2C2C2C] leading-snug"
                      style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 500 }}
                    >
                      <span className="block">T2 Duplex +1</span>
                      <button
                        onClick={() => setDuplexLightbox(0)}
                        className="block text-[#C9A84C] underline underline-offset-2 hover:text-[#a8873a] transition-colors cursor-pointer"
                        style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 500 }}
                      >
                        T3 Duplex +1
                      </button>
                    </div>
                  ) : (
                    <p
                      className="text-[#2C2C2C] whitespace-pre-line leading-snug"
                      style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 500 }}
                    >
                      {col.type}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom divider */}
            <div className="w-full h-px bg-[#C9A84C]/30 mb-8" />

            {/* Features */}
            <div className="mb-8 space-y-1">
              {t.features.map((f) => (
                <p
                  key={f}
                  className="text-[#2C2C2C]/65"
                  style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', lineHeight: '1.9' }}
                >
                  {f}
                </p>
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
            {/* Image wrapper — chevrons and X are relative to this */}
            <motion.div
              key={duplexLightbox}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* X */}
              <button
                onClick={closeDuplex}
                className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
              >
                <X size={26} />
              </button>

              <img
                src={duplexImages[duplexLightbox]}
                alt={`T3 Duplex ${duplexLightbox + 1}`}
                className="object-contain rounded"
                style={{ maxWidth: '88vw', maxHeight: '85vh' }}
              />

              {/* Left chevron */}
              <button
                onClick={(e) => { e.stopPropagation(); prevDuplex(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-200"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Right chevron */}
              <button
                onClick={(e) => { e.stopPropagation(); nextDuplex(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-200"
              >
                <ChevronRight size={22} />
              </button>

              {/* Counter */}
              <div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/50"
                style={{ fontFamily: 'Lato, sans-serif', fontSize: '12px', letterSpacing: '0.1em' }}
              >
                {duplexLightbox + 1} / {duplexImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
