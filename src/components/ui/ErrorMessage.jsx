/**
 * ErrorMessage
 * Muestra un mensaje de error con opción de reintentar
 *
 * Props:
 *   mensaje:    string con el texto del error
 *   onReintentar: función callback opcional para reintentar la acción
 */
const ErrorMessage = ({ mensaje = 'Ocurrió un error inesperado', onReintentar }) => {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center py-12 px-6 text-center"
    >
      <span className="text-4xl mb-3 select-none" aria-hidden="true">⚠️</span>
      <p className="text-red-700 font-semibold text-sm mb-1">Algo salió mal</p>
      <p className="text-stone-500 text-sm max-w-xs mb-4">{mensaje}</p>

      {onReintentar && (
        <button
          onClick={onReintentar}
          className="
            px-4 py-2 rounded-lg text-sm font-medium
            bg-emerald-600 text-white
            hover:bg-emerald-700 active:scale-95
            transition-all duration-150
          "
        >
          Reintentar
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
