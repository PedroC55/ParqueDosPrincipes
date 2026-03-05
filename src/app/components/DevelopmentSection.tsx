import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Check } from 'lucide-react';

interface DevelopmentSectionProps {
  mainImage: string;
  image1: string;
  image2: string;
}

export function DevelopmentSection({ mainImage, image1, image2 }: DevelopmentSectionProps) {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const amenities = [
    'Segurança 24/7',
    'Piscina e Área de Lazer',
    'Ginásio Totalmente Equipado',
    'Estacionamento Privativo',
    'Áreas Verdes e Jardins',
    'Playground Infantil',
    'Salão de Festas',
    'Portaria Inteligente',
  ];

  return (
    <section id="development" ref={ref} className="w-full bg-white">
      {/* Main Split Section */}
      <div className="grid lg:grid-cols-2 items-center">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
          className="px-6 lg:px-16 py-16 lg:py-24 order-2 lg:order-1"
        >
          <div
            className="text-[#C9A84C] mb-6 tracking-[0.2em]"
            style={{ fontFamily: 'Lato, sans-serif', fontSize: '12px' }}
          >
            EMPREENDIMENTO
          </div>
          <h2
            className="text-[#2C2C2C] mb-8 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600 }}
          >
            Segurança e Conforto
          </h2>
          <div
            className="text-[#2C2C2C]/80 space-y-4"
            style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', lineHeight: '1.8' }}
          >
            <p>
              O Parque dos Príncipes redefine o conceito de moradia moderna em Luanda, oferecendo
              um ambiente seguro e sofisticado para toda a família.
            </p>
            <p>
              Com acabamentos de primeira qualidade e atenção aos mínimos detalhes, cada residência
              foi projetada para proporcionar o máximo conforto e funcionalidade.
            </p>
            <p>
              Viva em harmonia com a natureza, sem abrir mão da praticidade e segurança que você
              e sua família merecem.
            </p>
          </div>
        </motion.div>

        {/* Right: Full-bleed Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8 }}
          className="h-full min-h-[400px] lg:min-h-[600px] order-1 lg:order-2"
        >
          <img
            src={mainImage}
            alt="Development aerial view"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

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
            Comodidades Exclusivas
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
