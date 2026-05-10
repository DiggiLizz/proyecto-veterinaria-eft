import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css';
import App from './App.jsx';

// La función prepare aquí debe ser idéntica a la de App.jsx para consistencia
async function prepare() {
  const isGitHubPages = window.location.hostname.includes('github.io');
  
  if (import.meta.env.DEV || isGitHubPages) {
    const { worker } = await import('./mocks/browser');
    return worker.start({ 
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: isGitHubPages 
          ? '/proyecto-veterinaria-eft/mockServiceWorker.js' 
          : '/mockServiceWorker.js'
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