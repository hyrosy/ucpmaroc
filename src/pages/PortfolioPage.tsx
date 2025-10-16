import React from 'react';
import './PortfolioPage.css';
import PlatformGallerySection from '../components/PlatformGallerySection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PortfolioPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="portfolio-page">
        <PlatformGallerySection />
      </main>
      
    </>
  );
};

export default PortfolioPage;