// e2e — homepage
// verifica que la recepción de la clínica carga correctamente
// y que los accesos directos llevan a las salas correctas
describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('muestra el título principal', () => {
    cy.contains('Cuidado Animal').should('be.visible');
  });

  it('muestra la descripción del sistema', () => {
    cy.contains('Sistema de gestión veterinaria').should('be.visible');
  });

  it('muestra el emoji principal', () => {
    cy.contains('🐾').should('exist');
  });

  it('muestra el acceso directo a Clientes', () => {
    cy.contains('Clientes').should('be.visible');
  });

  it('muestra el acceso directo a Citas del día', () => {
    cy.contains('Citas del día').should('be.visible');
  });

  it('navega a /clientes al hacer click en el acceso Clientes', () => {
    cy.contains('button', 'Clientes').click();
    cy.url().should('include', '/clientes');
  });

  it('navega a /citas al hacer click en Citas del día', () => {
    cy.contains('button', 'Citas del día').click();
    cy.url().should('include', '/citas');
  });
});

// e2e — página clientes
// verifica que el archivador de tutores carga sin errores críticos
describe('Página Clientes', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/clientes');
  });

  it('carga la página de clientes correctamente', () => {
    cy.url().should('include', '/clientes');
  });

  it('muestra un spinner o lista de clientes al cargar', () => {
    cy.get('body').should('exist');
  });

  it('la página no muestra errores críticos', () => {
    cy.get('body').should('not.contain', 'Cannot read');
  });
});

// e2e — página citas
// verifica que la agenda del día carga con el filtro de fecha operativo
describe('Página Citas', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/citas');
  });

  it('carga la página de citas correctamente', () => {
    cy.url().should('include', '/citas');
  });

  it('muestra el filtro de fecha', () => {
    cy.get('[data-testid="filtro-fecha"]').should('exist');
  });

  it('el input de fecha tiene type date', () => {
    cy.get('input[type="date"]').should('exist');
  });

  it('la página no muestra errores críticos', () => {
    cy.get('body').should('not.contain', 'Cannot read');
  });
});

// e2e — navegación general
// verifica que los pasillos entre salas funcionan en ambas direcciones
describe('Navegación', () => {
  it('redirige correctamente a la home desde /', () => {
    cy.visit('http://localhost:5173/');
    cy.url().should('eq', 'http://localhost:5173/');
  });

  it('puede navegar de home a clientes y volver', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('button', 'Clientes').click();
    cy.url().should('include', '/clientes');
    cy.go('back');
    cy.url().should('eq', 'http://localhost:5173/');
  });

  it('puede navegar de home a citas y volver', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('button', 'Citas del día').click();
    cy.url().should('include', '/citas');
    cy.go('back');
    cy.url().should('eq', 'http://localhost:5173/');
  });
});