// errormessage — el cartel de "clínica cerrada por inconvenientes",
// aparece cuando algo salió mal al buscar datos,
// y ofrece reintentar como cuando vuelves a tocar el timbre de la puerta
const ErrorMessage = ({ mensaje = 'Ocurrió un error inesperado', onReintentar }) => {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center py-12 px-6 text-center"
    >
      {/* señal de advertencia — el semáforo en rojo de la sala de espera */}
      <span className="text-4xl mb-3 select-none" aria-hidden="true">⚠️</span>

      {/* título del error — algo falló en la búsqueda del expediente */}
      <p className="text-red-700 font-semibold text-sm mb-1">Algo salió mal</p>

      {/* detalle del error — qué pasó exactamente al intentar buscar */}
      <p className="text-stone-500 text-sm max-w-xs mb-4">{mensaje}</p>

      {/* botón reintentar — volver a tocar el timbre de la clínica */}
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