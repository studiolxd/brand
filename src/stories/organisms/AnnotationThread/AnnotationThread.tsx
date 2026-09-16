'use client';

import { type ReactNode } from 'react';
import { Tag } from '../../atoms/Tag/Tag';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import './AnnotationThread.css';

/**
 * El cromo del hilo de anotaciones: cómo se llama el hilo, cómo se dicen sus
 * tres estados, cómo se marca una anotación editada y cómo se cuentan las
 * respuestas.
 *
 * Los tres estados van **clave a clave** —como los seis tipos de la leyenda de
 * `CalendarRoster`— porque son un vocabulario **cerrado** del componente: el
 * hilo solo puede estar abierto, atendido o resuelto, y obligar a la
 * aplicación a montar nada para traducir tres palabras era peor que darles
 * tres claves. Las props siguen ganando: una revisión que llame «Verificada» a
 * `acknowledged` sigue pudiendo.
 *
 * Quién escribió cada anotación, cuándo y qué dice son datos y viajan en
 * `annotation` y `replies`.
 */
export interface AnnotationThreadMessages {
  /** Nombre accesible del hilo. */
  label: string;
  /** Rótulo del estado abierto. */
  open: string;
  /** Rótulo del estado atendido. */
  acknowledged: string;
  /** Rótulo del estado resuelto. */
  resolved: string;
  /** Marca de anotación editada, junto a la fecha. */
  edited: string;
  /** Rótulo que cuenta las respuestas. Recibe cuántas son, con su plural. */
  replies: (count: number) => string;
}

export interface AnnotationEntry {
  /** Identificador único dentro del hilo. */
  id: string;
  /** Quién la escribió, tal cual se muestra. */
  author: string;
  /** Cuándo. `Date` o cadena ISO: el componente pone el `datetime` legible por máquina. */
  date: string | Date;
  /** El texto de la anotación. */
  body: ReactNode;
  /** Marca opcional delante del autor (un avatar, una inicial). */
  avatar?: ReactNode;
  /** Se marca como editada junto a la fecha. */
  edited?: boolean;
  /**
   * Lo que el producto añade **a la fila de metadatos**, al lado de la fecha:
   * la coordenada de la anotación —el enlace a la lección, al segmento, a la
   * versión—, no una acción sobre ella (para eso está `actions`).
   *
   * Se añade DESPUÉS de la fecha y de la marca de editada: no las sustituye, y
   * al estrecharse cae a su propia línea sin empujarlas fuera de la vista.
   */
  meta?: ReactNode;
  /** Acciones de **esta** anotación: editar, borrar, citar. */
  actions?: ReactNode;
}

/**
 * Los tres estados del hilo, en orden de flujo. El nombre dice **dónde está el
 * hilo**, no cómo lo llama cada producto: el rótulo es una prop, así que una
 * revisión puede escribir «Verificada» sobre `acknowledged` sin que el sistema
 * herede el vocabulario de un producto.
 */
export type AnnotationThreadStatus = 'open' | 'acknowledged' | 'resolved';

export interface AnnotationThreadProps extends React.ComponentPropsWithoutRef<'article'> {
  /** La anotación que abre el hilo. */
  annotation: AnnotationEntry;
  /** Las respuestas, en orden. */
  replies?: AnnotationEntry[];
  /**
   * Estado del hilo, en orden de flujo. `open` pide atención; `acknowledged`
   * es el hilo que alguien ya ha mirado y da un paso atrás sin cerrarse;
   * `resolved` se retira visualmente sin desaparecer.
   */
  status?: AnnotationThreadStatus;
  /**
   * Acciones del hilo entero: resolver, reabrir, seguir. Van al pie, **una por
   * línea y a la línea entera**, siempre: el hilo vive en un panel de revisión
   * —una columna estrecha también en escritorio—, así que el ancho de la
   * ventana no dice nada de lo que mide este hueco.
   *
   * Se pasan sueltas (`<><Button/><Button/></>`), sin envolverlas en un
   * `Inline`: el envoltorio se llevaría la línea y los botones se quedarían a
   * su ancho natural dentro de él.
   */
  actions?: ReactNode;
  /** Con qué se responde: un `MessageComposer`, un `TextareaField`, un `Button`. */
  reply?: ReactNode;
  /** Idioma con el que se escribe la fecha. */
  locale?: string;
  /** Formato de la fecha. Por defecto, día y hora cortos. */
  dateFormat?: Intl.DateTimeFormatOptions;
  /**
   * Rótulo del estado abierto. **Sin default**: sin él, sale de
   * `annotationThread.open` del `BrandMessagesProvider`. Solo se lee con el
   * hilo en ese estado.
   */
  openLabel?: string;
  /**
   * Rótulo del estado atendido. **Sin default**: sin él, sale de
   * `annotationThread.acknowledged`. Solo se lee con el hilo en ese estado.
   */
  acknowledgedLabel?: string;
  /**
   * Rótulo del estado resuelto. **Sin default**: sin él, sale de
   * `annotationThread.resolved`. Solo se lee con el hilo en ese estado.
   */
  resolvedLabel?: string;
  /**
   * Marca de anotación editada. **Sin default**: sin ella, sale de
   * `annotationThread.edited`, y solo se lee cuando alguna anotación lo está.
   */
  editedLabel?: string;
  /**
   * Rótulo que cuenta las respuestas, con su plural. **Sin default**: sin él,
   * sale de `annotationThread.replies`, y solo se lee cuando hay respuestas.
   */
  repliesLabel?: (count: number) => string;
  /**
   * Nombre accesible del hilo. **Sin default**: sin él, sale de
   * `annotationThread.label`.
   */
  label?: string;
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
}

/**
 * El color del estado: amarillo mientras pide atención, prusia cuando ya se ha
 * mirado, verde cuando se cierra. Son variantes que el `Tag` ya tiene; el
 * estado nuevo no estrena color.
 */
const STATUS_VARIANT: Record<AnnotationThreadStatus, 'warning' | 'info' | 'success'> = {
  open: 'warning',
  acknowledged: 'info',
  resolved: 'success',
};

const DEFAULT_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
};

function Annotation({
  entry, locale, dateFormat, editedLabel,
}: {
  entry: AnnotationEntry;
  locale: string;
  dateFormat: Intl.DateTimeFormatOptions;
  /** Ya resuelto por el hilo, y **solo cuando hace falta**: una anotación sin editar no exige el texto. */
  editedLabel: () => string;
}) {
  const date = entry.date instanceof Date ? entry.date : new Date(entry.date);
  const formatted = new Intl.DateTimeFormat(locale, dateFormat).format(date);

  return (
    <article className="annotation-thread__item">
      <header className="annotation-thread__header">
        {entry.avatar && <span className="annotation-thread__avatar">{entry.avatar}</span>}
        <span className="annotation-thread__author">{entry.author}</span>
        {/* `datetime` en ISO: la fecha visible está formateada, la de máquina no. */}
        <time className="annotation-thread__date" dateTime={date.toISOString()}>{formatted}</time>
        {entry.edited && <span className="annotation-thread__edited">{editedLabel()}</span>}
        {entry.meta && <span className="annotation-thread__meta">{entry.meta}</span>}
      </header>
      <div className="annotation-thread__body">{entry.body}</div>
      {entry.actions && <div className="annotation-thread__item-actions">{entry.actions}</div>}
    </article>
  );
}

/**
 * Un hilo de anotaciones sobre algo: el comentario de revisión de una lección,
 * la nota sobre un segmento de traducción. Cada anotación lleva **autor, fecha
 * y sus propias acciones**, el hilo tiene **estado** (abierta, atendida o
 * resuelta) y se responde al pie.
 *
 * No es `ConversationThread`: aquello es una conversación de usuario y
 * asistente, con burbujas, orden de emisor y desplazamiento automático. Aquí
 * todas las anotaciones son iguales, lo que importa es quién dijo qué y cuándo,
 * y si el asunto sigue abierto.
 */
export function AnnotationThread({
  annotation,
  replies = [],
  status = 'open',
  actions,
  reply,
  locale = 'es-ES',
  dateFormat = DEFAULT_DATE_FORMAT,
  openLabel,
  acknowledgedLabel,
  resolvedLabel,
  editedLabel,
  repliesLabel,
  label,
  className,
  ...rest
}: AnnotationThreadProps) {
  const t = useBrandMessages('annotationThread');
  const classes = [
    'annotation-thread',
    status === 'open' ? '' : `annotation-thread--${status}`,
    className ?? '',
  ].filter(Boolean).join(' ');

  // El estado no se emite además como `data-status`: lo dice ya el modificador
  // (`--acknowledged`, `--resolved`), y ningún CSS leía el atributo.
  return (
    <article className={classes} aria-label={t('label', label)} {...rest}>
      <div className="annotation-thread__status">
        {/* Solo el estado vigente se lee del catálogo: un hilo abierto no
            exige los textos de «atendida» ni de «resuelta». */}
        <Tag variant={STATUS_VARIANT[status]}>
          {{
            open: () => t('open', openLabel),
            acknowledged: () => t('acknowledged', acknowledgedLabel),
            resolved: () => t('resolved', resolvedLabel),
          }[status]()}
        </Tag>
      </div>

      <Annotation
        entry={annotation}
        locale={locale}
        dateFormat={dateFormat}
        editedLabel={() => t('edited', editedLabel)}
      />

      {replies.length > 0 && (
        <div className="annotation-thread__replies">
          <p className="annotation-thread__replies-label">{t('replies', repliesLabel)(replies.length)}</p>
          {replies.map((entry) => (
            <Annotation
              key={entry.id}
              entry={entry}
              locale={locale}
              dateFormat={dateFormat}
              editedLabel={() => t('edited', editedLabel)}
            />
          ))}
        </div>
      )}

      {reply && <div className="annotation-thread__reply">{reply}</div>}
      {actions && <footer className="annotation-thread__actions">{actions}</footer>}
    </article>
  );
}
