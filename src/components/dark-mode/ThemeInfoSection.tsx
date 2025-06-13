import { useDarkMode } from '../../hooks/useDarkMode';

const ThemeInfoSection = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className="mt-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 transition-all duration-300 border border-gray-200/80 dark:border-gray-700/60">
      <div className="flex items-center mb-6">
        <div className={`p-3 rounded-xl mr-4 ${darkMode ? 'bg-yellow-500/10' : 'bg-blue-500/10'} shadow-inner`}>
          {darkMode ? (
            <span className="text-yellow-400 text-2xl">🌙</span>
          ) : (
            <span className="text-blue-500 text-2xl">☀️</span>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-300 bg-clip-text text-transparent">
            {darkMode ? 'Dark Mode' : 'Light Mode'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Current theme: <span className="font-medium text-gray-700 dark:text-gray-300">
              {darkMode ? 'Dark' : 'Light'}
            </span>
          </p>
        </div>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300/90 mb-6 leading-relaxed">
        You're currently in <span className="font-medium text-gray-900 dark:text-white">
          {darkMode ? 'dark' : 'light'}
        </span> mode. The interface automatically adapts to your system preferences, 
        or you can manually toggle between themes using the button above. Your preference is saved for future visits.
      </p>
      
      <CodeExamples />
    </div>
  );
};

const CodeExamples = () => (
  <div className="mt-6 p-5 bg-gray-50/80 dark:bg-gray-700/50 rounded-xl border border-gray-200/80 dark:border-gray-600/50 backdrop-blur-sm">
    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
      <span className="mr-2">🎨</span> Try it yourself:
    </h3>
    <div className="space-y-3">
      <CodeExample 
        lightText="bg-white" 
        darkText="dark:bg-gray-800" 
      />
      <CodeExample 
        lightText="text-gray-900" 
        darkText="dark:text-white" 
      />
    </div>
  </div>
);

interface CodeExampleProps {
  lightText: string;
  darkText: string;
}

const CodeExample: React.FC<CodeExampleProps> = ({ lightText, darkText }) => (
  <div className="flex items-center space-x-3">
    <CodeBlock text={lightText} />
    <span className="text-gray-400">→</span>
    <CodeBlock text={darkText} isDark />
  </div>
);

const CodeBlock: React.FC<{ text: string; isDark?: boolean }> = ({ text, isDark = false }) => (
  <span className={`text-xs font-mono px-3 py-1.5 rounded-lg border shadow-sm ${
    isDark 
      ? 'bg-gray-900 text-blue-300 border-transparent shadow' 
      : 'bg-white dark:bg-gray-800/80 text-blue-700 dark:text-blue-300 border-gray-200 dark:border-gray-600/50'
  }`}>
    {text}
  </span>
);

export default ThemeInfoSection;
