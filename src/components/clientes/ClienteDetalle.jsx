import { useNavigate } from 'react-router-dom';
import { useClienteDetalle } from '../../hooks/useClientes';
import Spinner from '../ui/Spinner';
import ErrorMessage from '../ui/ErrorMessage';
import EmptyState from '../ui/EmptyState';
import { EMOJI_ESPECIE, TEXTOS } from '../../utils/constants';
import { formatEdad, formatPeso, formatFechaCorta } from '../../utils/formatDate';

/**
 * ClienteDetalle
 * Vista completa de un cliente: datos personales + lista de mascotas con historial
 *
 * Props:
 *   id: string — id del cliente a mostrar
 */
const ClienteDetalle = ({ id }) => {
  const navigate = useNavigate();
  const { cliente, loading, error } = useClienteDetalle(id);

  if (loading) return <Spinner texto="Cargando cliente..." />;
  if (error)   return <ErrorMessage mensaje={error} />;
  if (!cliente) return <EmptyState icono="👤" titulo="Cliente no encontrado" />;

  return (
    <div className="space-y-6" data-testid="cliente-detalle">

      {/* Botón volver */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-emerald-700 transition-colors"
      >
        ← Volver
      </button>

      {/* Datos del cliente */}
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

      {/* Mascotas */}
      <div>
        <h3 className="titulo-display text-xl mb-3">Mascotas</h3>

        {!cliente.mascotas?.length ? (
          <EmptyState
            icono="🐾"
            titulo={TEXTOS.SIN_MASCOTAS}
          />
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

/* ── Sub-componentes internos ── */

const Dato = ({ icono, label, valor }) => (
  <div className="flex items-start gap-2">
    <span className="text-base mt-0.5" aria-hidden="true">{icono}</span>
    <div>
      <p className="text-xs text-stone-400 uppercase tracking-wide">{label}</p>
      <p className="text-sm text-stone-700 font-medium">{valor}</p>
    </div>
  </div>
);

const MascotaPanel = ({ mascota }) => (
  <div className="card" data-testid="mascota-panel">
    {/* Cabecera mascota */}
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

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
      <Dato icono="🎂" label="Edad"  valor={formatEdad(mascota.edad)} />
      <Dato icono="⚖️" label="Peso"  valor={formatPeso(mascota.peso)} />
    </div>

    <div className="separador" />

    {/* Historial médico */}
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
