import MascotaCard from './MascotaCard';
import EmptyState from '../ui/EmptyState';
import { TEXTOS } from '../../utils/constants';

// mascotaslist — la sala de espera con todos los pacientes de un tutor,
// recibe las mascotas ya cargadas desde el cliente, no busca nada por su cuenta
const MascotasList = ({ mascotas = [], onSelectMascota }) => {

  // el tutor existe pero no tiene pacientes registrados en la clínica
  if (!mascotas.length) {
    return (
      <EmptyState
        icono="🐾"
        titulo={TEXTOS.SIN_MASCOTAS}
        mensaje="Este cliente no tiene mascotas registradas"
      />
    );
  }

  return (
    <section aria-label="Mascotas del cliente">

      {/* contador de pacientes — cuántas mascotas tiene registradas este tutor */}
      <p className="text-sm text-stone-400 mb-3">
        {mascotas.length} {mascotas.length === 1 ? 'mascota' : 'mascotas'}
      </p>

      {/* grilla de fichas — una etiqueta por cada paciente del tutor */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mascotas.map((mascota) => (
          <MascotaCard
            key={mascota.id}
            mascota={mascota}
            // si viene un selector, la tarjeta abre la ficha completa al hacer click
            onClick={onSelectMascota ? () => onSelectMascota(mascota) : undefined}
          />
        ))}
      </div>
    </section>
  );
};

export default MascotasList;