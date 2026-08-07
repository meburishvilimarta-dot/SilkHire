import { ButtonLink, ButtonArrow } from './Button';
import { Reveal } from './Reveal';

interface CtaBannerProps {
  title: string;
  body: string;
  buttonLabel: string;
  href: string;
  id: string;
}

/**
 * The closing panel on a content page. Dark, so it reads as a deliberate stop
 * before the footer rather than one more section of the article.
 */
export function CtaBanner({ title, body, buttonLabel, href, id }: CtaBannerProps) {
  return (
    <section aria-labelledby={id} className="bg-paper pb-24 sm:pb-28 lg:pb-32">
      <div className="container-page">
        <Reveal>
          <div className="on-dark grain relative isolate overflow-hidden rounded-xl bg-void px-8 py-14 text-void-ink sm:px-14 sm:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_90%_at_85%_10%,rgba(23,131,106,0.24),transparent_60%)]"
            />
            {/* The route, arcing out of the panel. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 800 240"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full text-void-line"
            >
              <path
                d="M-20 220C160 220 200 40 420 40s240 180 420 180"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>

            <div className="relative max-w-2xl">
              <h2 id={id} className="text-display text-[2rem] sm:text-[2.75rem]">
                {title}
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-void-muted">{body}</p>
              <ButtonLink href={href} variant="inverse" size="lg" className="mt-9">
                {buttonLabel}
                <ButtonArrow />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
