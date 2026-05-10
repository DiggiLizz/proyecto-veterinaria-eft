import { useClientes } from '../../hooks/useClientes';
import ClienteCard from './ClienteCard';
import Spinner from '../ui/Spinner';
import ErrorMessage from '../ui/ErrorMessage';
import EmptyState from '../ui/EmptyState';
import { TEXTOS } from '../../utils/constants';

/**
 * ClientesList
 * Obtiene y renderiza la lista completa de clientes
 * Maneja los estados: cargando, error, vacío, con datos
 */
const ClientesList = () => {
  const { clientes, loading, error } = useClientes();

  if (loading) {
    return <Spinner texto="Cargando clientes..." />;
  }

  if (error) {
    return <ErrorMessage mensaje={error} />;
  }

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
      <p className="text-sm text-stone-400 mb-4">
        {clientes.length} {clientes.length === 1 ? 'cliente registrado' : 'clientes registrados'}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {clientes.map((cliente) => (
          <ClienteCard key={cliente.id} cliente={cliente} />
        ))}
      </div>
    </section>
  );
};

export default ClientesList;
