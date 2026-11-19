import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Project pages are served from /<repo>/; dev stays at the root.
export default defineConfig(({ command, isPreview }) => ({
  base: command === "build" || isPreview ? "/ArchisDev/" : "/",
  plugins: [react()],
  build: {
    target: "es2022",
    cssCodeSplit: true,
  },
}));
