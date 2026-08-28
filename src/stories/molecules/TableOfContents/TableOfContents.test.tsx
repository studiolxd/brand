import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TableOfContents, type TableOfContentsItem } from './TableOfContents';

const items: TableOfContentsItem[] = [
  { id: 'instalacion', label: 'Instalación', level: 2 },
  { id: 'requisitos', label: 'Requisitos previos', level: 3 },
  { id: 'tokens', label: 'Tokens SCSS', level: 4 },
  { id: 'uso', label: 'Uso', level: 2 },
];

describe('TableOfContents', () => {
  it('monta un nav con nombre accesible y una entrada por encabezado', () => {
    render(<TableOfContents items={items} />);
    const nav = screen.getByRole('navigation', { name: 'En esta página' });
    expect(within(nav).getAllByRole('link')).toHaveLength(items.length);
  });

  it('apunta cada entrada al ancla de su encabezado', () => {
    render(<TableOfContents items={items} />);
    expect(screen.getByRole('link', { name: 'Instalación' })).toHaveAttribute('href', '#instalacion');
    expect(screen.getByRole('link', { name: 'Tokens SCSS' })).toHaveAttribute('href', '#tokens');
  });

  it('marca solo la sección activa con aria-current="location"', () => {
    render(<TableOfContents items={items} activeId="requisitos" />);
    const actuales = screen.getAllByRole('link').filter(
      (a) => a.getAttribute('aria-current') === 'location',
    );
    expect(actuales).toHaveLength(1);
    expect(actuales[0]).toHaveTextContent('Requisitos previos');
  });

  it('no marca nada cuando activeId no corresponde a ninguna entrada', () => {
    render(<TableOfContents items={items} activeId="no-existe" />);
    expect(document.querySelectorAll('[aria-current]')).toHaveLength(0);
  });

  it('sangra por profundidad relativa al nivel más alto de la lista', () => {
    const { container } = render(<TableOfContents items={items} />);
    const li = container.querySelectorAll('li');
    expect(li[0]).toHaveClass('table-of-contents__item--level-0');
    expect(li[1]).toHaveClass('table-of-contents__item--level-1');
    expect(li[2]).toHaveClass('table-of-contents__item--level-2');
    expect(li[3]).toHaveClass('table-of-contents__item--level-0');
  });

  it('sangra igual cuando el índice empieza en h3: la profundidad es relativa', () => {
    const { container } = render(
      <TableOfContents
        items={[
          { id: 'a', label: 'A', level: 3 },
          { id: 'b', label: 'B', level: 4 },
        ]}
      />,
    );
    const li = container.querySelectorAll('li');
    expect(li[0]).toHaveClass('table-of-contents__item--level-0');
    expect(li[1]).toHaveClass('table-of-contents__item--level-1');
  });

  it('acepta un rótulo visible y una etiqueta accesible propias', () => {
    render(<TableOfContents items={items} title="Contenido" ariaLabel="On this page" />);
    expect(screen.getByRole('navigation', { name: 'On this page' })).toBeInTheDocument();
    expect(screen.getByText('Contenido')).toBeInTheDocument();
  });

  it('no renderiza nada sin entradas', () => {
    const { container } = render(<TableOfContents items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('llama a onItemClick con la entrada pulsada', async () => {
    const onItemClick = vi.fn();
    render(<TableOfContents items={items} onItemClick={onItemClick} />);
    await userEvent.click(screen.getByRole('link', { name: 'Uso' }));
    expect(onItemClick).toHaveBeenCalledTimes(1);
    expect(onItemClick.mock.calls[0]?.[0]).toMatchObject({ id: 'uso' });
  });

  it('fija el índice con sticky y concatena className', () => {
    const { container } = render(<TableOfContents items={items} sticky className="docs-toc" />);
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('table-of-contents--sticky');
    expect(nav).toHaveClass('docs-toc');
  });
});
