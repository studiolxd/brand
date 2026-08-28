import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DocsSearch, type DocsSearchResult } from './DocsSearch';

const results: DocsSearchResult[] = [
  { href: '/docs/brand/instalacion', title: 'Instalación', product: 'brand', excerpt: 'Fija la versión en un tag.' },
  { href: '/docs/brand/tokens', title: 'Tokens', product: 'brand', excerpt: 'Style Dictionary genera el CSS.' },
  { href: '/docs/360/api', title: 'API', product: '360' },
];

function renderSearch(props: Partial<React.ComponentProps<typeof DocsSearch>> = {}) {
  const onQueryChange = vi.fn();
  const utils = render(
    <DocsSearch query="tok" onQueryChange={onQueryChange} results={results} {...props} />,
  );
  return { ...utils, onQueryChange };
}

describe('DocsSearch', () => {
  it('monta un combobox con su etiqueta y una lista con nombre', () => {
    renderSearch();
    const input = screen.getByRole('combobox', { name: 'Buscar en la documentación' });
    expect(input).toHaveValue('tok');
    expect(screen.getByRole('listbox', { name: 'Resultados' })).toBeInTheDocument();
  });

  it('pinta un option por resultado, con su enlace, producto y extracto', () => {
    renderSearch();
    const opciones = screen.getAllByRole('option');
    expect(opciones).toHaveLength(3);
    expect(opciones[0]).toHaveAttribute('href', '/docs/brand/instalacion');
    expect(opciones[0]).toHaveTextContent('brand');
    expect(opciones[0]).toHaveTextContent('Instalación');
    expect(opciones[0]).toHaveTextContent('Fija la versión en un tag.');
  });

  it('no filtra: pinta exactamente los resultados que recibe', () => {
    renderSearch({ query: 'zzz' });
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  it('avisa en una región viva cuando la búsqueda no encuentra nada', () => {
    renderSearch({ results: [] });
    expect(screen.getByRole('status')).toHaveTextContent('Sin resultados.');
  });

  it('avisa de la búsqueda en curso mientras no hay resultados', () => {
    renderSearch({ results: [], loading: true });
    expect(screen.getByRole('status')).toHaveTextContent('Buscando…');
  });

  it('no avisa de nada sin consulta', () => {
    renderSearch({ query: '   ', results: [] });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('mueve el resaltado con las flechas sin sacar el foco del campo', async () => {
    renderSearch();
    const input = screen.getByRole('combobox');
    const opciones = screen.getAllByRole('option');

    await userEvent.click(input);
    await userEvent.keyboard('{ArrowDown}');
    expect(input).toHaveAttribute('aria-activedescendant', opciones[0]!.id);
    expect(input).toHaveFocus();

    await userEvent.keyboard('{ArrowDown}');
    expect(input).toHaveAttribute('aria-activedescendant', opciones[1]!.id);
  });

  it('activa el resultado resaltado con Enter', async () => {
    const onSelect = vi.fn();
    renderSearch({ onSelect });
    const input = screen.getByRole('combobox');

    await userEvent.click(input);
    await userEvent.keyboard('{ArrowDown}{Enter}');
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ href: '/docs/brand/instalacion' }));
  });

  it('propaga cada tecla al consumidor sin guardar estado propio', async () => {
    const { onQueryChange } = renderSearch();
    await userEvent.type(screen.getByRole('combobox'), 'e');
    expect(onQueryChange).toHaveBeenCalledWith('toke', expect.anything());
  });

  it('renderiza los resultados con el enlace del router cuando se le da uno', () => {
    renderSearch({
      renderLink: ({ href, ...props }) => <a {...props} href={`/es${href}`} data-router="next" />,
    });
    const opciones = screen.getAllByRole('option');
    expect(opciones[0]).toHaveAttribute('href', '/es/docs/brand/instalacion');
    expect(opciones[0]).toHaveAttribute('data-router', 'next');
  });

  it('acepta textos propios y oculta la etiqueta', () => {
    renderSearch({
      results: [],
      label: 'Search the docs',
      labelHidden: true,
      emptyLabel: 'No results.',
      resultsLabel: 'Results',
    });
    expect(screen.getByRole('combobox', { name: 'Search the docs' })).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('No results.');
  });
});
