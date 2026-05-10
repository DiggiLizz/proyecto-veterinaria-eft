import { useState, useEffect } from 'react';

const API = 'http://localhost:3000/api';

/**
 * useClientes
 * Retorna la lista completa de clientes vía REST
 */
export const useClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

/**
 * useClienteDetalle
 * Retorna un cliente con sus mascotas embebidas vía REST
 */
export const useClienteDetalle = (id) => {
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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