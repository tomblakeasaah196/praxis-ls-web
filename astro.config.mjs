import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  build: {
    assets: '_assets',
  },
  vite: {
    build: {
      cssMinify: true,
      minify: 'esbuild',
    },
  },
  compressHTML: true,
});
