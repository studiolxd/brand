import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useForm, type ResolverResult } from 'react-hook-form';
import { Button } from '../../atoms/Button/Button';
import { FormProvider, FormField } from '../FormField/FormField';
import { SwitcherField } from './SwitcherField';

const meta: Meta<typeof SwitcherField> = {
  title: 'Molecules/SwitcherField',
  component: SwitcherField,
  parameters: { layout: 'padded' },
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  args: { label: 'Activar notificaciones' },
};

export default meta;
type Story = StoryObj<typeof SwitcherField>;

export const PorDefecto: Story = {};

export const Activado: Story = { args: { defaultChecked: true } };

export const ConAyuda: Story = {
  args: { helperText: 'Te avisamos solo de lo que afecte a tu cuenta.' },
};

/** El error se dice en texto y en un anillo alrededor del interruptor; nunca solo en color. */
export const ConError: Story = {
  args: {
    errorMessage: 'Tienes que aceptar los avisos de seguridad.',
    helperText: 'Te avisamos solo de lo que afecte a tu cuenta.',
  },
};

export const Deshabilitado: Story = { args: { disabled: true, defaultChecked: true } };

/** El interruptor es una marca, no un control de una línea: mide 20, 24 y 30 de alto. */
export const Tallas: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <SwitcherField size="sm" label="Pequeño" defaultChecked />
      <SwitcherField size="md" label="Mediano" defaultChecked />
      <SwitcherField size="lg" label="Grande" defaultChecked />
    </div>
  ),
};

/**
 * `labelHidden` deja la etiqueta en el árbol de accesibilidad —el interruptor
 * se sigue llamando igual— pero no la pinta. Es lo que necesita una tabla de
 * preferencias, donde el nombre del ajuste ya está en su propia columna.
 */
export const EtiquetaOculta: Story = {
  name: 'Etiqueta oculta',
  render: () => (
    <table style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'start', paddingInlineEnd: '2rem' }}>Aviso</th>
          <th style={{ textAlign: 'start' }}>Correo</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Menciones</td>
          <td><SwitcherField labelHidden label="Menciones por correo" defaultChecked /></td>
        </tr>
        <tr>
          <td>Resumen semanal</td>
          <td><SwitcherField labelHidden label="Resumen semanal por correo" /></td>
        </tr>
      </tbody>
    </table>
  ),
};

export const ContratoEtiquetaOculta: Story = {
  name: 'Test — con labelHidden el interruptor conserva su nombre',
  tags: ['!dev'],
  args: { id: 'menciones', labelHidden: true, label: 'Menciones por correo' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Sigue nombrando al control...
    const control = canvas.getByRole('switch', { name: 'Menciones por correo' });
    await expect(control).toHaveAttribute('aria-labelledby', 'menciones-label');
    // ...y sigue en el DOM, solo que oculta visualmente
    const etiqueta = canvasElement.querySelector('#menciones-label');
    await expect(etiqueta).toHaveClass('visually-hidden');
    await expect(canvasElement.querySelector('.switcher-field__label')).toBeNull();
  },
};

export const Contrato: Story = {
  name: 'Test — etiqueta, ayuda y error enlazados al control',
  tags: ['!dev'],
  args: { id: 'avisos', helperText: 'Ayuda', errorMessage: 'Obligatorio' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole('switch', { name: 'Activar notificaciones' });
    await expect(control).toHaveAttribute('aria-invalid', 'true');
    await expect(control).toHaveClass('switcher--error');
    await expect(control).toHaveAttribute('aria-describedby', 'avisos-error avisos-helper');
    await expect(canvas.getByRole('alert')).toHaveTextContent('Obligatorio');
    await expect(canvas.getByText('Ayuda')).toHaveAttribute('id', 'avisos-helper');
    // La etiqueta apunta al disparador, no al input oculto de Base UI
    await expect(canvasElement.querySelector('label[for="avisos"]')).not.toBeNull();
    await expect(control).toHaveAttribute('id', 'avisos');
  },
};

export const ContratoTallas: Story = {
  name: 'Test — el interruptor mide su talla',
  tags: ['!dev'],
  render: () => (
    <div>
      <SwitcherField size="sm" label="Pequeño" />
      <SwitcherField size="md" label="Mediano" />
      <SwitcherField size="lg" label="Grande" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const box = (name: string) =>
      Math.round(canvas.getByRole('switch', { name }).getBoundingClientRect().height);
    await expect(box('Pequeño')).toBe(20);
    await expect(box('Mediano')).toBe(24);
    await expect(box('Grande')).toBe(30);
  },
};

type Valores = { avisos: boolean };

function resolver(values: Valores): ResolverResult<Valores> {
  if (values.avisos) return { values, errors: {} };
  return { values: {}, errors: { avisos: { type: 'required', message: 'Tienes que activar los avisos.' } } };
}

function FormularioRhf() {
  const form = useForm<Valores>({ defaultValues: { avisos: false }, resolver });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        style={{ display: 'grid', gap: '1rem', maxWidth: '24rem' }}
      >
        <FormField
          control={form.control}
          name="avisos"
          render={({ field, fieldState }) => (
            <SwitcherField
              ref={field.ref}
              name={field.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              onBlur={field.onBlur}
              disabled={field.disabled}
              label="Activar notificaciones"
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
    await expect(await canvas.findByRole('alert')).toHaveTextContent('Tienes que activar los avisos.');
    const control = canvas.getByRole('switch', { name: 'Activar notificaciones' });
    await expect(control).toHaveAttribute('aria-invalid', 'true');
    await userEvent.click(control);
    await expect(control).toBeChecked();
  },
};
