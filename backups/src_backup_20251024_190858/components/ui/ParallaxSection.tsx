import React, { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
  className?: string;
  offset?: [number, number];
}

// DISABLED: ParallaxSection causes scroll lag - using static elements instead
const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  offset = [0, 1000]
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  // Static element - no scroll animations for better performance
  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  );
};

export default ParallaxSection;
