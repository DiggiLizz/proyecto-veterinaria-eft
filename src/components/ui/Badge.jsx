import { COLORES_ESTADO, LABELS_ESTADO } from '../../utils/constants';

/**
 * Badge
 * Pastilla de estado para las citas
 *
 * Props:
 *   estado: 'pendiente' | 'confirmada' | 'completada' | 'cancelada'
 *   size:   'sm' | 'md' (default 'md')
 */
const Badge = ({ estado, size = 'md' }) => {
  const colorClass = COLORES_ESTADO[estado] ?? 'bg-gray-100 text-gray-700';
  const label = LABELS_ESTADO[estado] ?? estado;

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
