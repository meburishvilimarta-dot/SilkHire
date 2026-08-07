'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Milliseconds of stagger. Use small multiples — 60–90ms reads as one gesture. */
  delay?: number;
  /** Render as something other than a div, so semantics survive the wrapper. */
  as?: ElementType;
  className?: string;
}

/**
 * Entrance animation on scroll, in ~40 lines instead of an animation library.
 *
 * The hidden state lives in CSS under `.js` (see `globals.css`) rather than in
 * React state, so the server-rendered HTML is complete and the element is only
 * ever hidden in browsers that can un-hide it. Each element is unobserved once
 * it has appeared — nothing keeps running after the reveal.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || revealed) return;

    // No IntersectionObserver (or reduced motion): show it and stop.
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        }
      },
      // Fires a little before the element reaches the viewport, so the motion
      // has finished by the time it is properly in view.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [revealed]);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-revealed={revealed ? '' : undefined}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
