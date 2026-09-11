import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';

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
 * Dos correos enteros, con datos falsos, del mismo corte que los que manda hoy
 * la suite. Las direcciones son largas de verdad, con su token: es el caso que
 * rompe el ancho, y el que tiene que verse en el catálogo.
 *
 * Los cuatro correos son: uno transaccional (sin categoría, sin baja), uno de aviso
 * (con categoría, con baja y preferencias) y dos de producto —un resumen largo y
 * una clave que solo se ve una vez— montados con todas las primitivas.
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
    <EmailButton
      href="https://bricks.slxd.app/verificar-correo?token=8f3a1c9e4b274d6a9f012c5e7a8b3d40&uid=41827&redirect=%2Fpanel"
      fallbackLabel="O copia y pega esta dirección en el navegador:"
    >
      Confirmar mi correo
    </EmailButton>
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
    <EmailButton
      href="https://360.slxd.app/informes/exportaciones/descargar?id=7b21e0c5&token=c4d9a1f60e8b47239ac5d10f6e2b8471"
      fallbackLabel="O copia y pega esta dirección en el navegador:"
    >
      Descargar el archivo
    </EmailButton>
    <EmailNote>
      El enlace de descarga estará disponible siete días. Después habrá que volver a lanzar la
      exportación desde <EmailLink href="#informes">Informes</EmailLink>.
    </EmailNote>
  </EmailLayout>
);


/*
 * El tercero es un correo de PRODUCTO montado entero con primitivas: el aviso
 * de licitaciones que hoy escribe `tender` con veintitantos objetos de estilo a
 * mano. Está aquí para enseñar que no hacen falta — y para que, cuando una app
 * necesite algo que no está, se vea contra qué se compara.
 */
const licitaciones = (
  <EmailLayout
    preview="Tres licitaciones nuevas encajan con tus perfiles"
    appName="Tender"
    assetsBaseUrl="/email"
    optOut={{ unsubscribeUrl: '#baja', preferencesUrl: '#preferencias' }}
  >
    <EmailHeading>Tres licitaciones nuevas</EmailHeading>
    <EmailText emphasis>
      Tres anuncios publicados esta semana encajan con tus perfiles de interés. El más ajustado
      cierra en nueve días.
    </EmailText>

    <EmailSectionTitle>Servicio de mantenimiento de zonas verdes</EmailSectionTitle>
    <EmailText>
      <EmailTag tone="success">Encaje 92</EmailTag>
    </EmailText>
    <EmailColumns>
      <EmailColumn width="50%">
        <EmailKeyValue label="Órgano de contratación">
          Ayuntamiento de Valdepeñas
        </EmailKeyValue>
      </EmailColumn>
      <EmailColumn width="50%">
        <EmailKeyValue label="Presupuesto base">412.500,00 €</EmailKeyValue>
      </EmailColumn>
    </EmailColumns>
    <EmailKeyValue label="Expediente">2026/CON/0184</EmailKeyValue>

    <EmailCallout tone="warning">
      <EmailText style={{ margin: 0 }}>Tres cosas que mirar antes de presentarse:</EmailText>
      <EmailList>
        <EmailListItem>Exige clasificación O-6-2, que no consta en tu perfil.</EmailListItem>
        <EmailListItem>La garantía definitiva sube al 5 % del importe de adjudicación.</EmailListItem>
        <EmailListItem>El plazo de presentación no admite prórroga.</EmailListItem>
      </EmailList>
    </EmailCallout>

    <EmailText>El pliego lo justifica así:</EmailText>
    <EmailQuote>
      <EmailText style={{ margin: 0 }}>
        «La empresa adjudicataria deberá acreditar experiencia previa en el mantenimiento de
        parques históricos catalogados.»
      </EmailText>
    </EmailQuote>

    <EmailDivider />

    <EmailSectionTitle>También han encajado</EmailSectionTitle>
    <EmailList>
      <EmailListItem>
        <EmailLink href="#limpieza">Limpieza viaria</EmailLink> — Diputación de Cuenca, 1.204.000,00 €
      </EmailListItem>
      <EmailListItem>
        <EmailLink href="#comedores">Comedores escolares</EmailLink> — Consejería de Educación, 890.000,00 €
      </EmailListItem>
    </EmailList>

    <EmailButton
      href="https://tender.slxd.app/coincidencias?lote=2026-w37&token=9c4e1a7b20f84d3e8a6c5b0d1f273e49"
      fallbackLabel="O copia y pega esta dirección en el navegador:"
    >
      Ver las licitaciones
    </EmailButton>
    <EmailNote>
      Recibes este aviso porque tienes perfiles de interés activos. Los avisos salen una vez por
      semana, los lunes.
    </EmailNote>
  </EmailLayout>
);

/*
 * Y un cuarto, corto, para lo que el anterior no puede enseñar sin forzarlo: la
 * clave que solo se ve una vez. Es el correo de credenciales rotadas de
 * `lmsmcp`, que hoy lo cuenta todo en prosa.
 */
const credenciales = (
  <EmailLayout
    preview="Las credenciales del conector de Acme se han rotado"
    appName="LMS MCP"
    assetsBaseUrl="/email"
  >
    <EmailHeading>Credenciales rotadas</EmailHeading>
    <EmailText>
      Ana Prieto ha rotado las credenciales del conector de Acme. El plugin de Moodle dejará de
      sincronizar hasta que se actualicen.
    </EmailText>
    <EmailKeyValue label="Organización">Acme Formación</EmailKeyValue>
    <EmailKeyValue label="Moodle">moodle.acme.example</EmailKeyValue>
    <EmailText>La clave nueva, que no volveremos a enseñar:</EmailText>
    <EmailCode>slxd_lk_7f2b9c41e08a4d5fb63e19a70c8d425f</EmailCode>
    <EmailCallout tone="error">
      <EmailText style={{ margin: 0 }}>
        La clave anterior ya no vale. Cópiala ahora: este correo es el único sitio donde aparece.
      </EmailText>
    </EmailCallout>
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

/** Un correo de producto entero, montado solo con primitivas del sistema. */
export const NuevasLicitaciones: Story = {
  name: 'Aviso de nuevas licitaciones',
  render: () => <EmailPreview>{licitaciones}</EmailPreview>,
};

/** El secreto que solo se enseña una vez: `EmailCode` con su aviso. */
export const CredencialesRotadas: Story = {
  name: 'Credenciales rotadas',
  render: () => <EmailPreview>{credenciales}</EmailPreview>,
};

/*
 * El contrato del correo compuesto, comprobado donde de verdad vive: dentro del
 * iframe del visor.
 *
 * Nada de esto se puede dar por hecho al arrancar el `play`. `EmailPreview`
 * renderiza el correo a texto en un efecto —una promesa— y lo mete por
 * `srcDoc`, así que el documento no existe hasta un par de ticks después: el
 * iframe se ESPERA (`findByTitle`) y su contenido también (`waitFor`), sin
 * mirar ni una sola vez el `contentDocument` a pelo.
 */
export const ContratoLicitaciones: Story = {
  name: 'Test — el correo compuesto llega entero al documento del cliente',
  tags: ['!dev'],
  render: () => <EmailPreview>{licitaciones}</EmailPreview>,
  play: async ({ canvasElement }) => {
    const marco = (await within(canvasElement).findByTitle(
      'Vista previa del correo',
    )) as HTMLIFrameElement;

    await waitFor(() =>
      expect(marco.contentDocument?.body.textContent ?? '').toContain('Tres licitaciones nuevas'),
    );

    const correo = within(marco.contentDocument!.body);

    // El título del mensaje y los títulos de bloque, con su jerarquía.
    await expect(correo.getByRole('heading', { level: 1 }).textContent).toBe(
      'Tres licitaciones nuevas',
    );
    await expect(
      correo.getAllByRole('heading', { level: 2 }).map((titulo) => titulo.textContent),
    ).toEqual(['Servicio de mantenimiento de zonas verdes', 'También han encajado']);

    // Las listas son listas de verdad, no párrafos con un bolo delante.
    await expect(correo.getAllByRole('list')).toHaveLength(2);
    await expect(correo.getAllByRole('listitem')).toHaveLength(5);

    // Los pares etiqueta/valor llegan con las dos piezas.
    const cuerpo = marco.contentDocument!.body.textContent ?? '';
    for (const dato of ['Órgano de contratación', 'Ayuntamiento de Valdepeñas', 'Expediente', '2026/CON/0184']) {
      await expect(cuerpo).toContain(dato);
    }

    // La acción: el botón con su href, y la MISMA dirección en texto debajo.
    const accion = correo.getByRole('link', { name: 'Ver las licitaciones' });
    const url =
      'https://tender.slxd.app/coincidencias?lote=2026-w37&token=9c4e1a7b20f84d3e8a6c5b0d1f273e49';
    await expect(accion).toHaveAttribute('href', url);
    await expect(cuerpo).toContain(url);

    // Y los enlaces de la lista compacta, cada uno con el suyo.
    await expect(correo.getByRole('link', { name: 'Limpieza viaria' })).toHaveAttribute(
      'href',
      '#limpieza',
    );
    await expect(correo.getByRole('link', { name: 'Comedores escolares' })).toHaveAttribute(
      'href',
      '#comedores',
    );
  },
};
