/* ==========================================================================
   MAR - PROJECT SEQUENCE
   --------------------------------------------------------------------------
   A project page is not a template with slots in it. It is an ordered list
   of sections, and this draws whatever that list contains, in whatever order
   it is written.

   Adding a plan, moving the process section above the drawings, or giving
   one project six photographs and another one none, is a change to the
   content file. Nothing here has to be touched.
   ========================================================================== */

import type { ProjectSection } from '../../content/types';
import { Figure } from '../media/Figure';
import { usePrefersReducedMotion, useReveal } from '../../lib/hooks';
import './project-sequence.css';

export function ProjectSequence({ sections }: { sections: ProjectSection[] }) {
  if (sections.length === 0) {
    return (
      <div className="page">
        <div className="empty">
          <p className="empty__title">This reading has no sections yet</p>
          <p className="empty__body">
            Add sections to this project in src/content/projects.ts. Every section needs a
            kind, and the order they are written in is the order they appear.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="sequence">
      {sections.map((section) => (
        <Section key={section.id} section={section} />
      ))}
    </div>
  );
}

function Section({ section }: { section: ProjectSection }) {
  const reduced = usePrefersReducedMotion();
  const { ref, revealed } = useReveal<HTMLElement>(0.12);

  return (
    <section
      ref={ref}
      className={`sequence__section sequence__section--${section.kind}`}
      data-revealed={reduced ? true : revealed}
      aria-label={section.title ?? undefined}
    >
      {(section.title || section.label) && (
        <header className="sequence__head page">
          {section.label && <p className="sequence__label">{section.label}</p>}
          {section.title && <h2 className="sequence__title">{section.title}</h2>}
        </header>
      )}

      <Body section={section} />
    </section>
  );
}

function Body({ section }: { section: ProjectSection }) {
  switch (section.kind) {
    case 'text':
      return (
        <div className="page">
          <div className="sequence__text prose">
            {section.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      );

    case 'plate':
      return section.image.treatment === 'bleed' ? (
        <Figure image={section.image} seed={section.id} />
      ) : (
        <div className="page">
          <div className="sequence__plate">
            <Figure image={section.image} seed={section.id} />
          </div>
        </div>
      );

    case 'series':
      return (
        <div className="page">
          <div
            className="sequence__series"
            data-count={Math.min(section.images.length, 4)}
          >
            {section.images.map((image, index) => (
              <Figure key={index} image={image} seed={`${section.id}-${index}`} />
            ))}
          </div>
        </div>
      );

    case 'aside':
      return (
        <div className="page">
          <div
            className="sequence__aside"
            data-side={section.imageSide ?? 'left'}
          >
            <div className="sequence__aside-image">
              <Figure image={section.image} seed={section.id} />
            </div>
            <div className="sequence__aside-text prose">
              {section.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      );

    case 'statement':
      return (
        <div className="page">
          <blockquote className="sequence__statement">
            <p>{section.body}</p>
            {section.attribution && (
              <footer className="sequence__attribution">{section.attribution}</footer>
            )}
          </blockquote>
        </div>
      );

    case 'schedule':
      return (
        <div className="page">
          <dl className="spec sequence__schedule">
            {section.items.map((item) => (
              <div key={item.key} className="spec__item">
                <dt className="spec__key">{item.key}</dt>
                <dd className="spec__value">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      );

    case 'break':
      return (
        <div className="page">
          <hr className="rule sequence__break" />
        </div>
      );
  }
}
