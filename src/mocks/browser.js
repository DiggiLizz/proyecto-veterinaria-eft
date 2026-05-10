import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// el guardia de la clínica — intercepta cada petición que entra
// antes de que llegue al servidor, como el portero que revisa
// si el paciente tiene cita antes de dejarlo pasar a consulta
export const worker = setupWorker(...handlers);