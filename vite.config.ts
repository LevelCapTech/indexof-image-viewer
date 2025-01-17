import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, // 0.0.0.0 をバインド
    port: 5173, // ポート番号を指定（デフォルトは 5173）
    strictPort: true, // ポートが使用中ならエラーを出す
    hmr: {               // ホットリロードの設定
      protocol: 'ws',    // WebSocket プロトコルを指定
      host: 'localhost', // 使用するホスト名
    },
    proxy: {
      '/sd': { // プロキシ設定
        target: 'http://192.168.10.85', // 実際のサーバーURL
        changeOrigin: true,            // オリジンを偽装
        rewrite: (path) => path.replace(/^\/sd/, '/sd') // パス書き換え
      },
      '/fastapi': { // プロキシ設定
        target: 'http://192.168.10.85', // 実際のサーバーURL
        changeOrigin: true,            // オリジンを偽装
        rewrite: (path) => path.replace(/^\/fastapi/, '/fastapi') // パス書き換え
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // しきい値を 1000KB に設定
  },
})
