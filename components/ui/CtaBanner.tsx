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
 * The closing panel on a content page. A rounded rectangle on the secondary
 * background — a step up in the hierarchy rather than a colour reversal, so it
 * reads the same way in both appearances.
 */
export function CtaBanner({ title, body, buttonLabel, href, id }: CtaBannerProps) {
  return (
    <section aria-labelledby={id} className="bg-bg pb-20 sm:pb-24 lg:pb-28">
      <div className="container-page">
        <Reveal>
          <div className="rounded-xl border border-separator bg-bg-secondary px-8 py-14 text-center sm:px-14 sm:py-20">
            <h2 id={id} className="text-title-1 measure-wide mx-auto">
              {title}
            </h2>
            <p className="text-body-lead measure mx-auto mt-5 text-label-secondary">
              {body}
            </p>
            <ButtonLink href={href} size="lg" className="mt-9">
              {buttonLabel}
              <ButtonArrow />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
