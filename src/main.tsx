import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

/* The global layers load first, so that a component stylesheet imported
   further down the tree can override a base rule of the same specificity.
   Import order here is the cascade order in the built stylesheet. */
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';

import { App } from './App';

/* On GitHub Pages the site lives under /<repository-name>/, so the router is
   told where it starts. Everywhere else BASE_URL is '/' and this is a no-op. */
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
