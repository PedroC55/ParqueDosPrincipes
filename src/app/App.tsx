import { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import imgPiscina from '../Assets/Images/POOL_V1_FINAL.png';
import imgEspreguicadeiras from '../Assets/Images/JARDIM02_V1_FINAL.png';
import imgGinasio from '../Assets/Images/GYM_V1_FINAL.png';
import imgBar from '../Assets/Images/BAR_V1_FINAL.png';
import imgSalaoJogos from '../Assets/Images/SJOGOS_FINAL.png';
import imgJardim from '../Assets/Images/JARDIM01_V1_FINAL.png';
import imgMasterplan from '../Assets/Images/TOP_V1_FINAL.png';
import imgHall from '../Assets/Images/hall.jpg';
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

  // Gallery images organized by category
  const galleryImages = {
    exterior: [imgJardim],
    interior: [imgHall],
    amenities: [imgPiscina],
    views: [imgEspreguicadeiras],
  };

  return (
    <LanguageProvider>
    <div className="w-full" style={{ overflowX: 'clip' }}>
      <Navigation />

      <HeroSection />

      <IntroSection aerialImage={imgJardim} />

      <GallerySection images={galleryImages} />

      <RevealSection />

      <VirtualTourSection />

      <DevelopmentSection
        image1={imgGinasio}
        image2={imgBar}
      />

      <MasterplanSection planImage={imgMasterplan} />

      <PromotoraSection interiorImage={imgSalaoJogos} />
      
      <ContactsSection />
      
      <Footer />
      
      <StickyCTA />
    </div>
    </LanguageProvider>
  );
}
