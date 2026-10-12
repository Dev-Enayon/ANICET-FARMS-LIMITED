import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: Replace the placeholder `site` domain once ANICET FARMS LIMITED's
// real production domain is confirmed. `.example` is a reserved, safe TLD.
export default defineConfig({
  site: 'https://anicetfarms.example',
  trailingSlash: 'ignore',
  output: 'static',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
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