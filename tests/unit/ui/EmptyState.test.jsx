import React from 'react';
import { render, screen } from '@testing-library/react';
import EmptyState from '../../../src/components/ui/EmptyState';

describe('EmptyState', () => {
  test('muestra el título pasado por prop', () => {
    render(<EmptyState titulo="Sin resultados" />);
    expect(screen.getByText('Sin resultados')).toBeInTheDocument();
  });

  test('muestra el título por defecto si no se pasa prop', () => {
    render(<EmptyState />);
    expect(screen.getByText('Sin resultados')).toBeInTheDocument();
  });

  test('muestra el mensaje cuando se pasa por prop', () => {
    render(<EmptyState titulo="Vacío" mensaje="No hay datos disponibles" />);
    expect(screen.getByText('No hay datos disponibles')).toBeInTheDocument();
  });

  test('no muestra mensaje si no se pasa prop', () => {
    render(<EmptyState titulo="Vacío" />);
    expect(screen.queryByText(/No hay datos/)).not.toBeInTheDocument();
  });

  test('muestra el icono pasado por prop', () => {
    render(<EmptyState icono="🐶" titulo="Sin mascotas" />);
    expect(screen.getByText('🐶')).toBeInTheDocument();
  });

  test('muestra el icono por defecto 🐾 si no se pasa prop', () => {
    render(<EmptyState titulo="Vacío" />);
    expect(screen.getByText('🐾')).toBeInTheDocument();
  });

  test('el icono tiene aria-hidden true', () => {
    render(<EmptyState titulo="Vacío" />);
    const icono = screen.getByText('🐾');
    expect(icono).toHaveAttribute('aria-hidden', 'true');
  });
});
