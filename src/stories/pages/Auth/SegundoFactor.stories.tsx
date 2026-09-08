import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { AuthPage } from './AuthPage';
import { Form } from '../../molecules/Form/Form';
import { InputField } from '../../molecules/InputField/InputField';
import { OtpField } from '../../molecules/OtpField/OtpField';
import { Link } from '../../atoms/Link/Link';
import { Button } from '../../atoms/Button/Button';
import { Heading } from '../../atoms/Heading/Heading';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Stack } from '../../atoms/Stack/Stack';

/** Los seis dígitos de un TOTP. */
const DIGITOS = 6;

const EXPLICACION = 'Introduce el código de 6 dígitos de tu aplicación autenticadora.';
const EXPLICACION_RECUPERACION = 'Introduce uno de los códigos de respaldo que guardaste al activar la autenticación en dos pasos. Cada código funciona una sola vez.';

interface Args {
  /** El código de respaldo, la salida de quien perdió el teléfono. */
  recovery: boolean;
  /** El código no vale: el error cuelga del campo, no del formulario. */
  invalidCode: boolean;
  surface: 'light' | 'dark';
}

function SegundoFactor({ recovery, invalidCode, surface }: Args) {
  const error = invalidCode ? 'Código inválido. Por favor, inténtalo de nuevo.' : undefined;
  return (
    // El título de la página sigue siendo el del acceso: el segundo factor no
    // es otra pantalla, es el segundo tramo de la misma. De ahí que su
    // encabezado sea un `h2` dentro de la columna del formulario.
    <AuthPage
      title="Inicia sesión"
      // La vuelta al formulario de acceso es un enlace en la columna de la
      // introducción, como en el resto de pantallas de auth; no un botón del pie.
      aside={<Link href="#acceso" icon="arrow-left">Volver al inicio de sesión</Link>}
      surface={surface}
    >
      {/* Título, explicación y formulario con el aire del sistema entre ellos:
          sin el `Stack`, la etiqueta del código queda pegada al párrafo. */}
      <Stack gap="lg" align="stretch">
        <Heading level={2}>Autenticación de dos factores</Heading>
        <Paragraph>{recovery ? EXPLICACION_RECUPERACION : EXPLICACION}</Paragraph>

        <Form
          size="lg"
          blockActions
          onSubmit={(e) => e.preventDefault()}
          actions={<Button variant="primary" type="submit">Verificar</Button>}
          links={
            // Cambiar de método: en `outline` —no en `text`— porque no es un
            // enlace a otra página, y a todo el ancho, como la acción.
            <Button variant="outline" type="button" block>
              {recovery ? 'Usar la app de autenticación' : 'Usar un código de recuperación'}
            </Button>
          }
        >
          {recovery ? (
            <InputField
              id="two-factor-recovery"
              label="Código de recuperación"
              maxLength={64}
              autoComplete="one-time-code"
              errorMessage={error}
            />
          ) : (
            <OtpField
              id="two-factor-code"
              label="Código de autenticación"
              length={DIGITOS}
              errorMessage={error}
            />
          )}
        </Form>
      </Stack>
    </AuthPage>
  );
}

const meta: Meta<typeof SegundoFactor> = {
  title: 'Pages/Segundo factor',
  component: SegundoFactor,
  parameters: { layout: 'fullscreen' },
  args: { recovery: false, invalidCode: false, surface: 'light' },
  argTypes: {
    recovery: { description: 'Código de respaldo en vez del de la app: un campo de texto, no las seis celdas.' },
    invalidCode: { description: 'El código no vale: el error cuelga del campo.' },
    surface: { control: { type: 'radio' }, options: ['light', 'dark'] },
  },
};
export default meta;
type Story = StoryObj<typeof SegundoFactor>;

/** El segundo tramo de `/sign-in`: seis celdas, cambiar de método y, en la columna de la introducción, la vuelta al acceso. */
export const PorDefecto: Story = {};

/** El código no vale: el mensaje cuelga del campo y las celdas quedan en error. */
export const CodigoInvalido: Story = { name: 'Código inválido', args: { invalidCode: true } };

/** Sin el teléfono: uno de los códigos de respaldo, que es texto y no seis dígitos. */
export const CodigoDeRecuperacion: Story = { name: 'Código de recuperación', args: { recovery: true } };

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { surface: 'dark' },
};

export const Contrato: Story = {
  name: 'Test — un h1, seis celdas y las dos salidas en outline',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // El h1 sigue siendo el de la página de acceso; el del paso es un h2.
    await expect(canvas.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    await expect(canvas.getByRole('heading', { level: 2 }).textContent).toBe('Autenticación de dos factores');
    await expect(canvasElement.querySelector('main#main-content')).not.toBeNull();
    await expect(canvasElement.querySelectorAll('.otp-input__cell')).toHaveLength(DIGITOS);
    // Cambiar de método: outline y a todo el ancho. La vuelta ya no es un
    // botón del pie: es el enlace de la columna de la introducción.
    const cambiar = canvas.getByRole('button', { name: 'Usar un código de recuperación' });
    await expect(cambiar).toHaveClass('button--outline');
    await expect(cambiar).toHaveClass('button--block');
    await expect(canvas.queryByRole('button', { name: 'Volver' })).toBeNull();
    await expect(canvas.getByRole('link', { name: 'Volver al inicio de sesión' })).toBeVisible();
    // La talla la reparte el `Form`: superficie pública, controles `lg`.
    await expect(canvas.getByRole('button', { name: 'Verificar' })).toHaveClass('button--lg');
  },
};

export const ContratoCodigoInvalido: Story = {
  name: 'Test — el error del código cuelga del campo',
  tags: ['!dev'],
  args: { invalidCode: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('alert').textContent).toContain('Código inválido');
    // Es un error de campo, no del formulario: no está en la lista de errores
    // del `Form`, que es la que anuncia lo que no cuelga de ningún campo.
    await expect(canvasElement.querySelector('.form__errors')).toBeNull();
  },
};
