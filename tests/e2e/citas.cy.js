/**
 * tests/e2e/citas.cy.js
 * Tests E2E — Página de Citas
 *
 * Asume que el backend REST corre en http://localhost:3000/api
 * y que la app está en http://localhost:5173
 */

// ── Fixtures inline basadas en db.json ──────────────────────────────────────

const CITAS_10_JUNIO = [
  {
    id: 'a1', fecha: '2025-06-10', hora: '09:00', estado: 'confirmada',
    motivo: 'Control anual', notas: '',
    mascota:     { nombre: 'Luna',  especie: 'Perro', raza: 'Labrador Retriever' },
    cliente:     { nombre: 'Ana Martínez',  telefono: '+56921112233' },
    veterinario: { nombre: 'Dra. Valentina Rojas', especialidad: 'Medicina General' },
  },
  {
    id: 'a2', fecha: '2025-06-10', hora: '09:30', estado: 'confirmada',
    motivo: 'Control dermatológico', notas: 'Traer fotos de la piel en crisis',
    mascota:     { nombre: 'Rocky', especie: 'Perro', raza: 'Bulldog Francés' },
    cliente:     { nombre: 'Luis Herrera',  telefono: '+56933445566' },
    veterinario: { nombre: 'Dra. Camila Torres', especialidad: 'Dermatología' },
  },
  {
    id: 'a3', fecha: '2025-06-10', hora: '10:00', estado: 'pendiente',
    motivo: 'Vacunación', notas: '',
    mascota:     { nombre: 'Thor',  especie: 'Perro', raza: 'Golden Retriever' },
    cliente:     { nombre: 'Sofía Vega',    telefono: '+56944556677' },
    veterinario: { nombre: 'Dra. Valentina Rojas', especialidad: 'Medicina General' },
  },
  {
    id: 'a4', fecha: '2025-06-10', hora: '10:30', estado: 'confirmada',
    motivo: 'Control urinario', notas: 'Llevar muestra de orina',
    mascota:     { nombre: 'Kira',  especie: 'Gato', raza: 'Mestizo' },
    cliente:     { nombre: 'Paola Díaz',    telefono: '+56966778899' },
    veterinario: { nombre: 'Dra. Valentina Rojas', especialidad: 'Medicina General' },
  },
  {
    id: 'a5', fecha: '2025-06-10', hora: '11:00', estado: 'completada',
    motivo: 'Revisión post-esterilización', notas: '',
    mascota:     { nombre: 'Milo',  especie: 'Gato', raza: 'Siamés' },
    cliente:     { nombre: 'Ana Martínez',  telefono: '+56921112233' },
    veterinario: { nombre: 'Dr. Sebastián Muñoz', especialidad: 'Cirugía' },
  },
  {
    id: 'a6', fecha: '2025-06-10', hora: '11:30', estado: 'pendiente',
    motivo: 'Refuerzo vacuna', notas: '',
    mascota:     { nombre: 'Nala',  especie: 'Perro', raza: 'Beagle' },
    cliente:     { nombre: 'Rodrigo Fuentes', telefono: '+56955667788' },
    veterinario: { nombre: 'Dra. Valentina Rojas', especialidad: 'Medicina General' },
  },
  {
    id: 'a7', fecha: '2025-06-10', hora: '15:00', estado: 'confirmada',
    motivo: 'Limpieza dental', notas: 'Ayuno 8 horas previo',
    mascota:     { nombre: 'Cleo',  especie: 'Gato', raza: 'Persa' },
    cliente:     { nombre: 'Sofía Vega',    telefono: '+56944556677' },
    veterinario: { nombre: 'Dra. Camila Torres', especialidad: 'Dermatología' },
  },
  {
    id: 'a8', fecha: '2025-06-10', hora: '15:30', estado: 'pendiente',
    motivo: 'Control general', notas: '',
    mascota:     { nombre: 'Pip',   especie: 'Ave',  raza: 'Canario' },
    cliente:     { nombre: 'Paola Díaz',    telefono: '+56966778899' },
    veterinario: { nombre: 'Dra. Valentina Rojas', especialidad: 'Medicina General' },
  },
];

const CITAS_11_JUNIO = [
  {
    id: 'a9', fecha: '2025-06-11', hora: '09:00', estado: 'confirmada',
    motivo: 'Cirugía menor', notas: 'Ayuno 12 horas',
    mascota:     { nombre: 'Luna',  especie: 'Perro', raza: 'Labrador Retriever' },
    cliente:     { nombre: 'Ana Martínez',  telefono: '+56921112233' },
    veterinario: { nombre: 'Dr. Sebastián Muñoz', especialidad: 'Cirugía' },
  },
  {
    id: 'a10', fecha: '2025-06-11', hora: '10:00', estado: 'pendiente',
    motivo: 'Seguimiento dermatitis', notas: '',
    mascota:     { nombre: 'Rocky', especie: 'Perro', raza: 'Bulldog Francés' },
    cliente:     { nombre: 'Luis Herrera',  telefono: '+56933445566' },
    veterinario: { nombre: 'Dra. Camila Torres', especialidad: 'Dermatología' },
  },
];

const CITAS_VACIO = [];

// ── Helper: intercepta GET /api/citas?fecha=YYYY-MM-DD ──────────────────────

const interceptCitas = (fecha, body) => {
  cy.intercept('GET', `**/api/citas?fecha=${fecha}`, { statusCode: 200, body }).as(`citas_${fecha}`);
};

// ────────────────────────────────────────────────────────────────────────────

describe('Página de Citas', () => {

  // ── 1. Carga inicial ───────────────────────────────────────────────────────

  describe('Carga inicial', () => {
    beforeEach(() => {
      // Interceptamos la fecha de hoy con datos del 10 de junio para pruebas estables
      cy.intercept('GET', '**/api/citas*', { statusCode: 200, body: CITAS_10_JUNIO }).as('citasHoy');
      cy.visit('/citas');
      cy.wait('@citasHoy');
    });

    it('muestra el título de la página', () => {
      cy.contains('h1', 'Citas').should('be.visible');
    });

    it('muestra el subtítulo con el límite de citas', () => {
      cy.contains('máximo 8 por día').should('be.visible');
    });

    it('muestra el filtro de fecha', () => {
      cy.get('input[type="date"]').should('exist');
    });

    it('muestra el spinner mientras carga', () => {
      // Interceptamos con delay para capturar el spinner
      cy.intercept('GET', '**/api/citas*', (req) => {
        req.reply({ delay: 500, statusCode: 200, body: CITAS_10_JUNIO });
      }).as('citasDelay');

      cy.visit('/citas');
      cy.contains('Cargando citas...').should('be.visible');
      cy.wait('@citasDelay');
    });
  });

  // ── 2. Listado de citas ────────────────────────────────────────────────────

  describe('Listado de citas del día', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/api/citas*', { statusCode: 200, body: CITAS_10_JUNIO }).as('citasCargadas');
      cy.visit('/citas');
      cy.wait('@citasCargadas');
    });

    it('muestra 8 tarjetas de cita', () => {
      cy.get('[data-testid="cita-card"]').should('have.length', 8);
    });

    it('muestra el contador "8 de 8 citas"', () => {
      cy.contains('8 de 8 citas').should('be.visible');
    });

    it('muestra la barra de capacidad al 100%', () => {
      cy.contains('100%').should('be.visible');
    });

    it('muestra la hora de cada cita correctamente', () => {
      cy.get('[data-testid="cita-card"]').first().contains('09:00');
    });

    it('muestra el nombre de la mascota en la primera cita', () => {
      cy.get('[data-testid="cita-card"]').first().contains('Luna');
    });

    it('muestra el nombre del dueño en la primera cita', () => {
      cy.get('[data-testid="cita-card"]').first().contains('Ana Martínez');
    });

    it('muestra el nombre del veterinario en la primera cita', () => {
      cy.get('[data-testid="cita-card"]').first().contains('Dra. Valentina Rojas');
    });

    it('muestra el motivo de la cita cuando existe', () => {
      cy.get('[data-testid="cita-card"]').first().contains('Control anual');
    });

    it('muestra las notas cuando existen', () => {
      // cita a2 tiene notas
      cy.get('[data-testid="cita-card"]').eq(1).contains('Traer fotos de la piel en crisis');
    });

    it('muestra el badge de estado "confirmada"', () => {
      cy.get('[data-testid="cita-card"]').first().contains(/confirmada/i);
    });

    it('muestra el badge de estado "pendiente"', () => {
      cy.get('[data-testid="cita-card"]').eq(2).contains(/pendiente/i);
    });

    it('muestra el badge de estado "completada"', () => {
      cy.get('[data-testid="cita-card"]').eq(4).contains(/completada/i);
    });
  });

  // ── 3. Filtro de fecha ─────────────────────────────────────────────────────

  describe('Filtro de fecha', () => {
    beforeEach(() => {
      interceptCitas('2025-06-10', CITAS_10_JUNIO);
      interceptCitas('2025-06-11', CITAS_11_JUNIO);
      interceptCitas('2025-06-12', CITAS_VACIO);

      cy.intercept('GET', '**/api/citas*', { statusCode: 200, body: CITAS_10_JUNIO }).as('citasDefault');
      cy.visit('/citas');
      cy.wait('@citasDefault');
    });

    it('al cambiar la fecha a 2025-06-11 carga 2 citas', () => {
      cy.get('input[type="date"]').type('2025-06-11');
      cy.wait('@citas_2025-06-11');
      cy.get('[data-testid="cita-card"]').should('have.length', 2);
    });

    it('al cambiar la fecha a 2025-06-11 muestra "2 de 8 citas"', () => {
      cy.get('input[type="date"]').type('2025-06-11');
      cy.wait('@citas_2025-06-11');
      cy.contains('2 de 8 citas').should('be.visible');
    });

    it('al cambiar a un día sin citas muestra el estado vacío', () => {
      cy.get('input[type="date"]').type('2025-06-12');
      cy.wait('@citas_2025-06-12');
      cy.contains('Sin citas para este día').should('be.visible');
      cy.get('[data-testid="cita-card"]').should('not.exist');
    });

    it('al cambiar a un día sin citas no muestra la barra de capacidad', () => {
      cy.get('input[type="date"]').type('2025-06-12');
      cy.wait('@citas_2025-06-12');
      cy.contains('%').should('not.exist');
    });

    it('las citas del 11 de junio muestran datos correctos', () => {
      cy.get('input[type="date"]').type('2025-06-11');
      cy.wait('@citas_2025-06-11');
      cy.get('[data-testid="cita-card"]').first().contains('Luna');
      cy.get('[data-testid="cita-card"]').first().contains('Cirugía menor');
      cy.get('[data-testid="cita-card"]').first().contains('Ayuno 12 horas');
    });
  });

  // ── 4. Estado de error ─────────────────────────────────────────────────────

  describe('Estado de error', () => {
    it('muestra mensaje de error cuando la API falla', () => {
      cy.intercept('GET', '**/api/citas*', { statusCode: 500, body: {} }).as('citasError');
      cy.visit('/citas');
      cy.wait('@citasError');
      cy.contains(/error/i).should('be.visible');
      cy.get('[data-testid="cita-card"]').should('not.exist');
    });
  });

});