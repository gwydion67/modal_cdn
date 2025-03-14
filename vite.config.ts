import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "./src/lib/cdn-entry.tsx"),
      name: "MyModalComponent",
      fileName: "modal-cdn",
      formats: ["umd", "es"],
    },
  },
});
