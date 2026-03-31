import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Atoms/Radio',
  component: Radio,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Estado controlado — seleccionado o no.',
    },
    defaultChecked: {
      control: { type: 'boolean' },
      description: 'Estado inicial sin controlar.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilita el radio.',
    },
  },
  args: {
    disabled: false,
    'aria-label': 'Radio',
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  name: 'Unchecked',
};

export const Checked: Story = {
  name: 'Checked',
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  name: 'Disabled checked',
  args: { disabled: true, defaultChecked: true },
};

/** Navega con Tab hasta el radio para verificar el focus ring */
export const FocusVisible: Story = {
  name: 'Focus visible',
  parameters: { pseudo: { focusVisible: true } },
};
