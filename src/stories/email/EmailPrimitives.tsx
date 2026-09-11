/*
 * Las primitivas del correo: el título, la prosa, la nota, el enlace y el
 * botón. Es lo mismo que escribe cada plantilla con `style={emailStyles.x}`,
 * pero con el estilo cerrado dentro del componente y con un nombre, que es lo
 * que evita que cada plantilla decida por su cuenta cómo se ve un párrafo.
 *
 * Todas aceptan `style` para casos que el sistema no cubre: se mezcla ENCIMA
 * del estilo base, nunca lo sustituye.
 */
import { Children, isValidElement, type CSSProperties, type ReactNode } from 'react';
import { Button, Column, Heading, Hr, Link, Row, Section, Text } from 'react-email';

import {
  emailButtonClassName,
  emailStyles,
  emailToken,
  emailTones,
  type EmailTone,
} from './emailTheme';

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
  /**
   * La frase que resume el correo antes de entrar en el detalle: sube al peso
   * de énfasis del sistema, sin cambiar tamaño ni tinta. Para entonar un
   * párrafo, no para titular un bloque — eso es `EmailSectionTitle`.
   */
  emphasis?: boolean;
  style?: CSSProperties;
}

/** Un párrafo del cuerpo del correo. */
export function EmailText({ children, emphasis = false, style }: EmailTextProps) {
  return (
    <Text style={{ ...emailStyles.text, ...(emphasis && emailStyles.textEmphasis), ...style }}>
      {children}
    </Text>
  );
}

export interface EmailSectionTitleProps {
  children: ReactNode;
  style?: CSSProperties;
}

/**
 * El título de un bloque dentro del cuerpo: «Riesgos», «Requisitos», «Lotes».
 *
 * Es un título más pequeño que el del correo —dos peldaños por debajo— y no una
 * versalita gris, que es lo que cada app se inventaba por su cuenta: el sistema
 * no tiene rol de versalita y no se le añade uno para el correo.
 *
 * Va como `<h2>`: el `<h1>` es el título del mensaje, y un correo largo con
 * bloques tiene jerarquía de documento igual que cualquier otra página.
 */
export function EmailSectionTitle({ children, style }: EmailSectionTitleProps) {
  return (
    <Heading as="h2" style={{ ...emailStyles.sectionTitle, ...style }}>
      {children}
    </Heading>
  );
}

export interface EmailListProps {
  /** Los `EmailListItem`. */
  children: ReactNode;
  /** `true` para una lista numerada (`<ol>`): pasos, un orden que significa. */
  ordered?: boolean;
  style?: CSSProperties;
}

/**
 * Una lista del cuerpo: riesgos, requisitos, lo que cambió.
 *
 * Es un `<ul>`/`<ol>` de verdad y no párrafos con un bolo delante —que es como
 * la escribían las apps—: el bolo escrito a mano deja al lector de pantalla sin
 * saber cuántos elementos hay ni dónde acaban, y el sangrado de la segunda
 * línea lo tiene que fingir cada plantilla.
 */
export function EmailList({ children, ordered = false, style }: EmailListProps) {
  const List = ordered ? 'ol' : 'ul';
  return <List style={{ ...emailStyles.list, ...style }}>{children}</List>;
}

export interface EmailListItemProps {
  children: ReactNode;
  style?: CSSProperties;
}

/** Un elemento de `EmailList`. */
export function EmailListItem({ children, style }: EmailListItemProps) {
  return <li style={{ ...emailStyles.listItem, ...style }}>{children}</li>;
}

export interface EmailQuoteProps {
  children: ReactNode;
  style?: CSSProperties;
}

/**
 * Palabras que no son nuestras, con una barra al lado: lo que escribió quien
 * denunció un contenido, el motivo con el que se rechazó algo.
 *
 * No lleva tono. Citar no es avisar: el color diría algo sobre lo citado que el
 * correo no está diciendo. Para avisar está `EmailCallout`.
 */
export function EmailQuote({ children, style }: EmailQuoteProps) {
  return <Section style={{ ...emailStyles.quote, ...style }}>{children}</Section>;
}

export interface EmailCalloutProps {
  children: ReactNode;
  /**
   * `info` (por defecto) para la voz de la casa, y `success`/`warning`/`error`
   * para el desenlace de algo que el destinatario había puesto en marcha.
   */
  tone?: EmailTone;
  style?: CSSProperties;
}

/**
 * Un bloque que destaca sobre el cuerpo: lo que salió mal, lo que hay que
 * mirar, lo que terminó bien.
 *
 * Los cuatro tonos son **rellenos**, no barras de color ni tinta suelta. Lo
 * decide el tono con menos margen: el aviso solo existe como relleno —el
 * amarillo de marca da 1,50:1 sobre blanco, lejos del 3:1 que pide WCAG—, así
 * que darles a los otros tres otra forma habría dejado cuatro avisos que no se
 * parecen entre sí. Y un relleno es además lo que mejor aguanta el medio: un
 * cliente que se coma un borde deja el bloque sin señal, y uno que invierta los
 * colores sigue teniendo un bloque.
 */
export function EmailCallout({ children, tone = 'info', style }: EmailCalloutProps) {
  return (
    <Section style={{ ...emailStyles.callout, ...emailTones[tone], ...style }}>
      {children}
    </Section>
  );
}

export interface EmailTagProps {
  children: ReactNode;
  /** El mismo juego de tonos que `EmailCallout`: un error es del mismo rojo en los dos. */
  tone?: EmailTone;
  style?: CSSProperties;
}

/**
 * El veredicto como pastilla: «Validado con avisos», «Resuelto», «Rechazado».
 *
 * Acompaña a una frase, no la sustituye — el color va antes que la palabra para
 * quien mira por encima, pero el correo tiene que leerse igual sin él, porque
 * hay clientes que se comen los fondos.
 *
 * Va dentro de un `EmailText` o suelta sobre su propia línea; no tiene margen
 * propio, lo pone el párrafo que la contiene.
 */
export function EmailTag({ children, tone = 'info', style }: EmailTagProps) {
  return (
    <span style={{ ...emailStyles.tag, ...emailTones[tone], ...style }}>
      {children}
    </span>
  );
}

export interface EmailDividerProps {
  style?: CSSProperties;
}

/**
 * La línea que parte el correo en dos: lo que se cuenta con detalle y lo que
 * solo se lista, el mensaje y su pie.
 *
 * `border: 0` antes del `border-top` no es de más: el `<hr>` trae de serie un
 * borde en relieve por los cuatro lados que los clientes heredan tal cual.
 */
export function EmailDivider({ style }: EmailDividerProps) {
  return <Hr style={{ ...emailStyles.divider, ...style }} />;
}

export interface EmailColumnsProps {
  /** Los `EmailColumn`. */
  children: ReactNode;
  style?: CSSProperties;
}

/**
 * Una fila de columnas: un dato a la izquierda y su cifra a la derecha, dos
 * fichas en paralelo.
 *
 * **La calle la reparte la fila, no quien la escribe.** Le pone el hueco a cada
 * columna menos a la última, porque una fila de correo es una `<table>` y el
 * motor de Word no conoce `gap`: sin esto, cada plantilla acaba decidiendo su
 * propio `paddingRight` y ninguna coincide con la de al lado.
 *
 * Y un aviso del medio: **las columnas no se apilan en el móvil.** Outlook
 * ignora las media queries, así que una fila de tres columnas se lee a un
 * tercio de ancho en una pantalla de 375px. Dos columnas, y de cosas cortas.
 */
export function EmailColumns({ children, style }: EmailColumnsProps) {
  const columns = Children.toArray(children).filter(isValidElement);
  const last = columns.length - 1;

  return (
    <Row style={{ ...emailStyles.columns, ...style }}>
      {columns.map((column, index) => (
        <Column
          key={column.key ?? index}
          style={{
            ...emailStyles.column,
            paddingRight: index === last ? 0 : emailToken('--email-column-gutter'),
          }}
        >
          {column}
        </Column>
      ))}
    </Row>
  );
}

export interface EmailColumnProps {
  children: ReactNode;
  /**
   * Ancho de la columna, en porcentaje (`'50%'`). Sin él, las columnas se
   * reparten la fila a partes iguales.
   */
  width?: string;
  style?: CSSProperties;
}

/**
 * Una columna de `EmailColumns`.
 *
 * No pinta la celda —eso lo hace la fila, que es quien sabe cuál es la última y
 * le toca quedarse sin calle—: pone el ancho y envuelve el contenido.
 */
export function EmailColumn({ children, width, style }: EmailColumnProps) {
  return <div style={{ width, ...style }}>{children}</div>;
}

export interface EmailKeyValueProps {
  /** El nombre del dato: «Identificador», «Importe», «Vence el». */
  label: ReactNode;
  /** El dato. */
  children: ReactNode;
  style?: CSSProperties;
}

/**
 * Un dato con su nombre: un identificador de expediente, un importe, una fecha
 * límite, el usuario de unas credenciales.
 *
 * La etiqueta va **encima** del valor y no delante: en 375px un par en la misma
 * línea parte por donde cae, y lo que queda huérfano en el renglón siguiente es
 * justo el dato. Las dos piezas van en el **mismo** párrafo, separadas por un
 * `<br />`: en dos `<Text>` el margen de párrafo se metería entre el nombre y su
 * dato, y dejarían de leerse como una sola cosa.
 */
export function EmailKeyValue({ label, children, style }: EmailKeyValueProps) {
  return (
    <Text style={{ ...emailStyles.keyValue, ...style }}>
      <span style={emailStyles.keyValueLabel}>{label}</span>
      <br />
      {children}
    </Text>
  );
}

export interface EmailCodeProps {
  /** La clave, entera. */
  children: ReactNode;
  style?: CSSProperties;
}

/**
 * La clave o el token que el correo enseña **una sola vez**: una contraseña
 * temporal, un secreto rotado, un código de acceso.
 *
 * En mono, sobre la superficie secundaria del sistema, y con el mismo corte de
 * palabra que el enlace de respaldo del botón — y por la misma razón: es para
 * copiarla a mano, así que nada puede esconderla ni sacar barra horizontal.
 *
 * El correo solo carga la cara latina de la sans, así que esto cae al
 * `ui-monospace, monospace` del token de la mono. Está bien que caiga: lo que se
 * le pide aquí a una mono es que la ele y el uno no se confundan.
 */
export function EmailCode({ children, style }: EmailCodeProps) {
  return <Text style={{ ...emailStyles.code, ...style }}>{children}</Text>;
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
