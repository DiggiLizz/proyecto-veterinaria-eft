import { useNavigate } from 'react-router-dom';
import { RUTAS, EMOJI_ESPECIE } from '../../utils/constants';

// clientecard — la ficha de tutor en el archivador de recepción,
// muestra un resumen del dueño y sus pacientes registrados,
// al hacer click abre el expediente completo
const ClienteCard = ({ cliente }) => {
  const navigate = useNavigate();

  // abre el expediente completo del tutor — como sacar la carpeta del archivador
  const handleClick = () => {
    navigate(RUTAS.CLIENTES + `/${cliente.id}`);
  };

  return (
    <article
      className="card cursor-pointer group"
      onClick={handleClick}
      data-testid="cliente-card"
    >
      {/* encabezado — nombre del tutor y cuántos pacientes tiene registrados */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="titulo-display text-lg leading-tight group-hover:text-emerald-700 transition-colors">
            {cliente.nombre}
          </h3>
          <p className="text-stone-400 text-xs mt-0.5">{cliente.email}</p>
        </div>

        {/* badge de cantidad — como el número en la solapa de la carpeta */}
        <span className="flex-shrink-0 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">
          {cliente.mascotas?.length ?? 0}{' '}
          {cliente.mascotas?.length === 1 ? 'mascota' : 'mascotas'}
        </span>
      </div>

      <div className="separador" />

      {/* datos de contacto — dónde llamar si hay una emergencia con el paciente */}
      <div className="space-y-1.5 mb-4">
        <p className="flex items-center gap-2 text-sm text-stone-600">
          <span aria-hidden="true">📞</span>
          {cliente.telefono}
        </p>
        <p className="flex items-center gap-2 text-sm text-stone-600">
          <span aria-hidden="true">📍</span>
          {cliente.direccion}
        </p>
      </div>

      {/* avatares de mascotas — la lista de pacientes asociados al tutor,
          como los nombres escritos en la solapa de cada ficha clínica */}
      {cliente.mascotas?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {cliente.mascotas.map((m) => (
            <span
              key={m.id}
              className="inline-flex items-center gap-1 bg-stone-50 border border-stone-200 rounded-full px-2.5 py-1 text-xs text-stone-600"
            >
              <span aria-hidden="true">{EMOJI_ESPECIE[m.especie] ?? '🐾'}</span>
              {m.nombre}
            </span>
          ))}
        </div>
      )}

      {/* flecha — invita a abrir el expediente completo */}
      <div className="mt-3 flex justify-end">
        <span className="text-stone-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all text-sm">
          Ver detalle →
        </span>
      </div>
    </article>
  );
};

export default ClienteCard;