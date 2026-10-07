import { type HTMLAttributes, type ReactNode } from 'react';
import type { FormSize } from '../../constants/form-size';
/**
 * El espacio `field` del catálogo: los textos que pinta el armazón común de
 * los campos. Como todo el catálogo, opcional en `BrandMessages`: sin él
 * la marca cae al castellano «(opcional)».
 */
export interface FieldMessages {
    /** La marca tras la etiqueta de un campo `optional`. Castellano: «(opcional)». */
    optional: string;
    /**
     * La descripción oculta que anuncia un campo obligatorio cuyo disparador es
     * un botón, que no admite `aria-required` (D73): `ColorPickerField` y
     * `DropdownField`. Castellano: «obligatorio».
     */
    required: string;
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
     * del nombre del campo. No se combina con `required`. Sin valor, lo decide
     * el `Form` que lo envuelva: con `markOptional`, todo campo sin `required`
     * la lleva (D74); `optional={false}` la apaga en un campo concreto. Sin
     * `Form markOptional`, por defecto `false`.
     */
    optional?: boolean;
    /**
     * Texto de la marca de opcional. **Sin default en la prop**: sin ella, sale
     * de `field.optional` del `BrandMessagesProvider` y, si el catálogo no la
     * trae, del castellano «(opcional)».
     */
    optionalLabel?: string;
}
/**
 * Lo obligatorio de un campo cuyo disparador es un botón (D73). ARIA 1.2 no
 * admite `aria-required` ni en `role="button"` ni en `role="group"`, así que
 * lo obligatorio va en la **descripción** del disparador: un texto oculto
 * («obligatorio») enlazado por su `aria-describedby`, detrás de la ayuda y el
 * error. El `<form>` lo sigue validando el campo oculto con `required`.
 */
export interface FieldRequiredProps {
    /**
     * Texto que anuncia lo obligatorio. **Sin default en la prop**: sin ella,
     * sale de `field.required` del `BrandMessagesProvider` y, si el catálogo no
     * la trae, del castellano «obligatorio». Solo se lee con `required`.
     */
    requiredLabel?: string;
}
/** El `id` del texto oculto de obligatorio de un control. */
export declare function requiredTextId(controlId: string): string;
/**
 * El texto oculto «obligatorio» al que apunta el `aria-describedby` del
 * disparador (ver `FieldRequiredProps`). Se pinta solo con `required`.
 */
export declare function FieldRequiredText({ id, label }: {
    id: string;
    label?: string;
}): import("react/jsx-runtime").JSX.Element;
/** Une ids para un `aria-*` de referencias; sin ninguno, `undefined` (no un atributo vacío). */
export declare function joinIds(...ids: Array<string | false | null | undefined>): string | undefined;
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
export declare function useFieldShell({ id: idProp, error, errorMessage, helperText, describedBy }: FieldShellOptions): FieldShellState;
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
export declare function FieldShell({ field, block, modifiers, className, size, label, optional, optionalLabel, labelHidden, layout, labelFor, labelIdentified, rootProps, children, footer, }: FieldShellProps): import("react/jsx-runtime").JSX.Element;
