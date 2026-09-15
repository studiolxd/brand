import { describe, it, expect, vi, afterEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
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
import { FileUpload } from '../atoms/FileUpload/FileUpload';
import { FileUploadField } from '../molecules/FileUploadField/FileUploadField';
import { AvatarUpload } from '../molecules/AvatarUpload/AvatarUpload';
import { ImageCropDialog } from '../molecules/ImageCropDialog/ImageCropDialog';
import { CalendarPlanner } from '../molecules/CalendarPlanner/CalendarPlanner';
import { CalendarRoster } from '../molecules/CalendarRoster/CalendarRoster';
import { MenuButton } from '../atoms/MenuButton/MenuButton';
import { AppRoot } from '../sections/AppRoot/AppRoot';
import { AppHeader } from '../sections/AppHeader/AppHeader';
import { AppShell } from '../sections/AppShell/AppShell';
import { Sidebar } from '../sections/Sidebar/Sidebar';
import { SidebarNav } from '../molecules/SidebarNav/SidebarNav';
import { SiteNav } from '../molecules/SiteNav/SiteNav';
import { SiteHeader } from '../sections/SiteHeader/SiteHeader';
import { UserMenu } from '../molecules/UserMenu/UserMenu';
import { OrgSwitcher } from '../molecules/OrgSwitcher/OrgSwitcher';
import { Breadcrumb } from '../molecules/Breadcrumb/Breadcrumb';
import { TableOfContents } from '../molecules/TableOfContents/TableOfContents';
import { PrevNextNav } from '../molecules/PrevNextNav/PrevNextNav';
import { PublicPageShell } from '../templates/PublicPageShell/PublicPageShell';
import { OnboardingShell } from '../templates/OnboardingShell/OnboardingShell';

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


describe('las subidas leen del proveedor', () => {
  const soltar = (target: Element, files: File[]) =>
    fireEvent.drop(target, { dataTransfer: { files, types: ['Files'], dropEffect: 'none' } });

  it('la zona de arrastre toma su texto, sus pistas y su lista del catálogo', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <FileUpload aria-label="Attachments" multiple maxSize={2621440} maxFiles={3} progress={40} />
      </BrandMessagesProvider>,
    );

    expect(screen.getByText('Drag files here')).toBeInTheDocument();
    expect(screen.getByText('or click to browse')).toBeInTheDocument();
    expect(screen.getByRole('progressbar', { name: 'Upload progress' })).toBeInTheDocument();
    // Dos veces: en la zona (que va `aria-hidden`) y en la descripción que se
    // le sirve al lector desde el `VisuallyHidden`.
    expect(screen.getAllByText(/up to 3 files/)).toHaveLength(2);
  });

  it('la prop suelta gana también aquí', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <FileUpload aria-label="Attachments" dropzoneLabel="Dépose tes fichiers ici" />
      </BrandMessagesProvider>,
    );

    expect(screen.getByText('Dépose tes fichiers ici')).toBeInTheDocument();
    expect(screen.queryByText('Drag files here')).toBeNull();
  });

  it('sin proveedor y sin prop, la zona revienta nombrando la clave', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<FileUpload aria-label="Attachments" />)).toThrow(/fileUpload\.dropzone/);
  });

  it('una zona sin límites ni progreso no exige los textos que no pinta', () => {
    const sinLosSuyos = {
      ...EN,
      fileUpload: {
        dropzone: EN.fileUpload.dropzone,
        dropzoneHint: EN.fileUpload.dropzoneHint,
      },
    } as unknown as BrandMessages;

    expect(() =>
      render(
        <BrandMessagesProvider messages={sinLosSuyos}>
          <FileUpload aria-label="Attachments" />
        </BrandMessagesProvider>,
      ),
    ).not.toThrow();
  });

  it('el campo reenvía: el `label` es suyo y el cromo de dentro sale del catálogo', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <FileUploadField label="Documentación" maxFiles={2} multiple />
      </BrandMessagesProvider>,
    );

    expect(screen.getByText('Documentación')).toBeInTheDocument();
    expect(screen.getByText('Drag files here')).toBeInTheDocument();
  });

  /**
   * **«2,5 MB» tiene dos mitades**, igual que `dd/mm/aaaa`. La frase que lo
   * envuelve («max. …») es idioma y sale del catálogo; la cifra —el separador
   * decimal, el espacio antes del símbolo— es formato y la escribe
   * `Intl.NumberFormat` con el `locale`. Con el MISMO catálogo inglés, `es-ES`
   * tiene que dar «2,5 MB» y `en-US` «2.5 MB».
   */
  it('el peso lo escribe el locale y la frase el catálogo', () => {
    const { unmount } = render(
      <BrandMessagesProvider messages={EN}>
        <FileUpload aria-label="Attachments" locale="es-ES" maxSize={2621440} />
      </BrandMessagesProvider>,
    );

    expect(screen.getAllByText(/max\. 2,5 MB/).length).toBeGreaterThan(0);
    unmount();

    render(
      <BrandMessagesProvider messages={EN}>
        <FileUpload aria-label="Attachments" locale="en-US" maxSize={2621440} />
      </BrandMessagesProvider>,
    );

    expect(screen.getAllByText(/max\. 2\.5 MB/).length).toBeGreaterThan(0);
  });

  it('el recortador exige el título y las dos acciones, y solo lee su cromo', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <ImageCropDialog
          sourceUrl="blob:fake"
          title="Crop your photo"
          cancelLabel="Discard"
          confirmLabel="Use this image"
          outputMimeType="image/jpeg"
          onConfirm={() => {}}
          onClose={() => {}}
        />
      </BrandMessagesProvider>,
    );

    // El título y las acciones son de la pantalla: no salen del catálogo.
    expect(screen.getByRole('dialog', { name: 'Crop your photo' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Use this image' })).toBeInTheDocument();
    // El aviso de carga sí: es cromo del diálogo.
    expect(screen.getByText('Loading image…')).toBeInTheDocument();
  });

  it('sin proveedor y sin prop, el recortador revienta nombrando la clave', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() =>
      render(
        <ImageCropDialog
          sourceUrl="blob:fake"
          title="Crop"
          cancelLabel="Cancel"
          confirmLabel="Save"
          outputMimeType="image/jpeg"
          onConfirm={() => {}}
          onClose={() => {}}
        />,
      ),
    ).toThrow(/imageCropDialog\.loading/);
  });

  /**
   * El par visible/accesible del botón sale ENTERO del catálogo. Es la única
   * forma de que WCAG 2.5.3 (Label in Name) no se pueda romper al traducir: si
   * el visible viniera del catálogo común y el accesible de la pantalla, los
   * dos lados del contrato vivirían en ficheros distintos.
   */
  it('el botón del avatar saca de una pieza su texto visible y su nombre accesible', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <AvatarUpload name="Ada" subject="the logo" cropTitle="Crop your logo" onChange={() => {}} />
      </BrandMessagesProvider>,
    );

    const boton = screen.getByRole('button', { name: 'Upload the logo' });
    expect(boton).toHaveTextContent('Upload');
    // WCAG 2.5.3: el nombre accesible contiene el visible, en el idioma que sea.
    expect(boton.getAttribute('aria-label')).toContain('Upload');
    expect(screen.getByText('…or drag the image onto the logo')).toBeInTheDocument();
  });

  it('el `subject` y el `cropTitle` NO salen del catálogo: son de esta pantalla', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <AvatarUpload
          name="Ada"
          subject="la foto de perfil"
          cropTitle="Recorta tu foto"
          onChange={() => {}}
        />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('button', { name: 'Upload la foto de perfil' })).toBeInTheDocument();
  });

  /**
   * La lista de formatos necesita la conjunción del idioma: es
   * `Intl.ListFormat`, no un `join(', ')` con una «o» pegada. Antes no había
   * conjunción ninguna («JPEG, PNG, WEBP»).
   */
  it('la lista de formatos usa la conjunción del locale, no una coma pelada', () => {
    const { container, unmount } = render(
      <BrandMessagesProvider messages={EN}>
        <AvatarUpload
          name="Ada"
          locale="en-US"
          maxSize={2621440}
          cropTitle="Crop"
          onChange={() => {}}
        />
      </BrandMessagesProvider>,
    );

    soltar(container.querySelector('.avatar-upload__target')!, [
      new File(['x'], 'contrato.pdf', { type: 'application/pdf' }),
    ]);
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Format not supported. We accept JPEG, PNG, or WEBP.',
    );
    unmount();

    render(
      <BrandMessagesProvider messages={EN}>
        <AvatarUpload
          name="Ada"
          locale="es-ES"
          maxSize={2621440}
          cropTitle="Crop"
          onChange={() => {}}
        />
      </BrandMessagesProvider>,
    );
    // Mismo catálogo inglés, conjunción española: la lista es formato.
    expect(screen.getByText(/JPEG, PNG o WEBP/)).toBeInTheDocument();
  });

  it('sin proveedor y sin prop, el avatar revienta nombrando la clave', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() =>
      render(<AvatarUpload name="Ada" cropTitle="Crop" onChange={() => {}} />),
    ).toThrow(/avatarUpload\./);
  });

  it('el planificador y el cuadrante leen las dos flechas del espacio `calendar`', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <>
          <CalendarPlanner month={new Date(2026, 0, 1)} gridLabel="Planner" />
          <CalendarRoster month={new Date(2026, 0, 1)} rows={[]} />
        </>
      </BrandMessagesProvider>,
    );

    // Dos piezas, un solo espacio: es el mismo texto que el del `Calendar`.
    expect(screen.getAllByLabelText('Previous month')).toHaveLength(2);
    expect(screen.getAllByLabelText('Next month')).toHaveLength(2);
  });

  it('un planificador sin flechas no exige los textos de las flechas', () => {
    const sinLosSuyos = { ...EN, calendar: {} } as unknown as BrandMessages;

    expect(() =>
      render(
        <BrandMessagesProvider messages={sinLosSuyos}>
          <CalendarPlanner month={new Date(2026, 0, 1)} navigable={false} gridLabel="Planner" />
        </BrandMessagesProvider>,
      ),
    ).not.toThrow();
  });

  it('sin proveedor y sin prop, el cuadrante revienta nombrando la clave', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<CalendarRoster month={new Date(2026, 0, 1)} rows={[]} />)).toThrow(
      /calendar\.previousMonth/,
    );
  });
});

/**
 * **Ola 7 — el cromo de aplicación y la navegación.** Es la familia donde la
 * frontera cromo/contenido se ve mejor: el nombre de una región de navegación
 * («Principal», «En esta página», «Migas de pan») vale igual en todas las
 * pantallas y es catálogo; los rótulos que hay DENTRO de esa región —los ítems
 * del menú, los nombres de las organizaciones, los títulos de las páginas del
 * `PrevNextNav`— son de la pantalla y siguen siendo props.
 */
describe('el cromo de navegación lee del proveedor', () => {
  it('el botón de menú dice una cosa cerrado y otra abierto, las dos del catálogo', () => {
    const { rerender } = render(
      <BrandMessagesProvider messages={EN}>
        <MenuButton />
      </BrandMessagesProvider>,
    );
    expect(screen.getByRole('button', { name: 'Navigation menu' })).toBeInTheDocument();

    rerender(
      <BrandMessagesProvider messages={EN}>
        <MenuButton isOpen />
      </BrandMessagesProvider>,
    );
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument();
  });

  it('un botón que nunca se abre no exige el texto de cerrar', () => {
    const sinCerrar = { ...EN, menuButton: { open: 'Navigation menu' } } as unknown as BrandMessages;

    expect(() =>
      render(
        <BrandMessagesProvider messages={sinCerrar}>
          <MenuButton />
        </BrandMessagesProvider>,
      ),
    ).not.toThrow();
  });

  it('la cabecera de aplicación NO repite la clave: su `menuLabel` es un reenvío puro', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <AppHeader />
      </BrandMessagesProvider>,
    );
    // Sin pasar nada, el botón lee `menuButton.open` — no hay una clave
    // `appHeader.menu` que mantener en dos sitios.
    expect(screen.getByRole('button', { name: 'Navigation menu' })).toBeInTheDocument();
  });

  it('los dos saltos al contenido salen del catálogo', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <AppRoot />
      </BrandMessagesProvider>,
    );
    expect(screen.getByRole('link', { name: 'Skip to main content' })).toBeInTheDocument();
  });

  it('el armazón nombra su salto y su barra desde el catálogo', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <AppShell header={<AppHeader />} sidebar={<Sidebar>panel</Sidebar>}>
          contenido
        </AppShell>
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('link', { name: 'Skip to main content' })).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: 'Sidebar' })).toBeInTheDocument();
  });

  it('el asa nombra su control y dice el ancho, los dos del catálogo', () => {
    // El asa solo existe en escritorio y dentro del armazón: jsdom responde
    // `false` a toda media query, así que aquí se le dice que sí.
    vi.spyOn(window, 'matchMedia').mockImplementation(
      (query: string) => ({ matches: true, media: query, onchange: null,
        addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(),
        removeListener: vi.fn(), dispatchEvent: vi.fn() }) as unknown as MediaQueryList,
    );

    render(
      <BrandMessagesProvider messages={EN}>
        <AppShell header={<AppHeader />} sidebar={<Sidebar>panel</Sidebar>} defaultSidebarWidth={280}>
          contenido
        </AppShell>
      </BrandMessagesProvider>,
    );

    const asa = screen.getByRole('separator', { name: 'Sidebar width' });
    expect(asa).toHaveAttribute('aria-valuetext', '280 pixels');
  });

  it('una barra suelta, sin armazón, no tiene asa y no exige sus dos textos', () => {
    const soloNombre = { ...EN, sidebar: { label: 'Sidebar' } } as unknown as BrandMessages;

    expect(() =>
      render(
        <BrandMessagesProvider messages={soloNombre}>
          <Sidebar>panel</Sidebar>
        </BrandMessagesProvider>,
      ),
    ).not.toThrow();
  });

  it('la navegación de la barra nombra su región y marca lo vacío desde el catálogo', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <SidebarNav
          entries={[
            { kind: 'link', id: 'lrs', label: 'LRS', href: '#lrs', empty: true },
            { kind: 'link', id: 'docs', label: 'Docs', href: '#docs' },
          ]}
        />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
    expect(screen.getByText('no docs')).toBeInTheDocument();
    // Y los rótulos de las entradas siguen siendo datos: no se traducen.
    expect(screen.getByText('LRS')).toBeInTheDocument();
  });

  it('una navegación sin entradas vacías no exige la marca de vacío', () => {
    const sinVacio = { ...EN, sidebarNav: { label: 'Main' } } as unknown as BrandMessages;

    expect(() =>
      render(
        <BrandMessagesProvider messages={sinVacio}>
          <SidebarNav entries={[{ kind: 'link', id: 'docs', label: 'Docs', href: '#docs' }]} />
        </BrandMessagesProvider>,
      ),
    ).not.toThrow();
  });

  it('el índice del sitio y la cabecera pública leen sus nombres del catálogo', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <>
          {/* El índice va suelto: dentro del panel cerrado de la cabecera está
              `aria-hidden` y no se puede consultar por rol. */}
          <SiteNav groups={[{ id: 'p', label: 'Product', items: [{ id: 'a', label: 'Pricing', href: '#a' }] }]} />
          {/* Con panel: sin él la cabecera no pinta su botón de menú. */}
          <SiteHeader settings={<button type="button">Theme</button>} />
        </>
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('navigation', { name: 'Site navigation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Studio LXD — go to the home page' })).toBeInTheDocument();
    // El botón de la cabecera pública también es un reenvío puro al MenuButton.
    expect(screen.getByRole('button', { name: 'Navigation menu' })).toBeInTheDocument();
  });

  it('el menú de cuenta y el de organización interpolan su dato en el texto del catálogo', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <>
          <UserMenu name="Ada Lovelace" email="ada@example.com" notificationCount={3} />
          <OrgSwitcher
            current={{ id: 'a', name: 'Acme' }}
            organizations={[{ id: 'a', name: 'Acme' }]}
            onOrgChange={() => {}}
          />
        </>
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('button', { name: "Ada Lovelace's account" })).toBeInTheDocument();
    expect(screen.getByLabelText('3 unread notifications')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Organisation: Acme' })).toBeInTheDocument();
  });

  it('un menú de cuenta sin contador no exige el texto del contador', () => {
    const sinContador = {
      ...EN,
      userMenu: { trigger: (name: string) => `${name}'s account` },
    } as unknown as BrandMessages;

    expect(() =>
      render(
        <BrandMessagesProvider messages={sinContador}>
          <UserMenu name="Ada" email="ada@example.com" />
        </BrandMessagesProvider>,
      ),
    ).not.toThrow();
  });

  it('las migas, el índice de página y el par anterior/siguiente leen del catálogo', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <>
          <Breadcrumb items={[{ label: 'Inicio', href: '#' }, { label: 'Ajustes' }]} />
          <TableOfContents items={[{ id: 'uso', label: 'Uso', level: 2 }]} />
          <PrevNextNav prevHref="#a" nextHref="#b" />
        </>
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'On this page' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Previous' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Next' })).toBeInTheDocument();
    // Los rótulos del rastro y los encabezados son datos de la pantalla.
    expect(screen.getByText('Ajustes')).toBeInTheDocument();
  });

  it('el título del destino gana al rótulo de dirección y lo deja de exigir como nombre', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <PrevNextNav prevHref="#a" prevTitle="Instalación" />
      </BrandMessagesProvider>,
    );

    // Con título, el nombre accesible es el texto visible entero: la dirección
    // sigue saliendo del catálogo, pero como rótulo, no como `aria-label`.
    expect(screen.getByRole('link', { name: /Instalación/ })).toBeInTheDocument();
  });

  it('el marco público nombra su banda de preferencias desde el catálogo', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <PublicPageShell preferences={<button type="button">Theme</button>}>
          contenido
        </PublicPageShell>
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('region', { name: 'Preferences' })).toBeInTheDocument();
  });

  it('un marco público sin banda no exige el texto de la banda', () => {
    const sinBanda = { ...EN, publicPageShell: {} } as unknown as BrandMessages;

    expect(() =>
      render(
        <BrandMessagesProvider messages={sinBanda}>
          <PublicPageShell>contenido</PublicPageShell>
        </BrandMessagesProvider>,
      ),
    ).not.toThrow();
  });

  it('el alta nombra su pie de acciones desde el catálogo, y los botones siguen siendo suyos', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <OnboardingShell primaryAction={<button type="button">Continue</button>}>
          paso
        </OnboardingShell>
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('group', { name: 'Step actions' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
  });

  it('un paso sin acciones no exige el nombre del pie de acciones', () => {
    const sinAcciones = { ...EN, onboardingShell: {} } as unknown as BrandMessages;

    expect(() =>
      render(
        <BrandMessagesProvider messages={sinAcciones}>
          <OnboardingShell>paso</OnboardingShell>
        </BrandMessagesProvider>,
      ),
    ).not.toThrow();
  });

  it('la prop suelta gana al proveedor también en la navegación', () => {
    render(
      <BrandMessagesProvider messages={EN}>
        <Breadcrumb ariaLabel="Ruta de esta sección" items={[{ label: 'Inicio' }]} />
      </BrandMessagesProvider>,
    );

    expect(screen.getByRole('navigation', { name: 'Ruta de esta sección' })).toBeInTheDocument();
  });

  it('sin proveedor y sin prop, cada pieza revienta nombrando su clave', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<Breadcrumb items={[{ label: 'Inicio' }]} />)).toThrow(/breadcrumb\.label/);
    expect(() => render(<TableOfContents items={[{ id: 'a', label: 'Uso', level: 2 }]} />)).toThrow(
      /tableOfContents\.label/,
    );
    expect(() => render(<PrevNextNav prevHref="#a" />)).toThrow(/prevNextNav\.previous/);
    expect(() => render(<MenuButton />)).toThrow(/menuButton\.open/);
    expect(() => render(<AppRoot />)).toThrow(/appRoot\.skipToContent/);
    expect(() =>
      render(<SiteNav groups={[{ id: 'p', label: 'P', items: [] }]} />),
    ).toThrow(/siteNav\.label/);
  });
});
