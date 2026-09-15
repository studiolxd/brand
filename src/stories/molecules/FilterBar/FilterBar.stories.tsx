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

    // Y las acciones, en la celda siguiente de la MISMA rejilla: comparten
    // línea con los filtros y empiezan donde acaba el último, no al otro
    // extremo de la fila.
    // Se compara por el borde inferior: la celda del botón se alinea con los
    // CONTROLES, no con los rótulos que llevan encima.
    const acciones = canvasElement.querySelector('.filter-bar__actions') as HTMLElement;
    await expect(acciones.getBoundingClientRect().bottom)
      .toBeCloseTo(tercero.getBoundingClientRect().bottom, 0);
    await expect(acciones.getBoundingClientRect().left)
      .toBeGreaterThan(tercero.getBoundingClientRect().right);
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
    const rejilla = canvasElement.querySelector('.filter-bar__row') as HTMLElement;
    const anchoRejilla = rejilla.getBoundingClientRect().width;
    for (const filtro of filtros) {
      await expect(filtro.getBoundingClientRect().width).toBeCloseTo(anchoRejilla, 0);
    }
    // Uno debajo de otro, no en columnas.
    await expect(filtros[1].getBoundingClientRect().top)
      .toBeGreaterThanOrEqual(filtros[0].getBoundingClientRect().bottom);
  },
};

/**
 * Test: norma del sistema — por debajo de `md` las acciones de la barra
 * ocupan la línea entera, como el buscador y los filtros.
 */
export const ContratoAccionesAnchoCompletoEnMovil: Story = {
  name: 'Test — en móvil las acciones ocupan la línea',
  tags: ['!dev'],
  globals: { viewport: { value: 'mobile1' } },
  render: () => (
    <FilterBar search={<Buscador />} actions={<Button variant="outline">Limpiar filtros</Button>}>
      <SelectField id="tma-estado" label="Estado" options={ESTADOS} defaultValue="todos" />
      <SelectField id="tma-papel" label="Papel" options={PAPELES} defaultValue="todos" />
    </FilterBar>
  ),
  play: async ({ canvasElement }) => {
    const fila = canvasElement.querySelector('.filter-bar__row') as HTMLElement;
    const acciones = canvasElement.querySelector('.filter-bar__actions') as HTMLElement;
    const boton = acciones.querySelector('.button') as HTMLElement;
    const ultimoFiltro = Array.from(
      canvasElement.querySelectorAll<HTMLElement>('.filter-bar__filter'),
    ).at(-1) as HTMLElement;

    // La ranura ocupa la fila entera…
    await expect(acciones.getBoundingClientRect().width).toBeCloseTo(
      fila.getBoundingClientRect().width,
      0,
    );
    // …y el botón, la ranura entera.
    await expect(boton.getBoundingClientRect().width).toBeCloseTo(
      acciones.getBoundingClientRect().width,
      0,
    );
    // En su propia línea, debajo de los filtros.
    await expect(acciones.getBoundingClientRect().top).toBeGreaterThanOrEqual(
      ultimoFiltro.getBoundingClientRect().bottom,
    );
  },
};

/**
 * Test: el número de columnas y el ancho de los campos los decide el sitio
 * disponible, NO si hay botón. El de «Limpiar filtros» solo se pinta cuando ya
 * hay algo que limpiar —o sea, mientras se escribe—, y con la maqueta anterior
 * su aparición le robaba el ancho a la rejilla y tiraba un filtro a la línea
 * siguiente. Dos barras idénticas salvo por las acciones, en el mismo hueco:
 * sus filtros tienen que caer en el mismo sitio y medir lo mismo.
 */
export const ContratoColumnasIndependientesDeLasAcciones: Story = {
  name: 'Test — las columnas no dependen del botón',
  tags: ['!dev'],
  render: () => (
    <>
      <div data-testid="sin-acciones">
        <FilterBar>
          <SelectField id="ci-estado" label="Estado" options={ESTADOS} defaultValue="todos" />
          <SelectField id="ci-papel" label="Papel" options={PAPELES} defaultValue="todos" />
          <DatePickerField id="ci-desde" label="Desde" />
        </FilterBar>
      </div>
      <div data-testid="con-acciones">
        <FilterBar actions={<Button variant="outline">Limpiar filtros</Button>}>
          <SelectField id="ca-estado" label="Estado" options={ESTADOS} defaultValue="todos" />
          <SelectField id="ca-papel" label="Papel" options={PAPELES} defaultValue="todos" />
          <DatePickerField id="ca-desde" label="Desde" />
        </FilterBar>
      </div>
    </>
  ),
  play: async ({ canvasElement }) => {
    const celdas = (testId: string) =>
      Array.from(
        canvasElement
          .querySelector(`[data-testid="${testId}"]`)!
          .querySelectorAll<HTMLElement>('.filter-bar__filter'),
      ).map((celda) => celda.getBoundingClientRect());

    const sin = celdas('sin-acciones');
    const con = celdas('con-acciones');

    await expect(con).toHaveLength(sin.length);
    for (let i = 0; i < sin.length; i += 1) {
      // Mismo ancho de columna…
      await expect(con[i].width).toBeCloseTo(sin[i].width, 0);
      // …y misma posición horizontal: ningún filtro se ha movido de columna.
      await expect(con[i].left - con[0].left).toBeCloseTo(sin[i].left - sin[0].left, 0);
    }

    // Y el botón es una celda más: comparte línea con los filtros.
    const barraConAcciones = canvasElement.querySelector(
      '[data-testid="con-acciones"] .filter-bar__actions',
    ) as HTMLElement;
    await expect(barraConAcciones.getBoundingClientRect().bottom).toBeCloseTo(
      con[0].bottom,
      0,
    );
  },
};
