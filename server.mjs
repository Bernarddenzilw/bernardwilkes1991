// server.mjs
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = createServer(async (req, res) => {
  try {
    let filePath = req.url === '/' ? '/index.html' : req.url;
    const ext = extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    const fileContent = await readFile(join(__dirname, filePath));
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fileContent);
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Page Not Found</h1>');
    } else {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>500 - Internal Server Error</h1>');
    }
  }
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('🌟 Bernard Denzil Wilkes - Luxurious Personal Website');
  console.log('📍 Server running at http://127.0.0.1:3000');
  console.log('✨ Where technology, consciousness, and innovation converge');
});

// run with `node server.mjs`
