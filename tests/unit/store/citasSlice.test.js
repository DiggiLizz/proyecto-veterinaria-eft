import citasReducer, {
  setFecha,
  limpiarCitas,
  fetchCitas,
  selectCitas,
  selectFecha,
  selectLoading,
  selectError,
} from '../../../src/store/slices/citasSlice';

// ─────────────────────────────────────────────
// Mock de la API
// ─────────────────────────────────────────────
jest.mock('../../../src/api/rest/citasApi', () => ({
  getCitasPorFecha: jest.fn(),
}));

const initialState = {
  lista:   [],
  fecha:   null,
  loading: false,
  error:   null,
};

const citasMock = [
  { id: 1, hora: '09:00', estado: 'confirmada' },
  { id: 2, hora: '10:00', estado: 'pendiente' },
];

// ─────────────────────────────────────────────
// Reducer — estado inicial
// ─────────────────────────────────────────────
describe('citasSlice — reducer', () => {
  test('retorna el estado inicial', () => {
    expect(citasReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  test('setFecha actualiza la fecha', () => {
    const state = citasReducer(initialState, setFecha('2025-06-10'));
    expect(state.fecha).toBe('2025-06-10');
  });

  test('limpiarCitas vacía la lista y el error', () => {
    const estadoPrevio = { ...initialState, lista: citasMock, error: 'error' };
    const state = citasReducer(estadoPrevio, limpiarCitas());
    expect(state.lista).toEqual([]);
    expect(state.error).toBeNull();
  });
});

// ─────────────────────────────────────────────
// Reducer — fetchCitas thunk
// ─────────────────────────────────────────────
describe('citasSlice — fetchCitas', () => {
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

  test('rejected: loading=false y error con mensaje', () => {
    const state = citasReducer(
      initialState,
      fetchCitas.rejected(null, '', null, 'Error al cargar')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error al cargar');
  });
});

// ─────────────────────────────────────────────
// Selectores
// ─────────────────────────────────────────────
describe('citasSlice — selectores', () => {
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
