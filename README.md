🐾 Cuidado Animal — Sistema de Gestión Veterinaria

"Un sistema bien diseñado, como una buena consulta veterinaria, debe ser claro, eficiente y confiable."

¡Bienvenido/a al sistema de gestión de la veterinaria Cuidado Animal! Este proyecto nació de la necesidad de digitalizar y organizar la información de clientes, mascotas y citas en un solo lugar.

🚀 ¿Qué hace este sistema?
El sistema permite:

👥 Gestionar clientes — Ver el listado completo con sus datos de contacto y mascotas asociadas
🐶 Ver mascotas — Acceder al detalle de cada mascota con su historial médico completo
📅 Consultar citas — Filtrar las atenciones agendadas por día (máximo 8 por día), mostrando veterinario, mascota y dueño


🧬 Stack Tecnológico
| Capa | Tecnología |
|------|------------|
| UI | React 19 + Tailwind CSS |
| Navegación | React Router DOM v7 |
| Estado global | Redux Toolkit |
| Comunicación REST | Axios + MSW (mock) |
| Comunicación GraphQL | Apollo Client + MSW (mock) |
| Pruebas unitarias | Jest + React Testing Library |
| Pruebas E2E | Cypress |

⚙️ Instalación y ejecución
Requisitos previos

Node.js v18 o superior
npm v9 o superior

Pasos
bash# 1. Clonar el repositorio
git clone https://github.com/DiggiLizz/proyecto-veterinaria-eft.git

# 2. Entrar al directorio
cd proyecto-veterinaria-eft

# 3. Instalar dependencias
npm install

# 4. Iniciar en modo desarrollo
npm run dev
La aplicación estará disponible en http://localhost:5173

🗺️ Rutas de la aplicación
| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio con resumen del sistema |
| `/clientes` | Listado de clientes y sus mascotas |
| `/clientes/:id` | Detalle de un cliente específico |
| `/citas` | Citas del día con filtro por fecha |

🧪 Pruebas
Pruebas unitarias (Jest)
bash# Ejecutar todos los tests
npm test

# Ver reporte de cobertura
npm run test:coverage
✅ Cobertura actual: 94.73% de líneas cubiertas — supera el umbral del 70%.
Pruebas end-to-end (Cypress)
bash# Asegurarse de que la app esté corriendo primero
npm run dev

# Abrir Cypress en otra terminal
npx cypress open
Seleccionar E2E Testing → Chrome → citas.cy.js
✅ 17/17 tests E2E pasando.

📁 Estructura del proyecto
```
📁 Estructura del proyecto
src/
  api/           # Integración REST y GraphQL
  components/    # Componentes reutilizables
    citas/       # CitaCard, CitasList, FiltroFecha
    clientes/    # ClienteCard, ClienteDetalle, ClientesList
    mascotas/    # MascotaCard, MascotaDetalle, HistorialMedico
    ui/          # Badge, Spinner, EmptyState
  data/          # Base de datos mock (db.json)
  hooks/         # Custom hooks (useCitas, useClientes, useGraphQL)
  mocks/         # MSW handlers para interceptar peticiones
  models/        # Modelos de datos
  pages/         # Páginas de la aplicación
  store/         # Redux store y slices
  utils/         # Utilidades y constantes
tests/
  unit/
    components/
    hooks/
    utils/
    ui/
    store/
cypress/
  e2e/
```

🔬 Arquitectura del backend mock
El backend es completamente simulado usando MSW (Mock Service Worker), que intercepta las peticiones HTTP en el navegador sin necesitar un servidor real.

REST → endpoints /api/clientes, /api/citas, /api/mascotas
GraphQL → endpoint /api/graphql con queries GetClientes, GetCliente, GetCitasPorFecha


👩‍💻 Autor
Lilian Zapata
Bimestre 9/Front2
Desarrollado como parte de la Evaluación Final Transversal