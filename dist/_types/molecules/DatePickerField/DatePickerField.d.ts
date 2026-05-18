import type { DatePickerProps } from '../DatePicker/DatePicker';
import './DatePickerField.css';
export interface DatePickerFieldProps extends Omit<DatePickerProps, 'id' | 'describedBy'> {
    id: string;
    label: string;
    labelHidden?: boolean;
    errorMessage?: string;
    helperText?: string;
}
export declare function DatePickerField({ id, label, labelHidden, errorMessage, helperText, error, ...pickerProps }: DatePickerFieldProps): import("react/jsx-runtime").JSX.Element;
