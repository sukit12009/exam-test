import React from 'react';
import * as FiIcons from 'react-icons/fi';

const FiAlertCircle = FiIcons.FiAlertCircle as React.ComponentType<React.SVGProps<SVGSVGElement>>;

type InputFieldProps = {
  label: string;
  type?: string;
  icon: React.ReactNode;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, icon, error, ...props }, ref) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500">{icon}</span>
        </div>
        <input
          ref={ref}
          className={`block w-full pl-10 pr-3 py-2 border ${
            error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          } rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <FiAlertCircle className="mr-1" />
          {error}
        </p>
      )}
    </div>
  )
);

export default InputField;
