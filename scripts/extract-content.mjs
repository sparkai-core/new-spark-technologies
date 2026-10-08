import { createRequire } from "module";
import { register } from "node:module";
import { pathToFileURL } from "node:url";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

// Use tsx programmatic via dynamic import of .ts through child is hard;
// parse the compiled approach: spawn note — instead read JSON we build by importing via tsx CLI separately.

console.log("Use extract-content.ts with tsx");
