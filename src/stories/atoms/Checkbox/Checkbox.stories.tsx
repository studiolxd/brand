import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Estado controlado — marcado, desmarcado o indeterminado.',
    },
    defaultChecked: {
      control: { type: 'boolean' },
      description: 'Estado inicial sin controlar.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilita el checkbox.',
    },
    onCheckedChange: {
      description: 'Callback al cambiar el estado. Recibe `true`, `false` o `"indeterminate"`.',
    },
  },
  args: {
    disabled: false,
    'aria-label': 'Checkbox',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  name: 'Unchecked',
};

export const Checked: Story = {
  name: 'Checked',
  args: { defaultChecked: true },
};

export const Indeterminate: Story = {
  name: 'Indeterminate',
  args: { checked: 'indeterminate' },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  name: 'Disabled checked',
  args: { disabled: true, defaultChecked: true },
};

/** Navega con Tab hasta el checkbox para verificar el focus ring */
export const FocusVisible: Story = {
  name: 'Focus visible',
  parameters: { pseudo: { focusVisible: true } },
};
