import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCitasPorFecha } from '../../api/rest/citasApi';

// fetchcitas — el asistente que va al archivador a buscar los turnos del día,
// si algo sale mal al buscar, devuelve el mensaje de error en vez de romper todo
export const fetchCitas = createAsyncThunk(
  'citas/fetchCitas',
  async (fecha, { rejectWithValue }) => {
    try {
      return await getCitasPorFecha(fecha);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// citasslice — el tablero de la sala de espera en redux,
// guarda qué día se está viendo, qué turnos hay y si está cargando o hubo error
const citasSlice = createSlice({
  name: 'citas',
  initialState: {
    lista:   [], // los turnos del día en el tablero
    fecha:   null, // qué página de la agenda está abierta
    loading: false, // el asistente está buscando en el archivador
    error:   null, // algo salió mal al buscar los turnos
  },
  reducers: {

    // cambia el día visible — como pasar la hoja de la agenda
    setFecha(state, action) {
      state.fecha = action.payload;
    },

    // borra los turnos del tablero — como borrar el pizarrón al cerrar la jornada
    limpiarCitas(state) {
      state.lista  = [];
      state.error  = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // el asistente salió a buscar — mostramos que está en camino
      .addCase(fetchCitas.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      // el asistente volvió con los turnos — los pegamos en el tablero
      .addCase(fetchCitas.fulfilled, (state, action) => {
        state.loading = false;
        state.lista   = action.payload;
      })
      // el asistente no encontró nada o hubo un problema en el camino
      .addCase(fetchCitas.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export const { setFecha, limpiarCitas } = citasSlice.actions;

// selectores — las ventanillas para consultar partes específicas del tablero
export const selectCitas   = (state) => state.citas.lista;
export const selectFecha   = (state) => state.citas.fecha;
export const selectLoading = (state) => state.citas.loading;
export const selectError   = (state) => state.citas.error;

export default citasSlice.reducer;