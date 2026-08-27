import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Una línea',
  args: {},
  decorators: [(Story) => <div style={{ maxWidth: '24rem' }}><Story /></div>],
};

export const Parrafo: Story = {
  name: 'Párrafo',
  args: {},
  render: () => (
    <div style={{ display: 'grid', gap: '0.5rem', maxWidth: '24rem' }}>
      <Skeleton />
      <Skeleton />
      <Skeleton width="60%" />
    </div>
  ),
};

export const Ficha: Story = {
  name: 'Ficha con avatar',
  args: {},
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', maxWidth: '24rem' }}>
      <Skeleton circle height="2.5rem" />
      <div style={{ display: 'grid', gap: '0.4rem', flex: 1 }}>
        <Skeleton width="40%" />
        <Skeleton width="70%" />
      </div>
    </div>
  ),
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', maxWidth: '24rem' }}>
      <Skeleton circle height="2.5rem" />
      <div style={{ display: 'grid', gap: '0.4rem', flex: 1 }}>
        <Skeleton width="40%" />
        <Skeleton width="70%" />
      </div>
    </div>
  ),
};

export const TestContrato: Story = {
  name: 'Test — decorativo, circular y sin animación con reduced-motion',
  tags: ['!dev'],
  render: () => (
    <div id="skeleton-test" style={{ display: 'grid', gap: '0.5rem', maxWidth: '24rem' }}>
      <Skeleton data-testid="linea" />
      <Skeleton data-testid="circulo" circle height="2.5rem" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const linea = canvasElement.querySelector('[data-testid="linea"]')!;
    const circulo = canvasElement.querySelector('[data-testid="circulo"]')!;

    // decorativo: oculto a lectores de pantalla
    await expect(linea).toHaveAttribute('aria-hidden', 'true');

    // circular: usa el token de radio de píldora/círculo, no un 50% a mano
    await expect(circulo).toHaveClass('skeleton', 'skeleton--circle');
    await expect(getComputedStyle(circulo).borderRadius).toBe(
      getComputedStyle(document.documentElement).getPropertyValue('--border-radius-round').trim(),
    );
  },
};
