import './TimeSelect.css';
export interface TimeValue {
    h: number;
    m: number;
}
export interface TimeSelectProps {
    value?: TimeValue | null;
    onChange?: (value: TimeValue) => void;
    /** Paso en minutos. Default: 5 */
    step?: number;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    readOnly?: boolean;
    error?: boolean;
    dark?: boolean;
    /** id aplicado al trigger de horas */
    id?: string;
}
export declare function TimeSelect({ value, onChange, step, size, disabled, readOnly, error, dark, id, }: TimeSelectProps): import("react/jsx-runtime").JSX.Element;
