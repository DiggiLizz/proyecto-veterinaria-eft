import React from 'react';
import { render, screen } from '@testing-library/react';
import EmptyState from '../../../src/components/ui/EmptyState';

describe('EmptyState', () => {
  test('muestra el título pasado por prop', () => {
    render(<EmptyState titulo="Sin resultados" />);
    expect(screen.getByText('Sin resultados')).toBeInTheDocument();
  });

  // sin prop titulo el componente no debe quedar en blanco ni romper el render —
  // como mostrar "sin datos" en el formulario cuando nadie escribió nada
  test('muestra el título por defecto si no se pasa prop', () => {
    render(<EmptyState />);
    expect(screen.getByText('Sin resultados')).toBeInTheDocument();
  });

  test('muestra el mensaje cuando se pasa por prop', () => {
    render(<EmptyState titulo="Vacío" mensaje="No hay datos disponibles" />);
    expect(screen.getByText('No hay datos disponibles')).toBeInTheDocument();
  });

  // si no hay mensaje, el espacio no debe aparecer en absoluto —
  // como no imprimir un renglón vacío en el formulario de atención
  test('no muestra mensaje si no se pasa prop', () => {
    render(<EmptyState titulo="Vacío" />);
    expect(screen.queryByText(/No hay datos/)).not.toBeInTheDocument();
  });

  test('muestra el icono pasado por prop', () => {
    render(<EmptyState icono="🐶" titulo="Sin mascotas" />);
    expect(screen.getByText('🐶')).toBeInTheDocument();
  });

  // sin prop icono debe aparecer 🐾 como ícono genérico de la clínica —
  // como usar el logo de la veterinaria cuando no hay foto del animal
  test('muestra el icono por defecto 🐾 si no se pasa prop', () => {
    render(<EmptyState titulo="Vacío" />);
    expect(screen.getByText('🐾')).toBeInTheDocument();
  });

  // aria-hidden oculta el emoji a los lectores de pantalla porque es decorativo —
  // como tapar con una tela los adornos de la sala para que no distraigan al que escucha
  test('el icono tiene aria-hidden true', () => {
    render(<EmptyState titulo="Vacío" />);
    const icono = screen.getByText('🐾');
    expect(icono).toHaveAttribute('aria-hidden', 'true');
  });
});
