import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MascotaDetalle from '../../../src/components/mascotas/MascotaDetalle';


// Mocks de sub-componentes

// el mock se declara antes de la constante porque jest.mock se eleva al tope —
// como colgar el letrero antes de que llegue el empleado que lo va a usar
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// capturamos las llamadas a navigate sin cambiar de ruta —
// como interceptar el timbre de la puerta antes de que suene de verdad
const mockNavigate = jest.fn();

// reemplazamos MascotaCard por una versión mínima que expone el nombre —
// como usar un maniquí con etiqueta en vez del paciente real para el ensayo
jest.mock('../../../src/components/mascotas/MascotaCard', () => ({
  __esModule: true,
  default: ({ mascota }) => (
    <div data-testid="mascota-card">{mascota.nombre}</div>
  ),
}));

// reemplazamos HistorialMedico por un contador simple de registros —
// como sustituir el expediente completo por un post-it que dice cuántas hojas tiene
jest.mock('../../../src/components/mascotas/HistorialMedico', () => ({
  __esModule: true,
  default: ({ historial }) => (
    <div data-testid="historial-medico">
      {historial?.length ?? 0} registros
    </div>
  ),
}));

// versión mínima del Spinner que expone su texto para poder buscarlo en pantalla —
// como poner un cartel que diga "cargando" en vez de la animación real
jest.mock('../../../src/components/ui/Spinner', () => ({
  __esModule: true,
  default: ({ texto }) => <div data-testid="spinner">{texto}</div>,
}));

// versión mínima del EmptyState que expone su título —
// como reemplazar la sala de espera vacía por un letrero con el motivo
jest.mock('../../../src/components/ui/EmptyState', () => ({
  __esModule: true,
  default: ({ titulo }) => <div data-testid="empty-state">{titulo}</div>,
}));


// Datos de prueba

// mascota completa con dos entradas en el historial médico —
// como la ficha más detallada del archivo para cubrir todos los casos
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

// envuelve el componente en un router para que useNavigate no falle —
// como montar el componente dentro de su entorno mínimo necesario
const renderDetalle = (props) =>
  render(
    <MemoryRouter>
      <MascotaDetalle {...props} />
    </MemoryRouter>
  );


// Tests

describe('MascotaDetalle', () => {
  // limpiamos el historial de llamadas antes de cada test
  // como borrar el registro de timbres antes de empezar el siguiente ensayo
  beforeEach(() => mockNavigate.mockClear());

  test('muestra el Spinner cuando loading=true', () => {
    renderDetalle({ mascota: null, loading: true });
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByText(/Cargando mascota/i)).toBeInTheDocument();
  });

  // aunque se pase una mascota válida, el contenido no debe mostrarse mientras carga
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

  // historialMedico undefined debe tratarse como lista vacía sin romper el render
  test('renderiza HistorialMedico con 0 registros si historialMedico es undefined', () => {
    const mascotaSinHistorial = { ...mascotaMock, historialMedico: undefined };
    renderDetalle({ mascota: mascotaSinHistorial });
    expect(screen.getByTestId('historial-medico')).toHaveTextContent('0 registros');
  });

  test('muestra el botón "← Volver"', () => {
    renderDetalle({ mascota: mascotaMock });
    expect(screen.getByText(/← Volver/)).toBeInTheDocument();
  });

  // navigate(-1) retrocede en el historial del navegador sin necesitar una ruta fija
  test('navega hacia atrás al hacer click en "← Volver"', () => {
    renderDetalle({ mascota: mascotaMock });
    fireEvent.click(screen.getByText(/← Volver/));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('muestra el título "Historial médico"', () => {
    renderDetalle({ mascota: mascotaMock });
    expect(screen.getByText(/Historial médico/i)).toBeInTheDocument();
  });

  // sin pasar loading explícitamente, el spinner no debe aparecer
  test('loading es false por defecto', () => {
    renderDetalle({ mascota: mascotaMock });
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });
});
