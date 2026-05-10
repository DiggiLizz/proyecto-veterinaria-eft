// citasapi.js
// capa rest para el recurso citas — solo lectura,
// como la ventanilla de recepción que muestra la agenda pero no la modifica

// dirección del mock — json-server escuchando en el puerto 3000
const API = 'http://localhost:3000/api';

// getcitasporfecha — consulta la agenda de un día específico en recepción,
// el backend ya aplica el límite de 8 citas por jornada antes de responder
export const getCitasPorFecha = async (fecha, signal) => {

  // si viene una fecha, filtramos por ese día; si no, traemos toda la agenda
  const url = fecha
    ? `${API}/citas?fecha=${fecha}`
    : `${API}/citas`;

  const res = await fetch(url, { signal });

  // si recepción no pudo entregar la agenda, lanzamos el error con el código de falla
  if (!res.ok) {
    throw new Error(`Error ${res.status}: no se pudo obtener las citas`);
  }

  return res.json();
};

// getcitaporid — busca el turno específico por su número de ficha,
// como pedirle a recepción que saque solo ese sobre del archivador
export const getCitaPorId = async (id, signal) => {
  const res = await fetch(`${API}/citas/${id}`, { signal });

  // si el número de ficha no existe en el sistema, avisamos que no se encontró
  if (!res.ok) {
    throw new Error(`Error ${res.status}: cita no encontrada`);
  }

  return res.json();
};