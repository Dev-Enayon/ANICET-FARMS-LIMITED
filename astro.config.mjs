import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// TODO: Replace the placeholder `site` domain once ANICET FARMS LIMITED's
// real production domain is confirmed. `.example` is a reserved, safe TLD.
export default defineConfig({
  site: 'https://anicetfarms.example',
  trailingSlash: 'ignore',
  // Astro 7: the default static output now behaves as the old hybrid mode —
  // most pages prerender at build time, while pages marked `prerender = false`
  // (product catalogue pages and /admin/) render on demand via @astrojs/node
  // so admin edits appear without a rebuild.
  adapter: node({ mode: 'standalone' }),
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      // The admin dashboard and API routes are internal tooling, not public
      // pages — keep them out of sitemap.xml (and any prerender set).
      filter: (page) => !page.includes('/admin/') && !page.includes('/api/'),
      serialize(item) {
        return {
          ...item,
          // Default priority 0.7 for top-level pages, lower elsewhere.
          priority: item.url.replace(/\/$/, '').split('/').length <= 4 ? 0.8 : 0.5,
        };
      },
    }),
  ],
});