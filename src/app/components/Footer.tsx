export function Footer() {
  return (
    <footer className="w-full">
      {/* Upper Band - Project Logo */}
      <div className="bg-[#2D6B79] py-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex justify-center">
          <div className="w-20 h-20 bg-[#C9A84C] flex items-center justify-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            <span className="text-[#1B2A3B] font-bold text-3xl">NP</span>
          </div>
        </div>
      </div>

      {/* Lower Band - Developer Info */}
      <div className="bg-[#1B2A3B] py-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center gap-6">
            {/* Developer Logo */}
            <div className="w-16 h-16 bg-[#C9A84C] flex items-center justify-center" style={{ fontFamily: 'Playfair Display, serif' }}>
              <span className="text-[#1B2A3B] font-bold text-2xl">GC</span>
            </div>

            {/* Developer Name */}
            <h3
              className="text-[#F5F0E8] text-center"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 600 }}
            >
              Gestão do Condado
            </h3>

            {/* Disclaimer */}
            <p
              className="text-[#F5F0E8]/60 text-center max-w-2xl"
              style={{ fontFamily: 'Lato, sans-serif', fontSize: '12px', lineHeight: '1.6' }}
            >
              As imagens utilizadas são meramente ilustrativas e não representam necessariamente
              o produto final. Todas as informações e especificações estão sujeitas a alterações
              sem aviso prévio.
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
              Política de Privacidade
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
