/* ==========================================================================
   MAR - FOOTER
   --------------------------------------------------------------------------
   The last room. It carries the wordmark, the six places, the ways of
   getting in touch, and the doors into the deeper systems: the archive and
   the sketchbook, which are deliberately not in the primary navigation.
   ========================================================================== */

import { Link, NavLink } from 'react-router';
import { MarLogo, MarWave } from '../identity/MarLogo';
import { primaryNav } from './navigation';
import { site } from '../../content/site';
import { contact } from '../../content/contact';
import { siteConfig } from '../../config/site.config';
import { allArchive, allProjects, allJournal } from '../../content';
import { useUi } from '../../lib/useUi';
import './footer.css';

export function Footer() {
  const { openAbout } = useUi();
  const year = new Date().getFullYear();

  const deeper = [
    siteConfig.archive && { label: 'Archive', href: '/archive' },
    siteConfig.sketchbook && { label: 'Sketchbook', href: '/sketchbook' },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="footer" id="footer">
      <div className="page">
        <MarWave className="footer__wave mar-wave--faint" />

        <div className="footer__rooms">
          <div className="footer__identity">
            <MarLogo size="clamp(2.75rem, 9vw, 5rem)" tone="ink" />
            <p className="footer__descriptor">{site.descriptor}</p>
            <p className="footer__motto">{site.motto.join(' / ')}</p>
          </div>

          <nav className="footer__column" aria-label="Footer, pages">
            <h2 className="footer__column-title">Pages</h2>
            <ul className="footer__list">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  {item.panel ? (
                    <button type="button" className="footer__link" onClick={openAbout}>
                      {item.label}
                    </button>
                  ) : (
                    <NavLink to={item.href} end={item.href === '/'} className="footer__link">
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {deeper.length > 0 && (
            <nav className="footer__column" aria-label="Footer, archive">
              <h2 className="footer__column-title">Archive</h2>
              <ul className="footer__list">
                {deeper.map((item) => (
                  <li key={item.href}>
                    <Link to={item.href} className="footer__link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="footer__note">
                The wider body of material: drawings, working images, notes and
                references behind the finished work.
              </p>
            </nav>
          )}

          <div className="footer__column">
            <h2 className="footer__column-title">Contact</h2>
            <ul className="footer__list">
              {contact.links.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <a
                      className="footer__link"
                      href={link.href}
                      {...(link.external
                        ? { target: '_blank', rel: 'noreferrer noopener' }
                        : {})}
                    >
                      {link.display}
                    </a>
                  ) : (
                    <span className="footer__link footer__link--flat">{link.display}</span>
                  )}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="link-technical footer__contact-link">
              Contact
              <span className="link-technical__arrow" aria-hidden="true">
                &#8594;
              </span>
            </Link>
          </div>
        </div>

        {/* The record strip. What this archive currently holds. */}
        <dl className="footer__record">
          <div className="footer__record-item">
            <dt>Projects</dt>
            <dd>{String(allProjects.length).padStart(3, '0')}</dd>
          </div>
          {siteConfig.journal && (
            <div className="footer__record-item">
              <dt>Journal</dt>
              <dd>{String(allJournal.length).padStart(3, '0')}</dd>
            </div>
          )}
          {siteConfig.archive && (
            <div className="footer__record-item">
              <dt>Archive</dt>
              <dd>{String(allArchive.length).padStart(3, '0')}</dd>
            </div>
          )}
          <div className="footer__record-item">
            <dt>Statement</dt>
            <dd>{site.statement}</dd>
          </div>
        </dl>

        <div className="footer__base">
          <p className="technical technical--micro">
            &copy; {year} {site.name}
          </p>
          <p className="technical technical--micro footer__base-note">
            Replace this line with any credit or licence you want printed.
          </p>
        </div>
      </div>
    </footer>
  );
}
