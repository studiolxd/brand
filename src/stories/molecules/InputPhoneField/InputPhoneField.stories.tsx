import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputPhoneField } from './InputPhoneField';

const meta: Meta<typeof InputPhoneField> = {
  title: 'Molecules/InputPhoneField',
  component: InputPhoneField,
  argTypes: {
    disabled:     { control: { type: 'boolean' } },
    error:        { control: { type: 'boolean' } },
    dark:         { control: { type: 'boolean' } },
    placeholder:  { control: { type: 'text' } },
    helperText:   { control: { type: 'text' } },
    errorMessage: { control: { type: 'text' } },
  },
  args: {
    id:           'phone',
    defaultCountry: 'ES',
    placeholder:  'Escribe tu número de teléfono',
    disabled:     false,
    error:        false,
    dark:         false,
  },
};

export default meta;
type Story = StoryObj<typeof InputPhoneField>;

export const Default: Story = {};

export const WithHelper: Story = {
  args: { helperText: 'Solo utilizaremos tu número de teléfono para hablarte sobre este proyecto.' },
};

export const WithError: Story = {
  args: { error: true, errorMessage: 'Introduce un número de teléfono válido.' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Dark: Story = {
  args: { dark: true },
  globals: { backgrounds: { value: 'dark' } },
};
