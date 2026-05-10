/**
 * formatDate.js
 * Funciones puras para formatear fechas y horas
 * No dependen de librerías externas — solo Intl API nativa
 */

const LOCALE = 'es-CL';

/**
 * Formatea una fecha ISO 'YYYY-MM-DD' a formato legible
 * @example formatFecha('2025-06-10') → 'martes, 10 de junio de 2025'
 */
export const formatFecha = (fechaISO) => {
  if (!fechaISO) return '';
  // Se agrega T00:00:00 para evitar desfase de zona horaria
  const date = new Date(`${fechaISO}T00:00:00`);
  return date.toLocaleDateString(LOCALE, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Formatea una fecha ISO a formato corto
 * @example formatFechaCorta('2025-06-10') → '10/06/2025'
 */
export const formatFechaCorta = (fechaISO) => {
  if (!fechaISO) return '';
  const date = new Date(`${fechaISO}T00:00:00`);
  return date.toLocaleDateString(LOCALE);
};

/**
 * Formatea una hora 'HH:MM' a formato 12h con AM/PM
 * @example formatHora('14:30') → '2:30 PM'
 */
export const formatHora = (hora) => {
  if (!hora) return '';
  const [hh, mm] = hora.split(':');
  const date = new Date();
  date.setHours(Number(hh), Number(mm));
  return date.toLocaleTimeString(LOCALE, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

/**
 * Convierte un objeto Date a string 'YYYY-MM-DD'
 * Útil para pasar como parámetro a los hooks
 * @example toISODate(new Date()) → '2025-06-10'
 */
export const toISODate = (date) => {
  if (!date) return null;
  if (typeof date === 'string') return date;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

/**
 * Retorna el string 'YYYY-MM-DD' del día de hoy
 * @example hoy() → '2025-06-10'
 */
export const hoy = () => toISODate(new Date());

/**
 * Calcula la edad en años a partir de un número
 * Retorna el string formateado para mostrar
 * @example formatEdad(1) → '1 año'  formatEdad(3) → '3 años'
 */
export const formatEdad = (años) => {
  if (años === undefined || años === null) return '';
  return años === 1 ? '1 año' : `${años} años`;
};

/**
 * Formatea el peso en kg
 * @example formatPeso(28.5) → '28.5 kg'
 */
export const formatPeso = (kg) => {
  if (kg === null || kg === undefined) return 'No registrado';
  return `${kg} kg`;
};