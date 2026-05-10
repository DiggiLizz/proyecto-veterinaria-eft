import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getClientes, getClientePorId } from '../../api/rest/clientesApi';

// fetchclientes — el asistente que trae todas las carpetas del archivador,
// si algo falla en el camino devuelve el error sin romper la aplicación
export const fetchClientes = createAsyncThunk(
  'clientes/fetchClientes',
  async (_, { rejectWithValue }) => {
    try {
      return await getClientes();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// fetchclienteporid — el asistente que busca la carpeta de un tutor específico,
// como pedirle a recepción que saque el expediente de un dueño por su número de ficha
export const fetchClientePorId = createAsyncThunk(
  'clientes/fetchClientePorId',
  async (id, { rejectWithValue }) => {
    try {
      return await getClientePorId(id);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// clientesslice — el archivador en redux,
// guarda la lista completa de tutores, el expediente abierto en este momento,
// y si está cargando o hubo algún problema al buscar
const clientesSlice = createSlice({
  name: 'clientes',
  initialState: {
    lista:   [], // todas las carpetas del archivador
    detalle: null, // la carpeta que está abierta sobre el escritorio ahora
    loading: false, // el asistente está buscando en el archivador
    error:   null, // algo salió mal al buscar la carpeta
  },
  reducers: {

    // cierra la carpeta abierta y limpia la mesa — como devolver el expediente al archivador
    limpiarDetalle(state) {
      state.detalle = null;
      state.error   = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // el asistente salió a traer todas las carpetas
      .addCase(fetchClientes.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      // el asistente volvió con todas las carpetas del archivador
      .addCase(fetchClientes.fulfilled, (state, action) => {
        state.loading = false;
        state.lista   = action.payload;
      })
      // algo salió mal al buscar todas las carpetas
      .addCase(fetchClientes.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })

      // el asistente salió a buscar la carpeta de un tutor específico
      .addCase(fetchClientePorId.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      // el asistente volvió con la carpeta del tutor — se abre sobre el escritorio
      .addCase(fetchClientePorId.fulfilled, (state, action) => {
        state.loading = false;
        state.detalle = action.payload;
      })
      // algo salió mal al buscar esa carpeta específica
      .addCase(fetchClientePorId.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export const { limpiarDetalle } = clientesSlice.actions;

// selectores — las ventanillas para consultar partes específicas del archivador
export const selectClientes       = (state) => state.clientes.lista;
export const selectClienteDetalle = (state) => state.clientes.detalle;
export const selectClienteLoading = (state) => state.clientes.loading;
export const selectClienteError   = (state) => state.clientes.error;

export default clientesSlice.reducer;