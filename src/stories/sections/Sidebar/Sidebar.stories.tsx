import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { Sidebar, SidebarGroup, SidebarGroupContent, SidebarSeparator } from './Sidebar';
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
    logo: <Logo size="sm" />,
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
