import { MessageType } from './types';
const AlertCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

interface StatusMessageProps {
  message: MessageType;
}

export const StatusMessage = ({ message }: StatusMessageProps) => {
  if (!message.text) return null;

  return (
    <div 
      className={`mb-6 p-4 rounded-md ${
        message.type === 'error' 
          ? 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
          : 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300'
      }`}
    >
      <div className="flex items-center">
        {message.type === 'error' ? (
          <AlertCircleIcon className="mr-2 h-5 w-5" />
        ) : (
          <CheckCircleIcon className="mr-2 h-5 w-5" />
        )}
        {message.text}
      </div>
    </div>
  );
};
