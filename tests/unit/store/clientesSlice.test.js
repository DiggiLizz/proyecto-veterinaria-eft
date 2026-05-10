import clientesReducer, {
  limpiarDetalle,
  fetchClientes,
  fetchClientePorId,
  selectClientes,
  selectClienteDetalle,
  selectClienteLoading,
  selectClienteError,
} from '../../../src/store/slices/clientesSlice';

// ─────────────────────────────────────────────
// Mock de la API
// ─────────────────────────────────────────────
jest.mock('../../../src/api/rest/clientesApi', () => ({
  getClientes: jest.fn(),
  getClientePorId: jest.fn(),
}));

const initialState = {
  lista:   [],
  detalle: null,
  loading: false,
  error:   null,
};

const clientesMock = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan@email.com' },
  { id: 2, nombre: 'Ana Gómez', email: 'ana@email.com' },
];

const clienteDetalleMock = {
  id: 1,
  nombre: 'Juan Pérez',
  mascotas: [{ id: 10, nombre: 'Firulais' }],
};

// ─────────────────────────────────────────────
// Reducer — estado inicial
// ─────────────────────────────────────────────
describe('clientesSlice — reducer', () => {
  test('retorna el estado inicial', () => {
    expect(clientesReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  test('limpiarDetalle vacía el detalle y el error', () => {
    const estadoPrevio = { ...initialState, detalle: clienteDetalleMock, error: 'error' };
    const state = clientesReducer(estadoPrevio, limpiarDetalle());
    expect(state.detalle).toBeNull();
    expect(state.error).toBeNull();
  });
});

// ─────────────────────────────────────────────
// Reducer — fetchClientes thunk
// ─────────────────────────────────────────────
describe('clientesSlice — fetchClientes', () => {
  test('pending: loading=true y error=null', () => {
    const state = clientesReducer(initialState, fetchClientes.pending());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('fulfilled: loading=false y lista con datos', () => {
    const state = clientesReducer(initialState, fetchClientes.fulfilled(clientesMock));
    expect(state.loading).toBe(false);
    expect(state.lista).toEqual(clientesMock);
  });

  test('rejected: loading=false y error con mensaje', () => {
    const state = clientesReducer(
      initialState,
      fetchClientes.rejected(null, '', null, 'Error al cargar clientes')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error al cargar clientes');
  });
});

// ─────────────────────────────────────────────
// Reducer — fetchClientePorId thunk
// ─────────────────────────────────────────────
describe('clientesSlice — fetchClientePorId', () => {
  test('pending: loading=true y error=null', () => {
    const state = clientesReducer(initialState, fetchClientePorId.pending());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('fulfilled: loading=false y detalle con datos', () => {
    const state = clientesReducer(
      initialState,
      fetchClientePorId.fulfilled(clienteDetalleMock)
    );
    expect(state.loading).toBe(false);
    expect(state.detalle).toEqual(clienteDetalleMock);
  });

  test('rejected: loading=false y error con mensaje', () => {
    const state = clientesReducer(
      initialState,
      fetchClientePorId.rejected(null, '', null, 'Cliente no encontrado')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Cliente no encontrado');
  });
});

// ─────────────────────────────────────────────
// Selectores
// ─────────────────────────────────────────────
describe('clientesSlice — selectores', () => {
  const mockState = {
    clientes: {
      lista:   clientesMock,
      detalle: clienteDetalleMock,
      loading: true,
      error:   'algún error',
    },
  };

  test('selectClientes retorna la lista', () => {
    expect(selectClientes(mockState)).toEqual(clientesMock);
  });

  test('selectClienteDetalle retorna el detalle', () => {
    expect(selectClienteDetalle(mockState)).toEqual(clienteDetalleMock);
  });

  test('selectClienteLoading retorna loading', () => {
    expect(selectClienteLoading(mockState)).toBe(true);
  });

  test('selectClienteError retorna el error', () => {
    expect(selectClienteError(mockState)).toBe('algún error');
  });
});
