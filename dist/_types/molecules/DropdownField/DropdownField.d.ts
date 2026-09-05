import { type ReactNode } from 'react';
import { type MenuItem } from '../Menu/Menu';
import './DropdownField.css';
export interface DropdownFieldProps {
    /** `id` del control; enlaza la etiqueta. Si no se pasa, se genera con `useId`. */
    id?: string;
    /** Etiqueta visible. Si no hay, es obligatorio `aria-label`. */
    label?: string;
    /** Oculta la etiqueta visualmente sin quitarla a los lectores de pantalla.   * Sin valor, lo decide quien lo envuelva: dentro de un `FieldRow` que no
     * es la primera de la lista, la etiqueta se oculta sola.
   */
    labelHidden?: boolean;
    /** Nombre accesible cuando no hay etiqueta visible. */
    'aria-label'?: string;
    /** Opciones del menú (radio para elección exclusiva, botones, enlaces…). */
    items: MenuItem[];
    /** Valor elegido (para los ítems `radio`). */
    value?: string;
    onValueChange?: (value: string) => void;
    /** Lo que muestra el control: el nombre de la opción actual, con icono si lo hay. */
    children: ReactNode;
    /** `inline`: etiqueta delante del control, en línea. Por defecto, encima como el resto de campos. */
    inline?: boolean;
    /** Talla del sistema (32/40/48). En superficies públicas, `lg`; dentro de las aplicaciones, `md`. */
    size?: 'sm' | 'md' | 'lg';
    align?: 'start' | 'center' | 'end';
    disabled?: boolean;
    /** Nombre del campo en el formulario: se monta un input oculto con el valor. */
    name?: string;
    /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
    error?: boolean;
    /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
    errorMessage?: string;
    /** Texto de ayuda, enlazado por `aria-describedby`. */
    helperText?: string;
    /** Se llama al salir del disparador (react-hook-form lo usa para validar). */
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
    /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
    className?: string;
}
/**
 * Campo desplegable: una etiqueta (visible u oculta) y un control rectangular
 * a la altura del sistema que abre un `Menu`. Es el Select cuando las
 * opciones no son un `<select>` — llevan icono, son enlaces o acciones — y
 * su cara es la misma que la del Select para que convivan en un formulario.
 */
export declare const DropdownField: import("react").ForwardRefExoticComponent<DropdownFieldProps & import("react").RefAttributes<HTMLButtonElement>>;
