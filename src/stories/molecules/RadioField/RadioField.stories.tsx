import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useForm, type ResolverResult } from 'react-hook-form';
import { Link } from '../../atoms/Link/Link';
import { Button } from '../../atoms/Button/Button';
import { FormProvider, FormField } from '../FormField/FormField';
import { RadioField } from './RadioField';

const meta: Meta<typeof RadioField> = {
  title: 'Molecules/RadioField',
  component: RadioField,
  parameters: { layout: 'padded' },
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  args: { label: 'Opción A', name: 'demo', value: 'a' },
};

export default meta;
type Story = StoryObj<typeof RadioField>;

/** Los radios de un grupo comparten `name`: eso es lo que los hace excluyentes. */
export const PorDefecto: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <RadioField name="plan" value="basico" label="Básico" />
      <RadioField name="plan" value="pro" label="Pro" />
      <RadioField name="plan" value="empresa" label="Empresa" />
    </div>
  ),
};

export const ConSeleccion: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <RadioField name="plan-sel" value="basico" label="Básico" defaultChecked />
      <RadioField name="plan-sel" value="pro" label="Pro" />
      <RadioField name="plan-sel" value="empresa" label="Empresa" />
    </div>
  ),
};

export const ConAyuda: Story = {
  args: { helperText: 'Puedes cambiar de plan cuando quieras.' },
};

/** El error se dice en texto y en el borde de la marca; nunca solo en color. */
export const ConError: Story = {
  args: { errorMessage: 'Elige una opción.', helperText: 'Puedes cambiar de plan cuando quieras.' },
};

export const Deshabilitado: Story = {
  args: { disabled: true, defaultChecked: true },
};

/** El texto acepta JSX: los estilos del enlace los garantiza la propia molécula. */
export const ConEnlace: Story = {
  args: {
    label: (
      <>
        Acepto los <Link href="/terminos">términos de uso</Link>
      </>
    ),
  },
};

/** La marca no es un control de una línea: `sm`/`md`/`lg` la miden 16, 20 y 24. */
export const Tallas: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <RadioField size="sm" name="tallas" value="sm" label="Pequeño" defaultChecked />
      <RadioField size="md" name="tallas" value="md" label="Mediano" />
      <RadioField size="lg" name="tallas" value="lg" label="Grande" />
    </div>
  ),
};

export const Contrato: Story = {
  name: 'Test — etiqueta, ayuda y error enlazados al control',
  tags: ['!dev'],
  args: { id: 'plan-a', helperText: 'Ayuda', errorMessage: 'Obligatorio' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole('radio', { name: 'Opción A' });
    await expect(control).toHaveAttribute('aria-invalid', 'true');
    await expect(control).toHaveClass('radio--error');
    await expect(control).toHaveAttribute('aria-describedby', 'plan-a-error plan-a-helper');
    await expect(canvas.getByRole('alert')).toHaveTextContent('Obligatorio');
    await expect(canvas.getByText('Ayuda')).toHaveAttribute('id', 'plan-a-helper');
  },
};

export const ContratoTallas: Story = {
  name: 'Test — la marca mide su talla',
  tags: ['!dev'],
  render: () => (
    <div>
      <RadioField size="sm" name="c-tallas" value="sm" label="Pequeño" />
      <RadioField size="md" name="c-tallas" value="md" label="Mediano" />
      <RadioField size="lg" name="c-tallas" value="lg" label="Grande" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const box = (name: string) =>
      Math.round(canvas.getByRole('radio', { name }).getBoundingClientRect().height);
    await expect(box('Pequeño')).toBe(16);
    await expect(box('Mediano')).toBe(20);
    await expect(box('Grande')).toBe(24);
  },
};

type Valores = { plan: string };

function resolver(values: Valores): ResolverResult<Valores> {
  if (values.plan) return { values, errors: {} };
  return { values: {}, errors: { plan: { type: 'required', message: 'Elige un plan.' } } };
}

function FormularioRhf() {
  const form = useForm<Valores>({ defaultValues: { plan: '' }, resolver });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        style={{ display: 'grid', gap: '1rem', maxWidth: '24rem' }}
      >
        <FormField
          control={form.control}
          name="plan"
          render={({ field, fieldState }) => (
            <>
              <RadioField
                {...field}
                value="basico"
                checked={field.value === 'basico'}
                label="Básico"
              />
              <RadioField
                {...field}
                value="pro"
                checked={field.value === 'pro'}
                label="Pro"
                errorMessage={fieldState.error?.message}
              />
            </>
          )}
        />
        <Button type="submit">Guardar</Button>
      </form>
    </FormProvider>
  );
}

/** Montado con `FormProvider` + `FormField`: el error del resolver llega al campo. */
export const ConReactHookForm: Story = {
  name: 'Con react-hook-form',
  render: () => <FormularioRhf />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Guardar' }));
    await expect(await canvas.findByRole('alert')).toHaveTextContent('Elige un plan.');
    await expect(canvas.getByRole('radio', { name: 'Pro' })).toHaveAttribute('aria-invalid', 'true');
    await userEvent.click(canvas.getByRole('radio', { name: 'Básico' }));
    await expect(canvas.getByRole('radio', { name: 'Básico' })).toBeChecked();
  },
};
