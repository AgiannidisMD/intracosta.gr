import React, { useEffect } from 'react';
import { getAccessibilityConfig } from '../config/accessibility';

/**
 * All-in-One Accessibility Widget Component
 * 
 * This component integrates the All-in-One Accessibility tool from Skynet Technologies
 * to provide comprehensive accessibility features for the website.
 * 
 * Features include:
 * - Screen reader optimization
 * - Keyboard navigation
 * - High contrast mode
 * - Font size adjustment
 * - Focus indicators
 * - And many more accessibility features
 * 
 * The widget is loaded asynchronously to avoid blocking the main page load.
 */

interface AllInOneAccessibilityProps {
  /**
   * License key for the All-in-One Accessibility tool
   * If not provided, the tool will work in demo mode
   */
  licenseKey?: string;
  
  /**
   * Position of the accessibility widget
   * Default: 'bottom_right'
   */
  position?: 'bottom_right' | 'bottom_left' | 'top_right' | 'top_left';
  
  /**
   * Custom color code for the widget (hex color without #)
   * Default: empty (uses default colors)
   */
  colorCode?: string;
  
  /**
   * Delay before loading the widget (in milliseconds)
   * Default: 500ms
   */
  loadDelay?: number;
}

const AllInOneAccessibility: React.FC<AllInOneAccessibilityProps> = ({
  licenseKey,
  position,
  colorCode,
  loadDelay
}) => {
  // Get configuration with fallback to props
  const config = getAccessibilityConfig();
  
  const finalLicenseKey = licenseKey ?? config.licenseKey;
  const finalPosition = position ?? config.position;
  const finalColorCode = colorCode ?? config.colorCode;
  const finalLoadDelay = loadDelay ?? config.loadDelay;

  useEffect(() => {
    // Don't load in development if disabled
    if (process.env.NODE_ENV === 'development' && !config.enableInDevelopment) {
      return;
    }
    // Function to load the All-in-One Accessibility widget
    const loadAccessibilityWidget = () => {
      // Check if the widget is already loaded
      if (document.getElementById('aioa-adawidget')) {
        return;
      }

      // Create the script element
      const script = document.createElement('script');
      script.id = 'aioa-adawidget';
      script.type = 'module';
      script.defer = true;
      
      // Build the script URL with parameters
      const baseUrl = 'https://www.skynettechnologies.com/accessibility/js/all-in-one-accessibility-js-widget-minify.js';
      const params = new URLSearchParams({
        aioa_reg_req: 'true',
        colorcode: finalColorCode,
        token: finalLicenseKey,
        position: finalPosition
      });
      
      script.src = `${baseUrl}?${params.toString()}`;
      
      // Add error handling
      script.onerror = () => {
        console.warn('Failed to load All-in-One Accessibility widget. This may be due to network issues or invalid license key.');
      };
      
      // Append to head
      document.head.appendChild(script);
    };

    // Load the widget after the specified delay
    const timeoutId = setTimeout(loadAccessibilityWidget, finalLoadDelay);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      
      // Remove the widget if component unmounts
      const existingWidget = document.getElementById('aioa-adawidget');
      if (existingWidget) {
        existingWidget.remove();
      }
      
      // Also remove any widget containers that might have been created
      const widgetContainers = document.querySelectorAll('[id^="aioa-"]');
      widgetContainers.forEach(container => {
        if (container.id !== 'aioa-adawidget') {
          container.remove();
        }
      });
    };
  }, [finalLicenseKey, finalPosition, finalColorCode, finalLoadDelay, config.enableInDevelopment]);

  // This component doesn't render anything visible
  // The accessibility widget is injected into the DOM by the external script
  return null;
};

export default AllInOneAccessibility;
