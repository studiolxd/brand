/*
 * Las primitivas del correo: el título, la prosa, la nota, el enlace y el
 * botón. Es lo mismo que escribe cada plantilla con `style={emailStyles.x}`,
 * pero con el estilo cerrado dentro del componente y con un nombre, que es lo
 * que evita que cada plantilla decida por su cuenta cómo se ve un párrafo.
 *
 * Todas aceptan `style` para casos que el sistema no cubre: se mezcla ENCIMA
 * del estilo base, nunca lo sustituye.
 */
import type { CSSProperties, ReactNode } from 'react';
import { Button, Heading, Link, Text } from 'react-email';

import { emailButtonClassName, emailStyles } from './emailTheme';

export interface EmailHeadingProps {
  children: ReactNode;
  style?: CSSProperties;
}

/** El título del mensaje. Un correo es un documento suelto: va como `<h1>`. */
export function EmailHeading({ children, style }: EmailHeadingProps) {
  return (
    <Heading style={{ ...emailStyles.heading, ...style }}>
      {children}
    </Heading>
  );
}

export interface EmailTextProps {
  children: ReactNode;
  style?: CSSProperties;
}

/** Un párrafo del cuerpo del correo. */
export function EmailText({ children, style }: EmailTextProps) {
  return (
    <Text style={{ ...emailStyles.text, ...style }}>
      {children}
    </Text>
  );
}

export interface EmailNoteProps {
  children: ReactNode;
  /**
   * `muted` (por defecto) para una nota dentro del recuadro, en tinta
   * secundaria. `plain` para una que va FUERA, sobre el fondo de la página:
   * ahí el gris se lee como deshabilitado y no como secundario.
   */
  tone?: 'muted' | 'plain';
  style?: CSSProperties;
}

/** Letra menor: descargos, avisos de caducidad, pie del mensaje. */
export function EmailNote({ children, tone = 'muted', style }: EmailNoteProps) {
  const base = tone === 'muted' ? emailStyles.muted : emailStyles.footnote;
  return (
    <Text style={{ ...base, ...style }}>
      {children}
    </Text>
  );
}

export interface EmailLinkProps {
  href: string;
  children: ReactNode;
  style?: CSSProperties;
}

/** Un enlace dentro del texto. */
export function EmailLink({ href, children, style }: EmailLinkProps) {
  return (
    <Link href={href} style={{ ...emailStyles.link, ...style }}>
      {children}
    </Link>
  );
}

export interface EmailButtonProps {
  href: string;
  children: ReactNode;
  /**
   * La frase que presenta el enlace de respaldo, p. ej. «O copia y pega esta
   * dirección en el navegador:». La dirección se pinta debajo, en su propia
   * línea, así que la frase se escribe con su puntuación.
   *
   * **Obligatoria, y sin valor por defecto** — la única prop de texto del DS
   * que no lo tiene. Es deliberado por partida doble: el correo vive en seis
   * idiomas que conoce `mailer` y no el DS, y hacerla obligatoria es lo que
   * garantiza que ninguna plantilla se deje el respaldo. Un botón sin él es
   * un correo sin plan B.
   */
  fallbackLabel: string;
  style?: CSSProperties;
}

/**
 * La acción del correo: el par lavanda/prusia de `Button primary`, a ancho
 * completo, **con la misma dirección en texto justo debajo**.
 *
 * Las dos piezas son un solo componente a propósito. Hay clientes que
 * destrozan los botones, y la gente reenvía correos y los abre en otro
 * dispositivo: el enlace en texto es el plan B, y un plan B que cada plantilla
 * tuviera que acordarse de añadir no lo sería.
 *
 * La dirección va como texto plano, no dentro de un `<a>`: lo que se pide de
 * ella es leerla y copiarla, y así no hay enlace que un cliente pueda vaciar
 * de estilo o quitar. Los que autoenlazan lo harán solos.
 *
 * Y va en su **propia línea**, bajo la frase que la presenta: arrancando a
 * media línea, una dirección larga entraba partida desde el primer renglón y
 * costaba encontrarle el principio. El salto es un `<br />` dentro del mismo
 * párrafo —no un segundo `<Text>`— porque las dos piezas son una sola frase y
 * porque el margen inferior del bloque lo cierra el respaldo: partirlo en dos
 * párrafos metería el margen entre medias. `<br />` lo entiende cualquier
 * cliente, incluido el motor de Word.
 */
export function EmailButton({ href, children, fallbackLabel, style }: EmailButtonProps) {
  return (
    <>
      {/* El margen inferior lo lleva el respaldo, que es quien cierra el
          bloque; si lo llevara también el botón, quedarían separados.

          La clase es el gancho del hover: lo único del correo que no puede ir
          inline, porque un `:hover` no cabe en un atributo `style`. La regla
          vive en `emailStyleSheet`. */}
      <Button
        href={href}
        className={emailButtonClassName}
        style={{ ...emailStyles.button, marginBottom: 0, ...style }}
      >
        {children}
      </Button>
      <Text style={emailStyles.buttonFallback}>
        {fallbackLabel}
        <br />
        <span style={emailStyles.buttonFallbackUrl}>{href}</span>
      </Text>
    </>
  );
}
