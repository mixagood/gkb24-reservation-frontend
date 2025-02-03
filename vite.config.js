import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Каталог для финальной сборки
    assetsDir: 'assets', // Папка для JS/CSS
    sourcemap: false, // Можно включить для отладки (true)
    minify: 'esbuild', // Минификация кода (esbuild быстрее, чем terser)
  },
  server: {
    host: true, // Доступ из локальной сети
    port: 5173, // Можно изменить, если нужно
  },
  base: '/myapp/', // ВАЖНО! Укажите путь к поддиректории
});
