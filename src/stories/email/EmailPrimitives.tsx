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

import { emailStyles } from './emailTheme';

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
  style?: CSSProperties;
}

/** La acción del correo: el par lavanda/prusia de `Button primary`. */
export function EmailButton({ href, children, style }: EmailButtonProps) {
  return (
    <Button href={href} style={{ ...emailStyles.button, ...style }}>
      {children}
    </Button>
  );
}
