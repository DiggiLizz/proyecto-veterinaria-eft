import { useState } from 'react';
import { useCitas } from '../../hooks/useCitas';
import CitaCard from './CitaCard';
import FiltroFecha from './FiltroFecha';
import Spinner from '../ui/Spinner';
import ErrorMessage from '../ui/ErrorMessage';
import EmptyState from '../ui/EmptyState';
import { hoy } from '../../utils/formatDate';
import { MAX_CITAS_POR_DIA, TEXTOS } from '../../utils/constants';

/**
 * CitasList
 * Lista de citas del día con FiltroFecha integrado
 * Maneja el estado de fecha localmente y se lo pasa al hook
 */
const CitasList = () => {
  const [fecha, setFecha] = useState(hoy());
  const { citas, loading, error } = useCitas(fecha);

  return (
    <div className="space-y-6">

      {/* Filtro de fecha */}
      <FiltroFecha fecha={fecha} onCambio={setFecha} />

      {/* Contador y límite */}
      {!loading && !error && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-stone-400">
            {citas.length === 0
              ? 'Sin citas para este día'
              : `${citas.length} de ${MAX_CITAS_POR_DIA} citas`}
          </p>
          {/* Barra de capacidad */}
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

      {/* Estados */}
      {loading && <Spinner texto="Cargando citas..." />}

      {error && <ErrorMessage mensaje={error} />}

      {!loading && !error && citas.length === 0 && (
        <EmptyState
          icono="📅"
          titulo={TEXTOS.SIN_CITAS}
          mensaje="No hay atenciones programadas para este día"
        />
      )}

      {/* Grilla de citas */}
      {!loading && !error && citas.length > 0 && (
        <section
          aria-label={`Citas del día`}
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
