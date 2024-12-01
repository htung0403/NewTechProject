import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://namphuoc1.edu.vn",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  assetsInclude: ["**/*.JPG"],
  build: {
    rollupOptions: {
      external: [
        // "js-cookie",
        // "react-router-dom",
        // "react-router",
        // "react",
      ],
    },
    chunkSizeWarningLimit: 1000, // Đặt giới hạn lên 1000 kB
  },
});
