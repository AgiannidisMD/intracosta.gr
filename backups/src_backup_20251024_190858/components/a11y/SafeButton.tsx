import React from 'react';

interface SafeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
  ariaPressed?: boolean;
  ariaExpanded?: boolean;
  ariaControls?: string;
  ariaDescribedBy?: string;
}

/**
 * SafeButton component that ensures proper keyboard accessibility
 * Wraps button with proper ARIA attributes and keyboard handlers
 */
const SafeButton: React.FC<SafeButtonProps> = ({
  children,
  className = '',
  onClick,
  onKeyDown,
  ariaLabel,
  ariaPressed,
  ariaExpanded,
  ariaControls,
  ariaDescribedBy,
  type = 'button',
  ...rest
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    // Call existing onKeyDown if provided
    if (onKeyDown) {
      onKeyDown(event);
    }

    // Add standard keyboard support for buttons
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (onClick) {
        onClick(event as React.MouseEvent<HTMLButtonElement>);
      }
    }
  };

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-describedby={ariaDescribedBy}
      {...rest}
    >
      {children}
    </button>
  );
};

export default SafeButton;
