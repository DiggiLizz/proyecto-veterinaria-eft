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

  // un estado no registrado en LABELS_ESTADO debe mostrarse tal como llega —
  // como imprimir el código de un trámite desconocido en vez de dejarlo en blanco
  test('muestra el estado directamente si no está en LABELS_ESTADO', () => {
    render(<Badge estado="desconocido" />);
    expect(screen.getByText('desconocido')).toBeInTheDocument();
  });

  // verificamos la clase CSS de tamaño, no el estilo visual —
  // como revisar la etiqueta de talla en la ropa sin ponérsela
  test('aplica clases de tamaño sm', () => {
    render(<Badge estado="pendiente" size="sm" />);
    const badge = screen.getByText('Pendiente');
    expect(badge.className).toMatch(/text-xs/);
  });

  // sin prop size el componente debe caer al tamaño md —
  // como servir la porción estándar cuando el cliente no pide otra cosa
  test('aplica clases de tamaño md por defecto', () => {
    render(<Badge estado="pendiente" />);
    const badge = screen.getByText('Pendiente');
    expect(badge.className).toMatch(/text-sm/);
  });

  // el Badge debe ser un span para no romper el flujo inline del texto —
  // como verificar que la etiqueta de la ficha sea adhesiva y no una hoja suelta
  test('es un elemento span', () => {
    render(<Badge estado="confirmada" />);
    expect(screen.getByText('Confirmada').tagName).toBe('SPAN');
  });
});