import { useState, useEffect } from 'react';

const API = 'http://localhost:3000/api';

/**
 * Formatea una fecha Date a string 'YYYY-MM-DD'
 * para usarla como parámetro del endpoint
 */
const toISODate = (date) => {
  if (!date) return null;
  if (typeof date === 'string') return date;
  return date.toISOString().split('T')[0];
};

/**
 * useCitas
 * Retorna las citas de un día específico vía REST
 * El backend ya aplica el límite de 8 citas por día
 *
 * @param {Date|string} fecha - fecha a consultar (Date o 'YYYY-MM-DD')
 */
export const useCitas = (fecha) => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCitas = async () => {
      try {
        setLoading(true);
        setError(null);

        const fechaISO = toISODate(fecha);
        const url = fechaISO
          ? `${API}/citas?fecha=${fechaISO}`
          : `${API}/citas`;

        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) throw new Error(`Error ${res.status}: no se pudo obtener las citas`);

        const data = await res.json();
        setCitas(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCitas();

    return () => controller.abort();
  }, [toISODate(fecha)]); // re-fetch solo si cambia la fecha

  return { citas, loading, error };
};