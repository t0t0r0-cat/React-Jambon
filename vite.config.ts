import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        assetFileNames: (info) => {
          if (!info.name) return 'assets/[name]-[hash][extname]';
          
          const extension = info.name.split('.').pop()?.toLowerCase();
          if (['woff', 'woff2'].includes(extension || '')) {
            return 'fonts/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
  assetsInclude: ['**/*.json', '**/*.woff', '**/*.woff2'],
  publicDir: 'public'
})
