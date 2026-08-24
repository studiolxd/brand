import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo } from 'react';
import { useForm, type FieldErrors } from 'react-hook-form';
import { Button } from '../../atoms/Button/Button';
import { Input } from '../../atoms/Input/Input';
import { Textarea } from '../../atoms/Textarea/Textarea';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
  FormRootMessage,
} from './FormField';

type Values = { email: string; bio: string };

function ProfileForm({
  errors = {},
  rootError,
}: {
  errors?: Partial<Record<keyof Values, string>>;
  rootError?: string;
}) {
  // `errors` lo vigila react-hook-form por referencia: un literal nuevo en
  // cada render reinyectaría los errores en bucle.
  const formErrors = useMemo(
    () =>
      ({
        ...(errors.email ? { email: { type: 'manual', message: errors.email } } : {}),
        ...(errors.bio ? { bio: { type: 'manual', message: errors.bio } } : {}),
        ...(rootError ? { root: { type: 'manual', message: rootError } } : {}),
      }) as FieldErrors<Values>,
    [errors.email, errors.bio, rootError],
  );
  const form = useForm<Values>({
    defaultValues: { email: '', bio: '' },
    errors: formErrors,
  });

  return (
    <FormProvider {...form}>
      <form style={{ display: 'grid', gap: '1.5rem', maxWidth: '28rem' }}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input type="email" placeholder="nombre@empresa.com" {...field} />
              </FormControl>
              <FormDescription>Solo lo usamos para avisos de la cuenta.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biografía</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormRootMessage />
        <Button type="submit">Guardar</Button>
      </form>
    </FormProvider>
  );
}

const meta = {
  title: 'Molecules/FormField',
  component: ProfileForm,
} satisfies Meta<typeof ProfileForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Campos con ayuda',
  args: {},
};

export const ConError: Story = {
  name: 'Con error de campo',
  args: { errors: { email: 'Ese correo ya está registrado.' } },
};

export const ConErrorDeFormulario: Story = {
  name: 'Con error de formulario',
  args: { rootError: 'No hemos podido guardar los cambios. Inténtalo de nuevo.' },
};
