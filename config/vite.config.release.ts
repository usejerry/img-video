import { mergeConfig } from 'vite';
import baseConig from './vite.config.base';
import params from '../params';

export default mergeConfig(
  {
    mode: 'production',
    base: params.cdn_path_release,
    plugins: [],
    define: {
      "__CDN_PATH": JSON.stringify(params.cdn_path_release),
      "__DEBUG": JSON.stringify(false),
      "__BASE_URL": JSON.stringify('/testvue/')
    },
    build: {
      outDir: 'release',
      assetsDir: './assets',
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.type === 'asset' && /\.(jpe?g|png|gif|svg)$/i.test(assetInfo.name)) {
              return 'img/[name]-[hash].[ext]';
            } if (assetInfo.type === 'asset' && /\.(ttf|woff|woff2|eot)$/i.test(assetInfo.name)) {
              return 'fonts/[name]-[hash].[ext]';
            }
            return '[ext]/[name]-[hash].[ext]';
          }
        }
      },
      chunkSizeWarningLimit: 2000
    }
  },
  baseConig
);