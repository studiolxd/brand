import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar } from './Sidebar';

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

export const Open: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ display: 'flex', minHeight: '100dvh' }}>
        <Sidebar open={open} onOpenChange={setOpen}>
          <SampleContent />
        </Sidebar>
        <div style={{ flex: 1, padding: '2rem' }}>
          <button onClick={() => setOpen((v) => !v)} type="button">
            Toggle sidebar
          </button>
        </div>
      </div>
    );
  },
};

export const Closed: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ display: 'flex', minHeight: '100dvh' }}>
        <Sidebar open={open} onOpenChange={setOpen}>
          <SampleContent />
        </Sidebar>
        <div style={{ flex: 1, padding: '2rem' }}>
          <button onClick={() => setOpen((v) => !v)} type="button">
            Toggle sidebar (cerrada)
          </button>
        </div>
      </div>
    );
  },
};
