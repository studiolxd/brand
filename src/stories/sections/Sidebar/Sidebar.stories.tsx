import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from '../AppShell/AppShell';
import { Sidebar } from './Sidebar';
import { Logo } from '../../atoms/Logo/Logo';
import { UserMenu } from '../../molecules/UserMenu/UserMenu';

const meta: Meta<typeof Sidebar> = {
  title: 'Sections/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const SampleContent = () => (
  <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <strong style={{ marginBlockEnd: '1rem', display: 'block' }}>Navegación</strong>
    <a href="#">Inicio</a>
    <a href="#">Proyectos</a>
    <a href="#">Equipo</a>
    <a href="#">Configuración</a>
  </nav>
);

const sampleUserMenu = (
  <UserMenu
    name="Ana García"
    email="ana.garcia@studiolxd.com"
    items={[{ type: 'button' as const, label: 'Cerrar sesión', onClick: () => {}, destructive: true }]}
  />
);

const renderShell = () => (
  <AppShell
    sidebar={
      <Sidebar logo={<Logo height={24} />} footer={sampleUserMenu}>
        <SampleContent />
      </Sidebar>
    }
  >
    <div style={{ padding: '2rem' }}>
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Dashboard</h1>
      <p>Rail plegado por defecto; pasa el ratón por encima (o tabula dentro) para expandir.</p>
    </div>
  </AppShell>
);

export const Rail: Story = {
  render: renderShell,
};

/* Estado expandido congelado vía pseudo-estado :hover del addon */
export const ExpandedOnHover: Story = {
  parameters: {
    pseudo: { hover: ['.sidebar'] },
  },
  render: renderShell,
};
