import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';
import { Button } from '../Button/Button';
import { Tooltip, TooltipProvider } from './Tooltip';

const meta = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={200}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '6rem 4rem' }}>
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Guardar los cambios',
    children: <Button variant="outline">Guardar</Button>,
  },
};

export const Abajo: Story = {
  name: 'Abajo (side=bottom)',
  args: {
    label: 'Se abre por debajo del disparador',
    children: <Button variant="outline">Abajo</Button>,
    side: 'bottom',
  },
};

export const Derecha: Story = {
  name: 'Derecha (side=right)',
  args: {
    label: 'Se abre a la derecha',
    children: <Button variant="outline">Derecha</Button>,
    side: 'right',
  },
};

export const TextoLargo: Story = {
  name: 'Texto largo (rompe a varias líneas)',
  args: {
    label:
      'Este bocadillo lleva un texto largo para comprobar que el ancho máximo lo parte en varias líneas en vez de desbordar la pantalla.',
    children: <Button variant="outline">Explicación</Button>,
  },
};

export const ContenidoRico: Story = {
  name: 'Contenido rico (ReactNode)',
  args: {
    label: (
      <>
        <strong>3 avisos</strong> de accesibilidad
      </>
    ),
    children: <Button variant="outline">A11y</Button>,
  },
};

export const Abierto: Story = {
  name: 'Abierto por defecto',
  args: {
    label: 'Visible sin interacción',
    children: <Button variant="outline">Abierto</Button>,
    defaultOpen: true,
  },
};

/** Contrato visual: los cuatro lados, abiertos, con la flecha pegada al bocadillo y apuntando al disparador. */
export const CuatroLados: Story = {
  name: 'Cuatro lados',
  args: { label: 'Bocadillo', children: <Button variant="outline">Disparador</Button> },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: '6rem 8rem' }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
        <Tooltip key={side} side={side} label={`side=${side}`} defaultOpen>
          <Button variant="outline">{side}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

/**
 * Test: en cada lado, la base de la flecha toca el borde del bocadillo (sin hueco) y
 * el bocadillo queda separado del disparador por `--tooltip-offset` (4px).
 */
export const GeometriaFlecha: Story = {
  name: 'Test — flecha y offset en los cuatro lados',
  tags: ['!dev'],
  args: { label: 'Bocadillo', children: <Button variant="outline">Disparador</Button> },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: '6rem 8rem' }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
        <Tooltip key={side} side={side} label={`side=${side}`} defaultOpen>
          <Button variant="outline" data-testid={`trigger-${side}`}>{side}</Button>
        </Tooltip>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const near = (a: number, b: number) => Math.abs(a - b) <= 1;
    for (const side of ['top', 'bottom', 'left', 'right'] as const) {
      const trigger = canvas.getByTestId(`trigger-${side}`);
      const popup = await waitFor(() => {
        const el = document.querySelector<HTMLElement>(`.tooltip[data-side='${side}']`);
        if (!el) throw new Error(`sin popup para ${side}`);
        return el;
      });
      const arrow = popup.querySelector<HTMLElement>('.tooltip__arrow')!;
      const t = trigger.getBoundingClientRect();
      const p = popup.getBoundingClientRect();
      const a = arrow.getBoundingClientRect();
      switch (side) {
        case 'top':
          await expect(near(t.top - p.bottom, 4)).toBe(true);
          await expect(near(a.top, p.bottom)).toBe(true);
          break;
        case 'bottom':
          await expect(near(p.top - t.bottom, 4)).toBe(true);
          await expect(near(a.bottom, p.top)).toBe(true);
          break;
        case 'left':
          await expect(near(t.left - p.right, 4)).toBe(true);
          await expect(near(a.left, p.right)).toBe(true);
          break;
        case 'right':
          await expect(near(p.left - t.right, 4)).toBe(true);
          await expect(near(a.right, p.left)).toBe(true);
          break;
      }
    }
  },
};

/**
 * En claro el bocadillo se invierte (prusia sobre página blanca). Sobre página oscura ese
 * prusia sería el propio lienzo, así que toma el par de `Button primary`: lavanda con tinta prusia.
 */
export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: {
    label: 'Guardar los cambios',
    children: <Button variant="outline">Guardar</Button>,
    defaultOpen: true,
  },
};
