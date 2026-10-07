import { type HTMLAttributes, type ReactNode } from 'react';
import type { FormSize } from '../../constants/form-size';
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
export declare function FieldShell({ field, block, modifiers, className, size, label, labelHidden, layout, labelFor, labelIdentified, rootProps, children, footer, }: FieldShellProps): import("react/jsx-runtime").JSX.Element;
