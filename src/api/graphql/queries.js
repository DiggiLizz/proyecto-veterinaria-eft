// queries.js
// formularios de solicitud al laboratorio graphql —
// cada constante es un formulario distinto que pide exactamente lo que necesita,
// sin pedir campos de más como haría un endpoint rest genérico

// query_clientes — el formulario que pide el directorio completo de tutores,
// con el resumen de cada mascota registrada bajo su nombre
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

// query_cliente — el formulario que pide el expediente completo de un tutor por id,
// incluye cada mascota con su cuaderno clínico entero: diagnósticos, tratamientos y fechas
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

// query_citasporfecha — el formulario que pide la agenda de un día específico,
// cada turno viene con la ficha de la mascota, el dueño y el vet a cargo
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