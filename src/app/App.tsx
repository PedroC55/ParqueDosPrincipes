import { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import imgPiscina from '../Assets/Images/POOL_V2_FINAL.webp';
import imgEspreguicadeiras from '../Assets/Images/JARDIM02_V2_FINAL.webp';
import imgSalaoJogos from '../Assets/Images/SJOGOS_FINAL_V2.webp';
import imgJardim from '../Assets/Images/JARDIM01_V2_FINAL.webp';
import imgMasterplan from '../Assets/Images/TOP_V2_FINAL.webp';
import imgHall from '../Assets/Images/HALL_V2_FINAL.webp';
import imgFachada from '../Assets/Images/FACHADA_V1_FINAL.webp';
import imgJacuzzi from '../Assets/Images/JACUZZI_V1_FINAL.webp';
import imgCozinha from '../Assets/Images/COZINHA_V1_FINAL.webp';
import imgSala from '../Assets/Images/SALA_V1_FINAL.webp';
import imgParque from '../Assets/Images/PARQUE_V1_FINAL.webp';
import imgVaranda from '../Assets/Images/VARANDA_V1_FINAL.webp';
import imgWcSuite from '../Assets/Images/WC_SUITE_V1_FINAL.webp';
import imgGaragem from '../Assets/Images/GARAGE_V2_FINAL.webp';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { IntroSection } from './components/IntroSection';
import { GallerySection } from './components/GallerySection';
import { VirtualTourSection } from './components/VirtualTourSection';
import { RevealSection } from './components/RevealSection';
import { DevelopmentSection } from './components/DevelopmentSection';
import { MasterplanSection } from './components/MasterplanSection';
import { PromotoraSection } from './components/PromotoraSection';
import { ContactsSection } from './components/ContactsSection';
import { Footer } from './components/Footer';
import { StickyCTA } from './components/StickyCTA';

export default function App() {
  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const galleryImages = [
    imgFachada,
    imgJardim,
    imgEspreguicadeiras,
    imgPiscina,
    imgSalaoJogos,
    imgHall,
    imgGaragem,
    imgJacuzzi,
    imgCozinha,
    imgSala,
    imgParque,
    imgVaranda,
    imgWcSuite,
  ];

  return (
    <LanguageProvider>
    <div className="w-full">
      <Navigation />

      <HeroSection />

      <IntroSection aerialImage={imgJardim} />

      <GallerySection images={galleryImages} />

      <RevealSection />

      <VirtualTourSection />

      <DevelopmentSection />

      <MasterplanSection planImage={imgMasterplan} />

      <PromotoraSection interiorImage={imgSalaoJogos} />
      
      <ContactsSection />
      
      <Footer />
      
      <StickyCTA />
    </div>
    </LanguageProvider>
  );
}
