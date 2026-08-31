import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useForm, type ResolverResult } from 'react-hook-form';
import { Button } from '../../atoms/Button/Button';
import { Form } from '../Form/Form';
import { InputField } from '../InputField/InputField';
import { FormProvider, FormField } from '../FormField/FormField';
import { FileUploadField } from './FileUploadField';

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

export const PorDefecto: Story = {
  args: { helperText: 'Formatos aceptados: PDF, PNG, JPG' },
};

/** El error se dice en texto y en el borde de la zona; nunca solo en color. */
export const ConError: Story = {
  args: {
    errorMessage: 'Tienes que adjuntar al menos un archivo.',
    helperText: 'Formatos aceptados: PDF, PNG, JPG',
  },
};

export const VariosConRestricciones: Story = {
  args: {
    label: 'Documentos del proyecto',
    multiple: true,
    accept: '.pdf,.docx',
    maxSize: 10 * 1024 * 1024,
    maxFiles: 5,
    helperText: 'PDF o Word · máx. 10 MB por archivo · hasta 5 archivos',
  },
};

export const DentroDeForm: Story = {
  render: () => (
    <Form>
      <InputField id="nombre" label="Nombre" />
      <InputField id="email" label="Correo" type="email" />
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

/**
 * Las tres tallas del sistema. La zona de arrastre no es un control de una
 * línea, así que no toma la altura 32/40/48: lo que sigue a la talla es su
 * aire, el cuerpo del texto, el icono y la miniatura de cada archivo.
 */
export const Tallas: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <FileUploadField size="sm" id="talla-sm" label="Pequeño" />
      <FileUploadField size="md" id="talla-md" label="Mediano" />
      <FileUploadField size="lg" id="talla-lg" label="Grande" />
    </div>
  ),
};

export const ContratoTallas: Story = {
  name: 'Test — la talla llega a la zona de arrastre',
  tags: ['!dev'],
  render: () => (
    <div>
      <FileUploadField size="sm" id="t-sm" label="Pequeño" />
      <FileUploadField size="md" id="t-md" label="Mediano" />
      <FileUploadField size="lg" id="t-lg" label="Grande" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const aire = (id: string) => {
      const zona = canvasElement.querySelector(`#${id}`)!
        .closest('.file-upload')!.querySelector('.file-upload__dropzone')!;
      return Math.round(parseFloat(getComputedStyle(zona).paddingBlockStart));
    };
    // El aire crece con la talla: 32 / 48 / 64
    await expect(aire('t-sm')).toBe(32);
    await expect(aire('t-md')).toBe(48);
    await expect(aire('t-lg')).toBe(64);
    // Y la talla llega como clase solo cuando no es la de por defecto
    await expect(canvasElement.querySelector('.file-upload--sm')).not.toBeNull();
    await expect(canvasElement.querySelector('.file-upload--md')).toBeNull();
    await expect(canvasElement.querySelector('.file-upload--lg')).not.toBeNull();
  },
};

export const Deshabilitado: Story = {
  args: { disabled: true, helperText: 'La subida de archivos no está disponible.' },
};

export const EtiquetaOculta: Story = { args: { labelHidden: true } };

export const Contrato: Story = {
  name: 'Test — etiqueta, ayuda y error enlazados al control',
  tags: ['!dev'],
  args: { helperText: 'Ayuda', errorMessage: 'Obligatorio' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // La etiqueta apunta al input de archivo real
    await expect(canvasElement.querySelector('label[for="archivo"]')).toHaveTextContent('Adjuntar archivo');
    const input = canvasElement.querySelector('#archivo')!;
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    // El control es el input real: lleva la ayuda, el error y, al final, la
    // instrucción de la zona de arrastre
    await expect(input).toHaveAttribute('aria-describedby', 'archivo-error archivo-helper archivo-hint');
    // La zona de arrastre es la cara visible, no un control: ni rol ni foco
    const zona = canvasElement.querySelector('.file-upload__dropzone')!;
    await expect(zona).toHaveAttribute('aria-hidden', 'true');
    await expect(canvas.queryByRole('button')).toBeNull();
    await expect(canvas.getByRole('alert')).toHaveTextContent('Obligatorio');
    await expect(canvas.getByText('Ayuda')).toHaveAttribute('id', 'archivo-helper');
    await expect(canvasElement.querySelector('.file-upload')).toHaveClass('file-upload--error');
  },
};

type Valores = { adjunto: File[] };

function resolver(values: Valores): ResolverResult<Valores> {
  if (values.adjunto?.length) return { values, errors: {} };
  return { values: {}, errors: { adjunto: { type: 'required', message: 'Adjunta el currículum.' } } };
}

function FormularioRhf() {
  const form = useForm<Valores>({ defaultValues: { adjunto: [] }, resolver });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        style={{ display: 'grid', gap: '1rem', maxWidth: '28rem' }}
      >
        <FormField
          control={form.control}
          name="adjunto"
          render={({ field, fieldState }) => (
            <FileUploadField
              ref={field.ref}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={field.disabled}
              label="Currículum"
              accept=".pdf"
              errorMessage={fieldState.error?.message}
            />
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </FormProvider>
  );
}

/** `onChange` entrega la lista de `File` válidos, no el evento. */
export const ConReactHookForm: Story = {
  name: 'Con react-hook-form',
  args: { id: 'rhf', label: 'Currículum' },
  render: () => <FormularioRhf />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Enviar' }));
    await expect(await canvas.findByRole('alert')).toHaveTextContent('Adjunta el currículum.');
    await expect(canvasElement.querySelector('.file-upload')).toHaveClass('file-upload--error');
  },
};
