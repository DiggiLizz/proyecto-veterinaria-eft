import React from 'react';
import { render, screen } from '@testing-library/react';
import Badge from '../../../src/components/ui/Badge';

describe('Badge', () => {
  test('muestra el label en español para estado pendiente', () => {
    render(<Badge estado="pendiente" />);
    expect(screen.getByText('Pendiente')).toBeInTheDocument();
  });

  test('muestra el label en español para estado confirmada', () => {
    render(<Badge estado="confirmada" />);
    expect(screen.getByText('Confirmada')).toBeInTheDocument();
  });

  test('muestra el label en español para estado completada', () => {
    render(<Badge estado="completada" />);
    expect(screen.getByText('Completada')).toBeInTheDocument();
  });

  test('muestra el label en español para estado cancelada', () => {
    render(<Badge estado="cancelada" />);
    expect(screen.getByText('Cancelada')).toBeInTheDocument();
  });

  test('muestra el estado directamente si no está en LABELS_ESTADO', () => {
    render(<Badge estado="desconocido" />);
    expect(screen.getByText('desconocido')).toBeInTheDocument();
  });

  test('aplica clases de tamaño sm', () => {
    render(<Badge estado="pendiente" size="sm" />);
    const badge = screen.getByText('Pendiente');
    expect(badge.className).toMatch(/text-xs/);
  });

  test('aplica clases de tamaño md por defecto', () => {
    render(<Badge estado="pendiente" />);
    const badge = screen.getByText('Pendiente');
    expect(badge.className).toMatch(/text-sm/);
  });

  test('es un elemento span', () => {
    render(<Badge estado="confirmada" />);
    expect(screen.getByText('Confirmada').tagName).toBe('SPAN');
  });
});
