// citasapi.js
// capa rest para el recurso citas — solo lectura
const API = '/api'; 

// getcitasporfecha — consulta la agenda de un día específico en recepción
export const getCitasPorFecha = async (fecha, signal) => {

  // La URL ahora será relativa (ej: /api/citas?fecha=2026-05-10)
  const url = fecha
    ? `${API}/citas?fecha=${fecha}`
    : `${API}/citas`;

  const res = await fetch(url, { signal });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: no se pudo obtener las citas`);
  }

  return res.json();
};

// getcitaporid — busca el turno específico por su número de ficha
export const getCitaPorId = async (id, signal) => {
  const res = await fetch(`${API}/citas/${id}`, { signal });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: cita no encontrada`);
  }

  return res.json();
};