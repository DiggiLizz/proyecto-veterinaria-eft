import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import HomePage from './pages/HomePage';
import CitasPage from './pages/CitasPage';
import ClientesPage from './pages/ClientesPage';
import ClienteDetallePage from './pages/ClienteDetallePage';

import Spinner from './components/ui/Spinner';

import { RUTAS } from './utils/constants';

import './App.css';

// prepararMock — abre la clínica y activa el guardia de la puerta (msw)
// ahora detecta si estamos en el laboratorio (dev) o en la sede central (github pages)
const prepararMock = async () => {
  const isGitHubPages = window.location.hostname.includes('github.io');
  
  // el guardia debe trabajar en desarrollo O en el entorno de GitHub
  if (import.meta.env.DEV || isGitHubPages) {
    const { worker } = await import('./mocks/browser');
    
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        // En GitHub Pages la ruta debe incluir el nombre del repositorio
        url: isGitHubPages 
          ? '/proyecto-veterinaria-eft/mockServiceWorker.js' 
          : '/mockServiceWorker.js'
      }
    });
  }
};

function App() {
  // Solo mostramos la sala de espera si estamos en un entorno que requiere Mocks
  const requiereMock = import.meta.env.DEV || window.location.hostname.includes('github.io');
  const [mockListo, setMockListo] = useState(!requiereMock);

  useEffect(() => {
    if (requiereMock) {
      prepararMock().then(() => setMockListo(true));
    }
  }, [requiereMock]);

  if (!mockListo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Spinner texto="Iniciando sistema médico..." />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-stone-50">
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path={RUTAS.HOME} element={<HomePage />} />
            <Route path={RUTAS.CITAS} element={<CitasPage />} />
            <Route path={RUTAS.CLIENTES} element={<ClientesPage />} />
            <Route path={`${RUTAS.CLIENTES}/:id`} element={<ClienteDetallePage />} />
            <Route path="*" element={<Navigate to={RUTAS.HOME} replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;