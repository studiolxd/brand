import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { TypingIndicator } from './TypingIndicator';

const meta = {
  title: 'Atoms/TypingIndicator',
  component: TypingIndicator,
  parameters: { layout: 'centered' },
  args: {
    label: 'El asistente está escribiendo…',
  },
} satisfies Meta<typeof TypingIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Los puntos toman su tinta del par oscuro (`surface-dark-dot-color`): blancos sobre prusia. */
export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
};

/** Test: rol, anuncio y tres puntos cuadrados (sin border-radius). */
export const Accesibilidad: Story = {
  name: 'Test — rol, label y puntos cuadrados',
  tags: ['!dev'],
  args: { label: 'Ana está escribiendo…' },
  play: async ({ canvasElement }) => {
    const status = within(canvasElement).getByRole('status');
    await expect(status).toHaveTextContent('Ana está escribiendo…');
    const dots = status.querySelectorAll('.typing-indicator__dot');
    await expect(dots).toHaveLength(3);
    await expect(getComputedStyle(dots[0]).borderRadius).toBe('0px');
  },
};
