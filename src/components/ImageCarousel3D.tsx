import React from 'react';


const ImageCarousel3D: React.FC = () => {
  const carousel2ImageUrls = [
    'https://d2ah09ed4k10ng.cloudfront.net/mp/ABYYA/ABYYA+Pictures/0.jpg',
    'https://d2ah09ed4k10ng.cloudfront.net/mp/ABYYA/ABYYA+Pictures/00.jpg',
    'https://d2ah09ed4k10ng.cloudfront.net/mp/ABYYA/ABYYA+Pictures/ABYYA.jpg',
    'https://d2ah09ed4k10ng.cloudfront.net/mp/NAHAL+AND+INDIA+OUTFIT/izzypic/i1.jpg',
    'https://cdn.leonardo.ai/users/37ed2394-d567-4eb0-a6fa-57b1785581d1/generations/45d4409b-aa78-4edc-8580-ce861fdedbb2/Leonardo_Phoenix_10_Use_the_info_and_put_it_into_a_post_1.jpg',
  ];

  const carousel3ImageUrls = [
    'https://d2ah09ed4k10ng.cloudfront.net/mp/HYROSY/ALBANE/IMG_7170.PNG',
    'https://d2ah09ed4k10ng.cloudfront.net/mp/HYROSY/ALBANE/IMG_6902.PNG',
    'https://cdn.leonardo.ai/users/501bed82-1832-44a9-b028-f14888df5891/generations/332b9e87-8484-43c4-8a80-327486a7c95b/AlbedoBase_XL_A_lion_wear_a_moroccan_caftan_in_jamaa_el_fana_1.jpg',
    'https://cdn.leonardo.ai/users/8e41e425-a92a-401c-8615-1e3344807ff5/generations/28be6ca2-97fe-472e-8307-97e2a5b423d4/variations/alchemyrefiner_alchemymagic_3_28be6ca2-97fe-472e-8307-97e2a5b423d4_0.jpg',
    'https://d2ah09ed4k10ng.cloudfront.net/mp/HYROSY/ALBANE/IMG_6900.PNG',
  ];

  return (
    <section className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="bg-white container mx-auto px-2 sm:px-4 lg:px-6">
        {/* Desktop: 4 columns, Tablet: 2 columns, Mobile: 1 column */}
        <div className="bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
          
          {/* Carousel 1: Scrolls Down */}
          <div className="relative">
            <div className="bg-white carousel-container">
              <div className="bg-white carousel-track-down">
                {[...carousel2ImageUrls, ...carousel2ImageUrls].map((url, index) => (
                  <div key={`carousel1-${index}`} className="carousel-item">
                    <img
                      src={url}
                      alt={`Carousel 1 item ${index}`}
                      className="carousel-image bg-white"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Carousel 2: Scrolls Up */}
          <div className="relative">
            <div className="carousel-container">
              <div className="carousel-track-up">
                {[...carousel3ImageUrls, ...carousel3ImageUrls].map((url, index) => (
                  <div key={`carousel2-${index}`} className="carousel-item">
                    <img
                      src={url}
                      alt={`Carousel 2 item ${index}`}
                      className="carousel-image"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          

          
        </div>
      </div>
    
      <style>
        {`
          .carousel-container {
            height: 800px;
            border-radius: 8px;
            overflow: hidden;
            position: relative;
            background-color: white;
          }
          
          @media (min-width: 640px) {
            .carousel-container {
              height: 800px;
            }
          }
          
          @media (min-width: 1024px) {
            .carousel-container {
              height: 800px;
            }
          }
          
          .carousel-item {
            height: 800px;
            margin-bottom: 8px;
            border-radius: 6px;
            overflow: hidden;
          }
          
          @media (min-width: 640px) {
            .carousel-item {
              height: 850px;
              margin-bottom: 12px;
            }
          }
          
          @media (min-width: 1024px) {
            .carousel-item {
              height: 800px;
              margin-bottom: 16px;
            }
          }
          
          .carousel-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }
          
          .carousel-image:hover {
            transform: scale(1.05);
          }
          
          .carousel-track-up {
            display: flex;
            flex-direction: column;
            animation: scrollUp 30s linear infinite;
          }
          
          .carousel-track-down {
            display: flex;
            flex-direction: column;
            animation: scrollDown 35s linear infinite;
          }
          
          .carousel-track-up:hover,
          .carousel-track-down:hover {
            animation-play-state: paused;
          }
          
          @keyframes scrollUp {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-50%);
            }
          }
          
          @keyframes scrollDown {
            0% {
              transform: translateY(-50%);
            }
            100% {
              transform: translateY(0);
            }
          }
          
          /* Reduced motion for accessibility */
          @media (prefers-reduced-motion: reduce) {
            .carousel-track-up,
            .carousel-track-down {
              animation-duration: 60s;
            }
          }
          
          /* Performance optimizations */
          .carousel-track-up,
          .carousel-track-down {
            will-change: transform;
            backface-visibility: hidden;
            perspective: 1000px;
          }
        `}
      </style>
    </section>
  );
};

export default ImageCarousel3D;