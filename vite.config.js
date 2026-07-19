import { defineConfig } from 'vite';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function attachStylesToJs() {
  return {
    name: 'attach-styles-to-js',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const cssKey = Object.keys(bundle).find((key) => key.endsWith('.css'));
      const jsKey = Object.keys(bundle).find((key) => bundle[key].isEntry);
      if (!cssKey || !jsKey) {
        return;
      }

      const styles = bundle[cssKey].source;
      const styleTag = `const el=document.createElement('style');el.textContent=${JSON.stringify(styles)};document.head.append(el);`;
      bundle[jsKey].code = styleTag + bundle[jsKey].code;
      delete bundle[cssKey];
    },
    writeBundle({ dir }) {
      const file = join(dir, 'index.html');
      const html = readFileSync(file, 'utf-8').replace(/<link rel="stylesheet"[^>]*>/, '');
      writeFileSync(file, html);
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [attachStylesToJs()],
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
});
