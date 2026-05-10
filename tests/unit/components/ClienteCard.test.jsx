import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ClienteCard from '../../../src/components/clientes/ClienteCard';

// ─────────────────────────────────────────────
// Mock de useNavigate
// ─────────────────────────────────────────────
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// ─────────────────────────────────────────────
// Datos de prueba
// ─────────────────────────────────────────────
const clienteConMascotas = {
  id: 1,
  nombre: 'Juan Pérez',
  email: 'juan@email.com',
  telefono: '912345678',
  direccion: 'Av. Principal 123',
  mascotas: [
    { id: 10, nombre: 'Firulais', especie: 'Perro' },
    { id: 11, nombre: 'Michi', especie: 'Gato' },
  ],
};

const clienteSinMascotas = {
  id: 2,
  nombre: 'Ana Gómez',
  email: 'ana@email.com',
  telefono: '987654321',
  direccion: 'Calle Norte 456',
  mascotas: [],
};

const renderCard = (cliente) =>
  render(
    <MemoryRouter>
      <ClienteCard cliente={cliente} />
    </MemoryRouter>
  );

// ─────────────────────────────────────────────
// Tests
// ─────────────────────────────────────────────
describe('ClienteCard', () => {
  beforeEach(() => mockNavigate.mockClear());

  test('renderiza el artículo con data-testid correcto', () => {
    renderCard(clienteConMascotas);
    expect(screen.getByTestId('cliente-card')).toBeInTheDocument();
  });

  test('muestra el nombre del cliente', () => {
    renderCard(clienteConMascotas);
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
  });

  test('muestra el email del cliente', () => {
    renderCard(clienteConMascotas);
    expect(screen.getByText('juan@email.com')).toBeInTheDocument();
  });

  test('muestra el teléfono del cliente', () => {
    renderCard(clienteConMascotas);
    expect(screen.getByText('912345678')).toBeInTheDocument();
  });

  test('muestra la dirección del cliente', () => {
    renderCard(clienteConMascotas);
    expect(screen.getByText('Av. Principal 123')).toBeInTheDocument();
  });

  test('muestra la cantidad correcta de mascotas (plural)', () => {
    renderCard(clienteConMascotas);
    expect(screen.getByText(/2 mascotas/i)).toBeInTheDocument();
  });

  test('muestra "1 mascota" en singular', () => {
    const clienteUnaMascota = {
      ...clienteConMascotas,
      mascotas: [{ id: 10, nombre: 'Firulais', especie: 'Perro' }],
    };
    renderCard(clienteUnaMascota);
    expect(screen.getByText(/1 mascota/i)).toBeInTheDocument();
  });

  test('muestra "0 mascotas" si no tiene mascotas', () => {
    renderCard(clienteSinMascotas);
    expect(screen.getByText(/0 mascotas/i)).toBeInTheDocument();
  });

  test('muestra los nombres de las mascotas', () => {
    renderCard(clienteConMascotas);
    expect(screen.getByText('Firulais')).toBeInTheDocument();
    expect(screen.getByText('Michi')).toBeInTheDocument();
  });

  test('muestra emoji correcto para cada especie de mascota', () => {
    renderCard(clienteConMascotas);
    const card = screen.getByTestId('cliente-card');
    expect(card.textContent).toContain('🐶');
    expect(card.textContent).toContain('🐱');
  });

  test('no renderiza avatares si no hay mascotas', () => {
    renderCard(clienteSinMascotas);
    expect(screen.queryByText('Firulais')).not.toBeInTheDocument();
  });

  test('navega al detalle del cliente al hacer click', () => {
    renderCard(clienteConMascotas);
    fireEvent.click(screen.getByTestId('cliente-card'));
    expect(mockNavigate).toHaveBeenCalledWith('/clientes/1');
  });

  test('muestra el texto "Ver detalle →"', () => {
    renderCard(clienteConMascotas);
    expect(screen.getByText(/Ver detalle/)).toBeInTheDocument();
  });
});
