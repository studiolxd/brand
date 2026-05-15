import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
const heroDark  = 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1280&q=80';
const heroLight = 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1280&q=80';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'accent', 'outline', 'destructive', 'ghost'],
      description: 'Variante visual del botón.',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del botón.',
    },
    block: {
      control: { type: 'boolean' },
      description: 'Ocupa todo el ancho del contenedor.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilita el botón.',
    },
    children: {
      control: { type: 'text' },
      description: 'Texto del botón.',
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'Tipo HTML del botón.',
    },
    asChild: {
      control: { type: 'boolean' },
      description: 'Fusiona las props del Button sobre el elemento hijo en lugar de renderizar un wrapper. Útil para pasar un componente de enrutamiento (p.ej. Next.js Link) sin perder la navegación client-side.',
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    block: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary' },
};


export const Accent: Story = {
  args: { variant: 'accent' },
};

export const Destructive: Story = {
  args: { variant: 'destructive' },
};

export const GhostOnLight: Story = {
  name: 'Ghost — light surface',
  args: { variant: 'ghost' },
};

export const GhostOnDark: Story = {
  name: 'Ghost — dark surface',
  args: { variant: 'ghost' },
  decorators: [
    (Story) => (
      <div className="surface-dark" style={{ padding: '2rem', backgroundColor: 'var(--color-background-dark)' }}>
        <Story />
      </div>
    ),
  ],
};

export const OutlineOnDark: Story = {
  name: 'Outline — dark photo',
  args: { variant: 'outline' },
  decorators: [
    (Story) => (
      <div style={{
        backgroundImage: `url(${heroDark})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2rem',
      }}>
        <Story />
      </div>
    ),
  ],
};

export const OutlineOnLight: Story = {
  name: 'Outline — light photo',
  args: { variant: 'outline' },
  decorators: [
    (Story) => (
      <div
        className="surface-light"
        style={{
          backgroundImage: `url(${heroLight})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '2rem',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Block: Story = {
  args: { variant: 'primary', block: true },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true },
};

/** Renderiza como <a> cuando se pasa href */
export const AsLink: Story = {
  name: 'As link (href)',
  args: { href: '#', children: 'Ver proyecto' },
};

export const AsLinkDisabled: Story = {
  name: 'Disabled link',
  args: { href: '#', disabled: true, children: 'No disponible' },
};

/** Navega con Tab hasta el botón para verificar el focus ring */
export const FocusVisible: Story = {
  name: 'Focus visible',
  parameters: { pseudo: { focusVisible: true } },
};

/**
 * Con `asChild`, Button fusiona sus clases y handlers sobre el elemento hijo.
 * En producción el hijo sería `<Link>` de Next.js; aquí usamos `<a>` como stand-in.
 */
export const AsChild: Story = {
  name: 'asChild (router link)',
  render: (args) => (
    <Button {...args} asChild>
      <a href="#">Ir a proyectos</a>
    </Button>
  ),
  args: { variant: 'primary' },
};
