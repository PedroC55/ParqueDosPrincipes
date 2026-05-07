import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { useLanguage } from '../context/LanguageContext';
import parqueLogo from '../../Assets/Logos/logo_parque_dos_principes_dourado.png';

const translations = {
  PT: {
    title: 'Masterplan',
    columns: [
      { label: 'Dois Quartos', type: 'T2' },
      { label: 'Três Quartos', type: 'T3' },
      { label: 'Duplex', type: 'T2 · T3\nDuplex +1' },
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
      { label: 'Duplex', type: 'T2 · T3\nDuplex +1' },
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

  return (
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
                  <p
                    className="text-[#2C2C2C] whitespace-pre-line leading-snug"
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                      fontWeight: 500,
                    }}
                  >
                    {col.type}
                  </p>
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
  );
}
