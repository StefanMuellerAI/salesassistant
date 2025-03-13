import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import type { Connect } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'markdown-server',
      configureServer(server) {
        server.middlewares.use((req: Connect.IncomingMessage, res: any, next: Connect.NextFunction) => {
          if (req.url?.startsWith('/server/')) {
            try {
              const filePath = join(__dirname, req.url);
              if (fs.existsSync(filePath)) {
                res.setHeader('Content-Type', 'text/markdown');
                res.end(fs.readFileSync(filePath, 'utf-8'));
                return;
              }
            } catch (error) {
              console.error('Error serving markdown file:', error);
            }
          }
          next();
        });
      },
    },
    {
      name: 'copy-markdown-files',
      apply: 'build',
      enforce: 'post',
      closeBundle() {
        const serverDir = join(__dirname, 'server');
        const distServerDir = join(__dirname, 'dist', 'server');
        
        // Erstelle das Zielverzeichnis, falls es nicht existiert
        if (!fs.existsSync(distServerDir)) {
          fs.mkdirSync(distServerDir, { recursive: true });
        }
        
        // Kopiere die Markdown-Dateien
        const files = fs.readdirSync(serverDir);
        for (const file of files) {
          if (file.endsWith('.md')) {
            fs.copyFileSync(
              join(serverDir, file),
              join(distServerDir, file)
            );
            console.log(`Copied ${file} to dist/server/`);
          }
        }
      }
    }
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
    fs: {
      allow: ['..'],
    },
  },
});
