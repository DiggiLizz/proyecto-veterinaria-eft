import { useState, useEffect } from 'react';

const API = '/api';

// convierte cualquier formato de fecha al string 'YYYY-MM-DD' que espera el endpoint —
// como traducir la fecha del calendario de pared al formato que entiende el sistema
const toISODate = (date) => {
  if (!date) return null;
  // si ya es string lo devolvemos intacto sin procesar —
  // como no volver a sellar un formulario que ya tiene el sello correcto
  if (typeof date === 'string') return date;
  return date.toISOString().split('T')[0];
};

/**
 * useCitas
 * retorna las citas de un día específico vía REST
 * @param {Date|string} fecha - fecha a consultar (Date o 'YYYY-MM-DD')
 */
export const useCitas = (fecha) => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // el controller permite cancelar el fetch si el componente se desmonta o la fecha cambia —
    // como colgar el teléfono antes de que contesten si ya no necesitamos la respuesta
    const controller = new AbortController();

    const fetchCitas = async () => {
      try {
        setLoading(true);
        setError(null);

        // construimos la URL con o sin parámetro de fecha según lo que llegue —
        // como pedir el turno de un día específico o pedir todos los turnos si no hay filtro
        const fechaISO = toISODate(fecha);
        const url = fechaISO
          ? `${API}/citas?fecha=${fechaISO}`
          : `${API}/citas`;

        const res = await fetch(url, { signal: controller.signal });

        // ok: false es una respuesta HTTP de error, no una excepción de red —
        // como recibir una carta que dice "no disponible" en vez de que el correo se pierda
        if (!res.ok) throw new Error(`Error ${res.status}: no se pudo obtener las citas`);

        const data = await res.json();
        setCitas(data);
      } catch (err) {
        // ignoramos el AbortError porque es un cancelación intencional, no un fallo —
        // como no anotar "llamada fallida" cuando fuimos nosotros los que colgamos
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCitas();

    // cancelamos el fetch pendiente al desmontar o antes del siguiente efecto —
    // como dejar instrucciones de no atender la llamada si ya salimos de la sala
    return () => controller.abort();
  }, [toISODate(fecha)]); // re-fetch solo si cambia la fecha expresada como string ISO

  return { citas, loading, error };
};