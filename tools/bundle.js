#!/usr/bin/env node
/*
 * Inline the stylesheet and every script into one self-contained page:
 *
 *   node tools/bundle.js   ->   dist/my-lesko-zone.html
 *
 * The result is a single file you can email, drop on any static host, or open
 * straight from a USB stick. Handy for showing the mock-up somewhere with no
 * wifi. Zero dependencies.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "dist");
const OUT = path.join(OUT_DIR, "my-lesko-zone.html");

const SCRIPTS = [
  "assets/js/seed.js",
  "assets/js/store.js",
  "assets/js/views.js",
  "assets/js/app.js",
];

const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

let html = read("index.html");

html = html.replace(
  '<link rel="stylesheet" href="assets/css/app.css" />',
  "<style>\n" + read("assets/css/app.css") + "\n</style>"
);

for (const src of SCRIPTS) {
  html = html.replace(
    '<script src="' + src + '"></script>',
    "<script>\n" + read(src) + "\n</script>"
  );
}

if (html.includes("assets/js") || html.includes("assets/css")) {
  console.error("Bundle failed: something was not inlined.");
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT, html);

console.log(
  "Wrote " +
    path.relative(ROOT, OUT) +
    " (" +
    Math.round(fs.statSync(OUT).size / 1024) +
    " KB)"
);
