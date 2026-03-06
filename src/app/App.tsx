import { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import imgPiscina from '../Assets/Images/piscina.jpg';
import imgEspreguicadeiras from '../Assets/Images/espreguicadeiras.jpg';
import imgGinasio from '../Assets/Images/ginasio.jpg';
import imgBar from '../Assets/Images/bar.jpg';
import imgSalaoJogos from '../Assets/Images/salao_de_jogos.jpg';
import imgJardim from '../Assets/Images/jardim.jpg';
import imgMasterplan from '../Assets/Images/masterplan_x4.png';
import imgHall from '../Assets/Images/hall.jpg';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { IntroSection } from './components/IntroSection';
import { GallerySection } from './components/GallerySection';
import { VirtualTourSection } from './components/VirtualTourSection';
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

      <HeroSection backgroundImage={imgEspreguicadeiras} />

      <IntroSection aerialImage={imgJardim} />

      <GallerySection images={galleryImages} />

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
