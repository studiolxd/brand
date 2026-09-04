import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRender } from '@base-ui/react/use-render';
import { expect, fireEvent, userEvent, within, fn } from 'storybook/test';
import { Button } from './Button';
import { Icon } from '../Icon/Icon';

/**
 * Inyecta props sobre su hijo con `useRender` de Base UI, igual que hace el
 * `FormControl` del DS.
 */
function RenderInjector({
  children,
  ...props
}: { children: React.ReactElement<Record<string, unknown>> } & Record<string, unknown>) {
  return useRender({ render: children, props });
}
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
      options: ['primary', 'outline', 'ghost', 'text'],
      description: 'Variante visual del botón.',
    },
    destructive: {
      control: { type: 'boolean' },
      description: 'Aplica color rojo de intención destructiva. Composable con outline y text.',
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
    iconOnly: {
      control: { type: 'boolean' },
      description: 'Renderiza un botón cuadrado de solo icono. Componible con variant y size. Requiere aria-label (o texto visually-hidden) para accesibilidad.',
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


export const AllDestructiveIntent: Story = {
  name: 'Destructive intent — outline + text, dark surface',
  render: () => (
    <div className="surface-dark" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', padding: '2rem', backgroundColor: 'var(--color-background-dark)' }}>
      <Button variant="outline" destructive>Outline</Button>
      <Button variant="text" destructive>Text</Button>
    </div>
  ),
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

export const TextOnLight: Story = {
  name: 'Text — light surface',
  args: { variant: 'text' },
};

/**
 * Con icono. El subrayado es una línea bajo el botón entero —la misma técnica
 * que en `Link`: sombra interior y `padding-block-end`, no `text-decoration`—,
 * así que cruza por debajo del icono igual que del texto. Con
 * `text-decoration` la línea se cortaba en el SVG.
 */
export const TextConIcono: Story = {
  name: 'Text — con icono',
  args: { variant: 'text' },
  render: (args) => (
    <Button {...args}>
      <Icon name="arrow-left" size="sm" />
      Volver al paso anterior
    </Button>
  ),
};

export const TextDestructive: Story = {
  name: 'Text — destructive intent',
  args: { variant: 'text', destructive: true, children: 'Eliminar' },
};

export const TextDestructiveOnDark: Story = {
  name: 'Text — destructive intent, dark surface',
  args: { variant: 'text', destructive: true, children: 'Eliminar' },
  decorators: [
    (Story) => (
      <div className="surface-dark" style={{ padding: '2rem', backgroundColor: 'var(--color-background-dark)' }}>
        <Story />
      </div>
    ),
  ],
};

export const ContratoSubrayadoText: Story = {
  name: 'Test — el subrayado de text es una línea, no text-decoration',
  tags: ['!dev'],
  args: { variant: 'text' },
  render: TextConIcono.render,
  play: async ({ canvasElement }) => {
    const boton = within(canvasElement).getByRole('button');
    const estilo = getComputedStyle(boton);
    // La línea la pone la sombra interior, separada del texto por el padding:
    // así cubre también el SVG del icono.
    await expect(estilo.boxShadow).not.toBe('none');
    await expect(estilo.textDecorationLine).toBe('none');
    await expect(parseFloat(estilo.paddingBottom)).toBeGreaterThan(0);
    // El anillo de foco sigue siendo el outline, ajeno a la sombra.
    await expect(boton).toHaveClass('button--text');
  },
};

export const TextOnDark: Story = {
  name: 'Text — dark surface',
  args: { variant: 'text' },
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
 * Con `render`, Button pone sus clases y handlers sobre el elemento indicado.
 * En producción sería `<Link>` de Next.js; aquí usamos `<a>` como stand-in.
 */
export const ConRender: Story = {
  name: 'render (enlace del router)',
  render: (args) => (
    <Button {...args} render={<a href="#" />}>
      Ir a proyectos
    </Button>
  ),
  args: { variant: 'primary' },
};

/**
 * Botón cuadrado de solo icono. Componible con cualquier `variant` y `size`.
 * A11y: siempre necesita `aria-label` (o texto con `VisuallyHidden`), porque no
 * hay texto visible que nombre la acción.
 */
export const IconOnly: Story = {
  name: 'Icon only (md)',
  render: (args) => (
    <Button {...args} iconOnly aria-label="Cerrar">
      <Icon name="close" />
    </Button>
  ),
  args: { variant: 'primary' },
};

export const IconOnlySmall: Story = {
  name: 'Icon only — small',
  render: (args) => (
    <Button {...args} iconOnly size="sm" aria-label="Cerrar">
      <Icon name="close" size="sm" />
    </Button>
  ),
  args: { variant: 'primary' },
};

export const IconOnlyGhost: Story = {
  name: 'Icon only — ghost',
  render: (args) => (
    <Button {...args} iconOnly variant="ghost" aria-label="Buscar">
      <Icon name="search" />
    </Button>
  ),
};

/**
 * Test: `className` del consumidor se añade DESPUÉS de las clases propias, y los
 * atributos `data-*` / `aria-*` no declarados llegan al DOM vía `{...rest}`.
 */
export const PropPassthrough: Story = {
  name: 'Test — className + data-* passthrough',
  tags: ['!dev'],
  render: () => (
    <Button
      className="mi-clase"
      data-slot="button"
      data-variant="secondary"
      aria-label="Guardar"
    >
      Guardar
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole('button', { name: 'Guardar' });
    await expect(btn).toHaveClass('button', 'button--primary', 'mi-clase');
    // el className del consumidor va al final (añade, no sustituye)
    await expect(btn.className.trim().endsWith('mi-clase')).toBe(true);
    await expect(btn).toHaveAttribute('data-slot', 'button');
    await expect(btn).toHaveAttribute('data-variant', 'secondary');
  },
};

/** Test: atributos de formulario (`type`, `form`, `name`, `value`) aterrizan en el DOM. */
export const FormAttributes: Story = {
  name: 'Test — atributos de formulario',
  tags: ['!dev'],
  render: () => (
    <Button type="submit" form="f1" name="intent" value="save">
      Enviar
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole('button', { name: 'Enviar' });
    await expect(btn).toHaveAttribute('type', 'submit');
    await expect(btn).toHaveAttribute('form', 'f1');
    await expect(btn).toHaveAttribute('name', 'intent');
    await expect(btn).toHaveAttribute('value', 'save');
  },
};

/**
 * Test: composición Base UI `<Dialog.Close render={<Button/>} />`. El wrapper
 * inyecta `onClick` y `data-*` sobre el Button; con el spread de `{...rest}`
 * esas props llegan al elemento y el click se dispara.
 */
export const RenderComposition: Story = {
  name: 'Test — composición render (Dialog.Close)',
  tags: ['!dev'],
  render: (args) => (
    <RenderInjector
      onClick={args.onClick as React.MouseEventHandler<HTMLElement>}
      data-open=""
    >
      <Button>Cerrar</Button>
    </RenderInjector>
  ),
  args: { onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole('button', { name: 'Cerrar' });
    // props inyectadas desde fuera (como hace Dialog.Close con render) llegan al DOM
    await expect(btn).toHaveAttribute('data-open');
    await userEvent.click(btn);
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const ContratoFoco: Story = {
  name: 'Test — anillo de foco por fuera, en la tinta de la superficie',
  tags: ['!dev'],
  render: () => <Button variant="primary">Crear cuenta</Button>,
  play: async ({ canvasElement }) => {
    const boton = within(canvasElement).getByRole('button', { name: 'Crear cuenta' });
    await userEvent.tab();
    await expect(boton).toHaveFocus();
    const cs = getComputedStyle(boton);
    await expect(parseFloat(cs.outlineOffset)).toBeGreaterThanOrEqual(4);
    await expect(cs.outlineColor).not.toBe(cs.backgroundColor);
  },
};


/** Test: un enlace deshabilitado no navega ni dispara `onClick`. */
export const ContratoEnlaceDeshabilitado: Story = {
  name: 'Test — enlace deshabilitado sin navegación ni onClick',
  tags: ['!dev'],
  args: { href: '#destino', disabled: true, children: 'No disponible', onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const enlace = within(canvasElement).getByText('No disponible');
    // `disabled` no existe en <a>: el estado se comunica con aria-disabled y
    // el destino se retira, así que el navegador no tiene a dónde ir
    await expect(enlace).toHaveAttribute('aria-disabled', 'true');
    await expect(enlace).not.toHaveAttribute('href');
    // El puntero ni siquiera llega (`pointer-events: none`), pero el clic
    // programático —el que llegaría por teclado o desde código— tampoco pasa
    fireEvent.click(enlace);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
