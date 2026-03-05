import { useRef, useState, useEffect } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';

export function VirtualTourSection() {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const handleFullscreen = () => containerRef.current?.requestFullscreen();
  const handleMinimize = () => document.exitFullscreen();

  return (
    <section
      id="virtual-tour"
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
            VISITA VIRTUAL
          </div>
          <h2
            className="text-[#F5F0E8]"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600 }}
          >
            Explora as Nossas Instalações em 360°
          </h2>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            position: 'relative',
            width: '100%',
            height: isFullscreen ? '100vh' : '600px',
            borderRadius: isFullscreen ? '0' : '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          }}
        >
          <iframe
            ref={iframeRef}
            src="https://critecng.com/hubd/parquedosprincipes/"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            title="Visita Virtual"
          />
          <button
            onClick={isFullscreen ? handleMinimize : handleFullscreen}
            title={isFullscreen ? 'Sair do ecrã inteiro' : 'Ecrã inteiro'}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '40px',
              height: '40px',
              background: 'rgba(28,28,28,0.75)',
              border: '1px solid #C9A84C',
              borderRadius: '6px',
              color: '#C9A84C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#C9A84C')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(28,28,28,0.75)')}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
