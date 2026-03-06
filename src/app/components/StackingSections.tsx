import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import imgHall from '../../Assets/Images/hall.jpg';
import imgPiscina from '../../Assets/Images/piscina.jpg';
import imgGinasio from '../../Assets/Images/ginasio.jpg';
import imgJardim from '../../Assets/Images/jardim.jpg';

const css = `
  .stacking-wrapper {
    position: relative;
    height: 400vh;
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
      label: 'EMPREENDIMENTO',
      headline: 'Segurança e\nConforto',
      body: 'O Parque dos Príncipes redefine o conceito de moradia moderna em Luanda, oferecendo um ambiente seguro e sofisticado para toda a família.',
    },
    section2: {
      label: 'ARQUITECTURA',
      headline: 'Design que\nInspira Vida',
      body: 'Cada detalhe foi pensado para criar espaços que equilibram beleza e funcionalidade, elevando o padrão de vida em Luanda.',
    },
    section3: {
      label: 'ACABAMENTOS',
      headline: 'Materiais de\nExcelência',
      body: 'Selecionamos os melhores materiais do mercado, garantindo durabilidade, elegância e uma experiência sensorial única em cada espaço.',
    },
    section4: {
      label: 'NATUREZA',
      headline: 'Viver em\nHarmonia Verde',
      body: 'Jardins exuberantes e áreas de lazer ao ar livre criam um refúgio natural onde a natureza e o conforto urbano coexistem em perfeita harmonia.',
    },
  },
  EN: {
    section1: {
      label: 'DEVELOPMENT',
      headline: 'Safety and\nComfort',
      body: 'Parque dos Príncipes redefines the concept of modern living in Luanda, offering a safe and sophisticated environment for the whole family.',
    },
    section2: {
      label: 'ARCHITECTURE',
      headline: 'Design that\nInspires Life',
      body: 'Every detail was designed to create spaces that balance beauty and functionality, elevating the standard of living in Luanda.',
    },
    section3: {
      label: 'FINISHES',
      headline: 'Materials of\nExcellence',
      body: 'We selected the best materials on the market, ensuring durability, elegance and a unique sensory experience in every space.',
    },
    section4: {
      label: 'NATURE',
      headline: 'Living in\nGreen Harmony',
      body: 'Lush gardens and outdoor leisure areas create a natural refuge where nature and urban comfort coexist in perfect harmony.',
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
      <p
        style={{
          color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(44,44,44,0.75)',
          fontFamily: 'Lato, sans-serif',
          fontSize: '16px',
          lineHeight: 1.85,
        }}
      >
        {body}
      </p>
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

        {/* Panel 2 — Arquitectura: Image LEFT / Text RIGHT */}
        <div className="stacking-section section-2">
          <img src={imgPiscina} alt={t.section2.label} className="image-side" />
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

        {/* Panel 4 — Natureza: Image LEFT / Text RIGHT */}
        <div className="stacking-section section-4">
          <img src={imgJardim} alt={t.section4.label} className="image-side" />
          <div className="text-side">
            <TextBlock {...t.section4} />
          </div>
        </div>

      </div>
    </>
  );
}
