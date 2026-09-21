/* ==========================================================================
   MAR - CONTACT
   --------------------------------------------------------------------------
   The last room. No campaign, no call to action, no invitation to "work
   together". A page that says how to get in touch and then stops.
   ========================================================================== */

import { contact } from '../content/contact';
import { site } from '../content/site';
import { PageMeta } from '../components/chrome/RouteChrome';
import { Breadcrumb } from '../components/chrome/Breadcrumb';
import { MarLogo } from '../components/identity/MarLogo';
import './contact.css';

export default function Contact() {
  return (
    <>
      <PageMeta
        title="Contact"
        description="How to get in touch with MAR."
      />

      <div className="page">
        <Breadcrumb trail={[{ label: 'Contact' }]} />
      </div>

      <section className="contact room" aria-labelledby="contact-title">
        <div className="page">
          <div className="contact__grid">
            <div className="contact__opening">
              <h1 id="contact-title" className="contact__headline display-2">
                {contact.headline}
              </h1>
              <p className="lead contact__body">{contact.body}</p>
            </div>

            <dl className="contact__links">
              {contact.links.map((link) => (
                <div key={link.label} className="contact__link-row">
                  <dt className="contact__link-label">{link.label}</dt>
                  <dd className="contact__link-value">
                    {link.href ? (
                      <a
                        href={link.href}
                        className="contact__link"
                        {...(link.external
                          ? { target: '_blank', rel: 'noreferrer noopener' }
                          : {})}
                      >
                        {link.display}
                      </a>
                    ) : (
                      link.display
                    )}
                  </dd>
                </div>
              ))}

              {contact.location && (
                <div className="contact__link-row">
                  <dt className="contact__link-label">Where</dt>
                  <dd className="contact__link-value">{contact.location}</dd>
                </div>
              )}

              {contact.availability && (
                <div className="contact__link-row">
                  <dt className="contact__link-label">Currently</dt>
                  <dd className="contact__link-value">{contact.availability}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="demo-note contact__demo">
            <span className="demo-note__mark">Demo</span>
            <span>
              Every address on this page is a placeholder. Edit src/content/contact.ts.
            </span>
          </div>
        </div>
      </section>

      {/* The closing. The wordmark at full size, the way a book ends with a
          colophon rather than with a slogan. */}
      <section className="contact-close" aria-label="Closing">
        <div className="page">
          <MarLogo tone="inverted" size="clamp(4rem, 20vw, 14rem)" title="" />
          <div className="contact-close__lines">
            <p className="contact-close__statement">{site.statement}</p>
            {contact.closing && <p className="contact-close__closing">{contact.closing}</p>}
          </div>
        </div>
      </section>
    </>
  );
}
