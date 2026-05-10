import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css';
import App from './App.jsx';

async function prepare() {
  const isGitHubPages = window.location.hostname.includes('github.io');
  const baseUrl = import.meta.env.BASE_URL; // El GPS inteligente de Vite
  
  if (import.meta.env.DEV || isGitHubPages) {
    const { worker } = await import('./mocks/browser');
    return worker.start({ 
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        // Concatenamos la base (que ya trae la barra final) con el archivo
        url: `${baseUrl}mockServiceWorker.js` 
      }
    });
  }
}

prepare().then(() => {
  createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});