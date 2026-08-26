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
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Talla, la del control que acompaña: sm/md 14px, lg 20px.',
    },
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

/** Las tres tallas: la etiqueta sigue a la del control (los fields la propagan). */
export const Tallas: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
      <Label htmlFor="sm" size="sm">Talla sm</Label>
      <Label htmlFor="md" size="md">Talla md</Label>
      <Label htmlFor="lg" size="lg">Talla lg</Label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const [sm, md, lg] = Array.from(canvasElement.querySelectorAll('label'));
    await expect(sm).toHaveClass('label--sm');
    await expect(md).not.toHaveClass('label--md');
    await expect(lg).toHaveClass('label--lg');
    await expect(parseFloat(getComputedStyle(lg).fontSize)).toBeGreaterThan(parseFloat(getComputedStyle(md).fontSize));
  },
};

/** Oculta visualmente, presente en el DOM para lectores de pantalla. */
export const Oculta: Story = {
  args: { hidden: true },
};

/**
 * Test: `className` del consumidor al final, `htmlFor` y `data-*` passthrough, y
 * que `hidden` aplica `visually-hidden` (no el `display:none` nativo).
 */
export const PropPassthrough: Story = {
  name: 'Test — className + htmlFor + hidden',
  tags: ['!dev'],
  render: () => (
    <Label htmlFor="campo" hidden className="extra" data-testid="etiqueta">
      Etiqueta
    </Label>
  ),
  play: async ({ canvasElement }) => {
    const label = canvasElement.querySelector('label')!;
    await expect(label).toHaveClass('label', 'visually-hidden', 'extra');
    await expect(label.className.trim().endsWith('extra')).toBe(true);
    await expect(label).toHaveAttribute('for', 'campo');
    await expect(label).toHaveAttribute('data-testid', 'etiqueta');
  },
};
