import { useState } from 'react';

interface AccessibleCarouselProps {
  slides: React.ReactNode[];
}

export default function AccessibleCarousel({ slides }: AccessibleCarouselProps) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  return (
    <div
      aria-roledescription="carousel"
      aria-label="Gallery"
      className="relative overflow-hidden"
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${i + 1} of ${slides.length}`}
          hidden={i !== index}
        >
          {slide}
        </div>
      ))}

      <button onClick={prev} aria-label="Previous slide" className="absolute left-0 top-1/2 -translate-y-1/2 p-2">
        ‹
      </button>
      <button onClick={next} aria-label="Next slide" className="absolute right-0 top-1/2 -translate-y-1/2 p-2">
        ›
      </button>
    </div>
  );
}
