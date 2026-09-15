import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrandMessagesProvider } from './BrandMessagesProvider';
import type { BrandMessages } from './BrandMessages';
import { brandMessagesFixtureEn as EN } from '../../../.storybook/brandMessagesFixtureEn';
import { Pagination } from '../molecules/Pagination/Pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../molecules/Table/Table';
import { DataTable } from '../organisms/DataTable/DataTable';

/**
 * El orden de resolución de un texto: **prop → proveedor → error**. Sin cuarto
 * escalón — ningún componente trae el castellano puesto.
 */

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

/** Una tabla mínima con una cabecera ordenable y una columna de acciones. */
function TablaDePrueba(props: {
  sortableLabel?: string;
  actionsLabel?: string;
  sortable?: boolean;
  actions?: boolean;
}) {
  const { sortable = true, actions = true, ...labels } = props;
  return (
    <Table caption="Proyectos">
      <TableHead>
        <TableRow>
          <TableHeader sortable={sortable} {...labels}>Nombre</TableHeader>
          {actions && <TableHeader actions {...labels} />}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Uno</TableCell>
          {actions && <TableCell actions />}
        </TableRow>
      </TableBody>
    </Table>
  );
}

describe('Table lee del proveedor', () => {
  it('el estado de ordenación y el rótulo de acciones salen del catálogo', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <TablaDePrueba />
      </BrandMessagesProvider>,
    );

    expect(screen.getByText('Activate sorting')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('la prop suelta gana al proveedor', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <TablaDePrueba sortableLabel="Trier" actionsLabel="Actions rapides" />
      </BrandMessagesProvider>,
    );

    expect(screen.getByText('Trier')).toBeInTheDocument();
    expect(screen.getByText('Actions rapides')).toBeInTheDocument();
    expect(screen.queryByText('Activate sorting')).toBeNull();
  });

  it('sin proveedor y sin prop, revienta diciendo qué texto falta', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<TablaDePrueba />)).toThrow(/table\.sortable/);
  });

  it('una tabla sin cabecera ordenable ni acciones no exige ningún texto', () => {
    expect(() =>
      render(<TablaDePrueba sortable={false} actions={false} />),
    ).not.toThrow();
  });

  it('el `caption` y el `label` de fila no salen del catálogo: son de esta pantalla', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <TablaDePrueba />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('table', { name: 'Proyectos' })).toBeInTheDocument();
  });
});

describe('DataTable lee del proveedor', () => {
  const columns = [
    { accessorKey: 'name', header: 'Nombre' },
  ];

  it('el rótulo del buscador y el aviso de vacío salen del catálogo', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <DataTable columns={columns} data={[]} searchColumnId="name" />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('textbox', { name: 'Search…' })).toBeInTheDocument();
    expect(screen.getByText('No results.')).toBeInTheDocument();
  });

  it('la prop suelta gana: el vacío de ESTA pantalla no está en el catálogo común', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <DataTable columns={columns} data={[]} emptyMessage="Todavía no has invitado a nadie" />
      </BrandMessagesProvider>,
    );

    expect(screen.getByText('Todavía no has invitado a nadie')).toBeInTheDocument();
    expect(screen.queryByText('No results.')).toBeNull();
  });

  it('sin proveedor y sin prop, revienta diciendo qué texto falta', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<DataTable columns={columns} data={[]} />)).toThrow(
      /dataTable\.empty/,
    );
  });

  it('una tabla con filas y sin buscador no exige ninguno de sus dos textos', () => {
    const sinLosSuyos = { ...EN, dataTable: {} } as unknown as BrandMessages;

    expect(() =>
      render(
        <BrandMessagesProvider messages={sinLosSuyos}>
          <DataTable columns={columns} data={[{ name: 'Uno' }]} />
        </BrandMessagesProvider>,
      ),
    ).not.toThrow();
  });
});
