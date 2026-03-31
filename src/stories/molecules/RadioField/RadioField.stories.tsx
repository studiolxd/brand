import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from '../../atoms/Link/Link';
import { RadioField } from './RadioField';

const meta: Meta<typeof RadioField> = {
  title: 'Molecules/RadioField',
  component: RadioField,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Texto asociado al radio.',
    },
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
      description: 'Deshabilita el campo.',
    },
  },
  args: {
    label: 'Opción A',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof RadioField>;

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

export const WithLink: Story = {
  name: 'With link',
  args: {
    label: (
      <>
        He leído y acepto la{' '}
        <Link href="/politica-de-privacidad">política de privacidad</Link>
      </>
    ),
  },
};
