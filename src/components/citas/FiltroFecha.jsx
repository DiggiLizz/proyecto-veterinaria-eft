import { hoy, toISODate, formatFecha } from '../../utils/formatDate';

/**
 * FiltroFecha
 * Selector de fecha para filtrar las citas del día
 * Muestra la fecha seleccionada en formato legible
 *
 * Props:
 *   fecha:       string 'YYYY-MM-DD' — fecha actualmente seleccionada
 *   onCambio:    función que recibe el nuevo string 'YYYY-MM-DD'
 */
const FiltroFecha = ({ fecha, onCambio }) => {
  const fechaHoy = hoy();

  const handleChange = (e) => {
    onCambio(e.target.value);
  };

  const irAHoy = () => {
    onCambio(fechaHoy);
  };

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-3"
      data-testid="filtro-fecha"
    >
      {/* Input de fecha nativo */}
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

      {/* Fecha en formato legible */}
      <div className="sm:mt-5">
        <p className="titulo-display text-base text-stone-700 capitalize">
          {formatFecha(fecha)}
        </p>
      </div>

      {/* Botón ir a hoy — solo visible si no está en hoy */}
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
