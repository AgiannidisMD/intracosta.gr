/**
 * All-in-One Accessibility Configuration
 * 
 * This file contains configuration options for the All-in-One Accessibility tool
 * that provides comprehensive accessibility features for the website.
 */

export interface AccessibilityConfig {
  /**
   * License key for the All-in-One Accessibility tool
   * Leave empty for demo mode
   */
  licenseKey: string;
  
  /**
   * Position of the accessibility widget
   */
  position: 'bottom_right' | 'bottom_left' | 'top_right' | 'top_left';
  
  /**
   * Custom color code for the widget (hex color without #)
   * Leave empty for default colors
   */
  colorCode: string;
  
  /**
   * Delay before loading the widget (in milliseconds)
   * Recommended: 1000ms to avoid blocking initial page load
   */
  loadDelay: number;
  
  /**
   * Whether to enable the widget in development mode
   * Set to false to disable in development
   */
  enableInDevelopment: boolean;
}

/**
 * Default configuration for All-in-One Accessibility
 * 
 * Note: To get a license key, visit:
 * https://www.skynettechnologies.com/accessibility/
 */
export const accessibilityConfig: AccessibilityConfig = {
  // License key - leave empty for demo mode
  // To get a license key, contact Skynet Technologies
  licenseKey: '',
  
  // Position the widget on the bottom left to avoid conflict with custom accessibility widget
  position: 'bottom_left',
  
  // Use default colors (empty string)
  colorCode: '',
  
  // Load after 1 second to avoid blocking initial page load
  loadDelay: 1000,
  
  // Enable in development for testing
  enableInDevelopment: true,
};

/**
 * Environment-specific configuration
 */
export const getAccessibilityConfig = (): AccessibilityConfig => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return {
    ...accessibilityConfig,
    // Disable in development if configured to do so
    enableInDevelopment: isDevelopment ? accessibilityConfig.enableInDevelopment : true,
  };
};
