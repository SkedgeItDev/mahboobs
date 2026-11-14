import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';
import {fileURLToPath, URL} from 'node:url';

export default defineConfig({
  root: 'netlify',
  publicDir: '../public',
  css: {postcss: {plugins: [tailwindcss()]}},
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        id: '/',
        name: 'Mah Boobs',
        short_name: 'Matching Room',
        description:
          'A stacked solitaire matching game. Find two halves, clear the table, and keep your streak alive.',
        lang: 'en',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#101a18',
        theme_color: '#101a18',
        icons: [
          {src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any'},
          {src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any'},
          {src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable'},
        ],
      },
      workbox: {
        // Keep an offline shell without intercepting normal page navigations.
        globPatterns: ['**/*.{js,css,html,svg,ico,webmanifest}', 'icons/*.png'],
        globIgnores: ['**/images/pairs/**'],
        // Give the offline HTML its own cache key. Otherwise precache routing
        // wins before the network rule for /index.html and its aliases.
        manifestTransforms: [async entries => ({
          manifest: entries.map(entry => entry.url === 'index.html'
            ? {...entry, url: 'index.html?offline-shell=1'}
            : entry),
          warnings: [],
        })],
        navigateFallback: null,
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: ({request, sameOrigin}) => sameOrigin && request.mode === 'navigate',
            handler: 'NetworkOnly',
            options: {
              precacheFallback: {fallbackURL: 'index.html?offline-shell=1'},
            },
          },
          {
            urlPattern: /\/images\/pairs\/.*\.(?:webp|png)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'mah-pair-art-runtime',
              expiration: {
                maxEntries: 48,
                maxAgeSeconds: 60 * 60 * 24 * 14,
              },
              cacheableResponse: {statuses: [0, 200]},
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {'@': fileURLToPath(new URL('.', import.meta.url))},
  },
  build: {
    outDir: '../dist-netlify',
    emptyOutDir: true,
  },
});
