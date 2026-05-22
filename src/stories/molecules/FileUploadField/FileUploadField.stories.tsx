import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileUploadField } from './FileUploadField';
import { Form } from '../Form/Form';
import { InputField } from '../InputField/InputField';

const meta = {
  title: 'Molecules/FileUploadField',
  component: FileUploadField,
  parameters: { layout: 'padded' },
  args: {
    id: 'archivo',
    label: 'Adjuntar archivo',
    labelHidden: false,
    multiple: false,
    disabled: false,
  },
} satisfies Meta<typeof FileUploadField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    helperText: 'Formatos aceptados: PDF, PNG, JPG',
  },
};

export const WithError: Story = {
  name: 'Con error',
  args: {
    errorMessage: 'Debes adjuntar al menos un archivo.',
  },
};

export const MultipleWithRestrictions: Story = {
  name: 'Múltiples con restricciones',
  args: {
    label: 'Documentos del proyecto',
    multiple: true,
    accept: '.pdf,.docx',
    maxSize: 10 * 1024 * 1024,
    maxFiles: 5,
    helperText: 'PDF o Word · máx. 10 MB por archivo · hasta 5 archivos',
  },
};

export const InsideForm: Story = {
  name: 'Dentro de Form',
  render: () => (
    <Form>
      <InputField id="nombre" label="Nombre" />
      <InputField id="email" label="Email" type="email" />
      <FileUploadField
        id="cv"
        label="Currículum"
        accept=".pdf"
        maxSize={5 * 1024 * 1024}
        helperText="PDF · máx. 5 MB"
      />
    </Form>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    helperText: 'La subida de archivos no está disponible.',
  },
};
