/*
 * El marco de todo correo de la suite: el documento, la fuente, la banda de
 * marca, la caja del mensaje y el pie de baja.
 *
 * Lo que va dentro —lo que dice el correo— es de quien lo manda: las plantillas
 * concretas (verificar correo, restablecer contraseña, exportación lista) son
 * producto y viven en su repo. Aquí solo está el sistema.
 */
import type { ReactNode } from 'react';
import { Body, Container, Font, Head, Html, Img, Link, Preview, Section, Text } from 'react-email';

import {
  emailAssetsBaseUrl,
  emailClassNames,
  emailFontFilename,
  emailFontWeightRange,
  emailLogo,
  emailMaxWidth,
  emailPalette,
  emailSolidBackground,
  emailStyleSheet,
  emailStyles,
  emailToken,
  negatedEmailToken,
} from './emailTheme';

interface EmailOptOutBase {
  /** Baja directa, de un clic, de la categoría de aviso de este correo. */
  unsubscribeUrl: string;
}

/*
 * Los textos del pie de quien tiene cuenta son **obligatorios y sin default
 * castellano**, como el `fallbackLabel` de `EmailButton`: el correo no lee el
 * `BrandMessagesProvider`. Un correo se escribe en el idioma de quien lo
 * RECIBE, que no es el de la petición que lo dispara (el catálogo montado en
 * la raíz de la app es el de quien navega), y se renderiza fuera del árbol de
 * la app —un trabajo en cola, un manejador de ruta—, donde no hay proveedor
 * que leer. El idioma lo conoce quien manda el correo, y es quien pasa sus
 * textos.
 *
 * Qué textos hacen falta depende de si hay `preferencesUrl`: el pie de un
 * solo enlace usa `manageLabel` + `unsubscribeLabel`; el pie completo,
 * `unsubscribeLabel` + `manageBeforeLabel` + `managePreferencesLabel` +
 * `manageAfterLabel`. El tipo lo exige así: sin preferencias, los dos
 * primeros; con preferencias, los cuatro segundos; y con una
 * `preferencesUrl` que puede faltar (`string | undefined`), los cinco.
 */

interface EmailOptOutAccountLabels {
  /**
   * Texto del enlace de baja. Sin preferencias es la continuación de
   * `manageLabel` («Para dejar de recibir estos avisos, **date de baja**»);
   * con preferencias, el arranque de la frase («**Darse de baja** o …»).
   */
  unsubscribeLabel: string;
  /** Frase que precede al enlace en el pie de un solo enlace. */
  manageLabel: string;
  /** Texto entre los dos enlaces del pie completo (« o »). */
  manageBeforeLabel: string;
  /** Texto del enlace a preferencias. */
  managePreferencesLabel: string;
  /** Texto tras el enlace a preferencias (el punto final, en castellano). */
  manageAfterLabel: string;
  reasonLabel?: never;
}

/** Sin pantalla de preferencias: el pie de un solo enlace. */
interface EmailOptOutAccountSingle
  extends EmailOptOutBase,
    Pick<EmailOptOutAccountLabels, 'unsubscribeLabel' | 'manageLabel' | 'reasonLabel'>,
    Partial<Pick<EmailOptOutAccountLabels, 'manageBeforeLabel' | 'managePreferencesLabel' | 'manageAfterLabel'>> {
  preferencesUrl?: undefined;
}

/** Con pantalla de preferencias: el pie completo, de dos enlaces. */
interface EmailOptOutAccountFull
  extends EmailOptOutBase,
    Omit<EmailOptOutAccountLabels, 'manageLabel'>,
    Partial<Pick<EmailOptOutAccountLabels, 'manageLabel'>> {
  /**
   * Pantalla donde elegir categoría a categoría, para quien quiera conservar
   * algunas.
   */
  preferencesUrl: string;
}

/** Con una `preferencesUrl` que puede o no llegar: los cinco textos. */
interface EmailOptOutAccountEither extends EmailOptOutBase, EmailOptOutAccountLabels {
  preferencesUrl?: string;
}

/**
 * El pie de quien **tiene cuenta** en la suite: puede darse de baja y, si el
 * producto tiene la pantalla, elegir categoría a categoría. Sus textos son
 * obligatorios (ver arriba): los que pida la forma del pie.
 *
 * `preferencesUrl` es opcional a propósito: las apps que mandaban correo antes
 * de que existiera el paquete solo construyen un enlace de baja, sin pantalla
 * de preferencias detrás. Omitirla deja el pie de un solo enlace en vez de
 * obligar a cada llamada a inventarse una URL que no tiene.
 */
export type EmailOptOutAccount = EmailOptOutAccountSingle | EmailOptOutAccountFull | EmailOptOutAccountEither;

/**
 * El pie de quien **no tiene cuenta**: el invitado a una revisión, el que
 * recibe el correo por una dirección suelta. Solo la baja.
 *
 * No es el mismo pie con una URL de menos. Al destinatario sin cuenta hay que
 * decirle **por qué** le llega el correo —no se registró en nada— y no se le
 * puede ofrecer «gestionar preferencias»: esa pantalla vive tras la sesión del
 * hub y no puede abrirla. Por eso el tipo prohíbe `preferencesUrl` en vez de
 * confiar en que nadie la pase.
 */
export interface EmailOptOutGuest extends EmailOptOutBase {
  /**
   * La frase que explica por qué recibe este correo. **Obligatoria y sin
   * default castellano**: el motivo lo sabe el producto que manda el correo,
   * no el DS, y sin él la baja llega sin contexto a quien nunca se dio de alta.
   */
  reasonLabel: string;
  /**
   * Texto del enlace de baja. **Obligatorio aquí, y sin default**: en este pie
   * el enlace es una frase entera que cierra la anterior, así que ningún
   * default del DS podría encajar con el motivo que escribe el consumidor.
   */
  unsubscribeLabel: string;
  preferencesUrl?: never;
  manageLabel?: never;
  manageBeforeLabel?: never;
  managePreferencesLabel?: never;
  manageAfterLabel?: never;
}

/**
 * El pie de baja, en sus dos formas: la de quien tiene cuenta
 * (`EmailOptOutAccount`) y la de quien no (`EmailOptOutGuest`). Se distinguen
 * por `reasonLabel`, que solo lleva la segunda.
 */
export type EmailOptOut = EmailOptOutAccount | EmailOptOutGuest;

/*
 * La frase de baja va partida en varias props en vez de una sola con un hueco
 * `{enlace}`: los idiomas no coinciden en si hay texto después del enlace (el
 * alemán pone ahí el punto, y el castellano también).
 */
function EmailOptOutBlock(optOut: EmailOptOut) {
  // El pie del invitado: su motivo y, detrás, la baja. Sin preferencias, que
  // es una pantalla que no puede abrir.
  if (optOut.reasonLabel !== undefined) {
    return (
      <Text className={emailClassNames.text} style={emailStyles.footnote}>
        {optOut.reasonLabel}{' '}
        <Link href={optOut.unsubscribeUrl} className={emailClassNames.link} style={emailStyles.link}>
          {optOut.unsubscribeLabel}
        </Link>
      </Text>
    );
  }

  const { unsubscribeUrl, preferencesUrl, unsubscribeLabel } = optOut;
  // El tipo ya exige los textos de cada forma del pie; esto es la red para
  // quien llama desde JavaScript o con un `as`: sin texto no se manda un pie
  // con un hueco, se avisa de cuál falta.
  const texto = (nombre: keyof EmailOptOutAccountLabels, valor: string | undefined): string => {
    if (valor === undefined) {
      throw new Error(
        `@studiolxd/brand/email: falta «optOut.${nombre}». El pie de baja no trae ` +
          'textos puestos: los pasa quien manda el correo, en el idioma del destinatario.',
      );
    }
    return valor;
  };

  const link = (
    <Link href={unsubscribeUrl} className={emailClassNames.link} style={emailStyles.link}>
      {texto('unsubscribeLabel', unsubscribeLabel)}
    </Link>
  );

  if (!preferencesUrl) {
    return (
      <Text className={emailClassNames.text} style={emailStyles.footnote}>
        {texto('manageLabel', optOut.manageLabel)} {link}
      </Text>
    );
  }

  return (
    <Text className={emailClassNames.text} style={emailStyles.footnote}>
      {link}
      {texto('manageBeforeLabel', optOut.manageBeforeLabel)}
      <Link href={preferencesUrl} className={emailClassNames.link} style={emailStyles.link}>
        {texto('managePreferencesLabel', optOut.managePreferencesLabel)}
      </Link>
      {texto('manageAfterLabel', optOut.manageAfterLabel)}
    </Text>
  );
}

export interface EmailLayoutProps {
  /** La línea que el cliente enseña junto al asunto en la bandeja. */
  preview: string;
  /**
   * Quién manda: la app que envía el correo. El layout no lo pinta —la marca
   * del encabezado es siempre el logotipo «Studio LXD», con su `alt` fijo
   * (`emailLogo.alt`)—; queda en la API para que el consumidor identifique el
   * correo.
   */
  appName: string;
  /** Idioma del documento. Por defecto, castellano. */
  locale?: string;
  /**
   * De dónde cuelgan el logotipo y la fuente web.
   *
   * El valor por defecto es `https://slxd.app/brand/email`, no una constante
   * escondida: un consumidor que sirva los assets en otro sitio lo cambia aquí
   * sin tocar el DS. Las dos URL se construyen sobre esta base — ver la nota de
   * `emailLogo.filename` y `emailFontFilename` para saber qué hay que subir.
   */
  assetsBaseUrl?: string;
  /** Omitir en el correo transaccional que no pertenece a ninguna categoría. */
  optOut?: EmailOptOut;
  children: ReactNode;
}

export function EmailLayout({
  preview,
  locale = 'es',
  assetsBaseUrl = emailAssetsBaseUrl,
  optOut,
  children,
}: EmailLayoutProps) {
  const base = assetsBaseUrl.replace(/\/$/, '');
  const fontUrl = `${base}/${emailFontFilename}`;

  return (
    <Html lang={locale}>
      <Head>
        {/* Solo Apple Mail y unos pocos más honran @font-face; en el resto
            —Gmail y Outlook Windows, o sea la mayoría— esto cae al fallback
            del propio token (`system-ui, sans-serif`), y se asume.

            Una sola cara, con el RANGO del eje de peso (`1 1000`), igual que la
            declara `fonts.css`. La sans es una fuente variable: declararla con
            un peso suelto —o con dos caras, una por peso, apuntando al mismo
            fichero— deja al navegador sin eje que variar, y acaba emparejando
            la prosa con la cara del título. El correo salía entero en negrita. */}
        <Font
          fontFamily="Google Sans Flex"
          fallbackFontFamily="sans-serif"
          webFont={{ url: fontUrl, format: 'woff2' }}
          fontWeight={emailFontWeightRange}
          fontStyle="normal"
        />
        {/* El correo se pide SIEMPRE en claro. La primera capa: decirle al
            cliente que no hay versión oscura. Las demás (fondos que
            sobreviven a la inversión, la media query y los selectores de
            Outlook) están en `emailStyleSheet` y en los estilos de cada pieza. */}
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light only" />
        <style dangerouslySetInnerHTML={{ __html: emailStyleSheet }} />
      </Head>
      <Preview>{preview}</Preview>
      <Body
        className={emailClassNames.canvas}
        style={{
          ...emailSolidBackground(emailPalette.canvas),
          color: emailPalette.text,
          fontFamily: emailStyles.text.fontFamily,
          fontSize: emailStyles.text.fontSize,
          fontWeight: emailStyles.text.fontWeight,
          lineHeight: emailStyles.text.lineHeight,
          margin: 0,
          padding: 0,
        }}
      >
        {/* El lienzo: el fondo general del correo, fuera de la caja. Existe
            aparte de <Body> porque react-email pone el fondo de Body inline en
            un <td> envolvente, y hay clientes que descartan el <body> y meten
            el contenido en su propio documento — ahí el fondo se perdería.
            Body conserva el suyo para los que sí lo respetan. */}
        <Section
          className={emailClassNames.canvas}
          style={{
            ...emailSolidBackground(emailPalette.canvas),
            padding: `${emailToken('--email-canvas-padding-block')} ${emailToken('--email-canvas-padding-inline')}`,
            width: '100%',
          }}
        >
          {/* La banda de marca: el logotipo completo ("Studio LXD"), no el
              isotipo — un correo no trae barra de navegación ni dominio a la
              vista que digan de quién es, así que la marca tiene que leerse.
              Es un PNG con el blanco horneado dentro: Outlook Windows y Gmail
              Android invierten colores por su cuenta y un `background-color`
              no sobrevive a esa inversión, una imagen sí. Es la última red:
              el correo ya pide ir en claro por otras capas (ver `<Head>`).

              La celda va sin padding: el aire de seguridad ya lo da el margen
              del lienzo (`canvas-padding-*`) y el PNG trae su propio padding
              horneado, así que un padding aquí solo desplazaba el logotipo
              hacia dentro respecto al recuadro del mensaje, que comparte el
              mismo `maxWidth`/`margin: 0 auto` y por tanto el mismo borde
              izquierdo. El logotipo sale con `marginLeft` negativo — tanto
              como medía ese padding lateral — para quedar alineado con ese
              borde en vez de con el de su propia celda, y con `marginBottom`
              para conservar el aire que antes daba el padding inferior de la
              banda respecto al recuadro de abajo. */}
          <Container
            className={emailClassNames.surface}
            style={{
              ...emailSolidBackground(emailPalette.background),
              margin: '0 auto',
              maxWidth: emailMaxWidth,
              padding: 0,
            }}
          >
            <Img
              src={`${base}/${emailLogo.filename}`}
              alt={emailLogo.alt}
              width={emailLogo.width}
              height={emailLogo.height}
              style={{
                border: 0,
                display: 'block',
                marginBottom: emailToken('--email-brand-padding-block'),
                marginLeft: negatedEmailToken('--email-brand-padding-inline'),
              }}
            />
          </Container>

          {/* El recuadro guarda el mensaje. La marca va encima y los enlaces de
              baja debajo: ninguno de los dos es parte del mensaje. */}
          <Container
            className={`${emailClassNames.surface} ${emailClassNames.box}`}
            style={{
              ...emailSolidBackground(emailPalette.background),
              border: `${emailToken('--email-border-width')} solid ${emailPalette.border}`,
              borderRadius: 0,
              margin: '0 auto',
              maxWidth: emailMaxWidth,
              padding: `${emailToken('--email-padding-block')} ${emailToken('--email-padding-inline')}`,
            }}
          >
            <Section>{children}</Section>
          </Container>

          {optOut && (
            <Container
              className={emailClassNames.canvas}
              style={{
                ...emailSolidBackground(emailPalette.canvas),
                margin: '0 auto',
                maxWidth: emailMaxWidth,
                // Sin padding lateral: este bloque alinea con el borde EXTERIOR
                // del recuadro. Un padding aquí igualaría su padding INTERIOR y
                // se leería como sangrado contra el borde.
                padding: `${emailToken('--email-opt-out-margin-block-start')} 0 0`,
              }}
            >
              <EmailOptOutBlock {...optOut} />
            </Container>
          )}
        </Section>
      </Body>
    </Html>
  );
}
