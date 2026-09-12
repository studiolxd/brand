import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from '../../atoms/Button/Button';
import { Link } from '../../atoms/Link/Link';
import { Table, TableHead, TableBody, TableFooter, TableHeader, TableRow, TableCell } from './Table';

const meta: Meta<typeof Table> = {
  title: 'Molecules/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

/**
 * Test: subpartes como **named exports** (RSC-safe), idénticas a las del namespace
 * (`Table.Head === TableHead`), y renderizan los elementos correctos.
 */
export const NamedExports: Story = {
  name: 'Test — named exports (RSC-safe)',
  tags: ['!dev'],
  render: () => (
    <Table caption="Named exports">
      <TableHead>
        <TableRow><TableHeader>H</TableHeader></TableRow>
      </TableHead>
      <TableBody>
        <TableRow><TableCell>C</TableCell></TableRow>
      </TableBody>
      <TableFooter>
        <TableRow><TableCell>F</TableCell></TableRow>
      </TableFooter>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    // el namespace sigue exponiendo las subpartes (contexto cliente)
    await expect(Table.Head).toBeDefined();
    await expect(Table.Body).toBeDefined();
    await expect(Table.Footer).toBeDefined();
    await expect(Table.Header).toBeDefined();
    await expect(Table.Row).toBeDefined();
    await expect(Table.Cell).toBeDefined();
    // los named exports (usados en el render) producen los elementos correctos
    await expect(canvasElement.querySelector('thead')).not.toBeNull();
    await expect(canvasElement.querySelector('tbody')).not.toBeNull();
    await expect(canvasElement.querySelector('tfoot')).not.toBeNull();
  },
};

/**
 * Test: `data-*`/`aria-*` + `className` aterrizan en `<table>`, `data-*` en `<tbody>`
 * (Head/Body/Footer), y sin `caption` no se renderiza `<caption>`.
 */
export const PropPassthrough: Story = {
  name: 'Test — rest-spread + caption opcional',
  tags: ['!dev'],
  render: () => (
    <Table aria-label="Proyectos" data-origen="table" className="extra">
      <Table.Body data-origen="tbody">
        <Table.Row>
          <Table.Cell>Uno</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const table = canvasElement.querySelector('table')!;
    await expect(table).toHaveClass('table', 'extra');
    await expect(table.className.trim().endsWith('extra')).toBe(true);
    await expect(table).toHaveAttribute('data-origen', 'table');
    await expect(table).toHaveAttribute('aria-label', 'Proyectos');
    // sin caption → no se renderiza <caption>
    await expect(canvasElement.querySelector('caption')).toBeNull();
    // rest en la sección Body
    await expect(canvasElement.querySelector('tbody')).toHaveAttribute('data-origen', 'tbody');
    // sanity: el contenido sigue ahí
    await expect(within(canvasElement).getByText('Uno')).toBeInTheDocument();
  },
};

const PROYECTOS = [
  { nombre: 'Virtualización Rise Cofidis', cliente: 'Cofidis', fecha: '15/05/2026', estado: 'Activo' },
  { nombre: 'Rediseño portal B2B', cliente: 'Mapfre', fecha: '10/04/2026', estado: 'En revisión' },
  { nombre: 'App móvil inversiones', cliente: 'Caixabank', fecha: '01/03/2026', estado: 'Entregado' },
  { nombre: 'Dashboard analítica', cliente: 'Telefónica', fecha: '20/02/2026', estado: 'Activo' },
];

export const Default: Story = {
  render: () => (
    <Table caption="Listado de proyectos">
      <Table.Head>
        <Table.Row>
          <Table.Header>Nombre</Table.Header>
          <Table.Header>Cliente</Table.Header>
          <Table.Header>Fecha</Table.Header>
          <Table.Header>Estado</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {PROYECTOS.map((p) => (
          <Table.Row key={p.nombre}>
            <Table.Cell>{p.nombre}</Table.Cell>
            <Table.Cell>{p.cliente}</Table.Cell>
            <Table.Cell>{p.fecha}</Table.Cell>
            <Table.Cell>{p.estado}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

type SortDir = 'asc' | 'desc' | false;

export const ConSorting: Story = {
  render: () => {
    const [sortCol, setSortCol] = useState<'nombre' | 'cliente' | 'fecha' | null>(null);
    const [sortDir, setSortDir] = useState<SortDir>(false);

    function handleSort(col: 'nombre' | 'cliente' | 'fecha') {
      if (sortCol === col) {
        setSortDir((prev) => (prev === 'asc' ? 'desc' : prev === 'desc' ? false : 'asc'));
        if (sortDir === 'desc') setSortCol(null);
      } else {
        setSortCol(col);
        setSortDir('asc');
      }
    }

    function getSorted(col: 'nombre' | 'cliente' | 'fecha'): SortDir {
      return sortCol === col ? sortDir : false;
    }

    return (
      <Table caption="Listado de proyectos con ordenación">
        <Table.Head>
          <Table.Row>
            <Table.Header sortable sorted={getSorted('nombre')} onSort={() => handleSort('nombre')}>
              Nombre
            </Table.Header>
            <Table.Header sortable sorted={getSorted('cliente')} onSort={() => handleSort('cliente')}>
              Cliente
            </Table.Header>
            <Table.Header sortable sorted={getSorted('fecha')} onSort={() => handleSort('fecha')}>
              Fecha
            </Table.Header>
            <Table.Header>Estado</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {PROYECTOS.map((p) => (
            <Table.Row key={p.nombre}>
              <Table.Cell>{p.nombre}</Table.Cell>
              <Table.Cell>{p.cliente}</Table.Cell>
              <Table.Cell>{p.fecha}</Table.Cell>
              <Table.Cell>{p.estado}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
};

export const ConFilasInteractivas: Story = {
  render: () => {
    const [seleccionado, setSeleccionado] = useState<string | null>(null);

    return (
      <div>
        {seleccionado && (
          <p style={{ marginBottom: '1rem', fontFamily: 'var(--font-family-sans)', fontSize: '0.875rem' }}>
            Proyecto seleccionado: <strong>{seleccionado}</strong>
          </p>
        )}
        <Table caption="Listado de proyectos — filas interactivas">
          <Table.Head>
            <Table.Row>
              <Table.Header>Nombre</Table.Header>
              <Table.Header>Cliente</Table.Header>
              <Table.Header>Fecha</Table.Header>
              <Table.Header>Estado</Table.Header>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {PROYECTOS.map((p) => (
              <Table.Row
                key={p.nombre}
                selected={seleccionado === p.nombre}
                onClick={() => setSeleccionado(p.nombre)}
              >
                <Table.Cell>{p.nombre}</Table.Cell>
                <Table.Cell>{p.cliente}</Table.Cell>
                <Table.Cell>{p.fecha}</Table.Cell>
                <Table.Cell>{p.estado}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  },
};

export const ConFooterYColspan: Story = {
  name: 'Con Footer y colSpan',
  render: () => (
    <Table caption="Resumen de proyectos con totales">
      <Table.Head>
        <Table.Row>
          <Table.Header>Nombre</Table.Header>
          <Table.Header>Cliente</Table.Header>
          <Table.Header>Fecha</Table.Header>
          <Table.Header>Estado</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {PROYECTOS.map((p) => (
          <Table.Row key={p.nombre}>
            <Table.Header scope="row">{p.nombre}</Table.Header>
            <Table.Cell>{p.cliente}</Table.Cell>
            <Table.Cell>{p.fecha}</Table.Cell>
            <Table.Cell>{p.estado}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={3}>Total proyectos</Table.Cell>
          <Table.Cell>{PROYECTOS.length}</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  ),
};

export const Sm: Story = {
  render: () => (
    <Table caption="Listado compacto de proyectos" size="sm">
      <Table.Head>
        <Table.Row>
          <Table.Header>Nombre</Table.Header>
          <Table.Header>Cliente</Table.Header>
          <Table.Header>Fecha</Table.Header>
          <Table.Header>Estado</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {PROYECTOS.map((p) => (
          <Table.Row key={p.nombre}>
            <Table.Cell>{p.nombre}</Table.Cell>
            <Table.Cell>{p.cliente}</Table.Cell>
            <Table.Cell>{p.fecha}</Table.Cell>
            <Table.Cell>{p.estado}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

/**
 * Test: el texto accesible del estado de ordenación usa el castellano por defecto
 * y se sustituye cuando el consumidor lo pasa traducido.
 */
export const EtiquetasOrdenacion: Story = {
  name: 'Test — etiquetas de ordenación',
  tags: ['!dev'],
  render: () => (
    <>
      <div data-testid="default">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader sortable>Nombre</TableHeader>
              <TableHeader sortable sorted="asc">Fecha</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow><TableCell>a</TableCell><TableCell>b</TableCell></TableRow>
          </TableBody>
        </Table>
      </div>
      <div data-testid="traducido">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader sortable sortableLabel="Activate sorting">Name</TableHeader>
              <TableHeader sortable sorted="asc" sortedAscLabel="Sorted ascending">Date</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow><TableCell>a</TableCell><TableCell>b</TableCell></TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  ),
  play: async ({ canvasElement }) => {
    const def = within(canvasElement.querySelector('[data-testid="default"]') as HTMLElement);
    await expect(def.getByText('Activar ordenación')).toBeInTheDocument();
    await expect(def.getByText('Ordenado ascendente')).toBeInTheDocument();

    const en = within(canvasElement.querySelector('[data-testid="traducido"]') as HTMLElement);
    await expect(en.getByText('Activate sorting')).toBeInTheDocument();
    await expect(en.getByText('Sorted ascending')).toBeInTheDocument();
    await expect(en.queryByText('Activar ordenación')).toBeNull();
  },
};

export const ConColumnaDeAcciones: Story = {
  name: 'Con columna de acciones',
  render: () => (
    <Table caption="Listado de proyectos con acciones">
      <Table.Head>
        <Table.Row>
          <Table.Header>Nombre</Table.Header>
          <Table.Header>Cliente</Table.Header>
          <Table.Header actions />
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {PROYECTOS.map((p) => (
          <Table.Row key={p.nombre}>
            <Table.Cell>{p.nombre}</Table.Cell>
            <Table.Cell>{p.cliente}</Table.Cell>
            <Table.Cell actions>
              <Button variant="ghost" size="sm">Editar</Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

/**
 * `Table.Cell actions` evita que el contenido de la columna de acciones se
 * parta en dos líneas: la cabecera (`width: 1px`) encoge la columna a
 * min-content, y un enlace de dos palabras como «Ver recibo» tiene sobra de
 * ancho para partirse ahí sin el `white-space: nowrap` de este modificador.
 */
export const ColumnaDeAccionesSinPartir: Story = {
  name: 'Columna de acciones sin partir',
  render: () => (
    <Table caption="Listado de facturas con acciones">
      <Table.Head>
        <Table.Row>
          <Table.Header>Número</Table.Header>
          <Table.Header>Cliente</Table.Header>
          <Table.Header actions />
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {PROYECTOS.map((p) => (
          <Table.Row key={p.nombre}>
            <Table.Cell>{p.fecha}</Table.Cell>
            <Table.Cell>{p.cliente}</Table.Cell>
            <Table.Cell actions>
              <Link href="#">Ver recibo</Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

const COLUMNAS_ANCHAS = [
  { nombre: 'Virtualización Rise Cofidis', cliente: 'Cofidis', fecha: '15/05/2026', responsable: 'Ada Lovelace', departamento: 'Ingeniería', ubicacion: 'Madrid', estado: 'Activo' },
  { nombre: 'Rediseño portal B2B', cliente: 'Mapfre', fecha: '10/04/2026', responsable: 'Grace Hopper', departamento: 'Producto', ubicacion: 'Barcelona', estado: 'En revisión' },
  { nombre: 'App móvil inversiones', cliente: 'Caixabank', fecha: '01/03/2026', responsable: 'Alan Turing', departamento: 'Ingeniería', ubicacion: 'Madrid', estado: 'Entregado' },
];

/**
 * `sticky="end"` en `Table.Header` y en la `Table.Cell` equivalente de cada
 * fila pega la columna de acciones al borde final cuando la tabla desborda su
 * contenedor: se queda alcanzable con scroll horizontal en vez de caer fuera
 * del recorte del wrapper. Para las tablas escritas a mano (sin `DataTable`),
 * que hace lo mismo con `meta: { sticky: 'end' }`.
 *
 * Lo que la distingue del contenido que pasa por debajo es su fondo opaco, y
 * nada más: no lleva filete de inicio.
 */
export const ColumnaDeAccionesPegajosa: Story = {
  name: 'Columna de acciones pegajosa',
  render: () => (
    <div style={{ maxWidth: '480px' }}>
      <Table caption="Listado de proyectos con acciones pegajosas">
        <Table.Head>
          <Table.Row>
            <Table.Header>Nombre</Table.Header>
            <Table.Header>Cliente</Table.Header>
            <Table.Header>Fecha</Table.Header>
            <Table.Header>Responsable</Table.Header>
            <Table.Header>Departamento</Table.Header>
            <Table.Header>Ubicación</Table.Header>
            <Table.Header>Estado</Table.Header>
            <Table.Header actions sticky="end" />
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {COLUMNAS_ANCHAS.map((p) => (
            <Table.Row key={p.nombre}>
              <Table.Cell>{p.nombre}</Table.Cell>
              <Table.Cell>{p.cliente}</Table.Cell>
              <Table.Cell>{p.fecha}</Table.Cell>
              <Table.Cell>{p.responsable}</Table.Cell>
              <Table.Cell>{p.departamento}</Table.Cell>
              <Table.Cell>{p.ubicacion}</Table.Cell>
              <Table.Cell>{p.estado}</Table.Cell>
              <Table.Cell sticky="end">
                <Button variant="ghost" size="sm">Editar</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  ),
};

/** Test: con scroll a 0, la celda pegajosa está dentro del viewport del wrapper. */
export const ContratoColumnaPegajosa: Story = {
  name: 'Test — la columna pegajosa queda dentro del viewport',
  tags: ['!dev'],
  render: () => (
    <div style={{ maxWidth: '480px' }}>
      <Table caption="Listado de proyectos con acciones pegajosas">
        <Table.Head>
          <Table.Row>
            <Table.Header>Nombre</Table.Header>
            <Table.Header>Cliente</Table.Header>
            <Table.Header>Fecha</Table.Header>
            <Table.Header>Responsable</Table.Header>
            <Table.Header>Departamento</Table.Header>
            <Table.Header>Ubicación</Table.Header>
            <Table.Header>Estado</Table.Header>
            <Table.Header actions sticky="end" />
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {COLUMNAS_ANCHAS.map((p) => (
            <Table.Row key={p.nombre}>
              <Table.Cell>{p.nombre}</Table.Cell>
              <Table.Cell>{p.cliente}</Table.Cell>
              <Table.Cell>{p.fecha}</Table.Cell>
              <Table.Cell>{p.responsable}</Table.Cell>
              <Table.Cell>{p.departamento}</Table.Cell>
              <Table.Cell>{p.ubicacion}</Table.Cell>
              <Table.Cell>{p.estado}</Table.Cell>
              <Table.Cell sticky="end">
                <Button variant="ghost" size="sm">Editar</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const wrapper = canvasElement.querySelector('.table__wrapper') as HTMLElement;
    await expect(wrapper).not.toBeNull();
    const table = wrapper.querySelector('table') as HTMLElement;
    await expect(table.scrollWidth).toBeGreaterThan(wrapper.clientWidth);

    wrapper.scrollLeft = 0;
    const celdaAcciones = wrapper.querySelector('.table__cell--sticky') as HTMLElement;
    await expect(celdaAcciones).not.toBeNull();
    const wrapperRect = wrapper.getBoundingClientRect();
    const celdaRect = celdaAcciones.getBoundingClientRect();
    await expect(celdaRect.right).toBeLessThanOrEqual(wrapperRect.right + 1);
    await expect(celdaRect.left).toBeGreaterThanOrEqual(wrapperRect.left);

    // Sin filete de inicio: la columna se distingue solo por su fondo opaco.
    const estilo = getComputedStyle(celdaAcciones);
    await expect(estilo.boxShadow).toBe('none');
  },
};

/**
 * Test: `Table.Cell actions` no deja partir su contenido en dos líneas aunque
 * la columna, encogida a min-content por la cabecera, le sobre ancho.
 */
export const ContratoColumnaDeAccionesSinPartir: Story = {
  name: 'Test — la columna de acciones no parte su contenido',
  tags: ['!dev'],
  render: () => (
    <Table caption="Listado de facturas con acciones">
      <Table.Head>
        <Table.Row>
          <Table.Header>Número</Table.Header>
          <Table.Header>Cliente</Table.Header>
          <Table.Header actions />
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>0001</Table.Cell>
          <Table.Cell>Cofidis</Table.Cell>
          <Table.Cell actions>
            <Link href="#">Ver recibo</Link>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const celda = canvasElement.querySelector('.table__cell--actions') as HTMLElement;
    await expect(celda).not.toBeNull();
    await expect(getComputedStyle(celda).whiteSpace).toBe('nowrap');

    const enlace = canvas.getByRole('link', { name: 'Ver recibo' });
    // Una sola línea: el `top` del texto no varía entre el inicio y el final.
    const rango = document.createRange();
    rango.selectNodeContents(enlace);
    const rects = Array.from(rango.getClientRects());
    await expect(rects).toHaveLength(1);
  },
};

/**
 * Test: la cabecera ordenable es un `<button>` dentro del `<th>` — el estado
 * vive en el `aria-sort` de la celda y el nombre accesible del botón es solo el
 * rótulo de la columna. Enter y Espacio activan la ordenación.
 */
export const CabeceraOrdenableEsBoton: Story = {
  name: 'Test — cabecera ordenable es un botón',
  tags: ['!dev'],
  render: () => {
    const [veces, setVeces] = useState(0);
    return (
      <>
        <p data-testid="veces">{veces}</p>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader sortable sorted="asc" onSort={() => setVeces((n) => n + 1)}>
                Nombre
              </TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow><TableCell>a</TableCell></TableRow>
          </TableBody>
        </Table>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // el estado se anuncia por el th, no por el nombre del botón
    const th = canvasElement.querySelector('th')!;
    await expect(th).toHaveAttribute('aria-sort', 'ascending');
    await expect(th).not.toHaveAttribute('tabindex');

    const boton = canvas.getByRole('button', { name: 'Nombre' });
    await expect(boton).toHaveClass('table__header-content');

    // activación nativa con teclado: Enter y Espacio
    boton.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    await expect(canvas.getByTestId('veces')).toHaveTextContent('2');
  },
};
