/**
 * api/index.js
 * Punto de entrada unificado para todas las capas de acceso a datos
 * REST y GraphQL
 */

// ── REST ────────────────────────────────────────
export * from './rest/citasApi';
export * from './rest/clientesApi';

// ── GraphQL ─────────────────────────────────────
export * from './graphql/graphqlApi';
export * from './graphql/queries';
export * from './graphql/client';