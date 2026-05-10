import CitasList from '../components/citas/CitasList';

// citaspage — la sala de agenda de la clínica,
// muestra los turnos del día y delega el filtro y la lógica a citaslist,
// como el tablero de la pared donde están pegados todos los turnos del día
const CitasPage = () => {
  return (
    <div className="space-y-6">

      {/* encabezado — el cartel de la sala que indica qué sección es esta */}
      <header>
        <h1 className="titulo-display text-3xl">Citas</h1>
        <p className="text-stone-400 text-sm mt-1">
          Atenciones agendadas — máximo 8 por día
        </p>
      </header>

      {/* la agenda del día — citaslist se encarga de buscar y mostrar los turnos */}
      <CitasList />
    </div>
  );
};

export default CitasPage;