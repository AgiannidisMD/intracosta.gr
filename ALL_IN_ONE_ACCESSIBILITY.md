# All-in-One Accessibility Integration

This document describes the integration of the All-in-One Accessibility tool into the Intracosta website.

## Overview

The All-in-One Accessibility tool from Skynet Technologies provides comprehensive accessibility features to make the website more inclusive for users with disabilities. It includes features like:

- Screen reader optimization
- Keyboard navigation
- High contrast mode
- Font size adjustment
- Focus indicators
- Color adjustments
- And many more accessibility features

## Files Added

### 1. `src/components/AllInOneAccessibility.tsx`
React component that integrates the All-in-One Accessibility widget.

**Features:**
- Configurable position (bottom_left, bottom_right, top_left, top_right)
- Custom color scheme support
- License key support
- Error handling
- Cleanup on component unmount
- Development mode toggle

### 2. `src/config/accessibility.ts`
Configuration file for the All-in-One Accessibility tool.

**Configuration Options:**
- `licenseKey`: License key for the tool (empty for demo mode)
- `position`: Widget position on the page
- `colorCode`: Custom color scheme (hex without #)
- `loadDelay`: Delay before loading (ms)
- `enableInDevelopment`: Whether to enable in development

### 3. Integration in `src/App.tsx`
The component is added to the main App component and loads automatically.

## Configuration

### Default Configuration
```typescript
export const accessibilityConfig: AccessibilityConfig = {
  licenseKey: '',           // Empty for demo mode
  position: 'bottom_left',  // Position to avoid conflict with custom widget
  colorCode: '',           // Default colors
  loadDelay: 1000,         // 1 second delay
  enableInDevelopment: true, // Enable in development for testing
};
```

### Getting a License Key

To get a license key for production use:

1. Visit: https://www.skynettechnologies.com/accessibility/
2. Contact Skynet Technologies for licensing
3. Update the `licenseKey` in `src/config/accessibility.ts`

### Customization

You can customize the widget by modifying the configuration:

```typescript
// Example: Custom position and colors
<AllInOneAccessibility 
  position="bottom_right"
  colorCode="FF5733"
  loadDelay={500}
/>
```

## How It Works

1. **Loading**: The component loads the external JavaScript from Skynet Technologies
2. **Positioning**: The widget appears in the configured position
3. **Features**: Users can access various accessibility features through the widget
4. **Cleanup**: The widget is properly removed when the component unmounts

## Widget Positions

- **bottom_left**: Bottom left corner (default, avoids conflict with custom widget)
- **bottom_right**: Bottom right corner
- **top_left**: Top left corner
- **top_right**: Top right corner

## Demo Mode vs Licensed Mode

### Demo Mode (Current)
- Works without a license key
- Limited features
- Shows "Demo" branding
- Good for testing and development

### Licensed Mode
- Full feature set
- No demo branding
- Professional appearance
- Production ready

## Integration with Existing Accessibility Widget

The All-in-One Accessibility tool works alongside the existing custom accessibility widget:

- **Custom Widget**: Provides basic accessibility features (font size, contrast, etc.)
- **All-in-One Widget**: Provides comprehensive accessibility features
- **Positioning**: All-in-One is positioned on bottom_left to avoid conflicts
- **Complementary**: Both widgets work together to provide maximum accessibility

## Testing

### Development Testing
1. The widget is enabled in development mode by default
2. Check browser console for any loading errors
3. Verify widget appears in bottom_left corner
4. Test various accessibility features

### Production Testing
1. Ensure license key is configured
2. Test on different devices and browsers
3. Verify all accessibility features work
4. Check for any conflicts with existing functionality

## Troubleshooting

### Widget Not Loading
- Check browser console for errors
- Verify network connectivity
- Ensure no ad blockers are blocking the script
- Check if license key is valid (if using licensed mode)

### Conflicts with Custom Widget
- Both widgets should work together
- If conflicts occur, adjust positioning
- Check for CSS conflicts

### Performance Issues
- Widget loads asynchronously to avoid blocking
- Uses 1-second delay by default
- Minimal impact on page performance

## Support

For issues with the All-in-One Accessibility tool:

1. Check the Skynet Technologies documentation
2. Contact Skynet Technologies support
3. Review the configuration settings
4. Check browser compatibility

## License

The All-in-One Accessibility tool is licensed under GNU GPL v2. See the LICENSE.txt file in the original package for details.

## Files from Original Package

The following files were used from the original all-in-one-accessibility_1.4 package:

- `all-in-one-accessibility.php` - PHP integration code (used as reference)
- `tmpl/output.php` - Template file (used as reference)
- `LICENSE.txt` - GNU GPL v2 license

The JavaScript integration was adapted from the PHP code to work with React.


