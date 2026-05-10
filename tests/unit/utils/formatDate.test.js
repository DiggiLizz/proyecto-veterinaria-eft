import {
  formatFecha,
  formatFechaCorta,
  formatHora,
  toISODate,
  hoy,
  formatEdad,
  formatPeso,
} from '../../../src/utils/formatDate';

// formatFecha
describe('formatFecha', () => {
  // los tres falsy más comunes que podrían llegar desde un formulario o la API —
  // como intentar imprimir una etiqueta sin haber escrito nada en el campo
  test('retorna string vacío si no se pasa fecha', () => {
    expect(formatFecha('')).toBe('');
    expect(formatFecha(null)).toBe('');
    expect(formatFecha(undefined)).toBe('');
  });

  // usamos regex porque el formato exacto varía según el locale del sistema —
  // como verificar que el sello diga el mes correcto sin importar si usa punto o coma
  test('formatea una fecha ISO a formato largo en español', () => {
    const resultado = formatFecha('2025-06-10');
    // debe contener el año, el mes y el día
    expect(resultado).toMatch(/2025/);
    expect(resultado).toMatch(/junio/i);
    expect(resultado).toMatch(/10/);
  });

  // 2025-06-10 es martes — fecha fija para que el día de la semana sea predecible —
  // como elegir un lunes conocido para probar que el calendario muestra "lunes"
  test('incluye el día de la semana', () => {
    const resultado = formatFecha('2025-06-10');
    expect(resultado).toMatch(/martes/i);
  });
});

// formatFechaCorta
describe('formatFechaCorta', () => {
  test('retorna string vacío si no se pasa fecha', () => {
    expect(formatFechaCorta('')).toBe('');
    expect(formatFechaCorta(null)).toBe('');
  });

  // regex flexible porque el separador y el orden día/mes varía según locale —
  // como verificar que el ticket tenga los tres datos sin fijarse en el formato exacto
  test('formatea una fecha ISO a formato corto', () => {
    const resultado = formatFechaCorta('2025-06-10');
    // debe contener día, mes y año en algún formato numérico
    expect(resultado).toMatch(/10/);
    expect(resultado).toMatch(/6|06/);
    expect(resultado).toMatch(/2025/);
  });
});

// formatHora
describe('formatHora', () => {
  test('retorna string vacío si no se pasa hora', () => {
    expect(formatHora('')).toBe('');
    expect(formatHora(null)).toBe('');
    expect(formatHora(undefined)).toBe('');
  });

  // el regex acepta tanto "AM" como "a. m." porque el formato varía según locale —
  // como aceptar que el reloj marque "8 AM" o "8 a. m." y considerarlos equivalentes
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

  // medianoche en formato 12h debe ser "12:00 AM", no "0:00" —
  // como verificar que el reloj de la clínica no marque cero al dar la medianoche
  test('formatea medianoche correctamente', () => {
    const resultado = formatHora('00:00');
    expect(resultado).toMatch(/12/);
    expect(resultado).toMatch(/AM|a\. m\./i);
  });
});

// toISODate
describe('toISODate', () => {
  test('retorna null si no se pasa valor', () => {
    expect(toISODate(null)).toBeNull();
    expect(toISODate(undefined)).toBeNull();
  });

  // un string ya en formato ISO debe salir intacto sin ninguna transformación —
  // como pasar una ficha ya ordenada y recibirla exactamente igual
  test('retorna el mismo string si ya es YYYY-MM-DD', () => {
    expect(toISODate('2025-06-10')).toBe('2025-06-10');
  });

  // new Date(2025, 5, 10) es junio porque los meses son 0-indexados en JS —
  // como recordar que en el cajón "0" está enero, no enero es el cajón "1"
  test('convierte un objeto Date a string YYYY-MM-DD', () => {
    const fecha = new Date(2025, 5, 10); // junio 10 (mes 0-indexado)
    expect(toISODate(fecha)).toBe('2025-06-10');
  });

  // verificamos que el padding con cero funcione para meses y días de un solo dígito —
  // como asegurarse de que la etiqueta diga "01" y no "1" para que el sistema no la rechace
  test('padea el mes y día con cero', () => {
    const fecha = new Date(2025, 0, 5); // enero 5
    expect(toISODate(fecha)).toBe('2025-01-05');
  });
});

// hoy
describe('hoy', () => {
  // verificamos el formato sin fijar la fecha —
  // como comprobar que el sello tiene el formato correcto sin importar qué día es hoy
  test('retorna un string en formato YYYY-MM-DD', () => {
    const resultado = hoy();
    expect(resultado).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  // comparamos contra toISODate(new Date()) para no hardcodear la fecha actual —
  // como pedirle a dos relojes distintos la hora y ver que coincidan
  test('la fecha retornada coincide con la fecha actual', () => {
    const ahora = new Date();
    const esperado = toISODate(ahora);
    expect(hoy()).toBe(esperado);
  });
});

// formatEdad
describe('formatEdad', () => {
  test('retorna string vacío si el valor es undefined o null', () => {
    expect(formatEdad(undefined)).toBe('');
    expect(formatEdad(null)).toBe('');
  });

  test('retorna "1 año" para valor 1', () => {
    expect(formatEdad(1)).toBe('1 año');
  });

  // 0 y 10 confirman que el plural se aplica en ambos extremos, no solo en >1 —
  // como verificar que el letrero diga "0 turnos" y "10 turnos", no solo "2 turnos"
  test('retorna plural para valores distintos de 1', () => {
    expect(formatEdad(3)).toBe('3 años');
    expect(formatEdad(0)).toBe('0 años');
    expect(formatEdad(10)).toBe('10 años');
  });
});

// formatPeso
describe('formatPeso', () => {
  // el fallback es un texto legible, no un string vacío ni un cero —
  // como imprimir "sin registro" en la ficha en vez de dejar el campo en blanco
  test('retorna "No registrado" si el valor es null o undefined', () => {
    expect(formatPeso(null)).toBe('No registrado');
    expect(formatPeso(undefined)).toBe('No registrado');
  });

  test('formatea el peso con unidad kg', () => {
    expect(formatPeso(28.5)).toBe('28.5 kg');
    expect(formatPeso(5)).toBe('5 kg');
  });
});
