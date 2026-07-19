import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '../../atoms/Button/Button';
import { MessageComposer } from './MessageComposer';

const meta = {
  title: 'Molecules/MessageComposer',
  component: MessageComposer,
  args: {
    value: '',
    onChange: fn(),
    onSend: fn(),
    placeholder: 'Escribe un mensaje…',
  },
} satisfies Meta<typeof MessageComposer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <MessageComposer {...args} value={value} onChange={setValue} />;
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ConTextos: Story = {
  args: {
    sendLabel: 'Enviando…',
    sendAriaLabel: 'Enviar',
  },
};

export const ConAcciones: Story = {
  render: (args) => {
    const [value, setValue] = useState('Deteniendo la respuesta del modelo…');
    return (
      <MessageComposer
        {...args}
        value={value}
        onChange={setValue}
        disabled
        actions={<Button onClick={fn()}>Detener</Button>}
      />
    );
  },
};
