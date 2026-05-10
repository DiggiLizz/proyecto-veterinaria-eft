import { defineConfig } from "cypress";

export default defineConfig({
  // bloqueamos el acceso a variables de entorno de cypress —
  // como cerrar con llave el archivo de configuración de la clínica
  allowCypressEnv: false,

  e2e: {
    // aquí se pueden agregar eventos del servidor de pruebas —
    // como instalar cámaras de monitoreo en las salas de ensayo
    setupNodeEvents(on, config) {
    },
  },
});