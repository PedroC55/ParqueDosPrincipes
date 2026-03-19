import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import imgHall from '../../Assets/Images/HALL_V1_FINAL.png';
import imgPiscina from '../../Assets/Images/POOL_V1_FINAL.png';
import imgGinasio from '../../Assets/Images/GYM_V1_FINAL.png';
import imgJardim from '../../Assets/Images/JARDIM01_V1_FINAL.png';
import imgGaragem from '../../Assets/Images/GARAGE_V1_FINAL.png';

const css = `
  .stacking-wrapper {
    position: relative;
    height: 500vh;
  }

  .stacking-section {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    display: flex;
  }

  .stacking-section .image-side {
    width: 55%;
    height: 100%;
    object-fit: cover;
    flex-shrink: 0;
  }

  .stacking-section .text-side {
    width: 45%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80px;
    flex-shrink: 0;
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .stacking-section .text-side.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Panel 1 — Segurança e Conforto: Text LEFT / Image RIGHT */
  .section-1 { z-index: 1; background: #FFFFFF; flex-direction: row-reverse; }

  /* Panel 2 — Arquitectura: Image LEFT / Text RIGHT */
  .section-2 { z-index: 2; background: #F5F0E8; }

  /* Panel 3 — Acabamentos: Text LEFT / Image RIGHT, dark */
  .section-3 { z-index: 3; background: #1B2A3B; flex-direction: row-reverse; }

  /* Panel 4 — Natureza: Image LEFT / Text RIGHT */
  .section-4 { z-index: 4; background: #F5F0E8; }

  /* Panel 5 — Garagem: Text LEFT / Image RIGHT */
  .section-5 { z-index: 5; background: #FFFFFF; flex-direction: row-reverse; }

  @media (max-width: 768px) {
    .stacking-wrapper {
      height: auto;
    }
    .stacking-section {
      position: relative;
      height: auto;
      flex-direction: column;
    }
    .section-1,
    .section-3 {
      flex-direction: column;
    }
    .stacking-section .image-side {
      width: 100%;
      height: 56vw;
    }
    .stacking-section .text-side {
      width: 100%;
      padding: 40px 24px;
    }
  }
`;

const translations = {
  PT: {
    section1: {
      label: 'CAMAMA - TALATONA',
      headline: 'Segurança e\nConforto',
      body: 'Apresentamos o Parque dos Príncipes Residence.\nUma realidade a poucos minutos de Talatona, surge uma nova forma de viver.\n\nEste condomínio privado foi idealizado para quem busca conforto e tranquilidade, aliado a um investimento com grande potencial de valorização.\n\nO Parque dos Príncipes redefine o conceito de residência moderna em Luanda, oferecendo um ambiente seguro e sofisticado para toda a família.',
    },
    section2: {
      label: 'CAMAMA - TALATONA',
      headline: 'Empreendimento',
      body: '• Arquitetura Moderna: Projetado com um design contemporâneo e elegante que se integra harmoniosamente ao ambiente.\n\n• Amenities Exclusivas: Desfrute de um espaço que combina relaxamento e lazer, com jardins amplos, piscina central, espaço gourmet, ginásio e salão de jogos.\n\n• Segurança Garantida: Sistema de segurança 24 horas, proporcionando total tranquilidade para você e sua família.\n\nDiversas Tipologias: Escolha entre apartamentos T2, T3, T2 Duplex +1 e T3 Duplex +1, todos com estacionamento coberto garantido.\nNão perca a oportunidade de se unir a uma comunidade que valoriza qualidade e conforto. Venha fazer parte deste novo conceito de viver!',
    },
    section3: {
      label: 'CAMAMA - TALATONA',
      headline: 'Materiais de\nExcelência',
      body: 'Selecionamos os melhores materiais do mercado, garantindo durabilidade, elegância e uma experiência sensorial única em cada espaço.',
    },
    section4: {
      label: 'CAMAMA - TALATONA',
      headline: 'Viver em\nHarmonia Verde',
      body: 'Jardins exuberantes e áreas de lazer ao ar livre criam um refúgio natural onde a natureza e o conforto urbano coexistem em perfeita harmonia.',
    },
    section5: {
      label: 'CAMAMA - TALATONA',
      headline: 'Estacionamento\nPrivativo',
      body: 'Garagens privativas espaçosas e seguras, concebidas para garantir a máxima comodidade no dia a dia dos residentes do Parque dos Príncipes.',
    },
  },
  EN: {
    section1: {
      label: 'CAMAMA - TALATONA',
      headline: 'Safety and\nComfort',
      body: 'We present Parque dos Príncipes Residence.\nA reality a few minutes from Talatona, a new way of living emerges.\n\nThis private condominium was conceived for those seeking comfort and tranquility, combined with an investment with great appreciation potential.\n\nParque dos Príncipes redefines the concept of modern residence in Luanda, offering a safe and sophisticated environment for the whole family.',
    },
    section2: {
      label: 'CAMAMA - TALATONA',
      headline: 'Development',
      body: '• Modern Architecture: Designed with a contemporary and elegant style that harmoniously integrates with the environment.\n\n• Exclusive Amenities: Enjoy a space that combines relaxation and leisure, with large gardens, central pool, gourmet space, gym and games room.\n\n• Guaranteed Security: 24-hour security system, providing total peace of mind for you and your family.\n\nVarious Typologies: Choose from T2, T3, T2 Duplex +1 and T3 Duplex +1 apartments, all with guaranteed covered parking.\nDon\'t miss the opportunity to join a community that values quality and comfort. Come be part of this new concept of living!',
    },
    section3: {
      label: 'CAMAMA - TALATONA',
      headline: 'Materials of\nExcellence',
      body: 'We selected the best materials on the market, ensuring durability, elegance and a unique sensory experience in every space.',
    },
    section4: {
      label: 'CAMAMA - TALATONA',
      headline: 'Living in\nGreen Harmony',
      body: 'Lush gardens and outdoor leisure areas create a natural refuge where nature and urban comfort coexist in perfect harmony.',
    },
    section5: {
      label: 'CAMAMA - TALATONA',
      headline: 'Private\nParking',
      body: 'Spacious and secure private garages, designed to ensure maximum convenience for the daily lives of Parque dos Príncipes residents.',
    },
  },
};

interface TextBlockProps {
  label: string;
  headline: string;
  body: string;
  dark?: boolean;
}

function TextBlock({ label, headline, body, dark = false }: TextBlockProps) {
  return (
    <>
      <div
        style={{
          color: '#C9A84C',
          fontFamily: 'Lato, sans-serif',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.25em',
          marginBottom: '20px',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
      <h2
        style={{
          color: dark ? '#FFFFFF' : '#2C2C2C',
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2rem, 3.2vw, 3rem)',
          fontWeight: 600,
          lineHeight: 1.15,
          marginBottom: '20px',
          whiteSpace: 'pre-line',
        }}
      >
        {headline}
      </h2>
      <div style={{ color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(44,44,44,0.75)', fontFamily: 'Lato, sans-serif', fontSize: '16px', lineHeight: 1.85 }}>
        {body.split('\n\n').map((para, i) => (
          <p key={i} style={{ marginBottom: '12px' }}>{para}</p>
        ))}
      </div>
    </>
  );
}

export function StackingSections() {
  const { lang } = useLanguage();
  const t = translations[lang];

  useEffect(() => {
    const sections = document.querySelectorAll('.stacking-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const textSide = entry.target.querySelector('.text-side');
            if (textSide) textSide.classList.add('visible');
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="stacking-wrapper">

        {/* Panel 1 — Segurança e Conforto: Text LEFT / Image RIGHT */}
        <div className="stacking-section section-1">
          <img src={imgHall} alt={t.section1.label} className="image-side" />
          <div className="text-side">
            <TextBlock {...t.section1} />
          </div>
        </div>

        {/* Panel 2 — Viver em Harmonia Verde: Image LEFT / Text RIGHT */}
        <div className="stacking-section section-2">
          <img src={imgPiscina} alt={t.section4.label} className="image-side" />
          <div className="text-side">
            <TextBlock {...t.section2} />
          </div>
        </div>

        {/* Panel 3 — Acabamentos: Text LEFT / Image RIGHT (dark) */}
        <div className="stacking-section section-3">
          <img src={imgGinasio} alt={t.section3.label} className="image-side" />
          <div className="text-side">
            <TextBlock {...t.section3} dark />
          </div>
        </div>

        {/* Panel 4 — Empreendimento: Image LEFT / Text RIGHT */}
        <div className="stacking-section section-4">
          <img src={imgJardim} alt={t.section2.label} className="image-side" />
          <div className="text-side">
            <TextBlock {...t.section4} />
          </div>
        </div>

        {/* Panel 5 — Garagem: Text LEFT / Image RIGHT */}
        <div className="stacking-section section-5">
          <img src={imgGaragem} alt={t.section5.label} className="image-side" />
          <div className="text-side">
            <TextBlock {...t.section5} />
          </div>
        </div>

      </div>
    </>
  );
}
