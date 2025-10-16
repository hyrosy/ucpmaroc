import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import './Testimonials.css';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  companyLogo?: string;
  image: string;
  quote: string;
  rating: number;
}

const Testimonials: React.FC = () => {
  const testimonialsData: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'CEO',
      company: 'StyleHub Boutique',
      companyLogo: 'https://via.placeholder.com/100x40?text=StyleHub',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      quote: 'UCPMAROC transformed our online presence completely. Their AI-powered marketing campaigns increased our sales by 780% in just three months. The ROI has been incredible!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Founder',
      company: 'TechSolve',
      companyLogo: 'https://via.placeholder.com/100x40?text=TechSolve',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      quote: 'As a service provider, I was struggling to find quality leads. UCPMAROC created a stunning landing page and optimized our Google ads, resulting in a 950% ROI within the first quarter.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Amina Khalid',
      position: 'Marketing Director',
      company: 'EcoLife Products',
      companyLogo: 'https://via.placeholder.com/100x40?text=EcoLife',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      quote: 'The automated marketing funnels UCPMAROC built for our digital products have been generating revenue 24/7. Weve seen over 1000% ROI and can finally scale our business with confidence.',
      rating: 5,
    },
    {
      id: 4,
      name: 'David Miller',
      position: 'Owner',
      company: 'Foodie Adventures',
      companyLogo: 'https://via.placeholder.com/100x40?text=Foodie',
      image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      quote: 'Their team is not only professional but also incredibly creative. The new branding and website have elevated our restaurant\'s image significantly.',
      rating: 4,
    },
    {
      id: 5,
      name: 'Jessica Lee',
      position: 'Manager',
      company: 'Innovate Solutions',
      companyLogo: 'https://via.placeholder.com/100x40?text=Innovate',
      image: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      quote: 'Working with UCPMAROC has been a game-changer. Their strategic insights and execution are top-notch. Highly recommended for any business looking to grow.',
      rating: 5,
    },
    {
      id: 6,
      name: 'Kevin Wilson',
      position: 'CTO',
      company: 'NextGen Apps',
      companyLogo: 'https://via.placeholder.com/100x40?text=NextGen',
      image: 'https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      quote: 'The technical expertise and dedication of the UCPMAROC team are impressive. They delivered a complex project on time and exceeded our expectations.',
      rating: 5,
    },
  ];

  const cardsPerPage = 4; // Display 4 cards
  const [activeIndex, setActiveIndex] = useState(0);

  // totalPages is the maximum index activeIndex can reach.
  // If 6 items, 4 per page:
  // activeIndex = 0 (items 0,1,2,3)
  // activeIndex = 1 (items 1,2,3,4)
  // activeIndex = 2 (items 2,3,4,5) -> this is testimonialsData.length - cardsPerPage
  const totalPages = Math.max(0, testimonialsData.length - cardsPerPage);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, totalPages));
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };
  
  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Success Stories</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-description">
            Discover how our AI-powered marketing solutions have helped businesses achieve exceptional results and ROI.
          </p>
        </div>
        
        <div className="testimonials-slider">
          <button className="slider-arrow prev" onClick={prevTestimonial} disabled={activeIndex === 0}>
            <ChevronLeft size={24} />
          </button>
          
          <div className="testimonials-wrapper">
            <div className="testimonials-container" style={{ transform: `translateX(-${activeIndex * (100 / cardsPerPage)}%)` }}>
              {testimonialsData.map((testimonial) => (
                <div className="testimonial-card" key={testimonial.id}>
                  <div className="testimonial-content">
                    {testimonial.companyLogo && (
                      <img
                        src={testimonial.companyLogo}
                        alt={`${testimonial.company} logo`}
                        className="company-logo"
                        loading="lazy"
                      />
                    )}
                    <div className="testimonial-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          fill={i < testimonial.rating ? '#FFC107' : 'none'}
                          color={i < testimonial.rating ? '#FFC107' : '#D1D5DB'}
                        />
                      ))}
                    </div>
                    
                    <p className="testimonial-quote">"{testimonial.quote}"</p>
                    
                    <div className="testimonial-author">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="author-image"
                        loading="lazy"
                      />
                      <div className="author-info">
                        <h4 className="author-name">{testimonial.name}</h4>
                        <p className="author-title">
                          {testimonial.position}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div> 
          </div> 
          
          <button className="slider-arrow next" onClick={nextTestimonial} disabled={activeIndex >= totalPages}>
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="testimonial-dots">
          {Array.from({ length: totalPages + 1 }).map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`View testimonial set ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;