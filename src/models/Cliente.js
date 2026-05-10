/**
 * Modelo Cliente
 * Relación: Un cliente tiene muchas mascotas
 */

export const createCliente = ({
  id,
  nombre,
  telefono,
  email = '',
  direccion,
  mascotas = [],
} = {}) => {
  if (!id) throw new Error('Cliente requiere id');
  if (!nombre || nombre.trim() === '') throw new Error('Cliente requiere nombre');
  if (!telefono) throw new Error('Cliente requiere telefono');
  if (!direccion) throw new Error('Cliente requiere direccion');

  return Object.freeze({
    id: String(id),
    nombre: nombre.trim(),
    telefono: String(telefono),
    email: email.trim(),
    direccion: direccion.trim(),
    mascotas, // array de ids de Mascota
  });
};

/**
 * Validación de campo individual (útil para formularios futuros)
 */
export const validarCliente = (data) => {
  const errores = {};
  if (!data.nombre?.trim()) errores.nombre = 'El nombre es obligatorio';
  if (!data.telefono?.trim()) errores.telefono = 'El teléfono es obligatorio';
  if (!data.direccion?.trim()) errores.direccion = 'La dirección es obligatoria';
  return { valido: Object.keys(errores).length === 0, errores };
};