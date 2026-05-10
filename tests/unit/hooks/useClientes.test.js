import { renderHook, waitFor } from '@testing-library/react';
import { useClientes, useClienteDetalle } from '../../../src/hooks/useClientes';

// Mocks de datos

// dos clientes: uno con mascota y otro sin, para cubrir ambos casos del listado —
// como tener preparadas dos fichas distintas antes de empezar la jornada
const clientesMock = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    email: 'juan@email.com',
    telefono: '912345678',
    direccion: 'Av. Principal 123',
    mascotas: [{ id: 10, nombre: 'Firulais', especie: 'Perro' }],
  },
  {
    id: 2,
    nombre: 'Ana Gómez',
    email: 'ana@email.com',
    telefono: '987654321',
    direccion: 'Calle Norte 456',
    mascotas: [],
  },
];

// detalle completo del cliente 1 con raza incluida —
// como abrir la carpeta individual con todos los antecedentes del paciente
const clienteDetalleMock = {
  id: 1,
  nombre: 'Juan Pérez',
  email: 'juan@email.com',
  mascotas: [{ id: 10, nombre: 'Firulais', especie: 'Perro', raza: 'Labrador' }],
};

// Setup / Teardown

// reemplazamos fetch global por un mock controlable antes de cada test —
// como conectar una línea telefónica falsa antes de cada llamada de prueba
beforeEach(() => {
  global.fetch = jest.fn();
});

// restauramos todos los mocks al estado original después de cada test —
// como descolgar la línea falsa para que el siguiente test empiece limpio
afterEach(() => {
  jest.resetAllMocks();
});

// useClientes
describe('useClientes', () => {
  // leemos el estado sincrónico antes de que fetch resuelva —
  // como revisar el tablero justo cuando el médico acaba de salir a buscar las fichas
  test('inicia con loading=true, clientes=[] y error=null', () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => clientesMock,
    });

    const { result } = renderHook(() => useClientes());

    expect(result.current.loading).toBe(true);
    expect(result.current.clientes).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  test('carga la lista de clientes correctamente', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => clientesMock,
    });

    const { result } = renderHook(() => useClientes());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.clientes).toEqual(clientesMock);
    expect(result.current.error).toBeNull();
  });

  test('llama al endpoint /clientes', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => clientesMock,
    });

    renderHook(() => useClientes());

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/clientes'),
        expect.any(Object)
      )
    );
  });

  // ok: false simula una respuesta HTTP de error sin lanzar excepción —
  // como recibir una carta que dice "servicio no disponible" en vez de que el correo se pierda
  test('setea error cuando la respuesta no es ok', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, status: 503 });

    const { result } = renderHook(() => useClientes());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/503/);
    expect(result.current.clientes).toEqual([]);
  });

  // mockRejectedValue simula un fallo de red antes de recibir cualquier respuesta —
  // como que la llamada no llegue nunca al destinatario por falta de señal
  test('setea error en fallo de red', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useClientes());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Network error');
  });
});

// useClienteDetalle
describe('useClienteDetalle', () => {
  // cliente arranca en null, no en [], porque se espera un objeto o nada —
  // como dejar el porta-fichas vacío hasta que se encuentre la carpeta del paciente
  test('inicia con loading=true, cliente=null y error=null', () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => clienteDetalleMock,
    });

    const { result } = renderHook(() => useClienteDetalle(1));

    expect(result.current.loading).toBe(true);
    expect(result.current.cliente).toBeNull();
    expect(result.current.error).toBeNull();
  });

  test('carga el detalle del cliente con su id', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => clienteDetalleMock,
    });

    const { result } = renderHook(() => useClienteDetalle(1));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.cliente).toEqual(clienteDetalleMock);
    expect(result.current.error).toBeNull();
  });

  // usamos id=42 para verificar que el hook interpola el id en la URL —
  // como pedir la ficha del box 42 y confirmar que el pedido llegó con ese número
  test('llama al endpoint /clientes/:id', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => clienteDetalleMock,
    });

    renderHook(() => useClienteDetalle(42));

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/clientes/42'),
        expect.any(Object)
      )
    );
  });

  // sin id el hook no debe disparar ninguna llamada a la API —
  // como no salir a buscar una ficha si no se sabe el nombre del paciente
  test('no hace fetch si id es undefined o null', () => {
    renderHook(() => useClienteDetalle(null));
    expect(global.fetch).not.toHaveBeenCalled();
  });

  // 404 es un error HTTP válido que el hook debe capturar y exponer en error —
  // como recibir la respuesta "ese paciente no existe en el sistema"
  test('setea error cuando el cliente no se encuentra (404)', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, status: 404 });

    const { result } = renderHook(() => useClienteDetalle(99));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/404/);
    expect(result.current.cliente).toBeNull();
  });
});
