// api/index.js
// puerta de entrada unificada a todas las capas de datos de la clínica —
// rest y graphql disponibles desde un solo lugar, como una recepción central

// ── rest — ventanilla de fichas y agenda por http ──
export * from './rest/citasApi';
export * from './rest/clientesApi';

// ── graphql — ventanilla de consultas específicas al laboratorio ──
export * from './graphql/graphqlApi';
export * from './graphql/queries';
export * from './graphql/client';