import { EMOJI_ESPECIE } from '../../utils/constants';
import { formatEdad, formatPeso } from '../../utils/formatDate';

/**
 * MascotaCard
 * Tarjeta resumen de una mascota
 * Se usa dentro de listas — no navega, solo muestra datos
 *
 * Props:
 *   mascota:  objeto Mascota
 *   onClick:  función opcional — si se pasa, la card es clickeable
 */
const MascotaCard = ({ mascota, onClick }) => {
  const esClickeable = typeof onClick === 'function';

  return (
    <article
      className={`card ${esClickeable ? 'cursor-pointer group' : ''}`}
      onClick={esClickeable ? onClick : undefined}
      data-testid="mascota-card"
    >
      {/* Cabecera */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl select-none" aria-hidden="true">
          {EMOJI_ESPECIE[mascota.especie] ?? '🐾'}
        </span>
        <div className="min-w-0">
          <h4
            className={`titulo-display text-lg leading-tight truncate
              ${esClickeable ? 'group-hover:text-emerald-700 transition-colors' : ''}`}
          >
            {mascota.nombre}
          </h4>
          <p className="text-stone-400 text-xs truncate">
            {mascota.especie}{mascota.raza ? ` · ${mascota.raza}` : ''}
          </p>
        </div>
      </div>

      <div className="separador" />

      {/* Datos físicos */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <Dato icono="🎂" label="Edad"  valor={formatEdad(mascota.edad)} />
        <Dato icono="⚖️" label="Peso"  valor={formatPeso(mascota.peso)} />
      </div>

      {/* Cantidad entradas historial */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-stone-400">
          {mascota.historialMedico?.length ?? 0}{' '}
          {mascota.historialMedico?.length === 1 ? 'entrada' : 'entradas'} en historial
        </span>
        {esClickeable && (
          <span className="text-stone-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all text-sm">
            Ver →
          </span>
        )}
      </div>
    </article>
  );
};

const Dato = ({ icono, label, valor }) => (
  <div className="flex items-start gap-1.5">
    <span className="text-sm mt-0.5" aria-hidden="true">{icono}</span>
    <div>
      <p className="text-xs text-stone-400 uppercase tracking-wide">{label}</p>
      <p className="text-sm text-stone-700 font-medium">{valor}</p>
    </div>
  </div>
);

export default MascotaCard;
