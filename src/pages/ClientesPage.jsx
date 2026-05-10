import ClientesList from '../components/clientes/ClientesList';

/**
 * ClientesPage
 * Página que muestra el listado completo de clientes
 */
const ClientesPage = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="titulo-display text-3xl">Clientes</h1>
        <p className="text-stone-400 text-sm mt-1">
          Listado de clientes registrados y sus mascotas
        </p>
      </header>

      <ClientesList />
    </div>
  );
};

export default ClientesPage;
