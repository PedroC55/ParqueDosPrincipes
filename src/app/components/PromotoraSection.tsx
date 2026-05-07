import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { useLanguage } from '../context/LanguageContext';
import gestaoLogo from '../../Assets/Logos/logo_gestao_do_condado_dourado.png';

const translations = {
  PT: {
    label: 'QUEM SOMOS',
    title: 'GESTÃO DO CONDADO',
    paragraphs: [
      'Há quase 20 anos, a Gestão do Condado, LDA firmou suas raízes em Angola, construindo um legado sólido no setor de construção e promoção imobiliária. Com um dos nossos sócios trazendo décadas de experiência, estamos comprometidos em transformar o cenário urbano e atender às necessidades da comunidade.',
      'Guiados por princípios éticos e impulsionados pela inovação, assumimos um papel ativo na sociedade, promovendo as melhores práticas e antecipando tendências que moldam a vida moderna. Nossa missão é criar espaços que não apenas habitam, mas que também inspiram e conectam as pessoas.',
      'Se quiser saber mais sobre os nossos projetos, pedir informações extras ou explorar uma colaboração, deixe o seu contacto. Um membro da nossa equipa contacta-o o mais breve possível.',
      'Junte-se a nós nesta jornada de construção e transformação!',
    ],
  },
  EN: {
    label: 'WHO WE ARE',
    title: 'GESTÃO DO CONDADO',
    paragraphs: [
      'For nearly 20 years, Gestão do Condado, LDA has established its roots in Angola, building a solid legacy in the construction and real estate promotion sector. With one of our partners bringing decades of experience, we are committed to transforming the urban landscape and meeting community needs.',
      'Guided by ethical principles and driven by innovation, we take an active role in society, promoting best practices and anticipating trends that shape modern life. Our mission is to create spaces that not only house people, but also inspire and connect them.',
      'If you would like to know more about our projects, request additional information or explore a collaboration, leave your contact. A member of our team will get back to you as soon as possible.',
      'Join us on this journey of construction and transformation!',
    ],
  },
};

interface PromotoraSectionProps {
  interiorImage: string;
}

export function PromotoraSection({ interiorImage }: PromotoraSectionProps) {
  const [ref, isInView] = useInView({ threshold: 0.15 });
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <section id="promotora" ref={ref} className="w-full relative overflow-hidden">
      {/* Background image */}
      <img
        src={interiorImage}
        alt="Gestão do Condado"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.62)' }} />

      {/* Content */}
      <div className="relative z-10 py-20 lg:py-28 px-6 lg:px-20">
        <div className="max-w-[680px] mx-auto lg:mx-0 lg:ml-[8%]">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img
                src={gestaoLogo}
                alt="Gestão do Condado"
                className="h-36 lg:h-40 w-auto object-contain"
              />
            </div>

            {/* Label */}
            <div
              className="mb-4 tracking-[0.25em] block"
              style={{ fontFamily: 'Lato, sans-serif', fontSize: '11px', color: '#C9A84C' }}
            >
              {t.label}
            </div>

            {/* Title */}
            <h2
              className="mb-8"
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                fontWeight: 300,
                letterSpacing: '0.12em',
                color: '#FFFFFF',
              }}
            >
              {t.title}
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4">
              {t.paragraphs.map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontSize: '13px',
                    lineHeight: '1.85',
                    color: 'rgba(255,255,255,0.82)',
                  }}
                >
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
