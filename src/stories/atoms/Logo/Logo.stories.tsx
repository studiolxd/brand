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

/**
 * El valor de un token de color, resuelto por el navegador al mismo `rgb(...)`
 * que devuelve `getComputedStyle`. El hexadecimal no se parsea a mano porque
 * el CSS del Storybook compilado va minificado y ahí `#ffffff` viaja como
 * `#fff`: tres dígitos que un troceado de dos en dos lee como `NaN`.
 */
function colorDeToken(token: string, contexto: Element): string {
  const sonda = document.createElement('span');
  sonda.style.color = `var(${token})`;
  contexto.appendChild(sonda);
  const color = getComputedStyle(sonda).color;
  sonda.remove();
  return color;
}

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
    const banda = canvasElement.querySelector('[data-testid="oscura"]')!;
    const oscuro = banda.querySelector('.logo')!;
    // La sonda va en la banda, no en el `<svg>`: dentro de SVG un `<span>` no
    // es contenido renderizable.
    await expect(getComputedStyle(oscuro).color).toBe(
      colorDeToken('--color-text-on-dark', banda),
    );
  },
};
