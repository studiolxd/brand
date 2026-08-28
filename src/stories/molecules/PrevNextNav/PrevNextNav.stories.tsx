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

/**
 * Con `prevTitle`/`nextTitle` los controles enseñan a dónde llevan: el rótulo
 * de dirección arriba y el título del destino debajo. Es el pie de una página
 * de documentación, sin rótulo central.
 */
export const ConTitulos: Story = {
  name: 'Con títulos de destino',
  parameters: { layout: 'padded' },
  args: {
    label: undefined,
    prevHref: '/docs/instalacion',
    nextHref: '/docs/uso',
    prevTitle: 'Instalación',
    nextTitle: 'Uso',
    prevLabel: 'Anterior',
    nextLabel: 'Siguiente',
  },
};

/** El extremo de la serie sigue deshabilitado, con su título a la vista. */
export const ConTitulosSinSiguiente: Story = {
  name: 'Con títulos, último de la serie',
  parameters: { layout: 'padded' },
  args: {
    label: undefined,
    prevHref: '/docs/uso',
    prevTitle: 'Uso',
    nextTitle: undefined,
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
 * Test: con título, el nombre accesible sale del texto visible (no de un
 * `aria-label` que lo taparía), y sin `label` no se pinta rótulo central.
 */
export const ContratoTitulos: Story = {
  name: 'Test — títulos de destino',
  tags: ['!dev'],
  render: () => (
    <PrevNextNav
      prevHref="/docs/instalacion"
      nextHref="/docs/uso"
      prevTitle="Instalación"
      nextTitle="Uso"
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const anterior = canvas.getByRole('link', { name: /Anterior/ });
    await expect(anterior).toHaveAccessibleName('Anterior Instalación');
    await expect(anterior).not.toHaveAttribute('aria-label');
    await expect(anterior).toHaveClass('prev-next-nav__btn--titled');
    // El rótulo de dirección y el título son visibles, no solo para el lector.
    await expect(canvas.getByText('Siguiente')).toBeVisible();
    await expect(canvas.getByText('Uso')).toBeVisible();
    // Sin `label` no hay rótulo central.
    await expect(canvasElement.querySelector('.prev-next-nav__label')).toBeNull();
    // El paginador con títulos se estira a los extremos.
    const raiz = canvasElement.querySelector('.prev-next-nav')!;
    await expect(raiz).toHaveClass('prev-next-nav--titled');
    await expect(getComputedStyle(raiz).justifyContent).toBe('space-between');
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
