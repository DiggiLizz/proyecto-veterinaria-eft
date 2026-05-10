// graphqlapi.js
// capa de acceso a datos vía graphql — solo lectura,
// como la ventanilla del laboratorio que solo entrega resultados, no los modifica

import { graphqlClient } from './client';
import {
  QUERY_CLIENTES,
  QUERY_CLIENTE,
  QUERY_CITAS_POR_FECHA,
} from './queries';

// gqlgetclientes — pide al laboratorio la lista completa de tutores con sus pacientes,
// como solicitar el directorio entero del archivador en una sola consulta
export const gqlGetClientes = async (signal) => {
  const data = await graphqlClient(QUERY_CLIENTES, {}, signal);
  return data.clientes;
};

// gqlgetcliente — pide al laboratorio el expediente completo de un tutor específico,
// incluyendo todas sus mascotas con historial médico detallado
export const gqlGetCliente = async (id, signal) => {
  const data = await graphqlClient(QUERY_CLIENTE, { id }, signal);
  return data.cliente;
};

// gqlgetcitasporfecha — pide al laboratorio los turnos de un día específico,
// como solicitar la agenda de una jornada sin tocar las de los demás días
export const gqlGetCitasPorFecha = async (fecha, signal) => {
  const data = await graphqlClient(QUERY_CITAS_POR_FECHA, { fecha }, signal);
  return data.citas;
};