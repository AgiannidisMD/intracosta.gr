import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 30;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      // Keep at 100 for a moment then hide
      const timeout = setTimeout(() => {
        setProgress(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  if (progress === 0 && !isLoading) return null;

  return (
    <div
      className={`fixed inset-0 bg-white z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Logo */}
      <div className="mb-12">
        <img
          src="/intracosta-logo.svg"
          alt="Intracosta"
          className="w-64 sm:w-80 md:w-96 h-auto mx-auto"
        />
      </div>

      {/* Progress Bar Container */}
      <div className="w-48 sm:w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-300 ease-out rounded-full"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Loading Text */}
      <p className="mt-6 text-gray-500 text-sm font-medium">Loading...</p>
    </div>
  );
};

export default LoadingScreen;
