/**
 * Spinner
 * Indicador de carga animado
 *
 * Props:
 *   size:  'sm' | 'md' | 'lg' (default 'md')
 *   texto: string opcional que aparece debajo
 */
const Spinner = ({ size = 'md', texto = '' }) => {
  const sizes = {
    sm: 'h-5 w-5 border-2',
    md: 'h-9 w-9 border-[3px]',
    lg: 'h-14 w-14 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
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
      {texto && (
        <p className="text-sm text-stone-400 tracking-wide">{texto}</p>
      )}
    </div>
  );
};

export default Spinner;
