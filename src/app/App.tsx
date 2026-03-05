import { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { IntroSection } from './components/IntroSection';
import { GallerySection } from './components/GallerySection';
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
    exterior: [
      'https://images.unsplash.com/photo-1673977597041-7e6512719d16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXNpZGVudGlhbCUyMGJ1aWxkaW5nJTIwZXh0ZXJpb3IlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcyNTg1NzgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    interior: [
      'https://images.unsplash.com/photo-1638454795595-0a0abf68614d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb20lMjBtb2Rlcm58ZW58MXx8fHwxNzcyNTk5MTc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    amenities: [
      'https://images.unsplash.com/photo-1770967307107-446055488c0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhbWVuaXRpZXMlMjBzd2ltbWluZyUyMHBvb2wlMjByZXNvcnR8ZW58MXx8fHwxNzcyNjQ2NjA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    views: [
      'https://images.unsplash.com/photo-1562859422-29f5c0f4b24d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjBjaXR5JTIwdmlldyUyMGx1YW5kYSUyMHVyYmFuJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzcyNjQ2NjEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
  };

  return (
    <div className="w-full overflow-x-hidden">
      <Navigation />
      
      <HeroSection 
        backgroundImage="https://images.unsplash.com/photo-1565539267708-da4156380dc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjByZXNpZGVudGlhbCUyMGFuZ29sYSUyMGFmcmljYSUyMGFlcmlhbHxlbnwxfHx8fDE3NzI2NDY2MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      />
      
      <IntroSection 
        aerialImage="https://images.unsplash.com/photo-1562859422-29f5c0f4b24d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjBjaXR5JTIwdmlldyUyMGx1YW5kYSUyMHVyYmFuJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzcyNjQ2NjEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      />
      
      <GallerySection images={galleryImages} />
      
      <DevelopmentSection 
        mainImage="https://images.unsplash.com/photo-1565539267708-da4156380dc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjByZXNpZGVudGlhbCUyMGFuZ29sYSUyMGFmcmljYSUyMGFlcmlhbHxlbnwxfHx8fDE3NzI2NDY2MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        image1="https://images.unsplash.com/photo-1639405069836-f82aa6dcb900?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwaW50ZXJpb3IlMjBsdXh1cnklMjBkZXNpZ258ZW58MXx8fHwxNzcyNjQ2NjA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        image2="https://images.unsplash.com/photo-1640109414028-4c7f29f39ad4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwaW50ZXJpb3IlMjBtb2Rlcm4lMjBjb250ZW1wb3Jhcnl8ZW58MXx8fHwxNzcyNjQ2NjEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      />
      
      <MasterplanSection 
        planImage="https://images.unsplash.com/photo-1721244654392-9c912a6eb236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwbWFzdGVycGxhbiUyMGJsdWVwcmludCUyMG1vZGVybnxlbnwxfHx8fDE3NzI2NDY2MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      />
      
      <PromotoraSection 
        interiorImage="https://images.unsplash.com/photo-1638454795595-0a0abf68614d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb20lMjBtb2Rlcm58ZW58MXx8fHwxNzcyNTk5MTc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      />
      
      <ContactsSection />
      
      <Footer />
      
      <StickyCTA />
    </div>
  );
}
