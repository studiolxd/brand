import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { PrevNextNav } from './PrevNextNav';

const meta: Meta<typeof PrevNextNav> = {
  title: 'Molecules/PrevNextNav',
  component: PrevNextNav,
  parameters: { layout: 'centered' },
  args: {
    prevLabel: 'Semana anterior',
    nextLabel: 'Semana siguiente',
    label: 'Semana 21 · 19–25 may',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof PrevNextNav>;

export const ConHref: Story = {
  name: 'Con href (link-based)',
  args: {
    prevHref: '/planning?week=2025-W20',
    nextHref: '/planning?week=2025-W22',
  },
};

export const ConOnClick: Story = {
  name: 'Con onClick (handler)',
  args: {
    prevOnClick: fn(),
    nextOnClick: fn(),
  },
};

export const SinAnterior: Story = {
  name: 'Sin anterior (primer elemento)',
  args: {
    prevHref: undefined,
    nextHref: '/planning?week=2025-W22',
  },
};

export const SinSiguiente: Story = {
  name: 'Sin siguiente (último elemento)',
  args: {
    prevHref: '/planning?week=2025-W20',
    nextHref: undefined,
  },
};

export const Sm: Story = {
  name: 'Variante sm',
  args: {
    prevHref: '/planning?week=2025-W20',
    nextHref: '/planning?week=2025-W22',
    size: 'sm',
  },
};

export const LabelMes: Story = {
  name: 'Label de mes',
  args: {
    prevHref: '/clockings?month=2025-04',
    nextHref: '/clockings?month=2025-06',
    prevLabel: 'Mes anterior',
    nextLabel: 'Mes siguiente',
    label: 'mayo 2025',
  },
};
