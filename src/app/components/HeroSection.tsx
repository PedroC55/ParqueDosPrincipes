import { ChevronDown, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  backgroundImage: string;
}

export function HeroSection({ backgroundImage }: HeroSectionProps) {
  const scrollToNext = () => {
    const element = document.getElementById('intro');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCTA = () => {
    const element = document.getElementById('contacts');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt="Luxury residential development"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-6 lg:px-12 max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-3xl"
        >
          <div
            className="text-[#C9A84C] mb-6 tracking-[0.2em]"
            style={{ fontFamily: 'Lato, sans-serif', fontSize: '12px' }}
          >
            WELCOME
          </div>
          <h1
            className="text-[#F5F0E8] mb-6 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 600 }}
          >
            Uma nova forma de viver em Luanda
          </h1>
          <p
            className="text-[#F5F0E8]/90 max-w-xl mb-8"
            style={{ fontFamily: 'Lato, sans-serif', fontSize: '18px', lineHeight: '1.8', fontWeight: 300 }}
          >
            Descubra o empreendimento residencial mais exclusivo de Camama, onde o luxo encontra o conforto.
          </p>
        </motion.div>

        {/* Location Tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute bottom-8 left-6 lg:left-12"
        >
          <div
            className="text-[#C9A84C] tracking-[0.15em]"
            style={{ fontFamily: 'Lato, sans-serif', fontSize: '11px' }}
          >
            CAMAMA · LUANDA · ANGOLA
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToNext}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.5,
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#F5F0E8] hover:text-[#C9A84C] transition-colors"
        >
          <ChevronDown size={32} />
        </motion.button>

      </div>
    </section>
  );
}
