import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fieldset } from './Fieldset';
import { CheckboxField } from '../../molecules/CheckboxField/CheckboxField';
import { RadioField } from '../../molecules/RadioField/RadioField';
import { InputField } from '../../molecules/InputField/InputField';

const meta: Meta<typeof Fieldset> = {
  title: 'Atoms/Fieldset',
  component: Fieldset,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
      description: 'Nivel de heading visual para el legend.',
    },
    weight: {
      control: { type: 'select' },
      options: [undefined, 'thin', 'extralight', 'light', 'regular', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
      description: 'Peso tipográfico del legend.',
    },
    size: {
      control: { type: 'select' },
      options: [undefined, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      description: 'Tamaño tipográfico del legend.',
    },
    className: { table: { disable: true } },
  },
  args: {
    legend: 'Información personal',
    level: 2,
  },
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const Default: Story = {
  render: (args) => (
    <Fieldset {...args}>
      <InputField id="nombre" label="Nombre" name="nombre" />
      <InputField id="apellidos" label="Apellidos" name="apellidos" />
    </Fieldset>
  ),
};

export const WithCheckboxes: Story = {
  args: {
    legend: 'Preferencias de contacto',
    level: 3,
  },
  render: (args) => (
    <Fieldset {...args}>
      <CheckboxField label="Email" name="contact-email" />
      <CheckboxField label="Teléfono" name="contact-phone" />
      <CheckboxField label="WhatsApp" name="contact-whatsapp" />
    </Fieldset>
  ),
};

export const WithRadios: Story = {
  args: {
    legend: 'Tipo de proyecto',
    level: 3,
  },
  render: (args) => (
    <Fieldset {...args}>
      <RadioField label="Web" name="tipo" value="web" />
      <RadioField label="App móvil" name="tipo" value="app" />
      <RadioField label="Branding" name="tipo" value="branding" />
    </Fieldset>
  ),
};

export const Disabled: Story = {
  args: {
    legend: 'Información personal',
    disabled: true,
  },
  render: (args) => (
    <Fieldset {...args}>
      <InputField id="nombre-disabled" label="Nombre" name="nombre" />
      <InputField id="apellidos-disabled" label="Apellidos" name="apellidos" />
    </Fieldset>
  ),
};

export const AllLevels: Story = {
  render: () => (
    <>
      {([1, 2, 3, 4, 5, 6] as const).map((lvl) => (
        <Fieldset key={lvl} legend={`Legend nivel ${lvl}`} level={lvl}>
          <InputField id={`campo-${lvl}`} label="Campo de ejemplo" name={`campo-${lvl}`} />
        </Fieldset>
      ))}
    </>
  ),
};
