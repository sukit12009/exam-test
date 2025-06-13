import React from 'react';

interface FormHeaderProps {
  title: string;
  subtitle: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title, subtitle }) => (
  <div className="text-center mb-8">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
      {title}
    </h1>
    <p className="text-gray-600 dark:text-gray-300">
      {subtitle}
    </p>
  </div>
);

export default FormHeader;
