import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node", // no DOM needed for most unit tests
    clearMocks: true,
    globals: true,
    coverage: {
      reporter: ["text", "html"],
    },
  },
});
