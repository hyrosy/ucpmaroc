import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Navbar from './components/Navbar'; // Import Navbar
import Footer from './components/Footer'; // Import Footer
import HomePage from './pages/HomePage';
import OptInPage from './pages/OptInPage';
import ThankYouPage from './pages/ThankYouPage';
import PortfolioPage from './pages/PortfolioPage';
import PrivacyPolicyPage from './components/PrivacyPolicy.tsx';
import ContactUsPage from './pages/ContactUsPage'; // Import the Contact Us page
import TermsofService from './components/TermsofService.tsx';
import TermsandConditions from './components/TermsandConditions.tsx';
import './App.css';
import MembersPage from './pages/Members'; // Import MembersPage if needed
import CinematoGraphyPage from './pages/CenimatoGraphy.tsx';
import CustomizedPackages from './pages/CustomizedPackages.tsx';
import SoftwareServicesPage from './pages/SoftwareDev.tsx'
import VoiceOverLandingPage from './pages/VoiceOverLandingPage'
import MarketingServices from './pages/MarketingServices'

function App() {
  useEffect(() => {
    // Initialize EmailJS with your Public Key
    emailjs.init('LOZrhOD88Fa4aQQlz');
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/members" element={<MembersPage />} /> {/* Add route for Members Page */}
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage/>}/>
        <Route path="/cinema-portfolio" element={<CinematoGraphyPage />} />
        <Route path="/terms-of-service" element={<TermsofService/>}/>
        <Route path="/terms-of-conditions" element={<TermsandConditions/>}/>
        <Route path="/contact" element={<ContactUsPage />} /> {/* Add route for Contact Us */}
        <Route path="/opt-in/:planId" element={<OptInPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/customized-package" element={<CustomizedPackages />} />
        <Route path="/software-development" element={<SoftwareServicesPage />} />
        <Route path="/digital-marketing" element={<MarketingServices />} />
        <Route path="/voiceover" element={<VoiceOverLandingPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;