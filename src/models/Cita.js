/**
 * Modelo Cita
 * Relación: Pertenece a una Mascota (que pertenece a un Cliente)
 * Regla de negocio: máximo 8 citas por día
 */

export const ESTADOS_CITA = {
  PENDIENTE: 'pendiente',
  CONFIRMADA: 'confirmada',
  COMPLETADA: 'completada',
  CANCELADA: 'cancelada',
};

export const MAX_CITAS_POR_DIA = 8;

export const createCita = ({
  id,
  fecha,       // ISO string: '2025-06-10'
  hora,        // string: '09:00'
  mascotaId,
  clienteId,
  veterinarioId,
  motivo = '',
  estado = ESTADOS_CITA.PENDIENTE,
  notas = '',
} = {}) => {
  if (!id) throw new Error('Cita requiere id');
  if (!fecha) throw new Error('Cita requiere fecha');
  if (!hora) throw new Error('Cita requiere hora');
  if (!mascotaId) throw new Error('Cita requiere mascotaId');
  if (!clienteId) throw new Error('Cita requiere clienteId');
  if (!veterinarioId) throw new Error('Cita requiere veterinarioId');

  const estadosValidos = Object.values(ESTADOS_CITA);
  if (!estadosValidos.includes(estado)) {
    throw new Error(`Estado inválido. Debe ser uno de: ${estadosValidos.join(', ')}`);
  }

  return Object.freeze({
    id: String(id),
    fecha,
    hora,
    mascotaId: String(mascotaId),
    clienteId: String(clienteId),
    veterinarioId: String(veterinarioId),
    motivo: motivo.trim(),
    estado,
    notas: notas.trim(),
  });
};

/**
 * Filtra citas por fecha exacta (string ISO 'YYYY-MM-DD')
 * Aplica límite de 8 citas por día
 */
export const filtrarCitasPorFecha = (citas, fecha) => {
  return citas
    .filter((cita) => cita.fecha === fecha)
    .slice(0, MAX_CITAS_POR_DIA);
};

export const validarCita = (data) => {
  const errores = {};
  if (!data.fecha) errores.fecha = 'La fecha es obligatoria';
  if (!data.hora) errores.hora = 'La hora es obligatoria';
  if (!data.mascotaId) errores.mascotaId = 'La mascota es obligatoria';
  if (!data.veterinarioId) errores.veterinarioId = 'El veterinario es obligatorio';
  return { valido: Object.keys(errores).length === 0, errores };
};