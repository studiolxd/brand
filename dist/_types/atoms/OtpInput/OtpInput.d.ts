import './OtpInput.css';
export interface OtpInputProps {
    /** Número de celdas a renderizar. Requerido. */
    length: number;
    /** Valor controlado — string de dígitos, ej. "123456" */
    value?: string;
    /** Valor por defecto no controlado */
    defaultValue?: string;
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
    disabled?: boolean;
    readOnly?: boolean;
    error?: boolean;
    size?: 'sm' | 'md' | 'lg';
    /** @deprecated Usa el atributo nativo `aria-describedby`. */
    describedBy?: string;
    /** Ids de ayuda/error que describen el grupo de celdas (lo pone el campo). */
    'aria-describedby'?: string;
    /** Nombre accesible del grupo cuando va suelto. */
    'aria-label'?: string;
    /** Nombre accesible del grupo por referencia (la etiqueta visible del campo). */
    'aria-labelledby'?: string;
    id?: string;
    name?: string;
    /** Se llama al salir de la última celda (react-hook-form lo usa para validar). */
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    /** Se añade DESPUÉS de las clases propias del componente. */
    className?: string;
    /**
     * Etiqueta accesible de cada celda. Default: `Dígito N de M` (castellano).
     * Una app multiidioma debe pasarla traducida.
     */
    digitLabel?: (index: number, length: number) => string;
}
/**
 * Código de un solo uso repartido en celdas. El `ref` va a la **primera
 * celda**: es la que react-hook-form enfoca al fallar la validación.
 */
export declare const OtpInput: import("react").ForwardRefExoticComponent<OtpInputProps & import("react").RefAttributes<HTMLInputElement>>;
