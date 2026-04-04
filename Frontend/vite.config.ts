import { defineConfig, mergeConfig } from "vite"
import { defineConfig as defineTestConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from "path"

const viteConfig = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

export default mergeConfig(
  viteConfig,
  defineTestConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/test/setup.ts"],
    },
  })
)