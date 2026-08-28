import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Sparkline } from './Sparkline';

const DOCE_MESES = [12, 14, 13, 17, 16, 19, 22, 21, 25, 24, 28, 31];

const meta = {
  title: 'Atoms/Sparkline',
  component: Sparkline,
  args: { values: DOCE_MESES },
} satisfies Meta<typeof Sparkline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PorDefecto: Story = { name: 'Por defecto' };

export const Area: Story = {
  name: 'Área',
  args: { type: 'area' },
};

export const ConColorDeSerie: Story = {
  name: 'Con color de serie',
  args: { color: 'var(--chart-series-3)' },
};

export const CruzandoElCero: Story = {
  name: 'Cruzando el cero',
  args: { values: [4, 2, -1, -3, 0, 2, 5, 3, -2, -4, 1, 6] },
};

export const Descriptiva: Story = {
  args: { ariaLabel: 'Usuarios activos: sube de 12 a 31 en doce meses' },
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
};

export const TestDecorativaPorDefecto: Story = {
  name: 'Test — sin ariaLabel la chispa es decorativa',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.queryByRole('img')).not.toBeInTheDocument();
    expect(canvasElement.querySelector('.sparkline')).toHaveAttribute('aria-hidden', 'true');
  },
};

export const TestConNombre: Story = {
  name: 'Test — con ariaLabel es una imagen con nombre',
  tags: ['!dev'],
  args: { ariaLabel: 'Tendencia de usuarios activos' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('img', { name: 'Tendencia de usuarios activos' })).toBeInTheDocument();
  },
};
