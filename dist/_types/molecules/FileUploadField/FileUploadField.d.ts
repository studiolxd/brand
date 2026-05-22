import './FileUploadField.css';
import type { FileUploadProps } from '../../atoms/FileUpload/FileUpload';
export interface FileUploadFieldProps extends Omit<FileUploadProps, 'describedBy'> {
    id: string;
    label: string;
    labelHidden?: boolean;
    errorMessage?: string;
    helperText?: string;
}
export declare function FileUploadField({ id, label, labelHidden, errorMessage, helperText, error, ...rest }: FileUploadFieldProps): import("react/jsx-runtime").JSX.Element;
