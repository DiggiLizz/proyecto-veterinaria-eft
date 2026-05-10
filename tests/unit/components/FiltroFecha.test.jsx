import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FiltroFecha from '../../../src/components/citas/FiltroFecha';


// Mock de formatDate


// fijamos "hoy" en una fecha conocida y controlamos el formato de salida —
// como parar el reloj de la clínica en un día exacto para que los tests no cambien mañana
jest.mock('../../../src/utils/formatDate', () => ({
  hoy: () => '2026-05-10',
  formatFecha: (fecha) => `Fecha formateada: ${fecha}`,
}));


// Tests

describe('FiltroFecha', () => {
  test('renderiza el contenedor con data-testid correcto', () => {
    render(<FiltroFecha fecha="2026-05-10" onCambio={jest.fn()} />);
    expect(screen.getByTestId('filtro-fecha')).toBeInTheDocument();
  });

  test('renderiza el label "Filtrar por día"', () => {
    render(<FiltroFecha fecha="2026-05-10" onCambio={jest.fn()} />);
    expect(screen.getByText(/Filtrar por día/i)).toBeInTheDocument();
  });

  // pasamos una fecha distinta a "hoy" para verificar que el input refleja la prop —
  // como poner una fecha diferente en el calendario y ver que el marcador se mueva
  test('el input de fecha muestra el valor recibido por prop', () => {
    render(<FiltroFecha fecha="2025-06-15" onCambio={jest.fn()} />);
    const input = screen.getByLabelText(/Filtrar por día/i);
    expect(input).toHaveValue('2025-06-15');
  });

  // el texto proviene de formatFecha mockeado, así controlamos el formato exacto —
  // como verificar que el sello de la ficha dice lo que la máquina de sellos produce
  test('muestra la fecha formateada en formato legible', () => {
    render(<FiltroFecha fecha="2026-05-10" onCambio={jest.fn()} />);
    expect(screen.getByText(/Fecha formateada: 2026-05-10/)).toBeInTheDocument();
  });

  test('llama onCambio con el nuevo valor al cambiar el input', () => {
    const onCambio = jest.fn();
    render(<FiltroFecha fecha="2026-05-10" onCambio={onCambio} />);

    const input = screen.getByLabelText(/Filtrar por día/i);
    fireEvent.change(input, { target: { value: '2025-06-20' } });

    expect(onCambio).toHaveBeenCalledWith('2025-06-20');
  });

  // cuando la fecha prop coincide con hoy(), el botón no debe aparecer —
  // como ocultar el botón "volver al inicio" cuando ya estás en el inicio
  test('no muestra botón "Ir a hoy" cuando la fecha ya es hoy', () => {
    render(<FiltroFecha fecha="2026-05-10" onCambio={jest.fn()} />);
    expect(screen.queryByText(/Ir a hoy/i)).not.toBeInTheDocument();
  });

  test('muestra botón "Ir a hoy" cuando la fecha es distinta a hoy', () => {
    render(<FiltroFecha fecha="2025-06-15" onCambio={jest.fn()} />);
    expect(screen.getByText(/Ir a hoy/i)).toBeInTheDocument();
  });

  // el botón debe llamar onCambio con el valor que devuelve hoy() mockeado —
  // como apretar "resetear" y verificar que el sistema volvió a la fecha fijada
  test('al hacer click en "Ir a hoy" llama onCambio con la fecha de hoy', () => {
    const onCambio = jest.fn();
    render(<FiltroFecha fecha="2025-06-15" onCambio={onCambio} />);

    fireEvent.click(screen.getByText(/Ir a hoy/i));

    expect(onCambio).toHaveBeenCalledWith('2026-05-10');
  });

  test('el input tiene type="date"', () => {
    render(<FiltroFecha fecha="2026-05-10" onCambio={jest.fn()} />);
    const input = screen.getByLabelText(/Filtrar por día/i);
    expect(input).toHaveAttribute('type', 'date');
  });

  // verificamos que el límite superior esté definido para evitar fechas inválidas —
  // como comprobar que el calendario no deje agendar citas en el año 2100
  test('el input tiene max="2099-12-31"', () => {
    render(<FiltroFecha fecha="2026-05-10" onCambio={jest.fn()} />);
    const input = screen.getByLabelText(/Filtrar por día/i);
    expect(input).toHaveAttribute('max', '2099-12-31');
  });
});
