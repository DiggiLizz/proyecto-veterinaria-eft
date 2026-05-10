// client.js
// configuración base del cliente graphql —
// como el teléfono de la clínica que siempre marca al mismo número central

// dirección fija del servidor graphql mock —
// como el número de fax del laboratorio al que siempre se envían las muestras
export const GRAPHQL_URL = 'http://localhost:3000/api/graphql';

// graphqlclient — el mensajero que lleva la consulta al laboratorio graphql
// y trae de vuelta solo los resultados que se pidieron,
// sin traer todo el expediente completo como haría rest
export const graphqlClient = async (query, variables = {}, signal) => {

  // enviamos la consulta al laboratorio — método post con el formulario de solicitud
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    signal,
  });

  // si el laboratorio no respondió bien, avisamos que algo falló en el envío
  if (!res.ok) {
    throw new Error(`Error HTTP ${res.status}: no se pudo conectar con el servidor GraphQL`);
  }

  const json = await res.json();

  // si el laboratorio respondió pero reportó errores en el análisis,
  // tomamos el primer error y lo lanzamos — como cuando el lab rechaza una muestra mal tomada
  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  // devolvemos solo el campo data — el resultado limpio del análisis, sin el sobre que lo trajo
  return json.data;
};