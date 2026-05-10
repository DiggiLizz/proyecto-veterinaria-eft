import React from 'react';
import { render, screen } from '@testing-library/react';
import CitaCard from '../../../src/components/citas/CitaCard';

// ─────────────────────────────────────────────
// Mock de sub-componentes externos
// ─────────────────────────────────────────────
jest.mock('../../../src/components/ui/Badge', () => ({
  __esModule: true,
  default: ({ estado }) => <span data-testid="badge">{estado}</span>,
}));

// ─────────────────────────────────────────────
// Datos de prueba
// ─────────────────────────────────────────────
const citaCompleta = {
  hora: '14:30',
  estado: 'confirmada',
  mascota: { nombre: 'Firulais', especie: 'Perro', raza: 'Labrador' },
  cliente: { nombre: 'Juan Pérez', telefono: '912345678' },
  veterinario: { nombre: 'Dra. López', especialidad: 'Cirugía' },
  motivo: 'Vacunación anual',
  notas: 'Traer carnet de vacunas',
};

const citaMinima = {
  hora: '09:00',
  estado: 'pendiente',
  mascota: { nombre: 'Michi', especie: 'Gato' },
  cliente: { nombre: 'Ana Gómez', telefono: '987654321' },
  veterinario: { nombre: 'Dr. Ruiz', especialidad: 'Dermatología' },
};

// ─────────────────────────────────────────────
// Tests
// ─────────────────────────────────────────────
describe('CitaCard', () => {
  test('renderiza el artículo con data-testid correcto', () => {
    render(<CitaCard cita={citaMinima} />);
    expect(screen.getByTestId('cita-card')).toBeInTheDocument();
  });

  test('muestra la hora formateada', () => {
    render(<CitaCard cita={citaMinima} />);
    // formatHora('09:00') → '9:00 a. m.' o '9:00 AM' según locale
    expect(screen.getByText(/9:00/)).toBeInTheDocument();
  });

  test('muestra el nombre de la mascota', () => {
    render(<CitaCard cita={citaCompleta} />);
    expect(screen.getByText('Firulais')).toBeInTheDocument();
  });

  test('muestra la especie y la raza de la mascota', () => {
    render(<CitaCard cita={citaCompleta} />);
    expect(screen.getByText(/Perro/)).toBeInTheDocument();
    expect(screen.getByText(/Labrador/)).toBeInTheDocument();
  });

  test('muestra solo la especie si no hay raza', () => {
    render(<CitaCard cita={citaMinima} />);
    expect(screen.getByText(/Gato/)).toBeInTheDocument();
  });

  test('muestra el nombre del dueño', () => {
    render(<CitaCard cita={citaCompleta} />);
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
  });

  test('muestra el teléfono del dueño', () => {
    render(<CitaCard cita={citaCompleta} />);
    expect(screen.getByText('912345678')).toBeInTheDocument();
  });

  test('muestra el nombre del veterinario', () => {
    render(<CitaCard cita={citaCompleta} />);
    expect(screen.getByText('Dra. López')).toBeInTheDocument();
  });

  test('muestra la especialidad del veterinario', () => {
    render(<CitaCard cita={citaCompleta} />);
    expect(screen.getByText('Cirugía')).toBeInTheDocument();
  });

  test('muestra el motivo cuando existe', () => {
    render(<CitaCard cita={citaCompleta} />);
    expect(screen.getByText(/Vacunación anual/)).toBeInTheDocument();
  });

  test('no muestra el motivo si no existe', () => {
    render(<CitaCard cita={citaMinima} />);
    expect(screen.queryByText(/Motivo/)).not.toBeInTheDocument();
  });

  test('muestra las notas cuando existen', () => {
    render(<CitaCard cita={citaCompleta} />);
    expect(screen.getByText(/Traer carnet de vacunas/)).toBeInTheDocument();
  });

  test('no muestra las notas si no existen', () => {
    render(<CitaCard cita={citaMinima} />);
    expect(screen.queryByText(/carnet/)).not.toBeInTheDocument();
  });

  test('renderiza el Badge con el estado de la cita', () => {
    render(<CitaCard cita={citaCompleta} />);
    expect(screen.getByTestId('badge')).toHaveTextContent('confirmada');
  });

  test('muestra emoji de perro para especie Perro', () => {
    render(<CitaCard cita={citaCompleta} />);
    expect(screen.getByTestId('cita-card').textContent).toContain('🐶');
  });

  test('muestra emoji genérico para especie desconocida', () => {
    const citaRara = {
      ...citaMinima,
      mascota: { nombre: 'Rex', especie: 'Dragón' },
    };
    render(<CitaCard cita={citaRara} />);
    expect(screen.getByTestId('cita-card').textContent).toContain('🐾');
  });

  test('muestra "—" cuando no hay nombre de mascota', () => {
    const citaSinMascota = { ...citaMinima, mascota: {} };
    render(<CitaCard cita={citaSinMascota} />);
    // Múltiples "—" podrían aparecer; validamos al menos uno
    expect(screen.getAllByText('—').length).toBeGreaterThan(0);
  });
});
