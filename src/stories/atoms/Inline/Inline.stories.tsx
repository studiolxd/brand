import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Inline } from './Inline';
import { Button } from '../Button/Button';
import { Link } from '../Link/Link';
import { Tag } from '../Tag/Tag';

const meta: Meta<typeof Inline> = {
  title: 'Atoms/Inline',
  component: Inline,
  parameters: { layout: 'padded' },
  args: {
    children: (
      <>
        <Button type="button" size="lg" onClick={() => {}}>Reintentar</Button>
        <Link icon="arrow-left" href="#inicio">Ir al inicio</Link>
      </>
    ),
  },
  argTypes: {
    gap: { control: { type: 'radio' }, options: ['sm', 'md', 'lg'] },
    align: { control: { type: 'radio' }, options: ['start', 'center', 'end'] },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<typeof Inline>;

/** Un botón y un enlace en fila, centrados en su eje. */
export const PorDefecto: Story = {};

/** `gap="sm"`: piezas pequeñas y muchas, que envuelven cuando no caben. */
export const Compacto: Story = {
  args: {
    gap: 'sm',
    children: (
      <>
        <Tag>Diseño</Tag>
        <Tag>Formación</Tag>
        <Tag>Accesibilidad</Tag>
        <Tag>Tokens</Tag>
        <Tag>Storybook</Tag>
      </>
    ),
  },
};

/** `align="start"`: las piezas cuelgan del borde superior aunque midan distinto. */
export const AlineadoArriba: Story = {
  args: {
    align: 'start',
    children: (
      <>
        <Button type="button" size="lg" onClick={() => {}}>Grande</Button>
        <Button type="button" size="sm" onClick={() => {}}>Pequeño</Button>
      </>
    ),
  },
};

export const Contrato: Story = {
  name: 'Test — fila con envoltura, centrada por defecto y modificadores de aire y alineación',
  tags: ['!dev'],
  render: () => (
    <>
      <Inline className="base"><span>a</span><span>b</span></Inline>
      <Inline gap="lg" align="end" className="mod"><span>a</span><span>b</span></Inline>
    </>
  ),
  play: async ({ canvasElement }) => {
    const base = canvasElement.querySelector('.inline.base') as HTMLElement;
    const cs = getComputedStyle(base);
    await expect(cs.display).toBe('flex');
    await expect(cs.flexWrap).toBe('wrap');
    await expect(cs.alignItems).toBe('center');
    await expect(base.className).toBe('inline base');
    const mod = canvasElement.querySelector('.inline.mod') as HTMLElement;
    await expect(mod).toHaveClass('inline--gap-lg');
    await expect(mod).toHaveClass('inline--align-end');
    await expect(getComputedStyle(mod).alignItems).toBe('flex-end');
    await expect(parseFloat(getComputedStyle(mod).columnGap)).toBeGreaterThan(parseFloat(cs.columnGap));
  },
};
