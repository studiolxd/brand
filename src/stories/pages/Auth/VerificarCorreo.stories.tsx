import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuthPage } from './AuthPage';
import { Form } from '../../molecules/Form/Form';
import { Button } from '../../atoms/Button/Button';
import { Link } from '../../atoms/Link/Link';

interface Args { sent: boolean; surface: 'light' | 'dark' }

function Verificar({ sent, surface }: Args) {
  return (
    <AuthPage
      title="Revisa tu correo"
      description="Enviamos un enlace de verificación a ana@studiolxd.com"
      aside={<Link href="#acceso" icon="arrow-left">Iniciar sesión con otra cuenta</Link>}
      surface={surface}
    >
      <Form
        size="lg"
        blockActions
        onSubmit={(e) => e.preventDefault()}
        success={sent ? 'Correo de verificación enviado.' : undefined}
        actions={<Button>Reenviar correo</Button>}
      />
    </AuthPage>
  );
}

const meta: Meta<typeof Verificar> = {
  title: 'Pages/Verificar correo',
  component: Verificar,
  parameters: { layout: 'fullscreen' },
  args: { sent: false, surface: 'light' },
  argTypes: { surface: { control: { type: 'radio' }, options: ['light', 'dark'] } },
};
export default meta;
type Story = StoryObj<typeof Verificar>;

/** `/verify-email`: un Form sin campos —reenviar, en primary— y, en la columna de la introducción, el enlace para entrar con otra cuenta (como «Recuperar contraseña»). */
export const PorDefecto: Story = {};
export const Reenviado: Story = { args: { sent: true } };

