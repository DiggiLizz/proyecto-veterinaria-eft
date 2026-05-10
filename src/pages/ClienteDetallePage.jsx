import { useParams } from 'react-router-dom';
import ClienteDetalle from '../components/clientes/ClienteDetalle';

/**
 * ClienteDetallePage
 * Página de detalle de un cliente
 * Extrae el id desde la URL y se lo pasa al componente
 */
const ClienteDetallePage = () => {
  const { id } = useParams();

  return (
    <div className="max-w-3xl">
      <ClienteDetalle id={id} />
    </div>
  );
};

export default ClienteDetallePage;
