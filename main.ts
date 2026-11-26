// Nusantara Stats — the hand-in program (Node 22, standard library only).
//
// The site is the plain static files in app/ beside this file: index.html
// plus its modules, stylesheet and data, all local, no network. This program
// copies app/ and screenshots/ into the output directory and writes
// dossier.json there with the vendored make.fun library, exactly as the
// scorer rebuilds it. vendor/makefun-frontend.ts is the kit's copy, never
// edited: the scorer requires the dossier to be byte for byte what its own
// copy writes.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Fail fast with a readable message instead of a bare copy error when the
// site folder is missing (the grader always ships app/ beside this file).
if (!existsSync(join(here, 'app'))) {
  throw new Error('app/ not found beside main.ts — nothing to hand in');
}

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// The scorer's own caps: only text_max_bytes shapes the bytes; the others
// refuse an entry the scorer would refuse (more than 4 screenshots or one
// over 256 KiB; more than 993 files and directories in app/ or 16 MiB of
// app files).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);
