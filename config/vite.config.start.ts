import { mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import baseConig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    define: {
      "__CDN_PATH": JSON.stringify('/'),
      "__DEBUG": JSON.stringify(true),
      "__BASE_URL": JSON.stringify('/')
    },
    server: {
      open: true,
      fs: {
        strict: true,
      },
      proxy: {}
    },
    plugins: [
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js'],
        exclude: ['node_modules']
      }),
      stylelint({
        cache: false,
        include: ['src/**/*.less'],
        exclude: ['node_modules']
      })
    ],
  },
  baseConig
);