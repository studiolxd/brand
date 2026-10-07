import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuthPage, SocialButtons, Captcha } from './AuthPage';
import { Form } from '../../molecules/Form/Form';
import { InputField } from '../../molecules/InputField/InputField';
import { PasswordField } from '../../molecules/PasswordField/PasswordField';
import { CheckboxField } from '../../molecules/CheckboxField/CheckboxField';
import { Button } from '../../atoms/Button/Button';
import { Link } from '../../atoms/Link/Link';
import { SIN_LINK_IN_TEXT_BLOCK } from '../../utils/a11y';

const HINT = 'Al menos 8 caracteres, con una letra minúscula, una letra mayúscula, un número y un símbolo: ! @ # $ % ^ & * ( ) - _ = + [ ] { } ; : , . ?';

interface Args { socialProviders: string[]; captcha: boolean; terms: boolean; passwordError: boolean; surface: 'light' | 'dark' }

function Registro({ socialProviders, captcha, terms, passwordError, surface }: Args) {
  return (
    <AuthPage title="Crea una cuenta" description={<>¿Ya tienes una cuenta? <Link href="#acceso">Inicia sesión</Link></>} surface={surface}>
      <Form
        size="lg"
        blockActions
        onSubmit={(e) => e.preventDefault()}
        captcha={captcha ? <Captcha /> : undefined}
        actions={<Button variant="primary" type="submit">Crear cuenta</Button>}
        alternativesLabel={socialProviders.length ? 'O continúa con' : undefined}
        alternatives={socialProviders.length ? <SocialButtons providers={socialProviders} /> : undefined}
      >
        <InputField id="sign-up-email" label="Correo electrónico" type="email" autoComplete="email" placeholder="Escribe tu correo electrónico" />
        <PasswordField id="sign-up-password" label="Contraseña" autoComplete="new-password" helperText={HINT} errorMessage={passwordError ? 'Incluye al menos un símbolo: ! @ # $ % ^ & * ( ) - _ = + [ ] { } ; : , . ?' : undefined} />
        {terms && (
          <CheckboxField
            id="sign-up-terms"
            label={
              <>
                Acepto los <Link href="#condiciones" external>Términos del servicio</Link> y la{' '}
                <Link href="#privacidad" external>Política de privacidad</Link>.
              </>
            }
          />
        )}
      </Form>
    </AuthPage>
  );
}

const meta: Meta<typeof Registro> = {
  title: 'Pages/Registro',
  component: Registro,
  parameters: { layout: 'fullscreen' },
  args: { socialProviders: [], captcha: false, terms: false, passwordError: false, surface: 'light' },
  argTypes: {
    socialProviders: { control: { type: 'check' }, options: ['google', 'github', 'keycloak'] },
    surface: { control: { type: 'radio' }, options: ['light', 'dark'] },
  },
};
export default meta;
type Story = StoryObj<typeof Registro>;

/** Correo y contraseña con la política completa en la ayuda. Es `/sign-up` de hub. */
// a11y falso positivo (D43): `link-in-text-block` en oscuro. El enlace va
// dentro de texto corrido y lleva su línea en reposo, pero axe no ve una
// línea pintada con `box-shadow` (regla 7). Ver `SIN_LINK_IN_TEXT_BLOCK`.
export const PorDefecto: Story = { parameters: { a11y: SIN_LINK_IN_TEXT_BLOCK } };
// a11y falso positivo (D43): `link-in-text-block` en oscuro. El enlace va
// dentro de texto corrido y lleva su línea en reposo, pero axe no ve una
// línea pintada con `box-shadow` (regla 7). Ver `SIN_LINK_IN_TEXT_BLOCK`.
export const Completa: Story = { args: { socialProviders: ['google', 'github'], captcha: true, terms: true }, parameters: { a11y: SIN_LINK_IN_TEXT_BLOCK } };
// a11y falso positivo (D43): `link-in-text-block` en oscuro. El enlace va
// dentro de texto corrido y lleva su línea en reposo, pero axe no ve una
// línea pintada con `box-shadow` (regla 7). Ver `SIN_LINK_IN_TEXT_BLOCK`.
export const ConErrorDePolitica: Story = { args: { passwordError: true }, parameters: { a11y: SIN_LINK_IN_TEXT_BLOCK } };
