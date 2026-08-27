import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuthPage, SocialButtons, Captcha } from './AuthPage';
import { Form } from '../../molecules/Form/Form';
import { InputField } from '../../molecules/InputField/InputField';
import { PasswordField } from '../../molecules/PasswordField/PasswordField';
import { CheckboxField } from '../../molecules/CheckboxField/CheckboxField';
import { Button } from '../../atoms/Button/Button';
import { Link } from '../../atoms/Link/Link';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';

const HINT = 'Al menos 8 caracteres, con una letra minúscula, una letra mayúscula, un número y un símbolo: ! @ # $ % ^ & * ( ) - _ = + [ ] { } ; : , . ?';

interface Args { socialProviders: string[]; captcha: boolean; terms: boolean; passwordError: boolean; surface: 'light' | 'dark' }

function Registro({ socialProviders, captcha, terms, passwordError, surface }: Args) {
  return (
    <AuthPage title="Crea una cuenta" surface={surface}>
      <Form
        size="lg"
        onSubmit={(e) => e.preventDefault()}
        captcha={captcha ? <Captcha /> : undefined}
        actions={<Button variant="primary" type="submit">Crear cuenta</Button>}
        links={<Paragraph>¿Ya tienes una cuenta? <Link href="#acceso">Inicia sesión</Link></Paragraph>}
        alternativesLabel={socialProviders.length ? 'O continúa con' : undefined}
        alternatives={socialProviders.length ? <SocialButtons providers={socialProviders} /> : undefined}
      >
        <InputField id="registro-email" label="Correo electrónico" type="email" autoComplete="email" />
        <PasswordField id="registro-password" label="Contraseña" labelHidden={false} autoComplete="new-password" helperText={HINT} errorMessage={passwordError ? 'Incluye al menos un símbolo: ! @ # $ % ^ & * ( ) - _ = + [ ] { } ; : , . ?' : undefined} />
        {terms && <CheckboxField id="registro-terms" label={<>Acepto los <Link href="#condiciones">términos y condiciones</Link></>} />}
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
export const PorDefecto: Story = {};
export const Completa: Story = { args: { socialProviders: ['google', 'github'], captcha: true, terms: true } };
export const ConErrorDePolitica: Story = { args: { passwordError: true } };
export const SuperficieOscura: Story = { args: { ...Completa.args, surface: 'dark' } };
export const EnMovil: Story = { args: Completa.args, globals: { viewport: { value: 'mobile1' } } };
