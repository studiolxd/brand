import { forwardRef, useId } from 'react';
import './FileUploadField.css';
import { useFormSize } from '../../constants/form-size';
import { useLabelHidden } from '../../constants/field-labels';
import { Label } from '../../atoms/Label/Label';
import { FileUpload } from '../../atoms/FileUpload/FileUpload';
import type { FileUploadProps } from '../../atoms/FileUpload/FileUpload';

export interface FileUploadFieldProps
  extends Omit<FileUploadProps, 'describedBy' | 'ariaLabel' | 'aria-describedby' | 'id'> {
  /** `id` del control. Si no se pasa, se genera con `useId`. */
  id?: string;
  label: string;
  /**
   * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
   * Por defecto `false`: la etiqueta se ve, como en el resto de campos.
   * Sin valor, lo decide quien lo envuelva: dentro de un `FieldRow` que no
   * es la primera de la lista, la etiqueta se oculta sola.
   */
  labelHidden?: boolean;
  /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
  errorMessage?: string;
  /** Texto de ayuda, enlazado por `aria-describedby`. */
  helperText?: string;
  /**
   * Talla del sistema: mueve la etiqueta y la zona de arrastre a la vez (aire,
   * cuerpo del texto, icono y miniatura de cada archivo).
   * Sin ella, la del `Form` que lo envuelva; sin `Form`, `md`.
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * El `FileUpload` como campo de formulario. El `ref` va al `<input type="file">`
 * real (react-hook-form lo registra y lo enfoca al fallar la validación); el
 * `className`, al contenedor.
 */
export const FileUploadField = forwardRef<HTMLInputElement, FileUploadFieldProps>(function FileUploadField({
  id: idProp,
  label,
  labelHidden: labelHiddenProp,
  errorMessage,
  helperText,
  error = false,
  size: sizeProp,
  className,
  ...rest
}: FileUploadFieldProps, ref) {
  const labelHidden = useLabelHidden(labelHiddenProp);
  const size = useFormSize(sizeProp);
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;
  // Un mensaje de error implica estado de error, como en el resto de campos
  const hasError = error || !!errorMessage;

  return (
    <div className={['file-upload-field', className].filter(Boolean).join(' ')}>
      <Label htmlFor={id} hidden={labelHidden} size={size}>{label}</Label>
      <FileUpload
        ref={ref}
        {...rest}
        id={id}
        size={size}
        error={hasError}
        aria-describedby={describedBy}
      />
      {errorMessage && (
        <span id={errorId} className="file-upload-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="file-upload-field__helper">{helperText}</span>
      )}
    </div>
  );
});
