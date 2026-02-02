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

    // Function to reposition the widget on mobile
    const repositionWidgetOnMobile = () => {
      if (window.innerWidth <= 768) {
        // Find and reposition all AIOA elements
        const aioaElements = document.querySelectorAll('[id*="aioa"], [class*="aioa"]');
        aioaElements.forEach((el) => {
          const element = el as HTMLElement;
          element.style.setProperty('top', 'auto', 'important');
          element.style.setProperty('left', 'auto', 'important');
          element.style.setProperty('right', '12px', 'important');
          element.style.setProperty('bottom', '90px', 'important');
          element.style.setProperty('position', 'fixed', 'important');
          element.style.setProperty('z-index', '99998', 'important');
        });

        // Also look for the button directly
        const buttons = document.querySelectorAll('button');
        buttons.forEach((btn) => {
          if (btn.textContent?.includes('Accessibility') || btn.textContent?.includes('accessibility')) {
            const parent = btn.closest('div[style*="fixed"]') || btn.parentElement;
            if (parent) {
              const parentEl = parent as HTMLElement;
              parentEl.style.setProperty('top', 'auto', 'important');
              parentEl.style.setProperty('left', 'auto', 'important');
              parentEl.style.setProperty('right', '12px', 'important');
              parentEl.style.setProperty('bottom', '90px', 'important');
              parentEl.style.setProperty('position', 'fixed', 'important');
            }
          }
        });
      }
    };

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

    // Set up a MutationObserver to watch for the widget being added
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          // Check if any added node is the accessibility widget
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              if (node.id?.includes('aioa') || node.className?.includes('aioa')) {
                // Reposition after a short delay to ensure the widget is fully rendered
                setTimeout(repositionWidgetOnMobile, 100);
                setTimeout(repositionWidgetOnMobile, 500);
                setTimeout(repositionWidgetOnMobile, 1000);
              }
            }
          });
        }
      });
    });

    // Start observing
    observer.observe(document.body, { childList: true, subtree: true });

    // Also listen for resize to reposition on orientation change
    const handleResize = () => {
      setTimeout(repositionWidgetOnMobile, 100);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);

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
