import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  as?: 'h1' | 'h2';
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  id?: string;
}

/**
 * Every section opens the same way: a ruled ochre eyebrow, a serif headline,
 * then supporting text at a comfortably shorter measure than the headline.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  as: Tag = 'h2',
  align = 'left',
  tone = 'light',
  id,
}: SectionHeadingProps) {
  const isCentered = align === 'center';
  const isDark = tone === 'dark';

  return (
    <div className={isCentered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow ? (
        <Reveal>
          <p
            className={`eyebrow flex items-center gap-3 ${
              isCentered ? 'justify-center' : ''
            } ${isDark ? 'text-accent-bright' : 'text-accent'}`}
          >
            <span
              aria-hidden="true"
              className={`h-px w-7 ${isDark ? 'bg-accent-bright/45' : 'bg-accent/40'}`}
            />
            {eyebrow}
          </p>
        </Reveal>
      ) : null}

      <Reveal delay={eyebrow ? 70 : 0}>
        <Tag
          id={id}
          className={`text-display mt-5 ${
            Tag === 'h1'
              ? 'text-[2.5rem] sm:text-6xl lg:text-[4.25rem]'
              : 'text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem]'
          }`}
        >
          {title}
        </Tag>
      </Reveal>

      {subtitle ? (
        <Reveal delay={140}>
          <p
            className={`mt-6 max-w-2xl text-[1.0625rem] leading-[1.75] sm:text-lg ${
              isCentered ? 'mx-auto' : ''
            } ${isDark ? 'text-void-muted' : 'text-ink-muted'}`}
          >
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
