import ClientesList from '../components/clientes/ClientesList';

// clientespage — el archivador principal de la clínica,
// muestra todos los tutores registrados y delega la búsqueda a clienteslist,
// como abrir el cajón grande donde están todas las carpetas de los dueños
const ClientesPage = () => {
  return (
    <div className="space-y-6">

      {/* encabezado — el cartel del archivador que indica qué sección es esta */}
      <header>
        <h1 className="titulo-display text-3xl">Clientes</h1>
        <p className="text-stone-400 text-sm mt-1">
          Listado de clientes registrados y sus mascotas
        </p>
      </header>

      {/* el archivador abierto — clienteslist busca y muestra todas las fichas */}
      <ClientesList />
    </div>
  );
};

export default ClientesPage;