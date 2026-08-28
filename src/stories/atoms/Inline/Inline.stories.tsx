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
    justify: { control: { type: 'radio' }, options: ['start', 'center', 'end', 'between'] },
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

/**
 * `justify="end"`: la fila de acciones se alinea a la derecha. Es lo que
 * evita el `className` de producto al pie de un formulario o de una tarjeta.
 */
export const AlineadoALaDerecha: Story = {
  args: {
    justify: 'end',
    children: (
      <>
        <Button type="button" variant="ghost" onClick={() => {}}>Cancelar</Button>
        <Button type="button" onClick={() => {}}>Guardar</Button>
      </>
    ),
  },
};

/** `justify="between"`: las piezas se van a los extremos de la fila. */
export const SeparadoALosExtremos: Story = {
  args: {
    justify: 'between',
    children: (
      <>
        <Link icon="arrow-left" href="#atras">Atrás</Link>
        <Button type="button" onClick={() => {}}>Continuar</Button>
      </>
    ),
  },
};

export const Contrato: Story = {
  name: 'Test — fila con envoltura, centrada por defecto y modificadores de aire, alineación y reparto',
  tags: ['!dev'],
  render: () => (
    <>
      <Inline className="base"><span>a</span><span>b</span></Inline>
      <Inline gap="lg" align="end" justify="end" className="mod"><span>a</span><span>b</span></Inline>
      <Inline justify="between" className="between"><span>a</span><span>b</span></Inline>
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
    await expect(mod).toHaveClass('inline--justify-end');
    await expect(getComputedStyle(mod).justifyContent).toBe('flex-end');
    await expect(parseFloat(getComputedStyle(mod).columnGap)).toBeGreaterThan(parseFloat(cs.columnGap));
    const between = canvasElement.querySelector('.inline.between') as HTMLElement;
    await expect(getComputedStyle(between).justifyContent).toBe('space-between');
    // `justify="start"` es el defecto y no añade clase: la base sigue limpia.
    await expect(getComputedStyle(base).justifyContent).toBe('normal');
  },
};

/** Una fila de acciones puede declararse barra de herramientas con su nombre. */
export const ContratoPassthrough: Story = {
  name: 'Test — passthrough de role, aria-*, id y data-*',
  tags: ['!dev'],
  render: () => (
    <Inline role="toolbar" aria-label="Acciones del documento" id="barra" data-zona="acciones">
      <span>a</span>
      <span>b</span>
    </Inline>
  ),
  play: async ({ canvasElement }) => {
    const fila = canvasElement.querySelector('.inline')!;
    await expect(fila).toHaveAttribute('role', 'toolbar');
    await expect(fila).toHaveAttribute('aria-label', 'Acciones del documento');
    await expect(fila).toHaveAttribute('id', 'barra');
    await expect(fila).toHaveAttribute('data-zona', 'acciones');
  },
};
