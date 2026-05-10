// especies que atiende la clínica — el letrero de la puerta que dice qué animales reciben
export const ESPECIES = ['Perro', 'Gato', 'Ave', 'Conejo', 'Reptil', 'Otro'];

// createmascota — registra un nuevo paciente en el sistema de la clínica,
// como llenar la ficha clínica del animal en su primera consulta
export const createMascota = ({
  id,
  nombre,
  especie,
  raza = '',
  edad,         // en años — lo que anota el vet al examinar al paciente
  peso = null,  // en kg — se pesa en la balanza de la sala de espera
  clienteId,
  historialMedico = [],
  foto = '',
} = {}) => {

  // campos obligatorios — sin esto no se puede abrir una ficha clínica
  if (!id)                             throw new Error('Mascota requiere id');
  if (!nombre || nombre.trim() === '') throw new Error('Mascota requiere nombre');
  if (!especie)                        throw new Error('Mascota requiere especie');
  if (edad === undefined || edad === null) throw new Error('Mascota requiere edad');
  if (!clienteId)                      throw new Error('Mascota requiere clienteId');

  // la ficha queda sellada — registro oficial del paciente en la clínica
  return Object.freeze({
    id:              String(id),
    nombre:          nombre.trim(),
    especie,
    raza:            raza.trim(),
    edad:            Number(edad),
    peso:            peso !== null ? Number(peso) : null,
    clienteId:       String(clienteId),
    historialMedico, // páginas del cuaderno clínico del paciente
    foto,
  });
};

// createentradahistorial — agrega una nueva página al cuaderno clínico,
// como anotar lo que pasó en la consulta de hoy antes de cerrar la ficha
export const createEntradaHistorial = ({
  fecha,
  descripcion,
  veterinario = '',
  diagnostico = '',
  tratamiento = '',
} = {}) => {

  // sin fecha ni descripción no hay registro válido de la consulta
  if (!fecha)       throw new Error('EntradaHistorial requiere fecha');
  if (!descripcion) throw new Error('EntradaHistorial requiere descripcion');

  // la entrada queda sellada — lo que se anotó en la consulta no se borra
  return Object.freeze({
    fecha,
    descripcion: descripcion.trim(),
    veterinario: veterinario.trim(),
    diagnostico: diagnostico.trim(),
    tratamiento: tratamiento.trim(),
  });
};

// validarmascota — revisa que la ficha del paciente esté completa
// antes de guardarla en el sistema de la clínica
export const validarMascota = (data) => {
  const errores = {};
  if (!data.nombre?.trim())                    errores.nombre  = 'El nombre es obligatorio';
  if (!data.especie)                           errores.especie = 'La especie es obligatoria';
  if (data.edad === undefined || data.edad === null) errores.edad = 'La edad es obligatoria';
  return { valido: Object.keys(errores).length === 0, errores };
};