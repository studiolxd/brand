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
    /** Enlaza con el elemento de error/helper externo para screen readers */
    describedBy?: string;
    id?: string;
    name?: string;
}
export declare function OtpInput({ length, value, defaultValue, onChange, onComplete, disabled, readOnly, error, size, describedBy, id, name, }: OtpInputProps): import("react/jsx-runtime").JSX.Element;
