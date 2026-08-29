import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { Sidebar, SidebarGroup, SidebarGroupContent, SidebarSeparator } from './Sidebar';
import { AppShellContext } from '../AppShell/AppShellContext';
import { Logo } from '../../atoms/Logo/Logo';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { SidebarNav } from '../../molecules/SidebarNav/SidebarNav';
import { OrgSwitcher } from '../../molecules/OrgSwitcher/OrgSwitcher';
import { navEntries, orgs } from '../AppShell/_datos';

const meta: Meta<typeof Sidebar> = {
  title: 'Sections/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  args: {
    logo: <a href="#" aria-label="Studio LXD"><Logo size="sm" /></a>,
    children: (
      <>
        <OrgSwitcher block current={orgs[0]} organizations={orgs} onOrgChange={() => {}} />
        <SidebarNav entries={navEntries} defaultValue={['workspace']} />
      </>
    ),
  },
  argTypes: { children: { table: { disable: true } }, logo: { table: { disable: true } }, footer: { table: { disable: true } } },
  render: (args) => <div style={{ blockSize: '100dvh', display: 'flex' }}><Sidebar {...args} /></div>,
};
export default meta;
type Story = StoryObj<typeof Sidebar>;

/** Desplegada: logo, organización y navegación. Sin `AppShell`, el modo lo fija `mode`. */
export const Desplegada: Story = {};

/** Rail: cada entrada es un icono; los grupos se abren como menú (pulsar o pasar el ratón). */
export const Rail: Story = { args: { mode: 'rail' } };

/** Secciones propias del producto (un árbol de carpetas) con separador. */
export const ConSecciones: Story = {
  args: {
    children: (
      <>
        <OrgSwitcher block current={orgs[0]} organizations={orgs} onOrgChange={() => {}} />
        <SidebarNav entries={navEntries} defaultValue={['workspace']} />
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            <Paragraph size="small">Carpetas del producto</Paragraph>
          </SidebarGroupContent>
        </SidebarGroup>
      </>
    ),
    footer: <Paragraph size="small">v1.0</Paragraph>,
  },
};

export const Contrato: Story = {
  name: 'Test — en rail los grupos son menús con la portada como primer enlace',
  tags: ['!dev'],
  args: { mode: 'rail' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const aside = canvas.getByRole('complementary', { name: 'Barra lateral' });
    await expect(aside).toHaveAttribute('data-state', 'rail');
    await userEvent.click(within(aside).getByRole('button', { name: 'Espacio de trabajo' }));
    const menu = await within(document.body).findByRole('menu');
    const enlaces = within(menu).getAllByRole('menuitem');
    await expect(enlaces[0]).toHaveTextContent('Espacio de trabajo');
    await expect(enlaces[0]).toHaveAttribute('href', '#espacio');
    await expect(enlaces).toHaveLength(4);
    await userEvent.keyboard('{Escape}');
  },
};

/**
 * Reproduce el pintado inicial en servidor: el shell existe pero aún no ha
 * medido el ancho real (`sidebarWidth: 0`, el valor antes de que el `AppShell`
 * lo calcule). El asa de redimensión es focusable, así que WAI-ARIA exige
 * `aria-valuenow` en todo momento — con `0 || undefined` este caso lo perdía
 * (axe: `aria-required-attr`, crítico, visto en 7 apps en e2e real).
 */
export const Contrato2: Story = {
  name: 'Test — el asa de redimensión siempre expone aria-valuenow',
  tags: ['!dev'],
  decorators: [
    (Story) => (
      <AppShellContext.Provider
        value={{
          sidebar: 'open',
          setSidebar: () => {},
          sidebarWidth: 0,
          setSidebarWidth: () => {},
          toggleSidebar: () => {},
          closeSidebar: () => {},
          isDesktop: true,
        }}
      >
        <Story />
      </AppShellContext.Provider>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const resizer = canvas.getByRole('separator', { name: 'Ancho de la barra lateral' });
    await expect(resizer).toHaveAttribute('aria-valuenow', '0');
  },
};
