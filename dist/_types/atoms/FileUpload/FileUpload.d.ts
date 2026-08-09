import './FileUpload.css';
export interface FileUploadProps {
    multiple?: boolean;
    accept?: string;
    maxSize?: number;
    maxFiles?: number;
    value?: File[];
    defaultValue?: File[];
    onChange?: (files: File[]) => void;
    progress?: number;
    disabled?: boolean;
    error?: boolean;
    id?: string;
    name?: string;
    describedBy?: string;
    ariaLabel?: string;
}
export declare function FileUpload({ multiple, accept, maxSize, maxFiles, value, defaultValue, onChange, progress, disabled, error, id, name, describedBy, ariaLabel, }: FileUploadProps): import("react/jsx-runtime").JSX.Element;
