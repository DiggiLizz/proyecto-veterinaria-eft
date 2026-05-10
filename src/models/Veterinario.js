// especialidades disponibles en la clínica — los servicios del letrero de la entrada
export const ESPECIALIDADES = [
  'Medicina General',
  'Cirugía',
  'Dermatología',
  'Cardiología',
  'Oftalmología',
  'Odontología',
  'Traumatología',
];

// createveterinario — registra un médico en el equipo de la clínica,
// como agregar una nueva tarjeta al panel de profesionales de recepción
export const createVeterinario = ({
  id,
  nombre,
  especialidad = 'Medicina General', // por defecto entra como médico general
  telefono = '',
  email = '',
  foto = '',
} = {}) => {

  // sin id ni nombre no se puede crear la credencial del profesional
  if (!id)                             throw new Error('Veterinario requiere id');
  if (!nombre || nombre.trim() === '') throw new Error('Veterinario requiere nombre');

  // la credencial queda sellada — los datos del vet no se modifican por accidente
  return Object.freeze({
    id:          String(id),
    nombre:      nombre.trim(),
    especialidad,
    telefono:    String(telefono),
    email:       email.trim(),
    foto,
  });
};