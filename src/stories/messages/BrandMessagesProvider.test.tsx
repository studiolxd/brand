import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
import { AsyncSelect } from '../atoms/AsyncSelect/AsyncSelect';
import { AsyncMultiSelect } from '../atoms/AsyncMultiSelect/AsyncMultiSelect';
import { SearchForm } from '../molecules/SearchForm/SearchForm';
import { DocsSearch } from '../molecules/DocsSearch/DocsSearch';
import { FilterBar } from '../molecules/FilterBar/FilterBar';
import { Calendar } from '../molecules/Calendar/Calendar';
import { DatePicker } from '../molecules/DatePicker/DatePicker';
import { DatePickerField } from '../molecules/DatePickerField/DatePickerField';
import { DateTimeField } from '../molecules/DateTimeField/DateTimeField';
import { TimeField } from '../molecules/TimeField/TimeField';

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

describe('los buscadores asíncronos leen del proveedor', () => {
  const buscar = async () => [];

  it('la pista del campo sale del catálogo', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <AsyncSelect onSearch={buscar} aria-label="Owner" />
      </BrandMessagesProvider>,
    );

    expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument();
  });

  it('el aspa de cada ficha interpola la etiqueta de su opción', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <AsyncMultiSelect
          onSearch={buscar}
          aria-label="Owners"
          defaultValue={['1']}
          selectedOptions={[{ value: '1', label: 'Ada Lovelace' }]}
        />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('button', { name: 'Remove Ada Lovelace' })).toBeInTheDocument();
  });

  it('sin proveedor y sin prop, revienta nombrando la clave', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<AsyncSelect onSearch={buscar} aria-label="Owner" />)).toThrow(
      /asyncSelect\.placeholder/,
    );
  });
});

describe('los buscadores y la barra de filtros leen del proveedor', () => {
  it('el buscador de sitio toma su rótulo, su pista y su botón del catálogo', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <SearchForm />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('search', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('el buscador de documentación toma los suyos, y el aspa sigue siendo la del InputField', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <DocsSearch query="zzz" onQueryChange={() => {}} results={[]} />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('combobox', { name: 'Search the documentation' })).toBeInTheDocument();
    expect(screen.getByText('No results.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
  });

  it('la barra de filtros toma su nombre del catálogo', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <FilterBar search={<span />} />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('search', { name: 'Filters' })).toBeInTheDocument();
  });

  it('sin proveedor y sin prop, la barra revienta nombrando la clave', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<FilterBar search={<span />} />)).toThrow(/filterBar\.label/);
  });
});

describe('la fecha y la hora leen del proveedor', () => {
  it('las dos flechas del calendario y la rejilla de años salen del catálogo', async () => {
    const user = userEvent.setup();
    render(
      <BrandMessagesProvider messages={EN}>
        <Calendar defaultMonth={new Date(2026, 8, 1)} />
      </BrandMessagesProvider>,
    );

    expect(screen.getByLabelText('Previous month')).toBeInTheDocument();
    expect(screen.getByLabelText('Next month')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /2026/ }));
    expect(screen.getByRole('grid', { name: 'Choose year' })).toBeInTheDocument();
    expect(screen.getByLabelText('Previous years')).toBeInTheDocument();
  });

  it('un calendario estático no exige los textos de unas flechas que no pinta', () => {
    const sinLosSuyos = { ...EN, calendar: {} } as unknown as BrandMessages;

    expect(() =>
      render(
        <BrandMessagesProvider messages={sinLosSuyos}>
          <Calendar navigable={false} />
        </BrandMessagesProvider>,
      ),
    ).not.toThrow();
  });

  it('sin proveedor y sin prop, el calendario revienta nombrando la clave', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<Calendar />)).toThrow(/calendar\.previousMonth/);
  });

  it('el `gridLabel` NO sale del catálogo: nombra a ESTE calendario', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <Calendar gridLabel="Fecha de alta" />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('grid', { name: 'Fecha de alta' })).toBeInTheDocument();
  });

  it('el botón, el panel y el aviso del selector de fecha salen del catálogo', async () => {
    const user = userEvent.setup();
    render(
      <BrandMessagesProvider messages={EN}>
        <DatePicker aria-label="Start date" />
      </BrandMessagesProvider>,
    );

    const abrir = screen.getByRole('button', { name: 'Open calendar' });
    await user.click(abrir);
    expect(screen.getByRole('dialog', { name: 'Calendar' })).toBeInTheDocument();
    await user.keyboard('{Escape}');

    await user.type(screen.getByRole('textbox', { name: 'Start date' }), '25/09');
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a complete, valid date.');
  });

  it('un campo con fecha válida no exige el aviso de fecha incompleta', () => {
    const sinAviso = { ...EN, datePicker: { ...EN.datePicker } } as BrandMessages;
    delete (sinAviso.datePicker as Partial<BrandMessages['datePicker']>).invalid;

    expect(() =>
      render(
        <BrandMessagesProvider messages={sinAviso}>
          <DatePicker aria-label="Start date" value={new Date(2026, 8, 25)} />
        </BrandMessagesProvider>,
      ),
    ).not.toThrow();
  });

  /**
   * La máscara tiene dos mitades y se deciden en sitios distintos: **las
   * letras** salen del catálogo (son idioma: `aaaa`, `yyyy`, `jjjj`) y **el
   * orden y el separador** salen del `locale` (son formato). Un catálogo en
   * inglés sobre fechas españolas tiene que dar `dd/mm/yyyy`, no `mm/dd/yyyy`.
   */
  it('la máscara toma las letras del catálogo y el orden del locale', () => {
    const { unmount } = render(
      <BrandMessagesProvider messages={EN}>
        <DatePicker aria-label="Start date" locale="es-ES" />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('textbox', { name: 'Start date' })).toHaveAttribute(
      'placeholder',
      'dd/mm/yyyy',
    );
    unmount();

    render(
      <BrandMessagesProvider messages={EN}>
        <DatePicker aria-label="Start date" locale="de-DE" />
      </BrandMessagesProvider>,
    );

    // Mismas letras del catálogo inglés, separador y orden alemanes.
    expect(screen.getByRole('textbox', { name: 'Start date' })).toHaveAttribute(
      'placeholder',
      'dd.mm.yyyy',
    );
  });

  it('un `placeholder` propio gana a la máscara: es contenido de este campo', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <DatePicker aria-label="Start date" placeholder="Desde" />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('textbox', { name: 'Start date' })).toHaveAttribute(
      'placeholder',
      'Desde',
    );
  });

  it('el campo reenvía su etiqueta como nombre del panel, y el resto sale del catálogo', async () => {
    const user = userEvent.setup();
    render(
      <BrandMessagesProvider messages={EN}>
        <DatePickerField label="Joined on" />
      </BrandMessagesProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'Open calendar' }));
    expect(screen.getByRole('dialog', { name: 'Joined on' })).toBeInTheDocument();
    expect(screen.getByLabelText('Previous month')).toBeInTheDocument();
  });

  it('los dos desplegables de la hora toman su nombre y su máscara del catálogo', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <TimeField label="Starts at" />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('combobox', { name: 'Hours' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Minutes' })).toBeInTheDocument();
    expect(screen.getByText('HH')).toBeInTheDocument();
    expect(screen.getByText('MM')).toBeInTheDocument();
  });

  it('con hora elegida no se exigen las máscaras: no se pintan', () => {
    const sinMascaras = { ...EN, timeSelect: { ...EN.timeSelect } } as BrandMessages;
    delete (sinMascaras.timeSelect as Partial<BrandMessages['timeSelect']>).maskHours;
    delete (sinMascaras.timeSelect as Partial<BrandMessages['timeSelect']>).maskMinutes;

    expect(() =>
      render(
        <BrandMessagesProvider messages={sinMascaras}>
          <TimeField label="Starts at" value={{ h: 9, m: 30 }} />
        </BrandMessagesProvider>,
      ),
    ).not.toThrow();
  });

  it('sin proveedor y sin prop, la hora revienta nombrando la clave', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<TimeField label="Starts at" />)).toThrow(/timeSelect\./);
  });

  it('fecha y hora en un campo: cada texto sale del espacio de quien lo pinta', async () => {
    const user = userEvent.setup();
    render(
      <BrandMessagesProvider messages={EN}>
        <DateTimeField label="Starts at" />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('combobox', { name: 'Hours' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Open calendar' }));
    expect(screen.getByLabelText('Next month')).toBeInTheDocument();
  });

  it('el `label` y el `errorMessage` del campo NO salen del catálogo', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <TimeField label="Hora de la cita" errorMessage="Elige una hora posterior" />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('group', { name: 'Hora de la cita' })).toBeInTheDocument();
    expect(screen.getByText('Elige una hora posterior')).toBeInTheDocument();
  });
});
