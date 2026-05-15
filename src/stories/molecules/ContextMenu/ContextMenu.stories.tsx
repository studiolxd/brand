import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContextMenu } from './ContextMenu';

const meta = {
  title: 'Molecules/ContextMenu',
  component: ContextMenu,
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseItems = [
  { type: 'button' as const, label: 'Duplicar', onClick: () => alert('Duplicar') },
  { type: 'button' as const, label: 'Editar', onClick: () => alert('Editar') },
  { type: 'separator' as const },
  { type: 'link' as const, label: 'Ver detalle', href: '/proyecto/1' },
  { type: 'separator' as const },
  { type: 'button' as const, label: 'Eliminar', onClick: () => alert('Eliminar'), destructive: true },
];

export const Default: Story = {
  args: {
    items: baseItems,
  },
};

export const ConItemsDeshabilitados: Story = {
  args: {
    items: [
      { type: 'button' as const, label: 'Duplicar', onClick: () => alert('Duplicar') },
      { type: 'button' as const, label: 'Publicar', onClick: () => alert('Publicar'), disabled: true },
      { type: 'separator' as const },
      { type: 'link' as const, label: 'Ver detalle', href: '/proyecto/1' },
      { type: 'link' as const, label: 'Ver archivo', href: '/archivo/1', disabled: true },
    ],
  },
};

export const TriggerVertical: Story = {
  args: {
    items: baseItems,
    triggerOrientation: 'vertical',
  },
};

export const TriggerSm: Story = {
  args: {
    items: baseItems,
    triggerSize: 'sm',
  },
};

export const TriggerLg: Story = {
  args: {
    items: baseItems,
    triggerSize: 'lg',
  },
};

export const AbreArriba: Story = {
  name: 'Abre arriba (side=top)',
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '8rem 4rem 4rem' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    items: baseItems,
    side: 'top',
    align: 'end',
  },
};

export const ConDestructivos: Story = {
  args: {
    items: [
      { type: 'button' as const, label: 'Duplicar', onClick: () => alert('Duplicar') },
      { type: 'link' as const, label: 'Ver detalle', href: '/proyecto/1' },
      { type: 'separator' as const },
      { type: 'button' as const, label: 'Archivar', onClick: () => alert('Archivar'), destructive: true },
      { type: 'link' as const, label: 'Borrar permanentemente', href: '/eliminar/1', destructive: true },
    ],
  },
};

export const ConRenderLink: Story = {
  name: 'Con renderLink personalizado',
  args: {
    items: baseItems,
    renderLink: ({ href, children, className }) => (
      <a href={href} className={className} style={{ fontStyle: 'italic' }}>
        {children} →
      </a>
    ),
  },
};
