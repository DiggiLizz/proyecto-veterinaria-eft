// clientesapi.js
// capa rest para el recurso clientes — solo lectura,
// como el archivador de recepción que se puede consultar pero no alterar

// dirección del mock — json-server escuchando en el puerto 3000
const API = 'http://localhost:3000/api';

// getclientes — trae todas las carpetas del archivador de tutores,
// cada cliente viene con sus mascotas embebidas en la misma respuesta
export const getClientes = async (signal) => {
  const res = await fetch(`${API}/clientes`, { signal });

  // si el archivador no respondió bien, avisamos que algo falló en la búsqueda
  if (!res.ok) {
    throw new Error(`Error ${res.status}: no se pudo obtener los clientes`);
  }

  return res.json();
};

// getclienteporid — saca la carpeta de un tutor específico por su número de ficha,
// incluye sus mascotas con historial médico completo embebido en la respuesta
export const getClientePorId = async (id, signal) => {
  const res = await fetch(`${API}/clientes/${id}`, { signal });

  // si el número de ficha no existe en el archivador, avisamos que no se encontró
  if (!res.ok) {
    throw new Error(`Error ${res.status}: cliente no encontrado`);
  }

  return res.json();
};