import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { useState } from 'react';
import { NumberInput } from './NumberInput';
import { List, ListItem } from '../List/List';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixtureEn as EN } from '../../../../.storybook/brandMessagesFixtureEn';

const meta = {
  title: 'Atoms/NumberInput',
  component: NumberInput,
  parameters: { layout: 'centered' },
  args: {
    defaultValue: 0,
    step: 1,
    disabled: false,
    readOnly: false,
    error: false,
    size: 'md',
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    commitMode: { control: 'radio', options: ['change', 'blur'] },
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithMinMax: Story = {
  args: {
    defaultValue: 5,
    min: 0,
    max: 10,
  },
};

export const Error: Story = {
  args: { error: true },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 3 },
};

export const ReadOnly: Story = {
  args: { readOnly: true, defaultValue: 7 },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <NumberInput {...args} size="sm" defaultValue={0} />
      <NumberInput {...args} size="md" defaultValue={0} />
      <NumberInput {...args} size="lg" defaultValue={0} />
    </div>
  ),
};

export const Controlled: Story = {
  render: (args) => {
    const [val, setVal] = useState(0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
        <NumberInput {...args} value={val} onChange={setVal} />
        <span style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>valor: {val}</span>
      </div>
    );
  },
};

/**
 * `compact`: botones y cifra justos, del ancho de 2–3 dígitos y sin estirarse.
 * Es la variante para filas de lista; en nativo la zona táctil sigue llegando a
 * 44 pt / 48 dp aunque el control se vea pequeño.
 */
export const Compacto: Story = {
  args: { compact: true, defaultValue: 12, 'aria-label': 'Cantidad' },
};

/**
 * `commitMode="blur"`: lo escrito a mano se avisa una sola vez, al salir del
 * campo o con Enter; Escape lo descarta. Los botones − y + avisan al momento.
 * Pensado para cuando cada aviso es una escritura en un servidor.
 */
export const ConfirmarAlSalir: Story = {
  name: 'Confirmar al salir',
  render: (args) => {
    const [avisos, setAvisos] = useState<number[]>([]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
        <NumberInput {...args} commitMode="blur" defaultValue={3} aria-label="Cantidad" onChange={(n) => setAvisos((a) => [...a, n])} />
        <span style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>avisos: {avisos.length ? avisos.join(', ') : '—'}</span>
      </div>
    );
  },
};

/**
 * El compacto como `trailing` de `ListItem`: la cantidad cabe junto al nombre
 * de la fila, que es para lo que existe.
 */
export const EnUnaFilaDeLista: Story = {
  name: 'En una fila de lista',
  parameters: { layout: 'padded' },
  render: () => (
    <List type="plain" showSeparators aria-label="Lista de la compra">
      <ListItem secondary="1 l" trailing={<NumberInput compact commitMode="blur" defaultValue={2} min={0} max={99} aria-label="Cantidad de leche" />}>
        Leche entera
      </ListItem>
      <ListItem trailing={<NumberInput compact commitMode="blur" defaultValue={12} min={0} max={99} aria-label="Cantidad de huevos" />}>
        Huevos
      </ListItem>
      <ListItem trailing={<NumberInput compact commitMode="blur" defaultValue={1} min={0} max={99} aria-label="Cantidad de pan" />}>
        Pan de molde integral con semillas
      </ListItem>
    </List>
  ),
};

/** Test: en modo `blur`, teclear no avisa; salir sí, una vez. */
export const ContratoConfirmarAlSalir: Story = {
  name: 'Test — confirmar al salir',
  tags: ['!dev'],
  args: { onChange: fn() },
  render: (args) => <NumberInput {...args} commitMode="blur" defaultValue={1} aria-label="n" />,
  play: async ({ canvasElement, args }) => {
    const campo = within(canvasElement).getByRole('textbox');
    await userEvent.clear(campo);
    await userEvent.type(campo, '25');
    await expect(args.onChange).not.toHaveBeenCalled();
    await userEvent.tab();
    await expect(args.onChange).toHaveBeenCalledTimes(1);
    await expect(args.onChange).toHaveBeenCalledWith(25);
  },
};

/** Test: el compacto mide 32 de alto y no se estira. */
export const ContratoCompacto: Story = {
  name: 'Test — compacto',
  tags: ['!dev'],
  render: () => (
    <div data-t="c" style={{ inlineSize: '30rem' }}>
      <NumberInput compact defaultValue={0} aria-label="c" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const caja = canvasElement.querySelector('[data-t="c"] .number-input')!.getBoundingClientRect();
    await expect(Math.round(caja.height)).toBe(32);
    await expect(caja.width).toBeLessThan(120);
  },
};

/**
 * Test: las etiquetas accesibles de los botones usan el castellano por defecto
 * y se sustituyen por completo cuando el consumidor las pasa traducidas.
 */
export const Etiquetas: Story = {
  name: 'Test — etiquetas accesibles',
  tags: ['!dev'],
  render: () => (
    <>
      <div data-testid="default">
        <NumberInput defaultValue={1} />
      </div>
      <div data-testid="traducido">
        <NumberInput defaultValue={1} decrementLabel="Decrease" incrementLabel="Increase" />
      </div>
    </>
  ),
  play: async ({ canvasElement }) => {
    const def = within(canvasElement.querySelector('[data-testid="default"]') as HTMLElement);
    await expect(def.getByLabelText('Decrementar')).toBeInTheDocument();
    await expect(def.getByLabelText('Incrementar')).toBeInTheDocument();

    const es = within(canvasElement.querySelector('[data-testid="traducido"]') as HTMLElement);
    await expect(es.getByLabelText('Decrease')).toBeInTheDocument();
    await expect(es.getByLabelText('Increase')).toBeInTheDocument();
    await expect(es.queryByLabelText('Decrementar')).toBeNull();
  },
};

/** Test: el control mide la talla del sistema (32/40/48), como Button y Select. */
export const ContratoTalla: Story = {
  name: 'Test — talla del sistema',
  tags: ['!dev'],
  render: () => (
    <div>
      <div data-t="sm"><NumberInput size="sm" defaultValue={0} aria-label="sm" /></div>
      <div data-t="md"><NumberInput size="md" defaultValue={0} aria-label="md" /></div>
      <div data-t="lg"><NumberInput size="lg" defaultValue={0} aria-label="lg" /></div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const alto = (sel: string) =>
      Math.round(canvasElement.querySelector(sel)!.getBoundingClientRect().height);
    await expect(alto('[data-t="sm"] .number-input')).toBe(32);
    await expect(alto('[data-t="md"] .number-input')).toBe(40);
    await expect(alto('[data-t="lg"] .number-input')).toBe(48);
  },
};

/**
 * Los nombres accesibles de los dos botones son cromo del sistema y **no
 * tienen valor por defecto**: salen del `BrandMessagesProvider`. Esta story lo
 * tapa con uno en inglés.
 */
export const TextosDelProveedor: Story = {
  name: 'Textos desde el proveedor (otro idioma)',
  render: () => (
    <BrandMessagesProvider messages={EN}>
      <NumberInput defaultValue={3} aria-label="Seats" />
    </BrandMessagesProvider>
  ),
};

/** Test: sin props, los dos botones leen del proveedor. */
export const ContratoProveedor: Story = {
  name: 'Test — los botones leen del proveedor',
  tags: ['!dev'],
  render: () => (
    <BrandMessagesProvider messages={EN}>
      <NumberInput defaultValue={3} aria-label="Seats" />
    </BrandMessagesProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Increase' })).toBeInTheDocument();
    await expect(canvas.queryByRole('button', { name: 'Incrementar' })).toBeNull();
  },
};
