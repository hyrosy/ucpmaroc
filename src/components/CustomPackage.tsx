import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Check, Zap, Target, Globe, Mail, TrendingUp, FileText, Search, Users } from 'lucide-react';
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
      case 'basic':
        basePrice += 50;
        break;
      case 'standard':
        basePrice += 150;
        break;
      case 'premium':
        basePrice += 300;
        break;
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

      // EmailJS is now initialized in App.tsx
      await emailjs.send('service_c4oa2w9', 'template_ry5iotp', emailPayload);

      const webhookPayload = {
        ...formData,
        options,
        totalPrice: calculatePrice(),
      };

      // Webhook
      await fetch('https://hook.eu2.make.com/3f9ecbacek47ij7udinxwfdt3qcpn99r', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload),
      });

      alert('Request submitted successfully!');
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Core Services</h3>
              <p className="text-gray-600">Choose your essential marketing services</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Social Media Posts</h4>
                      <p className="text-sm text-gray-500">Professional content creation</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{options.posts}</div>
                    <div className="text-sm text-gray-500">posts/month</div>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="300"
                  step="10"
                  value={options.posts}
                  onChange={(e) => handleOptionChange('posts', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>5 posts</span>
                  <span>30 posts</span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Website Pages</h4>
                      <p className="text-sm text-gray-500">Custom web development</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{options.pages}</div>
                    <div className="text-sm text-gray-500">pages</div>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="1"
                  value={options.pages}
                  onChange={(e) => handleOptionChange('pages', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>1 page</span>
                  <span>15 pages</span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Sales Funnels</h4>
                      <p className="text-sm text-gray-500">Conversion optimization</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">{options.funnels}</div>
                    <div className="text-sm text-gray-500">funnels</div>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={options.funnels}
                  onChange={(e) => handleOptionChange('funnels', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>1 funnel</span>
                  <span>5 funnels</span>
                </div>
              </div>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Growth & Content</h3>
              <p className="text-gray-600">Define your growth targets and content strategy</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Follower Growth</h4>
                    <p className="text-sm text-gray-500">Monthly target</p>
                  </div>
                </div>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-pink-600">{options.followers.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">new followers</div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="10000"
                  value={options.followers}
                  onChange={(e) => handleOptionChange('followers', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Lead Generation</h4>
                    <p className="text-sm text-gray-500">Monthly target</p>
                  </div>
                </div>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-orange-600">{options.leads}</div>
                  <div className="text-sm text-gray-500">leads/month</div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="100"
                  value={options.leads}
                  onChange={(e) => handleOptionChange('leads', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Blog Articles</h4>
                    <p className="text-sm text-gray-500">SEO-optimized content</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-600">{options.blogArticles}</div>
                  <div className="text-sm text-gray-500">articles/month</div>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={options.blogArticles}
                onChange={(e) => handleOptionChange('blogArticles', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Advanced Options</h3>
              <p className="text-gray-600">Enhance your package with premium features</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Search className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">SEO Optimization Level</h4>
                    <p className="text-sm text-gray-500">Search engine optimization</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {(['basic', 'standard', 'premium'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => handleOptionChange('seoLevel', level)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        options.seoLevel === level
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
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

              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email Marketing</h4>
                      <p className="text-sm text-gray-500">Automated campaigns</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-600">{options.emailCampaigns}</div>
                    <div className="text-sm text-gray-500">campaigns/month</div>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={options.emailCampaigns}
                  onChange={(e) => handleOptionChange('emailCampaigns', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Details</h3>
              <p className="text-gray-600">Tell us about yourself and your business</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="john@company.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your Company Inc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="+1 (555) 123-4567"
                  />
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
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Review Your Package</h3>
              <p className="text-gray-600">Confirm your selections before submitting</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 text-lg">Selected Services</h4>
                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Social Media Posts</span>
                    <span className="font-semibold">{options.posts}/month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Website Pages</span>
                    <span className="font-semibold">{options.pages} pages</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Sales Funnels</span>
                    <span className="font-semibold">{options.funnels} funnels</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Follower Growth</span>
                    <span className="font-semibold">{options.followers.toLocaleString()}/month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Lead Generation</span>
                    <span className="font-semibold">{options.leads}/month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Blog Articles</span>
                    <span className="font-semibold">{options.blogArticles}/month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">SEO Level</span>
                    <span className="font-semibold capitalize">{options.seoLevel}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Email Campaigns</span>
                    <span className="font-semibold">{options.emailCampaigns}/month</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 text-lg">Contact Information</h4>
                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Name</span>
                    <span className="font-semibold">{formData.name || 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Email</span>
                    <span className="font-semibold">{formData.email || 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Company</span>
                    <span className="font-semibold">{formData.company || 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Phone</span>
                    <span className="font-semibold">{formData.phone || 'Not provided'}</span>
                  </div>
                </div>

                {/*<div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-2">Estimated Monthly Investment</div>
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      ${calculatePrice().toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 mt-2">*Final pricing may vary based on consultation</div>
                  </div>
                </div>*/}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Build Your Custom Package</h2>
            <p className="text-sm text-gray-600">Tailored marketing solutions for your business</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-white px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            {stepConfig.map((step, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === currentStep;
              const isCompleted = stepNumber < currentStep;
              const StepIcon = step.icon;

              return (
                <div key={stepNumber} className="flex items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${isActive ? 'bg-blue-600 text-white shadow-lg scale-110' : 
                      isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}
                  `}>
                    {isCompleted ? <Check className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
                  </div>
                  {index < stepConfig.length - 1 && (
                    <div className={`
                      w-16 h-1 mx-2 rounded-full transition-all duration-300
                      ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                    `} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-900">{stepConfig[currentStep - 1].title}</div>
            <div className="text-xs text-gray-500">{stepConfig[currentStep - 1].description}</div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-8 overflow-y-auto">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Step {currentStep} of {totalSteps}
          </div>
          <div className="flex items-center space-x-3">
            
            <div className="flex space-x-3">
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              )}
              {currentStep < totalSteps ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleFormSubmit}
                  disabled={isSubmitting || !formData.name || !formData.email}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 shadow-lg font-semibold"
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
      </div>

      <style >{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(102, 126, 234, 0.6);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
          transition: all 0.2s ease;
        }
        
        .slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(102, 126, 234, 0.6);
        }
        
        .slider::-webkit-slider-track {
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 100%);
        }
        
        .slider::-moz-range-track {
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 100%);
          border: none;
        }
      `}</style>
    </div>
  );
};

export default CustomPackage;