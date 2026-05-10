import citasReducer, {
  setFecha,
  limpiarCitas,
  fetchCitas,
  selectCitas,
  selectFecha,
  selectLoading,
  selectError,
} from '../../../src/store/slices/citasSlice';

// Mock de la API

// reemplazamos la llamada real a la API por una función controlable —
// como sustituir el teléfono de la clínica por uno de juguete durante el ensayo
jest.mock('../../../src/api/rest/citasApi', () => ({
  getCitasPorFecha: jest.fn(),
}));

// estado base que el slice debe producir cuando no ha ocurrido nada —
// como la sala de espera al abrir la clínica: sin pacientes, sin errores
const initialState = {
  lista:   [],
  fecha:   null,
  loading: false,
  error:   null,
};

// dos citas mínimas para verificar que el reducer las almacena correctamente —
// como las fichas de ejemplo que se usan para probar el sistema de turnos
const citasMock = [
  { id: 1, hora: '09:00', estado: 'confirmada' },
  { id: 2, hora: '10:00', estado: 'pendiente' },
];

// Reducer — estado inicial
describe('citasSlice — reducer', () => {
  // pasamos undefined para que el reducer use su propio initialState —
  // como encender el sistema sin restaurar ningún estado previo
  test('retorna el estado inicial', () => {
    expect(citasReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  test('setFecha actualiza la fecha', () => {
    const state = citasReducer(initialState, setFecha('2025-06-10'));
    expect(state.fecha).toBe('2025-06-10');
  });

  // partimos de un estado con datos sucios para verificar que limpiarCitas los borra —
  // como vaciar la bandeja de turnos y borrar los errores del tablero al cerrar el día
  test('limpiarCitas vacía la lista y el error', () => {
    const estadoPrevio = { ...initialState, lista: citasMock, error: 'error' };
    const state = citasReducer(estadoPrevio, limpiarCitas());
    expect(state.lista).toEqual([]);
    expect(state.error).toBeNull();
  });
});

// Reducer — fetchCitas thunk
describe('citasSlice — fetchCitas', () => {
  // dispatching pending directamente prueba el reducer sin ejecutar el thunk —
  // como simular que el médico salió a buscar la ficha sin esperar a que vuelva
  test('pending: loading=true y error=null', () => {
    const state = citasReducer(initialState, fetchCitas.pending());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('fulfilled: loading=false y lista con datos', () => {
    const state = citasReducer(initialState, fetchCitas.fulfilled(citasMock));
    expect(state.loading).toBe(false);
    expect(state.lista).toEqual(citasMock);
  });

  // el cuarto argumento de rejected es el rejectWithValue que expone el mensaje —
  // como leer el motivo escrito en el formulario de rechazo de la solicitud
  test('rejected: loading=false y error con mensaje', () => {
    const state = citasReducer(
      initialState,
      fetchCitas.rejected(null, '', null, 'Error al cargar')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error al cargar');
  });
});

// Selectores
describe('citasSlice — selectores', () => {
  // el estado completo incluye la clave "citas" porque así lo registra el store —
  // como armar el expediente completo con la sección correctamente etiquetada
  const mockState = {
    citas: {
      lista:   citasMock,
      fecha:   '2025-06-10',
      loading: false,
      error:   null,
    },
  };

  test('selectCitas retorna la lista', () => {
    expect(selectCitas(mockState)).toEqual(citasMock);
  });

  test('selectFecha retorna la fecha', () => {
    expect(selectFecha(mockState)).toBe('2025-06-10');
  });

  test('selectLoading retorna loading', () => {
    expect(selectLoading(mockState)).toBe(false);
  });

  test('selectError retorna error', () => {
    expect(selectError(mockState)).toBeNull();
  });
});
