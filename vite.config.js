import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "src",
  build: {
    // The outDir option sets the output directory for the build
    outDir: '../dist',
    // If you have additional build options or requirements, set them here
    // For example, setting emptyOutDir to false will prevent Vite from clearing the directory on each build
    emptyOutDir: true,
  },
});