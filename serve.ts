import { createServer } from 'node:http';
import { readFile, realpath } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, extname, join, sep } from 'node:path';

const root = await realpath(join(dirname(fileURLToPath(import.meta.url)), 'app'));
const types: Record<string, string> = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml' };
const args = process.argv.slice(2), i = args.indexOf('--port');
const port = Number(i >= 0 ? args[i + 1] : 8080);
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname);
    const target = await realpath(join(root, pathname === '/' ? 'index.html' : pathname.slice(1)));
    if (target !== root && !target.startsWith(root + sep)) throw new Error('outside app');
    const body = await readFile(target);
    res.writeHead(200, { 'content-type': types[extname(target)] || 'application/octet-stream', 'cache-control': 'no-store' });
    res.end(body);
  } catch { res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' }); res.end('Not found'); }
}).listen(port, '0.0.0.0');
