import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { InputPhone } from './InputPhone';

const meta: Meta<typeof InputPhone> = {
  title: 'Atoms/InputPhone',
  component: InputPhone,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    disabled:       { control: { type: 'boolean' } },
    error:          { control: { type: 'boolean' } },
    defaultCountry: { control: { type: 'text' } },
    placeholder:    { control: { type: 'text' } },
  },
  args: {
    defaultCountry: 'ES',
    placeholder:    'Escribe tu número de teléfono',
    disabled:       false,
    error:          false,
  },
};

export default meta;
type Story = StoryObj<typeof InputPhone>;

export const Default: Story = {};

export const Error: Story = {
  args: { error: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
};

/** Navega con Tab hasta el input para verificar el focus ring */
export const FocusVisible: Story = {
  name: 'Focus visible',
  parameters: { pseudo: { focusVisible: true } },
};

/**
 * Test: el `aria-label` del selector de país usa el castellano por defecto y se
 * sustituye cuando el consumidor lo pasa traducido.
 */
export const Etiquetas: Story = {
  name: 'Test — etiqueta del selector de país',
  tags: ['!dev'],
  render: () => (
    <>
      <div data-testid="default">
        <InputPhone />
      </div>
      <div data-testid="traducido">
        <InputPhone countryLabel="Country" />
      </div>
    </>
  ),
  play: async ({ canvasElement }) => {
    const def = within(canvasElement.querySelector('[data-testid="default"]') as HTMLElement);
    await expect(def.getByLabelText('País')).toBeInTheDocument();

    const en = within(canvasElement.querySelector('[data-testid="traducido"]') as HTMLElement);
    await expect(en.getByLabelText('Country')).toBeInTheDocument();
    await expect(en.queryByLabelText('País')).toBeNull();
  },
};

/** Test: el control mide la talla del sistema (32/40/48), como Button y Select. */
export const ContratoTalla: Story = {
  name: 'Test — talla del sistema',
  tags: ['!dev'],
  render: () => (
    <div>
      <div data-t="sm"><InputPhone size="sm" defaultCountry="ES" /></div>
      <div data-t="md"><InputPhone size="md" defaultCountry="ES" /></div>
      <div data-t="lg"><InputPhone size="lg" defaultCountry="ES" /></div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const alto = (sel: string) =>
      Math.round(canvasElement.querySelector(sel)!.getBoundingClientRect().height);
    await expect(alto('[data-t="sm"] .input-phone')).toBe(32);
    await expect(alto('[data-t="md"] .input-phone')).toBe(40);
    await expect(alto('[data-t="lg"] .input-phone')).toBe(48);
  },
};
