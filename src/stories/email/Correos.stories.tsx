import type { Meta, StoryObj } from '@storybook/react-vite';

import { EmailLayout } from './EmailLayout';
import { EmailPreview } from './EmailPreview';
import { EmailButton, EmailHeading, EmailLink, EmailNote, EmailText } from './EmailPrimitives';

/*
 * Dos correos enteros, con datos falsos, del mismo corte que los que manda hoy
 * la suite: uno transaccional (sin categoría, sin baja) y uno de aviso (con
 * categoría, con baja y preferencias).
 *
 * Las plantillas de verdad NO viven aquí —son producto y se quedan en su
 * repo—; esto es el catálogo enseñando qué sale del sistema cuando se monta un
 * correo con él.
 */
const meta: Meta = {
  title: 'Email/Correos de ejemplo',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

const verificar = (
  <EmailLayout
    preview="Confirma tu dirección para terminar de crear tu cuenta"
    appName="Bricks"
    assetsBaseUrl="/email"
  >
    <EmailHeading>Confirma tu correo</EmailHeading>
    <EmailText>
      Hola, Ana. Ya casi está: confirma tu dirección y podrás entrar en Bricks con ella.
    </EmailText>
    <EmailButton href="#confirmar">Confirmar mi correo</EmailButton>
    <EmailNote>
      El enlace caduca en 24 horas. Si no has sido tú quien ha pedido esta cuenta, ignora este
      correo y no pasará nada.
    </EmailNote>
  </EmailLayout>
);

const exportacion = (
  <EmailLayout
    preview="Tu exportación de «Formación en prevención» está lista"
    appName="360"
    assetsBaseUrl="/email"
    optOut={{ unsubscribeUrl: '#baja', preferencesUrl: '#preferencias' }}
  >
    <EmailHeading>Tu exportación está lista</EmailHeading>
    <EmailText>
      Hola, Ana. La exportación de «Formación en prevención» ha terminado: 1.284 registros, 2,4 MB.
    </EmailText>
    <EmailButton href="#descargar">Descargar el archivo</EmailButton>
    <EmailNote>
      El enlace de descarga estará disponible siete días. Después habrá que volver a lanzar la
      exportación desde <EmailLink href="#informes">Informes</EmailLink>.
    </EmailNote>
  </EmailLayout>
);

/** Correo transaccional: verificación de dirección. Sin pie de baja. */
export const VerificarCorreo: Story = {
  name: 'Verificar el correo',
  render: () => <EmailPreview>{verificar}</EmailPreview>,
};

/** Aviso de una categoría: lleva baja de un clic y enlace a preferencias. */
export const ExportacionLista: Story = {
  name: 'Exportación lista',
  render: () => <EmailPreview>{exportacion}</EmailPreview>,
};
