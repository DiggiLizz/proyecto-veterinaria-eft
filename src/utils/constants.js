// dirección de la clínica — punto de partida de todas las peticiones al sistema
export const API_BASE_URL = '/api';
export const GRAPHQL_URL  = `${API_BASE_URL}/graphql`;

// reglas de negocio — las normas internas de la clínica

// máximo de pacientes que se pueden atender en una jornada
export const MAX_CITAS_POR_DIA = 8;

// estados de cita — los stickers de colores que se pegan en cada turno
export const ESTADOS_CITA = {
  PENDIENTE:  'pendiente',
  CONFIRMADA: 'confirmada',
  COMPLETADA: 'completada',
  CANCELADA:  'cancelada',
};

// color del sticker según el estado del turno — semáforo de la sala de espera
export const COLORES_ESTADO = {
  pendiente:  'bg-yellow-100 text-yellow-800',
  confirmada: 'bg-green-100  text-green-800',
  completada: 'bg-blue-100   text-blue-800',
  cancelada:  'bg-red-100    text-red-800',
};

// texto legible del sticker — lo que dice el cartel en español
export const LABELS_ESTADO = {
  pendiente:  'Pendiente',
  confirmada: 'Confirmada',
  completada: 'Completada',
  cancelada:  'Cancelada',
};

// especies — los tipos de pacientes que atiende la clínica
export const ESPECIES = ['Perro', 'Gato', 'Ave', 'Conejo', 'Reptil', 'Otro'];

// emoji por especie — el dibujo en la etiqueta de la jaula o ficha del paciente
export const EMOJI_ESPECIE = {
  Perro:  '🐶',
  Gato:   '🐱',
  Ave:    '🐦',
  Conejo: '🐰',
  Reptil: '🦎',
  Otro:   '🐾',
};

// rutas de navegación — el mapa de pasillos de la clínica
export const RUTAS = {
  HOME:            '/',
  CLIENTES:        '/clientes',
  CLIENTE_DETALLE: '/clientes/:id',
  CITAS:           '/citas',
};

// textos reutilizables — los carteles estándar de la clínica
export const TEXTOS = {
  CARGANDO:       'Cargando...',
  SIN_RESULTADOS: 'No hay resultados para mostrar',
  ERROR_GENERICO: 'Ocurrió un error al cargar los datos',
  SIN_CITAS:      'No hay citas programadas para este día',
  SIN_CLIENTES:   'No hay clientes registrados',
  SIN_MASCOTAS:   'Este cliente no tiene mascotas registradas',
  SIN_HISTORIAL:  'Sin historial médico registrado',
};