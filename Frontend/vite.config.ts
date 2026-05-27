import { defineConfig, loadEnv, createLogger } from 'vite';
import react from '@vitejs/plugin-react';

const WS_PROXY_ERRORS = /ECONNRESET|ECONNABORTED/;

const logger = createLogger();
const originalError = logger.error.bind(logger);
logger.error = (msg, opts) => {
  if (msg.includes('ws proxy socket error') && WS_PROXY_ERRORS.test(msg)) return;
  originalError(msg, opts);
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const backend = env.VITE_BACKEND_URL ?? 'http://localhost:3000';

  return {
    customLogger: logger,
    plugins: [react()],
    server: {
      proxy: {
        '/api':      { target: backend, changeOrigin: true },
        '/socket.io': { target: backend, ws: true, changeOrigin: true },
      },
    },
  };
});
