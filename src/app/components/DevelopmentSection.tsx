import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { StackingSections } from './StackingSections';

const translations = {
  PT: {
    amenitiesTitle: 'Comodidades Exclusivas',
    amenities: ['Segurança 24/7', 'Piscina e Área de Lazer', 'Ginásio Totalmente Equipado', 'Estacionamento Privativo', 'Áreas Verdes e Jardins', 'Playground Infantil', 'Salão de Festas', 'Portaria Inteligente'],
  },
  EN: {
    amenitiesTitle: 'Exclusive Amenities',
    amenities: ['24/7 Security', 'Pool and Leisure Area', 'Fully Equipped Gym', 'Private Parking', 'Green Areas and Gardens', "Children's Playground", 'Party Hall', 'Smart Gatehouse'],
  },
};

interface DevelopmentSectionProps {
  image1: string;
  image2: string;
}

export function DevelopmentSection({ image1, image2 }: DevelopmentSectionProps) {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const { lang } = useLanguage();
  const t = translations[lang];
  const { amenities } = t;

  return (
    <section id="development" ref={ref} className="w-full bg-white">
      <StackingSections />

      {/* Two Image Strip */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid md:grid-cols-2"
      >
        <img
          src={image1}
          alt="Interior detail"
          className="w-full h-[300px] md:h-[400px] object-cover"
        />
        <img
          src={image2}
          alt="Interior detail"
          className="w-full h-[300px] md:h-[400px] object-cover"
        />
      </motion.div>

      {/* Amenities Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="px-6 lg:px-16 py-16 lg:py-24 bg-[#F5F0E8]"
      >
        <div className="max-w-[1200px] mx-auto">
          <h3
            className="text-[#2C2C2C] mb-12 text-center"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 600 }}
          >
            {t.amenitiesTitle}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenities.map((amenity, index) => (
              <motion.div
                key={amenity}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className="w-5 h-5 mt-1 rounded-full bg-[#C9A84C] flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-white" />
                </div>
                <span
                  className="text-[#2C2C2C]"
                  style={{ fontFamily: 'Lato, sans-serif', fontSize: '15px' }}
                >
                  {amenity}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
