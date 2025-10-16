import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // EmailJS is now initialized in App.tsx

    try {
      // Send data to webhook
      await fetch('https://hook.eu2.make.com/c0sbrkgd73lhrmn617ph2x55aoal1x4j', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Send the email using EmailJS
      await emailjs.send('service_c4oa2w9', 'template_x3rdua6', {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error('Failed to send email or webhook:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden py-10">
      {/* Animated Background */}
      

      {/* Main Form Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Glassmorphism Form */}
        <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Get in Touch</h2>
            <p className="text-white/80">We'd love to hear from you</p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="group">
              <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="group">
              <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Subject Field */}
            <div className="group">
              <label htmlFor="subject" className="block text-sm font-medium text-white/90 mb-2">
                Subject
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300"
                  placeholder="What's this about?"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="group">
              <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">
                Message
              </label>
              <div className="relative">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative overflow-hidden group bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="relative z-10">
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </button>
            </div>
          </form>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mt-6 p-4 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-xl">
              <p className="text-center text-green-200 font-medium">
                ✨ Message sent successfully! We'll get back to you soon.
              </p>
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="mt-6 p-4 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl">
              <p className="text-center text-red-200 font-medium">
                ❌ Failed to send message. Please try again later.
              </p>
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-400 rounded-full mix-blend-multiply filter blur-sm opacity-70"></div>
        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-pink-400 rounded-full mix-blend-multiply filter blur-sm opacity-70"></div>
      </div>
    </div>
  );
};

export default ContactForm;