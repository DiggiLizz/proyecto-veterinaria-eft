import { useNavigate } from 'react-router-dom';
import { RUTAS } from '../../utils/constants';
import { EMOJI_ESPECIE } from '../../utils/constants';

/**
 * ClienteCard
 * Tarjeta resumen de un cliente con sus mascotas
 * Al hacer click navega al detalle del cliente
 *
 * Props:
 *   cliente: objeto Cliente con mascotas[] embebidas
 */
const ClienteCard = ({ cliente }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(RUTAS.CLIENTES + `/${cliente.id}`);
  };

  return (
    <article
      className="card cursor-pointer group"
      onClick={handleClick}
      data-testid="cliente-card"
    >
      {/* Cabecera */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="titulo-display text-lg leading-tight group-hover:text-emerald-700 transition-colors">
            {cliente.nombre}
          </h3>
          <p className="text-stone-400 text-xs mt-0.5">{cliente.email}</p>
        </div>
        {/* Indicador cantidad mascotas */}
        <span className="flex-shrink-0 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">
          {cliente.mascotas?.length ?? 0}{' '}
          {cliente.mascotas?.length === 1 ? 'mascota' : 'mascotas'}
        </span>
      </div>

      <div className="separador" />

      {/* Datos de contacto */}
      <div className="space-y-1.5 mb-4">
        <p className="flex items-center gap-2 text-sm text-stone-600">
          <span aria-hidden="true">📞</span>
          {cliente.telefono}
        </p>
        <p className="flex items-center gap-2 text-sm text-stone-600">
          <span aria-hidden="true">📍</span>
          {cliente.direccion}
        </p>
      </div>

      {/* Avatares de mascotas */}
      {cliente.mascotas?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {cliente.mascotas.map((m) => (
            <span
              key={m.id}
              className="inline-flex items-center gap-1 bg-stone-50 border border-stone-200 rounded-full px-2.5 py-1 text-xs text-stone-600"
            >
              <span aria-hidden="true">{EMOJI_ESPECIE[m.especie] ?? '🐾'}</span>
              {m.nombre}
            </span>
          ))}
        </div>
      )}

      {/* Flecha indicadora */}
      <div className="mt-3 flex justify-end">
        <span className="text-stone-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all text-sm">
          Ver detalle →
        </span>
      </div>
    </article>
  );
};

export default ClienteCard;
