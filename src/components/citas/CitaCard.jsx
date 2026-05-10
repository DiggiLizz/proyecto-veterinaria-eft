import Badge from '../ui/Badge';
import { EMOJI_ESPECIE } from '../../utils/constants';
import { formatHora } from '../../utils/formatDate';

// citacard — la ficha de turno que se pega en la puerta de la sala de espera,
// muestra todo lo que el veterinario necesita saber antes de llamar al paciente:
// a qué hora llega, quién es la mascota, quién es el tutor y quién la atiende
const CitaCard = ({ cita }) => {

  // si la especie no está en el diccionario, usamos la huella genérica
  const emojiEspecie = EMOJI_ESPECIE[cita.mascota?.especie] ?? '🐾';

  return (
    <article
      className="card flex flex-col gap-3"
      data-testid="cita-card"
    >
      {/* hora de llegada y estado del turno — lo primero que mira la recepcionista */}
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-emerald-700 tracking-tight">
          {formatHora(cita.hora)}
        </span>
        <Badge estado={cita.estado} size="sm" />
      </div>

      <div className="separador" />

      {/* paciente — especie, nombre y raza, como la etiqueta de la jaula */}
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

      {/* tutor — quien firma el consentimiento y paga la consulta */}
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

      {/* médico a cargo — el que tiene el estetoscopio ese día */}
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

      {/* motivo de consulta — el "¿qué le pasa hoy?" de la anamnesis */}
      {cita.motivo && (
        <>
          <div className="separador" />
          <p className="text-xs text-stone-500 italic">
            <span className="font-semibold not-italic text-stone-600">Motivo: </span>
            {cita.motivo}
          </p>
        </>
      )}

      {/* notas clínicas — observaciones que el vet dejó en el expediente */}
      {cita.notas && (
        <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
          📌 {cita.notas}
        </p>
      )}
    </article>
  );
};

export default CitaCard;