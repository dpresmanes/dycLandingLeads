import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ROICalculator from './components/ROICalculator';
import Process from './components/Process';
import About from './components/About';
import LeadMagnet from './components/LeadMagnet';
import IndustrySpecific from './components/IndustrySpecific';
import SuccessStories from './components/SuccessStories';
import Guarantee from './components/Guarantee';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LeadCaptureModal from './components/LeadCaptureModal';
import DemandIndicators from './components/DemandIndicators';
import SEOHead from './components/SEOHead';
import { LeadCaptureProvider } from './contexts/LeadCaptureContext';
import FloatingWhatsApp from './components/FloatingWhatsApp'
import MobileBottomNavigation from './components/MobileBottomNavigation'

function App() {
  return (
    <LeadCaptureProvider>
      <SEOHead />
      <div className="min-h-screen bg-black text-white overflow-x-hidden pb-20 md:pb-0 safe-bottom">
        <header>
          <Navbar />
        </header>
        
        <main>
          <Hero />
          <Services />
          <Process />
          <ROICalculator />
          <IndustrySpecific />
          <LeadMagnet />
          <About />
          <SuccessStories />
          <Guarantee />
          <Contact />
        </main>
        
        <Footer />
        
        {/* Lead Capture Modal */}
        <LeadCaptureModal />
        <DemandIndicators />

        {/* Mobile components */}
        <FloatingWhatsApp />
        <MobileBottomNavigation />
      </div>
    </LeadCaptureProvider>
  );
}

export default App;