import { renderHook, waitFor } from '@testing-library/react';
import { useClientes, useClienteDetalle } from '../../../src/hooks/useClientes';

// ─────────────────────────────────────────────
// Mocks de datos
// ─────────────────────────────────────────────
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

const clienteDetalleMock = {
  id: 1,
  nombre: 'Juan Pérez',
  email: 'juan@email.com',
  mascotas: [{ id: 10, nombre: 'Firulais', especie: 'Perro', raza: 'Labrador' }],
};

// ─────────────────────────────────────────────
// Setup / Teardown
// ─────────────────────────────────────────────
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

// ─────────────────────────────────────────────
// useClientes
// ─────────────────────────────────────────────
describe('useClientes', () => {
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

  test('setea error cuando la respuesta no es ok', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, status: 503 });

    const { result } = renderHook(() => useClientes());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/503/);
    expect(result.current.clientes).toEqual([]);
  });

  test('setea error en fallo de red', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useClientes());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Network error');
  });
});

// ─────────────────────────────────────────────
// useClienteDetalle
// ─────────────────────────────────────────────
describe('useClienteDetalle', () => {
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

  test('no hace fetch si id es undefined o null', () => {
    renderHook(() => useClienteDetalle(null));
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('setea error cuando el cliente no se encuentra (404)', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, status: 404 });

    const { result } = renderHook(() => useClienteDetalle(99));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/404/);
    expect(result.current.cliente).toBeNull();
  });
});