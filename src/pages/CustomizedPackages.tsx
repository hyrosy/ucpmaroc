import React from 'react';
import CustomPackageSection from "../components/CustomPackageSection"
import Navbar from '../components/Navbar';

const CustomizedPackages: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="portfolio-page">
        <CustomPackageSection />
      </main>
      

    </>
  );
};

export default CustomizedPackages;