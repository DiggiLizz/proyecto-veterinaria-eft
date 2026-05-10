// client.js
// configuración base del cliente graphql —
export const GRAPHQL_URL = '/api/graphql'; 

// graphqlclient — el mensajero que lleva la consulta al laboratorio graphql
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