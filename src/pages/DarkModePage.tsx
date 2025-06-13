import { useEffect } from 'react';
import ThemeToggleButton from '../components/dark-mode/ThemeToggleButton';
import FeatureCard from '../components/dark-mode/FeatureCard';
import ThemeInfoSection from '../components/dark-mode/ThemeInfoSection';

const DarkModePage = () => {
  useEffect(() => {
    document.body.classList.add('transition-colors', 'duration-200');
    return () => {
      document.body.classList.remove('transition-colors', 'duration-200');
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto p-6">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Dark Mode Toggle
          </h1>
          <ThemeToggleButton />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            icon="✨"
            title="Modern Design"
            description="Experience a clean and modern interface that's easy on the eyes in both light and dark modes."
            gradientFrom="from-blue-100"
            gradientTo="to-blue-50"
            darkGradientFrom="from-blue-900/40"
            darkGradientTo="to-blue-800/20"
          />

          <FeatureCard
            icon="🌙"
            title="Dark Mode"
            description="Switch between light and dark themes with a single click. Your preference is saved automatically."
            gradientFrom="from-purple-100"
            gradientTo="to-blue-50"
            darkGradientFrom="from-purple-900/40"
            darkGradientTo="to-blue-900/20"
          />
        </div>

        <ThemeInfoSection />
      </div>
    </div>
  );
};

export default DarkModePage;
