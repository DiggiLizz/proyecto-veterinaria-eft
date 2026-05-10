import CitasList from '../components/citas/CitasList';

/**
 * CitasPage
 * Página de citas agendadas
 * El filtro de fecha y la lógica están en CitasList
 */
const CitasPage = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="titulo-display text-3xl">Citas</h1>
        <p className="text-stone-400 text-sm mt-1">
          Atenciones agendadas — máximo 8 por día
        </p>
      </header>

      <CitasList />
    </div>
  );
};

export default CitasPage;
