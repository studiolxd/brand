import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import type { ColumnDef } from '@tanstack/react-table';
import { PageIntro } from './PageIntro';
import { Button } from '../../atoms/Button/Button';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Stack } from '../../atoms/Stack/Stack';
import { Tag } from '../../atoms/Tag/Tag';
import { FilterBar } from '../FilterBar/FilterBar';
import { SelectField } from '../SelectField/SelectField';
import { DataTable } from '../../organisms/DataTable/DataTable';

const meta: Meta<typeof PageIntro> = {
  title: 'Molecules/PageIntro',
  component: PageIntro,
  parameters: { layout: 'padded' },
  args: { title: '¿Olvidaste tu contraseña?', description: 'Ingresa tu correo y te enviaremos un enlace para restablecerla.' },
  argTypes: { className: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof PageIntro>;

/** Título y frase. */
export const ConFrase: Story = {};

/** Solo el título: el aire lo sigue poniendo el molde de fuera. */
export const SoloTitulo: Story = { args: { title: 'Inicia sesión', description: undefined } };

/** Más texto bajo la frase: `children`, con el mismo aire. */
export const ConMasTexto: Story = {
  args: { title: 'Tienes una invitación', description: 'ana@studiolxd.com te ha invitado a unirte a Studio LXD.', children: <Paragraph>Te unirás como miembro.</Paragraph> },
};

/**
 * La acción principal de la página, a la derecha del título. En pantalla
 * estrecha cae bajo el título, a todo el ancho.
 */
export const ConAccion: Story = {
  args: {
    title: 'Miembros',
    description: undefined,
    actions: <Button>Invitar miembro</Button>,
  },
};

/** Dos acciones: la principal y una alternativa (`outline`), en ese orden. */
export const ConDosAcciones: Story = {
  args: {
    title: 'Webhooks',
    description: undefined,
    actions: (
      <>
        <Button>Crear webhook</Button>
        <Button variant="outline">Ver registro</Button>
      </>
    ),
  },
};

/**
 * Las mismas dos acciones a 375 px: bajo el título, **cada una a todo el ancho
 * y una por línea**, en el orden del JSX. No hace falta pasarles `block`.
 */
export const ConDosAccionesMovil: Story = {
  name: 'Con dos acciones (móvil)',
  globals: { viewport: { value: { width: '375px', height: '720px' } } },
  args: {
    title: 'Webhooks',
    description: undefined,
    actions: (
      <>
        <Button>Crear webhook</Button>
        <Button variant="outline">Ver registro</Button>
      </>
    ),
  },
};

/** Con entradilla: la frase queda bajo la fila, a ancho completo. */
export const ConEntradillaYAccion: Story = {
  args: {
    title: 'Organizaciones',
    description: 'Cada organización tiene sus propios miembros, su facturación y sus aplicaciones.',
    actions: <Button>Nueva organización</Button>,
  },
};

/**
 * Dentro de un `Stack` sin `align` (el valor por defecto, `start`), la
 * cabecera sigue ocupando todo el ancho y las acciones quedan al margen
 * derecho: `PageIntro` no depende de que el padre lo estire.
 */
export const DentroDeUnStack: Story = {
  name: 'Dentro de un Stack',
  render: () => (
    <Stack>
      <PageIntro
        title="Miembros"
        description="Quién entra en la organización y con qué permisos."
        actions={<Button>Invitar miembro</Button>}
      />
      <Paragraph>Resto del contenido de la página.</Paragraph>
    </Stack>
  ),
};

/**
 * Cabecera de una sección dentro de la página: `level={2}` y `as="div"` cuando
 * la sección ya vive dentro de otro `header`.
 */
export const CabeceraDeSeccion: Story = {
  args: {
    title: 'Sesiones activas',
    level: 2,
    description: 'Los dispositivos desde los que has entrado en los últimos 30 días.',
    actions: <Button variant="outline">Cerrar todas</Button>,
  },
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: {
    title: 'Miembros',
    description: 'Quién entra en la organización y con qué permisos.',
    actions: <Button>Invitar miembro</Button>,
  },
};

type Member = { id: string; name: string; email: string; role: string };

const columns: ColumnDef<Member, unknown>[] = [
  { accessorKey: 'name', header: 'Nombre' },
  { accessorKey: 'email', header: 'Correo' },
  { accessorKey: 'role', header: 'Rol', cell: ({ row }) => <Tag variant="neutral">{row.original.role}</Tag> },
];

const members: Member[] = [
  'Ada Lovelace', 'Grace Hopper', 'Alan Turing', 'Katherine Johnson', 'Barbara Liskov',
].map((name, index) => ({
  id: String(index),
  name,
  email: `${name.toLowerCase().replace(/\s+/g, '.')}@studiolxd.com`,
  role: index === 0 ? 'propietaria' : 'miembro',
}));

const MemberTable = DataTable<Member, unknown>;

/**
 * Los tres niveles de acción de una página de listado: la principal en la
 * cabecera, las de los filtros en la `FilterBar` y las de la tabla en el
 * `toolbar` del `DataTable`.
 */
export const PaginaCompleta: Story = {
  name: 'Página de listado',
  parameters: { layout: 'padded' },
  render: () => (
    <Stack gap="lg">
      <PageIntro
        title="Miembros"
        description="Quién entra en la organización y con qué permisos."
        actions={<Button>Invitar miembro</Button>}
      />
      <FilterBar actions={<Button variant="outline">Limpiar filtros</Button>}>
        <SelectField label="Rol" options={[{ value: 'all', label: 'Todos' }, { value: 'owner', label: 'Propietaria' }]} defaultValue="all" />
        <SelectField label="Estado" options={[{ value: 'all', label: 'Todos' }, { value: 'active', label: 'Activo' }]} defaultValue="all" />
      </FilterBar>
      <MemberTable
        columns={columns}
        data={members}
        ariaLabel="Miembros de la organización"
        searchColumnId="name"
        toolbar={<Button variant="outline">Exportar</Button>}
      />
    </Stack>
  ),
};

export const Contrato: Story = {
  name: 'Test — header con h1 y frase opcional',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const header = canvasElement.querySelector('header.page-intro')!;
    await expect(header).toBeInTheDocument();
    await expect(canvas.getByRole('heading', { level: 1 })).toHaveTextContent('¿Olvidaste tu contraseña?');
    const lead = canvas.getByText(/Ingresa tu correo/);
    await expect(lead).toHaveClass('paragraph--large');
  },
};

export const ContratoSinAcciones: Story = {
  name: 'Test — sin acciones el marcado no cambia',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const header = canvasElement.querySelector('header.page-intro')!;
    // El título es hijo directo de la cabecera: sin `actions` no hay fila.
    await expect(header.querySelector('.page-intro__row')).toBeNull();
    await expect(header.querySelector('.page-intro__actions')).toBeNull();
    await expect(header.firstElementChild).toHaveClass('heading');
    // Y el aire bajo el título lo sigue poniendo el propio título, en em.
    const heading = header.querySelector('.heading')!;
    const { fontSize, marginBlockEnd } = getComputedStyle(heading);
    await expect(parseFloat(marginBlockEnd)).toBeCloseTo(parseFloat(fontSize) / 2, 1);
  },
};

export const ContratoFila: Story = {
  name: 'Test — las acciones van después del título',
  tags: ['!dev'],
  args: { title: 'Miembros', description: 'Quién entra en la organización.', actions: <Button>Invitar miembro</Button> },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const row = canvasElement.querySelector('.page-intro__row')!;
    await expect(row).toBeInTheDocument();
    const heading = canvas.getByRole('heading', { level: 1 });
    const actions = canvasElement.querySelector('.page-intro__actions')!;
    // Orden en el DOM: primero el título, después las acciones.
    await expect(row.children[0]).toBe(heading);
    await expect(row.children[1]).toBe(actions);
    await expect(actions).toContainElement(canvas.getByRole('button', { name: 'Invitar miembro' }));
    // La entradilla queda fuera de la fila, a ancho completo.
    await expect(row.contains(canvas.getByText(/Quién entra/))).toBe(false);
  },
};

export const ContratoAccionesEnBloque: Story = {
  name: 'Test — bajo md cada acción ocupa el ancho de la ranura',
  tags: ['!dev'],
  globals: { viewport: { value: 'mobile1' } },
  args: {
    title: 'Webhooks',
    description: undefined,
    actions: (
      <>
        <Button>Crear webhook</Button>
        <Button variant="outline">Ver registro</Button>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const acciones = canvasElement.querySelector('.page-intro__actions') as HTMLElement;
    const botones = Array.from(acciones.querySelectorAll<HTMLElement>('.button'));
    await expect(botones).toHaveLength(2);

    // La ranura se estira a todo el ancho de la fila…
    const fila = canvasElement.querySelector('.page-intro__row') as HTMLElement;
    await expect(acciones.getBoundingClientRect().width)
      .toBeCloseTo(fila.getBoundingClientRect().width, 0);

    // …y cada botón, al ancho de la ranura: en bloque, sin pasarles `block`.
    const anchoRanura = acciones.getBoundingClientRect().width;
    for (const boton of botones) {
      await expect(boton).not.toHaveClass('button--block');
      await expect(boton.getBoundingClientRect().width).toBeCloseTo(anchoRanura, 0);
    }

    // Una por línea, en el orden del JSX.
    await expect(botones[1].getBoundingClientRect().top)
      .toBeGreaterThanOrEqual(botones[0].getBoundingClientRect().bottom);
  },
};

export const ContratoAccionesEnEscritorio: Story = {
  name: 'Test — en escritorio cada acción mide su contenido',
  tags: ['!dev'],
  args: {
    title: 'Webhooks',
    description: undefined,
    actions: (
      <>
        <Button>Crear webhook</Button>
        <Button variant="outline">Ver registro</Button>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const acciones = canvasElement.querySelector('.page-intro__actions') as HTMLElement;
    const botones = Array.from(acciones.querySelectorAll<HTMLElement>('.button'));

    // En la misma línea, y ninguno a ancho de la ranura: miden su etiqueta.
    await expect(botones[0].getBoundingClientRect().top)
      .toBeCloseTo(botones[1].getBoundingClientRect().top, 0);
    const anchoRanura = acciones.getBoundingClientRect().width;
    for (const boton of botones) {
      await expect(boton.getBoundingClientRect().width).toBeLessThan(anchoRanura);
    }

    // Y la ranura, pegada al margen final de la fila.
    const fila = canvasElement.querySelector('.page-intro__row') as HTMLElement;
    await expect(acciones.getBoundingClientRect().right)
      .toBeCloseTo(fila.getBoundingClientRect().right, 0);
  },
};

export const ContratoElemento: Story = {
  name: 'Test — as="div" y nivel de sección',
  tags: ['!dev'],
  args: { title: 'Sesiones activas', level: 2, as: 'div', description: undefined, actions: <Button variant="outline">Cerrar todas</Button> },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvasElement.querySelector('header.page-intro')).toBeNull();
    await expect(canvasElement.querySelector('div.page-intro')).toBeInTheDocument();
    await expect(canvas.getByRole('heading', { level: 2 })).toHaveTextContent('Sesiones activas');
  },
};
