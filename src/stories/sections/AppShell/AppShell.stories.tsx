import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from './AppShell';
import { Sidebar } from '../Sidebar/Sidebar';

const meta: Meta<typeof AppShell> = {
  title: 'Sections/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AppShell>;

const SampleSidebarContent = () => (
  <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <strong style={{ marginBlockEnd: '1rem', display: 'block' }}>Mi App</strong>
    <a href="#">Inicio</a>
    <a href="#">Proyectos</a>
    <a href="#">Configuración</a>
  </nav>
);

const SampleMainContent = ({ onToggle }: { onToggle: () => void }) => (
  <div style={{ padding: '2rem' }}>
    <button onClick={onToggle} type="button" style={{ marginBlockEnd: '1rem' }}>
      Toggle sidebar
    </button>
    <h1>Contenido principal</h1>
    <p>El contenido de la app va aquí. La sidebar empuja este bloque en desktop y se superpone como overlay en móvil.</p>
  </div>
);

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <AppShell
        sidebar={
          <Sidebar open={open} onOpenChange={setOpen}>
            <SampleSidebarContent />
          </Sidebar>
        }
      >
        <SampleMainContent onToggle={() => setOpen((v) => !v)} />
      </AppShell>
    );
  },
};

export const SidebarClosed: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <AppShell
        sidebar={
          <Sidebar open={open} onOpenChange={setOpen}>
            <SampleSidebarContent />
          </Sidebar>
        }
      >
        <SampleMainContent onToggle={() => setOpen((v) => !v)} />
      </AppShell>
    );
  },
};
