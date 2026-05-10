/**
 * constants.js
 * Constantes globales de la aplicación
 * Punto único de verdad para valores que se repiten en el proyecto
 */

// ─────────────────────────────────────────────
// API
// ─────────────────────────────────────────────
export const API_BASE_URL = 'http://localhost:3000/api';
export const GRAPHQL_URL = `${API_BASE_URL}/graphql`;

// ─────────────────────────────────────────────
// REGLAS DE NEGOCIO
// ─────────────────────────────────────────────
export const MAX_CITAS_POR_DIA = 8;

// ─────────────────────────────────────────────
// ESTADOS DE CITA
// ─────────────────────────────────────────────
export const ESTADOS_CITA = {
  PENDIENTE: 'pendiente',
  CONFIRMADA: 'confirmada',
  COMPLETADA: 'completada',
  CANCELADA: 'cancelada',
};

// Colores Tailwind para cada estado (usados en Badge)
export const COLORES_ESTADO = {
  pendiente:  'bg-yellow-100 text-yellow-800',
  confirmada: 'bg-green-100  text-green-800',
  completada: 'bg-blue-100   text-blue-800',
  cancelada:  'bg-red-100    text-red-800',
};

// Labels legibles en español para cada estado
export const LABELS_ESTADO = {
  pendiente:  'Pendiente',
  confirmada: 'Confirmada',
  completada: 'Completada',
  cancelada:  'Cancelada',
};

// ─────────────────────────────────────────────
// ESPECIES
// ─────────────────────────────────────────────
export const ESPECIES = ['Perro', 'Gato', 'Ave', 'Conejo', 'Reptil', 'Otro'];

// Emojis para cada especie (usados en tarjetas de mascota)
export const EMOJI_ESPECIE = {
  Perro:  '🐶',
  Gato:   '🐱',
  Ave:    '🐦',
  Conejo: '🐰',
  Reptil: '🦎',
  Otro:   '🐾',
};

// ─────────────────────────────────────────────
// RUTAS DE NAVEGACIÓN
// ─────────────────────────────────────────────
export const RUTAS = {
  HOME:            '/',
  CLIENTES:        '/clientes',
  CLIENTE_DETALLE: '/clientes/:id',
  CITAS:           '/citas',
};

// ─────────────────────────────────────────────
// TEXTOS UI REUTILIZABLES
// ─────────────────────────────────────────────
export const TEXTOS = {
  CARGANDO:        'Cargando...',
  SIN_RESULTADOS:  'No hay resultados para mostrar',
  ERROR_GENERICO:  'Ocurrió un error al cargar los datos',
  SIN_CITAS:       'No hay citas programadas para este día',
  SIN_CLIENTES:    'No hay clientes registrados',
  SIN_MASCOTAS:    'Este cliente no tiene mascotas registradas',
  SIN_HISTORIAL:   'Sin historial médico registrado',
};