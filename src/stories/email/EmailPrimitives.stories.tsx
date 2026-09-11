import type { Meta, StoryObj } from '@storybook/react-vite';

import { EmailLayout } from './EmailLayout';
import { EmailPreview } from './EmailPreview';
import {
  EmailButton,
  EmailCallout,
  EmailCode,
  EmailColumn,
  EmailColumns,
  EmailDivider,
  EmailHeading,
  EmailKeyValue,
  EmailLink,
  EmailList,
  EmailListItem,
  EmailNote,
  EmailQuote,
  EmailSectionTitle,
  EmailTag,
  EmailText,
} from './EmailPrimitives';

/*
 * Las primitivas no se pueden enseñar sueltas: fuera de un `EmailLayout` no
 * tienen documento, ni fuente, ni reglas de tema. Así que van todas dentro de
 * un correo, que además es como se usan.
 *
 * Van en dos correos porque son dos oficios distintos: lo que el correo DICE
 * (título, prosa, enlace, acción) y lo que el correo ORDENA cuando tiene mucho
 * que decir (bloques, listas, avisos, datos).
 */
const meta: Meta = {
  title: 'Email/Primitivas',
  parameters: { layout: 'fullscreen' },
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
    <EmailHeading>Bloques</EmailHeading>
    <EmailText>
      Un correo con mucho que decir se parte en bloques. Estas son las piezas con las que se
      parte, y son las mismas para las diez apps de la suite.
    </EmailText>

    <EmailSectionTitle>EmailSectionTitle</EmailSectionTitle>
    <EmailText>
      Encabeza un bloque. Es un título más pequeño que el del correo —dos peldaños por debajo— y
      va como «h2»: ni versalitas ni gris, que es lo que se inventaba cada plantilla.
    </EmailText>

    <EmailSectionTitle>EmailList / EmailListItem</EmailSectionTitle>
    <EmailList>
      <EmailListItem>Una lista de verdad, con su «ul» y sus «li».</EmailListItem>
      <EmailListItem>
        Un lector de pantalla sabe cuántos elementos hay; con un bolo escrito a mano, no.
      </EmailListItem>
      <EmailListItem>«ordered» la vuelve numerada, para pasos que van en orden.</EmailListItem>
    </EmailList>

    <EmailSectionTitle>EmailCallout</EmailSectionTitle>
    <EmailCallout tone="info">
      <EmailText style={{ margin: 0 }}>«info»: la voz de la casa, en el prusia de la marca.</EmailText>
    </EmailCallout>
    <EmailCallout tone="success">
      <EmailText style={{ margin: 0 }}>«success»: salió bien.</EmailText>
    </EmailCallout>
    <EmailCallout tone="warning">
      <EmailText style={{ margin: 0 }}>«warning»: mira esto antes de seguir.</EmailText>
    </EmailCallout>
    <EmailCallout tone="error">
      <EmailText style={{ margin: 0 }}>«error»: no salió.</EmailText>
    </EmailCallout>
    <EmailNote tone="plain">
      Los cuatro son rellenos, no barras de color: el aviso solo existe como relleno —el amarillo
      de marca no llega al contraste que pide WCAG como tinta— y el tono con menos margen manda
      sobre la forma de los cuatro.
    </EmailNote>

    <EmailSectionTitle>EmailTag</EmailSectionTitle>
    <EmailText>
      El mismo juego de tonos a tamaño de pastilla:{' '}
      <EmailTag tone="success">Validado</EmailTag>{' '}
      <EmailTag tone="warning">Con avisos</EmailTag>{' '}
      <EmailTag tone="error">Rechazado</EmailTag>
    </EmailText>

    <EmailSectionTitle>EmailQuote</EmailSectionTitle>
    <EmailQuote>
      <EmailText style={{ margin: 0 }}>
        Palabras que no son nuestras. No lleva tono: citar no es avisar.
      </EmailText>
    </EmailQuote>

    <EmailSectionTitle>EmailColumns / EmailColumn</EmailSectionTitle>
    <EmailColumns>
      <EmailColumn width="50%">
        <EmailKeyValue label="EmailKeyValue">Un dato con su nombre encima</EmailKeyValue>
      </EmailColumn>
      <EmailColumn width="50%">
        <EmailKeyValue label="Importe">412.500,00 €</EmailKeyValue>
      </EmailColumn>
    </EmailColumns>
    <EmailNote tone="plain">
      Las columnas no se apilan en el móvil: Outlook ignora las media queries. Dos, y de cosas
      cortas.
    </EmailNote>

    <EmailDivider />

    <EmailSectionTitle>EmailCode</EmailSectionTitle>
    <EmailText>La clave que solo se enseña una vez, en mono y cortable:</EmailText>
    <EmailCode>slxd_lk_7f2b9c41e08a4d5fb63e19a70c8d425f</EmailCode>
  </EmailLayout>
);

/** El correo como texto: título, prosa, enlace y acción. */
export const TextoYAccion: Story = {
  name: 'Texto y acción',
  render: () => <EmailPreview>{texto}</EmailPreview>,
};

/** El correo como documento: bloques, listas, avisos, datos y claves. */
export const Bloques: Story = {
  render: () => <EmailPreview>{bloques}</EmailPreview>,
};
