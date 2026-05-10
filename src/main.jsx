import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css';
import App from './App.jsx';

// prepare — abre la clínica antes de recibir al primer paciente,
// activa el guardia de la puerta (msw) solo en desarrollo
// para que intercepte las peticiones desde el primer momento
async function prepare() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }
}

// arrancamos la clínica — primero el guardia, luego abrimos la puerta al público
prepare().then(() => {
  createRoot(document.getElementById('root')).render(

    // provider — el cerebro central (redux) disponible en toda la clínica
    <Provider store={store}>
      <App />
    </Provider>
  );
});