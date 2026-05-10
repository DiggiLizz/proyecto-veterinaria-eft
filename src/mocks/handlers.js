import { http, HttpResponse, graphql } from 'msw';
import db from '../data/db.json';
import { filtrarCitasPorFecha } from '../models/Cita';

// ─────────────────────────────────────────────
// dirección de la clínica — todos los endpoints salen desde aquí
// ─────────────────────────────────────────────
const API = '/api';

// ─────────────────────────────────────────────
// recepción rest — atiende las peticiones http una por una,
// como la recepcionista que busca fichas en el archivador
// ─────────────────────────────────────────────
export const restHandlers = [

  // trae todas las fichas de clientes registrados en la clínica
  http.get(`${API}/clientes`, () => {
    return HttpResponse.json(db.clientes);
  }),

  // busca la ficha de un cliente específico y adjunta sus mascotas,
  // como sacar el expediente del dueño con todas sus mascotas juntas
  http.get(`${API}/clientes/:id`, ({ params }) => {
    const cliente = db.clientes.find((c) => c.id === params.id);

    if (!cliente) {
      return HttpResponse.json(
        { error: `Cliente con id '${params.id}' no encontrado` },
        { status: 404 }
      );
    }

    const mascotas = db.mascotas.filter((m) => m.clienteId === cliente.id);
    return HttpResponse.json({ ...cliente, mascotas });
  }),

  // busca la ficha clínica de una mascota y adjunta los datos de su dueño,
  // como el historial médico del paciente con la info de contacto del tutor
  http.get(`${API}/mascotas/:id`, ({ params }) => {
    const mascota = db.mascotas.find((m) => m.id === params.id);

    if (!mascota) {
      return HttpResponse.json(
        { error: `Mascota con id '${params.id}' no encontrada` },
        { status: 404 }
      );
    }

    const cliente = db.clientes.find((c) => c.id === mascota.clienteId);
    return HttpResponse.json({ ...mascota, cliente });
  }),

  // consulta la agenda del día — filtra por fecha y enriquece cada cita
  // con su mascota, dueño y veterinario, como preparar la tabla de turnos
  // antes de abrir la clínica en la mañana
  http.get(`${API}/citas`, ({ request }) => {
    const url = new URL(request.url);
    const fecha = url.searchParams.get('fecha');

    let citas = fecha ? filtrarCitasPorFecha(db.citas, fecha) : db.citas;

    const citasEnriquecidas = citas.map((cita) => {
      const mascota = db.mascotas.find((m) => m.id === cita.mascotaId) ?? null;
      const cliente = db.clientes.find((c) => c.id === cita.clienteId) ?? null;
      const veterinario = db.veterinarios.find((v) => v.id === cita.veterinarioId) ?? null;

      return { ...cita, mascota, cliente, veterinario };
    });

    return HttpResponse.json(citasEnriquecidas);
  }),

  // lista el equipo médico disponible en la clínica
  http.get(`${API}/veterinarios`, () => {
    return HttpResponse.json(db.veterinarios);
  }),
];

// ─────────────────────────────────────────────
// recepción graphql — atiende consultas más específicas,
// como un especialista que solo responde lo que le preguntas
// en vez de darte todo el expediente completo
// ─────────────────────────────────────────────
const graphqlHandler = graphql.link('/api/graphql');

export const graphqlHandlers = [

  // trae todos los clientes con sus mascotas incluidas,
  // como el listado completo de tutores con sus pacientes
  graphqlHandler.query('GetClientes', () => {
    const clientes = db.clientes.map((cliente) => ({
      ...cliente,
      mascotas: db.mascotas.filter((m) => m.clienteId === cliente.id),
    }));

    return HttpResponse.json({ data: { clientes } });
  }),

  // busca un tutor por id y adjunta sus mascotas,
  // como abrir el expediente de un dueño específico en consulta
  graphqlHandler.query('GetCliente', ({ variables }) => {
    const cliente = db.clientes.find((c) => c.id === variables.id);

    if (!cliente) {
      return HttpResponse.json({
        errors: [{ message: `Cliente '${variables.id}' no encontrado` }],
      });
    }

    const mascotas = db.mascotas.filter((m) => m.clienteId === cliente.id);
    return HttpResponse.json({
      data: { cliente: { ...cliente, mascotas } },
    });
  }),

  // filtra las citas por fecha y arma el detalle completo de cada turno,
  // como revisar qué pacientes están agendados para una jornada específica
  graphqlHandler.query('GetCitasPorFecha', ({ variables }) => {
    const citas = variables.fecha
      ? filtrarCitasPorFecha(db.citas, variables.fecha)
      : db.citas;

    const citasEnriquecidas = citas.map((cita) => ({
      ...cita,
      mascota: db.mascotas.find((m) => m.id === cita.mascotaId) ?? null,
      cliente: db.clientes.find((c) => c.id === cita.clienteId) ?? null,
      veterinario: db.veterinarios.find((v) => v.id === cita.veterinarioId) ?? null,
    }));

    return HttpResponse.json({ data: { citas: citasEnriquecidas } });
  }),
];

// todos los handlers juntos — la clínica completa lista para atender
export const handlers = [...restHandlers, ...graphqlHandlers];