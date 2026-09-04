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
  emailLogo,
  emailMaxWidth,
  emailPalette,
  emailStyleSheet,
  emailStyles,
  emailToken,
} from './emailTheme';

export interface EmailOptOut {
  /** Baja directa, de un clic, de la categoría de aviso de este correo. */
  unsubscribeUrl: string;
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
  /** Texto del enlace de baja. Por defecto, en castellano. */
  unsubscribeLabel?: string;
  /** Texto entre los dos enlaces del pie completo. Por defecto, en castellano. */
  manageBeforeLabel?: string;
  /** Texto del enlace a preferencias. Por defecto, en castellano. */
  managePreferencesLabel?: string;
  /** Texto tras el enlace a preferencias. Por defecto, en castellano. */
  manageAfterLabel?: string;
}

/*
 * La frase de baja va partida en varias props en vez de una sola con un hueco
 * `{enlace}`: los idiomas no coinciden en si hay texto después del enlace (el
 * alemán pone ahí el punto, y el castellano también).
 */
function EmailOptOutBlock({
  unsubscribeUrl,
  preferencesUrl,
  manageLabel = 'Para dejar de recibir estos avisos,',
  unsubscribeLabel = preferencesUrl ? 'Darse de baja' : 'date de baja',
  manageBeforeLabel = ' o ',
  managePreferencesLabel = 'gestiona tus preferencias',
  manageAfterLabel = '.',
}: EmailOptOut) {
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

            Dos caras del mismo fichero: la sans es una fuente variable, y el
            correo usa dos pesos (el del cuerpo y el de los títulos). Con una
            sola cara declarada, un renderizador que no sintetice el peso pinta
            los títulos igual que la prosa. */}
        <Font
          fontFamily="Google Sans Flex"
          fallbackFontFamily="sans-serif"
          webFont={{ url: fontUrl, format: 'woff2' }}
          fontWeight={300}
          fontStyle="normal"
        />
        <Font
          fontFamily="Google Sans Flex"
          fallbackFontFamily="sans-serif"
          webFont={{ url: fontUrl, format: 'woff2' }}
          fontWeight={500}
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
