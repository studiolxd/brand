import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
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

/** Tallas: los ítems siguen al disparador (32/40/48), como las opciones del Select. */
export const Tallas: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-5)' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Menu
          key={size}
          size={size}
          defaultOpen
          trigger={<Button variant="outline" size={size}>Talla {size}</Button>}
          items={[
            { type: 'radio', value: 'light', label: 'Claro' },
            { type: 'radio', value: 'dark', label: 'Oscuro' },
          ]}
          value="light"
        />
      ))}
    </div>
  ),
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

/** Test: el ítem bajo el puntero se rellena — la excepción de las listas de opciones. */
export const ContratoResaltado: Story = {
  name: 'Test — el ítem resaltado se rellena',
  tags: ['!dev'],
  args: {
    trigger: <Button variant="outline">Opciones</Button>,
    items: [
      { type: 'button', label: 'Duplicar', onClick: () => {} },
      { type: 'button', label: 'Publicar', onClick: () => {} },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Opciones' }));

    // El panel va en un portal, fuera del canvas de la story.
    const body = within(document.body);
    const duplicar = await body.findByRole('menuitem', { name: 'Duplicar' });
    const publicar = await body.findByRole('menuitem', { name: 'Publicar' });

    // En reposo no hay relleno.
    await expect(getComputedStyle(duplicar).backgroundColor).toBe('rgba(0, 0, 0, 0)');

    await userEvent.hover(duplicar);
    await expect(duplicar).toHaveAttribute('data-highlighted');

    // Bajo el puntero sí: el relleno, y solo en ese ítem.
    await waitFor(async () => {
      const resaltado = getComputedStyle(duplicar);
      await expect(resaltado.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
      await expect(resaltado.backgroundColor)
        .not.toBe(getComputedStyle(publicar).backgroundColor);
      // Y el relleno sustituye al anillo, no lo acompaña.
      await expect(resaltado.outlineStyle).toBe('none');
    });
  },
};
