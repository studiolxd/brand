import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useForm, type ResolverResult } from 'react-hook-form';
import { Button } from '../../atoms/Button/Button';
import { Link } from '../../atoms/Link/Link';
import { FormProvider, FormField } from '../FormField/FormField';
import { CheckboxField } from './CheckboxField';

const meta: Meta<typeof CheckboxField> = {
  title: 'Molecules/CheckboxField',
  component: CheckboxField,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Texto asociado al checkbox.',
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Estado controlado — marcado o no marcado.',
    },
    defaultChecked: {
      control: { type: 'boolean' },
      description: 'Estado inicial sin controlar.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilita el campo.',
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    label: 'Acepto los términos y condiciones',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxField>;

export const Default: Story = {
  name: 'Unchecked',
};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
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

/**
 * `labelHidden` esconde el texto de la opción **a la vista**, no al lector de
 * pantalla: la marca conserva su nombre. Para una casilla de fila de tabla,
 * donde el rótulo lo da la columna.
 */
export const EtiquetaOculta: Story = {
  name: 'Etiqueta oculta',
  args: { label: 'Seleccionar la fila «Factura 2026-014»', labelHidden: true },
};

/** Test: con `labelHidden` la marca sigue teniendo nombre y el texto no ocupa sitio. */
export const ContratoEtiquetaOculta: Story = {
  name: 'Test — labelHidden esconde el texto, no el nombre',
  tags: ['!dev'],
  args: { label: 'Seleccionar la fila', labelHidden: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole('checkbox', { name: 'Seleccionar la fila' });
    await expect(control).toBeInTheDocument();

    const texto = canvas.getByText('Seleccionar la fila');
    await expect(texto).toHaveClass('visually-hidden', 'checkbox-field__label');
    // Oculto de verdad: no ocupa sitio en la fila.
    await expect(texto.getBoundingClientRect().width).toBeLessThanOrEqual(1);
  },
};

export const ConAyuda: Story = {
  args: { helperText: 'Puedes retirar tu consentimiento cuando quieras.' },
};

/** El error se dice en texto y en el borde de la casilla; nunca solo en color. */
export const ConError: Story = {
  args: {
    errorMessage: 'Tienes que aceptar los términos y condiciones.',
    helperText: 'Puedes retirar tu consentimiento cuando quieras.',
  },
};

export const Tallas: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <CheckboxField size="sm" label="Pequeño" defaultChecked />
      <CheckboxField size="md" label="Mediano" defaultChecked />
      <CheckboxField size="lg" label="Grande" defaultChecked />
    </div>
  ),
};

export const Contrato: Story = {
  name: 'Test — etiqueta, ayuda y error enlazados al control',
  tags: ['!dev'],
  args: { id: 'terminos', helperText: 'Ayuda', errorMessage: 'Obligatorio' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole('checkbox', { name: 'Acepto los términos y condiciones' });
    await expect(control).toHaveAttribute('aria-invalid', 'true');
    await expect(control).toHaveClass('checkbox--error');
    await expect(control).toHaveAttribute('aria-describedby', 'terminos-error terminos-helper');
    await expect(canvas.getByRole('alert')).toHaveTextContent('Obligatorio');
    await expect(canvas.getByText('Ayuda')).toHaveAttribute('id', 'terminos-helper');
    // La etiqueta apunta al disparador, no al input oculto de Base UI
    await expect(canvasElement.querySelector('label[for="terminos"]')).not.toBeNull();
    await expect(control).toHaveAttribute('id', 'terminos');
  },
};

type Valores = { terminos: boolean };

function resolver(values: Valores): ResolverResult<Valores> {
  if (values.terminos) return { values, errors: {} };
  return {
    values: {},
    errors: { terminos: { type: 'required', message: 'Tienes que aceptar los términos.' } },
  };
}

function FormularioRhf() {
  const form = useForm<Valores>({ defaultValues: { terminos: false }, resolver });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        style={{ display: 'grid', gap: '1rem', maxWidth: '24rem' }}
      >
        <FormField
          control={form.control}
          name="terminos"
          render={({ field, fieldState }) => (
            <CheckboxField
              ref={field.ref}
              name={field.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              onBlur={field.onBlur}
              disabled={field.disabled}
              label="Acepto los términos y condiciones"
              errorMessage={fieldState.error?.message}
            />
          )}
        />
        <Button type="submit">Guardar</Button>
      </form>
    </FormProvider>
  );
}

/**
 * El control es de Base UI: el contrato es `checked`/`onCheckedChange` + `name`
 * + `ref` al disparador, no el spread del `field`.
 */
export const ConReactHookForm: Story = {
  name: 'Con react-hook-form',
  render: () => <FormularioRhf />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Guardar' }));
    await expect(await canvas.findByRole('alert')).toHaveTextContent('Tienes que aceptar los términos.');
    const control = canvas.getByRole('checkbox', { name: 'Acepto los términos y condiciones' });
    await expect(control).toHaveAttribute('aria-invalid', 'true');
    await userEvent.click(control);
    await expect(control).toBeChecked();
  },
};
