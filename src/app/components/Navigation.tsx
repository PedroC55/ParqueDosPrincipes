import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('PT');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#1B2A3B]/95 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-4 lg:py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-12 h-12 bg-[#C9A84C] flex items-center justify-center" style={{ fontFamily: 'Playfair Display, serif' }}>
              <span className="text-[#1B2A3B] font-bold text-xl">NP</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('contacts')}
              className="text-[#F5F0E8] hover:text-[#C9A84C] transition-colors tracking-wider"
              style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', letterSpacing: '0.1em' }}
            >
              CONTACTOS
            </button>
            <button
              onClick={() => scrollToSection('development')}
              className="text-[#F5F0E8] hover:text-[#C9A84C] transition-colors tracking-wider"
              style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', letterSpacing: '0.1em' }}
            >
              PARQUE DOS PRÍNCIPES
            </button>
            <button
              onClick={() => scrollToSection('promotora')}
              className="text-[#F5F0E8] hover:text-[#C9A84C] transition-colors tracking-wider"
              style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', letterSpacing: '0.1em' }}
            >
              PROMOTORA
            </button>
            <button
              onClick={() => scrollToSection('hero')}
              className="text-[#F5F0E8] hover:text-[#C9A84C] transition-colors tracking-wider"
              style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', letterSpacing: '0.1em' }}
            >
              VIDEO
            </button>
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => setLanguage('PT')}
                className={`${
                  language === 'PT' ? 'text-[#C9A84C]' : 'text-[#F5F0E8]'
                } hover:text-[#C9A84C] transition-colors tracking-wider`}
                style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', letterSpacing: '0.1em' }}
              >
                PT
              </button>
              <span className="text-[#F5F0E8]">|</span>
              <button
                onClick={() => setLanguage('EN')}
                className={`${
                  language === 'EN' ? 'text-[#C9A84C]' : 'text-[#F5F0E8]'
                } hover:text-[#C9A84C] transition-colors tracking-wider`}
                style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', letterSpacing: '0.1em' }}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#F5F0E8]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-6 pb-4 space-y-4">
            <button
              onClick={() => scrollToSection('contacts')}
              className="block text-[#F5F0E8] hover:text-[#C9A84C] transition-colors tracking-wider"
              style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', letterSpacing: '0.1em' }}
            >
              CONTACTOS
            </button>
            <button
              onClick={() => scrollToSection('development')}
              className="block text-[#F5F0E8] hover:text-[#C9A84C] transition-colors tracking-wider"
              style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', letterSpacing: '0.1em' }}
            >
              PARQUE DOS PRÍNCIPES
            </button>
            <button
              onClick={() => scrollToSection('promotora')}
              className="block text-[#F5F0E8] hover:text-[#C9A84C] transition-colors tracking-wider"
              style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', letterSpacing: '0.1em' }}
            >
              PROMOTORA
            </button>
            <button
              onClick={() => scrollToSection('hero')}
              className="block text-[#F5F0E8] hover:text-[#C9A84C] transition-colors tracking-wider"
              style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', letterSpacing: '0.1em' }}
            >
              VIDEO
            </button>
            <div className="flex items-center gap-2 pt-4">
              <button
                onClick={() => setLanguage('PT')}
                className={`${
                  language === 'PT' ? 'text-[#C9A84C]' : 'text-[#F5F0E8]'
                } hover:text-[#C9A84C] transition-colors tracking-wider`}
                style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', letterSpacing: '0.1em' }}
              >
                PT
              </button>
              <span className="text-[#F5F0E8]">|</span>
              <button
                onClick={() => setLanguage('EN')}
                className={`${
                  language === 'EN' ? 'text-[#C9A84C]' : 'text-[#F5F0E8]'
                } hover:text-[#C9A84C] transition-colors tracking-wider`}
                style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', letterSpacing: '0.1em' }}
              >
                EN
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
