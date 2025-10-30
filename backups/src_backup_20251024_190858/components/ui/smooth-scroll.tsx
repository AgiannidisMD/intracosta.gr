'use client';
import { ReactLenis } from 'lenis/react';
import React, { forwardRef, ReactNode } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = forwardRef<HTMLDivElement, SmoothScrollProps>(({ children }, ref) => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.15, // Slightly slower for better performance
        duration: 1.2, // Slightly longer for smoother feel
        smoothWheel: false, // Disable smooth wheel to prevent conflicts
        smoothTouch: false, // Disable smooth touch to prevent conflicts
        wheelMultiplier: 1.0,
        touchMultiplier: 1.0,
        infinite: false,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        normalizeWheel: false, // Disable to prevent conflicts
        easing: (t: number) => t, // Linear easing for better performance
        autoRaf: false, // Disable to prevent conflicts with other listeners
        syncTouch: false, // Disable to prevent conflicts
      }}
    >
      <div ref={ref}>
        {children}
      </div>
    </ReactLenis>
  );
});

SmoothScroll.displayName = 'SmoothScroll';

export default SmoothScroll;