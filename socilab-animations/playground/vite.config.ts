import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'socilab-animations': resolve(__dirname, '../src/index.ts')
    }
  }
});
