import {
  formatFecha,
  formatFechaCorta,
  formatHora,
  toISODate,
  hoy,
  formatEdad,
  formatPeso,
} from '../../../src/utils/formatDate';

// ─────────────────────────────────────────────
// formatFecha
// ─────────────────────────────────────────────
describe('formatFecha', () => {
  test('retorna string vacío si no se pasa fecha', () => {
    expect(formatFecha('')).toBe('');
    expect(formatFecha(null)).toBe('');
    expect(formatFecha(undefined)).toBe('');
  });

  test('formatea una fecha ISO a formato largo en español', () => {
    const resultado = formatFecha('2025-06-10');
    // Debe contener el año, el mes y el día
    expect(resultado).toMatch(/2025/);
    expect(resultado).toMatch(/junio/i);
    expect(resultado).toMatch(/10/);
  });

  test('incluye el día de la semana', () => {
    // 2025-06-10 es martes
    const resultado = formatFecha('2025-06-10');
    expect(resultado).toMatch(/martes/i);
  });
});

// ─────────────────────────────────────────────
// formatFechaCorta
// ─────────────────────────────────────────────
describe('formatFechaCorta', () => {
  test('retorna string vacío si no se pasa fecha', () => {
    expect(formatFechaCorta('')).toBe('');
    expect(formatFechaCorta(null)).toBe('');
  });

  test('formatea una fecha ISO a formato corto', () => {
    const resultado = formatFechaCorta('2025-06-10');
    // Debe contener día, mes y año en algún formato numérico
    expect(resultado).toMatch(/10/);
    expect(resultado).toMatch(/6|06/);
    expect(resultado).toMatch(/2025/);
  });
});

// ─────────────────────────────────────────────
// formatHora
// ─────────────────────────────────────────────
describe('formatHora', () => {
  test('retorna string vacío si no se pasa hora', () => {
    expect(formatHora('')).toBe('');
    expect(formatHora(null)).toBe('');
    expect(formatHora(undefined)).toBe('');
  });

  test('formatea hora en formato 12h con AM', () => {
    const resultado = formatHora('08:00');
    expect(resultado).toMatch(/8/);
    expect(resultado).toMatch(/AM|a\. m\./i);
  });

  test('formatea hora de la tarde con PM', () => {
    const resultado = formatHora('14:30');
    expect(resultado).toMatch(/2/);
    expect(resultado).toMatch(/30/);
    expect(resultado).toMatch(/PM|p\. m\./i);
  });

  test('formatea medianoche correctamente', () => {
    const resultado = formatHora('00:00');
    expect(resultado).toMatch(/12/);
    expect(resultado).toMatch(/AM|a\. m\./i);
  });
});

// ─────────────────────────────────────────────
// toISODate
// ─────────────────────────────────────────────
describe('toISODate', () => {
  test('retorna null si no se pasa valor', () => {
    expect(toISODate(null)).toBeNull();
    expect(toISODate(undefined)).toBeNull();
  });

  test('retorna el mismo string si ya es YYYY-MM-DD', () => {
    expect(toISODate('2025-06-10')).toBe('2025-06-10');
  });

  test('convierte un objeto Date a string YYYY-MM-DD', () => {
    const fecha = new Date(2025, 5, 10); // junio 10 (mes 0-indexado)
    expect(toISODate(fecha)).toBe('2025-06-10');
  });

  test('padea el mes y día con cero', () => {
    const fecha = new Date(2025, 0, 5); // enero 5
    expect(toISODate(fecha)).toBe('2025-01-05');
  });
});

// ─────────────────────────────────────────────
// hoy
// ─────────────────────────────────────────────
describe('hoy', () => {
  test('retorna un string en formato YYYY-MM-DD', () => {
    const resultado = hoy();
    expect(resultado).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test('la fecha retornada coincide con la fecha actual', () => {
    const ahora = new Date();
    const esperado = toISODate(ahora);
    expect(hoy()).toBe(esperado);
  });
});

// ─────────────────────────────────────────────
// formatEdad
// ─────────────────────────────────────────────
describe('formatEdad', () => {
  test('retorna string vacío si el valor es undefined o null', () => {
    expect(formatEdad(undefined)).toBe('');
    expect(formatEdad(null)).toBe('');
  });

  test('retorna "1 año" para valor 1', () => {
    expect(formatEdad(1)).toBe('1 año');
  });

  test('retorna plural para valores distintos de 1', () => {
    expect(formatEdad(3)).toBe('3 años');
    expect(formatEdad(0)).toBe('0 años');
    expect(formatEdad(10)).toBe('10 años');
  });
});

// ─────────────────────────────────────────────
// formatPeso
// ─────────────────────────────────────────────
describe('formatPeso', () => {
  test('retorna "No registrado" si el valor es null o undefined', () => {
    expect(formatPeso(null)).toBe('No registrado');
    expect(formatPeso(undefined)).toBe('No registrado');
  });

  test('formatea el peso con unidad kg', () => {
    expect(formatPeso(28.5)).toBe('28.5 kg');
    expect(formatPeso(5)).toBe('5 kg');
  });
});