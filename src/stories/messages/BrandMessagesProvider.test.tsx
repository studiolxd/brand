import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrandMessagesProvider } from './BrandMessagesProvider';
import type { BrandMessages } from './BrandMessages';
import { Pagination } from '../molecules/Pagination/Pagination';

/**
 * El orden de resolución de un texto: **prop → proveedor → error**. Sin cuarto
 * escalón — ningún componente trae el castellano puesto.
 */

const EN: BrandMessages = {
  pagination: {
    label: 'Pagination',
    pagesGroup: 'Pages',
    previous: 'Previous page',
    next: 'Next page',
    goToPage: (page) => `Page ${page}`,
    perPage: 'Rows per page',
    total: (total) => `${total} results`,
    allOption: 'All',
  },
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('BrandMessagesProvider', () => {
  it('el proveedor pone los textos que el componente ya no trae', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <Pagination total={100} page={3} pageSize={10} showTotal onPageSizeChange={() => {}} />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Pages' })).toBeInTheDocument();
    expect(screen.getByLabelText('Page 3')).toBeInTheDocument();
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Next page')).toBeInTheDocument();
    expect(screen.getByLabelText('Rows per page')).toBeInTheDocument();
    expect(screen.getByText('100 results')).toBeInTheDocument();
  });

  it('la prop suelta gana al proveedor: es la anulación puntual', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <Pagination total={100} page={3} pageSize={10} ariaLabel="Search results" />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('navigation', { name: 'Search results' })).toBeInTheDocument();
    // lo demás sigue saliendo del proveedor
    expect(screen.getByLabelText('Page 3')).toBeInTheDocument();
  });

  it('sin proveedor y sin prop, revienta diciendo qué texto falta', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<Pagination total={100} page={3} pageSize={10} />)).toThrow(
      /pagination\.label/,
    );
  });

  it('sin proveedor, las props sueltas bastan: no hay castellano de respaldo que se cuele', () => {
    render(
      <Pagination
        total={100}
        page={3}
        pageSize={10}
        ariaLabel="Pagination"
        pagesGroupLabel="Pages"
        previousLabel="Previous page"
        nextLabel="Next page"
        pageLabel={(p) => `Page ${p}`}
      />,
    );

    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
    expect(screen.getByLabelText('Page 3')).toBeInTheDocument();
    expect(screen.queryByLabelText('Página 3')).toBeNull();
  });

  it('un texto que no se pinta no se exige: sin selector no hace falta su etiqueta', () => {
    // Sin `showTotal` ni `onPageSizeChange`, `total` y `perPage` no se leen —
    // el lector se llama donde se pinta el texto, no al abrir el render.
    const sinSelector = {
      pagination: { ...EN.pagination },
    } as BrandMessages;
    delete (sinSelector.pagination as Partial<BrandMessages['pagination']>).perPage;
    delete (sinSelector.pagination as Partial<BrandMessages['pagination']>).total;

    render(
      <BrandMessagesProvider messages={sinSelector}>
        <Pagination total={100} page={3} pageSize={10} />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
  });
});
