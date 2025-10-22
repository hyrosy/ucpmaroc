import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Check, Zap, Target, Globe, Mail, TrendingUp, FileText, Search, Users, LucideIcon } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface CustomPackageProps {
  onClose: () => void;
}

interface PackageOptions {
  posts: number;
  pages: number;
  followers: number;
  leads: number;
  funnels: number;
  blogArticles: number;
  seoLevel: 'basic' | 'standard' | 'premium';
  emailCampaigns: number;
}

const CustomPackage: React.FC<CustomPackageProps> = ({ onClose }) => {
  const [options, setOptions] = useState<PackageOptions>({
    posts: 10,
    pages: 5,
    followers: 5000,
    leads: 500,
    funnels: 1,
    blogArticles: 2,
    seoLevel: 'standard',
    emailCampaigns: 1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOptionChange = (option: keyof PackageOptions, value: number | string) => {
    setOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  const calculatePrice = () => {
    let basePrice = 50;
    basePrice += options.posts * 20;
    basePrice += options.pages * 100;
    basePrice += options.followers * 0.01;
    basePrice += options.leads * 5;
    basePrice += options.funnels * 200;
    basePrice += options.blogArticles * 25;
    
    switch (options.seoLevel) {
      case 'basic': basePrice += 50; break;
      case 'standard': basePrice += 150; break;
      case 'premium': basePrice += 300; break;
    }
    basePrice += options.emailCampaigns * 120;
    return basePrice;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    try {
      const packageDetailsText = `
        Posts: ${options.posts},
        Pages: ${options.pages},
        Followers: ${options.followers},
        Leads: ${options.leads},
        Funnels: ${options.funnels},
        Blog Articles: ${options.blogArticles},
        SEO Level: ${options.seoLevel},
        Email Campaigns: ${options.emailCampaigns},
        Total Price: $${calculatePrice()}
      `;

      const emailPayload = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        package_details: packageDetailsText
      };

      // Replace with your real keys
      await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailPayload, 'YOUR_PUBLIC_KEY');

      const webhookPayload = { ...formData, options, totalPrice: calculatePrice() };

      await fetch('https://hook.eu2.make.com/3f9ecbacek47ij7udinxwfdt3qcpn99r', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookPayload),
      });

      alert('Request submitted successfully!');
      onClose(); // Close modal on success
    } catch (error) {
      console.error('Failed to send email or webhook:', error);
      alert('Failed to submit request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepConfig = [
    { title: 'Core Services', icon: Zap, description: 'Essential marketing services' },
    { title: 'Growth & Content', icon: TrendingUp, description: 'Audience and content strategy' },
    { title: 'Advanced Options', icon: Target, description: 'SEO and email marketing' },
    { title: 'Your Details', icon: Users, description: 'Contact information' },
    { title: 'Review', icon: Check, description: 'Confirm your package' }
  ];

  // --- Helper component for slider cards ---
  const SliderCard: React.FC<{
    icon: LucideIcon;
    iconColor: string;
    title: string;
    description: string;
    value: number;
    unit: string;
    min: number;
    max: number;
    step: number;
    optionKey: keyof PackageOptions;
    minLabel: string;
    maxLabel: string;
  }> = ({ icon: Icon, iconColor, title, description, value, unit, min, max, step, optionKey, minLabel, maxLabel }) => (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 ${iconColor} rounded-lg flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-white">{title}</h4>
            <p className="text-sm text-slate-400">{description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-400">{value}</div>
          <div className="text-sm text-slate-400">{unit}</div>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => handleOptionChange(optionKey, parseInt(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
      />
      <div className="flex justify-between text-xs text-slate-500 mt-2">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Core Services</h3>
              <p className="text-slate-400">Choose your essential marketing services</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <SliderCard icon={FileText} iconColor="bg-blue-500/30" title="Social Media Posts" description="Professional content creation" value={options.posts} unit="posts/mo" min={0} max={30} step={1} optionKey="posts" minLabel="0" maxLabel="30 posts" />
              <SliderCard icon={Globe} iconColor="bg-green-500/30" title="Website Pages" description="Custom web development" value={options.pages} unit="pages" min={0} max={15} step={1} optionKey="pages" minLabel="0" maxLabel="15 pages" />
              <SliderCard icon={Target} iconColor="bg-purple-500/30" title="Sales Funnels" description="Conversion optimization" value={options.funnels} unit="funnels" min={0} max={10} step={1} optionKey="funnels" minLabel="0" maxLabel="10 funnels" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Growth & Content</h3>
              <p className="text-slate-400">Define your growth targets and content strategy</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SliderCard icon={Users} iconColor="bg-pink-500/30" title="Follower Growth" description="Monthly target" value={options.followers} unit="followers" min={0} max={100000} step={1000} optionKey="followers" minLabel="0" maxLabel="100,000" />
              <SliderCard icon={Target} iconColor="bg-orange-500/30" title="Lead Generation" description="Monthly target" value={options.leads} unit="leads/mo" min={0} max={2000} step={100} optionKey="leads" minLabel="0" maxLabel="2,000" />
            </div>
            <SliderCard icon={FileText} iconColor="bg-indigo-500/30" title="Blog Articles" description="SEO-optimized content" value={options.blogArticles} unit="articles/mo" min={0} max={10} step={1} optionKey="blogArticles" minLabel="0" maxLabel="10 articles" />
          </div>
        );
      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Advanced Options</h3>
              <p className="text-slate-400">Enhance your package with premium features</p>
            </div>
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center">
                    <Search className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">SEO Optimization Level</h4>
                    <p className="text-sm text-slate-400">Search engine optimization</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {(['basic', 'standard', 'premium'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => handleOptionChange('seoLevel', level)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        options.seoLevel === level
                          ? 'border-purple-500 bg-purple-900/50 text-purple-300'
                          : 'border-slate-700 hover:border-slate-600 text-slate-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-semibold capitalize">{level}</div>
                        <div className="text-xs mt-1">
                          {level === 'basic' && '+$50'}
                          {level === 'standard' && '+$150'}
                          {level === 'premium' && '+$300'}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <SliderCard icon={Mail} iconColor="bg-red-500/30" title="Email Marketing" description="Automated campaigns" value={options.emailCampaigns} unit="campaigns/mo" min={0} max={5} step={1} optionKey="emailCampaigns" minLabel="0" maxLabel="5 campaigns" />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Your Details</h3>
              <p className="text-slate-400">Tell us about yourself and your business</p>
            </div>
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="John Doe" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="john@company.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
                  <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="Your Company Inc." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="+1 (555) 123-4567" />
                </div>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Review Your Package</h3>
              <p className="text-slate-400">Confirm your selections before submitting</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-white text-lg">Selected Services</h4>
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-3">
                  <div className="flex justify-between items-center"><span className="text-slate-400">Social Media Posts</span><span className="font-semibold text-white">{options.posts}/month</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-400">Website Pages</span><span className="font-semibold text-white">{options.pages} pages</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-400">Sales Funnels</span><span className="font-semibold text-white">{options.funnels} funnels</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-400">Follower Growth</span><span className="font-semibold text-white">{options.followers.toLocaleString()}/month</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-400">Lead Generation</span><span className="font-semibold text-white">{options.leads}/month</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-400">Blog Articles</span><span className="font-semibold text-white">{options.blogArticles}/month</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-400">SEO Level</span><span className="font-semibold text-white capitalize">{options.seoLevel}</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-400">Email Campaigns</span><span className="font-semibold text-white">{options.emailCampaigns}/month</span></div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-white text-lg">Contact Information</h4>
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-3">
                  <div className="flex justify-between items-center"><span className="text-slate-400">Name</span><span className="font-semibold text-white">{formData.name || '...'}</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-400">Email</span><span className="font-semibold text-white">{formData.email || '...'}</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-400">Company</span><span className="font-semibold text-white">{formData.company || 'N/A'}</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-400">Phone</span><span className="font-semibold text-white">{formData.phone || 'N/A'}</span></div>
                </div>
                <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl border border-purple-500/30 p-6">
                  <div className="text-center">
                    <div className="text-sm text-slate-300 mb-2">Estimated Monthly Investment</div>
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                      ${calculatePrice().toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-500 mt-2">*Final pricing may vary based on consultation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-slate-700">
        {/* Header */}
        <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-white">Build Your Custom Package</h2>
            <p className="text-sm text-slate-400">Tailored marketing solutions for your business</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-slate-800 px-6 py-4 border-b border-slate-700">
          <div className="flex items-center justify-between mb-2">
            {stepConfig.map((step, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === currentStep;
              const isCompleted = stepNumber < currentStep;
              const StepIcon = step.icon;

              return (
                <React.Fragment key={stepNumber}>
                  <div className="flex flex-col items-center text-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                      ${isActive ? 'bg-purple-600 text-white shadow-lg scale-110' : 
                        isCompleted ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-400'}
                    `}>
                      {isCompleted ? <Check className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
                    </div>
                    <div className={`text-xs mt-2 w-20 ${isActive ? 'text-white' : 'text-slate-400'}`}>{step.title}</div>
                  </div>
                  {index < stepConfig.length - 1 && (
                    <div className={`
                      flex-grow h-1 mx-2 rounded-full transition-all duration-300
                      ${isCompleted ? 'bg-green-500' : 'bg-slate-700'}
                    `} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-8 overflow-y-auto bg-slate-900 flex-grow">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="bg-slate-800 border-t border-slate-700 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="text-sm text-slate-500">
            Step {currentStep} of {totalSteps}
          </div>
          <div className="flex items-center space-x-3">
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className="px-4 py-2 border border-slate-600 rounded-full text-slate-300 hover:bg-slate-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            )}
            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:opacity-90 transition-all duration-200 flex items-center space-x-2 shadow-lg"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFormSubmit}
                disabled={isSubmitting || !formData.name || !formData.email}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 shadow-lg font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Submit Request</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <style >{`
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(168, 85, 247, 0.4);
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(168, 85, 247, 0.6);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(168, 85, 247, 0.4);
          transition: all 0.2s ease;
        }
        
        .slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(168, 85, 247, 0.6);
        }
        
        .slider::-webkit-slider-track {
          height: 8px;
          border-radius: 4px;
          background: #334155;
          border: none;
        }
        
        .slider::-moz-range-track {
          height: 8px;
          border-radius: 4px;
          background: #334155;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default CustomPackage;
