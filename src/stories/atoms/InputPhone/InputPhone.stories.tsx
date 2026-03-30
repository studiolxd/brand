import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputPhone } from './InputPhone';

const meta: Meta<typeof InputPhone> = {
  title: 'Atoms/InputPhone',
  component: InputPhone,
  argTypes: {
    disabled:       { control: { type: 'boolean' } },
    error:          { control: { type: 'boolean' } },
    dark:           { control: { type: 'boolean' } },
    defaultCountry: { control: { type: 'text' } },
    placeholder:    { control: { type: 'text' } },
  },
  args: {
    defaultCountry: 'ES',
    placeholder:    'Escribe tu número de teléfono',
    disabled:       false,
    error:          false,
    dark:           false,
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

export const Dark: Story = {
  args: { dark: true },
  globals: { backgrounds: { value: 'dark' } },
};
