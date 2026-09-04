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
  emailFontFilename,
  emailFontWeightRange,
  emailLogo,
  emailMaxWidth,
  emailPalette,
  emailStyleSheet,
  emailStyles,
  emailToken,
} from './emailTheme';

interface EmailOptOutBase {
  /** Baja directa, de un clic, de la categoría de aviso de este correo. */
  unsubscribeUrl: string;
  /** Texto del enlace de baja. */
  unsubscribeLabel?: string;
}

/**
 * El pie de quien **tiene cuenta** en la suite: puede darse de baja y, si el
 * producto tiene la pantalla, elegir categoría a categoría.
 */
export interface EmailOptOutAccount extends EmailOptOutBase {
  /**
   * Pantalla donde elegir categoría a categoría, para quien quiera conservar
   * algunas.
   *
   * Opcional a propósito: las apps que mandaban correo antes de que existiera
   * el paquete solo construyen un enlace de baja, sin pantalla de preferencias
   * detrás. Omitirlo deja el pie de un solo enlace en vez de obligar a cada
   * llamada a inventarse una URL que no tiene.
   */
  preferencesUrl?: string;
  /** Frase que precede al enlace en el pie de un solo enlace. Por defecto, en castellano. */
  manageLabel?: string;
  /** Texto entre los dos enlaces del pie completo. Por defecto, en castellano. */
  manageBeforeLabel?: string;
  /** Texto del enlace a preferencias. Por defecto, en castellano. */
  managePreferencesLabel?: string;
  /** Texto tras el enlace a preferencias. Por defecto, en castellano. */
  manageAfterLabel?: string;
  reasonLabel?: never;
}

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
      <Text style={emailStyles.footnote}>
        {optOut.reasonLabel}{' '}
        <Link href={optOut.unsubscribeUrl} style={emailStyles.link}>
          {optOut.unsubscribeLabel}
        </Link>
      </Text>
    );
  }

  const {
    unsubscribeUrl,
    preferencesUrl,
    manageLabel = 'Para dejar de recibir estos avisos,',
    unsubscribeLabel = preferencesUrl ? 'Darse de baja' : 'date de baja',
    manageBeforeLabel = ' o ',
    managePreferencesLabel = 'gestiona tus preferencias',
    manageAfterLabel = '.',
  } = optOut;

  const link = (
    <Link href={unsubscribeUrl} style={emailStyles.link}>
      {unsubscribeLabel}
    </Link>
  );

  if (!preferencesUrl) {
    return (
      <Text style={emailStyles.footnote}>
        {manageLabel} {link}
      </Text>
    );
  }

  return (
    <Text style={emailStyles.footnote}>
      {link}
      {manageBeforeLabel}
      <Link href={preferencesUrl} style={emailStyles.link}>
        {managePreferencesLabel}
      </Link>
      {manageAfterLabel}
    </Text>
  );
}

export interface EmailLayoutProps {
  /** La línea que el cliente enseña junto al asunto en la bandeja. */
  preview: string;
  /** Quién manda. Es el texto alternativo del logotipo si no se da otro. */
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
  /**
   * Texto alternativo del logotipo. Por defecto, `appName`.
   *
   * Muchos clientes bloquean las imágenes de serie: sin esto, la cabecera del
   * correo sale en blanco y no se sabe quién escribe.
   */
  logoAlt?: string;
  /** Omitir en el correo transaccional que no pertenece a ninguna categoría. */
  optOut?: EmailOptOut;
  children: ReactNode;
}

export function EmailLayout({
  preview,
  appName,
  locale = 'es',
  assetsBaseUrl = emailAssetsBaseUrl,
  logoAlt,
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
        <style dangerouslySetInnerHTML={{ __html: emailStyleSheet }} />
      </Head>
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: emailPalette.canvas,
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
          style={{
            backgroundColor: emailPalette.canvas,
            padding: `${emailToken('--email-canvas-padding-block')} ${emailToken('--email-canvas-padding-inline')}`,
            width: '100%',
          }}
        >
          {/* La banda de marca. El logotipo es un PNG con el blanco horneado
              dentro: Outlook Windows y Gmail Android invierten colores por su
              cuenta y un `background-color` no sobrevive a esa inversión, una
              imagen sí. */}
          <Container
            style={{
              backgroundColor: emailPalette.background,
              margin: '0 auto',
              maxWidth: emailMaxWidth,
              padding: `${emailToken('--email-brand-padding-block')} ${emailToken('--email-brand-padding-inline')}`,
            }}
          >
            <Img
              src={`${base}/${emailLogo.filename}`}
              alt={logoAlt ?? appName}
              width={emailLogo.size}
              height={emailLogo.size}
              style={{ border: 0, display: 'block' }}
            />
          </Container>

          {/* El recuadro guarda el mensaje. La marca va encima y los enlaces de
              baja debajo: ninguno de los dos es parte del mensaje. */}
          <Container
            style={{
              backgroundColor: emailPalette.background,
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
              style={{
                backgroundColor: emailPalette.canvas,
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
