import { hoy, toISODate, formatFecha } from '../../utils/formatDate';

// filtrofecha — el calendario de pared de la clínica,
// permite cambiar de día para ver qué pacientes están agendados,
// como pasar las hojas de la agenda física en recepción
const FiltroFecha = ({ fecha, onCambio }) => {

  // guardamos el día de hoy para saber si el vet está viendo la agenda actual
  const fechaHoy = hoy();

  // cuando cambia el input, avisamos al padre con la nueva fecha seleccionada
  const handleChange = (e) => {
    onCambio(e.target.value);
  };

  // volver a hoy — como cerrar la agenda y abrirla en la página de hoy
  const irAHoy = () => {
    onCambio(fechaHoy);
  };

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-3"
      data-testid="filtro-fecha"
    >
      {/* el datepicker — el dedo que apunta a qué día de la agenda mirar */}
      <div className="relative">
        <label
          htmlFor="filtro-fecha-input"
          className="block text-xs text-stone-400 uppercase tracking-wide mb-1"
        >
          Filtrar por día
        </label>
        <input
          id="filtro-fecha-input"
          type="date"
          value={fecha}
          onChange={handleChange}
          max="2099-12-31"
          className="
            border border-stone-200 rounded-xl px-3 py-2
            text-sm text-stone-700 bg-white
            focus:outline-none focus:ring-2 focus:ring-emerald-400
            cursor-pointer
          "
        />
      </div>

      {/* fecha en lenguaje humano — como leer la agenda en voz alta en la mañana */}
      <div className="sm:mt-5">
        <p className="titulo-display text-base text-stone-700 capitalize">
          {formatFecha(fecha)}
        </p>
      </div>

      {/* botón de regreso — solo aparece si el vet está mirando otro día,
          como el recordatorio de volver a la página de hoy */}
      {fecha !== fechaHoy && (
        <button
          onClick={irAHoy}
          className="sm:mt-5 self-start text-xs text-emerald-600 hover:text-emerald-800
                     underline underline-offset-2 transition-colors"
        >
          Ir a hoy
        </button>
      )}
    </div>
  );
};

export default FiltroFecha;