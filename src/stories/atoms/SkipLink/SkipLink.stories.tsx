import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkipLink } from './SkipLink';

const meta: Meta<typeof SkipLink> = {
  title: 'Atoms/SkipLink',
  component: SkipLink,
  parameters: {
    layout: 'padded',
  },
  args: {
    href: '#main-content',
    children: 'Saltar al contenido principal',
  },
};

export default meta;
type Story = StoryObj<typeof SkipLink>;

/**
 * El enlace es invisible por defecto. Navega hasta él con Tab para ver cómo aparece.
 * Usa la story Focus visible para previsualizar el estado revelado.
 */
export const Default: Story = {};

/** Estado visible al recibir foco por teclado. */
export const FocusVisible: Story = {
  name: 'Focus visible',
  parameters: { pseudo: { focusVisible: true } },
};
