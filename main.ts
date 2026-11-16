import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { buildDossier } from './vendor/makefun-frontend.ts';

const root = dirname(fileURLToPath(import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR || '/output';
mkdirSync(out);
cpSync(join(root, 'app'), join(out, 'app'), { recursive: true });
const shots = join(root, 'screenshots');
if (existsSync(shots)) cpSync(shots, join(out, 'screenshots'), { recursive: true });
else mkdirSync(join(out, 'screenshots'));
writeFileSync(join(out, 'dossier.json'), buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 3, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }));
