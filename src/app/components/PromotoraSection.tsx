import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { useLanguage } from '../context/LanguageContext';
import gestaoLogo from '../../Assets/Logos/logo_gestao_do_condado_dourado.png';

const translations = {
  PT: {
    label: 'PROMOTORA',
    gestaoDesc: 'A Gestão do Condado, Participações Sociais, Lda é uma empresa angolana com vasta experiência no setor imobiliário. Com foco em excelência e compromisso com a qualidade, desenvolvemos projetos que se destacam no mercado.',
  },
  EN: {
    label: 'DEVELOPER',
    gestaoDesc: 'Gestão do Condado, Participações Sociais, Lda is an Angolan company with extensive experience in the real estate sector. With a focus on excellence and commitment to quality, we develop projects that stand out in the market.',
  },
};

interface PromotoraSectionProps {
  interiorImage: string;
}

export function PromotoraSection({ interiorImage }: PromotoraSectionProps) {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <section id="promotora" ref={ref} className="w-full grid lg:grid-cols-2">
      {/* Left: Interior Photo */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.8 }}
        className="h-[400px] lg:h-auto min-h-[600px]"
      >
        <img
          src={interiorImage}
          alt="Interior view"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Right: Developer Info */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 0.8 }}
        className="bg-[#1B2A3B] px-6 lg:px-16 py-16 lg:py-24 flex flex-col justify-center"
      >
        <div
          className="text-[#C9A84C] mb-8 tracking-[0.2em]"
          style={{ fontFamily: 'Lato, sans-serif', fontSize: '12px' }}
        >
          {t.label}
        </div>

        <div className="space-y-12">
          {/* Gestão do Condado */}
          <div>
            <div className="mb-6">
              <img src={gestaoLogo} alt="Gestão do Condado" className="h-24 w-auto object-contain mb-4" />
            </div>
            <p
              className="text-[#F5F0E8]/80 leading-relaxed"
              style={{ fontFamily: 'Lato, sans-serif', fontSize: '15px', lineHeight: '1.8' }}
            >
              {t.gestaoDesc}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
