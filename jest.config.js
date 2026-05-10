export default {
  // jsdom simula el navegador en el laboratorio de pruebas —
  // como montar una sala de consulta falsa para hacer los análisis sin pacientes reales
  testEnvironment: 'jsdom',

  // archivos que se cargan antes de los tests —
  // como preparar los instrumentos antes de abrir el laboratorio
  setupFiles: ['<rootDir>/src/jest.setup.js'],

  // archivos que se cargan después del entorno pero antes de cada test —
  // como calibrar los equipos justo antes de cada análisis
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  // le enseñamos a jest a leer archivos jsx y js —
  // como enseñarle al laboratorio a procesar distintos tipos de muestras
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },

  // reemplazos para archivos que jest no puede procesar directamente:
  // css → proxy vacío, imágenes → mock simple
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(png|jpg|jpeg|gif|svg|webp)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // solo buscamos tests en la carpeta de pruebas unitarias —
  // el laboratorio solo analiza las muestras que le corresponden
  testMatch: [
    '**/tests/unit/**/*.test.[jt]s?(x)',
  ],

  // archivos incluidos en el reporte de cobertura —
  // qué partes de la clínica queremos auditar
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/main.jsx',                                        // punto de entrada, no se testea
    '!src/mocks/**',                                        // el guardia de la puerta, no es lógica
    '!src/data/**',                                         // base de datos mock, no es código
    '!src/api/graphql/**',                                  // capa de red, excluida de cobertura
    '!src/api/rest/**',                                     // capa de red, excluida de cobertura
    '!src/api/index.js',                                    // índice de exportaciones
    '!src/context/**',                                      // contextos excluidos
    '!src/models/**',                                       // modelos de datos, excluidos
    '!src/pages/**',                                        // páginas, excluidas
    '!src/store/store.js',                                  // configuración del store
    '!src/components/layout/**',                            // navbar y footer
    '!src/App.jsx',                                         // raíz de la app
    '!src/hooks/useGraphQL.js',                             // hook de graphql
    '!src/components/ui/ErrorMessage.jsx',                  // componente ui simple
    '!src/components/citas/CitasList.jsx',                  // componente de lista
    '!src/components/clientes/ClientesList.jsx',            // componente de lista
    '!src/components/clientes/ClienteDetalle.jsx',          // componente de detalle
    '!src/components/mascotas/MascotasList.jsx',            // componente de lista
    '!src/components/mascotas/MascotaCard.jsx',             // componente de tarjeta
    '!src/components/mascotas/HistorialMedico.jsx',         // componente de historial
  ],

  // umbral mínimo de cobertura — la clínica exige al menos un 70% de análisis cubiertos
  coverageThreshold: {
    global: { lines: 70 },
  },
};