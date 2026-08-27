import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
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

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: {
    prevHref: '/planning?week=2025-W20',
    nextHref: '/planning?week=2025-W22',
  },
};

/**
 * Test: los extremos se deshabilitan sin `href` ni handler, el control activo
 * dispara su handler y los rótulos por defecto van en castellano.
 */
export const Contrato: Story = {
  name: 'Test — contrato de los controles',
  tags: ['!dev'],
  render: () => {
    const anterior = fn();
    return (
      <>
        <div data-testid="completo">
          <PrevNextNav label="mayo 2025" prevOnClick={anterior} nextOnClick={fn()} />
        </div>
        <div data-testid="primero">
          <PrevNextNav label="mayo 2025" nextHref="/x" />
        </div>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const completo = within(
      canvasElement.querySelector('[data-testid="completo"]') as HTMLElement
    );
    const anterior = completo.getByLabelText('Anterior');
    await expect(anterior).toBeEnabled();
    await userEvent.click(anterior);

    const primero = within(
      canvasElement.querySelector('[data-testid="primero"]') as HTMLElement
    );
    await expect(primero.getByLabelText('Anterior')).toBeDisabled();
    await expect(primero.getByLabelText('Siguiente').tagName).toBe('A');
  },
};
