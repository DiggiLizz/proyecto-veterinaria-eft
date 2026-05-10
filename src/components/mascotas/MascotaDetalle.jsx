import { useNavigate } from 'react-router-dom';
import MascotaCard from './MascotaCard';
import HistorialMedico from './HistorialMedico';
import Spinner from '../ui/Spinner';
import EmptyState from '../ui/EmptyState';

// mascotadetalle — el expediente completo del paciente,
// muestra la ficha resumen y el cuaderno clínico con todas sus consultas previas
// no necesita buscar datos porque ya vienen embebidos desde el tutor o la cita
const MascotaDetalle = ({ mascota, loading = false }) => {
  const navigate = useNavigate();

  // buscando el expediente del paciente
  if (loading) return <Spinner texto="Cargando mascota..." />;

  // el paciente no existe en el sistema
  if (!mascota) {
    return (
      <EmptyState
        icono="🐾"
        titulo="Mascota no encontrada"
        mensaje="No se encontraron datos para esta mascota"
      />
    );
  }

  return (
    <div className="space-y-5" data-testid="mascota-detalle">

      {/* botón volver — cerrar el expediente y volver al archivador */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-emerald-700 transition-colors"
      >
        ← Volver
      </button>

      {/* ficha resumen — la etiqueta de la jaula con los datos básicos del paciente */}
      <MascotaCard mascota={mascota} />

      {/* cuaderno clínico — todas las consultas anteriores del paciente */}
      <div className="card">
        <h4 className="titulo-display text-lg mb-4">Historial médico</h4>
        <HistorialMedico historial={mascota.historialMedico} />
      </div>
    </div>
  );
};

export default MascotaDetalle;