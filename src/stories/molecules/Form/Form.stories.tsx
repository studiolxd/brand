import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from './Form';
import { InputField } from '../InputField/InputField';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Form> = {
  title: 'Moléculas/Form',
  component: Form,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    errors: {
      control: { type: 'object' },
      description: 'Lista de mensajes de error agrupados, mostrados sobre las acciones.',
    },
    dark: {
      control: { type: 'boolean' },
      description: 'Variante para usar sobre fondo oscuro.',
    },
  },
  args: {
    dark: false,
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  name: 'Por defecto',
  args: {
    actions: <Button variant="form">Enviar</Button>,
    children: (
      <InputField id="form-email" label="Email" labelHidden placeholder="tu@email.com" />
    ),
  },
};

export const ConErrores: Story = {
  name: 'Con errores',
  args: {
    errors: ['El email es obligatorio.', 'Debes aceptar la política de privacidad.'],
    actions: <Button variant="form">Enviar</Button>,
    children: (
      <InputField id="form-email-error" label="Email" labelHidden placeholder="tu@email.com" />
    ),
  },
};

export const Dark: Story = {
  name: 'Oscuro',
  args: {
    dark: true,
    errors: ['El email es obligatorio.'],
    actions: <Button variant="form">Enviar</Button>,
    children: (
      <InputField id="form-email-dark" label="Email" labelHidden placeholder="tu@email.com" dark />
    ),
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
};
