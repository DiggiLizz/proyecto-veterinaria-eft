import { useState, useEffect } from 'react';

// dirección del laboratorio graphql mock 
const GRAPHQL_URL = '/api/graphql';

// executequery — el mensajero interno que lleva el formulario al laboratorio
// y devuelve solo el campo data, sin el sobre ni los metadatos de la respuesta
const executeQuery = async (query, variables = {}, signal) => {
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    signal,
  });

  // si el laboratorio no respondió bien, avisamos con el código de falla
  if (!res.ok) throw new Error(`Error HTTP ${res.status}`);

  const json = await res.json();

  // si el laboratorio respondió pero reportó errores en el análisis,
  // tomamos el primero y lo lanzamos como si fuera un error de red
  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
};

// usegraphql — el asistente genérico que ejecuta cualquier consulta al laboratorio,
// se re-ejecuta cada vez que cambian el formulario o las variables de búsqueda
export const useGraphQL = (query, variables = {}) => {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // serializamos las variables para poder usarlas como dependencia del effect —
  // los objetos cambian de referencia en cada render aunque tengan el mismo contenido
  const variablesKey = JSON.stringify(variables);

  useEffect(() => {
    // sin formulario no hay consulta — el asistente no sale a buscar nada
    if (!query) return;

    const controller = new AbortController();

    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await executeQuery(query, variables, controller.signal);
        setData(result);
      } catch (err) {
        // cancelación intencional — el componente se desmontó antes de que llegara la respuesta
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

// formularios de consulta predefinidos — constantes para evitar strings sueltos
// en los componentes, como tener los formularios impresos en recepción
// en vez de escribirlos a mano cada vez que se necesitan

// query_clientes — pide el directorio completo de tutores con resumen de mascotas
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

// query_cliente — pide el expediente completo de un tutor con historial médico incluido
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

// query_citasporfecha — pide la agenda de un día con mascota, dueño y vet embebidos
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