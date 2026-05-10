/**
 * clientesSlice.js
 * Estado global para clientes:
 * - lista completa de clientes
 * - cliente detalle seleccionado
 * - estados de carga y error
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getClientes, getClientePorId } from '../../api/rest/clientesApi';

// ── Thunks asíncronos ────────────────────────────────────────────────────────

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

// ── Slice ────────────────────────────────────────────────────────────────────

const clientesSlice = createSlice({
  name: 'clientes',
  initialState: {
    lista:    [],
    detalle:  null,
    loading:  false,
    error:    null,
  },
  reducers: {
    limpiarDetalle(state) {
      state.detalle = null;
      state.error   = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchClientes
      .addCase(fetchClientes.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(fetchClientes.fulfilled, (state, action) => {
        state.loading = false;
        state.lista   = action.payload;
      })
      .addCase(fetchClientes.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })

      // fetchClientePorId
      .addCase(fetchClientePorId.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(fetchClientePorId.fulfilled, (state, action) => {
        state.loading = false;
        state.detalle = action.payload;
      })
      .addCase(fetchClientePorId.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export const { limpiarDetalle } = clientesSlice.actions;

// ── Selectores ───────────────────────────────────────────────────────────────

export const selectClientes       = (state) => state.clientes.lista;
export const selectClienteDetalle = (state) => state.clientes.detalle;
export const selectClienteLoading = (state) => state.clientes.loading;
export const selectClienteError   = (state) => state.clientes.error;

export default clientesSlice.reducer;
