import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { useForm, type ResolverResult } from 'react-hook-form';
import { Button } from '../../atoms/Button/Button';
import { FormProvider, FormField } from '../FormField/FormField';
import { DropdownField } from './DropdownField';
import { Icon } from '../../atoms/Icon/Icon';

const ORDEN = [
  { value: 'recent', label: 'Más recientes' },
  { value: 'name', label: 'Por nombre' },
  { value: 'size', label: 'Por tamaño' },
];

function Controlado(props: Partial<React.ComponentProps<typeof DropdownField>>) {
  const [value, setValue] = useState('recent');
  const actual = ORDEN.find((o) => o.value === value)!;
  return (
    <DropdownField
      id="orden"
      label="Ordenar por"
      items={ORDEN.map((o) => ({ type: 'radio' as const, value: o.value, label: o.label }))}
      value={value}
      onValueChange={setValue}
      {...props}
    >
      {actual.label}
    </DropdownField>
  );
}

const meta: Meta<typeof DropdownField> = {
  title: 'Molecules/DropdownField',
  component: DropdownField,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { table: { disable: true } },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  render: (args) => <Controlado {...args} />,
};
export default meta;

type Story = StoryObj<typeof DropdownField>;

/** Etiqueta encima, como cualquier campo de formulario. */
export const PorDefecto: Story = {};

/** Etiqueta delante, en línea: para barras y paneles. */
export const EnLinea: Story = { args: { inline: true } };

/** Sin etiqueta visible: el nombre accesible va en `aria-label`. */
export const SinEtiqueta: Story = { args: { label: undefined, 'aria-label': 'Ordenar por' } };

/** El contenido del control admite icono. */
export const ConIcono: Story = {
  render: () => (
    <Controlado>
      <Icon name="sun" size="sm" />
      Claro
    </Controlado>
  ),
};

/** Las tres tallas del sistema. En las superficies públicas (web, hub sin autenticar) se usa `lg`; dentro de las aplicaciones, `md`. */
export const Tallas: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <Controlado size="sm" />
      <Controlado size="md" />
      <Controlado size="lg" />
    </div>
  ),
};

export const Deshabilitado: Story = { args: { disabled: true } };

export const ConAyuda: Story = {
  args: { helperText: 'El orden se guarda para la próxima visita.' },
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { helperText: 'El orden se guarda para la próxima visita.' },
};

/** El error se dice en texto y en el borde; nunca solo en color. */
export const ConError: Story = {
  args: {
    errorMessage: 'Elige un orden.',
    helperText: 'El orden se guarda para la próxima visita.',
  },
};

export const ContratoAyudaYError: Story = {
  name: 'Test — ayuda y error enlazados al control',
  tags: ['!dev'],
  args: { helperText: 'Ayuda', errorMessage: 'Obligatorio' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole('button', { name: 'Ordenar por' });
    await expect(control).toHaveAttribute('aria-invalid', 'true');
    await expect(control).toHaveAttribute('aria-describedby', 'orden-error orden-helper');
    await expect(canvas.getByRole('alert')).toHaveTextContent('Obligatorio');
    await expect(canvas.getByText('Ayuda')).toHaveAttribute('id', 'orden-helper');
  },
};

type Valores = { orden: string };

function resolver(values: Valores): ResolverResult<Valores> {
  if (values.orden) return { values, errors: {} };
  return { values: {}, errors: { orden: { type: 'required', message: 'Elige un orden.' } } };
}

function FormularioRhf() {
  const form = useForm<Valores>({ defaultValues: { orden: '' }, resolver });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        style={{ display: 'grid', gap: '1rem', justifyItems: 'start' }}
      >
        <FormField
          control={form.control}
          name="orden"
          render={({ field, fieldState }) => (
            <DropdownField
              ref={field.ref}
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
              onBlur={field.onBlur}
              disabled={field.disabled}
              label="Ordenar por"
              items={ORDEN.map((o) => ({ type: 'radio' as const, value: o.value, label: o.label }))}
              errorMessage={fieldState.error?.message}
            >
              {ORDEN.find((o) => o.value === field.value)?.label ?? 'Sin elegir'}
            </DropdownField>
          )}
        />
        <Button type="submit">Guardar</Button>
      </form>
    </FormProvider>
  );
}

/**
 * El control abre un `Menu` de Base UI: el contrato es `value`/`onValueChange`
 * + `name` + `ref` al disparador, no el spread del `field`.
 */
export const ConReactHookForm: Story = {
  name: 'Con react-hook-form',
  render: () => <FormularioRhf />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Guardar' }));
    await expect(await canvas.findByRole('alert')).toHaveTextContent('Elige un orden.');
    await expect(canvas.getByRole('button', { name: 'Ordenar por' })).toHaveAttribute('aria-invalid', 'true');
  },
};

export const Contrato: Story = {
  name: 'Test — etiqueta enlazada, control a talla, opciones exclusivas',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole('button', { name: 'Ordenar por' });
    await expect(Math.round(control.getBoundingClientRect().height)).toBe(40);
    const lg = canvasElement.querySelector('.dropdown-field--lg .dropdown-field__control');
    if (lg) await expect(Math.round(lg.getBoundingClientRect().height)).toBe(48);
    await expect(control.textContent).toContain('Más recientes');
    await userEvent.click(control);
    const opciones = await within(document.body).findAllByRole('menuitemradio');
    await expect(opciones).toHaveLength(3);
    // Abierto, el disparador lo dice (aria-expanded) y lo marca (data-popup-open): es lo que gira el chevron.
    const abierto = canvas.getByRole('button', { name: 'Ordenar por' });
    await expect(abierto).toHaveAttribute('aria-expanded', 'true');
    await expect(abierto).toHaveAttribute('data-popup-open');
    await userEvent.click(within(document.body).getByRole('menuitemradio', { name: 'Por nombre' }));
    await expect(canvas.getByRole('button', { name: 'Ordenar por' }).textContent).toContain('Por nombre');
  },
};

export const ContratoAriaLabel: Story = {
  name: 'Test — sin etiqueta visible, nombre por aria-label',
  tags: ['!dev'],
  args: { label: undefined, 'aria-label': 'Ordenar por' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Ordenar por' })).toBeInTheDocument();
    await expect(canvas.queryByText('Ordenar por')).toBeNull();
  },
};
