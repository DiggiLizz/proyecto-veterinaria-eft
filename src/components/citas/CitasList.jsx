import { useState } from 'react';
import { useCitas } from '../../hooks/useCitas';
import CitaCard from './CitaCard';
import FiltroFecha from './FiltroFecha';
import Spinner from '../ui/Spinner';
import ErrorMessage from '../ui/ErrorMessage';
import EmptyState from '../ui/EmptyState';
import { hoy } from '../../utils/formatDate';
import { MAX_CITAS_POR_DIA, TEXTOS } from '../../utils/constants';

// citaslist — el libro de agenda de la clínica,
// muestra todos los turnos del día y permite cambiar de fecha
// como pasar las hojas del cuaderno de citas en recepción
const CitasList = () => {

  // la fecha seleccionada — por defecto abre en el día de hoy,
  // como llegar a la clínica y ver la agenda abierta en la página de hoy
  const [fecha, setFecha] = useState(hoy());
  const { citas, loading, error } = useCitas(fecha);

  return (
    <div className="space-y-6">

      {/* selector de fecha — el dedo que apunta a qué día de la agenda revisar */}
      <FiltroFecha fecha={fecha} onCambio={setFecha} />

      {/* contador de turnos — cuántos pacientes quedan y cuánto espacio hay */}
      {!loading && !error && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-stone-400">
            {citas.length === 0
              ? 'Sin citas para este día'
              : `${citas.length} de ${MAX_CITAS_POR_DIA} citas`}
          </p>

          {/* termómetro de ocupación — qué tan llena está la agenda del día */}
          {citas.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-24 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${(citas.length / MAX_CITAS_POR_DIA) * 100}%` }}
                />
              </div>
              <span className="text-xs text-stone-400">
                {Math.round((citas.length / MAX_CITAS_POR_DIA) * 100)}%
              </span>
            </div>
          )}
        </div>
      )}

      {/* cargando — la clínica buscando los expedientes en el archivador */}
      {loading && <Spinner texto="Cargando citas..." />}

      {/* error — algo salió mal en la búsqueda, como no encontrar la ficha */}
      {error && <ErrorMessage mensaje={error} />}

      {/* agenda vacía — ese día tranquilo que no tiene ningún paciente agendado */}
      {!loading && !error && citas.length === 0 && (
        <EmptyState
          icono="📅"
          titulo={TEXTOS.SIN_CITAS}
          mensaje="No hay atenciones programadas para este día"
        />
      )}

      {/* grilla de turnos — el tablero de la sala de espera con todos los pacientes del día */}
      {!loading && !error && citas.length > 0 && (
        <section
          aria-label="Citas del día"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {citas.map((cita) => (
            <CitaCard key={cita.id} cita={cita} />
          ))}
        </section>
      )}
    </div>
  );
};

export default CitasList;