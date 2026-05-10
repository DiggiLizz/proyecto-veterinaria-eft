import { useNavigate } from 'react-router-dom';
import { useClienteDetalle } from '../../hooks/useClientes';
import Spinner from '../ui/Spinner';
import ErrorMessage from '../ui/ErrorMessage';
import EmptyState from '../ui/EmptyState';
import { EMOJI_ESPECIE, TEXTOS } from '../../utils/constants';
import { formatEdad, formatPeso, formatFechaCorta } from '../../utils/formatDate';

// clientedetalle — el expediente completo del tutor,
// incluye sus datos personales y todas las fichas clínicas
// de sus mascotas con el historial médico de cada una
const ClienteDetalle = ({ id }) => {
  const navigate = useNavigate();
  const { cliente, loading, error } = useClienteDetalle(id);

  // mientras se busca el expediente en el archivador
  if (loading) return <Spinner texto="Cargando cliente..." />;

  // si algo salió mal al buscar la ficha
  if (error)   return <ErrorMessage mensaje={error} />;

  // si el tutor no existe en el sistema
  if (!cliente) return <EmptyState icono="👤" titulo="Cliente no encontrado" />;

  return (
    <div className="space-y-6" data-testid="cliente-detalle">

      {/* botón volver — como cerrar el expediente y devolverlo al archivador */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-emerald-700 transition-colors"
      >
        ← Volver
      </button>

      {/* ficha del tutor — datos personales y de contacto */}
      <div className="card">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="titulo-display text-2xl">{cliente.nombre}</h2>
            <p className="text-stone-400 text-sm mt-0.5">{cliente.email}</p>
          </div>
          <span className="bg-emerald-50 text-emerald-700 text-sm font-semibold px-3 py-1 rounded-full">
            Cliente
          </span>
        </div>

        <div className="separador" />

        {/* grilla de datos — los campos de la ficha de anamnesis del tutor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Dato icono="📞" label="Teléfono" valor={cliente.telefono} />
          <Dato icono="📧" label="Email" valor={cliente.email || '—'} />
          <Dato icono="📍" label="Dirección" valor={cliente.direccion} />
          <Dato
            icono="🐾"
            label="Mascotas"
            valor={`${cliente.mascotas?.length ?? 0} registradas`}
          />
        </div>
      </div>

      {/* lista de pacientes — todas las mascotas registradas bajo este tutor */}
      <div>
        <h3 className="titulo-display text-xl mb-3">Mascotas</h3>

        {!cliente.mascotas?.length ? (
          <EmptyState icono="🐾" titulo={TEXTOS.SIN_MASCOTAS} />
        ) : (
          <div className="space-y-4">
            {cliente.mascotas.map((mascota) => (
              <MascotaPanel key={mascota.id} mascota={mascota} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


// dato — un campo individual de la ficha, como una línea del formulario de ingreso
const Dato = ({ icono, label, valor }) => (
  <div className="flex items-start gap-2">
    <span className="text-base mt-0.5" aria-hidden="true">{icono}</span>
    <div>
      <p className="text-xs text-stone-400 uppercase tracking-wide">{label}</p>
      <p className="text-sm text-stone-700 font-medium">{valor}</p>
    </div>
  </div>
);

// mascotapanel — la ficha clínica individual de un paciente,
// con sus datos básicos y el historial médico completo
const MascotaPanel = ({ mascota }) => (
  <div className="card" data-testid="mascota-panel">

    {/* encabezado del paciente — especie, nombre y raza */}
    <div className="flex items-center gap-3 mb-4">
      <span className="text-3xl" aria-hidden="true">
        {EMOJI_ESPECIE[mascota.especie] ?? '🐾'}
      </span>
      <div>
        <h4 className="titulo-display text-lg leading-tight">{mascota.nombre}</h4>
        <p className="text-stone-400 text-xs">
          {mascota.especie} {mascota.raza ? `· ${mascota.raza}` : ''}
        </p>
      </div>
    </div>

    {/* datos clínicos básicos — edad y peso, los primeros que anota el vet */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
      <Dato icono="🎂" label="Edad" valor={formatEdad(mascota.edad)} />
      <Dato icono="⚖️" label="Peso" valor={formatPeso(mascota.peso)} />
    </div>

    <div className="separador" />

    {/* historial médico — el registro de todas las consultas anteriores,
        como las páginas anteriores del cuaderno clínico del paciente */}
    <div>
      <p className="text-xs text-stone-400 uppercase tracking-wide mb-3">
        Historial médico
      </p>

      {!mascota.historialMedico?.length ? (
        <p className="text-sm text-stone-400 italic">{TEXTOS.SIN_HISTORIAL}</p>
      ) : (
        <div className="space-y-3">
          {mascota.historialMedico.map((entrada, i) => (
            <EntradaHistorial key={i} entrada={entrada} />
          ))}
        </div>
      )}
    </div>
  </div>
);

// entradahistorial — una consulta pasada en el cuaderno clínico,
// fecha, veterinario que atendió, diagnóstico y tratamiento indicado
const EntradaHistorial = ({ entrada }) => (
  <div className="bg-stone-50 rounded-xl p-3 border border-stone-100">
    <div className="flex items-center justify-between mb-1">
      <span className="text-xs font-semibold text-emerald-700">
        {formatFechaCorta(entrada.fecha)}
      </span>
      {entrada.veterinario && (
        <span className="text-xs text-stone-400">{entrada.veterinario}</span>
      )}
    </div>
    <p className="text-sm text-stone-700 font-medium mb-1">{entrada.descripcion}</p>
    {entrada.diagnostico && (
      <p className="text-xs text-stone-500">
        <span className="font-medium">Diagnóstico:</span> {entrada.diagnostico}
      </p>
    )}
    {entrada.tratamiento && (
      <p className="text-xs text-stone-500">
        <span className="font-medium">Tratamiento:</span> {entrada.tratamiento}
      </p>
    )}
  </div>
);

export default ClienteDetalle;