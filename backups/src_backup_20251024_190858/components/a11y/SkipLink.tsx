import React from 'react';

/**
 * Skip Link component for keyboard navigation
 * Allows users to skip to main content, improving accessibility
 */
const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-yellow-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:ring-2 focus:ring-yellow-300 focus:outline-none focus:font-semibold"
      onClick={(e) => {
        e.preventDefault();
        const target = document.getElementById('main-content');
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }}
    >
      Skip to main content
    </a>
  );
};

export default SkipLink;
