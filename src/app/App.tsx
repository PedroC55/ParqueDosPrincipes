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
import imgBar from '../Assets/Images/BAR_V2_FINAL.webp';
import imgGym from '../Assets/Images/GYM_V2_FINAL.webp';
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

  const galleryExterior = [imgFachada, imgJardim, imgEspreguicadeiras, imgParque];
  const galleryInterior = [imgHall, imgCozinha, imgSala, imgVaranda, imgWcSuite];
  const galleryAmenities = [imgPiscina, imgBar, imgGym, imgSalaoJogos, imgJacuzzi, imgGaragem];

  return (
    <LanguageProvider>
    <div className="w-full">
      <Navigation />

      <HeroSection />

      <IntroSection aerialImage={imgJardim} />

      <GallerySection exterior={galleryExterior} interior={galleryInterior} amenities={galleryAmenities} />

      <RevealSection />

      <VirtualTourSection />

      <DevelopmentSection />

      <MasterplanSection planImage={imgMasterplan} />

      <PromotoraSection />
      
      <ContactsSection />
      
      <Footer />
      
      <StickyCTA />
    </div>
    </LanguageProvider>
  );
}
