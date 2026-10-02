import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Icon, ICON_NAMES } from './Icon';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  args: { name: 'chevron', size: 'md' },
  argTypes: {
    name: { control: 'select', options: ICON_NAMES },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Un icono cualquiera en la talla por defecto. */
export const PorDefecto: Story = {};

/** Las cinco tallas: el trazo mide 1px en todas. */
export const Tallas: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--spacing-6)', alignItems: 'flex-end' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Icon key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const Contrato: Story = {
  name: 'Test — talla por token, trazo fijo y decorativo',
  tags: ['!dev'],
  args: { name: 'bell', size: 'lg' },
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('svg.icon')!;
    await expect(Math.round(svg.getBoundingClientRect().width)).toBe(48);
    await expect(svg).toHaveAttribute('aria-hidden', 'true');
    const trazo = svg.querySelector('path, line')!;
    await expect(getComputedStyle(trazo).strokeWidth).toBe('1px');
  },
};

export const Catalogo: Story = {
  name: 'Test — todo IconName renderiza un svg con currentColor',
  tags: ['!dev'],
  render: () => (
    <>
      {ICON_NAMES.map((name) => (
        <Icon key={name} name={name} />
      ))}
    </>
  ),
  play: async ({ canvasElement }) => {
    const svgs = canvasElement.querySelectorAll('svg.icon');
    await expect(svgs.length).toBe(ICON_NAMES.length);
    for (const svg of svgs) {
      await expect(svg.tagName.toLowerCase()).toBe('svg');
      await expect(svg).toHaveAttribute('stroke', 'currentColor');
    }
  },
};

/**
 * Glifos que pueden salirse del área útil de 18 (3–21), y por qué. Cualquier
 * otro que se salga rompe el test: o se redibuja, o se apunta aquí con su
 * razón.
 */
const FUERA_DEL_AREA: Partial<Record<(typeof ICON_NAMES)[number], string>> = {
  arrow: 'glifo de marca: la flecha va de borde a borde del lienzo',
  'arrow-left': 'glifo de marca: la flecha va de borde a borde del lienzo',
  close: 'geometría compartida MENU_GLYPH: no se ajusta por separado de menu',
  menu: 'geometría compartida MENU_GLYPH: no se ajusta por separado de close',
  star: 'rebase óptico: la punta asoma a 2,8 para no parecer más baja que sus vecinos',
  headset: 'el micro baja hasta 22: fuera de los cambios decididos, pendiente de redibujo',
};

/** Holgura para el redondeo de las curvas (moon llega a 2,99). */
const HOLGURA = 0.05;

export const AreaUtil: Story = {
  name: 'Test — todo glifo cabe en el área útil de 18',
  tags: ['!dev'],
  render: () => (
    <>
      {ICON_NAMES.map((name) => (
        <span key={name} data-icon={name}>
          <Icon name={name} />
        </span>
      ))}
    </>
  ),
  play: async ({ canvasElement }) => {
    const fuera: string[] = [];
    for (const span of canvasElement.querySelectorAll<HTMLElement>('[data-icon]')) {
      const name = span.dataset.icon as (typeof ICON_NAMES)[number];
      // getBBox del <svg> da la caja del dibujo en unidades del viewBox (sin
      // el trazo), que es justo la retícula de 24.
      const caja = span.querySelector('svg')!.getBBox();
      const dentro =
        caja.x >= 3 - HOLGURA &&
        caja.y >= 3 - HOLGURA &&
        caja.x + caja.width <= 21 + HOLGURA &&
        caja.y + caja.height <= 21 + HOLGURA;
      if (!dentro && !FUERA_DEL_AREA[name]) {
        const r = (n: number) => Math.round(n * 100) / 100;
        fuera.push(`${name}: x ${r(caja.x)}–${r(caja.x + caja.width)}, y ${r(caja.y)}–${r(caja.y + caja.height)}`);
      }
    }
    await expect(canvasElement.querySelectorAll('[data-icon]').length).toBe(ICON_NAMES.length);
    await expect(fuera).toEqual([]);
  },
};
