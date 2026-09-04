import type { Meta, StoryObj } from '@storybook/react-vite';

import { EmailLayout } from './EmailLayout';
import { EmailPreview } from './EmailPreview';
import { EmailButton, EmailHeading, EmailNote, EmailText } from './EmailPrimitives';

const meta: Meta<typeof EmailLayout> = {
  title: 'Email/EmailLayout',
  component: EmailLayout,
  parameters: { layout: 'fullscreen' },
  args: {
    preview: 'Confirma tu dirección para terminar de crear tu cuenta',
    appName: 'Bricks',
    // En el catálogo los assets salen de `public/`. En producción el valor por
    // defecto es `https://slxd.app/brand/email`.
    assetsBaseUrl: '/email',
    children: (
      <>
        <EmailHeading>Confirma tu correo</EmailHeading>
        <EmailText>
          Hola, Ana. Confirma tu dirección para terminar de crear tu cuenta en Bricks.
        </EmailText>
        <EmailButton href="#confirmar">Confirmar mi correo</EmailButton>
        <EmailNote>El enlace caduca en 24 horas. Si no has sido tú, ignora este correo.</EmailNote>
      </>
    ),
  },
  argTypes: {
    children: { table: { disable: true } },
  },
  /* El correo es un documento HTML completo: se renderiza a texto y se mira en
     un iframe, que es lo más parecido a lo que hace un cliente de correo. */
  render: (args, { parameters }) => (
    <EmailPreview theme={parameters.surface === 'dark' ? 'dark' : 'light'}>
      <EmailLayout {...args} />
    </EmailPreview>
  ),
};
export default meta;
type Story = StoryObj<typeof EmailLayout>;

/** Correo transaccional: no pertenece a ninguna categoría, así que no lleva pie de baja. */
export const Transaccional: Story = {};

/** Aviso de una categoría, con baja de un clic y sin pantalla de preferencias detrás. */
export const ConBaja: Story = {
  name: 'Con baja',
  args: {
    optOut: { unsubscribeUrl: '#baja' },
  },
};

/** Con pantalla de preferencias: el pie completo, para quien quiera conservar algunos avisos. */
export const ConPreferencias: Story = {
  name: 'Con preferencias',
  args: {
    optOut: { unsubscribeUrl: '#baja', preferencesUrl: '#preferencias' },
  },
};

/**
 * La banda de marca se queda blanca también aquí: es lo que garantiza que el
 * logotipo caiga siempre sobre blanco. El recuadro del mensaje sí responde.
 */
export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: {
    optOut: { unsubscribeUrl: '#baja', preferencesUrl: '#preferencias' },
  },
};
