/**
 * Axe accessibility testing configuration
 * Only runs in development mode to avoid performance impact in production
 */

export const initializeAxe = async () => {
  if (process.env.NODE_ENV === 'development') {
    try {
      const { default: axe } = await import('@axe-core/react');
      const React = await import('react');
      const ReactDOM = await import('react-dom');
      
      axe(React, ReactDOM, 1000); // 1 second delay for better UX
      console.log('Axe accessibility testing initialized');
    } catch (error) {
      console.warn('Failed to initialize Axe accessibility testing:', error);
    }
  }
};
