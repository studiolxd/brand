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
};

export default meta;
type Story = StoryObj<typeof RadioField>;

export const Default: Story = {
  name: 'Unchecked',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <RadioField name="demo" value="a" label="Opción A" />
      <RadioField name="demo" value="b" label="Opción B" />
      <RadioField name="demo" value="c" label="Opción C" />
    </div>
  ),
};

export const Checked: Story = {
  name: 'Checked',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <RadioField name="demo-checked" value="a" label="Opción A" defaultChecked />
      <RadioField name="demo-checked" value="b" label="Opción B" />
      <RadioField name="demo-checked" value="c" label="Opción C" />
    </div>
  ),
};

export const Disabled: Story = {
  name: 'Disabled',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <RadioField name="demo-disabled" value="a" label="Opción A" disabled />
      <RadioField name="demo-disabled" value="b" label="Opción B" disabled />
      <RadioField name="demo-disabled" value="c" label="Opción C" disabled />
    </div>
  ),
};

export const DisabledChecked: Story = {
  name: 'Disabled checked',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <RadioField name="demo-disabled-checked" value="a" label="Opción A" defaultChecked disabled />
      <RadioField name="demo-disabled-checked" value="b" label="Opción B" disabled />
      <RadioField name="demo-disabled-checked" value="c" label="Opción C" disabled />
    </div>
  ),
};

export const WithLink: Story = {
  name: 'With link',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <RadioField name="demo-link" value="a" label="Opción A" />
      <RadioField name="demo-link" value="b" label="Opción B" />
      <RadioField
        name="demo-link"
        value="c"
        label={
          <>
            Acepto los <Link href="/terminos">términos de uso</Link>
          </>
        }
      />
    </div>
  ),
};
