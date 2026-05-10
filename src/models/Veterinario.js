/**
 * Modelo Veterinario
 * Entidad de soporte: aparece en cada Cita
 */

export const ESPECIALIDADES = [
  'Medicina General',
  'Cirugía',
  'Dermatología',
  'Cardiología',
  'Oftalmología',
  'Odontología',
  'Traumatología',
];

export const createVeterinario = ({
  id,
  nombre,
  especialidad = 'Medicina General',
  telefono = '',
  email = '',
  foto = '',
} = {}) => {
  if (!id) throw new Error('Veterinario requiere id');
  if (!nombre || nombre.trim() === '') throw new Error('Veterinario requiere nombre');

  return Object.freeze({
    id: String(id),
    nombre: nombre.trim(),
    especialidad,
    telefono: String(telefono),
    email: email.trim(),
    foto,
  });
};