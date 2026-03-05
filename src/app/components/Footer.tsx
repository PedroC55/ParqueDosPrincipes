import { useLanguage } from '../context/LanguageContext';
import gestaoLogo from '../../Assets/Logos/logo_gestao_do_condado_dourado.png';
import parqueLogo from '../../Assets/Logos/logo_parque_dos_principes_dourado.png';

const translations = {
  PT: {
    disclaimer: 'As imagens utilizadas são meramente ilustrativas e não representam necessariamente o produto final. Todas as informações e especificações estão sujeitas a alterações sem aviso prévio.',
    privacy: 'Política de Privacidade',
  },
  EN: {
    disclaimer: 'The images used are merely illustrative and do not necessarily represent the final product. All information and specifications are subject to change without prior notice.',
    privacy: 'Privacy Policy',
  },
};

export function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang];
  return (
    <footer className="w-full">
      {/* Upper Band - Project Logo */}
      <div className="bg-[#2D6B79] py-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex justify-center">
          <img src={parqueLogo} alt="Parque dos Príncipes" className="h-20 w-auto object-contain" />
        </div>
      </div>

      {/* Lower Band - Developer Info */}
      <div className="bg-[#1B2A3B] py-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center gap-6">
            {/* Developer Logo */}
            <img src={gestaoLogo} alt="Gestão do Condado" className="h-24 w-auto object-contain" />

            {/* Disclaimer */}
            <p
              className="text-[#F5F0E8]/60 text-center max-w-2xl"
              style={{ fontFamily: 'Lato, sans-serif', fontSize: '12px', lineHeight: '1.6' }}
            >
              {t.disclaimer}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#1C1C1C] py-6">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-[#F5F0E8]/50">
            <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '12px' }}>
              2024 © Madre Property Development
            </span>
            <span className="hidden md:inline">|</span>
            <button
              className="hover:text-[#C9A84C] transition-colors"
              style={{ fontFamily: 'Lato, sans-serif', fontSize: '12px' }}
            >
              {t.privacy}
            </button>
            <span className="hidden md:inline">|</span>
            <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '12px' }}>
              Powered by Bspacy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
