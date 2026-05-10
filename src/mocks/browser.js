import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Service Worker que intercepta las peticiones en el navegador
// Se inicia en main.jsx solo en modo development
export const worker = setupWorker(...handlers);