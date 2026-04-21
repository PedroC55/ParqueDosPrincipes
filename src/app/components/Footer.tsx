import { useLanguage } from '../context/LanguageContext';
import gestaoLogo from '../../Assets/Logos/logo_gestao_do_condado_dourado.png';
import parqueLogo from '../../Assets/Logos/logo_parque_dos_principes_dourado.png';
import renatoNetoLogo from '../../Assets/Logos/renato_neto.png';
import hubductionLogo from '../../Assets/Logos/logo_hubduction.png';

const translations = {
  PT: {
    disclaimer: 'Todos os materiais, acabamentos e equipamentos descritos neste mapa são suscetíveis de ser ajustados / alterados, designadamente por exigências de ordem técnica, legal, arquitetónica, comercial ou de aprovisionamento, bem como por imposição das entidades licenciadoras ou por necessidades de compatibilização entre os projetos de execução de arquitetura e das especialidades sem que, contudo, estes ajustamentos / alterações, tenham implicações no nível de qualidade dos materiais, acabamentos e equipamentos previstos neste mapa.',
    privacy: 'Política de Privacidade',
    copyright: '2026 © Gestão do Condado',
  },
  EN: {
    disclaimer: 'All materials, finishes and equipment described in this plan are subject to adjustment / alteration, namely due to technical, legal, architectural, commercial or supply requirements, as well as by imposition of licensing entities or compatibility needs between architecture and specialty execution projects, without, however, these adjustments / alterations having implications on the quality level of the materials, finishes and equipment provided in this plan.',
    privacy: 'Privacy Policy',
    copyright: '2026 © Gestão do Condado',
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

      {/* Lower Band - Developer Info + Bottom Bar */}
      <div className="bg-[#1B2A3B] py-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {/* Developer Logos */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-8">
            <img src={renatoNetoLogo} alt="Renato Neto" className="h-14 w-auto object-contain" />
            <img src={gestaoLogo} alt="Gestão do Condado" className="h-24 w-auto object-contain" />
            <img src={hubductionLogo} alt="Hubduction" className="h-14 w-auto object-contain" />
          </div>

          {/* Disclaimer + Divider wrapper — same width */}
          <div className="max-w-4xl mx-auto">
            <p
              className="text-[#F5F0E8]/50 text-center mb-8"
              style={{ fontFamily: 'Lato, sans-serif', fontSize: '12px', lineHeight: '1.6' }}
            >
              {t.disclaimer}
            </p>

            {/* Divider */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[#F5F0E8]/50">
                <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '12px' }}>
                  {t.copyright}
                </span>
                <div className="flex items-center gap-6">
                  <button
                    className="hover:text-[#C9A84C] transition-colors"
                    style={{ fontFamily: 'Lato, sans-serif', fontSize: '12px' }}
                  >
                    {t.privacy}
                  </button>
                  <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '12px' }}>
                    Powered by Bspacy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
