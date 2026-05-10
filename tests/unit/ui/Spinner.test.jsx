import React from 'react';
import { render, screen } from '@testing-library/react';
import Spinner from '../../../src/components/ui/Spinner';

describe('Spinner', () => {
  // role="status" permite que los lectores de pantalla anuncien el estado de carga —
  // como el cartel de "ocupado" que avisa sin necesidad de abrir la puerta
  test('renderiza el indicador de carga', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  // aria-label describe el elemento a quienes no pueden ver la animación —
  // como poner una etiqueta en braille en el botón del ascensor
  test('tiene aria-label "Cargando"', () => {
    render(<Spinner />);
    expect(screen.getByLabelText('Cargando')).toBeInTheDocument();
  });

  test('muestra el texto cuando se pasa la prop texto', () => {
    render(<Spinner texto="Cargando datos..." />);
    expect(screen.getByText('Cargando datos...')).toBeInTheDocument();
  });

  // sin prop texto el componente no debe dejar un espacio vacío visible —
  // como no imprimir un renglón en blanco en el formulario si no hay nada que decir
  test('no muestra texto si no se pasa la prop texto', () => {
    render(<Spinner />);
    expect(screen.queryByText(/Cargando datos/)).not.toBeInTheDocument();
  });

  // verificamos la clase de altura que controla el tamaño visual del spinner —
  // como revisar la etiqueta de talla en la ropa sin ponérsela
  test('aplica clases de tamaño sm', () => {
    render(<Spinner size="sm" />);
    expect(screen.getByRole('status').className).toMatch(/h-5/);
  });

  // sin prop size el componente debe caer al tamaño md —
  // como servir la porción estándar cuando el cliente no pide otra cosa
  test('aplica clases de tamaño md por defecto', () => {
    render(<Spinner />);
    expect(screen.getByRole('status').className).toMatch(/h-9/);
  });

  test('aplica clases de tamaño lg', () => {
    render(<Spinner size="lg" />);
    expect(screen.getByRole('status').className).toMatch(/h-14/);
  });
});
