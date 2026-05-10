import { useState, useEffect } from 'react';

const API = '/api';

// useclientes — el asistente que trae todas las carpetas del archivador,
// avisa mientras busca, entrega la lista cuando llega y reporta si algo falla
export const useClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // cancelador — si el componente se desmonta antes de que llegue la respuesta,
    // le decimos al asistente que ya no hace falta que vuelva con las carpetas
    const controller = new AbortController();

    const fetchClientes = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API}/clientes`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`Error ${res.status}: no se pudo obtener los clientes`);

        const data = await res.json();
        setClientes(data);
      } catch (err) {
        // si el asistente fue cancelado en el camino, no reportamos error —
        // fue una cancelación intencional, no un fallo real
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();

    return () => controller.abort();
  }, []);

  return { clientes, loading, error };
};

// useclientedetalle — el asistente que saca la carpeta de un tutor específico,
// incluye sus mascotas con historial médico embebido en la misma respuesta
export const useClienteDetalle = (id) => {
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // sin id no hay número de ficha — el asistente no sale a buscar nada
    if (!id) return;

    const controller = new AbortController();

    const fetchCliente = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API}/clientes/${id}`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`Error ${res.status}: cliente no encontrado`);

        const data = await res.json();
        setCliente(data);
      } catch (err) {
        // cancelación intencional — el componente se desmontó antes de que llegara la ficha
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCliente();

    return () => controller.abort();
  }, [id]);

  return { cliente, loading, error };
};