import React, { useEffect, useState } from 'react';

const PerformanceMonitor: React.FC = () => {
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check for slow connection
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const slowConnections = ['slow-2g', '2g', '3g'];
      setIsSlowConnection(slowConnections.includes(connection.effectiveType));
    }

    // Check for reduced motion preference
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
      
      mediaQuery.addEventListener('change', (e) => {
        setIsReducedMotion(e.matches);
      });
    }

    // Add performance classes to body
    const body = document.body;
    
    if (isSlowConnection) {
      body.classList.add('slow-connection');
    }
    
    if (isReducedMotion) {
      body.classList.add('reduced-motion');
    }

    return () => {
      body.classList.remove('slow-connection', 'reduced-motion');
    };
  }, [isSlowConnection, isReducedMotion]);

  // This component doesn't render anything visible
  return null;
};

export default PerformanceMonitor;
