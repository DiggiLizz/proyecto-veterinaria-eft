import { configureStore } from '@reduxjs/toolkit';
import citasReducer    from './slices/citasSlice';
import clientesReducer from './slices/clientesSlice';

// store — el cerebro central de la clínica,
// conecta el archivador de tutores con el tablero de turnos
// para que toda la aplicación lea y escriba desde un solo lugar
const store = configureStore({
  reducer: {
    citas:    citasReducer,    // el tablero de turnos del día
    clientes: clientesReducer, // el archivador de fichas de tutores
  },
});

export default store;