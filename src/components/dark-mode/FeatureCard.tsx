import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  darkGradientFrom: string;
  darkGradientTo: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  gradientFrom,
  gradientTo,
  darkGradientFrom,
  darkGradientTo,
}) => {
  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200/80 dark:border-gray-700/60">
      <div 
        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradientFrom} ${gradientTo} dark:${darkGradientFrom} dark:${darkGradientTo} flex items-center justify-center mb-4 shadow-inner`}
      >
        <span className="text-2xl">{icon}</span>
      </div>
      <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300/90 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
