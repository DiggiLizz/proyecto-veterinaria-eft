/**
 * clientesApi.js
 * Capa REST para el recurso Clientes
 * El backend es un mock (MSW o json-server) en http://localhost:3000/api
 *
 * Solo lectura — el sistema no considera creación, modificación ni eliminación.
 */

const API = 'http://localhost:3000/api';

/**
 * getClientes
 * Obtiene la lista completa de clientes con sus mascotas embebidas.
 *
 * @param {AbortSignal} [signal]
 * @returns {Promise<Cliente[]>}
 */
export const getClientes = async (signal) => {
  const res = await fetch(`${API}/clientes`, { signal });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: no se pudo obtener los clientes`);
  }

  return res.json();
};

/**
 * getClientePorId
 * Obtiene un cliente con sus mascotas e historial médico embebidos.
 *
 * @param {string} id
 * @param {AbortSignal} [signal]
 * @returns {Promise<Cliente>}
 */
export const getClientePorId = async (id, signal) => {
  const res = await fetch(`${API}/clientes/${id}`, { signal });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: cliente no encontrado`);
  }

  return res.json();
};
