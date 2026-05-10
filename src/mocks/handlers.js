import { http, HttpResponse, graphql } from 'msw';
import db from '../data/db.json';
import { filtrarCitasPorFecha } from '../models/Cita';

// ─────────────────────────────────────────────
// BASE URL para todos los endpoints REST
// ─────────────────────────────────────────────
const API = 'http://localhost:3000/api';

// ─────────────────────────────────────────────
// HANDLERS REST
// ─────────────────────────────────────────────
export const restHandlers = [

  // GET /api/clientes
  // Retorna todos los clientes (sin mascotas embebidas)
  http.get(`${API}/clientes`, () => {
    return HttpResponse.json(db.clientes);
  }),

  // GET /api/clientes/:id
  // Retorna un cliente con sus mascotas embebidas (populate manual)
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

  // GET /api/mascotas/:id
  // Retorna una mascota con su cliente embebido
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

  // GET /api/citas?fecha=YYYY-MM-DD
  // Retorna citas del día con datos de mascota, cliente y veterinario embebidos
  // Aplica límite de 8 citas por día (regla de negocio)
  http.get(`${API}/citas`, ({ request }) => {
    const url = new URL(request.url);
    const fecha = url.searchParams.get('fecha');

    let citas = fecha ? filtrarCitasPorFecha(db.citas, fecha) : db.citas;

    // Populate: enriquecer cada cita con datos relacionados
    const citasEnriquecidas = citas.map((cita) => {
      const mascota = db.mascotas.find((m) => m.id === cita.mascotaId) ?? null;
      const cliente = db.clientes.find((c) => c.id === cita.clienteId) ?? null;
      const veterinario = db.veterinarios.find((v) => v.id === cita.veterinarioId) ?? null;

      return {
        ...cita,
        mascota,
        cliente,
        veterinario,
      };
    });

    return HttpResponse.json(citasEnriquecidas);
  }),

  // GET /api/veterinarios
  // Retorna todos los veterinarios
  http.get(`${API}/veterinarios`, () => {
    return HttpResponse.json(db.veterinarios);
  }),
];

// ─────────────────────────────────────────────
// HANDLERS GRAPHQL
// ─────────────────────────────────────────────
const graphqlHandler = graphql.link(`${API}/graphql`);

export const graphqlHandlers = [

  // Query: clientes
  // Retorna lista de clientes con sus mascotas
  graphqlHandler.query('GetClientes', () => {
    const clientes = db.clientes.map((cliente) => ({
      ...cliente,
      mascotas: db.mascotas.filter((m) => m.clienteId === cliente.id),
    }));

    return HttpResponse.json({ data: { clientes } });
  }),

  // Query: cliente(id)
  // Retorna un cliente con mascotas e historial médico
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

  // Query: citas(fecha)
  // Retorna citas del día con populate completo
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

// ─────────────────────────────────────────────
// EXPORT UNIFICADO
// Usado por browser.js y por los tests de Jest
// ─────────────────────────────────────────────
export const handlers = [...restHandlers, ...graphqlHandlers];