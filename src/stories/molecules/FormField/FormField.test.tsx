import { useMemo } from 'react';
import { describe, it, expect } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, type FieldErrors } from 'react-hook-form';
import { Input } from '../../atoms/Input/Input';
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

type Values = { email: string };

/** Campo pelado: sin ayuda ni mensaje, para comprobar que no quedan ids fantasma. */
function BareHarness({ describedBy }: { describedBy?: string }) {
  const form = useForm<Values>({ defaultValues: { email: '' } });
  return (
    <FormProvider {...form}>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Correo</FormLabel>
            <FormControl>
              <Input {...field} aria-describedby={describedBy} />
            </FormControl>
          </FormItem>
        )}
      />
      {describedBy && <p id={describedBy}>Pista del consumidor</p>}
    </FormProvider>
  );
}

function Harness({
  fieldError,
  rootError,
  onSubmit,
  translate,
}: {
  fieldError?: string;
  rootError?: string;
  onSubmit?: (values: Values) => void;
  translate?: (message: string) => string;
}) {
  // `errors` lo vigila react-hook-form por referencia: un literal nuevo en
  // cada render reinyectaría los errores en bucle.
  const errors = useMemo(
    () =>
      ({
        ...(fieldError ? { email: { type: 'manual', message: fieldError } } : {}),
        ...(rootError ? { root: { type: 'manual', message: rootError } } : {}),
      }) as FieldErrors<Values>,
    [fieldError, rootError],
  );
  const form = useForm<Values>({ defaultValues: { email: '' }, errors });

  return (
    <FormProvider {...form} translate={translate}>
      <form onSubmit={form.handleSubmit((values) => onSubmit?.(values))}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Nunca lo compartimos.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormRootMessage />
        <button type="submit">Enviar</button>
      </form>
    </FormProvider>
  );
}

describe('FormField', () => {
  it('enlaza la etiqueta con el control', () => {
    render(<Harness />);
    expect(screen.getByLabelText('Correo')).toBeInTheDocument();
  });

  it('enlaza la ayuda al control por aria-describedby', () => {
    render(<Harness />);
    const input = screen.getByLabelText('Correo');
    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)).toHaveTextContent('Nunca lo compartimos.');
  });

  it('sin error, el control no está marcado como inválido y no hay mensaje', () => {
    render(<Harness />);
    expect(screen.getByLabelText('Correo')).toHaveAttribute('aria-invalid', 'false');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('con error, marca el control y anuncia el mensaje enlazándolo también', () => {
    render(<Harness fieldError="Correo no válido" />);
    const input = screen.getByLabelText('Correo');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Correo no válido');
    expect(input.getAttribute('aria-describedby')).toContain(alert.id);
  });

  it('el error del formulario se anuncia aunque no cuelgue de ningún campo', () => {
    render(<Harness rootError="No hemos podido guardar" />);
    expect(screen.getByRole('alert')).toHaveTextContent('No hemos podido guardar');
  });

  it('con `translate`, los mensajes (claves) se traducen antes de pintarse, en el campo y en la raíz', () => {
    const diccionario: Record<string, string> = {
      'errors.email': 'Ese correo no vale',
      'errors.root': 'No hemos podido guardar',
    };
    render(<Harness fieldError="errors.email" rootError="errors.root" translate={(k) => diccionario[k] ?? k} />);
    const alerts = screen.getAllByRole('alert').map((el) => el.textContent);
    expect(alerts).toEqual(['Ese correo no vale', 'No hemos podido guardar']);
  });

  it('sin ayuda ni mensaje no emite `aria-describedby`: no apunta a nada', () => {
    render(<BareHarness />);
    expect(screen.getByLabelText('Correo')).not.toHaveAttribute('aria-describedby');
  });

  it('conserva el `aria-describedby` que trae el consumidor, y lo combina con el suyo', () => {
    render(<Harness />);
    // El campo completo ya tiene su ayuda; aquí basta con que exista y apunte a algo real.
    const conAyuda = screen.getByLabelText('Correo');
    expect(document.getElementById(conAyuda.getAttribute('aria-describedby')!)).toBeInTheDocument();

    cleanup();
    render(<BareHarness describedBy="pista-propia" />);
    const input = screen.getByLabelText('Correo');
    expect(input.getAttribute('aria-describedby')).toBe('pista-propia');
    expect(document.getElementById('pista-propia')).toHaveTextContent('Pista del consumidor');
  });

  it('el control escribe en el formulario', async () => {
    const user = userEvent.setup();
    let submitted: Values | undefined;
    render(<Harness onSubmit={(values) => { submitted = values; }} />);
    await user.type(screen.getByLabelText('Correo'), 'ada@studiolxd.com');
    await user.click(screen.getByRole('button', { name: 'Enviar' }));
    expect(submitted).toEqual({ email: 'ada@studiolxd.com' });
  });
});
