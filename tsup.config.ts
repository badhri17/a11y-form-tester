import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/cli.ts"],
  format: ["esm"],
  platform: "node",
  target: "node18",
  external: ["fast-glob"], // ← tell tsup: don’t bundle it
  banner: { js: "#!/usr/bin/env node" },
  dts: true,
  skipNodeModulesBundle: true, // 🛑  leave every dependency external
  splitting: false, // (optional) single file, easier debug
  outDir: "dist",
});
  