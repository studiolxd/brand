import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, screen, waitFor } from 'storybook/test';
import { AppLauncher } from './AppLauncher';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixtureEn as EN } from '../../../../.storybook/brandMessagesFixtureEn';
import type { LauncherApp } from './AppLauncher';

const meta: Meta<typeof AppLauncher> = {
  title: 'Molecules/AppLauncher',
  component: AppLauncher,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof AppLauncher>;

const demoApps: LauncherApp[] = [
  { id: 'lmsmarketplace', name: 'LMS Marketplace', url: 'https://lmsmarketplace.slxd.app' },
  { id: 'bricks', name: 'Bricks', url: 'https://bricks.slxd.app' },
  { id: 'tender', name: 'Tender', url: 'https://tender.slxd.app', isNew: true },
  { id: 'localizia', name: 'Localizia', url: 'https://localizia.slxd.app' },
  { id: 'lrs', name: 'LRS', url: 'https://lrs.slxd.app' },
  { id: 'sharescorm', name: 'ShareScorm', url: 'https://sharescorm.slxd.app' },
  { id: 'moodlemcp', name: 'MoodleMCP', url: 'https://moodlemcp.slxd.app' },
  { id: 'aipricing', name: 'AI Pricing', url: 'https://aipricing.slxd.app', isNew: true },
];

/**
 * El nombre accesible del disparador, el título del diálogo y la marca de app
 * nueva son cromo y salen del catálogo que el Storybook monta en
 * `preview.tsx`. Aquí solo queda lo que no es catálogo (`trigger`) o lo que
 * una story concreta quiere anular.
 */
const labels = {};

/** Lo que dice el catálogo castellano para el disparador sin rótulo. */
const NOMBRE_DISPARADOR = 'Abrir el lanzador de aplicaciones';

/**
 * `presentation` por defecto es `'modal'` desde v35: diálogo centrado, como
 * `CommandPalette`. Quien quiera el panel flotante de antes lo pide con
 * `presentation="popover"` (ver más abajo).
 */
export const Default: Story = {
  args: {
    apps: demoApps,
    labels,
    defaultOpen: true,
  },
};

export const ConAppActual: Story = {
  args: {
    apps: demoApps,
    labels,
    currentAppId: 'bricks',
    defaultOpen: true,
  },
};

export const PocasApps: Story = {
  args: {
    apps: demoApps.slice(0, 3),
    labels,
    defaultOpen: true,
  },
};

/**
 * La suite anuncia productos antes de abrirlos: se ven en su sitio pero
 * **apagados** —sin enlace, sin foco y con la tinta de un control
 * deshabilitado— y con un distintivo que dice en qué estado están. El texto
 * del distintivo (`badge`) llega ya traducido desde la aplicación: es
 * contenido de la suite, no cromo del lanzador.
 *
 * `badge` vale también para una app viva («Beta» aquí), y es lo que
 * generaliza `isNew` —el mismo distintivo con el texto del catálogo—, que
 * sigue funcionando (Tender).
 */
export const ConProductosProximamente: Story = {
  name: 'Con productos próximamente',
  args: {
    apps: [
      ...demoApps.slice(0, 3),
      { id: 'atlas', name: 'Atlas', url: 'https://atlas.slxd.app', disabled: true, badge: 'Próximamente' },
      { id: 'forja', name: 'Forja', url: 'https://forja.slxd.app', disabled: true, badge: 'Próximamente' },
      { id: 'lrs', name: 'LRS', url: 'https://lrs.slxd.app', badge: 'Beta' },
    ],
    labels,
    defaultOpen: true,
  },
};

export const Cerrado: Story = {
  args: {
    apps: demoApps,
    labels,
  },
};

export const ConTexto: Story = {
  name: 'Con texto',
  args: {
    apps: demoApps,
    labels: { ...labels, trigger: 'Aplicaciones' },
    defaultOpen: true,
  },
};

export const ConTitulo: Story = {
  name: 'Con título propio',
  args: {
    apps: demoApps,
    labels: { ...labels, title: 'Suite SLXD' },
    defaultOpen: true,
  },
};

/**
 * `presentation="popover"`: el panel flotante anclado al disparador, el
 * comportamiento del componente hasta v34 — se mantiene para quien lo pida
 * explícitamente.
 */
export const ComoPopover: Story = {
  name: 'presentation="popover"',
  args: {
    apps: demoApps,
    labels,
    presentation: 'popover',
    defaultOpen: true,
  },
};

export const ComoPopoverConTexto: Story = {
  name: 'presentation="popover" — con texto',
  args: {
    apps: demoApps,
    labels: { ...labels, trigger: 'Aplicaciones' },
    presentation: 'popover',
  },
};

export const TestContrato: Story = {
  name: 'Test — abrir, apps y app actual (modal)',
  tags: ['!dev'],
  args: {
    apps: demoApps.slice(0, 3),
    labels: { ...labels, title: 'Aplicaciones' },
    currentAppId: 'bricks',
  },
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', { name: NOMBRE_DISPARADOR });
    await expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');

    await userEvent.click(trigger);
    const dialog = await screen.findByRole('dialog', { name: 'Aplicaciones' });
    const links = within(dialog).getAllByRole('link');
    await expect(links).toHaveLength(3);

    const current = within(dialog).getByRole('link', { name: /Bricks/ });
    await expect(current).toHaveAttribute('aria-current', 'page');

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  },
};

export const TestContratoConTexto: Story = {
  name: 'Test — disparador con texto (modal)',
  tags: ['!dev'],
  args: {
    apps: demoApps.slice(0, 3),
    labels: { ...labels, trigger: 'Aplicaciones' },
  },
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', { name: 'Aplicaciones' });
    await expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    // El nombre accesible es el texto visible: no hay `aria-label` duplicado.
    await expect(trigger).not.toHaveAttribute('aria-label');

    await userEvent.click(trigger);
    await expect(await screen.findByRole('dialog')).toBeInTheDocument();
  },
};

/**
 * Sin `play`: `userEvent.hover` no dispara el `:hover` nativo del navegador
 * (no hay movimiento real del puntero) y leer la hoja de estilos desde el
 * `play` resultó frágil entre el dev server local y el build de producción
 * que usa Chromatic (CSS separado por chunk, minificado, `<link>` con
 * `crossorigin`). El estado de hover se revisa visualmente en la captura de
 * Chromatic de esta story, no con una aserción.
 */
export const HoverDisparador: Story = {
  name: 'Hover — disparador',
  args: {
    apps: demoApps,
    labels,
  },
};

/** Igual que la anterior: revisión visual del hover en la captura de Chromatic, sin `play`. */
export const HoverBadge: Story = {
  name: 'Hover — Tag «nuevo»',
  args: {
    apps: demoApps.filter((app) => app.isNew),
    labels,
    defaultOpen: true,
  },
};

export const TestContratoPopover: Story = {
  name: 'Test — abrir, apps y app actual (popover)',
  tags: ['!dev'],
  args: {
    apps: demoApps.slice(0, 3),
    labels,
    currentAppId: 'bricks',
    presentation: 'popover',
  },
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', { name: NOMBRE_DISPARADOR });
    await expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');

    await userEvent.click(trigger);
    const list = await screen.findByRole('list');
    const links = within(list).getAllByRole('link');
    await expect(links).toHaveLength(3);

    const current = within(list).getByRole('link', { name: /Bricks/ });
    await expect(current).toHaveAttribute('aria-current', 'page');

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('list')).not.toBeInTheDocument());
  },
};

export const TestProximamente: Story = {
  name: 'Test — baldosa apagada con distintivo',
  tags: ['!dev'],
  args: {
    apps: [
      { id: 'alfa', name: 'Alfa', url: 'https://alfa.slxd.app' },
      { id: 'atlas', name: 'Atlas', url: 'https://atlas.slxd.app', disabled: true, badge: 'Próximamente' },
    ],
    labels: { ...labels, title: 'Aplicaciones' },
    defaultOpen: true,
  },
  play: async () => {
    const dialog = await screen.findByRole('dialog', { name: 'Aplicaciones' });

    // La apagada no es un `<a>`: no hay `href` que seguir.
    const apagada = within(dialog).getByRole('link', { name: /Atlas/ });
    await expect(apagada.tagName).toBe('SPAN');
    await expect(apagada).not.toHaveAttribute('href');
    await expect(apagada).toHaveAttribute('aria-disabled', 'true');
    await expect(within(dialog).getByText('Próximamente')).toBeVisible();

    // Y el tabulador no se detiene en ella: el foco salta de la viva al aspa
    // del diálogo sin pasar por la apagada.
    const viva = within(dialog).getByRole('link', { name: /Alfa/ });
    viva.focus();
    await userEvent.tab();
    await expect(document.activeElement).not.toBe(apagada);
  },
};

/**
 * El lanzador dice tres cosas por su cuenta —cómo se llama su botón, cómo se
 * titula el diálogo y qué marca una app nueva— y las tres son cromo: el
 * lanzador es el mismo mueble en todas las apps de la suite. Los nombres de
 * las aplicaciones son contenido y viajan en `apps`, así que con el catálogo
 * en inglés el diálogo se llama «Applications» y las apps siguen llamándose
 * como se llaman.
 */
export const TextosDelProveedor: Story = {
  name: 'Textos desde el proveedor (otro idioma)',
  args: { apps: demoApps, defaultOpen: true },
  render: (args) => (
    <BrandMessagesProvider messages={EN}>
      <AppLauncher {...args} />
    </BrandMessagesProvider>
  ),
};

/**
 * Test: sin `labels`, el cromo del lanzador sale del catálogo. El disparador se
 * comprueba **antes** de abrir: con el diálogo abierto, Base UI deja el resto
 * de la página inerte y el botón sale del árbol de accesibilidad.
 */
export const ContratoProveedor: Story = {
  name: 'Test — el cromo del lanzador lee del proveedor',
  tags: ['!dev'],
  args: { apps: demoApps },
  render: (args) => (
    <BrandMessagesProvider messages={EN}>
      <AppLauncher {...args} />
    </BrandMessagesProvider>
  ),
  play: async ({ canvasElement }) => {
    const trigger = await within(canvasElement).findByRole('button', {
      name: 'Open the app launcher',
    });
    await userEvent.click(trigger);

    const dialog = await screen.findByRole('dialog', { name: 'Applications' });
    await expect(within(dialog).getAllByText('New').length).toBeGreaterThan(0);
    await expect(within(dialog).getByRole('link', { name: /Bricks/ })).toBeInTheDocument();
  },
};
