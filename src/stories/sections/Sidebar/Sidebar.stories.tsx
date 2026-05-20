import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from '../AppShell/AppShell';
import { Sidebar } from './Sidebar';
import { Logo } from '../../atoms/Logo/Logo';

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

export const Expanded: Story = {
  render: () => (
    <AppShell sidebar={<Sidebar logo={<Logo height={24} />}><SampleContent /></Sidebar>}>
      <div style={{ padding: '2rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Dashboard</h1>
      </div>
    </AppShell>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <AppShell defaultCollapsed sidebar={<Sidebar logo={<Logo height={24} />}><SampleContent /></Sidebar>}>
      <div style={{ padding: '2rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Dashboard</h1>
      </div>
    </AppShell>
  ),
};
