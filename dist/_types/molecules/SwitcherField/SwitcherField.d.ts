import { type ReactNode } from 'react';
import './SwitcherField.css';
export interface SwitcherFieldProps {
    /** Texto del interruptor, a su derecha. Acepta JSX. */
    label: ReactNode;
    /** `id` del control. Si no se pasa, se genera con `useId`. */
    id?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    /** Valor enviado con el formulario cuando está activo. */
    value?: string;
    /** Talla del sistema. Sin ella, la del `Form` que lo envuelva; sin `Form`, `md`. */
    size?: 'sm' | 'md' | 'lg';
    /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
    error?: boolean;
    /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
    errorMessage?: string;
    /** Texto de ayuda, enlazado por `aria-describedby`. */
    helperText?: string;
    /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
    className?: string;
    onCheckedChange?: (checked: boolean) => void;
    onBlur?: React.FocusEventHandler<HTMLElement>;
}
/**
 * El `Switcher` como campo: interruptor, texto, ayuda y error. El `ref` va al
 * disparador (el `<button role="switch">`) para que react-hook-form pueda
 * enfocarlo al fallar la validación; el `className`, al contenedor.
 */
export declare const SwitcherField: import("react").ForwardRefExoticComponent<SwitcherFieldProps & import("react").RefAttributes<HTMLElement>>;
