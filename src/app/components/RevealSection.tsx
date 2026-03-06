import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import imgBackground from '../../Assets/Images/background_x1.png';

const css = `
  .reveal-section {
    position: relative;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .reveal-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    z-index: 0;
  }

  .reveal-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.15) 0%,
      rgba(0, 0, 0, 0.55) 100%
    );
  }

  .reveal-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 0 24px;
  }

  .reveal-label {
    display: block;
    font-family: 'Lato', sans-serif;
    font-size: 11px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: #F5F0E8;
    margin-bottom: 24px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.7s ease 0s, transform 0.7s ease 0s;
  }

  .reveal-content.visible .reveal-label {
    opacity: 1;
    transform: translateY(0);
  }

  .reveal-headline {
    font-family: 'Playfair Display', serif;
    font-size: clamp(42px, 7vw, 96px);
    font-weight: 400;
    line-height: 1.1;
    color: #FFFFFF;
    margin: 0;
  }

  .reveal-headline em {
    font-style: italic;
    color: #C9A84C;
  }

  .reveal-word {
    display: inline-block;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease var(--delay, 0s),
                transform 0.8s ease var(--delay, 0s);
  }

  .reveal-content.visible .reveal-word {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    .reveal-bg {
      background-attachment: scroll;
    }
  }
`;

const translations = {
  PT: {
    label: 'CAMAMA · LUANDA',
    line1: 'Viver com',
    line2: 'Distinção',
  },
  EN: {
    label: 'CAMAMA · LUANDA',
    line1: 'Living with',
    line2: 'Distinction',
  },
};

export function RevealSection() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              content.classList.add('visible');
            }, 200);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{css}</style>
      <section className="reveal-section" ref={sectionRef}>
        <div
          className="reveal-bg"
          style={{ backgroundImage: `url(${imgBackground})` }}
        />
        <div className="reveal-content" ref={contentRef}>
          <span className="reveal-label">{t.label}</span>
          <h2 className="reveal-headline">
            <span
              className="reveal-word"
              style={{ '--delay': '0.2s' } as React.CSSProperties}
            >
              {t.line1}
            </span>
            <br />
            <em>
              <span
                className="reveal-word"
                style={{ '--delay': '0.5s' } as React.CSSProperties}
              >
                {t.line2}
              </span>
            </em>
          </h2>
        </div>
      </section>
    </>
  );
}
