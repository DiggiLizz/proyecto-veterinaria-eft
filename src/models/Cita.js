// estados posibles de una cita — como los colores del sticker en la ficha del turno
export const ESTADOS_CITA = {
  PENDIENTE:  'pendiente',
  CONFIRMADA: 'confirmada',
  COMPLETADA: 'completada',
  CANCELADA:  'cancelada',
};

// regla de negocio de la clínica — máximo 8 pacientes por jornada
export const MAX_CITAS_POR_DIA = 8;

// createcita — fabrica una ficha de turno validada e inmutable,
// como llenar el formulario de reserva en recepción antes de agendar
export const createCita = ({
  id,
  fecha,          // iso string: '202-0-10'
  hora,           // string: '09:00'
  mascotaId,
  clienteId,
  veterinarioId,
  motivo = '',
  estado = ESTADOS_CITA.PENDIENTE,
  notas = '',
} = {}) => {

  // campos obligatorios — sin esto la ficha no se puede crear
  if (!id)            throw new Error('Cita requiere id');
  if (!fecha)         throw new Error('Cita requiere fecha');
  if (!hora)          throw new Error('Cita requiere hora');
  if (!mascotaId)     throw new Error('Cita requiere mascotaId');
  if (!clienteId)     throw new Error('Cita requiere clienteId');
  if (!veterinarioId) throw new Error('Cita requiere veterinarioId');

  // el estado debe ser uno de los stickers válidos de la clínica
  const estadosValidos = Object.values(ESTADOS_CITA);
  if (!estadosValidos.includes(estado)) {
    throw new Error(`Estado inválido. Debe ser uno de: ${estadosValidos.join(', ')}`);
  }

  // la ficha queda sellada — no se puede modificar después de creada
  return Object.freeze({
    id:            String(id),
    fecha,
    hora,
    mascotaId:     String(mascotaId),
    clienteId:     String(clienteId),
    veterinarioId: String(veterinarioId),
    motivo:        motivo.trim(),
    estado,
    notas:         notas.trim(),
  });
};

// filtrarcitasporfecha — saca del libro de agenda solo los turnos del día pedido,
// respetando el límite de 8 citas por jornada que tiene la clínica
export const filtrarCitasPorFecha = (citas, fecha) => {
  return citas
    .filter((cita) => cita.fecha === fecha)
    .slice(0, MAX_CITAS_POR_DIA);
};

// validarcita — revisa que el formulario de reserva esté completo
// antes de intentar agendar el turno en la clínica
export const validarCita = (data) => {
  const errores = {};
  if (!data.fecha)         errores.fecha         = 'La fecha es obligatoria';
  if (!data.hora)          errores.hora          = 'La hora es obligatoria';
  if (!data.mascotaId)     errores.mascotaId     = 'La mascota es obligatoria';
  if (!data.veterinarioId) errores.veterinarioId = 'El veterinario es obligatorio';
  return { valido: Object.keys(errores).length === 0, errores };
};