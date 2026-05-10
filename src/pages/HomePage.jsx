import { useNavigate } from 'react-router-dom';
import { RUTAS } from '../utils/constants';
import { hoy, formatFecha } from '../utils/formatDate';
import { useGraphQL, QUERY_CLIENTES } from '../hooks/useGraphQL';
import Spinner from '../components/ui/Spinner';

// homepage — la sala de entrada de la clínica,
// muestra el resumen del sistema y los accesos directos a las secciones,
// como el panel de bienvenida en recepción con los números del día
const HomePage = () => {
  const navigate = useNavigate();
  const fechaHoy = hoy();

  // consultamos el resumen vía graphql — como pedirle a recepción
  // cuántos tutores y pacientes hay registrados hoy
  const { data, loading, error } = useGraphQL(QUERY_CLIENTES);
  const clientes = data?.clientes ?? [];

  // totales para el panel de resumen de la clínica
  const totalClientes = clientes.length;
  const totalMascotas = clientes.reduce(
    (acc, c) => acc + (c.mascotas?.length ?? 0), 0
  );

  return (
    <div className="space-y-10">

      {/* hero — el letrero de bienvenida en la puerta de la clínica */}
      <section className="text-center py-10">
        <span className="text-6xl select-none block mb-4" aria-hidden="true">🐾</span>
        <h1 className="titulo-display text-4xl sm:text-5xl mb-3">
          Cuidado Animal
        </h1>
        <p className="text-stone-500 text-base max-w-md mx-auto">
          Sistema de gestión veterinaria — clientes, mascotas y citas en un solo lugar.
        </p>
        <p className="text-stone-400 text-sm mt-2 capitalize">
          {formatFecha(fechaHoy)}
        </p>
      </section>

      {/* panel de resumen — los números del día pegados en el tablero de recepción */}
      <section aria-label="Resumen del sistema" className="max-w-2xl mx-auto">
        <p className="text-xs text-stone-400 uppercase tracking-wide mb-3 text-center">
          Resumen del sistema
        </p>

        {/* buscando los totales en el sistema */}
        {loading && <Spinner texto="Cargando resumen..." />}

        {/* algo salió mal al consultar los totales */}
        {error && (
          <p className="text-sm text-red-400 text-center">
            No se pudo cargar el resumen.
          </p>
        )}

        {/* los dos contadores — tutores y pacientes registrados en la clínica */}
        {!loading && !error && (
          <div className="grid grid-cols-2 gap-4">
            <div className="card text-center" data-testid="resumen-clientes">
              <span className="text-3xl block mb-2" aria-hidden="true">👥</span>
              <p className="titulo-display text-4xl text-emerald-700">{totalClientes}</p>
              <p className="text-stone-400 text-sm mt-1">
                {totalClientes === 1 ? 'cliente registrado' : 'clientes registrados'}
              </p>
            </div>
            <div className="card text-center" data-testid="resumen-mascotas">
              <span className="text-3xl block mb-2" aria-hidden="true">🐾</span>
              <p className="titulo-display text-4xl text-emerald-700">{totalMascotas}</p>
              <p className="text-stone-400 text-sm mt-1">
                {totalMascotas === 1 ? 'mascota registrada' : 'mascotas registradas'}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* accesos directos — los letreros de las salas para ir rápido a cada sección */}
      <section
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
        aria-label="Accesos directos"
      >
        <TarjetaAcceso
          icono="👥"
          titulo="Clientes"
          descripcion="Ver el listado de clientes y sus mascotas registradas"
          onClick={() => navigate(RUTAS.CLIENTES)}
          color="emerald"
        />
        <TarjetaAcceso
          icono="📅"
          titulo="Citas del día"
          descripcion="Consultar las atenciones agendadas y filtrar por fecha"
          onClick={() => navigate(RUTAS.CITAS)}
          color="teal"
        />
      </section>
    </div>
  );
};

// tarjetaacceso — el letrero de cada sala de la clínica,
// al hacer click lleva directo a la sección correspondiente
const TarjetaAcceso = ({ icono, titulo, descripcion, onClick, color }) => {

  // colores según la sección — cada sala tiene su propio color en el panel
  const colores = {
    emerald: 'hover:border-emerald-300 hover:bg-emerald-50/50 group-hover:text-emerald-700',
    teal:    'hover:border-teal-300    hover:bg-teal-50/50    group-hover:text-teal-700',
  };

  return (
    <button
      onClick={onClick}
      className={`
        card group text-left w-full
        border-2 border-transparent transition-all duration-200
        ${colores[color]}
      `}
    >
      <span className="text-4xl block mb-3 select-none" aria-hidden="true">
        {icono}
      </span>
      <h2 className={`titulo-display text-xl mb-1 transition-colors ${colores[color]}`}>
        {titulo}
      </h2>
      <p className="text-stone-400 text-sm">{descripcion}</p>

      {/* flecha — indica que la tarjeta lleva a otro lado de la clínica */}
      <span className="mt-4 inline-block text-sm text-stone-300 group-hover:translate-x-1 transition-transform">
        Ir →
      </span>
    </button>
  );
};

export default HomePage;