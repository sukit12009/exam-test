import React from 'react';

interface SuccessMessageProps {
  onReset: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ onReset }) => (
  <div className="text-center py-8">
    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
      <svg
        className="h-6 w-6 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
    <h2 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">
      Registration Successful!
    </h2>
    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
      Thank you for registering. You can now log in to your account.
    </p>
    <button
      onClick={onReset}
      className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Register Another Account
    </button>
  </div>
);

export default SuccessMessage;
