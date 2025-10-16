import React, { useState, useEffect } from 'react';
import './SocialMediaGrowthSection.css';

// --- Helper Types ---
interface ChartDataItem {
  platform: string;
  growth: number;
  estimatedTraffic: number;
}

interface AnimatedChartDataItem extends ChartDataItem {
  currentGrowth: number;
  currentTraffic: number;
}

// --- Platform Specifics ---
interface PlatformDetails {
  icon: React.FC<{ className?: string }>;
  color: string;
}

const platformDetails: Record<string, PlatformDetails> = {
  Facebook: {
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.099v-3.622h3.099v-2.671c0-3.061 1.873-4.756 4.631-4.756.924 0 1.86.165 2.661.291v3.079h-1.83c-1.491 0-1.956.925-1.956 1.836v2.25h3.444l-.466 3.622h-2.978v9.294h6.081c.732 0 1.325-.593 1.325-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
      </svg>
    ),
    color: '#1877F2', // Facebook Blue
  },
  Instagram: {
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
    color: '#E4405F', // Instagram Pink/Purple
  },
  Twitter: {
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
    color: '#1DA1F2', // Twitter Blue
  },
  LinkedIn: {
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    color: '#0A66C2', // LinkedIn Blue
  },
  TikTok: {
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} viewBox="0 0 28 28" fill="currentColor">
        <path d="M22.938 5.375c-.563 0-1.063.125-1.5.375-.125 0-.25.063-.313.125-.688-.875-1.625-1.5-2.688-1.813-.188-.063-.375-.063-.563-.063H17.5c-.25 0-.5.063-.688.188-1.125.563-2 1.438-2.563 2.5-.063.125-.125.313-.125.438V16.5c0 .25-.063.5-.125.688-.5 1.063-1.313 1.938-2.375 2.5-.125.063-.313.125-.438.125h-2.813c-.188 0-.313-.063-.438-.125-1.125-.625-2-1.563-2.5-2.813-.063-.125-.063-.313-.063-.5v-2.313c0-.25.063-.5.125-.688.563-1.063 1.438-1.938 2.563-2.5.125-.063.25-.125.438-.125h.313c.813 0 1.5.375 2.063.938.125.125.25.188.375.188.188 0 .375-.063.5-.188.688-.813 1.625-1.375 2.688-1.625.125-.063.313-.063.438-.063h.313c.25 0 .5.063.688.188.063.063.125.063.188.125s.125.063.188.125c.125.063.188.125.25.188.625.563 1.063 1.313 1.25 2.125.063.125.063.313.063.438v7.813c0 .188-.063.313-.125.438-.563 1.125-1.438 2.063-2.563 2.625-.063.125-.125.188-.25.188h-2.75c-.188 0-.375-.063-.5-.188-.75-.438-1.313-1.063-1.688-1.813-.063-.125-.063-.25-.063-.375v-6.875c0-.188.063-.375.125-.5.313-.625.813-1.125 1.438-1.375.125-.063.25-.063.375-.063h.5c.188 0 .375.063.5.188.063.063.125.125.188.188.125.125.188.25.25.375.125.25.188.5.188.75v9.188c0 .188.063.313.125.438.25.563.688.938 1.188 1.125.063.063.125.063.188.063h2.75c.125 0 .25-.063.375-.063.938-.5 1.625-1.25 2-2.188.063-.125.063-.25.063-.375V7.688c0-.188 0-.313-.063-.438-.188-.813-.563-1.5-1.063-2.063-.063-.063-.125-.063-.125-.125z"/>
      </svg>
    ),
    color: '#000000', // TikTok Black (often with teal/pink accents not used here for simplicity)
  },
  // Add other platforms as needed
};


// --- Reusable PlatformGrowthChart Component ---
interface PlatformGrowthChartProps {
  chartId: string;
  title: string;
  initialData: ChartDataItem[];
  formatTraffic: (num: number) => string;
  // platformIcons: Record<string, React.FC<{ className?: string }>>;
  // platformColors: Record<string, string>;
}

const PlatformGrowthChart: React.FC<PlatformGrowthChartProps> = ({ chartId, title, initialData, formatTraffic }) => {
  const [animatedData, setAnimatedData] = useState<AnimatedChartDataItem[]>(
    initialData.map(data => ({ ...data, currentGrowth: 0, currentTraffic: 0 }))
  );

  useEffect(() => {
    const animationDuration = 800; // ms
    const steps = 50;
    const stepDelay = animationDuration / steps;

    const timers: number[] = [];
    const intervals: number[] = [];

    animatedData.forEach((item, itemIndex) => {
      let currentStep = 0;
      const growthIncrement = item.growth / steps;
      const trafficIncrement = item.estimatedTraffic / steps;
      const startDelay = itemIndex * 100;

      const timer = setTimeout(() => {
        const intervalId = setInterval(() => {
          currentStep++;
          setAnimatedData(prevData =>
            prevData.map((d, i) => {
              if (d.platform !== item.platform) return d; // Ensure we are updating the correct item
              return {
                ...d,
                currentGrowth: Math.min(d.growth, d.currentGrowth + growthIncrement),
                currentTraffic: Math.min(d.estimatedTraffic, d.currentTraffic + trafficIncrement),
              };
            })
          );

          if (currentStep >= steps) {
            clearInterval(intervalId);
            setAnimatedData(prevData =>
              prevData.map(d =>
                d.platform === item.platform ? { ...d, currentGrowth: d.growth, currentTraffic: d.estimatedTraffic } : d
              )
            );
          }
        }, stepDelay);
        intervals.push(intervalId);
      }, startDelay);
      timers.push(timer);
    });

    return () => { // Cleanup function
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [initialData]); // Rerun if initialData changes, though typically it won't for this setup

  return (
    <div className="chart-instance flex-1 bg-white p-6 rounded-lg shadow-lg min-w-[45%]"> {/* Added min-w for responsiveness */}
      <h3 className="text-xl font-semibold text-center mb-6 text-gray-700">{title}</h3>
      <div className="chart flex justify-around items-end h-64">
        {animatedData.map((data, index) => (
          <div key={`${chartId}-${data.platform}`} className="bar-wrapper flex flex-col items-center h-full justify-end">
            <div className="value-on-bar text-xs font-semibold text-gray-700 mb-1">
              {Math.round(data.currentGrowth)}%
            </div>
            <div
              className="bar rounded-t-md" // Removed bg-blue-500
              style={{
                height: `${data.growth}%`,
                animationDelay: `${index * 0.1}s`,
                backgroundColor: platformDetails[data.platform]?.color || '#CCCCCC' // Default color
              }}
              title={`${data.platform}: ${data.growth}% growth, ${formatTraffic(data.estimatedTraffic)}`}
            >
              {/* Bar itself doesn't need text if value is above */}
            </div>
            <div className="platform-info flex items-center mt-2">
              {platformDetails[data.platform]?.icon &&
                React.createElement(platformDetails[data.platform].icon, { className: "w-4 h-4 mr-1.5" })}
              <span className="platform-name text-sm text-gray-600">{data.platform}</span>
            </div>
            <span className="traffic-value text-xs" style={{ color: platformDetails[data.platform]?.color || '#3B82F6' }}> {/* Default to a blueish color */}
              ~{formatTraffic(data.currentTraffic)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Check Icon Component ---
const CheckIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6 text-green-500 mr-3 flex-shrink-0" }) => (
  <svg
    className={className}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M5 13l4 4L19 7"></path>
  </svg>
);


// --- Main SocialMediaGrowthSection Component ---
const SocialMediaGrowthSection: React.FC = () => {
  const formatTraffic = (num: number): string => {
    const roundedNum = Math.round(num);
    if (roundedNum >= 1000000) {
      return (roundedNum / 1000000).toFixed(1).replace(/\.0$/, '') + 'M/Month';
    }
    if (roundedNum >= 1000) {
      return (roundedNum / 1000).toFixed(1).replace(/\.0$/, '') + 'K/Month';
    }
    return roundedNum.toString() + '/Month';
  };

  const chartData1: ChartDataItem[] = [
    { platform: 'Facebook', growth: 75, estimatedTraffic: 1250000 },
    { platform: 'Instagram', growth: 90, estimatedTraffic: 2800000 },
    { platform: 'Twitter', growth: 60, estimatedTraffic: 750000 },
    { platform: 'LinkedIn', growth: 80, estimatedTraffic: 920000 },
    { platform: 'TikTok', growth: 95, estimatedTraffic: 3500000 },
  ];

  const features = [
    "Visualizes potential reach and engagement across key platforms.",
    "Highlights high-growth channels for targeted marketing efforts.",
    "Provides estimated monthly traffic to gauge audience size.",
    "Animated bars and numbers for dynamic data presentation.",
    "Helps in strategic decision-making for social media ad spend.",
    "Clear, at-a-glance comparison of platform effectiveness."
  ];

  return (
    <section className="social-media-growth-section py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Boost Your Online Business with Social Media
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Leverage the power of social media to connect with your audience, build brand awareness, and drive significant growth. Our strategies are tailored to maximize your reach and engagement.
        </p>
        <div className="content-wrapper flex flex-col lg:flex-row gap-8 items-start">
          {/* Chart Section */}
          <div className="lg:w-1/2 w-full">
            <PlatformGrowthChart
              chartId="chart1"
              title="Current Growth Potential"
              initialData={chartData1}
              formatTraffic={formatTraffic}
              // platformIcons={platformIcons} // Pass down
              // platformColors={platformColors} // Pass down
            />
          </div>

          {/* Features Section */}
          <div className="lg:w-1/2 w-full p-6 rounded-lg ">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Unlock Your Growth: Key Insights</h3>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckIcon />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-gray-600">
              Our platform analysis provides actionable data to refine your social media strategy, ensuring every campaign is optimized for maximum impact and ROI.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaGrowthSection;