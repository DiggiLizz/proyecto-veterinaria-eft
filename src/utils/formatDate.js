// locale de la clínica — todos los formatos de fecha y hora en español chileno
const LOCALE = 'es-CL';

// formatfecha — escribe la fecha completa como aparece en el encabezado de una ficha clínica
// ejemplo: 'martes, 10 de junio de 2025'
export const formatFecha = (fechaISO) => {
  if (!fechaISO) return '';
  // el t00:00:00 evita que el cambio de zona horaria adelante o atrase el día
  const date = new Date(`${fechaISO}T00:00:00`);
  return date.toLocaleDateString(LOCALE, {
    weekday: 'long',
    year:    'numeric',
    month:   'long',
    day:     'numeric',
  });
};

// formatfechacorta — la fecha abreviada que se sella en el historial médico
// ejemplo: '10/06/2025'
export const formatFechaCorta = (fechaISO) => {
  if (!fechaISO) return '';
  const date = new Date(`${fechaISO}T00:00:00`);
  return date.toLocaleDateString(LOCALE);
};

// formathora — convierte la hora del turno al formato que aparece en el tablero de espera
// ejemplo: '14:30' → '2:30 PM'
export const formatHora = (hora) => {
  if (!hora) return '';
  const [hh, mm] = hora.split(':');
  const date = new Date();
  date.setHours(Number(hh), Number(mm));
  return date.toLocaleTimeString(LOCALE, {
    hour:   'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

// toisodate — convierte un objeto date al formato que entiende la agenda de la clínica
// ejemplo: new Date() → '2025-06-10'
export const toISODate = (date) => {
  if (!date) return null;
  if (typeof date === 'string') return date;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// hoy — devuelve la fecha de hoy en el formato de la agenda,
// como abrir el calendario y apuntar al día de hoy
export const hoy = () => toISODate(new Date());

// formatedad — escribe la edad del paciente como aparece en su ficha clínica
// ejemplo: 1 → '1 año', 3 → '3 años'
export const formatEdad = (años) => {
  if (años === undefined || años === null) return '';
  return años === 1 ? '1 año' : `${años} años`;
};

// formatpeso — el peso que anota el vet después de poner al paciente en la balanza
// ejemplo: 28.5 → '28.5 kg', null → 'No registrado'
export const formatPeso = (kg) => {
  if (kg === null || kg === undefined) return 'No registrado';
  return `${kg} kg`;
};