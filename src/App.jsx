import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Navbar   from './components/layout/Navbar';
import Footer   from './components/layout/Footer';

import HomePage          from './pages/HomePage';
import CitasPage         from './pages/CitasPage';
import ClientesPage      from './pages/ClientesPage';
import ClienteDetallePage from './pages/ClienteDetallePage';

import Spinner from './components/ui/Spinner';

import { RUTAS } from './utils/constants';

import './App.css';

// prepararMock — abre la clínica antes de atender al primer paciente,
// activa el guardia de la puerta (msw) para que intercepte las peticiones
// solo en desarrollo — en producción la puerta ya está abierta
const prepararMock = async () => {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass', // deja pasar lo que no es una petición de datos (assets, fuentes, etc.)
    });
  }
};

// app — la estructura completa de la clínica:
// el letrero de entrada (navbar), los pasillos (rutas) y el pie de página (footer)
function App() {

  // mientras el guardia no está en su puesto, no abrimos la puerta al público
  const [mockListo, setMockListo] = useState(!import.meta.env.DEV);

  useEffect(() => {
    prepararMock().then(() => setMockListo(true));
  }, []);

  // sala de espera mientras el sistema arranca — el guardia todavía no llegó
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

        {/* letrero de entrada con las secciones de la clínica */}
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <Routes>

            {/* recepción — página de bienvenida con el resumen del sistema */}
            <Route path={RUTAS.HOME}     element={<HomePage />} />

            {/* sala de agenda — turnos del día con filtro por fecha */}
            <Route path={RUTAS.CITAS}    element={<CitasPage />} />

            {/* archivador — listado completo de tutores registrados */}
            <Route path={RUTAS.CLIENTES} element={<ClientesPage />} />

            {/* expediente — ficha completa de un tutor con sus mascotas */}
            <Route path={`${RUTAS.CLIENTES}/:id`} element={<ClienteDetallePage />} />

            {/* pasillo desconocido — cualquier ruta inválida vuelve a recepción */}
            <Route path="*" element={<Navigate to={RUTAS.HOME} replace />} />

          </Routes>
        </main>

        {/* placa de identificación al pie de la clínica */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;