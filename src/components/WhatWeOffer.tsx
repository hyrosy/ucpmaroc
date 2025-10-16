import React from 'react';
import './WhatWeOffer.css';

interface ServiceItem {
  icon: string; // Placeholder for icon, maybe a path or class name
  title: string;
  link: string;
}

const services: ServiceItem[] = [
  { icon: 'icon-digital-product.svg', title: 'DIGITAL PRODUCT', link: '#' },
  { icon: 'icon-web-developments.svg', title: 'WEB DEVELOPMENTS', link: '#' },
  { icon: 'icon-branding-design.svg', title: 'BRANDING DESIGN', link: '#' },
  { icon: 'icon-ui-ux-design.svg', title: 'UI-UX DESIGN', link: '#' },
];

const WhatWeOffer: React.FC = () => {
  return (
    <section className="what-we-offer-section">
      <div className="container mx-auto px-4 py-16">
        <div className="section-header mb-12 text-center md:text-left">
          <p className="pre-title text-teal-500 uppercase tracking-wider font-semibold text-sm mb-2">OUR SPECIALIZE</p>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h2 className="main-title text-4xl md:text-5xl font-bold text-gray-800 mb-4 md:mb-0">
              WHAT WE HAVE <span className="font-light">TO OFFER</span>
            </h2>
            <a href="/services" className="view-all-services text-gray-600 hover:text-teal-500 flex items-center">
              View all services
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="service-card bg-white p-8 border border-gray-200 rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
              <div className="icon-placeholder mb-6 mx-auto w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                {/* Placeholder for actual icon. Using text for now. */}
                ICON
              </div>
              <h3 className="service-title text-xl font-semibold text-gray-700 mb-4">{service.title}</h3>
              <a href="/services" className="read-more text-teal-500 hover:text-teal-600 font-medium flex items-center justify-center">
                READ MORE
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;