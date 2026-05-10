import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MascotaDetalle from '../../../src/components/mascotas/MascotaDetalle';

// ─────────────────────────────────────────────
// Mocks de sub-componentes
// ─────────────────────────────────────────────
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockNavigate = jest.fn();

jest.mock('../../../src/components/mascotas/MascotaCard', () => ({
  __esModule: true,
  default: ({ mascota }) => (
    <div data-testid="mascota-card">{mascota.nombre}</div>
  ),
}));

jest.mock('../../../src/components/mascotas/HistorialMedico', () => ({
  __esModule: true,
  default: ({ historial }) => (
    <div data-testid="historial-medico">
      {historial?.length ?? 0} registros
    </div>
  ),
}));

jest.mock('../../../src/components/ui/Spinner', () => ({
  __esModule: true,
  default: ({ texto }) => <div data-testid="spinner">{texto}</div>,
}));

jest.mock('../../../src/components/ui/EmptyState', () => ({
  __esModule: true,
  default: ({ titulo }) => <div data-testid="empty-state">{titulo}</div>,
}));

// ─────────────────────────────────────────────
// Datos de prueba
// ─────────────────────────────────────────────
const mascotaMock = {
  id: 10,
  nombre: 'Firulais',
  especie: 'Perro',
  raza: 'Labrador',
  historialMedico: [
    { id: 1, fecha: '2025-01-10', descripcion: 'Vacunación' },
    { id: 2, fecha: '2025-03-20', descripcion: 'Revisión general' },
  ],
};

const renderDetalle = (props) =>
  render(
    <MemoryRouter>
      <MascotaDetalle {...props} />
    </MemoryRouter>
  );

// ─────────────────────────────────────────────
// Tests
// ─────────────────────────────────────────────
describe('MascotaDetalle', () => {
  beforeEach(() => mockNavigate.mockClear());

  test('muestra el Spinner cuando loading=true', () => {
    renderDetalle({ mascota: null, loading: true });
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByText(/Cargando mascota/i)).toBeInTheDocument();
  });

  test('no muestra el contenido principal mientras carga', () => {
    renderDetalle({ mascota: mascotaMock, loading: true });
    expect(screen.queryByTestId('mascota-detalle')).not.toBeInTheDocument();
  });

  test('muestra EmptyState cuando no hay mascota y loading=false', () => {
    renderDetalle({ mascota: null, loading: false });
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(screen.getByText(/Mascota no encontrada/i)).toBeInTheDocument();
  });

  test('renderiza el contenedor principal con data-testid correcto', () => {
    renderDetalle({ mascota: mascotaMock });
    expect(screen.getByTestId('mascota-detalle')).toBeInTheDocument();
  });

  test('renderiza MascotaCard con la mascota correcta', () => {
    renderDetalle({ mascota: mascotaMock });
    expect(screen.getByTestId('mascota-card')).toBeInTheDocument();
    expect(screen.getByTestId('mascota-card')).toHaveTextContent('Firulais');
  });

  test('renderiza HistorialMedico con el historial de la mascota', () => {
    renderDetalle({ mascota: mascotaMock });
    expect(screen.getByTestId('historial-medico')).toBeInTheDocument();
    expect(screen.getByTestId('historial-medico')).toHaveTextContent('2 registros');
  });

  test('renderiza HistorialMedico con 0 registros si historialMedico es undefined', () => {
    const mascotaSinHistorial = { ...mascotaMock, historialMedico: undefined };
    renderDetalle({ mascota: mascotaSinHistorial });
    expect(screen.getByTestId('historial-medico')).toHaveTextContent('0 registros');
  });

  test('muestra el botón "← Volver"', () => {
    renderDetalle({ mascota: mascotaMock });
    expect(screen.getByText(/← Volver/)).toBeInTheDocument();
  });

  test('navega hacia atrás al hacer click en "← Volver"', () => {
    renderDetalle({ mascota: mascotaMock });
    fireEvent.click(screen.getByText(/← Volver/));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('muestra el título "Historial médico"', () => {
    renderDetalle({ mascota: mascotaMock });
    expect(screen.getByText(/Historial médico/i)).toBeInTheDocument();
  });

  test('loading es false por defecto', () => {
    renderDetalle({ mascota: mascotaMock });
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });
});
