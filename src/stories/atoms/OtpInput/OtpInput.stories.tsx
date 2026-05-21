import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, userEvent } from 'storybook/test';
import { useState } from 'react';
import { OtpInput } from './OtpInput';

const meta: Meta<typeof OtpInput> = {
  title: 'Atoms/OtpInput',
  component: OtpInput,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    length: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Número de celdas.',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño de las celdas.',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Estado de error.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilita todas las celdas.',
    },
  },
  args: {
    length: 6,
    size: 'md',
    error: false,
    disabled: false,
    onChange: fn(),
    onComplete: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof OtpInput>;

export const Default: Story = {
  name: 'Default',
  play: async ({ canvas, args }) => {
    const inputs = canvas.getAllByRole('textbox');
    await userEvent.click(inputs[0]);
    await userEvent.keyboard('1');
    await expect(args.onChange).toHaveBeenCalledWith('1');
  },
};

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <OtpInput length={6} size="sm" id="otp-sm" />
      <OtpInput length={6} size="md" id="otp-md" />
      <OtpInput length={6} size="lg" id="otp-lg" />
    </div>
  ),
};

export const ErrorState: Story = {
  name: 'Error state',
  args: { error: true },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true, value: '123' },
};

export const FourDigitPin: Story = {
  name: '4-digit PIN (lg)',
  args: { length: 4, size: 'lg' },
};

export const Prefilled: Story = {
  name: 'Prefilled',
  args: { value: '1234', length: 6 },
};

export const KeyboardNavigation: Story = {
  name: 'Keyboard navigation',
  play: async ({ canvas }) => {
    const inputs = canvas.getAllByRole('textbox');
    await userEvent.click(inputs[0]);
    await userEvent.keyboard('123456');
    await expect(inputs[5]).toHaveFocus();
  },
};

export const BackspaceFromEmpty: Story = {
  name: 'Backspace returns to previous',
  play: async ({ canvas }) => {
    const inputs = canvas.getAllByRole('textbox');
    await userEvent.click(inputs[0]);
    await userEvent.keyboard('12');
    await expect(inputs[2]).toHaveFocus();
    await userEvent.keyboard('{Backspace}{Backspace}');
    await expect(inputs[0]).toHaveFocus();
  },
};

export const Controlled: Story = {
  name: 'Controlled',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <OtpInput length={6} value={val} onChange={setVal} id="otp-controlled" />
        <p style={{ fontFamily: 'monospace' }}>Valor: &quot;{val}&quot;</p>
      </div>
    );
  },
};

export const OnComplete: Story = {
  name: 'onComplete callback',
  render: () => {
    const [done, setDone] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <OtpInput
          length={6}
          id="otp-complete"
          onComplete={() => setDone(true)}
        />
        {done && <p>¡Código completo!</p>}
      </div>
    );
  },
};

export const PasteSupport: Story = {
  name: 'Paste support',
  play: async ({ canvas }) => {
    const inputs = canvas.getAllByRole('textbox');
    await userEvent.click(inputs[0]);
    await userEvent.paste('123456');
    await expect(inputs[0]).toHaveValue('1');
    await expect(inputs[5]).toHaveValue('6');
  },
};
