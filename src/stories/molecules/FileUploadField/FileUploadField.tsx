import './FileUploadField.css';
import { Label } from '../../atoms/Label/Label';
import { FileUpload } from '../../atoms/FileUpload/FileUpload';
import type { FileUploadProps } from '../../atoms/FileUpload/FileUpload';

export interface FileUploadFieldProps extends Omit<FileUploadProps, 'describedBy'> {
  id: string;
  label: string;
  labelHidden?: boolean;
  errorMessage?: string;
  helperText?: string;
}

export function FileUploadField({
  id,
  label,
  labelHidden = false,
  errorMessage,
  helperText,
  error,
  ...rest
}: FileUploadFieldProps) {
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="file-upload-field">
      <Label htmlFor={id} hidden={labelHidden}>{label}</Label>
      <FileUpload
        id={id}
        error={error || !!errorMessage}
        describedBy={describedBy}
        {...rest}
      />
      {errorMessage && (
        <span id={errorId} className="file-upload-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="file-upload-field__helper">{helperText}</span>
      )}
    </div>
  );
}
