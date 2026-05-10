import { useNavigate } from 'react-router-dom';
import MascotaCard from './MascotaCard';
import HistorialMedico from './HistorialMedico';
import Spinner from '../ui/Spinner';
import EmptyState from '../ui/EmptyState';

/**
 * MascotaDetalle
 * Vista completa de una sola mascota con su historial médico
 * Recibe la mascota como prop (ya viene embebida desde ClienteDetalle
 * o desde una cita — no necesita fetch propio)
 *
 * Props:
 *   mascota:  objeto Mascota con historialMedico[]
 *   loading:  boolean opcional
 */
const MascotaDetalle = ({ mascota, loading = false }) => {
  const navigate = useNavigate();

  if (loading) return <Spinner texto="Cargando mascota..." />;

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

      {/* Botón volver */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-emerald-700 transition-colors"
      >
        ← Volver
      </button>

      {/* Tarjeta resumen */}
      <MascotaCard mascota={mascota} />

      {/* Historial médico */}
      <div className="card">
        <h4 className="titulo-display text-lg mb-4">Historial médico</h4>
        <HistorialMedico historial={mascota.historialMedico} />
      </div>
    </div>
  );
};

export default MascotaDetalle;
