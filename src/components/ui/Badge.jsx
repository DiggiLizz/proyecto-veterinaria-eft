import { COLORES_ESTADO, LABELS_ESTADO } from '../../utils/constants';

// badge — el sticker de color que se pega en la ficha de la cita,
// indica de un vistazo si el turno está pendiente, confirmado, completado o cancelado
const Badge = ({ estado, size = 'md' }) => {

  // color según el estado — como los stickers de colores del archivador:
  // verde para confirmada, gris para pendiente, rojo para cancelada
  const colorClass = COLORES_ESTADO[estado] ?? 'bg-gray-100 text-gray-700';

  // texto legible del estado — lo que dice el sticker
  const label = LABELS_ESTADO[estado] ?? estado;

  // tamaño del sticker — sm para las tarjetas, md para vistas más amplias
  const sizeClass = size === 'sm'
    ? 'px-2 py-0.5 text-xs'
    : 'px-3 py-1 text-sm';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${sizeClass} ${colorClass}`}
    >
      {label}
    </span>
  );
};

export default Badge;