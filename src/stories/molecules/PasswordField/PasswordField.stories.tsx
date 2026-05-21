import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { PasswordField } from './PasswordField';

const meta: Meta<typeof PasswordField> = {
  title: 'Molecules/PasswordField',
  component: PasswordField,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    label: { control: { type: 'text' } },
    labelHidden: { control: { type: 'boolean' } },
    placeholder: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    errorMessage: { control: { type: 'text' } },
    error: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
  },
  args: {
    id: 'password',
    label: 'Contraseña',
    labelHidden: true,
    disabled: false,
    error: false,
  },
};

export default meta;
type Story = StoryObj<typeof PasswordField>;

export const Default: Story = {};

export const LabelVisible: Story = {
  args: { labelHidden: false },
};

export const WithHelper: Story = {
  args: {
    helperText: 'Mínimo 8 caracteres, una mayúscula y un número.',
  },
};

export const WithError: Story = {
  args: {
    error: true,
    errorMessage: 'La contraseña es incorrecta.',
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'secreto123' },
};

export const ToggleVisibility: Story = {
  args: { defaultValue: 'mi-contraseña-secreta' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Contraseña');
    const toggle = canvas.getByRole('button', { name: 'Mostrar contraseña' });

    await expect(input).toHaveAttribute('type', 'password');

    await userEvent.click(toggle);
    await expect(input).toHaveAttribute('type', 'text');
    await expect(canvas.getByRole('button', { name: 'Ocultar contraseña' })).toBeInTheDocument();

    await userEvent.click(toggle);
    await expect(input).toHaveAttribute('type', 'password');
  },
};
