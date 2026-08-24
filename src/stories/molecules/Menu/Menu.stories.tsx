import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { Menu } from './Menu';

const meta = {
  title: 'Molecules/Menu',
  component: Menu,
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Trigger a medida',
  args: {
    trigger: (
      <Button variant="outline">
        <Icon name="download" size="sm" /> Exportar
      </Button>
    ),
    align: 'end',
    items: [
      { type: 'link', label: 'CSV', href: '/export?format=csv' },
      { type: 'link', label: 'Excel', href: '/export?format=xlsx' },
    ],
  },
};

export const TriggerDeIcono: Story = {
  name: 'Trigger de icono',
  args: {
    trigger: (
      <Button variant="ghost" iconOnly aria-label="Cambiar de idioma">
        <Icon name="settings" size="sm" />
      </Button>
    ),
    align: 'end',
    items: [
      { type: 'button', label: 'English', onClick: () => {} },
      { type: 'button', label: 'Español', onClick: () => {} },
      { type: 'separator' },
      { type: 'button', label: 'Français', onClick: () => {} },
    ],
  },
};

export const ConRadio: Story = {
  name: 'Elección exclusiva (radio)',
  args: {
    trigger: <Button variant="ghost" iconOnly aria-label="Tema"><Icon name="sun" size="sm" /></Button>,
    align: 'end',
    value: 'system',
    items: [
      { type: 'label', label: 'Tema' },
      { type: 'radio', value: 'light', label: 'Claro', icon: <Icon name="sun" size="sm" /> },
      { type: 'radio', value: 'dark', label: 'Oscuro', icon: <Icon name="moon" size="sm" /> },
      { type: 'radio', value: 'system', label: 'Sistema', icon: <Icon name="device-desktop" size="sm" /> },
    ],
  },
  render: (args) => {
     
    const [value, setValue] = useState('system');
    return <Menu {...args} value={value} onValueChange={setValue} />;
  },
};

export const Mixto: Story = {
  name: 'Radio + acciones + destructivo',
  args: {
    trigger: <Button variant="outline">Opciones</Button>,
    value: 'grid',
    items: [
      { type: 'label', label: 'Vista' },
      { type: 'radio', value: 'grid', label: 'Cuadrícula' },
      { type: 'radio', value: 'list', label: 'Lista' },
      { type: 'separator' },
      { type: 'button', label: 'Duplicar', onClick: () => {} },
      { type: 'button', label: 'Publicar', onClick: () => {}, disabled: true },
      { type: 'separator' },
      { type: 'button', label: 'Eliminar', onClick: () => {}, destructive: true },
    ],
  },
  render: (args) => {
     
    const [value, setValue] = useState('grid');
    return <Menu {...args} value={value} onValueChange={setValue} />;
  },
};
