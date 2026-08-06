import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  /** Heading level. Sections default to h2; only the hero uses h1. */
  as?: 'h1' | 'h2';
  align?: 'left' | 'center';
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  as: Tag = 'h2',
  align = 'left',
  id,
}: SectionHeadingProps) {
  const isCentered = align === 'center';

  return (
    <div className={isCentered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
          {eyebrow}
        </p>
      ) : null}
      <Tag
        id={id}
        className={
          Tag === 'h1'
            ? 'text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.25rem]'
            : 'text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl'
        }
      >
        {title}
      </Tag>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
