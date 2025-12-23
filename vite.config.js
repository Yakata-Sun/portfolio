import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  build: {
    minify: true
  },
  css: {
    minify: true
  },
  plugins: [
    createHtmlPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyCSS: true,
        minifyJS: true,
      },
    }),
  ],
  assetFileNames: `assets/[name].min.[ext]`
})  
