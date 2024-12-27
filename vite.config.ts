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
    }
  }
})
