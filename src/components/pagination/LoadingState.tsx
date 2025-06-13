const LoadingState = () => (
  <div className="flex justify-center my-8">
    <div
      className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 dark:border-blue-400"
      aria-label="Loading..."
    />
  </div>
);

export default LoadingState;
