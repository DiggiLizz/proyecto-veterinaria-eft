/**
 * client.js
 * Configuración base del cliente GraphQL
 * Apunta al endpoint mock interceptado por MSW
 */

export const GRAPHQL_URL = 'http://localhost:3000/api/graphql';

/**
 * graphqlClient
 * Función base para ejecutar queries GraphQL.
 * Usada internamente por graphqlApi.js
 *
 * @param {string} query       - query GraphQL
 * @param {object} variables   - variables de la query
 * @param {AbortSignal} signal - señal para cancelar la petición
 * @returns {Promise<object>}  - campo `data` de la respuesta
 */
export const graphqlClient = async (query, variables = {}, signal) => {
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    signal,
  });

  if (!res.ok) {
    throw new Error(`Error HTTP ${res.status}: no se pudo conectar con el servidor GraphQL`);
  }

  const json = await res.json();

  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
};