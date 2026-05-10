import { useClientes } from '../../hooks/useClientes';
import ClienteCard from './ClienteCard';
import Spinner from '../ui/Spinner';
import ErrorMessage from '../ui/ErrorMessage';
import EmptyState from '../ui/EmptyState';
import { TEXTOS } from '../../utils/constants';

// clienteslist — el archivador completo de la clínica,
// muestra todas las fichas de tutores registrados en el sistema
const ClientesList = () => {
  const { clientes, loading, error } = useClientes();

  // buscando todas las fichas en el archivador
  if (loading) return <Spinner texto="Cargando clientes..." />;

  // algo salió mal al abrir el archivador
  if (error) return <ErrorMessage mensaje={error} />;

  // el archivador existe pero no tiene ninguna ficha adentro
  if (clientes.length === 0) {
    return (
      <EmptyState
        icono="👥"
        titulo={TEXTOS.SIN_CLIENTES}
        mensaje="Aún no hay clientes registrados en el sistema"
      />
    );
  }

  return (
    <section aria-label="Lista de clientes">

      {/* contador de fichas — cuántos tutores hay registrados en la clínica */}
      <p className="text-sm text-stone-400 mb-4">
        {clientes.length} {clientes.length === 1 ? 'cliente registrado' : 'clientes registrados'}
      </p>

      {/* grilla de fichas — el archivador abierto con todas las carpetas visibles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {clientes.map((cliente) => (
          <ClienteCard key={cliente.id} cliente={cliente} />
        ))}
      </div>
    </section>
  );
};

export default ClientesList;