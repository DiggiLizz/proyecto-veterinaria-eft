/**
 * graphqlApi.js
 * Capa de acceso a datos vía GraphQL
 * Usa graphqlClient para ejecutar las queries definidas en queries.js
 *
 * Solo lectura — el sistema no considera creación, modificación ni eliminación.
 */

import { graphqlClient } from './client';
import {
  QUERY_CLIENTES,
  QUERY_CLIENTE,
  QUERY_CITAS_POR_FECHA,
} from './queries';

/**
 * gqlGetClientes
 * Obtiene la lista completa de clientes con sus mascotas vía GraphQL
 *
 * @param {AbortSignal} [signal]
 * @returns {Promise<Cliente[]>}
 */
export const gqlGetClientes = async (signal) => {
  const data = await graphqlClient(QUERY_CLIENTES, {}, signal);
  return data.clientes;
};

/**
 * gqlGetCliente
 * Obtiene un cliente con mascotas e historial médico vía GraphQL
 *
 * @param {string} id
 * @param {AbortSignal} [signal]
 * @returns {Promise<Cliente>}
 */
export const gqlGetCliente = async (id, signal) => {
  const data = await graphqlClient(QUERY_CLIENTE, { id }, signal);
  return data.cliente;
};

/**
 * gqlGetCitasPorFecha
 * Obtiene las citas de un día específico vía GraphQL
 *
 * @param {string} fecha - 'YYYY-MM-DD'
 * @param {AbortSignal} [signal]
 * @returns {Promise<Cita[]>}
 */
export const gqlGetCitasPorFecha = async (fecha, signal) => {
  const data = await graphqlClient(QUERY_CITAS_POR_FECHA, { fecha }, signal);
  return data.citas;
};