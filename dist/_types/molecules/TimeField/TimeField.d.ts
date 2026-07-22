import type { TimeValue } from '../../atoms/TimeSelect/TimeSelect';
import './TimeField.css';
export interface TimeFieldProps {
    id: string;
    label: string;
    labelHidden?: boolean;
    value?: TimeValue | null;
    onChange?: (value: TimeValue) => void;
    step?: number;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    readOnly?: boolean;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
}
export declare function TimeField({ id, label, labelHidden, value, onChange, step, size, disabled, readOnly, error, errorMessage, helperText, }: TimeFieldProps): import("react/jsx-runtime").JSX.Element;
