import { Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export function StickyCTA() {
  const { lang } = useLanguage();
  const handleClick = () => {
    const element = document.getElementById('contacts');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-40 bg-[#C9A84C] hover:bg-[#B8963E] text-[#1B2A3B] px-6 py-3 shadow-2xl flex items-center gap-2 transition-all duration-300 hover:scale-105"
      style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', fontWeight: 600 }}
    >
      <Calendar size={18} />
      <span className="hidden sm:inline">{lang === 'EN' ? 'Learn More' : 'Saber Mais'}</span>
    </motion.button>
  );
}
