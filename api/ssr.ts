import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const config = {
  runtime: 'nodejs',
  includeFiles: ['dist/**'],
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

export default async function handler(
  req: { url?: string; headers?: Record<string, string | string[] | undefined> },
  res: { statusCode: number; setHeader: (k: string, v: string) => void; end: (b?: string) => void }
) {
  try {
    const userAgent = req.headers?.['user-agent'] || '';
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(
      Array.isArray(userAgent) ? userAgent.join(' ') : userAgent
    );
    const templatePath = path.join(rootDir, 'dist/client/index.html');
    let template = fs.readFileSync(templatePath, 'utf-8');
    const serverEntryPath = path.join(rootDir, 'dist/server/entry-server.js');
    const { render } = await import(pathToFileURL(serverEntryPath).href);
    const appHtml = render(isMobile);
    const stateScript = `<script>window.__INITIAL_IS_MOBILE__ = ${JSON.stringify(isMobile)};</script>`;
    template = template.replace('<!--app-html-->', appHtml);
    const html = template.replace('<!--app-state-->', stateScript);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end((error as Error).stack || 'SSR render error');
  }
}
