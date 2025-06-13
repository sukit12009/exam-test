import React from 'react';
import * as FiIcons from 'react-icons/fi';

const FiAlertCircle = FiIcons.FiAlertCircle as React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface TermsCheckboxProps {
  error?: { message?: string };
  register: any;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ error, register }) => (
  <div className="flex items-start">
    <div className="flex items-center h-5">
      <input
        id="acceptTerms"
        type="checkbox"
        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
        {...register('acceptTerms')}
      />
    </div>
    <div className="ml-3 text-sm">
      <label
        htmlFor="acceptTerms"
        className="font-medium text-gray-700 dark:text-gray-300"
      >
        I agree to the{' '}
        <button 
          type="button" 
          onClick={(e) => {
            e.preventDefault();
            // Add terms and conditions modal or navigation logic here
          }}
          className="text-blue-600 hover:text-blue-500 bg-transparent border-none p-0 cursor-pointer font-inherit text-inherit focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
        >
          Terms and Conditions
        </button>
      </label>
      {error?.message && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <FiAlertCircle className="mr-1" />
          {error.message}
        </p>
      )}
    </div>
  </div>
);

export default TermsCheckbox;
