import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { AppShell, useAppShell } from './AppShell';
import { AppHeader } from '../AppHeader/AppHeader';
import { Sidebar } from '../Sidebar/Sidebar';
import { Logo } from '../../atoms/Logo/Logo';
import { Heading } from '../../atoms/Heading/Heading';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Container } from '../../atoms/Container/Container';
import { SidebarNav } from '../../molecules/SidebarNav/SidebarNav';
import { OrgSwitcher } from '../../molecules/OrgSwitcher/OrgSwitcher';
import { UserMenu } from '../../molecules/UserMenu/UserMenu';
import { NotificationButton } from '../../molecules/NotificationButton/NotificationButton';
import { navEntries, orgs } from './_datos';

const header = (
  <AppHeader
    sidebarId="sidebar"
    notifications={<NotificationButton count={3} />}
    end={<UserMenu compact name="Ana García" email="ana.garcia@studiolxd.com" items={[{ type: 'button', label: 'Cerrar sesión', onClick: () => {}, destructive: true }]} />}
  />
);

const sidebar = (
  <Sidebar id="sidebar" logo={<Logo size="sm" />}>
    <OrgSwitcher block current={orgs[0]} organizations={orgs} onOrgChange={() => {}} />
    <SidebarNav entries={navEntries} defaultValue={['workspace']} />
  </Sidebar>
);

function Estado() {
  const { sidebar, sidebarWidth, isDesktop } = useAppShell();
  return (
    <Paragraph size="small">
      Sidebar: <strong data-testid="estado">{sidebar}</strong>
      {isDesktop && sidebarWidth ? ` · ${sidebarWidth}px` : ''} · {isDesktop ? 'escritorio' : 'móvil'}
    </Paragraph>
  );
}

const contenido = (
  <Container space="lg">
    <Heading level={1} size={7}>Panel</Heading>
    <Paragraph>El botón de menú de la barra pliega y despliega la sidebar; arrastra su borde para cambiarle el ancho, o llévalo por debajo del mínimo para dejarla en rail.</Paragraph>
    <Estado />
  </Container>
);

const meta: Meta<typeof AppShell> = {
  title: 'Sections/AppShell',
  component: AppShell,
  parameters: { layout: 'fullscreen' },
  args: { header, sidebar, children: contenido },
  argTypes: { header: { table: { disable: true } }, sidebar: { table: { disable: true } }, children: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof AppShell>;

/** Escritorio: barra arriba, sidebar desplegada a la izquierda. */
export const PorDefecto: Story = {};

/** Sidebar en rail: solo iconos; los grupos se abren como menú al pulsar o al pasar el ratón. */
export const Rail: Story = { args: { defaultSidebar: 'rail' } };

export const Plegada: Story = { args: { defaultSidebar: 'closed' } };

export const Contrato: Story = {
  name: 'Test — el botón de menú pliega y despliega; el asa redimensiona por teclado',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const boton = canvas.getByRole('button', { name: 'Menú de navegación' });
    await expect(canvas.getByTestId('estado')).toHaveTextContent('open');
    await userEvent.click(boton);
    await expect(canvas.getByTestId('estado')).toHaveTextContent('closed');
    await userEvent.click(boton);
    await expect(canvas.getByTestId('estado')).toHaveTextContent('open');
    const asa = canvas.getByRole('separator', { name: 'Ancho de la barra lateral' });
    asa.focus();
    await userEvent.keyboard('{Home}');
    await expect(canvas.getByTestId('estado')).toHaveTextContent('rail');
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByTestId('estado')).toHaveTextContent('open');
  },
};
