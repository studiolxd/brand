import { type ComponentPropsWithoutRef } from 'react';
import './InputField.css';
export interface InputFieldProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type' | 'value' | 'defaultValue'> {
    id: string;
    label: string;
    /**
     * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
     * Por defecto `false`: la etiqueta se ve, como en `SelectField`.
     * Con la etiqueta oculta y sin `placeholder`, el control usa el texto de la
     * etiqueta como placeholder para no quedarse sin pista visible.
     */
    labelHidden?: boolean;
    name?: string;
    /**
     * Tipo del `<input>`. **`search` no está**: el tipo nativo pinta el aspa de
     * borrado del navegador, distinta en cada uno y fuera del sistema. Para un
     * campo de búsqueda, `kind="search"`.
     */
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    /**
     * Naturaleza del campo. `search` lo convierte en campo de búsqueda: `type="text"`
     * (nunca `type="search"`), sin autocompletado, con la tecla de intro rotulada
     * «buscar» y una **lupa fija** al inicio que dice que lo escrito filtra.
     * @default 'text'
     */
    kind?: 'text' | 'search';
    /**
     * Solo con `kind="search"`: pinta un botón-aspa al final del campo cuando hay
     * texto. Vacía el campo y devuelve el foco al control.
     * @default false
     */
    clearable?: boolean;
    /**
     * Nombre accesible del botón de borrado. Default castellano.
     * @default 'Borrar'
     */
    clearLabel?: string;
    /** Se llama tras vaciar el campo desde el aspa, ya con el foco devuelto. */
    onClear?: () => void;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    readOnly?: boolean;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
    size?: 'sm' | 'md' | 'lg';
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
}
/**
 * El `ref` y el resto de props nativas de `<input>` van al `<input>` interno
 * (react-hook-form `register()`, `autoComplete`, `aria-*`, `data-*`…); el
 * `className` va al contenedor.
 */
export declare const InputField: import("react").ForwardRefExoticComponent<InputFieldProps & import("react").RefAttributes<HTMLInputElement>>;
