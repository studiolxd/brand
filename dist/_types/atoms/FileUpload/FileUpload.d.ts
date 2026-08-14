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
export declare function FileUpload({ multiple, accept, maxSize, maxFiles, value, defaultValue, onChange, progress, disabled, error, id, name, describedBy, ariaLabel, dropzoneLabel, dropzoneActiveLabel, dropzoneHintLabel, maxSizeHint, maxFilesHint, filesLabel, progressLabel, removeFileLabel, tooLargeError, invalidTypeError, }: FileUploadProps): import("react/jsx-runtime").JSX.Element;
