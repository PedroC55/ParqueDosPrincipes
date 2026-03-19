import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { useLanguage } from '../context/LanguageContext';
import parqueLogo from '../../Assets/Logos/logo_parque_dos_principes_dourado.png';

const translations = {
  PT: {
    title: 'Masterplan',
    typologyTypes: 'T2 . T3',
    duplex: ['T2 Duplex +1', 'T3 Duplex +1'],
    features: [
      'Apartamentos com acesso direto ao jardim',
      'Ampla iluminação natural',
      'Vistas panorâmicas',
    ],
    note: ['Disponivel diversas Tipologias.', 'Todos os apartamentos com estacionamento coberto garantido.'],
  },
  EN: {
    title: 'Masterplan',
    typologyTypes: 'T2 . T3',
    duplex: ['T2 Duplex +1', 'T3 Duplex +1'],
    features: [
      'Apartments with direct garden access',
      'Ample natural lighting',
      'Panoramic views',
    ],
    note: ['Various Typologies available.', 'All apartments with guaranteed covered parking.'],
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
    <section id="masterplan" ref={ref} className="w-full bg-[#F5F0E8] py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left: Masterplan Image — 60% */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 w-full lg:w-[60%]"
          >
            <img
              src={planImage}
              alt="Masterplan"
              className="w-full h-auto shadow-2xl"
            />
          </motion.div>

          {/* Right: Typologies — 40% */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 w-full lg:w-[40%] flex flex-col items-center text-center"
          >
            {/* Logo */}
            <div className="flex justify-center mb-12">
              <img src={parqueLogo} alt="Parque dos Príncipes" className="h-20 w-auto object-contain" />
            </div>

            {/* Masterplan Heading */}
            <h2
              className="text-[#C9A84C] mb-6 text-center"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 600 }}
            >
              {t.title}
            </h2>

            {/* T2 . T3 */}
            <p
              className="text-[#2C2C2C] mb-6 text-center"
              style={{ fontFamily: 'Lato, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300 }}
            >
              {t.typologyTypes}
            </p>

            {/* Duplex */}
            <div className="mb-8 text-center">
              {t.duplex.map((d) => (
                <p
                  key={d}
                  className="text-[#2C2C2C]"
                  style={{ fontFamily: 'Lato, sans-serif', fontSize: 'clamp(1.3rem, 2.5vw, 2rem)', fontWeight: 300 }}
                >
                  {d}
                </p>
              ))}
            </div>

            {/* Features */}
            <div className="mb-8 text-center">
              {t.features.map((f) => (
                <p
                  key={f}
                  className="text-[#2C2C2C]/70"
                  style={{ fontFamily: 'Lato, sans-serif', fontSize: '15px', lineHeight: '1.8' }}
                >
                  {f}
                </p>
              ))}
            </div>

            {/* Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-4"
            >
              {t.note.map((line) => (
                <p
                  key={line}
                  className="text-[#2C2C2C] text-center"
                  style={{ fontFamily: 'Lato, sans-serif', fontSize: '15px', fontWeight: 600, lineHeight: '1.6' }}
                >
                  {line}
                </p>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
