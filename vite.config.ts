import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Where the site will live.
 *
 * '/' for a normal host (Netlify, Vercel, Cloudflare, your own server), which
 * is the default. GitHub Pages serves a project site from a sub-path, so the
 * deploy workflow sets VITE_BASE to '/<repository-name>/' instead.
 */
const base = process.env.VITE_BASE || '/'

/**
 * GitHub Pages has no rewrite rules, so a visitor who opens
 * /projects/courtyard-dwelling directly gets the 404 page instead of the app.
 *
 * This writes a 404 page that hands the requested address back to the app
 * through the query string, which the small script in index.html unpacks and
 * puts back in the address bar before React starts. The result is that deep
 * links and reloads work, and the address stays clean.
 *
 * On a host that can rewrite, the file is simply never asked for.
 */
function githubPagesFallback(): Plugin {
  let outDir = 'dist'
  let resolvedBase = base

  return {
    name: 'mar:github-pages-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
      resolvedBase = config.base
    },
    closeBundle() {
      const segments = resolvedBase.split('/').filter(Boolean).length

      const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>MAR</title>
    <script>
      // Hand the requested address to the app through the query string.
      var keep = ${segments};
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
          l.pathname.split('/').slice(0, 1 + keep).join('/') + '/?/' +
          l.pathname.slice(1).split('/').slice(keep).join('/').replace(/&/g, '~and~') +
          (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
          l.hash
      );
    </script>
  </head>
  <body></body>
</html>
`
      writeFileSync(resolve(outDir, '404.html'), html)
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), githubPagesFallback()],
  build: {
    rollupOptions: {
      output: {
        // Keep the animation layer out of the first paint payload.
        manualChunks: {
          motion: ['motion', 'motion/react'],
          router: ['react-router'],
        },
      },
    },
  },
})
