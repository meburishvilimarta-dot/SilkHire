import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  as?: 'h1' | 'h2';
  align?: 'left' | 'center';
  id?: string;
}

/**
 * Every section opens the same way: an accent overline, a title, then
 * supporting text at a comfortable measure.
 *
 * Each of the three uses a named text style rather than assembling a size and
 * a weight at the call site, so the hierarchy is identical everywhere it
 * appears and scales as one when the viewport changes.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  as: Tag = 'h2',
  align = 'left',
  id,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={centered ? 'mx-auto text-center' : ''}>
      {eyebrow ? (
        <Reveal>
          <p className="text-overline text-accent">{eyebrow}</p>
        </Reveal>
      ) : null}

      <Reveal delay={eyebrow ? 60 : 0}>
        <Tag
          id={id}
          className={`${Tag === 'h1' ? 'text-display' : 'text-title-1'} ${
            eyebrow ? 'mt-4' : ''
          } measure-wide ${centered ? 'mx-auto' : ''}`}
        >
          {title}
        </Tag>
      </Reveal>

      {subtitle ? (
        <Reveal delay={120}>
          <p
            className={`text-body-lead measure-wide mt-5 text-label-secondary ${
              centered ? 'mx-auto' : ''
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
