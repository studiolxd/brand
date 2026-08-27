import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Button } from '../../atoms/Button/Button';
import { MessageComposer } from './MessageComposer';

const meta = {
  title: 'Molecules/MessageComposer',
  component: MessageComposer,
  parameters: { layout: 'padded' },
  args: {
    value: '',
    onChange: fn(),
    onSend: fn(),
    inputLabel: 'Mensaje',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '40rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MessageComposer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PorDefecto: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <MessageComposer {...args} value={value} onChange={setValue} />;
  },
};

/** Sin texto escrito, el botón de enviar está apagado: no hay nada que mandar. */
export const Vacio: Story = {
  name: 'Vacío',
};

export const ConTexto: Story = {
  name: 'Con texto',
  args: { value: 'Necesito ayuda con mi proyecto.' },
};

export const Deshabilitado: Story = {
  args: { disabled: true, value: 'Esperando la respuesta del modelo…' },
};

/** `helperText` sustituye la línea del atajo; `null` la quita del todo. */
export const OtraAyuda: Story = {
  name: 'Otra línea de ayuda',
  args: {
    value: 'Hola',
    helperText: 'Las respuestas puede que no sean exactas. Comprueba los datos importantes.',
  },
};

export const SinAyuda: Story = {
  name: 'Sin línea de ayuda',
  args: { value: 'Hola', helperText: null },
};

/** `actions` cuelga más controles a la derecha del botón de enviar. */
export const ConAcciones: Story = {
  name: 'Con acciones',
  render: (args) => {
    const [value, setValue] = useState('Deteniendo la respuesta del modelo…');
    return (
      <MessageComposer
        {...args}
        value={value}
        onChange={setValue}
        disabled
        actions={<Button variant="outline" onClick={fn()}>Detener</Button>}
      />
    );
  },
};

export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { value: 'Necesito ayuda con mi proyecto.' },
};

/** Test: el nombre accesible del botón es su texto visible, sin `aria-label` que lo contradiga. */
export const ContratoBoton: Story = {
  name: 'Test — el botón se llama como lo que pone',
  tags: ['!dev'],
  args: { value: 'Hola', sendLabel: 'Enviar' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const boton = canvas.getByRole('button', { name: 'Enviar' });
    await expect(boton).toBeInTheDocument();
    await expect(boton.getAttribute('aria-label')).toBeNull();
  },
};

/** Test: la línea del atajo describe al campo y sale con las teclas de verdad. */
export const ContratoAtajo: Story = {
  name: 'Test — el atajo se ve y describe al campo',
  tags: ['!dev'],
  args: { value: 'Hola' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const campo = canvas.getByRole('textbox', { name: 'Mensaje' });
    const describedBy = campo.getAttribute('aria-describedby');
    await expect(describedBy).toBeTruthy();

    const ayuda = canvasElement.querySelector(`#${CSS.escape(describedBy as string)}`);
    await expect(ayuda?.textContent).toContain('Enter');
    // Y las teclas son `<kbd>` de verdad, no texto entre comillas.
    await expect(ayuda?.querySelectorAll('kbd').length).toBe(3);
  },
};

/** Test: el marco dibuja el foco, porque el campo va en variante `bare`. */
export const ContratoFoco: Story = {
  name: 'Test — el foco lo dibuja el marco',
  tags: ['!dev'],
  args: { value: 'Hola' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const campo = canvas.getByRole('textbox', { name: 'Mensaje' });
    const marco = canvasElement.querySelector('.message-composer__box') as HTMLElement;

    await expect(getComputedStyle(marco).boxShadow).toBe('none');
    await userEvent.click(campo);
    await expect(getComputedStyle(marco).boxShadow).not.toBe('none');
    // El campo no dibuja nada por su cuenta.
    await expect(getComputedStyle(campo).borderTopColor).toBe('rgba(0, 0, 0, 0)');
  },
};
