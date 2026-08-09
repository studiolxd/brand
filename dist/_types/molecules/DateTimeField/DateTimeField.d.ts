import type { CalendarProps } from '../Calendar/Calendar';
import './DateTimeField.css';
export interface DateTimeFieldProps {
    id: string;
    label: string;
    labelHidden?: boolean;
    value?: Date | null;
    onChange?: (date: Date | null) => void;
    placeholder?: string;
    timeStep?: number;
    minDate?: CalendarProps['minDate'];
    maxDate?: CalendarProps['maxDate'];
    disabledDates?: CalendarProps['disabledDates'];
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    readOnly?: boolean;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
    locale?: string;
}
export declare function DateTimeField({ id, label, labelHidden, value, onChange, placeholder, timeStep, minDate, maxDate, disabledDates, size, disabled, readOnly, error, errorMessage, helperText, locale, }: DateTimeFieldProps): import("react/jsx-runtime").JSX.Element;
