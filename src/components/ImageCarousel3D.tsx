import React from 'react';
import { Camera } from 'lucide-react';

// --- Data (Moved outside component for clarity) ---

const carouselImages = [
    // Column 1
    [
        'https://d2ah09ed4k10ng.cloudfront.net/mp/ABYYA/ABYYA+Pictures/0.jpg',
        'https://d2ah09ed4k10ng.cloudfront.net/mp/NAHAL+AND+INDIA+OUTFIT/izzypic/i1.jpg',
        'https://d2ah09ed4k10ng.cloudfront.net/mp/ABYYA/ABYYA+Pictures/00.jpg',
        'https://cdn.leonardo.ai/users/37ed2394-d567-4eb0-a6fa-57b1785581d1/generations/45d4409b-aa78-4edc-8580-ce861fdedbb2/Leonardo_Phoenix_10_Use_the_info_and_put_it_into_a_post_1.jpg',
        'https://d2ah09ed4k10ng.cloudfront.net/mp/ABYYA/ABYYA+Pictures/ABYYA.jpg',
    ],
    // Column 2
    [
        'https://d2ah09ed4k10ng.cloudfront.net/mp/HYROSY/ALBANE/IMG_7170.PNG',
        'https://cdn.leonardo.ai/users/8e41e425-a92a-401c-8615-1e3344807ff5/generations/28be6ca2-97fe-472e-8307-97e2a5b423d4/variations/alchemyrefiner_alchemymagic_3_28be6ca2-97fe-472e-8307-97e2a5b423d4_0.jpg',
        'https://d2ah09ed4k10ng.cloudfront.net/mp/HYROSY/ALBANE/IMG_6902.PNG',
        'https://d2ah09ed4k10ng.cloudfront.net/mp/HYROSY/ALBANE/IMG_6900.PNG',
        'https://cdn.leonardo.ai/users/501bed82-1832-44a9-b028-f14888df5891/generations/332b9e87-8484-43c4-8a80-327486a7c95b/AlbedoBase_XL_A_lion_wear_a_moroccan_caftan_in_jamaa_el_fana_1.jpg',
    ]
];

// --- Reusable Sub-component for a single scrolling column ---

const ImageColumn = ({ images, direction = 'down', duration = 30 }: { images: string[], direction: 'up' | 'down', duration: number }) => (
    <div className="relative h-[600px] overflow-hidden rounded-2xl">
        <div className={`flex flex-col ${direction === 'down' ? 'animate-scroll-down' : 'animate-scroll-up'}`} style={{ animationDuration: `${duration}s` }}>
            {[...images, ...images].map((url, index) => (
                <div key={index} className="w-full flex-shrink-0 p-2">
                    <img
                        src={url}
                        alt={`Carousel item ${index}`}
                        className="w-full h-auto object-cover rounded-xl"
                        loading="lazy"
                    />
                </div>
            ))}
        </div>
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900 pointer-events-none"></div>
    </div>
);


// --- Main Section Component ---

const ImageCarousel3D: React.FC = () => {
  return (
    <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <div className="inline-block bg-slate-800/50 rounded-full p-5 border border-slate-700 mb-6">
                    <Camera size={40} className="text-purple-400" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-white mb-4">
                    Visual Showcase
                </h2>
                <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                    A glimpse into the diverse and high-quality visual projects we've crafted for our clients across various industries.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                <ImageColumn images={carouselImages[0]} direction="down" duration={35} />
                <ImageColumn images={carouselImages[1]} direction="up" duration={40} />
            </div>
        </div>

        {/* Custom CSS animations are now neatly inside the component */}
        <style>
            {`
                @keyframes scrollUp {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                }
                @keyframes scrollDown {
                    0% { transform: translateY(-50%); }
                    100% { transform: translateY(0); }
                }
                .animate-scroll-up { animation: scrollUp linear infinite; }
                .animate-scroll-down { animation: scrollDown linear infinite; }
                .animate-scroll-up:hover, .animate-scroll-down:hover {
                    animation-play-state: paused;
                }
            `}
        </style>
    </section>
  );
};

export default ImageCarousel3D;
