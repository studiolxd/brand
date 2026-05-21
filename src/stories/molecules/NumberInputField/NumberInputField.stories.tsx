import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberInputField } from './NumberInputField';

const meta = {
  title: 'Molecules/NumberInputField',
  component: NumberInputField,
  parameters: { layout: 'centered' },
  args: {
    id: 'cantidad',
    label: 'Cantidad',
    labelHidden: true,
    step: 1,
    disabled: false,
    readOnly: false,
    error: false,
    size: 'md',
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof NumberInputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LabelVisible: Story = {
  args: { labelHidden: false },
};

export const WithHelper: Story = {
  args: {
    helperText: 'Introduce un número entre 1 y 100.',
    min: 1,
    max: 100,
    defaultValue: 1,
  },
};

export const WithError: Story = {
  args: {
    errorMessage: 'El valor está fuera del rango permitido.',
    helperText: 'Introduce un número entre 1 y 100.',
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 5 },
};

export const WithMinMax: Story = {
  args: {
    labelHidden: false,
    min: 0,
    max: 20,
    defaultValue: 10,
    helperText: 'Valor entre 0 y 20.',
  },
};
