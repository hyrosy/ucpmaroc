import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Calendar, Clock } from 'lucide-react';

const ThankYouPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="thank-you-section">
        <div className="container">
          <div className="thank-you-card">
            <div className="thank-you-icon">
              <CheckCircle size={64} />
            </div>
            
            <h1 className="thank-you-title">Thank You for Your Submission!</h1>
            
            <p className="thank-you-message">
              We've received your information and we're excited to help transform your digital presence. Our team will contact you as soon as possible to discuss the next steps.
            </p>
            
            <div className="next-steps">
              <h2>What Happens Next?</h2>
              
              <div className="steps-grid">
                <div className="step-card">
                  <div className="step-number">1</div>
                  <h3>Initial Contact</h3>
                  <p>One of our digital marketing specialists will reach out to you within 24 hours to confirm your submission.</p>
                </div>
                
                <div className="step-card">
                  <div className="step-number">2</div>
                  <h3>Strategy Session</h3>
                  <p>We'll schedule a strategy session to understand your business goals and refine your marketing approach.</p>
                </div>
                
                <div className="step-card">
                  <div className="step-number">3</div>
                  <h3>Implementation</h3>
                  <p>Our team will start implementing your AI-powered marketing campaign and provide regular updates.</p>
                </div>
                
                <div className="step-card">
                  <div className="step-number">4</div>
                  <h3>Results & Optimization</h3>
                  <p>You'll begin seeing results as we continuously optimize your campaigns for maximum ROI.</p>
                </div>
              </div>
            </div>
            
            <div className="contact-info">
              <h2>Have Questions?</h2>
              <p>Feel free to contact us directly:</p>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <span className="contact-label">Email:</span>
                  <a href="mailto:info@ucpmaroc.com">info@ucpmaroc.com</a>
                </div>
                
                <div className="contact-method">
                  <span className="contact-label">Phone:</span>
                  <a href="tel:+212123456789">+212 123 456 789</a>
                </div>
                
                <div className="contact-method">
                  <span className="contact-label">Business Hours:</span>
                  <div className="hours-container">
                    <div className="hours-item">
                      <Calendar size={16} />
                      <span>Monday - Friday</span>
                    </div>
                    <div className="hours-item">
                      <Clock size={16} />
                      <span>9:00 AM - 6:00 PM GMT</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Link to="/" className="btn btn-primary return-home">
              <ArrowLeft size={18} />
              Return to Homepage
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ThankYouPage;