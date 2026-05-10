/**
 * tests/e2e/clientes.cy.js
 * Tests E2E — Páginas de Clientes y Detalle de Cliente
 *
 * Asume que el backend REST corre en http://localhost:3000/api
 * y que la app está en http://localhost:5173
 */

// ── Fixtures inline basadas en db.json ──────────────────────────────────────

const CLIENTES = [
  {
    id: 'c1', nombre: 'Ana Martínez', telefono: '+56921112233',
    email: 'ana.martinez@gmail.com', direccion: 'Av. Providencia 1234, Santiago',
    mascotas: [
      { id: 'm1', nombre: 'Luna',  especie: 'Perro', raza: 'Labrador Retriever' },
      { id: 'm2', nombre: 'Milo',  especie: 'Gato',  raza: 'Siamés' },
    ],
  },
  {
    id: 'c2', nombre: 'Luis Herrera', telefono: '+56933445566',
    email: 'luis.herrera@outlook.com', direccion: 'Calle Las Flores 567, Ñuñoa',
    mascotas: [
      { id: 'm3', nombre: 'Rocky', especie: 'Perro', raza: 'Bulldog Francés' },
    ],
  },
  {
    id: 'c3', nombre: 'Sofía Vega', telefono: '+56944556677',
    email: 'sofia.vega@gmail.com', direccion: 'Pasaje El Roble 89, Las Condes',
    mascotas: [
      { id: 'm4', nombre: 'Cleo', especie: 'Gato',  raza: 'Persa' },
      { id: 'm5', nombre: 'Thor', especie: 'Perro', raza: 'Golden Retriever' },
    ],
  },
  {
    id: 'c4', nombre: 'Rodrigo Fuentes', telefono: '+56955667788',
    email: 'r.fuentes@empresa.cl', direccion: 'Av. La Florida 2200, La Florida',
    mascotas: [
      { id: 'm6', nombre: 'Nala', especie: 'Perro', raza: 'Beagle' },
    ],
  },
  {
    id: 'c5', nombre: 'Paola Díaz', telefono: '+56966778899',
    email: 'paola.diaz@gmail.com', direccion: 'Los Aromos 340, Maipú',
    mascotas: [
      { id: 'm7', nombre: 'Kira', especie: 'Gato', raza: 'Mestizo' },
      { id: 'm8', nombre: 'Pip',  especie: 'Ave',  raza: 'Canario' },
    ],
  },
];

const CLIENTE_C1_DETALLE = {
  id: 'c1', nombre: 'Ana Martínez', telefono: '+56921112233',
  email: 'ana.martinez@gmail.com', direccion: 'Av. Providencia 1234, Santiago',
  mascotas: [
    {
      id: 'm1', nombre: 'Luna', especie: 'Perro', raza: 'Labrador Retriever',
      edad: 4, peso: 28.5,
      historialMedico: [
        {
          fecha: '2024-03-15', descripcion: 'Control anual y vacunación',
          veterinario: 'Dra. Valentina Rojas', diagnostico: 'Animal sano',
          tratamiento: 'Vacuna séxtuple + antiparasitario',
        },
        {
          fecha: '2024-08-20', descripcion: 'Consulta por cojera leve en pata trasera derecha',
          veterinario: 'Dr. Sebastián Muñoz', diagnostico: 'Esguince leve',
          tratamiento: 'Reposo 7 días, antiinflamatorio oral',
        },
      ],
    },
    {
      id: 'm2', nombre: 'Milo', especie: 'Gato', raza: 'Siamés',
      edad: 2, peso: 4.2,
      historialMedico: [
        {
          fecha: '2024-05-10', descripcion: 'Esterilización',
          veterinario: 'Dr. Sebastián Muñoz', diagnostico: 'Procedimiento electivo',
          tratamiento: 'Cirugía de esterilización exitosa',
        },
      ],
    },
  ],
};

const CLIENTE_C2_DETALLE = {
  id: 'c2', nombre: 'Luis Herrera', telefono: '+56933445566',
  email: 'luis.herrera@outlook.com', direccion: 'Calle Las Flores 567, Ñuñoa',
  mascotas: [
    {
      id: 'm3', nombre: 'Rocky', especie: 'Perro', raza: 'Bulldog Francés',
      edad: 6, peso: 12.0,
      historialMedico: [
        {
          fecha: '2024-01-22', descripcion: 'Dermatitis alérgica recurrente',
          veterinario: 'Dra. Camila Torres', diagnostico: 'Dermatitis atópica',
          tratamiento: 'Shampoo medicado, dieta hipoalergénica',
        },
      ],
    },
  ],
};

// ── Helpers ──────────────────────────────────────────────────────────────────

const interceptClientes = (body = CLIENTES) => {
  cy.intercept('GET', '**/api/clientes', { statusCode: 200, body }).as('clientesCargados');
};

const interceptClienteDetalle = (id, body) => {
  cy.intercept('GET', `**/api/clientes/${id}`, { statusCode: 200, body }).as(`cliente_${id}`);
};

// ────────────────────────────────────────────────────────────────────────────

describe('Página de Clientes', () => {

  // ── 1. Carga inicial ───────────────────────────────────────────────────────

  describe('Carga inicial', () => {
    beforeEach(() => {
      interceptClientes();
      cy.visit('/clientes');
      cy.wait('@clientesCargados');
    });

    it('muestra el título de la página', () => {
      cy.contains('h1', 'Clientes').should('be.visible');
    });

    it('muestra el subtítulo descriptivo', () => {
      cy.contains('Listado de clientes registrados y sus mascotas').should('be.visible');
    });

    it('muestra el spinner mientras carga', () => {
      cy.intercept('GET', '**/api/clientes', (req) => {
        req.reply({ delay: 500, statusCode: 200, body: CLIENTES });
      }).as('clientesDelay');

      cy.visit('/clientes');
      cy.contains('Cargando clientes...').should('be.visible');
      cy.wait('@clientesDelay');
    });
  });

  // ── 2. Listado de clientes ─────────────────────────────────────────────────

  describe('Listado de clientes', () => {
    beforeEach(() => {
      interceptClientes();
      cy.visit('/clientes');
      cy.wait('@clientesCargados');
    });

    it('muestra 5 tarjetas de cliente', () => {
      cy.get('[data-testid="cliente-card"]').should('have.length', 5);
    });

    it('muestra el contador "5 clientes registrados"', () => {
      cy.contains('5 clientes registrados').should('be.visible');
    });

    it('muestra el nombre del primer cliente', () => {
      cy.get('[data-testid="cliente-card"]').first().contains('Ana Martínez');
    });

    it('muestra el email del primer cliente', () => {
      cy.get('[data-testid="cliente-card"]').first().contains('ana.martinez@gmail.com');
    });

    it('muestra el teléfono del primer cliente', () => {
      cy.get('[data-testid="cliente-card"]').first().contains('+56921112233');
    });

    it('muestra la dirección del primer cliente', () => {
      cy.get('[data-testid="cliente-card"]').first().contains('Av. Providencia 1234, Santiago');
    });

    it('muestra el badge de cantidad de mascotas del primer cliente (2 mascotas)', () => {
      cy.get('[data-testid="cliente-card"]').first().contains('2 mascotas');
    });

    it('muestra el badge "1 mascota" en singular para clientes con una sola mascota', () => {
      cy.get('[data-testid="cliente-card"]').eq(1).contains('1 mascota');
    });

    it('muestra los nombres de las mascotas del primer cliente', () => {
      cy.get('[data-testid="cliente-card"]').first().contains('Luna');
      cy.get('[data-testid="cliente-card"]').first().contains('Milo');
    });

    it('muestra la flecha "Ver detalle →" en cada tarjeta', () => {
      cy.get('[data-testid="cliente-card"]').first().contains('Ver detalle →');
    });
  });

  // ── 3. Navegación al detalle ───────────────────────────────────────────────

  describe('Navegación al detalle del cliente', () => {
    beforeEach(() => {
      interceptClientes();
      interceptClienteDetalle('c1', CLIENTE_C1_DETALLE);
      cy.visit('/clientes');
      cy.wait('@clientesCargados');
    });

    it('navega a /clientes/c1 al hacer click en la primera tarjeta', () => {
      cy.get('[data-testid="cliente-card"]').first().click();
      cy.url().should('include', '/clientes/c1');
    });

    it('carga el detalle del cliente al navegar', () => {
      cy.get('[data-testid="cliente-card"]').first().click();
      cy.wait('@cliente_c1');
      cy.get('[data-testid="cliente-detalle"]').should('be.visible');
    });
  });

  // ── 4. Estado vacío ────────────────────────────────────────────────────────

  describe('Estado vacío', () => {
    it('muestra el estado vacío cuando no hay clientes', () => {
      interceptClientes([]);
      cy.visit('/clientes');
      cy.wait('@clientesCargados');
      cy.contains('👥').should('be.visible');
      cy.get('[data-testid="cliente-card"]').should('not.exist');
    });
  });

  // ── 5. Estado de error ─────────────────────────────────────────────────────

  describe('Estado de error', () => {
    it('muestra mensaje de error cuando la API falla', () => {
      cy.intercept('GET', '**/api/clientes', { statusCode: 500, body: {} }).as('clientesError');
      cy.visit('/clientes');
      cy.wait('@clientesError');
      cy.contains(/error/i).should('be.visible');
      cy.get('[data-testid="cliente-card"]').should('not.exist');
    });
  });

});

// ────────────────────────────────────────────────────────────────────────────

describe('Página de Detalle de Cliente', () => {

  // ── 1. Datos personales ────────────────────────────────────────────────────

  describe('Datos personales del cliente', () => {
    beforeEach(() => {
      interceptClienteDetalle('c1', CLIENTE_C1_DETALLE);
      cy.visit('/clientes/c1');
      cy.wait('@cliente_c1');
    });

    it('muestra el contenedor principal del detalle', () => {
      cy.get('[data-testid="cliente-detalle"]').should('be.visible');
    });

    it('muestra el nombre del cliente como título', () => {
      cy.contains('h2', 'Ana Martínez').should('be.visible');
    });

    it('muestra el email del cliente', () => {
      cy.contains('ana.martinez@gmail.com').should('be.visible');
    });

    it('muestra el teléfono del cliente', () => {
      cy.contains('+56921112233').should('be.visible');
    });

    it('muestra la dirección del cliente', () => {
      cy.contains('Av. Providencia 1234, Santiago').should('be.visible');
    });

    it('muestra el badge "Cliente"', () => {
      cy.contains('Cliente').should('be.visible');
    });

    it('muestra "2 registradas" en el campo mascotas', () => {
      cy.contains('2 registradas').should('be.visible');
    });

    it('muestra el botón "← Volver"', () => {
      cy.contains('← Volver').should('be.visible');
    });
  });

  // ── 2. Listado de mascotas ─────────────────────────────────────────────────

  describe('Mascotas del cliente', () => {
    beforeEach(() => {
      interceptClienteDetalle('c1', CLIENTE_C1_DETALLE);
      cy.visit('/clientes/c1');
      cy.wait('@cliente_c1');
    });

    it('muestra el título "Mascotas"', () => {
      cy.contains('h3', 'Mascotas').should('be.visible');
    });

    it('muestra 2 paneles de mascota para Ana Martínez', () => {
      cy.get('[data-testid="mascota-panel"]').should('have.length', 2);
    });

    it('muestra el nombre de la primera mascota (Luna)', () => {
      cy.get('[data-testid="mascota-panel"]').first().contains('Luna');
    });

    it('muestra la especie y raza de Luna', () => {
      cy.get('[data-testid="mascota-panel"]').first().contains('Perro');
      cy.get('[data-testid="mascota-panel"]').first().contains('Labrador Retriever');
    });

    it('muestra el nombre de la segunda mascota (Milo)', () => {
      cy.get('[data-testid="mascota-panel"]').eq(1).contains('Milo');
    });

    it('muestra la especie y raza de Milo', () => {
      cy.get('[data-testid="mascota-panel"]').eq(1).contains('Gato');
      cy.get('[data-testid="mascota-panel"]').eq(1).contains('Siamés');
    });
  });

  // ── 3. Historial médico ────────────────────────────────────────────────────

  describe('Historial médico de las mascotas', () => {
    beforeEach(() => {
      interceptClienteDetalle('c1', CLIENTE_C1_DETALLE);
      cy.visit('/clientes/c1');
      cy.wait('@cliente_c1');
    });

    it('muestra el label "Historial médico" en los paneles', () => {
      cy.get('[data-testid="mascota-panel"]').first().contains(/historial médico/i);
    });

    it('muestra las 2 entradas del historial de Luna', () => {
      cy.get('[data-testid="mascota-panel"]').first().within(() => {
        cy.contains('Control anual y vacunación').should('be.visible');
        cy.contains('Consulta por cojera leve en pata trasera derecha').should('be.visible');
      });
    });

    it('muestra el diagnóstico de la primera entrada de Luna', () => {
      cy.get('[data-testid="mascota-panel"]').first().contains('Animal sano');
    });

    it('muestra el tratamiento de la primera entrada de Luna', () => {
      cy.get('[data-testid="mascota-panel"]').first().contains('Vacuna séxtuple + antiparasitario');
    });

    it('muestra el nombre del veterinario en el historial', () => {
      cy.get('[data-testid="mascota-panel"]').first().contains('Dra. Valentina Rojas');
    });

    it('muestra la entrada del historial de Milo (esterilización)', () => {
      cy.get('[data-testid="mascota-panel"]').eq(1).contains('Esterilización');
    });
  });

  // ── 4. Navegación ──────────────────────────────────────────────────────────

  describe('Navegación desde el detalle', () => {
    it('el botón Volver regresa a la página anterior', () => {
      interceptClientes();
      interceptClienteDetalle('c1', CLIENTE_C1_DETALLE);

      cy.visit('/clientes');
      cy.wait('@clientesCargados');
      cy.get('[data-testid="cliente-card"]').first().click();
      cy.wait('@cliente_c1');
      cy.contains('← Volver').click();
      cy.url().should('include', '/clientes');
    });

    it('navegar directamente a /clientes/c2 carga los datos de Luis Herrera', () => {
      interceptClienteDetalle('c2', CLIENTE_C2_DETALLE);
      cy.visit('/clientes/c2');
      cy.wait('@cliente_c2');
      cy.contains('Luis Herrera').should('be.visible');
      cy.get('[data-testid="mascota-panel"]').should('have.length', 1);
      cy.contains('Rocky').should('be.visible');
    });
  });

  // ── 5. Estados especiales ──────────────────────────────────────────────────

  describe('Estados especiales', () => {
    it('muestra spinner mientras carga el detalle', () => {
      cy.intercept('GET', '**/api/clientes/c1', (req) => {
        req.reply({ delay: 500, statusCode: 200, body: CLIENTE_C1_DETALLE });
      }).as('clienteDelay');

      cy.visit('/clientes/c1');
      cy.contains('Cargando cliente...').should('be.visible');
      cy.wait('@clienteDelay');
    });

    it('muestra "Cliente no encontrado" para un id inexistente', () => {
      cy.intercept('GET', '**/api/clientes/c99', { statusCode: 404, body: {} }).as('clienteNoExiste');
      cy.visit('/clientes/c99');
      cy.wait('@clienteNoExiste');
      cy.contains('Cliente no encontrado').should('be.visible');
    });

    it('muestra mensaje de error si la API falla al cargar el detalle', () => {
      cy.intercept('GET', '**/api/clientes/c1', { statusCode: 500, body: {} }).as('clienteError');
      cy.visit('/clientes/c1');
      cy.wait('@clienteError');
      cy.contains(/error/i).should('be.visible');
    });
  });

});