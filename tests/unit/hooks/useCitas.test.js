import { renderHook, waitFor } from '@testing-library/react';
import { useCitas } from '../../../src/hooks/useCitas';

// Helpers

// dos citas de distintas especies y estados para cubrir variedad de casos —
// como tener fichas de pacientes distintos preparadas antes de la jornada
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


// Setup / Teardown del mock de fetch

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


// Tests
describe('useCitas', () => {
  // leemos el estado sincrónico antes de que fetch resuelva —
  // como revisar el tablero justo cuando el médico acaba de salir a buscar la ficha
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

  // verificamos la URL construida por el hook, no solo que fetch fue llamado —
  // como revisar que el pedido de la ficha incluye el número de turno correcto
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

  // con fecha null el hook no debe agregar query param de fecha a la URL —
  // como pedir todas las citas del sistema sin filtrar por ningún día
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

  // ok: false simula una respuesta HTTP de error sin lanzar excepción —
  // como recibir una carta que dice "no encontrado" en vez de que el correo se pierda
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

  // mockRejectedValue simula un fallo de red antes de recibir respuesta —
  // como que la llamada no llegue nunca al destinatario por falta de señal
  test('setea error cuando fetch lanza una excepción de red', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useCitas('2025-06-10'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Network error');
  });

  // respuesta vacía válida no debe tratarse como error —
  // como que la agenda del día esté libre sin que eso sea un problema
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
