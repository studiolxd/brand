import './OtpInput.css';
/**
 * Los textos que el control emite por su cuenta: el nombre del grupo cuando va
 * suelto y el de cada celda. Cromo — el segundo solo interpola la posición de
 * la celda, que es una cifra.
 */
export interface OtpInputMessages {
    /** Nombre accesible del grupo de celdas cuando el control va suelto. */
    group: string;
    /** Nombre accesible de una celda, con su posición y el total. */
    digit: (index: number, length: number) => string;
}
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
    /** Nombre accesible explícito del grupo: prevalece sobre `groupLabel`. */
    'aria-label'?: string;
    /** Nombre accesible del grupo por referencia (la etiqueta visible del campo). */
    'aria-labelledby'?: string;
    /**
     * Nombre accesible del grupo cuando no se pasa `aria-label` ni
     * `aria-labelledby` — el caso del control suelto. **Sin default**: sale de
     * `otpInput.group` del `BrandMessagesProvider`.
     */
    groupLabel?: string;
    id?: string;
    /**
     * Nombre de cada celda es `${name}-${i}`. Además, si se pasa, se añade un
     * `<input type="hidden">` con este `name` y el código completo, para que un
     * `<form>` nativo (sin react-hook-form ni otro gestor JS) reciba el valor
     * entero en un único campo de `FormData`.
     */
    name?: string;
    /** Se llama al salir de la última celda (react-hook-form lo usa para validar). */
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    /** Se añade DESPUÉS de las clases propias del componente. */
    className?: string;
    /**
     * Etiqueta accesible de cada celda. **Sin default**: sale de
     * `otpInput.digit` del `BrandMessagesProvider`.
     */
    digitLabel?: (index: number, length: number) => string;
}
/**
 * Código de un solo uso repartido en celdas. El `ref` va a la **primera
 * celda**: es la que react-hook-form enfoca al fallar la validación.
 */
export declare const OtpInput: import("react").ForwardRefExoticComponent<OtpInputProps & import("react").RefAttributes<HTMLInputElement>>;
