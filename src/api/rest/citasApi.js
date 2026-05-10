/**
 * citasApi.js
 * Capa REST para el recurso Citas
 * El backend es un mock (MSW o json-server) en http://localhost:3000/api
 *
 * Solo lectura — el sistema no considera creación, modificación ni eliminación.
 */

const API = 'http://localhost:3000/api';

/**
 * getCitasPorFecha
 * Obtiene las citas de un día específico.
 * El backend mock aplica el límite de 8 citas por día.
 *
 * @param {string} fecha  - 'YYYY-MM-DD'
 * @param {AbortSignal} [signal]
 * @returns {Promise<Cita[]>}
 */
export const getCitasPorFecha = async (fecha, signal) => {
  const url = fecha
    ? `${API}/citas?fecha=${fecha}`
    : `${API}/citas`;

  const res = await fetch(url, { signal });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: no se pudo obtener las citas`);
  }

  return res.json();
};

/**
 * getCitaPorId
 * Obtiene una cita específica por su id.
 *
 * @param {string} id
 * @param {AbortSignal} [signal]
 * @returns {Promise<Cita>}
 */
export const getCitaPorId = async (id, signal) => {
  const res = await fetch(`${API}/citas/${id}`, { signal });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: cita no encontrada`);
  }

  return res.json();
};
