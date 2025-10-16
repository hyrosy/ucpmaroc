import React, { useEffect, useState } from 'react';
import Lottie from "lottie-react";
import { Send, Search, BarChart, Megaphone} from 'lucide-react';
interface DigitalMarketingSectionProps {
  lottieUrl: string;
}

const DigitalMarketingSection: React.FC<DigitalMarketingSectionProps> = ({ lottieUrl }) => {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


const benefits = [
    {
  icon: <Search className="w-6 h-6 text-white" />,
  title: "SEO",
  description: "Rank higher online",
  color: "from-lime-500 to-green-500"
},
{
  icon: <Send className="w-6 h-6 text-white" />,
  title: "Email Campaigns",
  description: "Reach your audience",
  color: "from-pink-500 to-red-500"
},
{
  icon: <BarChart className="w-6 h-6 text-white" />,
  title: "Analytics",
  description: "Track performance",
  color: "from-sky-500 to-blue-500"
},
{
  icon: <Megaphone className="w-6 h-6 text-white" />,
  title: "Ad Management",
  description: "Run smarter ads",
  color: "from-yellow-500 to-orange-500"
}

  ];


  useEffect(() => {
    const fetchAnimationData = async () => {
      if (!lottieUrl) {
        setError("Lottie URL is not provided.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(lottieUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch Lottie animation (status: ${response.status} ${response.statusText}) from ${lottieUrl}`);
        }
        const data = await response.json();
        // Basic validation for Lottie structure (presence of 'layers' array)
        if (!data || typeof data !== 'object' || !Array.isArray(data.layers)) {
          throw new Error("Invalid Lottie JSON structure: 'layers' array is missing or invalid.");
        }
        setAnimationData(data);
      } catch (err) {
        let errorMessage = "An unknown error occurred while fetching Lottie animation.";
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
        console.error("Error fetching or parsing Lottie animation:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimationData();
  }, [lottieUrl]);

  if (loading) {
    return (
      <section className="bg-gray-900 py-12">
        <div className="container mx-auto px-4 flex justify-center items-center" style={{ minHeight: '400px' }}>
          <p>Loading animation...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-900 py-12">
        <div className="container mx-auto px-4 flex flex-col justify-center items-center text-center" style={{ minHeight: '400px' }}>
          <p className="text-red-500 font-semibold">Error loading Lottie animation:</p>
          <p className="text-red-400 text-sm mt-1">{error}</p>
          <p className="text-xs text-gray-500 mt-2">Please check the Lottie URL and ensure the file is a valid Lottie JSON.</p>
        </div>
      </section>
    );
  }

  if (!animationData) {
    // This case should ideally be covered by loading or error states
    return (
      <section className="bg-gray-900 py-12">
        <div className="container mx-auto px-4 flex justify-center items-center" style={{ minHeight: '400px' }}>
          <p>No animation data to display.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Text Box Container on the left */}
          <div className="w-full md:w-1/2 flex items-center justify-start">
            <div className="p-8 rounded-lg text-left h-auto md:h-[400px] flex flex-col justify-center">
              <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-red-800 via-red-200 to-white bg-clip-text text-transparent mb-6 leading-tight">
              Build Strong<br />
              <span className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Social base
              </span>
            </h1>
              <p className="text-black text-lg mb-6">
                Transform your online presence with data-driven strategies that captivate audiences, boost conversions, and deliver measurable ROI. Our full-funnel approach ensures maximum impact.
              </p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="group bg-red-500/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="text-black font-semibold mb-1">{benefit.title}</h4>
                        <p className="text-black/70 text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
            </div>
          </div>
          {/* Lottie Animation on the right */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
  <div
    className="animation-container relative h-[300px] sm:h-[400px] md:h-[600px] lg:h-[700px] w-full max-w-[700px] rounded-lg overflow-hidden"
  >
    <Lottie
      animationData={animationData}
      loop={true}
      className="w-full h-full"
    />
  </div>
</div>

        </div>
      </div>
    </section>
  );
};

export default DigitalMarketingSection;