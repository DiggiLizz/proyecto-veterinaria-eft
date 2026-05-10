import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import HomePage from './pages/HomePage';
import CitasPage from './pages/CitasPage';
import ClientesPage from './pages/ClientesPage';
import ClienteDetallePage from './pages/ClienteDetallePage';

import { RUTAS } from './utils/constants';

import './App.css';

// app — la estructura de la clínica.
function App() {

  // Detectamos si estamos en la sucursal de GitHub Pages para guiar a React Router
  const isGitHubPages = window.location.hostname.includes('github.io');
  const baseFolder = isGitHubPages ? '/proyecto-veterinaria-eft' : '/';

  return (
    <BrowserRouter basename={baseFolder}>
      <div className="min-h-screen flex flex-col bg-stone-50">
        
        {/* letrero de entrada con las secciones de la clínica */}
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            {/* recepción — página de bienvenida con el resumen del sistema */}
            <Route path={RUTAS.HOME} element={<HomePage />} />

            {/* sala de agenda — turnos del día con filtro por fecha */}
            <Route path={RUTAS.CITAS} element={<CitasPage />} />

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