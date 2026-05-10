/**
 * Modelo Mascota
 * Relación: Pertenece a un Cliente, tiene muchas Citas
 */

export const ESPECIES = ['Perro', 'Gato', 'Ave', 'Conejo', 'Reptil', 'Otro'];

export const createMascota = ({
  id,
  nombre,
  especie,
  raza = '',
  edad,       // número en años
  peso = null, // kg
  clienteId,
  historialMedico = [],
  foto = '',
} = {}) => {
  if (!id) throw new Error('Mascota requiere id');
  if (!nombre || nombre.trim() === '') throw new Error('Mascota requiere nombre');
  if (!especie) throw new Error('Mascota requiere especie');
  if (edad === undefined || edad === null) throw new Error('Mascota requiere edad');
  if (!clienteId) throw new Error('Mascota requiere clienteId');

  return Object.freeze({
    id: String(id),
    nombre: nombre.trim(),
    especie,
    raza: raza.trim(),
    edad: Number(edad),
    peso: peso !== null ? Number(peso) : null,
    clienteId: String(clienteId),
    historialMedico, // array de EntradaHistorial
    foto,
  });
};

/**
 * Entrada del historial médico
 */
export const createEntradaHistorial = ({
  fecha,
  descripcion,
  veterinario = '',
  diagnostico = '',
  tratamiento = '',
} = {}) => {
  if (!fecha) throw new Error('EntradaHistorial requiere fecha');
  if (!descripcion) throw new Error('EntradaHistorial requiere descripcion');

  return Object.freeze({
    fecha,
    descripcion: descripcion.trim(),
    veterinario: veterinario.trim(),
    diagnostico: diagnostico.trim(),
    tratamiento: tratamiento.trim(),
  });
};

export const validarMascota = (data) => {
  const errores = {};
  if (!data.nombre?.trim()) errores.nombre = 'El nombre es obligatorio';
  if (!data.especie) errores.especie = 'La especie es obligatoria';
  if (data.edad === undefined || data.edad === null) errores.edad = 'La edad es obligatoria';
  return { valido: Object.keys(errores).length === 0, errores };
};