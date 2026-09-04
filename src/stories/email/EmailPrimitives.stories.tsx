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
      superficie de aplicación. Dentro admite un <EmailLink href="#enlace">EmailLink</EmailLink>,
      que va subrayado porque en un correo el color solo no basta para distinguirlo.
    </EmailText>
    <EmailButton href="#accion">EmailButton</EmailButton>
    <EmailNote>
      «EmailNote» en tinta secundaria: el descargo que sigue a todo botón. La
      separación por encima la pone el propio botón.
    </EmailNote>
  </EmailLayout>
);

export const Todas: Story = {
  render: () => <EmailPreview>{correo}</EmailPreview>,
};
