import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const LOCAL_DEV_PORT = 5193;
const BUILD_OUTPUT_DIR = "dist";
const JAVASCRIPT_TARGET = "es2022";

const projectRootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: "./",
  plugins: [tailwindcss()],
  server: {
    port: LOCAL_DEV_PORT,
  },
  build: {
    outDir: BUILD_OUTPUT_DIR,
    target: JAVASCRIPT_TARGET,
    rollupOptions: {
      input: {
        landing: resolve(projectRootDir, "index.html"),
        components: resolve(projectRootDir, "components/index.html"),
      },
    },
  },
});
