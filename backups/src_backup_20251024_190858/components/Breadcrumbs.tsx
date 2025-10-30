import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (href: string) => {
    if (href.startsWith('/#')) {
      // Navigation to main page sections
      const section = href.replace('/#', '');
      navigate('/');
      // Wait for navigation to complete, then scroll to section
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }
      }, 100);
    } else if (href.startsWith('#')) {
      // Scroll to section on same page
      const element = document.querySelector(href);
      if (element) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    } else if (href.startsWith('/')) {
      // Regular route navigation
      navigate(href);
    }
  };

  return (
    <nav 
      className={`flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm ${className}`}
      aria-label="Breadcrumb navigation"
      role="navigation"
    >
      <ol className="flex items-center space-x-1 sm:space-x-2 list-none">
        {/* Home Link */}
        <li className="flex items-center">
          <button
            onClick={() => handleNavigation('/#home')}
            className="flex items-center p-1 sm:p-2 text-gray-600 hover:text-yellow-600 focus:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 rounded-md transition-all duration-200 touch-manipulation"
            aria-label="Go to Home"
            type="button"
          >
            <Home className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </li>

        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-1 sm:space-x-2">
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
            {item.current ? (
              <span 
                className="text-gray-900 font-semibold px-1 sm:px-2 py-1 bg-yellow-50 rounded-md"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : item.href ? (
              <button
                onClick={() => handleNavigation(item.href!)}
                className="text-gray-600 hover:text-yellow-600 focus:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 px-1 sm:px-2 py-1 rounded-md transition-all duration-200 touch-manipulation text-left"
                type="button"
              >
                {item.label}
              </button>
            ) : (
              <span className="text-gray-500 px-1 sm:px-2 py-1">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;