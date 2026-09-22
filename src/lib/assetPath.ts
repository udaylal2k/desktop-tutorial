/* ==========================================================================
   MAR - ASSET PATHS
   --------------------------------------------------------------------------
   Every picture path written in a content file (src/content/*.ts) is an
   absolute, root-relative string, because that is what CONTENT-GUIDE.md
   tells a non-technical editor to type: '/content/portraits/hero.jpg'.

   On a normal host that is correct as it stands. But a GitHub Pages project
   site is served from a sub-path (/<repository-name>/, set as VITE_BASE at
   build time - see vite.config.ts), and a string is just data: unlike an
   `import`, Vite has no way to know it names a file and rewrite it, so a
   root-relative path silently 404s there unless it is corrected at the
   point of use.

   Every place that turns a content file's `src` string into an <img src>
   must pass it through here first.
   ========================================================================== */

const base = import.meta.env.BASE_URL;

/** Resolves a root-relative asset path (as written in a content file)
 *  against the site's actual base path. A relative or already-absolute
 *  (http://, https://, //) URL passes through unchanged. */
export function assetPath(path: string): string {
  if (!path || base === '/' || /^([a-z][a-z0-9+.-]*:)?\/\//i.test(path) || !path.startsWith('/')) {
    return path;
  }
  return base.replace(/\/$/, '') + path;
}
