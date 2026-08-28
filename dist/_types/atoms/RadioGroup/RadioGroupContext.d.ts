/** Lo que el grupo presta a cada opción que cuelga de él. */
export interface RadioGroupContextValue {
    name: string;
    value: string | undefined;
    select: (value: string) => void;
    disabled: boolean | undefined;
    size: 'sm' | 'md' | 'lg' | undefined;
    error: boolean | undefined;
}
export declare const RadioGroupContext: import("react").Context<RadioGroupContextValue | null>;
/**
 * Lo usan `Radio` y `RadioField` para saber si cuelgan de un grupo. Vive en su
 * propio módulo para que el fichero del componente solo exporte componentes.
 */
export declare function useRadioGroup(): RadioGroupContextValue | null;
