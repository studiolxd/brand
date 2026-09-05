import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn } from 'storybook/test';
import { Alert, AlertTitle, AlertDescription } from './Alert';
import { Button } from '../../atoms/Button/Button';
import { Link } from '../../atoms/Link/Link';

const meta = {
  title: 'Molecules/Alert',
  component: Alert,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning'],
      description: 'Intención del aviso. Decide el relleno y el rol ARIA.',
    },
    dismissible: { control: 'boolean', description: 'Añade el botón de cierre.' },
    closeLabel: { control: 'text', description: 'Etiqueta accesible del cierre. Default «Cerrar».' },
  },
  args: {
    title: 'Título del alert',
    variant: 'default',
    dismissible: false,
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PorDefecto: Story = {};

/** Las cuatro intenciones. El relleno es sólido en todas; solo `warning` lee en claro. */
export const Variantes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <Alert title="Aviso" description="Información neutra sobre el estado de la página." />
      <Alert variant="success" title="Operación completada" description="Los cambios se han guardado." />
      <Alert variant="error" title="Ha ocurrido un error" description="No se ha podido guardar. Inténtalo de nuevo." />
      <Alert variant="warning" title="Atención requerida" description="Algunos campos necesitan revisión." />
    </div>
  ),
};

export const ConDescripcion: Story = {
  args: {
    title: 'Título del alert',
    description: 'Descripción adicional con más contexto sobre el mensaje principal.',
  },
};

/** Sin `title`: solo la descripción. */
export const SoloDescripcion: Story = {
  args: {
    title: undefined,
    description: 'Un aviso de una sola línea, sin rótulo.',
  },
};

/** Cerrable en las cuatro intenciones: el aspa es un `Button` ghost a talla `sm`. */
export const Cerrable: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <Alert dismissible title="Este alert se puede cerrar" description="Pulsa el aspa para ocultarlo." />
      <Alert dismissible variant="success" title="Guardado correctamente" description="Los cambios se han guardado." />
      <Alert dismissible variant="error" title="No se ha podido guardar" description="Revisa la conexión." />
      <Alert dismissible variant="warning" title="Revisa los datos" description="Algunos campos requieren tu atención." />
    </div>
  ),
};

/** Composición: subpartes y contenido arbitrario (enlaces, acciones) dentro del alert. */
export const Composicion: Story = {
  render: () => (
    <Alert variant="warning" dismissible>
      <Alert.Title>Tu sesión caduca en 5 minutos</Alert.Title>
      <Alert.Description>
        Guarda los cambios antes de que se cierre. Puedes <Link href="#renovar">renovar la sesión</Link>.
        <Button size="sm">Renovar ahora</Button>
      </Alert.Description>
    </Alert>
  ),
};

/**
 * Superficie oscura. El relleno del alert es autocontenido: se ve igual sobre una
 * página clara y sobre una oscura, y el borde blanco del `default` lo separa del
 * fondo cuando la página ya es prusia.
 */
export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  render: () => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <Alert dismissible title="Aviso" description="Sobre una página oscura." />
      <Alert variant="success" title="Operación completada" />
      <Alert variant="error" title="Ha ocurrido un error" />
      <Alert variant="warning" title="Atención requerida" />
    </div>
  ),
};

/**
 * Test: las subpartes están disponibles como **named exports** (RSC-safe) y son
 * el mismo componente que el namespace (`Alert.Title === AlertTitle`).
 */
export const NamedExports: Story = {
  name: 'Test — named exports (RSC-safe)',
  tags: ['!dev'],
  render: () => (
    <Alert variant="success">
      <AlertTitle>Título</AlertTitle>
      <AlertDescription>Descripción</AlertDescription>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    await expect(Alert.Title).toBe(AlertTitle);
    await expect(Alert.Description).toBe(AlertDescription);
    await expect(canvasElement.querySelector('.alert__title')).toHaveTextContent('Título');
    await expect(canvasElement.querySelector('.alert__description')).toHaveTextContent('Descripción');
  },
};

/**
 * Test: modo composición (`<Alert.Title>`/`<Alert.Description>` + children arbitrarios),
 * override de `role` y passthrough de `id`/`className`.
 */
export const Composition: Story = {
  name: 'Test — composición + rest-spread',
  tags: ['!dev'],
  render: () => (
    <Alert variant="success" role="alert" id="aviso" className="extra">
      <Alert.Title>Guardado</Alert.Title>
      <Alert.Description>
        Los cambios se guardaron <strong>correctamente</strong>.
      </Alert.Description>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('.alert')!;
    await expect(root).toHaveClass('alert', 'alert--success', 'extra');
    await expect(root.className.trim().endsWith('extra')).toBe(true);
    await expect(root).toHaveAttribute('role', 'alert'); // override del rol de la variante
    await expect(root).toHaveAttribute('id', 'aviso');
    const title = within(canvasElement).getByText('Guardado');
    await expect(title.tagName).toBe('P');
    await expect(title).toHaveClass('alert__title');
    await expect(canvasElement.querySelector('.alert__description')).toBeInTheDocument();
  },
};

/** Test: el rol ARIA sale de la variante — `alert` interrumpe, `status` no. */
export const RolPorVariante: Story = {
  name: 'Test — rol ARIA por variante',
  tags: ['!dev'],
  render: () => (
    <>
      <Alert data-testid="default" title="Aviso" />
      <Alert data-testid="success" variant="success" title="Hecho" />
      <Alert data-testid="error" variant="error" title="Error" />
      <Alert data-testid="warning" variant="warning" title="Atención" />
    </>
  ),
  play: async ({ canvasElement }) => {
    const rol = (id: string) => canvasElement.querySelector(`[data-testid="${id}"]`)!.getAttribute('role');
    await expect(rol('default')).toBe('status');
    await expect(rol('success')).toBe('status');
    await expect(rol('error')).toBe('alert');
    await expect(rol('warning')).toBe('alert');
  },
};

/** Test: el cierre es un botón con nombre accesible, mide la talla `sm` y oculta el alert. */
export const ContratoCierre: Story = {
  name: 'Test — el cierre es un botón de 32px que oculta el alert',
  tags: ['!dev'],
  args: { title: 'Un aviso', dismissible: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const cierre = canvas.getByRole('button', { name: 'Cerrar' });
    const caja = cierre.getBoundingClientRect();
    await expect(Math.round(caja.width)).toBe(32);
    await expect(Math.round(caja.height)).toBe(32);
    await userEvent.click(cierre);
    await expect(canvasElement.querySelector('.alert')).toBeNull();
  },
};

/** Test: con `onDismiss` el cierre no oculta nada — manda el consumidor. */
export const ContratoOnDismiss: Story = {
  name: 'Test — onDismiss controla el cierre',
  tags: ['!dev'],
  args: { title: 'Un aviso', dismissible: true, onDismiss: fn(), closeLabel: 'Close' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Close' }));
    await expect(args.onDismiss).toHaveBeenCalledTimes(1);
    await expect(canvasElement.querySelector('.alert')).toBeInTheDocument();
  },
};

export const ContratoCuerpo: Story = {
  name: 'Test — fuera del SiteShell el texto del alert lee a 16px',
  tags: ['!dev'],
  args: {
    title: 'Un aviso',
    description: 'Con su descripción.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const px = (el: Element) => parseFloat(getComputedStyle(el).fontSize);
    await expect(px(canvas.getByText('Un aviso'))).toBe(16);
    await expect(px(canvas.getByText('Con su descripción.'))).toBe(16);
  },
};
