// emptystate — la sala de espera vacía,
// aparece cuando no hay pacientes, citas ni fichas que mostrar,
// como llegar a la clínica un día que no hay ningún turno agendado
const EmptyState = ({
  icono = '🐾',
  titulo = 'Sin resultados',
  mensaje = '',
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">

      {/* ícono central — el símbolo que identifica qué está vacío */}
      <span
        className="text-5xl mb-4 opacity-60 select-none"
        aria-hidden="true"
      >
        {icono}
      </span>

      {/* título — el cartel en la puerta que dice que no hay nadie */}
      <p className="text-stone-600 font-semibold text-base mb-1">{titulo}</p>

      {/* mensaje secundario — la explicación de por qué está vacío */}
      {mensaje && (
        <p className="text-stone-400 text-sm max-w-xs">{mensaje}</p>
      )}
    </div>
  );
};

export default EmptyState;