import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        additionalData: `@import "${resolve(__dirname, '../src/assets/css/_reset.less')}";`,
        javascriptEnabled: true,
      }
    },
    postcss: {
      plugins: [
        require("autoprefixer")({
          overrideBrowserslist: [
            'last 2 versions', // 所有主流浏览器最近2个版本
          ],
          grid: true
        })
      ]
    }
  },
  resolve: {
    //设置别名
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, '../src'),
      },
      {
        find: 'assets',
        replacement: resolve(__dirname, '../src/assets'),
      }
    ],
    extensions: ['.tsx', '.ts', '.js']
  }
})
