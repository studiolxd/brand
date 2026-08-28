import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { SidebarNav, type SidebarNavEntry } from './SidebarNav';

const entries: SidebarNavEntry[] = [
  { kind: 'link', id: 'lrs', label: 'LRS', href: '#lrs', empty: true },
  {
    kind: 'group',
    id: 'productos',
    label: 'Productos',
    items: [
      { id: 'bricks', label: 'Bricks', href: '#bricks' },
      { id: 'localizia', label: 'Localizia', href: '#localizia', empty: true },
    ],
  },
];

describe('SidebarNav — entradas vacías', () => {
  it('una entrada vacía se enseña sin enlace y con su marca', () => {
    render(<SidebarNav entries={entries} defaultValue={['productos']} />);
    const nav = screen.getByRole('navigation', { name: 'Navegación principal' });

    expect(within(nav).queryByRole('link', { name: /LRS/ })).toBeNull();
    expect(within(nav).getByText('LRS')).toBeInTheDocument();
    expect(within(nav).queryByRole('link', { name: /Localizia/ })).toBeNull();
    expect(within(nav).getAllByText('sin docs')).toHaveLength(2);
  });

  it('las entradas con contenido siguen siendo enlaces', () => {
    render(<SidebarNav entries={entries} defaultValue={['productos']} />);
    expect(screen.getByRole('link', { name: 'Bricks' })).toHaveAttribute('href', '#bricks');
  });

  it('la marca de vacía es una prop traducible', () => {
    render(<SidebarNav entries={entries} defaultValue={['productos']} emptyLabel="no docs yet" />);
    expect(screen.getAllByText('no docs yet')).toHaveLength(2);
  });

  it('en rail la entrada vacía tampoco es un enlace', () => {
    render(<SidebarNav rail entries={entries} />);
    expect(screen.queryByRole('link', { name: /LRS/ })).toBeNull();
  });
});
