import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Separator } from './Separator';
import { Heading } from '../Heading/Heading';
import { Paragraph } from '../Paragraph/Paragraph';
import { Link } from '../Link/Link';

const meta: Meta<typeof Separator> = {
  title: 'Atoms/Separator',
  component: Separator,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    orientation: {
      control: { type: 'inline-radio' },
      options: ['horizontal', 'vertical'],
      description: 'Eje de la línea.',
    },
    spacing: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Aire a ambos lados.',
    },
    decorative: {
      control: { type: 'boolean' },
      description: 'Retira la línea del árbol de accesibilidad.',
    },
  },
  args: {
    orientation: 'horizontal',
    spacing: 'md',
    decorative: true,
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const PorDefecto: Story = {
  render: (args) => (
    <div>
      <Paragraph>Lo de arriba.</Paragraph>
      <Separator {...args} />
      <Paragraph>Lo de abajo.</Paragraph>
    </div>
  ),
};

/** Tres tallas de aire: `sm` dentro de un control, `md` entre grupos, `lg` entre bloques. */
export const Aire: Story = {
  render: () => (
    <div>
      <Paragraph size="small">sm</Paragraph>
      <Separator spacing="sm" />
      <Paragraph size="small">md</Paragraph>
      <Separator spacing="md" />
      <Paragraph size="small">lg</Paragraph>
      <Separator spacing="lg" />
      <Paragraph size="small">fin</Paragraph>
    </div>
  ),
};

/** En vertical la línea se estira a la altura de la fila que la contiene. */
export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Link href="#uno">Uno</Link>
      <Separator orientation="vertical" />
      <Link href="#dos">Dos</Link>
      <Separator orientation="vertical" />
      <Link href="#tres">Tres</Link>
    </div>
  ),
};

/**
 * Cuando la línea separa de verdad dos grupos de contenido, `decorative={false}`
 * la deja en el árbol de accesibilidad con su rol `separator`.
 */
export const Semantica: Story = {
  name: 'Semántica',
  render: () => (
    <div>
      <Heading level={3} size={8}>Datos de la cuenta</Heading>
      <Paragraph>Nombre, correo y contraseña.</Paragraph>
      <Separator decorative={false} spacing="lg" />
      <Heading level={3} size={8}>Zona de peligro</Heading>
      <Paragraph>Dar de baja la cuenta.</Paragraph>
    </div>
  ),
};

/** Sobre superficie oscura la línea remapea su color por token, sin CSS propio. */
export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  render: () => (
    <div>
      <Paragraph>Lo de arriba.</Paragraph>
      <Separator />
      <Paragraph>Lo de abajo.</Paragraph>
    </div>
  ),
};

/** Test: elemento, clases de talla y orientación, y paso de props. */
export const Contrato: Story = {
  name: 'Test — elemento, modificadores y paso de props',
  tags: ['!dev'],
  render: () => (
    <>
      <Separator data-testid="base" className="extra" data-linea="uno" />
      <Separator data-testid="sm" spacing="sm" />
      <Separator data-testid="lg" spacing="lg" orientation="vertical" />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const base = canvas.getByTestId('base');
    await expect(base.tagName).toBe('HR');
    await expect(base).toHaveClass('separator', 'extra');
    await expect(base.className).not.toContain('separator--md');
    await expect(base.className).not.toContain('separator--horizontal');
    await expect(base).toHaveAttribute('data-linea', 'uno');
    await expect(canvas.getByTestId('sm')).toHaveClass('separator--sm');
    const lg = canvas.getByTestId('lg');
    await expect(lg).toHaveClass('separator--lg', 'separator--vertical');
  },
};

/** Test: la línea decorativa sale del árbol; la semántica conserva su rol. */
export const ContratoAccesibilidad: Story = {
  name: 'Test — rol y orientación accesibles',
  tags: ['!dev'],
  render: () => (
    <>
      <Separator data-testid="decorativa" />
      <Separator data-testid="semantica" decorative={false} />
      <Separator data-testid="semantica-vertical" decorative={false} orientation="vertical" />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('decorativa')).toHaveAttribute('role', 'none');
    const semantica = canvas.getByTestId('semantica');
    await expect(semantica).not.toHaveAttribute('role');
    await expect(semantica).not.toHaveAttribute('aria-orientation');
    await expect(canvas.getByTestId('semantica-vertical'))
      .toHaveAttribute('aria-orientation', 'vertical');
    // Solo la semántica se anuncia: la decorativa no está en el árbol.
    await expect(canvas.getAllByRole('separator')).toHaveLength(2);
  },
};
