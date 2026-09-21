/* ==========================================================================
   MAR - APPLICATION
   --------------------------------------------------------------------------
   The routes, and the chrome that surrounds every one of them.

   Features that have been switched off in src/config/site.config.ts do not
   get a route at all, so a disabled section cannot be reached by typing its
   address either.
   ========================================================================== */

import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { Header } from './components/chrome/Header';
import { Footer } from './components/chrome/Footer';
import { Curtain } from './components/chrome/Curtain';
import { ScrollToTop } from './components/chrome/RouteChrome';
import { AboutPanel } from './components/panels/AboutPanel';
import { SearchPanel } from './components/panels/SearchPanel';
import { Companion } from './components/companion/Companion';
import { UiProvider } from './lib/UiProvider';
import { siteConfig } from './config/site.config';

import { Home } from './routes/Home';
import { NotFound } from './routes/NotFound';

/* The heavier rooms are fetched when they are first entered rather than
   with the first page, which keeps the opening view small. */
const Projects = lazy(() => import('./routes/Projects'));
const ProjectDetail = lazy(() => import('./routes/ProjectDetail'));
const Journal = lazy(() => import('./routes/Journal'));
const JournalEntryPage = lazy(() => import('./routes/JournalEntry'));
const Interests = lazy(() => import('./routes/Interests'));
const InterestDetail = lazy(() => import('./routes/InterestDetail'));
const Archive = lazy(() => import('./routes/Archive'));
const Sketchbook = lazy(() => import('./routes/Sketchbook'));
const Contact = lazy(() => import('./routes/Contact'));

/** Shown while a room is being fetched. Holds the page height so the footer
 *  does not jump up to meet the header. */
function RoomLoading() {
  return (
    <div className="room-loading" role="status" aria-live="polite">
      <span className="visually-hidden">Loading</span>
      <span className="room-loading__rule" aria-hidden="true" />
    </div>
  );
}

export function App() {
  return (
    <UiProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Curtain />
      <ScrollToTop />
      <Header />

      <main id="main" tabIndex={-1}>
        <Suspense fallback={<RoomLoading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* About lives in a panel. The address opens Home with it open. */}
            <Route path="/about" element={<Home openAbout />} />

            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />

            {siteConfig.journal && (
              <>
                <Route path="/journal" element={<Journal />} />
                <Route path="/journal/:id" element={<JournalEntryPage />} />
              </>
            )}

            <Route path="/interests" element={<Interests />} />
            <Route path="/interests/:id" element={<InterestDetail />} />

            {siteConfig.archive && <Route path="/archive" element={<Archive />} />}
            {siteConfig.sketchbook && <Route path="/sketchbook" element={<Sketchbook />} />}

            <Route path="/contact" element={<Contact />} />

            {/* Sections that have been switched off send their addresses home
                rather than to the dead end page. */}
            {!siteConfig.journal && <Route path="/journal/*" element={<Navigate to="/" replace />} />}
            {!siteConfig.archive && <Route path="/archive" element={<Navigate to="/" replace />} />}
            {!siteConfig.sketchbook && (
              <Route path="/sketchbook" element={<Navigate to="/" replace />} />
            )}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <AboutPanel />
      {siteConfig.search && <SearchPanel />}
      {siteConfig.dogCompanion && <Companion />}
    </UiProvider>
  );
}
