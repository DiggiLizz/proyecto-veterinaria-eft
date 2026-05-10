/**
 * citasSlice.js
 * Estado global para citas:
 * - fecha seleccionada en el filtro
 * - lista de citas del día
 * - estados de carga y error
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCitasPorFecha } from '../../api/rest/citasApi';

// ── Thunk asíncrono ──────────────────────────────────────────────────────────

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

// ── Slice ────────────────────────────────────────────────────────────────────

const citasSlice = createSlice({
  name: 'citas',
  initialState: {
    lista:   [],
    fecha:   null,
    loading: false,
    error:   null,
  },
  reducers: {
    setFecha(state, action) {
      state.fecha = action.payload;
    },
    limpiarCitas(state) {
      state.lista  = [];
      state.error  = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCitas.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(fetchCitas.fulfilled, (state, action) => {
        state.loading = false;
        state.lista   = action.payload;
      })
      .addCase(fetchCitas.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export const { setFecha, limpiarCitas } = citasSlice.actions;

// ── Selectores ───────────────────────────────────────────────────────────────

export const selectCitas   = (state) => state.citas.lista;
export const selectFecha   = (state) => state.citas.fecha;
export const selectLoading = (state) => state.citas.loading;
export const selectError   = (state) => state.citas.error;

export default citasSlice.reducer;
