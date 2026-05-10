// createcliente — registra un nuevo tutor en el sistema de la clínica,
// como llenar la ficha de ingreso del dueño en recepción por primera vez
export const createCliente = ({
  id,
  nombre,
  telefono,
  email = '',
  direccion,
  mascotas = [],
} = {}) => {

  // campos obligatorios — sin esto no se puede crear la ficha del tutor
  if (!id)                       throw new Error('Cliente requiere id');
  if (!nombre || nombre.trim() === '') throw new Error('Cliente requiere nombre');
  if (!telefono)                 throw new Error('Cliente requiere telefono');
  if (!direccion)                throw new Error('Cliente requiere direccion');

  // la ficha queda sellada — igual que un registro oficial de la clínica
  return Object.freeze({
    id:       String(id),
    nombre:   nombre.trim(),
    telefono: String(telefono),
    email:    email.trim(),
    direccion: direccion.trim(),
    mascotas, // ids de las mascotas asociadas a este tutor
  });
};

// validarcliente — revisa que la ficha del tutor esté completa
// antes de guardarla en el archivador de la clínica
export const validarCliente = (data) => {
  const errores = {};
  if (!data.nombre?.trim())    errores.nombre    = 'El nombre es obligatorio';
  if (!data.telefono?.trim())  errores.telefono  = 'El teléfono es obligatorio';
  if (!data.direccion?.trim()) errores.direccion = 'La dirección es obligatoria';
  return { valido: Object.keys(errores).length === 0, errores };
};