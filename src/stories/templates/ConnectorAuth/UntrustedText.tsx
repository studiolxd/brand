'use client';

import type { ReactNode } from 'react';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import './UntrustedText.css';

/**
 * El cromo con el que se enmarca un dato de fuera: el desplegador de un valor
 * recortado y las comillas que dicen dónde empieza y dónde acaba el texto
 * ajeno.
 *
 * **Los tres son cromo y ninguno afirma nada**, así que van al catálogo: «Ver
 * el valor completo» describe lo único que hace ese desplegador, y las
 * comillas son puntuación del idioma (`['„', '“']` en alemán), no una decisión
 * del producto. Lo que sí es de fuera —el valor— entra por `value` y nunca
 * pasa por aquí.
 */
export interface UntrustedTextMessages {
  /** Etiqueta del desplegador cerrado. */
  expand: string;
  /** Etiqueta del desplegador abierto. */
  collapse: string;
  /** Las comillas que enmarcan el valor, apertura y cierre. */
  quotes: [string, string];
}

/**
 * Los caracteres invisibles que se hacen visibles antes de pintar nada.
 *
 * Son los que **reordenan el texto sin dejar rastro** —los controles y los
 * aislantes bidireccionales— y los **espaciadores de anchura cero**:
 *
 * - `U+061C`, `U+200E`, `U+200F`: marcas de dirección.
 * - `U+202A`–`U+202E`: incrustaciones y **anulaciones** de dirección; la última
 *   (`RLO`) es la que convierte `moodle.ejemplo.org` en otra dirección.
 * - `U+2060`–`U+2064`, `U+2066`–`U+2069`: juntadores invisibles y aislantes.
 * - `U+200B`, `U+FEFF`: espacios de anchura cero, con los que dos nombres
 *   distintos se pintan idénticos.
 *
 * **No entran los juntadores `U+200C` y `U+200D`** (ZWNJ y ZWJ): esos no
 * reordenan nada, forman glifos —la escritura persa los necesita, y un emoji
 * compuesto también—, así que marcarlos rompería nombres legítimos sin quitar
 * ningún peligro.
 */
const INVISIBLES = /[\u061C\u200B\u200E\u200F\u202A-\u202E\u2060-\u2064\u2066-\u2069\uFEFF]/g;

/**
 * A partir de cuántos caracteres un valor de fuera deja de pintarse entero.
 * Es un recuento de **puntos de código**, no de unidades UTF-16: un emoji
 * cuenta uno.
 */
const LARGO = 80;

/**
 * Sustituye cada carácter invisible por su punto de código escrito —`[U+202E]`—.
 *
 * Se marcan y **no se borran** a propósito: borrarlos dejaría que dos nombres
 * registrados distintos se pintaran exactamente igual, que es la suplantación
 * que se quiere evitar, solo que sin pista ninguna. Marcados, el efecto
 * desaparece (ya no queda ningún control que el motor pueda aplicar) y la
 * diferencia sigue a la vista.
 */
function marcarInvisibles(texto: string): string {
  return texto.replace(
    INVISIBLES,
    (caracter) => `[U+${caracter.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0')}]`,
  );
}

export interface UntrustedTextProps {
  /**
   * El valor. Si es una cadena recibe el tratamiento entero —marcado de
   * invisibles, aislamiento de dirección, comillas y recorte—; cualquier otro
   * `ReactNode` se pinta tal cual, porque ya no es texto de fuera sino algo que
   * compuso quien monta la pantalla.
   */
  value: ReactNode;
  /**
   * Con `true`, un valor largo se recorta y se ofrece un desplegador nativo
   * (`<details>`, sin una línea de JavaScript) para verlo entero. Default
   * `false`: dentro de una frase el desplegador no cabe —un `<details>` no
   * puede vivir dentro de un `<p>`—, así que ahí el valor se recorta y quien
   * quiera verlo entero lo despliega en la ficha.
   */
  expandable?: boolean;
  /**
   * Etiqueta del desplegador cerrado. **Sin default**: sin ella, sale de
   * `untrustedText.expand` del `BrandMessagesProvider`, y solo se lee cuando
   * el valor se recorta con `expandable`.
   */
  expandLabel?: string;
  /**
   * Etiqueta del desplegador abierto. **Sin default**: sin ella, sale de
   * `untrustedText.collapse`, en el mismo caso.
   */
  collapseLabel?: string;
  /**
   * Las comillas que enmarcan el valor. **Sin default**: sin ellas, salen de
   * `untrustedText.quotes`. Cambian con el idioma (`['„', '“']` en alemán), y
   * por eso están en el catálogo y no cableadas.
   */
  quotes?: [string, string];
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
}

/**
 * **Cómo se pinta un dato que escribió un tercero**: el nombre con el que se
 * registró una herramienta, la cuenta, el host de retorno.
 *
 * Tres cosas, y las tres son de seguridad, no de estética:
 *
 * 1. **Los caracteres invisibles se hacen visibles** (`[U+202E]`). Un control
 *    de dirección deja que `moodle.ejemplo.org` se lea al revés, y en una
 *    pantalla donde se concede acceso eso es suplantación.
 * 2. **El valor va aislado** en un `<bdi>`, que es la herramienta del propio
 *    motor para esto: lo que haya dentro no puede reordenar el texto de
 *    alrededor, y un nombre legítimamente en árabe o hebreo se sigue pintando
 *    bien.
 * 3. **El valor va entrecomillado**, para que se lea como lo que es —una
 *    cadena que eligió quien registró la herramienta— y no como interfaz. Un
 *    nombre registrado como `<strong>Claude</strong>` se ve con sus signos:
 *    eso es la defensa funcionando, y las comillas dicen dónde empieza y dónde
 *    acaba el texto ajeno.
 *
 * Y un cuarto, de maqueta: un valor largo se recorta a
 * `--connector-auth-untrusted-max-lines` líneas. El texto **completo sigue en
 * el documento** —un lector de pantalla lo lee entero, el recorte es solo
 * visual— y con `expandable` hay además un desplegador para verlo.
 */
export function UntrustedText({
  value,
  expandable = false,
  expandLabel,
  collapseLabel,
  quotes,
  className,
}: UntrustedTextProps) {
  const t = useBrandMessages('untrustedText');
  const clases = (...extra: (string | undefined)[]) => [...extra, className].filter(Boolean).join(' ');

  // Lo que no es una cadena no lo compuso un tercero: se pinta tal cual.
  if (typeof value !== 'string') {
    return <span className={clases('connector-untrusted')}>{value}</span>;
  }

  const texto = marcarInvisibles(value);
  const largo = Array.from(texto).length > LARGO;
  const [abre, cierra] = t('quotes', quotes);

  const valor = (
    <span className={largo ? 'connector-untrusted__value connector-untrusted__value--clamped' : 'connector-untrusted__value'}>
      {abre}
      <bdi>{texto}</bdi>
      {cierra}
    </span>
  );

  if (!largo || !expandable) {
    return <span className={clases('connector-untrusted')}>{valor}</span>;
  }

  return (
    <details className={clases('connector-untrusted', 'connector-untrusted--expandable')}>
      <summary className="connector-untrusted__summary">
        {valor}
        <span className="link connector-untrusted__toggle">
          <span className="connector-untrusted__more">{t('expand', expandLabel)}</span>
          <span className="connector-untrusted__less">{t('collapse', collapseLabel)}</span>
        </span>
      </summary>
    </details>
  );
}
