import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { useLanguage } from '../context/LanguageContext';
import gestaoLogo from '../../Assets/Logos/logo_gestao_do_condado_branco.png';

const translations = {
  PT: {
    label: 'QUEM SOMOS',
    title: 'GESTÃO DO CONDADO',
    paragraphs: [
      'Há quase 20 anos, a Gestão do Condado, LDA firmou suas raízes em Angola, construindo um legado sólido no setor de construção e promoção imobiliária. Com um dos nossos sócios trazendo décadas de experiência, estamos comprometidos em transformar o cenário urbano e atender às necessidades da comunidade.',
      'Guiados por princípios éticos e impulsionados pela inovação, assumimos um papel ativo na sociedade, promovendo as melhores práticas e antecipando tendências que moldam a vida moderna. Nossa missão é criar espaços que não apenas habitam, mas que também inspiram e conectam as pessoas.',
      'Se quiser saber mais sobre os nossos projetos, pedir informações extras ou explorar uma colaboração, deixe o seu contacto. Um membro da nossa equipa contacta-o o mais breve possível.',
      'Junte-se a nós nesta jornada de construção e transformação!',
      'Ter um formulário para quem tiver interesse preencher, e nós posteriormente respondermos.',
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
      'A form is available for those interested in filling out, and we will subsequently respond.',
    ],
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
    <section id="promotora" ref={ref} className="w-full relative overflow-hidden min-h-[600px] lg:min-h-[700px] xl:min-h-[750px]">

      {/* Background: split image left / dark right */}
      <div className="absolute inset-0 flex">
        {/* Left: image */}
        <div className="w-full lg:w-1/2 h-full">
          <img
            src={interiorImage}
            alt="Interior view"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Right: dark teal */}
        <div className="hidden lg:flex w-1/2 h-full items-center justify-center" style={{ backgroundColor: 'rgb(45, 107, 121)' }}>
          <img
            src={gestaoLogo}
            alt="Gestão do Condado"
            className="w-48 lg:w-64 object-contain"
            style={{ opacity: 0.25 }}
          />
        </div>
      </div>

      {/* Full-section black mask */}
      <div className="absolute inset-0 z-[5]" style={{ backgroundColor: 'rgba(0,0,0,0.50)' }} />

      {/* Text — centrado na secção, ligeiramente à esquerda */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start w-full max-w-xl px-8 lg:px-0 lg:pr-24"
        >
          <div
            className="text-white mb-3 tracking-[0.2em]"
            style={{ fontFamily: 'Lato, sans-serif', fontSize: '12px' }}
          >
            {t.label}
          </div>
          <h2
            className="text-white mb-6"
            style={{ fontFamily: 'Lato, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 300, letterSpacing: '0.1em' }}
          >
            {t.title}
          </h2>
          <div className="space-y-4">
            {t.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-white"
                style={{ fontFamily: 'Lato, sans-serif', fontSize: '13px', lineHeight: '1.8' }}
              >
                {p}
              </p>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
}
