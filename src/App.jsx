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

/**
 * App
 * Punto de entrada de la aplicación.
 * Inicializa MSW en desarrollo antes de renderizar las rutas,
 * para garantizar que los handlers estén activos desde la primera petición.
 */

const prepararMock = async () => {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass', // deja pasar peticiones no interceptadas (assets, etc.)
    });
  }
};

function App() {
  const [mockListo, setMockListo] = useState(!import.meta.env.DEV);

  useEffect(() => {
    prepararMock().then(() => setMockListo(true));
  }, []);

  // Mientras MSW no esté listo no renderizamos nada para evitar
  // peticiones que lleguen antes de que los handlers estén activos
  if (!mockListo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Spinner texto="Iniciando sistema..." />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-stone-50">

        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            {/* Página principal */}
            <Route path={RUTAS.HOME}     element={<HomePage />} />

            {/* Citas del día */}
            <Route path={RUTAS.CITAS}    element={<CitasPage />} />

            {/* Listado de clientes */}
            <Route path={RUTAS.CLIENTES} element={<ClientesPage />} />

            {/* Detalle de un cliente */}
            <Route path={`${RUTAS.CLIENTES}/:id`} element={<ClienteDetallePage />} />

            {/* Cualquier ruta desconocida redirige al home */}
            <Route path="*" element={<Navigate to={RUTAS.HOME} replace />} />
          </Routes>
        </main>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;