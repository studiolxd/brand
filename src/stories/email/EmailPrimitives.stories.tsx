import type { Meta, StoryObj } from '@storybook/react-vite';

import { EmailLayout } from './EmailLayout';
import { EmailPreview } from './EmailPreview';
import {
  EmailButton,
  EmailDivider,
  EmailHeading,
  EmailLink,
  EmailList,
  EmailListItem,
  EmailNote,
  EmailQuote,
  EmailTag,
  EmailText,
} from './EmailPrimitives';
import { SOLO_CLARO } from '../utils/chromaticModes';

/*
 * Las primitivas no se pueden enseñar sueltas: fuera de un `EmailLayout` no
 * tienen documento, ni fuente, ni reglas de tema. Así que van todas dentro de
 * un correo, que además es como se usan.
 *
 * Van en dos correos porque son dos oficios distintos: lo que el correo DICE
 * —título, prosa, enlace, acción— y lo que el correo necesita cuando tiene
 * demasiado que decir de un tirón: bloques, listas, citas y veredictos.
 */
const meta: Meta = {
  title: 'Email/Primitivas',
  // El correo no gestiona modo oscuro (ver § «El correo» en CLAUDE.md).
  parameters: { layout: 'fullscreen', chromatic: SOLO_CLARO },
};
export default meta;
type Story = StoryObj;

const texto = (
  <EmailLayout preview="Todas las piezas del correo" appName="Studio LXD" assetsBaseUrl="/email">
    <EmailHeading>EmailHeading</EmailHeading>
    <EmailText emphasis>
      «EmailText» con «emphasis»: la frase que resume el correo antes de entrar en el detalle.
      Sube al peso de énfasis del sistema y no cambia nada más.
    </EmailText>
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

const bloques = (
  <EmailLayout preview="Los bloques del correo" appName="Studio LXD" assetsBaseUrl="/email">
    <EmailHeading>Un correo largo</EmailHeading>
    <EmailText emphasis>
      Cuatro piezas para un correo que no cabe en tres párrafos. Son las que hoy escribe a mano
      algún correo de la suite, y ninguna más.
    </EmailText>

    <EmailHeading level={2}>EmailHeading level=2</EmailHeading>
    <EmailText>
      El título de un bloque: el segundo escalón del mismo componente, dos peldaños por debajo
      del título del mensaje y con aire por encima, que es lo que hace de él un corte. No es una
      versalita gris a 12px, que es lo que se inventó el aviso de licitaciones de Tender.
    </EmailText>

    <EmailHeading level={2}>EmailList / EmailListItem</EmailHeading>
    <EmailList>
      <EmailListItem>Una lista de verdad, con su «ul» y sus «li».</EmailListItem>
      <EmailListItem>
        Un lector de pantalla sabe cuántos elementos hay; con un bolo escrito a mano delante de
        un párrafo, no.
      </EmailListItem>
      <EmailListItem>«ordered» la vuelve numerada, para pasos que van en orden.</EmailListItem>
    </EmailList>

    <EmailHeading level={2}>EmailQuote</EmailHeading>
    <EmailQuote>
      <EmailText style={{ margin: 0 }}>
        Palabras que no son nuestras: lo que escribió quien denunció un plugin, el motivo con el
        que se rechazó algo. No lleva tono — citar no es avisar.
      </EmailText>
    </EmailQuote>

    <EmailHeading level={2}>EmailTag</EmailHeading>
    <EmailText>
      El veredicto como pastilla, en sus tres tonos:{' '}
      <EmailTag tone="success">Validado</EmailTag>{' '}
      <EmailTag tone="warning">Con avisos</EmailTag>{' '}
      <EmailTag tone="error">Rechazado</EmailTag>
    </EmailText>
    <EmailNote tone="plain">
      Los tres son rellenos, no tinta suelta: el amarillo de marca no llega al contraste que pide
      WCAG como color de texto, así que el aviso solo existe como relleno — y el tono con menos
      margen manda sobre la forma de los tres.
    </EmailNote>

    <EmailDivider />

    <EmailHeading level={2}>EmailDivider</EmailHeading>
    <EmailText>
      La línea de ahí arriba. Parte el correo en dos: lo que se cuenta con detalle y lo que solo
      se lista.
    </EmailText>
  </EmailLayout>
);

/** El correo como texto: título, prosa, enlace y acción. */
export const TextoYAccion: Story = {
  name: 'Texto y acción',
  render: () => <EmailPreview>{texto}</EmailPreview>,
};

/** El correo como documento: bloques, listas, citas y veredictos. */
export const Bloques: Story = {
  render: () => <EmailPreview>{bloques}</EmailPreview>,
};
