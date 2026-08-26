import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Textarea } from './Textarea';
import { Container } from '../Container/Container';

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

/** El error se dice en el borde y en el mensaje del campo, nunca con un fondo. */
export const ConError: Story = { args: { error: true } };

export const Deshabilitado: Story = { args: { disabled: true, defaultValue: 'No se puede editar' } };

export const SoloLectura: Story = { args: { readOnly: true, defaultValue: 'Valor de solo lectura' } };

export const SuperficieOscura: Story = {
  render: (args) => (
    <Container surface="dark" space="md">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', inlineSize: '24rem' }}>
        <Textarea {...args} rows={3} />
        <Textarea {...args} rows={3} error />
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
