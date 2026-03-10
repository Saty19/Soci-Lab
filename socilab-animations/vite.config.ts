import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SocilabAnimations',
      fileName: (format) => `socilab-animations.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled properly if we had any
      external: []
    }
  },
  plugins: [
    dts({ rollupTypes: true })
  ]
});
