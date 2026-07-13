import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    hidden: {
      control: { type: 'boolean' },
      description: 'Oculta el label visualmente pero lo mantiene accesible para lectores de pantalla.',
    },
    children: {
      control: { type: 'text' },
      description: 'Texto del label.',
    },
  },
  args: {
    htmlFor: 'ejemplo',
    children: 'Nombre completo',
    hidden: false,
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Visible: Story = {
};

/** El label está oculto visualmente pero presente en el DOM para lectores de pantalla */
export const Hidden: Story = {
  name: 'Visually hidden',
  args: { hidden: true },
};

/**
 * Test: `className` del consumidor al final, `htmlFor` y `data-*` passthrough, y
 * que `hidden` aplica `visually-hidden` (no el `display:none` nativo).
 */
export const PropPassthrough: Story = {
  name: 'Test — className + htmlFor + hidden',
  render: () => (
    <Label htmlFor="campo" hidden className="extra" data-slot="label">
      Etiqueta
    </Label>
  ),
  play: async ({ canvasElement }) => {
    const label = canvasElement.querySelector('label')!;
    await expect(label).toHaveClass('label', 'visually-hidden', 'extra');
    await expect(label.className.trim().endsWith('extra')).toBe(true);
    await expect(label).toHaveAttribute('for', 'campo');
    await expect(label).toHaveAttribute('data-slot', 'label');
  },
};
