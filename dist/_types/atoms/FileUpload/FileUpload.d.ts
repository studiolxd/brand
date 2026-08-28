import { type FormSize } from '../../constants/form-size';
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
    /**
     * Talla del sistema. La zona de arrastre no es un control de una línea, así
     * que no toma la altura 32/40/48: lo que sigue a la talla es su aire, el
     * cuerpo de su texto, el icono y la miniatura de cada archivo (32/40/48, esa
     * sí, porque la fila de un archivo es una fila de control).
     * Sin ella, la del `Form` que lo envuelva; sin `Form`, `md`.
     */
    size?: FormSize;
    /** @deprecated Usa el atributo nativo `aria-describedby`. */
    describedBy?: string;
    /** @deprecated Usa el atributo nativo `aria-label`. */
    ariaLabel?: string;
    /** Ids de ayuda/error que describen el control (lo pone el campo). */
    'aria-describedby'?: string;
    /** Nombre accesible cuando el control va suelto. */
    'aria-label'?: string;
    required?: boolean;
    /** Se llama al salir del `<input type="file">` (react-hook-form lo usa para validar). */
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    /** Se añade DESPUÉS de las clases propias del componente. */
    className?: string;
    /**
     * Texto visible de la zona de arrastre. Default: "Arrastra archivos aquí" (castellano).
     * Una app multiidioma debe pasarlo traducido — igual que el resto de props de texto.
     */
    dropzoneLabel?: string;
    /** Texto visible mientras se arrastra encima. Default: "Suelta los archivos aquí" */
    dropzoneActiveLabel?: string;
    /** Texto visible secundario de la zona. Default: "o haz clic para seleccionar" */
    dropzoneHintLabel?: string;
    /** Pista de tamaño máximo. Default: `máx. ${size}` (el tamaño ya viene formateado) */
    maxSizeHint?: (maxSize: string) => string;
    /** Pista de número máximo de archivos. Default: `hasta ${n} archivos` */
    maxFilesHint?: (maxFiles: number) => string;
    /** aria-label de la lista de archivos. Default: "Archivos seleccionados" */
    filesLabel?: string;
    /** aria-label de la barra de progreso. Default: "Progreso de subida" */
    progressLabel?: string;
    /** aria-label del botón de eliminar archivo. Default: `Eliminar ${nombre}` */
    removeFileLabel?: (fileName: string) => string;
    /** Error de archivo demasiado grande. Default: `Archivo demasiado grande (máx. ${size})` */
    tooLargeError?: (maxSize: string) => string;
    /** Error de tipo no admitido. Default: "Tipo de archivo no permitido" */
    invalidTypeError?: string;
}
/**
 * Zona de subida de archivos. El `ref` va al `<input type="file">` real, para
 * que react-hook-form pueda registrarlo y enfocarlo; `className` se concatena
 * a las clases del contenedor.
 */
export declare const FileUpload: import("react").ForwardRefExoticComponent<FileUploadProps & import("react").RefAttributes<HTMLInputElement>>;
