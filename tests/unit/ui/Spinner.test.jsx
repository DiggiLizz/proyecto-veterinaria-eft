import React from 'react';
import { render, screen } from '@testing-library/react';
import Spinner from '../../../src/components/ui/Spinner';

describe('Spinner', () => {
  test('renderiza el indicador de carga', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('tiene aria-label "Cargando"', () => {
    render(<Spinner />);
    expect(screen.getByLabelText('Cargando')).toBeInTheDocument();
  });

  test('muestra el texto cuando se pasa la prop texto', () => {
    render(<Spinner texto="Cargando datos..." />);
    expect(screen.getByText('Cargando datos...')).toBeInTheDocument();
  });

  test('no muestra texto si no se pasa la prop texto', () => {
    render(<Spinner />);
    expect(screen.queryByText(/Cargando datos/)).not.toBeInTheDocument();
  });

  test('aplica clases de tamaño sm', () => {
    render(<Spinner size="sm" />);
    expect(screen.getByRole('status').className).toMatch(/h-5/);
  });

  test('aplica clases de tamaño md por defecto', () => {
    render(<Spinner />);
    expect(screen.getByRole('status').className).toMatch(/h-9/);
  });

  test('aplica clases de tamaño lg', () => {
    render(<Spinner size="lg" />);
    expect(screen.getByRole('status').className).toMatch(/h-14/);
  });
});
