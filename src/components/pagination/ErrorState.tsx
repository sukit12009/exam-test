import { FaExclamationCircle } from 'react-icons/fa';

interface ErrorStateProps {
  message: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-12 text-red-500">
    <FaExclamationCircle className="text-4xl mb-4" />
    <p className="text-center">{message || 'An error occurred while fetching products'}</p>
  </div>
);

export default ErrorState;
