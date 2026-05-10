import { NavLink } from 'react-router-dom';
import { RUTAS } from '../../utils/constants';

// navbar — el letrero de entrada de la clínica con las secciones disponibles,
// como el panel de direcciones que indica dónde está recepción, consultas y agenda
const Navbar = () => {

  // estilo base de cada sección del panel — cómo se ve un letrero sin seleccionar
  const linkBase = `
    relative px-4 py-1.5 text-sm font-medium rounded-lg
    transition-all duration-150
    text-stone-500 hover:text-emerald-700 hover:bg-emerald-50
  `;

  // estilo de la sección activa — el letrero iluminado que indica dónde estás
  const linkActivo = `
    text-emerald-700 bg-emerald-50
  `;

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-stone-100">
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
        aria-label="Navegación principal"
      >
        {/* logo — la huella en la puerta principal, vuelve al inicio al hacer click */}
        <NavLink
          to={RUTAS.HOME}
          className="flex items-center gap-2 group"
          aria-label="Ir al inicio"
        >
          <span className="text-2xl select-none" aria-hidden="true">🐾</span>
          <span className="titulo-display text-xl text-stone-800 group-hover:text-emerald-700 transition-colors">
            Cuidado Animal
          </span>
        </NavLink>

        {/* panel de secciones — los letreros que indican las áreas de la clínica */}
        <div className="flex items-center gap-1">

          {/* acceso al archivador de tutores y sus pacientes */}
          <NavLink
            to={RUTAS.CLIENTES}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActivo : ''}`
            }
          >
            Clientes
          </NavLink>

          {/* acceso a la agenda de turnos del día */}
          <NavLink
            to={RUTAS.CITAS}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActivo : ''}`
            }
          >
            Citas
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;