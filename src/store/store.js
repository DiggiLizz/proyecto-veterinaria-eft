/**
 * store.js
 * Configuración del store Redux con Redux Toolkit
 */

import { configureStore } from '@reduxjs/toolkit';
import citasReducer    from './slices/citasSlice';
import clientesReducer from './slices/clientesSlice';

const store = configureStore({
  reducer: {
    citas:    citasReducer,
    clientes: clientesReducer,
  },
});

export default store;
