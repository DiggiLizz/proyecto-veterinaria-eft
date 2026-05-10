/**
 * EmptyState
 * Pantalla vacía cuando no hay datos que mostrar
 *
 * Props:
 *   icono:   emoji o string (default '🐾')
 *   titulo:  string principal
 *   mensaje: string secundario opcional
 */
const EmptyState = ({
  icono = '🐾',
  titulo = 'Sin resultados',
  mensaje = '',
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <span
        className="text-5xl mb-4 opacity-60 select-none"
        aria-hidden="true"
      >
        {icono}
      </span>
      <p className="text-stone-600 font-semibold text-base mb-1">{titulo}</p>
      {mensaje && (
        <p className="text-stone-400 text-sm max-w-xs">{mensaje}</p>
      )}
    </div>
  );
};

export default EmptyState;
