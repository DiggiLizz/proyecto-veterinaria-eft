import Badge from '../ui/Badge';
import { EMOJI_ESPECIE } from '../../utils/constants';
import { formatHora } from '../../utils/formatDate';

/**
 * CitaCard
 * Tarjeta de una cita agendada
 * Muestra: hora, mascota, dueño y veterinario
 *
 * Props:
 *   cita: objeto Cita con mascota, cliente y veterinario embebidos
 */
const CitaCard = ({ cita }) => {
  const emojiEspecie = EMOJI_ESPECIE[cita.mascota?.especie] ?? '🐾';

  return (
    <article
      className="card flex flex-col gap-3"
      data-testid="cita-card"
    >
      {/* Fila superior: hora y estado */}
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-emerald-700 tracking-tight">
          {formatHora(cita.hora)}
        </span>
        <Badge estado={cita.estado} size="sm" />
      </div>

      <div className="separador" />

      {/* Mascota */}
      <div className="flex items-center gap-2">
        <span className="text-xl select-none" aria-hidden="true">
          {emojiEspecie}
        </span>
        <div className="min-w-0">
          <p className="text-xs text-stone-400 uppercase tracking-wide">Mascota</p>
          <p className="text-sm font-semibold text-stone-700 truncate">
            {cita.mascota?.nombre ?? '—'}
          </p>
          <p className="text-xs text-stone-400 truncate">
            {cita.mascota?.especie}
            {cita.mascota?.raza ? ` · ${cita.mascota.raza}` : ''}
          </p>
        </div>
      </div>

      {/* Dueño */}
      <div className="flex items-center gap-2">
        <span className="text-xl select-none" aria-hidden="true">👤</span>
        <div className="min-w-0">
          <p className="text-xs text-stone-400 uppercase tracking-wide">Dueño</p>
          <p className="text-sm font-semibold text-stone-700 truncate">
            {cita.cliente?.nombre ?? '—'}
          </p>
          <p className="text-xs text-stone-400 truncate">
            {cita.cliente?.telefono}
          </p>
        </div>
      </div>

      {/* Veterinario */}
      <div className="flex items-center gap-2">
        <span className="text-xl select-none" aria-hidden="true">🩺</span>
        <div className="min-w-0">
          <p className="text-xs text-stone-400 uppercase tracking-wide">Veterinario</p>
          <p className="text-sm font-semibold text-stone-700 truncate">
            {cita.veterinario?.nombre ?? '—'}
          </p>
          <p className="text-xs text-stone-400 truncate">
            {cita.veterinario?.especialidad}
          </p>
        </div>
      </div>

      {/* Motivo si existe */}
      {cita.motivo && (
        <>
          <div className="separador" />
          <p className="text-xs text-stone-500 italic">
            <span className="font-semibold not-italic text-stone-600">Motivo: </span>
            {cita.motivo}
          </p>
        </>
      )}

      {/* Notas si existen */}
      {cita.notas && (
        <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
          📌 {cita.notas}
        </p>
      )}
    </article>
  );
};

export default CitaCard;
