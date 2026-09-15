import { type FormSize } from '../../constants/form-size';
import './FileUpload.css';
/**
 * El cromo de la zona de subida: lo que dice la zona, lo que dice de los
 * límites y lo que dice cuando un archivo no vale.
 *
 * Las dos pistas de límite son **plantillas y no frases hechas**, y ahí está
 * la parte interesante. «Máximo 2,5 MB» tiene dos mitades que se deciden en
 * sitios distintos, igual que `dd/mm/aaaa`: la frase es idioma y sale de aquí;
 * la cifra —la coma o el punto decimal, el espacio antes de `MB`— es formato y
 * la escribe `Intl.NumberFormat` con el `locale` del componente. Por eso el
 * catálogo recibe el peso **ya formateado** y solo lo envuelve: una traducción
 * que escribiera «max. 2.5 MB» a mano metería el punto inglés en una interfaz
 * española.
 */
export interface FileUploadMessages {
    /** Texto visible de la zona de arrastre en reposo. */
    dropzone: string;
    /** Texto visible mientras se arrastra un archivo por encima. */
    dropzoneActive: string;
    /** Texto visible secundario: que además se puede hacer clic. */
    dropzoneHint: string;
    /** Pista de peso máximo. Recibe el peso **ya escrito en el locale** («2,5 MB»). */
    maxSize: (maxSize: string) => string;
    /** Pista de número máximo de archivos. */
    maxFiles: (maxFiles: number) => string;
    /** aria-label de la lista de archivos elegidos. */
    files: string;
    /** aria-label de la barra de progreso. */
    progress: string;
    /** aria-label del botón de quitar un archivo de la lista. */
    removeFile: (fileName: string) => string;
    /** Error de archivo demasiado pesado. Recibe el peso ya escrito en el locale. */
    tooLarge: (maxSize: string) => string;
    /** Error de tipo de archivo no admitido. */
    invalidType: string;
}
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
     * Locale con el que se escriben **los pesos** («2,5 MB» / «2.5 MB»). No
     * decide el idioma de los textos —eso es el catálogo— sino el formato de la
     * cifra. Default `'es-ES'`.
     */
    locale?: string;
    /**
     * Texto visible de la zona de arrastre. **Sin default**: sin él, sale de
     * `fileUpload.dropzone` del `BrandMessagesProvider`.
     */
    dropzoneLabel?: string;
    /**
     * Texto visible mientras se arrastra encima. **Sin default**: sin él, sale
     * de `fileUpload.dropzoneActive`.
     */
    dropzoneActiveLabel?: string;
    /**
     * Texto visible secundario de la zona. **Sin default**: sin él, sale de
     * `fileUpload.dropzoneHint`.
     */
    dropzoneHintLabel?: string;
    /**
     * Pista de peso máximo. Recibe el peso **ya escrito en el locale**.
     * **Sin default**: sin ella, sale de `fileUpload.maxSize`.
     */
    maxSizeHint?: (maxSize: string) => string;
    /**
     * Pista de número máximo de archivos. **Sin default**: sin ella, sale de
     * `fileUpload.maxFiles`.
     */
    maxFilesHint?: (maxFiles: number) => string;
    /**
     * aria-label de la lista de archivos. **Sin default**: sin él, sale de
     * `fileUpload.files`.
     */
    filesLabel?: string;
    /**
     * aria-label de la barra de progreso. **Sin default**: sin él, sale de
     * `fileUpload.progress`.
     */
    progressLabel?: string;
    /**
     * aria-label del botón de quitar un archivo. **Sin default**: sin él, sale
     * de `fileUpload.removeFile`.
     */
    removeFileLabel?: (fileName: string) => string;
    /**
     * Error de archivo demasiado pesado. **Sin default**: sin él, sale de
     * `fileUpload.tooLarge`.
     */
    tooLargeError?: (maxSize: string) => string;
    /**
     * Error de tipo no admitido. **Sin default**: sin él, sale de
     * `fileUpload.invalidType`.
     */
    invalidTypeError?: string;
}
/**
 * Zona de subida de archivos. El `ref` va al `<input type="file">` real, para
 * que react-hook-form pueda registrarlo y enfocarlo; `className` se concatena
 * a las clases del contenedor.
 */
export declare const FileUpload: import("react").ForwardRefExoticComponent<FileUploadProps & import("react").RefAttributes<HTMLInputElement>>;
