import { defineConfig } from 'tsup';

export default defineConfig({
  name: 'tagmento',
  minify: true,
  target: 'es2022',
  external: ['react', 'react-dom'],
  entry: ['src/index.ts'],
  sourcemap: true,
  dts: true,
  format: ['esm', 'cjs'],
  injectStyle: true,
  treeshake: true,
  clean: true,
  esbuildOptions(options) {
    options.bundle = true;
    options.pure = ['console.log', 'console.debug', 'console.info'];
    options.legalComments = 'none';
  },
  splitting: true,
});