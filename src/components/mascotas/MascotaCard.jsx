import { EMOJI_ESPECIE } from '../../utils/constants';
import { formatEdad, formatPeso } from '../../utils/formatDate';

// mascotacard — la etiqueta de la jaula o la solapa de la ficha clínica,
// muestra un resumen rápido del paciente sin abrir el expediente completo
const MascotaCard = ({ mascota, onClick }) => {

  // si viene un onClick, la tarjeta se puede presionar como un botón del panel
  const esClickeable = typeof onClick === 'function';

  return (
    <article
      className={`card ${esClickeable ? 'cursor-pointer group' : ''}`}
      onClick={esClickeable ? onClick : undefined}
      data-testid="mascota-card"
    >
      {/* encabezado — especie, nombre y raza, lo primero que ve el vet al revisar */}
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

      {/* datos físicos — edad y peso, los primeros que anota el vet en la consulta */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <Dato icono="🎂" label="Edad" valor={formatEdad(mascota.edad)} />
        <Dato icono="⚖️" label="Peso" valor={formatPeso(mascota.peso)} />
      </div>

      {/* contador del historial — cuántas consultas previas tiene el paciente */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-stone-400">
          {mascota.historialMedico?.length ?? 0}{' '}
          {mascota.historialMedico?.length === 1 ? 'entrada' : 'entradas'} en historial
        </span>

        {/* flecha — solo aparece si la tarjeta lleva a algún lado */}
        {esClickeable && (
          <span className="text-stone-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all text-sm">
            Ver →
          </span>
        )}
      </div>
    </article>
  );
};

// dato — un campo de la ficha física del paciente, icono, label y valor
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