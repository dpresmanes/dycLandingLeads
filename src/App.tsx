import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import About from './components/About';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import LeadCaptureModal from './components/LeadCaptureModal';
import SEOHead from './components/SEOHead';
import { LeadCaptureProvider } from './contexts/LeadCaptureContext';

function App() {
  return (
    <LeadCaptureProvider>
      <SEOHead />
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <header>
          <Navbar />
        </header>
        
        <main>
          <Hero />
          <Services />
          <Process />
          <About />
          <Testimonials />
          <Contact />
        </main>
        
        <Footer />
        
        {/* Lead Capture Modal */}
        <LeadCaptureModal />
      </div>
    </LeadCaptureProvider>
  );
}

export default App;