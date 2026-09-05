import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FilterBar } from './FilterBar';
import { InputField } from '../InputField/InputField';
import { SelectField } from '../SelectField/SelectField';
import { Button } from '../../atoms/Button/Button';

const ESTADOS = [
  { value: 'todos', label: 'Todos los estados' },
  { value: 'activo', label: 'Activa' },
];

function Buscador() {
  return <InputField id="buscar" kind="search" label="Buscar" labelHidden />;
}

describe('FilterBar', () => {
  it('es un punto de referencia de búsqueda con nombre castellano por defecto', () => {
    render(<FilterBar search={<Buscador />} />);
    expect(screen.getByRole('search', { name: 'Filtros' })).toBeInTheDocument();
  });

  it('el nombre accesible se traduce por prop', () => {
    render(<FilterBar ariaLabel="Filters" search={<Buscador />} />);
    expect(screen.getByRole('search', { name: 'Filters' })).toBeInTheDocument();
  });

  it('el buscador va en su propia línea, fuera de la fila de filtros', () => {
    const { container } = render(
      <FilterBar search={<Buscador />}>
        <SelectField id="estado" label="Estado" options={ESTADOS} />
      </FilterBar>,
    );
    const buscador = container.querySelector('.filter-bar__search');
    expect(buscador).not.toBeNull();
    expect(buscador?.closest('.filter-bar__row')).toBeNull();
    expect(buscador?.nextElementSibling).toHaveClass('filter-bar__row');
  });

  it('cada filtro es una celda de la rejilla y conserva su etiqueta visible', () => {
    const { container } = render(
      <FilterBar search={<Buscador />}>
        <SelectField id="estado" label="Estado" options={ESTADOS} />
        <SelectField id="papel" label="Papel" options={ESTADOS} />
      </FilterBar>,
    );
    expect(container.querySelectorAll('.filter-bar__filter')).toHaveLength(2);
    const etiquetas = Array.from(container.querySelectorAll('.filter-bar__filters label'));
    expect(etiquetas).toHaveLength(2);
    for (const etiqueta of etiquetas) {
      expect(etiqueta).not.toHaveClass('visually-hidden');
    }
  });

  it('las acciones van al final de la fila de filtros, no dentro de la rejilla', () => {
    const { container } = render(
      <FilterBar search={<Buscador />} actions={<Button variant="outline">Limpiar filtros</Button>}>
        <SelectField id="estado" label="Estado" options={ESTADOS} />
      </FilterBar>,
    );
    const acciones = container.querySelector('.filter-bar__actions');
    expect(acciones).toHaveTextContent('Limpiar filtros');
    expect(acciones?.closest('.filter-bar__filters')).toBeNull();
    expect(acciones?.previousElementSibling).toHaveClass('filter-bar__filters');
  });

  it('sin filtros ni acciones no pinta la fila vacía', () => {
    const { container } = render(<FilterBar search={<Buscador />} />);
    expect(container.querySelector('.filter-bar__row')).toBeNull();
  });

  it('sin buscador no pinta su línea', () => {
    const { container } = render(
      <FilterBar>
        <SelectField id="estado" label="Estado" options={ESTADOS} />
      </FilterBar>,
    );
    expect(container.querySelector('.filter-bar__search')).toBeNull();
  });

  it('reenvía el resto de props al contenedor', () => {
    const { container } = render(<FilterBar id="filtros" data-testid="barra" search={<Buscador />} />);
    const barra = container.querySelector('.filter-bar');
    expect(barra).toHaveAttribute('id', 'filtros');
    expect(barra).toHaveAttribute('data-testid', 'barra');
  });

  it('`className` se añade después de las clases propias', () => {
    const { container } = render(<FilterBar className="mia" search={<Buscador />} />);
    expect(container.querySelector('.filter-bar')?.className).toBe('filter-bar mia');
  });
});
