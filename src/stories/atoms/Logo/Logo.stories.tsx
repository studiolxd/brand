import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Logo } from './Logo';
import { Container } from '../Container/Container';

const meta: Meta<typeof Logo> = {
  title: 'Atoms/Logo',
  component: Logo,
  parameters: { layout: 'padded' },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Alto del logotipo: una talla de componente.',
    },
    className: { table: { disable: true } },
  },
};
export default meta;

type Story = StoryObj<typeof Logo>;

/** Talla `md`, la de una cabecera. */
export const PorDefecto: Story = {};

/** Las cinco tallas, alineadas por la base. */
export const Tallas: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--spacing-6)', flexWrap: 'wrap' }}>
      <Logo size="sm" />
      <Logo size="md" />
      <Logo size="lg" />
      <Logo size="xl" />
      <Logo size="xxl" />
    </div>
  ),
};

export const Talla: Story = {
  name: 'Test — mide su talla y hereda la superficie',
  tags: ['!dev'],
  render: () => (
    <>
      <Logo size="sm" data-testid="sm" />
      <Container surface="dark" data-testid="oscura"><Logo /></Container>
    </>
  ),
  play: async ({ canvasElement }) => {
    const sm = canvasElement.querySelector('.logo--sm')!;
    await expect(Math.round(sm.getBoundingClientRect().height)).toBe(32);
    const oscuro = canvasElement.querySelector('[data-testid="oscura"] .logo')!;
    const claro = getComputedStyle(oscuro).getPropertyValue('--color-text-on-dark').trim();
    const toRgb = (hex: string) => { const v = hex.replace('#', ''); return `rgb(${parseInt(v.slice(0, 2), 16)}, ${parseInt(v.slice(2, 4), 16)}, ${parseInt(v.slice(4, 6), 16)})`; };
    await expect(getComputedStyle(oscuro).color).toBe(toRgb(claro));
  },
};
