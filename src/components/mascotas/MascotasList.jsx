import MascotaCard from './MascotaCard';
import EmptyState from '../ui/EmptyState';
import { TEXTOS } from '../../utils/constants';

/**
 * MascotasList
 * Renderiza una grilla de MascotaCard a partir de un array
 * No hace fetch — recibe las mascotas como prop (vienen del cliente)
 *
 * Props:
 *   mascotas:        array de objetos Mascota
 *   onSelectMascota: función opcional — recibe la mascota al hacer click
 */
const MascotasList = ({ mascotas = [], onSelectMascota }) => {
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
      <p className="text-sm text-stone-400 mb-3">
        {mascotas.length} {mascotas.length === 1 ? 'mascota' : 'mascotas'}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mascotas.map((mascota) => (
          <MascotaCard
            key={mascota.id}
            mascota={mascota}
            onClick={onSelectMascota ? () => onSelectMascota(mascota) : undefined}
          />
        ))}
      </div>
    </section>
  );
};

export default MascotasList;
