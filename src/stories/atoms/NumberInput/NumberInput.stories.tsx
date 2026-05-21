import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { NumberInput } from './NumberInput';

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
