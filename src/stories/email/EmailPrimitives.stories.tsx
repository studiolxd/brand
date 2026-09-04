import type { Meta, StoryObj } from '@storybook/react-vite';

import { EmailLayout } from './EmailLayout';
import { EmailPreview } from './EmailPreview';
import { EmailButton, EmailHeading, EmailLink, EmailNote, EmailText } from './EmailPrimitives';

/*
 * Las primitivas no se pueden enseñar sueltas: fuera de un `EmailLayout` no
 * tienen documento, ni fuente, ni reglas de tema. Así que van todas dentro de
 * un correo, que además es como se usan.
 */
const meta: Meta = {
  title: 'Email/Primitivas',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

const correo = (
  <EmailLayout preview="Todas las piezas del correo" appName="Studio LXD" assetsBaseUrl="/email">
    <EmailHeading>EmailHeading</EmailHeading>
    <EmailText>
      «EmailText» es el párrafo del cuerpo: la sans del sistema al tamaño de la
      superficie pública, que es la del correo. Dentro admite un <EmailLink href="#enlace">EmailLink</EmailLink>,
      que va subrayado porque en un correo el color solo no basta para distinguirlo.
    </EmailText>
    <EmailButton
      href="https://bricks.slxd.app/verificar-correo?token=8f3a1c9e4b274d6a9f012c5e7a8b3d40&uid=41827&redirect=%2Fpanel"
      fallbackLabel="O copia y pega esta dirección en el navegador:"
    >
      EmailButton
    </EmailButton>
    <EmailNote>
      «EmailNote» en tinta secundaria: el descargo que cierra el mensaje. Encima va
      el enlace de respaldo que «EmailButton» trae consigo — la misma dirección en
      texto, entera y cortable, para quien no pueda pulsar el botón.
    </EmailNote>
  </EmailLayout>
);

export const Todas: Story = {
  render: () => <EmailPreview>{correo}</EmailPreview>,
};
