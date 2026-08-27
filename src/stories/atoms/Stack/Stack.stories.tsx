import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Stack } from './Stack';
import { PageIntro } from '../../molecules/PageIntro/PageIntro';
import { Link } from '../Link/Link';

const meta: Meta<typeof Stack> = {
  title: 'Atoms/Stack',
  component: Stack,
  parameters: { layout: 'padded' },
  args: {
    children: (
      <>
        <PageIntro title="¿Olvidaste tu contraseña?" description="Ingresa tu correo y te enviaremos un enlace para restablecerla." />
        <Link href="#acceso" icon="arrow-left">Volver al inicio de sesión</Link>
      </>
    ),
  },
  argTypes: {
    gap: { control: { type: 'radio' }, options: ['md', 'lg'] },
    mobileOrder: { control: { type: 'radio' }, options: ['normal', 'reverse'] },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<typeof Stack>;

/** Cabecera y enlace de vuelta, apilados con aire. */
export const PorDefecto: Story = {};

/** `mobileOrder="reverse"`: en móvil el enlace de vuelta queda por encima de la cabecera; en escritorio, debajo. */
export const VueltaArribaEnMovil: Story = { args: { mobileOrder: 'reverse' } };

export const Contrato: Story = {
  name: 'Test — apila con aire; el orden invertido es solo visual y solo en móvil',
  tags: ['!dev'],
  args: { mobileOrder: 'reverse' },
  play: async ({ canvasElement }) => {
    const stack = canvasElement.querySelector('.stack') as HTMLElement;
    await expect(getComputedStyle(stack).display).toBe('flex');
    await expect(stack).toHaveClass('stack--mobile-reverse');
    // el DOM no cambia: la cabecera sigue siendo la primera
    await expect(stack.firstElementChild?.tagName).toBe('HEADER');
    const dir = getComputedStyle(stack).flexDirection;
    await expect(dir).toBe(window.innerWidth < 768 ? 'column-reverse' : 'column');
  },
};
