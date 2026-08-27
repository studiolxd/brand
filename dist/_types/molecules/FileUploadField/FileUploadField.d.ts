import './FileUploadField.css';
import type { FileUploadProps } from '../../atoms/FileUpload/FileUpload';
export interface FileUploadFieldProps extends Omit<FileUploadProps, 'describedBy' | 'ariaLabel' | 'aria-describedby' | 'id'> {
    /** `id` del control. Si no se pasa, se genera con `useId`. */
    id?: string;
    label: string;
    /**
     * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
     * Por defecto `false`: la etiqueta se ve, como en el resto de campos.
     */
    labelHidden?: boolean;
    /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
    errorMessage?: string;
    /** Texto de ayuda, enlazado por `aria-describedby`. */
    helperText?: string;
    /** Talla del sistema. Solo afecta a la etiqueta: la zona de arrastre no tiene tallas. */
    size?: 'sm' | 'md' | 'lg';
}
/**
 * El `FileUpload` como campo de formulario. El `ref` va al `<input type="file">`
 * real (react-hook-form lo registra y lo enfoca al fallar la validación); el
 * `className`, al contenedor.
 */
export declare const FileUploadField: import("react").ForwardRefExoticComponent<FileUploadFieldProps & import("react").RefAttributes<HTMLInputElement>>;
