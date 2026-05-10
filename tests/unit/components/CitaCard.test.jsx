import React from 'react';
import { render, screen } from '@testing-library/react';
import CitaCard from '../../../src/components/citas/CitaCard';

// Mock de sub-componentes externos

// reemplazamos el Badge real por una versión mínima de prueba —
// como poner un cartel de papel en lugar del letrero luminoso para ensayar
jest.mock('../../../src/components/ui/Badge', () => ({
  __esModule: true,
  default: ({ estado }) => <span data-testid="badge">{estado}</span>,
}));

// Datos de prueba

// cita con todos los campos opcionales presentes —
// como un turno agendado con ficha completa, notas y todo
const citaCompleta = {
  hora: '14:30',
  estado: 'confirmada',
  mascota: { nombre: 'Firulais', especie: 'Perro', raza: 'Labrador' },
  cliente: { nombre: 'Juan Pérez', telefono: '912345678' },
  veterinario: { nombre: 'Dra. López', especialidad: 'Cirugía' },
  motivo: 'Vacunación anual',
  notas: 'Traer carnet de vacunas',
};

// cita con solo los campos obligatorios, sin motivo ni notas —
// como un turno anotado al vuelo sin demasiados detalles
const citaMinima = {
  hora: '09:00',
  estado: 'pendiente',
  mascota: { nombre: 'Michi', especie: 'Gato' },
  cliente: { nombre: 'Ana Gómez', telefono: '987654321' },
  veterinario: { nombre: 'Dr. Ruiz', especialidad: 'Dermatología' },
};

// Tests
describe('CitaCard', () => {
  test('renderiza el artículo con data-testid correcto', () => {
    render(<CitaCard cita={citaMinima} />);
    expect(screen.getByTestId('cita-card')).toBeInTheDocument();
  });

  test('muestra la hora formateada', () => {
    render(<CitaCard cita={citaMinima} />);
    // formatHora('09:00') → '9:00 a. m.' o '9:00 AM' según locale —
    // como mostrar la hora en el formato que usa la recepción local
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

  // cuando no hay raza registrada, solo debe aparecer la especie —
  // como una ficha donde el dueño no supo indicar el pedigree
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

  // si no hay motivo, la sección entera no debe renderizarse —
  // como no imprimir un renglón vacío en el formulario de atención
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

  // especie no reconocida debe caer al emoji genérico de pata —
  // como usar el ícono de animal desconocido cuando no hay foto en el sistema
  test('muestra emoji genérico para especie desconocida', () => {
    const citaRara = {
      ...citaMinima,
      mascota: { nombre: 'Rex', especie: 'Dragón' },
    };
    render(<CitaCard cita={citaRara} />);
    expect(screen.getByTestId('cita-card').textContent).toContain('🐾');
  });

  // objeto mascota vacío no debe romper el render, solo mostrar el guión —
  // como dejar el campo en blanco en vez de tirar el formulario a la basura
  test('muestra "—" cuando no hay nombre de mascota', () => {
    const citaSinMascota = { ...citaMinima, mascota: {} };
    render(<CitaCard cita={citaSinMascota} />);
    // múltiples "—" podrían aparecer; validamos al menos uno
    expect(screen.getAllByText('—').length).toBeGreaterThan(0);
  });
});
