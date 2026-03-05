import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  PT: {
    label: 'CAMAMA',
    title: 'No Coração de Luanda',
    p1: 'Localizado em Camama, uma das áreas mais promissoras de Luanda, este empreendimento oferece uma localização estratégica com fácil acesso aos principais pontos da cidade.',
    p2: 'Com infraestrutura moderna e completa, o projeto combina elegância, funcionalidade e segurança, proporcionando um estilo de vida único para você e sua família.',
    p3: 'Um novo conceito de residência que valoriza cada detalhe, desde o design arquitetônico até os acabamentos premium, criando espaços que inspiram conforto e sofisticação.',
  },
  EN: {
    label: 'CAMAMA',
    title: 'In the Heart of Luanda',
    p1: 'Located in Camama, one of the most promising areas of Luanda, this development offers a strategic location with easy access to the city\'s main points.',
    p2: 'With modern and complete infrastructure, the project combines elegance, functionality and security, providing a unique lifestyle for you and your family.',
    p3: 'A new concept of residence that values every detail, from the architectural design to the premium finishes, creating spaces that inspire comfort and sophistication.',
  },
};

interface IntroSectionProps {
  aerialImage: string;
}

export function IntroSection({ aerialImage }: IntroSectionProps) {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <section
      id="intro"
      ref={ref}
      className="w-full bg-[#F5F0E8] grid lg:grid-cols-2 items-center"
    >
      {/* Left: Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.8 }}
        className="px-6 lg:px-16 py-16 lg:py-24"
      >
        <div
          className="text-[#C9A84C] mb-6 tracking-[0.2em]"
          style={{ fontFamily: 'Lato, sans-serif', fontSize: '12px' }}
        >
          {t.label}
        </div>
        <h2
          className="text-[#2C2C2C] mb-8 leading-tight"
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600 }}
        >
          {t.title}
        </h2>
        <div
          className="text-[#2C2C2C]/80 space-y-4"
          style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', lineHeight: '1.8' }}
        >
          <p>{t.p1}</p>
          <p>{t.p2}</p>
          <p>{t.p3}</p>
        </div>
      </motion.div>

      {/* Right: Full-bleed Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 0.8 }}
        className="h-full min-h-[400px] lg:min-h-[600px]"
      >
        <img
          src={aerialImage}
          alt="Aerial view of Camama, Luanda"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </section>
  );
}
