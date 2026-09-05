import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { FilterBar } from './FilterBar';
import { InputField } from '../InputField/InputField';
import { SelectField } from '../SelectField/SelectField';
import { DatePickerField } from '../DatePickerField/DatePickerField';
import { Button } from '../../atoms/Button/Button';

const meta = {
  title: 'Molecules/FilterBar',
  component: FilterBar,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const ESTADOS = [
  { value: 'todos', label: 'Todos los estados' },
  { value: 'activo', label: 'Activa' },
  { value: 'suspendido', label: 'Suspendida' },
];

const PAPELES = [
  { value: 'todos', label: 'Todos los papeles' },
  { value: 'admin', label: 'Administración' },
  { value: 'editor', label: 'Edición' },
  { value: 'lectura', label: 'Solo lectura' },
];

/** El buscador de la barra: el campo de búsqueda del sistema, con su lupa. */
function Buscador() {
  const [query, setQuery] = useState('');
  return (
    <InputField
      id="filtros-buscar"
      kind="search"
      clearable
      label="Buscar"
      labelHidden
      placeholder="Buscar por nombre o correo…"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export const SoloBuscador: Story = {
  name: 'Solo buscador',
  render: () => (
    <FilterBar search={<Buscador />} />
  ),
};

export const ConFiltros: Story = {
  name: 'Buscador y tres filtros',
  render: () => (
    <FilterBar search={<Buscador />}>
      <SelectField id="filtro-estado" label="Estado" options={ESTADOS} defaultValue="todos" />
      <SelectField id="filtro-papel" label="Papel" options={PAPELES} defaultValue="todos" />
      <DatePickerField id="filtro-desde" label="Desde" />
    </FilterBar>
  ),
};

export const ConAcciones: Story = {
  name: 'Con acciones',
  render: () => (
    <FilterBar
      search={<Buscador />}
      actions={<Button variant="outline">Limpiar filtros</Button>}
    >
      <SelectField id="filtro-estado-acc" label="Estado" options={ESTADOS} defaultValue="todos" />
      <SelectField id="filtro-papel-acc" label="Papel" options={PAPELES} defaultValue="todos" />
      <DatePickerField id="filtro-desde-acc" label="Desde" />
    </FilterBar>
  ),
};

/** En móvil los filtros se apilan a ancho completo y las acciones caen al final. */
export const Movil: Story = {
  name: 'En móvil',
  globals: { viewport: { value: 'mobile1' } },
  render: () => (
    <FilterBar
      search={<Buscador />}
      actions={<Button variant="outline">Limpiar filtros</Button>}
    >
      <SelectField id="filtro-estado-movil" label="Estado" options={ESTADOS} defaultValue="todos" />
      <SelectField id="filtro-papel-movil" label="Papel" options={PAPELES} defaultValue="todos" />
      <DatePickerField id="filtro-desde-movil" label="Desde" />
    </FilterBar>
  ),
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  render: () => (
    <FilterBar
      search={<Buscador />}
      actions={<Button variant="outline">Limpiar filtros</Button>}
    >
      <SelectField id="filtro-estado-oscuro" label="Estado" options={ESTADOS} defaultValue="todos" />
      <SelectField id="filtro-papel-oscuro" label="Papel" options={PAPELES} defaultValue="todos" />
      <DatePickerField id="filtro-desde-oscuro" label="Desde" />
    </FilterBar>
  ),
};

/** Test: el buscador ocupa su línea entera y los filtros van en columnas. */
export const ContratoBuscadorEnSuLinea: Story = {
  name: 'Test — el buscador ocupa su propia línea',
  tags: ['!dev'],
  render: () => (
    <FilterBar search={<Buscador />} actions={<Button variant="outline">Limpiar filtros</Button>}>
      <SelectField id="t-estado" label="Estado" options={ESTADOS} defaultValue="todos" />
      <SelectField id="t-papel" label="Papel" options={PAPELES} defaultValue="todos" />
      <DatePickerField id="t-desde" label="Desde" />
    </FilterBar>
  ),
  play: async ({ canvasElement }) => {
    const barra = canvasElement.querySelector('.filter-bar') as HTMLElement;
    const buscador = canvasElement.querySelector('.filter-bar__search') as HTMLElement;
    const fila = canvasElement.querySelector('.filter-bar__row') as HTMLElement;
    const filtros = Array.from(
      canvasElement.querySelectorAll<HTMLElement>('.filter-bar__filter'),
    );

    // El buscador ocupa el ancho de la barra y nada comparte su línea.
    await expect(buscador.getBoundingClientRect().width)
      .toBeCloseTo(barra.getBoundingClientRect().width, 0);
    await expect(fila.getBoundingClientRect().top)
      .toBeGreaterThanOrEqual(buscador.getBoundingClientRect().bottom);

    // En escritorio, los tres filtros comparten línea: van en columnas.
    const [primero, , tercero] = filtros;
    await expect(primero.getBoundingClientRect().top)
      .toBeCloseTo(tercero.getBoundingClientRect().top, 0);
    await expect(tercero.getBoundingClientRect().left)
      .toBeGreaterThan(primero.getBoundingClientRect().right);

    // Y las acciones, al final de esa fila.
    const acciones = canvasElement.querySelector('.filter-bar__actions') as HTMLElement;
    await expect(acciones.getBoundingClientRect().right)
      .toBeCloseTo(fila.getBoundingClientRect().right, 0);
  },
};

/** Test: en pantalla estrecha los filtros se apilan a ancho completo. */
export const ContratoApiladoEnMovil: Story = {
  name: 'Test — en móvil los filtros se apilan',
  tags: ['!dev'],
  globals: { viewport: { value: 'mobile1' } },
  render: () => (
    <FilterBar search={<Buscador />}>
      <SelectField id="tm-estado" label="Estado" options={ESTADOS} defaultValue="todos" />
      <SelectField id="tm-papel" label="Papel" options={PAPELES} defaultValue="todos" />
      <DatePickerField id="tm-desde" label="Desde" />
    </FilterBar>
  ),
  play: async ({ canvasElement }) => {
    const filtros = Array.from(
      canvasElement.querySelectorAll<HTMLElement>('.filter-bar__filter'),
    );
    const rejilla = canvasElement.querySelector('.filter-bar__filters') as HTMLElement;
    const anchoRejilla = rejilla.getBoundingClientRect().width;
    for (const filtro of filtros) {
      await expect(filtro.getBoundingClientRect().width).toBeCloseTo(anchoRejilla, 0);
    }
    // Uno debajo de otro, no en columnas.
    await expect(filtros[1].getBoundingClientRect().top)
      .toBeGreaterThanOrEqual(filtros[0].getBoundingClientRect().bottom);
  },
};
