import EmptyState from '../ui/EmptyState';
import { formatFechaCorta } from '../../utils/formatDate';
import { TEXTOS } from '../../utils/constants';

// historialmedico — el cuaderno clínico completo del paciente,
// lista todas las consultas pasadas del más reciente al más antiguo,
// como leer las páginas del cuaderno de atrás hacia adelante
const HistorialMedico = ({ historial = [] }) => {

  // cuaderno vacío — el paciente es nuevo y no tiene consultas previas
  if (!historial.length) {
    return (
      <EmptyState
        icono="📋"
        titulo={TEXTOS.SIN_HISTORIAL}
        mensaje="Las atenciones futuras aparecerán aquí"
      />
    );
  }

  // ordenamos del más reciente al más antiguo — la última consulta primero,
  // como abrir el cuaderno por la última página escrita
  const ordenado = [...historial].sort((a, b) =>
    new Date(b.fecha) - new Date(a.fecha)
  );

  return (
    <div className="space-y-3" data-testid="historial-medico">
      {ordenado.map((entrada, i) => (
        <EntradaHistorial key={i} entrada={entrada} />
      ))}
    </div>
  );
};

// entradahistorial — una página del cuaderno clínico,
// registra qué pasó en esa consulta: cuándo, quién atendió,
// qué se diagnosticó y qué tratamiento se indicó
const EntradaHistorial = ({ entrada }) => (
  <div
    className="bg-stone-50 border border-stone-100 rounded-xl p-4"
    data-testid="entrada-historial"
  >
    {/* encabezado — la fecha del sello y el vet que firmó la ficha */}
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
        {formatFechaCorta(entrada.fecha)}
      </span>
      {entrada.veterinario && (
        <span className="text-xs text-stone-400 truncate ml-2">
          {entrada.veterinario}
        </span>
      )}
    </div>

    {/* motivo de consulta — el "¿qué le pasaba?" anotado en la ficha */}
    <p className="text-sm font-semibold text-stone-700 mb-2">
      {entrada.descripcion}
    </p>

    {/* diagnóstico y tratamiento — lo que concluyó y recetó el vet ese día */}
    <div className="space-y-1">
      {entrada.diagnostico && (
        <FilaDato label="Diagnóstico" valor={entrada.diagnostico} />
      )}
      {entrada.tratamiento && (
        <FilaDato label="Tratamiento" valor={entrada.tratamiento} />
      )}
    </div>
  </div>
);

// filadata — una línea del formulario clínico, label en negrita y valor al lado,
// como los campos impresos de una ficha de anamnesis
const FilaDato = ({ label, valor }) => (
  <p className="text-xs text-stone-500">
    <span className="font-semibold text-stone-600">{label}: </span>
    {valor}
  </p>
);

export default HistorialMedico;