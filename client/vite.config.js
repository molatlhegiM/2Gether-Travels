import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // maps @ to src
    },
  },
  base: "/<repo-name>/", // <-- replace <repo-name> with your GitHub repo name if deploying to GH Pages
});

