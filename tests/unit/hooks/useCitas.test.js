import { renderHook, waitFor } from '@testing-library/react';
import { useCitas } from '../../../src/hooks/useCitas';

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
const citasMock = [
  {
    id: 1,
    hora: '09:00',
    estado: 'confirmada',
    mascota: { nombre: 'Firulais', especie: 'Perro' },
    cliente: { nombre: 'Juan Pérez', telefono: '912345678' },
    veterinario: { nombre: 'Dra. López', especialidad: 'Cirugía' },
  },
  {
    id: 2,
    hora: '10:30',
    estado: 'pendiente',
    mascota: { nombre: 'Michi', especie: 'Gato' },
    cliente: { nombre: 'Ana Gómez', telefono: '987654321' },
    veterinario: { nombre: 'Dr. Ruiz', especialidad: 'Dermatología' },
  },
];

// ─────────────────────────────────────────────
// Setup / Teardown del mock de fetch
// ─────────────────────────────────────────────
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

// ─────────────────────────────────────────────
// Tests
// ─────────────────────────────────────────────
describe('useCitas', () => {
  test('inicia con loading=true, citas=[] y error=null', () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => citasMock,
    });

    const { result } = renderHook(() => useCitas('2025-06-10'));

    expect(result.current.loading).toBe(true);
    expect(result.current.citas).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  test('carga citas correctamente con fecha string', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => citasMock,
    });

    const { result } = renderHook(() => useCitas('2025-06-10'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.citas).toEqual(citasMock);
    expect(result.current.error).toBeNull();
  });

  test('llama al endpoint con el parámetro de fecha correcto', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => citasMock,
    });

    renderHook(() => useCitas('2025-06-10'));

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('fecha=2025-06-10'),
        expect.any(Object)
      )
    );
  });

  test('llama al endpoint sin parámetro si fecha es null', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    renderHook(() => useCitas(null));

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/citas'),
        expect.any(Object)
      )
    );
  });

  test('setea error cuando la respuesta no es ok', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useCitas('2025-06-10'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/500/);
    expect(result.current.citas).toEqual([]);
  });

  test('setea error cuando fetch lanza una excepción de red', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useCitas('2025-06-10'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Network error');
  });

  test('retorna lista vacía si el servidor responde con []', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    const { result } = renderHook(() => useCitas('2025-06-10'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.citas).toEqual([]);
    expect(result.current.error).toBeNull();
  });
});