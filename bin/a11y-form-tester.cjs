#!/usr/bin/env node
import("../dist/cli.js") // ← change .cjs ➜ .mjs
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
