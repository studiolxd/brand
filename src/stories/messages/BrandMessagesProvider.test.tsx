import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrandMessagesProvider } from './BrandMessagesProvider';
import type { BrandMessages } from './BrandMessages';
import { brandMessagesFixtureEn as EN } from '../../../.storybook/brandMessagesFixtureEn';
import { Pagination } from '../molecules/Pagination/Pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../molecules/Table/Table';
import { DataTable } from '../organisms/DataTable/DataTable';
import { InputField } from '../molecules/InputField/InputField';
import { PasswordField } from '../molecules/PasswordField/PasswordField';
import { SelectField } from '../molecules/SelectField/SelectField';
import { MultiSelectField } from '../molecules/MultiSelectField/MultiSelectField';
import { NumberInput } from '../atoms/NumberInput/NumberInput';
import { OtpInput } from '../atoms/OtpInput/OtpInput';
import { InputPhone } from '../atoms/InputPhone/InputPhone';

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

describe('los átomos de formulario leen del proveedor', () => {
  it('el aspa de un buscador toma su nombre del catálogo', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <InputField id="q" label="Query" kind="search" clearable defaultValue="algo" />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
  });

  it('un campo sin aspa no exige el texto del aspa', () => {
    const sinLosSuyos = { ...EN, inputField: {} } as unknown as BrandMessages;

    expect(() =>
      render(
        <BrandMessagesProvider messages={sinLosSuyos}>
          <InputField id="q" label="Query" />
        </BrandMessagesProvider>,
      ),
    ).not.toThrow();
  });

  it('sin proveedor y sin prop, el aspa revienta diciendo qué texto falta', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() =>
      render(<InputField id="q" label="Query" kind="search" clearable defaultValue="algo" />),
    ).toThrow(/inputField\.clear/);
  });

  it('el `label` del campo NO sale del catálogo: es el contenido de esta pantalla', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <InputField id="q" label="Nombre del proyecto" />
      </BrandMessagesProvider>,
    );

    expect(screen.getByLabelText('Nombre del proyecto')).toBeInTheDocument();
  });

  it('las dos caras del interruptor de contraseña salen del catálogo', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <PasswordField label="Password" />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('button', { name: 'Show password' })).toBeInTheDocument();
  });

  it('la prop suelta gana al proveedor también aquí', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <PasswordField label="Mot de passe" showPasswordLabel="Afficher le mot de passe" />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('button', { name: 'Afficher le mot de passe' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Show password' })).toBeNull();
  });

  it('sin proveedor y sin props, el interruptor revienta nombrando la clave', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<PasswordField label="Password" />)).toThrow(/passwordField\.show/);
  });
});

describe('los desplegables leen del proveedor', () => {
  const OPCIONES = [{ value: 'a', label: 'Uno' }];

  it('el marcador de sitio genérico sale del catálogo', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <SelectField id="s" label="Role" options={OPCIONES} />
      </BrandMessagesProvider>,
    );

    expect(screen.getByText('Select…')).toBeInTheDocument();
  });

  it('un marcador que dice algo de ESTE campo se pasa por prop y gana', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <SelectField id="s" label="Role" options={OPCIONES} placeholder="Elige un papel" />
      </BrandMessagesProvider>,
    );

    expect(screen.getByText('Elige un papel')).toBeInTheDocument();
    expect(screen.queryByText('Select…')).toBeNull();
  });

  it('un desplegable con valor elegido no exige el marcador de sitio', () => {
    const sinLosSuyos = { ...EN, select: {} } as unknown as BrandMessages;

    expect(() =>
      render(
        <BrandMessagesProvider messages={sinLosSuyos}>
          <SelectField id="s" label="Role" options={OPCIONES} defaultValue="a" />
        </BrandMessagesProvider>,
      ),
    ).not.toThrow();
  });

  it('sin proveedor y sin prop, revienta nombrando la clave', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<SelectField id="s" label="Role" options={OPCIONES} />)).toThrow(
      /select\.placeholder/,
    );
  });

  it('el aspa de una ficha toma su nombre del catálogo, con la etiqueta interpolada', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <MultiSelectField id="m" label="Roles" options={OPCIONES} defaultValue={['a']} />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('button', { name: 'Remove Uno' })).toBeInTheDocument();
  });

  it('las etiquetas de las OPCIONES no salen del catálogo: son datos', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <MultiSelectField id="m" label="Roles" options={OPCIONES} defaultValue={['a']} />
      </BrandMessagesProvider>,
    );

    expect(screen.getByText('Uno')).toBeInTheDocument();
  });
});

describe('los controles con cromo propio leen del proveedor', () => {
  it('los dos botones del contador toman su nombre del catálogo', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <NumberInput aria-label="Seats" />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('button', { name: 'Increase' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Decrease' })).toBeInTheDocument();
  });

  it('el grupo y las celdas del código salen del catálogo, con la posición interpolada', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <OtpInput length={4} />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('group', { name: 'Verification code' })).toBeInTheDocument();
    expect(screen.getByLabelText('Digit 1 of 4')).toBeInTheDocument();
  });

  it('el selector de país toma su nombre del catálogo', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <InputPhone aria-label="Phone" />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('combobox', { name: 'Country' })).toBeInTheDocument();
  });

  it('sin proveedor y sin prop, el contador revienta nombrando la clave', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<NumberInput aria-label="Seats" />)).toThrow(/numberInput\./);
  });
});
