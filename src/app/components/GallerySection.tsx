import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  PT: {
    label: 'GALERIA',
    title: 'Explore o Projeto',
    subtitle: 'Descubra os espaços exclusivos do nosso empreendimento',
    categories: ['EXTERIOR', 'INTERIOR', 'AMENIDADES', 'VISTAS'],
  },
  EN: {
    label: 'GALLERY',
    title: 'Explore the Project',
    subtitle: 'Discover the exclusive spaces of our development',
    categories: ['EXTERIOR', 'INTERIOR', 'AMENITIES', 'VIEWS'],
  },
};

interface GallerySectionProps {
  images: {
    exterior: string[];
    interior: string[];
    amenities: string[];
    views: string[];
  };
}

export function GallerySection({ images }: GallerySectionProps) {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const { lang } = useLanguage();
  const t = translations[lang];

  const categories = [
    { name: t.categories[0], images: images.exterior },
    { name: t.categories[1], images: images.interior },
    { name: t.categories[2], images: images.amenities },
    { name: t.categories[3], images: images.views },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="gallery"
      ref={ref}
      className="w-full bg-[#1C1C1C] py-16 lg:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div
            className="text-[#C9A84C] mb-4 tracking-[0.2em]"
            style={{ fontFamily: 'Lato, sans-serif', fontSize: '12px' }}
          >
            {t.label}
          </div>
          <h2
            className="text-[#F5F0E8]"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600 }}
          >
            {t.title}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-4 lg:gap-6">
          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#2D6B79] p-8 flex flex-col justify-center items-center text-center"
          >
            <div className="w-16 h-16 bg-[#C9A84C] mb-6 flex items-center justify-center" style={{ fontFamily: 'Playfair Display, serif' }}>
              <span className="text-[#1B2A3B] font-bold text-2xl">NP</span>
            </div>
            <p
              className="text-[#F5F0E8]/90"
              style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', lineHeight: '1.6' }}
            >
              {t.subtitle}
            </p>
          </motion.div>

          {/* Gallery Grid */}
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              className="relative h-[300px] lg:h-[400px] overflow-hidden cursor-pointer group"
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <img
                src={category.images[0]}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredCategory === category.name ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div
                  className="text-[#C9A84C] tracking-[0.15em]"
                  style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px' }}
                >
                  {category.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center gap-4 mt-8"
        >
          <button
            onClick={handlePrev}
            className="w-12 h-12 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#1C1C1C] transition-all duration-300 flex items-center justify-center"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="w-12 h-12 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#1C1C1C] transition-all duration-300 flex items-center justify-center"
          >
            <ChevronRight size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
