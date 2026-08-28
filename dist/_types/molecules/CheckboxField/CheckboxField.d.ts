import { type ReactNode } from 'react';
import './CheckboxField.css';
export interface CheckboxFieldProps {
    /** Texto de la opción, a la derecha de la marca. Acepta JSX (un enlace, por ejemplo). */
    label: ReactNode;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    /** Talla del sistema. Sin ella, la del `Form` que lo envuelva; sin `Form`, `md`. */
    size?: 'sm' | 'md' | 'lg';
    /** `id` del control. Si no se pasa, se genera con `useId`. */
    id?: string;
    name?: string;
    value?: string;
    /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
    error?: boolean;
    /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
    errorMessage?: string;
    /** Texto de ayuda, enlazado por `aria-describedby`. */
    helperText?: string;
    /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
    className?: string;
    onCheckedChange?: (checked: boolean | 'indeterminate') => void;
    onBlur?: React.FocusEventHandler<HTMLElement>;
}
/**
 * El `Checkbox` como campo: marca, texto de la opción, ayuda y error. El `ref`
 * va al disparador (el `<button role="checkbox">`) para que react-hook-form
 * pueda enfocarlo al fallar la validación; el `className`, al contenedor.
 */
export declare const CheckboxField: import("react").ForwardRefExoticComponent<CheckboxFieldProps & import("react").RefAttributes<HTMLElement>>;
