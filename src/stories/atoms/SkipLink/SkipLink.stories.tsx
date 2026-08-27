import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';
import { SkipLink } from './SkipLink';

const meta: Meta<typeof SkipLink> = {
  title: 'Atoms/SkipLink',
  component: SkipLink,
  parameters: { layout: 'padded' },
  args: { href: '#main-content', children: 'Saltar al contenido principal' },
  argTypes: { className: { table: { disable: true } } },
};
export default meta;

type Story = StoryObj<typeof SkipLink>;

/** Oculto: no se ve, pero está en el DOM y es lo primero al tabular. */
export const Oculto: Story = {};

/** Con el foco: fijo en la esquina, sobre cualquier otra capa. */
export const Revelado: Story = {
  parameters: { pseudo: { focusVisible: true } },
};

export const Contrato: Story = {
  name: 'Test — oculto hasta el foco, y entonces sobre todo',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const link = canvasElement.querySelector('.skip-link') as HTMLAnchorElement;
    // oculto: la receta visually-hidden lo deja en 1×1 y recortado
    await expect(getComputedStyle(link).clipPath).toBe('inset(50%)');
    await expect(link.getBoundingClientRect().width).toBeLessThanOrEqual(1);
    // es lo primero al tabular
    await userEvent.tab();
    await expect(document.activeElement).toBe(link);
    const cs = getComputedStyle(link);
    await expect(cs.position).toBe('fixed');
    await expect(cs.clipPath).toBe('none');
    await expect(cs.zIndex).toBe(cs.getPropertyValue('--z-index-skip').trim());
  },
};
