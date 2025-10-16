import React from 'react';

interface Partner {
  name: string;
  logoUrl: string;
  altText: string;
}

// Replace with your actual partner data
const partnersData: Partner[] = [
  { name: 'Partner 1', logoUrl: 'https://ucpagencybucket.s3.us-east-1.amazonaws.com/logos/Untitled+design+(1)/1.png', altText: 'Logo of Partner 1' },
  { name: 'Partner 2', logoUrl: 'https://ucpagencybucket.s3.us-east-1.amazonaws.com/logos/Untitled+design+(1)/2.png', altText: 'Logo of Partner 2' },
  { name: 'Partner 3', logoUrl: 'https://ucpagencybucket.s3.us-east-1.amazonaws.com/logos/Untitled+design+(1)/3.png', altText: 'Logo of Partner 3' },
  { name: 'Partner 4', logoUrl: 'https://ucpagencybucket.s3.us-east-1.amazonaws.com/logos/Untitled+design+(1)/4.png', altText: 'Logo of Partner 4' },
  { name: 'Partner 5', logoUrl: 'https://ucpagencybucket.s3.us-east-1.amazonaws.com/logos/Untitled+design+(1)/5.png', altText: 'Logo of Partner 5' },
];

const PartnersSection: React.FC = () => {
  // Duplicate the partners data to create seamless looping
  const duplicatedPartners = [...partnersData, ...partnersData];

  return (
    <section id="partners" className="py-16 bg-gray-900 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Trusted by Companies Like Yours
        </h2>
        
        <div className="relative">
          {/* Gradient overlays for smooth fade effect */}
          
          
          {/* Carousel container */}
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll">
              {duplicatedPartners.map((partner, index) => (
                <div 
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center h-20 w-32"
                >
                  <img 
                    src={partner.logoUrl} 
                    alt={partner.altText} 
                    className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                    loading="lazy" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style >{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;