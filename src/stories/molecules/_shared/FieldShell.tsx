import { useId, type HTMLAttributes, type ReactNode } from 'react';
import { Label } from '../../atoms/Label/Label';
import { ErrorText } from '../../atoms/ErrorText/ErrorText';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import type { FormSize } from '../../constants/form-size';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import { fieldEs } from '../../messages/es/field';

/* ─────────────────────────────────────────────────────────────────────────────
 * El armazón común de los `*Field`: contenedor, etiqueta, ayuda, error, ids y
 * `aria-describedby`. Interno — no sale en `entry-points.mjs` ni en `exports`.
 *
 * Se parte en dos porque los controles no se parecen: unos son `<input>`
 * nativos, otros componentes de Base UI con su propio `id`, otros grupos.
 *
 * - `useFieldShell` calcula los ids y el estado de error. El campo los pone él
 *   mismo sobre su control (`id`, `aria-describedby`, `error`/`aria-invalid`,
 *   `aria-labelledby`), en el orden de siempre, así que el DOM no cambia.
 * - `FieldShell` pinta lo que rodea al control, con las clases BEM del bloque
 *   del campo (`input-field__helper`, `checkbox-field__label`…).
 *
 * El orden del DOM es el de todos los campos: etiqueta, control, error, ayuda.
 * El `aria-describedby` nombra en ese mismo orden el error y la ayuda, y suma
 * —no pisa— el que traiga el consumidor.
 * ───────────────────────────────────────────────────────────────────────────── */

/**
 * El espacio `field` del catálogo: los textos que pinta el armazón común de
 * los campos. Como todo el catálogo, opcional en `BrandMessages`: sin él
 * la marca cae al castellano «(opcional)».
 */
export interface FieldMessages {
  /** La marca tras la etiqueta de un campo `optional`. Castellano: «(opcional)». */
  optional: string;
}

/**
 * La marca de campo opcional (D70), común a todos los `*Field`. Se marca lo
 * **opcional**, no lo obligatorio: en un formulario donde casi todo es
 * obligatorio, lo que hay que señalar es la excepción. Es explícita —un campo
 * sin `required` no la lleva sola—, porque un campo suelto (un buscador, un
 * filtro) no es «opcional» de ningún formulario.
 */
export interface FieldOptionalProps {
  /**
   * Pinta « (opcional)» tras la etiqueta, en la tinta apagada de la etiqueta.
   * Va dentro del `<label>`, así que el lector de pantalla la lee como parte
   * del nombre del campo. No se combina con `required`. Por defecto `false`.
   */
  optional?: boolean;
  /**
   * Texto de la marca de opcional. **Sin default en la prop**: sin ella, sale
   * de `field.optional` del `BrandMessagesProvider` y, si el catálogo no la
   * trae, del castellano «(opcional)».
   */
  optionalLabel?: string;
}

/** Une ids para un `aria-*` de referencias; sin ninguno, `undefined` (no un atributo vacío). */
// eslint-disable-next-line react-refresh/only-export-components -- utilidad del armazón, viaja con él
export function joinIds(...ids: Array<string | false | null | undefined>): string | undefined {
  return ids.filter(Boolean).join(' ') || undefined;
}

export interface FieldShellOptions {
  /** `id` del control. Sin él, uno de `useId`. */
  id?: string;
  /** Error sin mensaje. Un `errorMessage` ya lo implica. */
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  /** `aria-describedby` que trae el consumidor: se suma detrás de los propios. */
  describedBy?: string;
}

export interface FieldShellState {
  /** `id` del control (el del consumidor o uno generado). */
  id: string;
  /** `id` de la etiqueta, para los controles que se nombran por `aria-labelledby`. */
  labelId: string;
  errorId?: string;
  helperId?: string;
  /** Lo que va en el `aria-describedby` del control. */
  describedBy?: string;
  /** Error con o sin mensaje: lo que pone el control en error. */
  hasError: boolean;
  errorMessage?: string;
  helperText?: string;
}

// eslint-disable-next-line react-refresh/only-export-components -- el hook viaja con su armazón
export function useFieldShell({ id: idProp, error = false, errorMessage, helperText, describedBy }: FieldShellOptions): FieldShellState {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  return {
    id,
    labelId: `${id}-label`,
    errorId,
    helperId,
    describedBy: joinIds(errorId, helperId, describedBy),
    hasError: error || !!errorMessage,
    errorMessage,
    helperText,
  };
}

export interface FieldShellProps {
  /** El estado de `useFieldShell`. */
  field: FieldShellState;
  /** Bloque BEM del campo (`input-field`): clase raíz y prefijo de `__helper`/`__label`/`__control`. */
  block: string;
  /** Clases de modificador ya formadas (`checkbox-field--sm`); los falsos se descartan. */
  modifiers?: Array<string | false | null | undefined>;
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
  /** Talla de la etiqueta (`stack`). */
  size?: FormSize;
  /** Texto de la etiqueta. Sin él no se pinta etiqueta (el control se nombra por otra vía). */
  label?: ReactNode;
  /** Marca de campo opcional tras la etiqueta (ver `FieldOptionalProps`). */
  optional?: boolean;
  /** Texto de la marca; sin él, `field.optional` del catálogo o «(opcional)». */
  optionalLabel?: string;
  /** Etiqueta oculta a la vista, presente para el lector de pantalla. */
  labelHidden?: boolean;
  /**
   * - `stack` (por defecto): `Label` encima del control.
   * - `inline`: un `<label>` (`__control`) envuelve el control y, a su derecha,
   *   el texto (`__label`): casilla, radio, interruptor.
   */
  layout?: 'stack' | 'inline';
  /** A qué apunta el `htmlFor` de la etiqueta. Default: `field.id`. */
  labelFor?: string;
  /** La etiqueta lleva `id` (`field.labelId`) para que la apunte un `aria-labelledby`. */
  labelIdentified?: boolean;
  /** Atributos del contenedor (el `role="group"` de un editor compuesto). */
  rootProps?: HTMLAttributes<HTMLDivElement>;
  /** El control (y lo que vaya pegado a él). */
  children: ReactNode;
  /** Lo que va tras la ayuda: la acción de `PasswordField`. */
  footer?: ReactNode;
}

export function FieldShell({
  field,
  block,
  modifiers = [],
  className,
  size = 'md',
  label,
  optional = false,
  optionalLabel,
  labelHidden = false,
  layout = 'stack',
  labelFor,
  labelIdentified = false,
  rootProps,
  children,
  footer,
}: FieldShellProps) {
  const htmlFor = labelFor ?? field.id;
  const labelId = labelIdentified ? field.labelId : undefined;
  const t = useBrandMessages('field', fieldEs);

  // La marca va DENTRO de la etiqueta: forma parte del nombre accesible
  // («Teléfono (opcional)»). Se lee solo si el campo es opcional.
  const text = optional && label
    ? (
        <>
          {label}{' '}
          <span className="label__optional">{t('optional', optionalLabel)}</span>
        </>
      )
    : label;

  return (
    <div {...rootProps} className={[block, ...modifiers, className].filter(Boolean).join(' ')}>
      {layout === 'inline' ? (
        <label className={`${block}__control`} htmlFor={htmlFor}>
          {children}
          {labelHidden
            ? <VisuallyHidden id={labelId} className={`${block}__label`}>{text}</VisuallyHidden>
            : <span id={labelId} className={`${block}__label`}>{text}</span>}
        </label>
      ) : (
        <>
          {label ? <Label id={labelId} htmlFor={htmlFor} hidden={labelHidden} size={size}>{text}</Label> : null}
          {children}
        </>
      )}
      {field.errorMessage && (
        <ErrorText id={field.errorId}>{field.errorMessage}</ErrorText>
      )}
      {field.helperText && (
        <span id={field.helperId} className={`${block}__helper`}>{field.helperText}</span>
      )}
      {footer}
    </div>
  );
}
