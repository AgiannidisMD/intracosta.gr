import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface ScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
  delay?: number;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '0px 0px -50px 0px',
    delay = 0
  } = options;

  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
    rootMargin
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    } else if (!triggerOnce) {
      setIsVisible(false);
    }
  }, [inView, delay, triggerOnce]);

  return { ref, isVisible, inView };
};

// DISABLED: useParallax causes scroll lag - using static elements instead
export const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);
  return { ref, offsetY: 0 }; // Static, no scroll listener
};

// DISABLED: useScrollProgress causes scroll lag - using NavigationIndicator instead
export const useScrollProgress = () => {
  return 0; // Static, no scroll listener
};
