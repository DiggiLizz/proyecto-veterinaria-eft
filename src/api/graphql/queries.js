/**
 * queries.js
 * Queries GraphQL del proyecto Veterinaria Cuidado Animal
 * Se exportan como constantes para evitar strings sueltos en componentes
 */

/**
 * GetClientes
 * Obtiene la lista completa de clientes con sus mascotas
 */
export const QUERY_CLIENTES = `
  query GetClientes {
    clientes {
      id
      nombre
      telefono
      email
      direccion
      mascotas {
        id
        nombre
        especie
        raza
        edad
      }
    }
  }
`;

/**
 * GetCliente
 * Obtiene un cliente por id con mascotas e historial médico completo
 */
export const QUERY_CLIENTE = `
  query GetCliente($id: ID!) {
    cliente(id: $id) {
      id
      nombre
      telefono
      email
      direccion
      mascotas {
        id
        nombre
        especie
        raza
        edad
        peso
        historialMedico {
          fecha
          descripcion
          veterinario
          diagnostico
          tratamiento
        }
      }
    }
  }
`;

/**
 * GetCitasPorFecha
 * Obtiene las citas de un día con mascota, cliente y veterinario embebidos
 */
export const QUERY_CITAS_POR_FECHA = `
  query GetCitasPorFecha($fecha: String!) {
    citas(fecha: $fecha) {
      id
      fecha
      hora
      motivo
      estado
      notas
      mascota {
        id
        nombre
        especie
        raza
      }
      cliente {
        id
        nombre
        telefono
      }
      veterinario {
        id
        nombre
        especialidad
      }
    }
  }
`;