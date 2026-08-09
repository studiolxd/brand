import type { CalendarProps } from '../Calendar/Calendar';
import './DatePicker.css';
export interface DatePickerProps {
    value?: Date | null;
    onChange?: (date: Date) => void;
    placeholder?: string;
    minDate?: CalendarProps['minDate'];
    maxDate?: CalendarProps['maxDate'];
    disabledDates?: CalendarProps['disabledDates'];
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    readOnly?: boolean;
    error?: boolean;
    locale?: string;
    /** id aplicado al botón trigger */
    id?: string;
    /** aria-describedby para el trigger */
    describedBy?: string;
}
export declare function DatePicker({ value, onChange, placeholder, minDate, maxDate, disabledDates, size, disabled, readOnly, error, locale, id, describedBy, }: DatePickerProps): import("react/jsx-runtime").JSX.Element;
