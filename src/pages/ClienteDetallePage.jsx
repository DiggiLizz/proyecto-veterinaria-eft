import { useParams } from 'react-router-dom';
import ClienteDetalle from '../components/clientes/ClienteDetalle';

// clientedetallepage — la sala de consulta de un tutor específico,
// lee el id desde la url como si leyera el número de ficha en la puerta,
// y le pasa el dato a clientedetalle para que busque el expediente
const ClienteDetallePage = () => {

  // el id en la url es el número de ficha del tutor que queremos abrir
  const { id } = useParams();

  return (
    <div className="max-w-3xl">
      <ClienteDetalle id={id} />
    </div>
  );
};

export default ClienteDetallePage;