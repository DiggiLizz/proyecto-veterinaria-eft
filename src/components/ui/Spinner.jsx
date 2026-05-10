// spinner — el paciente dando vueltas en la sala de espera,
// aparece mientras la clínica busca los datos en el archivador
const Spinner = ({ size = 'md', texto = '' }) => {

  // tamaño de la rueda — chica para espacios pequeños, grande para páginas completas
  const sizes = {
    sm: 'h-5 w-5 border-2',
    md: 'h-9 w-9 border-[3px]',
    lg: 'h-14 w-14 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">

      {/* la rueda girando — como el torno de la recepción buscando la ficha */}
      <div
        className={`
          ${sizes[size]}
          rounded-full
          border-emerald-100
          border-t-emerald-600
          animate-spin
        `}
        role="status"
        aria-label="Cargando"
      />

      {/* texto de espera — el "un momento por favor" de la recepcionista */}
      {texto && (
        <p className="text-sm text-stone-400 tracking-wide">{texto}</p>
      )}
    </div>
  );
};

export default Spinner;