import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser'; // Import EmailJS
import { ArrowLeft, ChevronRight, Shield } from 'lucide-react';

const OptInPage: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    message: '',
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false); // For loading state
  
  const getPlanName = () => {
    switch (planId) {
      case 'service-provider':
        return 'Service Provider Package';
      case 'commerce':
        return 'Commerce Package';
      case 'digital-goods':
        return 'Digital Products Package';
      default:
        return 'Custom Package';
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      const selectedPlan = getPlanName();
      const templateParams = {
        ...formData,
        selectedPlan, // Add the selected plan name to the template params
        // Ensure your EmailJS template has variables like:
        // {{firstName}}, {{lastName}}, {{email}}, {{phone}}, {{company}}, {{website}}, {{message}}, {{selectedPlan}}
      };

      try {
        await emailjs.send(
          'service_c4oa2w9', // Your Service ID
          'template_x3rdua6', // New Template ID for predefined plans
          templateParams,
          'LOZrhOD88Fa4aQQlz' // Your Public Key
        );
        console.log('EmailJS success (Opt-In):', templateParams);
        navigate('/thank-you');
      } catch (error) {
        console.error('EmailJS failed (Opt-In):', error);
        alert('Failed to submit your request. Please try again.'); // Or use a more sophisticated notification
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <>
      <section className="opt-in-section">
        <div className="container">
          <button className="back-button" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
          
          <div className="opt-in-container">
            <div className="opt-in-form-container">
              <h1 className="opt-in-title">Complete Your Information</h1>
              <p className="opt-in-description">
                You've selected the <strong>{getPlanName()}</strong>. Please fill out the form below to get started with your AI-powered marketing journey.
              </p>
              
              <form className="opt-in-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName" className="form-label">First Name*</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`form-control ${formErrors.firstName ? 'has-error' : ''}`}
                      placeholder="John"
                    />
                    {formErrors.firstName && <span className="error-message">{formErrors.firstName}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="lastName" className="form-label">Last Name*</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`form-control ${formErrors.lastName ? 'has-error' : ''}`}
                      placeholder="Doe"
                    />
                    {formErrors.lastName && <span className="error-message">{formErrors.lastName}</span>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address*</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-control ${formErrors.email ? 'has-error' : ''}`}
                      placeholder="john@example.com"
                    />
                    {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone Number*</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`form-control ${formErrors.phone ? 'has-error' : ''}`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="company" className="form-label">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Your Company Inc."
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="website" className="form-label">Website URL</label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Additional Information</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Tell us more about your business and goals..."
                    rows={4}
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary btn-lg submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Information'}
                  {!isSubmitting && <ChevronRight size={18} />}
                </button>
                
                <p className="privacy-note">
                  <Shield size={14} />
                  Your information is secure and will never be shared with third parties.
                </p>
              </form>
            </div>
            
            <div className="opt-in-info">
              <div className="package-summary">
                <h2 className="package-title">{getPlanName()}</h2>
                <p className="package-description">
                  You're one step away from transforming your digital presence and achieving 900%+ ROI with our AI-powered marketing solutions.
                </p>
                
                <div className="package-features">
                  <h3>What's Included:</h3>
                  <ul>
                    {planId === 'service-provider' && (
                      <>
                        <li>Custom landing page design</li>
                        <li>Social media setup & optimization</li>
                        <li>Google My Business setup</li>
                        <li>Lead generation form</li>
                        <li>Monthly content calendar</li>
                        <li>5 social media posts per week</li>
                        <li>Basic SEO optimization</li>
                        <li>Monthly performance reports</li>
                      </>
                    )}
                    
                    {planId === 'commerce' && (
                      <>
                        <li>Everything in Service Provider package</li>
                        <li>E-commerce website integration</li>
                        <li>Product photography guidelines</li>
                        <li>Facebook & Instagram shopping setup</li>
                        <li>3 ad campaigns per month</li>
                        <li>Email marketing automation</li>
                        <li>Customer loyalty program</li>
                        <li>Advanced analytics dashboard</li>
                      </>
                    )}
                    
                    {planId === 'digital-goods' && (
                      <>
                        <li>Everything in Commerce package</li>
                        <li>Online course or membership setup</li>
                        <li>Digital product delivery system</li>
                        <li>Automated sales funnel creation</li>
                        <li>Email sequence automation</li>
                        <li>Upsell & cross-sell strategies</li>
                        <li>Affiliate program setup</li>
                        <li>Conversion rate optimization</li>
                      </>
                    )}
                    
                    {!['service-provider', 'commerce', 'digital-goods'].includes(planId || '') && (
                      <>
                        <li>Custom marketing strategy</li>
                        <li>Tailored social media campaigns</li>
                        <li>Personalized web development</li>
                        <li>AI-powered optimization</li>
                        <li>Dedicated account manager</li>
                        <li>Performance tracking dashboard</li>
                        <li>Regular strategy consultations</li>
                        <li>ROI-focused reporting</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OptInPage;