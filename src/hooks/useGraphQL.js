import { useState, useEffect, useCallback } from 'react';

const GRAPHQL_URL = 'http://localhost:3000/api/graphql';

/**
 * Ejecuta una query GraphQL contra el endpoint mock
 *
 * @param {string} query     - string con la query GraphQL
 * @param {object} variables - variables de la query
 * @returns {Promise<object>} data retornada por el servidor
 */
const executeQuery = async (query, variables = {}, signal) => {
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    signal,
  });

  if (!res.ok) throw new Error(`Error HTTP ${res.status}`);

  const json = await res.json();

  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
};

/**
 * useGraphQL
 * Hook genérico para ejecutar queries GraphQL
 * Se re-ejecuta cada vez que cambian query o variables
 *
 * @param {string} query     - query GraphQL
 * @param {object} variables - variables de la query
 */
export const useGraphQL = (query, variables = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Serializar variables para usarlas como dependencia del effect
  const variablesKey = JSON.stringify(variables);

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();

    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await executeQuery(query, variables, controller.signal);
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    run();

    return () => controller.abort();
  }, [query, variablesKey]);

  return { data, loading, error };
};

// ─────────────────────────────────────────────
// QUERIES GRAPHQL PREDEFINIDAS
// Se usan como constantes para evitar strings sueltos en componentes
// ─────────────────────────────────────────────

export const QUERY_CLIENTES = `
  query GetClientes {
    clientes {
      id
      nombre
      telefono
      email
      direccion
      mascotas {
        id
        nombre
        especie
        raza
        edad
      }
    }
  }
`;

export const QUERY_CLIENTE = `
  query GetCliente($id: ID!) {
    cliente(id: $id) {
      id
      nombre
      telefono
      email
      direccion
      mascotas {
        id
        nombre
        especie
        raza
        edad
        peso
        historialMedico {
          fecha
          descripcion
          veterinario
          diagnostico
          tratamiento
        }
      }
    }
  }
`;

export const QUERY_CITAS_POR_FECHA = `
  query GetCitasPorFecha($fecha: String!) {
    citas(fecha: $fecha) {
      id
      fecha
      hora
      motivo
      estado
      mascota {
        id
        nombre
        especie
      }
      cliente {
        id
        nombre
        telefono
      }
      veterinario {
        id
        nombre
        especialidad
      }
    }
  }
`;