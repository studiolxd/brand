import { type ReactNode } from 'react';
import { Tag } from '../../atoms/Tag/Tag';
import './AnnotationThread.css';

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
  /** Acciones del hilo entero: resolver, reabrir, seguir. Van al pie. */
  actions?: ReactNode;
  /** Con qué se responde: un `MessageComposer`, un `TextareaField`, un `Button`. */
  reply?: ReactNode;
  /** Idioma con el que se escribe la fecha. */
  locale?: string;
  /** Formato de la fecha. Por defecto, día y hora cortos. */
  dateFormat?: Intl.DateTimeFormatOptions;
  /** Rótulo del estado abierto. Por defecto, en castellano: «Abierta». */
  openLabel?: string;
  /** Rótulo del estado atendido. Por defecto, en castellano: «Atendida». */
  acknowledgedLabel?: string;
  /** Rótulo del estado resuelto. Por defecto, en castellano: «Resuelta». */
  resolvedLabel?: string;
  /** Marca de anotación editada. Por defecto, en castellano: «editada». */
  editedLabel?: string;
  /**
   * Rótulo que cuenta las respuestas. Por defecto, en castellano:
   * «1 respuesta» / «N respuestas».
   */
  repliesLabel?: (count: number) => string;
  /** Nombre accesible del hilo. Por defecto, en castellano: «Hilo de anotaciones». */
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
  editedLabel: string;
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
        {entry.edited && <span className="annotation-thread__edited">{editedLabel}</span>}
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
  openLabel = 'Abierta',
  acknowledgedLabel = 'Atendida',
  resolvedLabel = 'Resuelta',
  editedLabel = 'editada',
  repliesLabel = (count) => (count === 1 ? '1 respuesta' : `${count} respuestas`),
  label = 'Hilo de anotaciones',
  className,
  ...rest
}: AnnotationThreadProps) {
  const classes = [
    'annotation-thread',
    status === 'open' ? '' : `annotation-thread--${status}`,
    className ?? '',
  ].filter(Boolean).join(' ');

  // El estado no se emite además como `data-status`: lo dice ya el modificador
  // (`--acknowledged`, `--resolved`), y ningún CSS leía el atributo.
  return (
    <article className={classes} aria-label={label} {...rest}>
      <div className="annotation-thread__status">
        <Tag variant={STATUS_VARIANT[status]}>
          {{ open: openLabel, acknowledged: acknowledgedLabel, resolved: resolvedLabel }[status]}
        </Tag>
      </div>

      <Annotation
        entry={annotation}
        locale={locale}
        dateFormat={dateFormat}
        editedLabel={editedLabel}
      />

      {replies.length > 0 && (
        <div className="annotation-thread__replies">
          <p className="annotation-thread__replies-label">{repliesLabel(replies.length)}</p>
          {replies.map((entry) => (
            <Annotation
              key={entry.id}
              entry={entry}
              locale={locale}
              dateFormat={dateFormat}
              editedLabel={editedLabel}
            />
          ))}
        </div>
      )}

      {reply && <div className="annotation-thread__reply">{reply}</div>}
      {actions && <footer className="annotation-thread__actions">{actions}</footer>}
    </article>
  );
}
