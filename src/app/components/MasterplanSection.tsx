import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';

interface MasterplanSectionProps {
  planImage: string;
}

export function MasterplanSection({ planImage }: MasterplanSectionProps) {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const typologies = [
    {
      name: 'Garden Residences',
      types: ['T1', 'T2'],
      description: 'Apartamentos com acesso direto ao jardim',
    },
    {
      name: 'Sunny Residences',
      types: ['T1', 'T2'],
      description: 'Unidades com ampla iluminação natural',
    },
    {
      name: 'Sky Residences',
      types: ['T1', 'T2'],
      description: 'Coberturas com vistas panorâmicas',
    },
  ];

  return (
    <section id="masterplan" ref={ref} className="w-full bg-[#F5F0E8] py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Masterplan Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <img
              src={planImage}
              alt="Masterplan"
              className="w-full h-auto shadow-2xl"
            />
          </motion.div>

          {/* Right: Typologies */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            {/* Logo */}
            <div className="flex justify-center lg:justify-start mb-12">
              <div className="w-20 h-20 bg-[#C9A84C] flex items-center justify-center" style={{ fontFamily: 'Playfair Display, serif' }}>
                <span className="text-[#1B2A3B] font-bold text-3xl">NP</span>
              </div>
            </div>

            {/* Masterplan Heading */}
            <h2
              className="text-[#2C2C2C] mb-12 text-center lg:text-left"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600 }}
            >
              Masterplan
            </h2>

            {/* Typologies */}
            <div className="space-y-8">
              {typologies.map((typology, index) => (
                <motion.div
                  key={typology.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="border-l-2 border-[#C9A84C] pl-6"
                >
                  <h3
                    className="text-[#2C2C2C] mb-2"
                    style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 600 }}
                  >
                    {typology.name}
                  </h3>
                  <div
                    className="text-[#C9A84C] mb-2 tracking-[0.1em]"
                    style={{ fontFamily: 'Lato, sans-serif', fontSize: '13px' }}
                  >
                    {typology.types.join(' · ')}
                  </div>
                  <p
                    className="text-[#2C2C2C]/70"
                    style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', lineHeight: '1.6' }}
                  >
                    {typology.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Options Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 pt-8 border-t border-[#2C2C2C]/20"
            >
              <p
                className="text-[#2C2C2C]/60 text-center lg:text-left"
                style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', fontStyle: 'italic' }}
              >
                Opções: Comfort, Family & Friends
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
