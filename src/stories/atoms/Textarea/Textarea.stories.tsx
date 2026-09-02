import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
  component: Textarea,
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    describedBy: { table: { disable: true } },
  },
  args: {
    placeholder: 'Escribe algo…',
    size: 'md',
    disabled: false,
    readOnly: false,
    error: false,
    'aria-label': 'Mensaje',
  },
  render: (args) => <div style={{ inlineSize: '24rem' }}><Textarea {...args} /></div>,
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const PorDefecto: Story = {};

/**
 * Es el único campo que **no** mide la talla del sistema: al ser multilínea, su
 * altura la fija el contenido (`rows`) sobre una altura mínima. Las tallas cambian
 * el cuerpo de letra y el aire alrededor del texto.
 */
export const Tallas: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', inlineSize: '24rem' }}>
      <Textarea {...args} size="sm" rows={3} placeholder="Pequeño" />
      <Textarea {...args} size="md" rows={3} placeholder="Mediano" />
      <Textarea {...args} size="lg" rows={3} placeholder="Grande" />
    </div>
  ),
};

/**
 * `rows` por debajo de las 4 líneas del mínimo no baja la altura; por encima, sí.
 */
export const AlturaMinima: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', inlineSize: '24rem' }}>
      <Textarea {...args} rows={2} placeholder="rows=2 — mide el mínimo" />
      <Textarea {...args} rows={4} placeholder="rows=4 — el mínimo exacto" />
      <Textarea {...args} rows={8} placeholder="rows=8 — ocho líneas" />
    </div>
  ),
};

/**
 * `bare` deja el campo sin caja: sin borde, sin fondo, sin aire, sin altura
 * mínima, sin asa de redimensionado y sin anillo de foco. La caja la dibuja el
 * contenedor que lo enmarca —es lo que hace `MessageComposer`, que mete campo y
 * botón de enviar dentro de un solo marco—. Quien lo monte tiene que dibujar el
 * foco en ese contenedor con `:focus-within`.
 */
export const Bare: Story = {
  name: 'Sin caja (bare)',
  render: (args) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 'var(--spacing-2)',
        inlineSize: '24rem',
        paddingBlock: 'var(--spacing-3)',
        paddingInline: 'var(--spacing-4)',
        borderWidth: 'var(--border-width-default)',
        borderStyle: 'solid',
        borderColor: 'var(--color-primary)',
      }}
    >
      <Textarea {...args} bare rows={2} placeholder="El marco lo pone el contenedor" />
    </div>
  ),
};

/** El error se dice en el borde y en el mensaje del campo, nunca con un fondo. */
export const ConError: Story = { args: { error: true } };

export const Deshabilitado: Story = { args: { disabled: true, defaultValue: 'No se puede editar' } };

export const SoloLectura: Story = { args: { readOnly: true, defaultValue: 'Valor de solo lectura' } };

export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', inlineSize: '24rem' }}>
      <Textarea {...args} rows={3} />
      <Textarea {...args} rows={3} error />
    </div>
  ),
};

/** Navega con Tab hasta el campo para ver el anillo de foco. */
export const Foco: Story = {
  name: 'Foco visible',
  parameters: { pseudo: { focusVisible: true } },
};

export const Contrato: Story = {
  name: 'Test — multilínea y atributos de accesibilidad',
  tags: ['!dev'],
  render: (args) => (
    <div style={{ inlineSize: '24rem' }}>
      <Textarea {...args} rows={2} aria-label="Corto" />
      <Textarea {...args} rows={20} aria-label="Largo" aria-describedby="ayuda" error />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const corto = canvas.getByRole('textbox', { name: 'Corto' });
    const largo = canvas.getByRole('textbox', { name: 'Largo' });
    // no es un control de una línea: la altura la manda el contenido sobre un mínimo, no la talla
    await expect(corto.getBoundingClientRect().height).toBeGreaterThan(48);
    await expect(largo.getBoundingClientRect().height).toBeGreaterThan(
      corto.getBoundingClientRect().height,
    );
    await expect(largo).toHaveAttribute('aria-describedby', 'ayuda');
    await expect(largo).toHaveAttribute('aria-invalid', 'true');
    await expect(largo).toHaveClass('textarea', 'textarea--error');
  },
};

/**
 * Test: `className` del consumidor al final, `data-*` passthrough y atributos
 * nativos (`maxLength`, `aria-describedby`) que la lista cerrada anterior descartaba.
 */
export const ContratoProps: Story = {
  name: 'Test — className + data-* passthrough',
  tags: ['!dev'],
  render: () => (
    <Textarea
      className="extra"
      data-slot="textarea"
      aria-label="mensaje"
      aria-describedby="msg-help"
      maxLength={200}
    />
  ),
  play: async ({ canvasElement }) => {
    const textarea = canvasElement.querySelector('textarea')!;
    await expect(textarea).toHaveClass('textarea', 'extra');
    await expect(textarea.className.trim().endsWith('extra')).toBe(true);
    await expect(textarea).toHaveAttribute('data-slot', 'textarea');
    await expect(textarea).toHaveAttribute('aria-describedby', 'msg-help');
    await expect(textarea).toHaveAttribute('maxlength', '200');
  },
};

/**
 * Test: la altura mínima sale de la fórmula del token
 * (`rows` × interlineado × cuerpo + 2 × aire + 2 × borde), así que un `rows`
 * por encima de las 4 líneas por defecto se nota, y la talla la recalcula.
 */
export const ContratoAlturaMinima: Story = {
  name: 'Test — la altura mínima se deriva de rows',
  tags: ['!dev'],
  render: () => (
    <div style={{ inlineSize: '24rem' }}>
      <Textarea rows={2} aria-label="Dos" />
      <Textarea rows={8} aria-label="Ocho" />
      <Textarea rows={2} size="sm" aria-label="Dos pequeño" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alto = (name: string) =>
      Math.round(canvas.getByRole('textbox', { name }).getBoundingClientRect().height);
    // md: 4 × 1.5 × 16 + 2 × 16 + 2 × 1 = 130 — rows por debajo del mínimo no baja de ahí
    await expect(alto('Dos')).toBe(130);
    // por encima del mínimo, rows manda: 8 × 24 + 32 + 2 = 226
    await expect(alto('Ocho')).toBe(226);
    // sm recalcula la fórmula con su cuerpo y su aire: 4 × 1.5 × 14 + 2 × 8 + 2 = 102
    await expect(alto('Dos pequeño')).toBe(102);
  },
};

/** Test: el placeholder va en caja normal, como el resto del texto del sistema. */
export const ContratoPlaceholder: Story = {
  name: 'Test — placeholder en caja normal',
  tags: ['!dev'],
  render: () => (
    <div style={{ inlineSize: '24rem' }}>
      <Textarea placeholder="Escribe algo…" aria-label="Normal" />
      <Textarea placeholder="Escribe algo…" aria-label="Con error" error />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const name of ['Normal', 'Con error']) {
      const el = canvas.getByRole('textbox', { name });
      await expect(getComputedStyle(el, '::placeholder').textTransform).toBe('none');
    }
  },
};

/** Test: `bare` renuncia a borde, fondo, altura mínima y asa de redimensionado. */
export const ContratoBare: Story = {
  name: 'Test — bare no pinta caja',
  tags: ['!dev'],
  render: () => (
    <div style={{ inlineSize: '24rem' }}>
      <Textarea bare rows={2} aria-label="Sin caja" />
      <Textarea rows={2} aria-label="Con caja" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const bare = canvas.getByRole('textbox', { name: 'Sin caja' });
    const normal = canvas.getByRole('textbox', { name: 'Con caja' });
    const bareStyle = getComputedStyle(bare);

    await expect(bareStyle.resize).toBe('none');
    await expect(bareStyle.paddingTop).toBe('0px');
    await expect(bareStyle.paddingLeft).toBe('0px');
    // Transparente en fondo y borde: la caja la pinta el contenedor.
    await expect(bareStyle.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    await expect(bareStyle.borderTopColor).toBe('rgba(0, 0, 0, 0)');
    // Y no arrastra la altura mínima de la talla (130px en md).
    await expect(bare.getBoundingClientRect().height)
      .toBeLessThan(normal.getBoundingClientRect().height);
  },
};
