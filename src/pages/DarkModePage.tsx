import React from "react";

const DarkModePage = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">
        4. Dark Mode Toggle
      </h1>
      <p className="dark:text-gray-300">
        This page demonstrates a dark/light mode toggle.
      </p>
    </div>
  );
};

export default DarkModePage;
