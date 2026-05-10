import clientesReducer, {
  limpiarDetalle,
  fetchClientes,
  fetchClientePorId,
  selectClientes,
  selectClienteDetalle,
  selectClienteLoading,
  selectClienteError,
} from '../../../src/store/slices/clientesSlice';

// Mock de la API

// reemplazamos ambas funciones de la API por mocks controlables —
// como sustituir los teléfonos de recepción por intercomunicadores de juguete durante el ensayo
jest.mock('../../../src/api/rest/clientesApi', () => ({
  getClientes: jest.fn(),
  getClientePorId: jest.fn(),
}));

// estado base que el slice debe producir cuando no ha ocurrido nada —
// como el sistema recién encendido: sin clientes cargados, sin detalle, sin errores
const initialState = {
  lista:   [],
  detalle: null,
  loading: false,
  error:   null,
};

// lista mínima de dos clientes para verificar que el reducer los almacena —
// como dos fichas de ejemplo listas sobre el escritorio antes de empezar
const clientesMock = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan@email.com' },
  { id: 2, nombre: 'Ana Gómez', email: 'ana@email.com' },
];

// detalle de un cliente con su mascota incluida —
// como abrir la carpeta individual con todos los antecedentes del paciente
const clienteDetalleMock = {
  id: 1,
  nombre: 'Juan Pérez',
  mascotas: [{ id: 10, nombre: 'Firulais' }],
};

// Reducer — estado inicial
describe('clientesSlice — reducer', () => {
  // pasamos undefined para que el reducer use su propio initialState —
  // como encender el sistema sin restaurar ningún estado previo
  test('retorna el estado inicial', () => {
    expect(clientesReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  // partimos de un estado con detalle y error cargados para verificar que se borran —
  // como cerrar la ficha del paciente anterior y limpiar el tablero antes de la siguiente consulta
  test('limpiarDetalle vacía el detalle y el error', () => {
    const estadoPrevio = { ...initialState, detalle: clienteDetalleMock, error: 'error' };
    const state = clientesReducer(estadoPrevio, limpiarDetalle());
    expect(state.detalle).toBeNull();
    expect(state.error).toBeNull();
  });
});

// Reducer — fetchClientes thunk
describe('clientesSlice — fetchClientes', () => {
  // dispatching pending directamente prueba el reducer sin ejecutar el thunk —
  // como simular que el asistente salió a buscar las fichas sin esperar a que vuelva
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

  // el cuarto argumento de rejected es el rejectWithValue que expone el mensaje —
  // como leer el motivo escrito en el formulario de rechazo de la solicitud
  test('rejected: loading=false y error con mensaje', () => {
    const state = clientesReducer(
      initialState,
      fetchClientes.rejected(null, '', null, 'Error al cargar clientes')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error al cargar clientes');
  });
});

// Reducer — fetchClientePorId thunk
describe('clientesSlice — fetchClientePorId', () => {
  test('pending: loading=true y error=null', () => {
    const state = clientesReducer(initialState, fetchClientePorId.pending());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  // fulfilled guarda en detalle, no en lista — al contrario que fetchClientes —
  // como archivar la ficha individual en el porta-documentos, no en el cajón general
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

// Selectores
describe('clientesSlice — selectores', () => {
  // usamos loading=true y error con valor para verificar que los selectores
  // devuelven también los estados "negativos", no solo los valores felices —
  // como revisar que el panel muestre tanto la luz verde como la roja según corresponda
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
