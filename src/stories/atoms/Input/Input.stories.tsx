import type React from 'react';
import { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRender } from '@base-ui-components/react/use-render';
import { expect, userEvent, within } from 'storybook/test';
import { Input } from './Input';
import { Container } from '../Container/Container';

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

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  parameters: { layout: 'padded' },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'datetime-local'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    describedBy: { table: { disable: true } },
    ariaLabel: { table: { disable: true } },
  },
  args: {
    placeholder: 'Escribe algo…',
    size: 'md',
    disabled: false,
    readOnly: false,
    error: false,
    'aria-label': 'Nombre',
  },
  render: (args) => <div style={{ inlineSize: '20rem' }}><Input {...args} /></div>,
};
export default meta;
type Story = StoryObj<typeof Input>;

export const PorDefecto: Story = {};

/** Las tres tallas del sistema: 32, 40 y 48 de alto. Cambian la altura y el aire horizontal, nunca el padding vertical. */
export const Tallas: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', inlineSize: '20rem' }}>
      <Input {...args} size="sm" placeholder="Pequeño" />
      <Input {...args} size="md" placeholder="Mediano" />
      <Input {...args} size="lg" placeholder="Grande" />
    </div>
  ),
};

/** El error se dice en el borde y en el mensaje del campo, nunca con un fondo. */
export const ConError: Story = { args: { error: true } };

export const Deshabilitado: Story = { args: { disabled: true, defaultValue: 'No se puede editar' } };

export const SoloLectura: Story = { args: { readOnly: true, defaultValue: 'Valor de solo lectura' } };

export const SuperficieOscura: Story = {
  render: (args) => (
    <Container surface="dark" space="md">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', inlineSize: '20rem' }}>
        <Input {...args} />
        <Input {...args} error />
      </div>
    </Container>
  ),
};

/** Navega con Tab hasta el campo para ver el anillo de foco. */
export const Foco: Story = {
  name: 'Foco visible',
  parameters: { pseudo: { focusVisible: true } },
};

export const Contrato: Story = {
  name: 'Test — talla y atributos de accesibilidad',
  tags: ['!dev'],
  render: (args) => (
    <div style={{ inlineSize: '20rem' }}>
      <Input {...args} size="sm" aria-label="Pequeño" />
      <Input {...args} size="md" aria-label="Mediano" aria-describedby="ayuda" error />
      <Input {...args} size="lg" aria-label="Grande" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(Math.round(canvas.getByRole('textbox', { name: 'Pequeño' }).getBoundingClientRect().height)).toBe(32);
    const md = canvas.getByRole('textbox', { name: 'Mediano' });
    await expect(Math.round(md.getBoundingClientRect().height)).toBe(40);
    await expect(Math.round(canvas.getByRole('textbox', { name: 'Grande' }).getBoundingClientRect().height)).toBe(48);
    await expect(md).toHaveAttribute('aria-describedby', 'ayuda');
    await expect(md).toHaveAttribute('aria-invalid', 'true');
    await expect(md).toHaveClass('input', 'input--error');
  },
};

/**
 * Test: `forwardRef`. react-hook-form registra el campo con `{...register("x")}`,
 * que esparce `ref` — debe apuntar al `<input>` real para leer el valor (no controlado).
 */
export const ContratoRef: Story = {
  name: 'Test — forwardRef (react-hook-form)',
  tags: ['!dev'],
  render: () => {
    const ref = useRef<HTMLInputElement>(null);
    return (
      <div>
        <Input ref={ref} name="email" aria-label="email" />
        <button
          type="button"
          onClick={() => {
            const probe = document.getElementById('ref-probe');
            if (probe) probe.textContent = `${ref.current?.tagName}:${ref.current?.value}`;
          }}
        >
          probe
        </button>
        <span id="ref-probe" data-testid="ref-probe" />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'email' });
    await userEvent.type(input, 'hola@studiolxd.com');
    await userEvent.click(canvas.getByRole('button', { name: 'probe' }));
    // el ref apunta al <input> real y lee el valor tecleado
    await expect(canvas.getByTestId('ref-probe')).toHaveTextContent('INPUT:hola@studiolxd.com');
  },
};

/**
 * Test: inyección estilo FormControl vía `useRender` de Base UI. `id`,
 * `aria-describedby` y `aria-invalid` inyectados desde fuera aterrizan en el
 * `<input>` real.
 */
export const ContratoInyeccion: Story = {
  name: 'Test — inyección render (FormControl)',
  tags: ['!dev'],
  render: () => (
    <RenderInjector id="email-input" aria-describedby="email-help" aria-invalid>
      <Input aria-label="email" />
    </RenderInjector>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'email' });
    await expect(input.tagName).toBe('INPUT');
    await expect(input).toHaveAttribute('id', 'email-input');
    await expect(input).toHaveAttribute('aria-describedby', 'email-help');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  },
};

/**
 * Test: `className` del consumidor al final, `data-*` passthrough y `type` nativo
 * completo (`date`).
 */
export const ContratoProps: Story = {
  name: 'Test — className + data-* + type=date',
  tags: ['!dev'],
  render: () => (
    <Input type="date" className="extra" data-slot="input" aria-label="fecha" />
  ),
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input')!;
    await expect(input).toHaveAttribute('type', 'date');
    await expect(input).toHaveClass('input', 'extra');
    // el className del consumidor va al final (añade, no sustituye)
    await expect(input.className.trim().endsWith('extra')).toBe(true);
    await expect(input).toHaveAttribute('data-slot', 'input');
  },
};

/** Test: el placeholder va en caja normal, como el resto del texto del sistema. */
export const ContratoPlaceholder: Story = {
  name: 'Test — placeholder en caja normal',
  tags: ['!dev'],
  render: () => (
    <div style={{ inlineSize: '20rem' }}>
      <Input placeholder="Escribe algo…" aria-label="Normal" />
      <Input placeholder="Escribe algo…" aria-label="Con error" error />
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
