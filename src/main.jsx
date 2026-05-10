import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css';
import App from './App.jsx';

async function prepare() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }
}

prepare().then(() => {
  createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});