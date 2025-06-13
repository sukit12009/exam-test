import { FaSpinner } from 'react-icons/fa';

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <FaSpinner className="animate-spin text-blue-500 text-4xl mb-4" />
    <p className="text-gray-600 dark:text-gray-300">Loading products...</p>
  </div>
);

export default LoadingState;
