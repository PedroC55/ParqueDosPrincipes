import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';

interface PromotoraSectionProps {
  interiorImage: string;
}

export function PromotoraSection({ interiorImage }: PromotoraSectionProps) {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <section id="promotora" ref={ref} className="w-full grid lg:grid-cols-2">
      {/* Left: Interior Photo */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.8 }}
        className="h-[400px] lg:h-auto min-h-[600px]"
      >
        <img
          src={interiorImage}
          alt="Interior view"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Right: Developer Info */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 0.8 }}
        className="bg-[#1B2A3B] px-6 lg:px-16 py-16 lg:py-24 flex flex-col justify-center"
      >
        <div
          className="text-[#C9A84C] mb-8 tracking-[0.2em]"
          style={{ fontFamily: 'Lato, sans-serif', fontSize: '12px' }}
        >
          PROMOTORA
        </div>

        <div className="space-y-12">
          {/* Madre Development */}
          <div>
            <div className="mb-6">
              <div className="w-16 h-16 bg-[#C9A84C] flex items-center justify-center mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                <span className="text-[#1B2A3B] font-bold text-xl">MD</span>
              </div>
              <h3
                className="text-[#F5F0E8]"
                style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: 600 }}
              >
                Madre Development
              </h3>
            </div>
            <p
              className="text-[#F5F0E8]/80 leading-relaxed"
              style={{ fontFamily: 'Lato, sans-serif', fontSize: '15px', lineHeight: '1.8' }}
            >
              Especializada em desenvolvimento imobiliário de alto padrão, a Madre Development
              traz ao mercado angolano projetos que combinam inovação, sustentabilidade e design
              excepcional. Nossa missão é criar espaços que transformam vidas.
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#F5F0E8]/20"></div>

          {/* Gestão do Condado */}
          <div>
            <div className="mb-6">
              <div className="w-16 h-16 bg-[#C9A84C] flex items-center justify-center mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                <span className="text-[#1B2A3B] font-bold text-xl">GC</span>
              </div>
              <h3
                className="text-[#F5F0E8]"
                style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: 600 }}
              >
                Gestão do Condado
              </h3>
            </div>
            <p
              className="text-[#F5F0E8]/80 leading-relaxed"
              style={{ fontFamily: 'Lato, sans-serif', fontSize: '15px', lineHeight: '1.8' }}
            >
              A Gestão do Condado, Participações Sociais, Lda é uma empresa angolana com vasta
              experiência no setor imobiliário. Com foco em excelência e compromisso com a
              qualidade, desenvolvemos projetos que se destacam no mercado.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
