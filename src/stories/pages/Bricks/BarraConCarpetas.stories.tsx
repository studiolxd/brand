import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { AppShell } from '../../sections/AppShell/AppShell';
import { AppHeader } from '../../sections/AppHeader/AppHeader';
import { Sidebar, SidebarGroup, SidebarGroupContent, SidebarSeparator, useSidebar } from '../../sections/Sidebar/Sidebar';
import { Logo } from '../../atoms/Logo/Logo';
import { Icon } from '../../atoms/Icon/Icon';
import { Button } from '../../atoms/Button/Button';
import { Heading } from '../../atoms/Heading/Heading';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Container } from '../../atoms/Container/Container';
import { Menu, type MenuItem } from '../../molecules/Menu/Menu';
import { OrgSwitcher } from '../../molecules/OrgSwitcher/OrgSwitcher';
import { SidebarNav } from '../../molecules/SidebarNav/SidebarNav';
import { UserMenu } from '../../molecules/UserMenu/UserMenu';
import { NotificationButton } from '../../molecules/NotificationButton/NotificationButton';
import { TreeView, type TreeViewNode } from '../../molecules/TreeView/TreeView';
import { orgs } from '../../sections/AppShell/_datos';

/* ── Datos ──────────────────────────────────────────────────────────── */

const carpeta = <Icon name="folder" size="sm" />;
const carpetaAbierta = <Icon name="folder-open" size="sm" />;

/** El menú de tres puntos de una carpeta. `abierto` lo deja desplegado para la story. */
function AccionesDeCarpeta({ nombre, abierto }: { nombre: string; abierto?: boolean }) {
  const items: MenuItem[] = [
    { type: 'button', label: 'Nueva carpeta', icon: <Icon name="folder" size="sm" />, onClick: () => {} },
    { type: 'button', label: 'Renombrar', icon: <Icon name="settings" size="sm" />, onClick: () => {} },
    { type: 'button', label: 'Mover a…', icon: <Icon name="package" size="sm" />, onClick: () => {} },
    { type: 'separator' },
    { type: 'button', label: 'Eliminar', icon: <Icon name="trash" size="sm" />, destructive: true, onClick: () => {} },
  ];
  return (
    <Menu
      items={items}
      align="end"
      size="sm"
      defaultOpen={abierto}
      trigger={
        <Button variant="ghost" size="sm" iconOnly aria-label={`Acciones de ${nombre}`}>
          <Icon name="dots" size="sm" />
        </Button>
      }
    />
  );
}

/**
 * El árbol de carpetas. `arrastrando` simula lo que la aplicación marcaría con
 * dnd-kit mientras se arrastra un contenido: la carpeta que puede recibirlo y
 * la que no.
 */
function carpetas({ arrastrando = false, menuAbiertoEn }: { arrastrando?: boolean; menuAbiertoEn?: string } = {}): TreeViewNode[] {
  const acciones = (id: string, nombre: string) => (
    <AccionesDeCarpeta nombre={nombre} abierto={menuAbiertoEn === id} />
  );
  return [
    {
      id: 'raiz',
      label: 'Todos los contenidos',
      // La raíz no es un nivel extra: es el primer nodo, al mismo nivel que el
      // resto. Se distingue por la marca —una bandeja, no una carpeta—.
      icon: <Icon name="inbox" size="sm" />,
      iconExpanded: <Icon name="inbox" size="sm" />,
      actions: acciones('raiz', 'Todos los contenidos'),
      children: [
        {
          id: 'formacion',
          label: 'Formación continua',
          icon: carpeta,
          iconExpanded: carpetaAbierta,
          actions: acciones('formacion', 'Formación continua'),
          children: [
            {
              id: 'prl',
              label: 'Prevención de riesgos',
              icon: carpeta,
              iconExpanded: carpetaAbierta,
              // Se está arrastrando algo que ya vive aquí: prohibido soltarlo.
              dropDisabled: arrastrando,
              actions: acciones('prl', 'Prevención de riesgos'),
              children: [
                {
                  id: 'prl-oficina',
                  label: 'Riesgos en oficina y teletrabajo',
                  icon: carpeta,
                  iconExpanded: carpetaAbierta,
                  actions: acciones('prl-oficina', 'Riesgos en oficina y teletrabajo'),
                },
              ],
            },
            {
              id: 'datos',
              label: 'Protección de datos',
              icon: carpeta,
              iconExpanded: carpetaAbierta,
              dropTarget: arrastrando,
              actions: acciones('datos', 'Protección de datos'),
            },
          ],
        },
        {
          id: 'onboarding',
          label: 'Onboarding',
          icon: carpeta,
          iconExpanded: carpetaAbierta,
          actions: acciones('onboarding', 'Onboarding'),
        },
      ],
    },
  ];
}

/** La papelera es su propio árbol, con su propia raíz. */
function papelera(conContenido: boolean): TreeViewNode[] {
  return [
    {
      id: 'papelera',
      label: 'Papelera',
      icon: <Icon name="trash" size="sm" />,
      iconExpanded: <Icon name="trash" size="sm" />,
      actions: <AccionesDeCarpeta nombre="Papelera" />,
      children: conContenido
        ? [
            { id: 'papelera-2024', label: 'Campañas 2024', icon: carpeta, iconExpanded: carpetaAbierta, actions: <AccionesDeCarpeta nombre="Campañas 2024" /> },
            { id: 'papelera-borradores', label: 'Borradores', icon: carpeta, iconExpanded: carpetaAbierta, actions: <AccionesDeCarpeta nombre="Borradores" /> },
          ]
        : undefined,
    },
  ];
}

/* ── La sección de la barra ─────────────────────────────────────────── */

/**
 * Un grupo de la barra con un árbol dentro. En rail se pliega a su icono, como
 * los grupos de `SidebarNav`: el árbol pasa a ser el menú que abre el icono.
 *
 * No es un grupo de `SidebarNav` porque un grupo de `SidebarNav` solo admite
 * enlaces (`items: SidebarNavItem[]`), no contenido arbitrario — ver la nota de
 * entrega. Mientras tanto, `SidebarGroup` + `SidebarGroupContent` de la propia
 * `Sidebar`, que es la API que sí acepta un bloque de producto.
 */
function GrupoArbol({
  titulo,
  items,
  selected,
  defaultExpanded,
  icono,
}: {
  titulo: string;
  items: TreeViewNode[];
  selected?: string;
  defaultExpanded?: string[];
  icono: React.ReactNode;
}) {
  const { rail } = useSidebar();

  if (rail) {
    // En rail solo caben iconos: el árbol se ofrece como menú, igual que hace
    // `SidebarNav` con sus grupos.
    const aplanar = (nodes: TreeViewNode[], nivel = 0): MenuItem[] =>
      nodes.flatMap((n) => [
        { type: 'button' as const, label: `${'· '.repeat(nivel)}${String(n.label)}`, onClick: () => {} },
        ...(n.children ? aplanar(n.children, nivel + 1) : []),
      ]);
    return (
      <SidebarGroup>
        <Menu
          items={[{ type: 'label', label: titulo }, { type: 'separator' }, ...aplanar(items)]}
          side="right"
          align="start"
          openOnHover
          trigger={
            <Button variant="ghost" iconOnly aria-label={titulo}>
              {icono}
            </Button>
          }
        />
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <Paragraph size="small">{titulo}</Paragraph>
        <TreeView
          label={titulo}
          items={items}
          selected={selected}
          onSelectedChange={() => {}}
          defaultExpanded={defaultExpanded}
        />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

/* ── La página ──────────────────────────────────────────────────────── */

const header = (
  <AppHeader
    sidebarId="sidebar-bricks"
    notifications={<NotificationButton count={2} />}
    end={<UserMenu compact name="Ana García" email="ana.garcia@studiolxd.com" items={[{ type: 'button', label: 'Cerrar sesión', onClick: () => {}, destructive: true }]} />}
  />
);

const contenido = (
  <Container space="lg">
    <Heading level={1} size={7}>Protección de datos</Heading>
    <Paragraph>
      La carpeta elegida en la barra manda el listado de contenidos. Arrastrar un
      contenido sobre una carpeta lo mueve: mientras dura el arrastre, la barra
      dice cuál puede recibirlo y cuál no.
    </Paragraph>
  </Container>
);

function Pagina({
  arrastrando,
  menuAbiertoEn,
  papeleraConContenido = true,
}: {
  arrastrando?: boolean;
  menuAbiertoEn?: string;
  papeleraConContenido?: boolean;
}) {
  return (
    <Sidebar id="sidebar-bricks" logo={<Logo size="sm" />}>
      <OrgSwitcher block current={orgs[0]} organizations={orgs} onOrgChange={() => {}} />
      <SidebarNav
        entries={[
          { kind: 'link', id: 'contents', label: 'Contenidos', href: '#contenidos', active: true, icon: <Icon name="library" size="sm" /> },
          { kind: 'link', id: 'designs', label: 'Diseños instruccionales', href: '#disenos', icon: <Icon name="layout-kanban" size="sm" /> },
        ]}
      />
      <SidebarSeparator />
      <GrupoArbol
        titulo="Carpetas"
        icono={<Icon name="folder" size="md" />}
        items={carpetas({ arrastrando, menuAbiertoEn })}
        selected="datos"
        defaultExpanded={['raiz', 'formacion', 'prl']}
      />
      <SidebarSeparator />
      <GrupoArbol
        titulo="Papelera"
        icono={<Icon name="trash" size="md" />}
        items={papelera(papeleraConContenido)}
        defaultExpanded={papeleraConContenido ? ['papelera'] : []}
      />
    </Sidebar>
  );
}

const meta: Meta<typeof AppShell> = {
  title: 'Pages/Bricks — barra lateral con carpetas',
  component: AppShell,
  parameters: { layout: 'fullscreen' },
  argTypes: { header: { table: { disable: true } }, sidebar: { table: { disable: true } }, children: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof AppShell>;

/**
 * La barra desplegada: el grupo «Carpetas» con la raíz «Todos los contenidos» y
 * tres niveles por debajo, «Protección de datos» elegida (solo negrita, sin
 * color de marca) y el grupo «Papelera» con su propio árbol.
 */
export const Desplegada: Story = {
  args: { header, children: contenido, sidebar: <Pagina /> },
};

/**
 * El menú de acciones de una carpeta, desplegado. Abrirlo no cambia lo elegido
 * en el árbol: «Protección de datos» sigue siéndolo.
 */
export const ConElMenuDeAccionesAbierto: Story = {
  name: 'Con el menú de acciones abierto',
  args: { header, children: contenido, sidebar: <Pagina menuAbiertoEn="onboarding" /> },
};

/**
 * Mientras se arrastra un contenido: «Protección de datos» puede recibirlo
 * (relleno del acento activo y borde discontinuo) y «Prevención de riesgos» no
 * (atenuada, cursor prohibido). El arrastre lo lleva la aplicación; aquí va
 * simulado con las props `dropTarget` y `dropDisabled`.
 */
export const ArrastrandoUnContenido: Story = {
  name: 'Arrastrando un contenido',
  args: { header, children: contenido, sidebar: <Pagina arrastrando /> },
};

/** La papelera vacía: su raíz sin hijos, sin chevron que abrir. */
export const PapeleraVacia: Story = {
  name: 'Papelera vacía',
  args: { header, children: contenido, sidebar: <Pagina papeleraConContenido={false} /> },
};

/** En rail cada grupo se pliega a su icono y el árbol se ofrece como menú. */
export const EnRail: Story = {
  name: 'En rail',
  args: { header, children: contenido, sidebar: <Pagina />, defaultSidebar: 'rail' },
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { header, children: contenido, sidebar: <Pagina arrastrando /> },
};

export const TestBarra: Story = {
  name: 'Test — los dos árboles conviven en la barra',
  tags: ['!dev'],
  args: { header, children: contenido, sidebar: <Pagina arrastrando /> },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const arbol = canvas.getByRole('tree', { name: 'Carpetas' });
    const basura = canvas.getByRole('tree', { name: 'Papelera' });
    await expect(arbol).toBeInTheDocument();
    await expect(basura).toBeInTheDocument();

    // La raíz es el primer nodo del árbol, no un nivel extra.
    const raiz = within(arbol).getByRole('treeitem', { name: 'Todos los contenidos' });
    await expect(raiz).toHaveAttribute('aria-level', '1');

    // La carpeta elegida y los dos estados de arrastre.
    await expect(within(arbol).getByRole('treeitem', { name: 'Protección de datos' })).toHaveAttribute('aria-selected', 'true');
    await expect(within(arbol).getByRole('treeitem', { name: 'Protección de datos' })).toHaveAttribute('data-drop', 'target');
    await expect(within(arbol).getByRole('treeitem', { name: 'Prevención de riesgos' })).toHaveAttribute('data-drop', 'disabled');
  },
};
