import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from './Form';
import { InputField } from '../InputField/InputField';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Form> = {
  title: 'Molecules/Form',
  component: Form,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    errors: {
      control: { type: 'object' },
      description: 'Lista de mensajes de error agrupados, mostrados sobre las acciones.',
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  args: {
    actions: <Button variant="form">Enviar</Button>,
    children: (
      <InputField id="form-email" label="Email" labelHidden placeholder="tu@email.com" />
    ),
  },
};

export const WithErrors: Story = {
  args: {
    errors: ['El email es obligatorio.', 'Debes aceptar la política de privacidad.'],
    actions: <Button variant="form">Enviar</Button>,
    children: (
      <InputField id="form-email-error" label="Email" labelHidden placeholder="tu@email.com" />
    ),
  },
};

export const Dark: Story = {
  args: {
    errors: ['El email es obligatorio.'],
    actions: <Button variant="form">Enviar</Button>,
    children: (
      <InputField id="form-email-dark" label="Email" labelHidden placeholder="tu@email.com" />
    ),
  },
  decorators: [(Story) => <div className="dark" style={{ padding: '1rem' }}><Story /></div>],
  globals: {
    backgrounds: { value: 'dark' },
  },
};
