import { forwardRef, useState, useCallback, useRef, useEffect, useId, type Ref } from 'react';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import { useFormSize, type FormSize } from '../../constants/form-size';
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

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function validateFile(
  file: File,
  accept: string | undefined,
  maxSize: number | undefined,
  tooLargeError: (maxSize: string) => string,
  invalidTypeError: string,
): string | null {
  if (maxSize !== undefined && file.size > maxSize) {
    return tooLargeError(formatBytes(maxSize));
  }
  if (accept) {
    const patterns = accept.split(',').map(s => s.trim());
    const ok = patterns.some(p => {
      if (p.startsWith('.')) return file.name.toLowerCase().endsWith(p.toLowerCase());
      if (p.endsWith('/*')) return file.type.startsWith(p.slice(0, -2));
      return file.type === p;
    });
    if (!ok) return invalidTypeError;
  }
  return null;
}

/**
 * Las miniaturas se derivan durante el render en vez de guardarse en estado:
 * la cache garantiza que un mismo `File` devuelva siempre la misma object URL,
 * así que la llamada es idempotente y estable ante re-renders y StrictMode.
 * Con estado haría falta un `setState` dentro de un efecto — un render en
 * cascada innecesario, además de una violación de `set-state-in-effect`.
 */
const thumbUrlCache = new WeakMap<File, string>();

function thumbUrlFor(file: File): string | undefined {
  if (!file.type.startsWith('image/')) return undefined;
  let url = thumbUrlCache.get(file);
  if (!url) {
    url = URL.createObjectURL(file);
    thumbUrlCache.set(file, url);
  }
  return url;
}

function revokeThumbUrl(file: File): void {
  const url = thumbUrlCache.get(file);
  if (url) {
    URL.revokeObjectURL(url);
    thumbUrlCache.delete(file);
  }
}

function assignRef<T>(target: Ref<T> | undefined, node: T | null): void {
  if (typeof target === 'function') target(node);
  else if (target) (target as React.RefObject<T | null>).current = node;
}

/**
 * Zona de subida de archivos. El `ref` va al `<input type="file">` real, para
 * que react-hook-form pueda registrarlo y enfocarlo; `className` se concatena
 * a las clases del contenedor.
 */
export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(function FileUpload({
  multiple = false,
  accept,
  maxSize,
  maxFiles,
  value,
  defaultValue = [],
  onChange,
  progress,
  disabled = false,
  error = false,
  id,
  name,
  describedBy,
  ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-label': ariaLabelNative,
  required,
  onBlur,
  className,
  dropzoneLabel = 'Arrastra archivos aquí',
  dropzoneActiveLabel = 'Suelta los archivos aquí',
  dropzoneHintLabel = 'o haz clic para seleccionar',
  maxSizeHint = (size) => `máx. ${size}`,
  maxFilesHint = (n) => `hasta ${n} archivos`,
  filesLabel = 'Archivos seleccionados',
  progressLabel = 'Progreso de subida',
  removeFileLabel = (fileName) => `Eliminar ${fileName}`,
  tooLargeError = (size) => `Archivo demasiado grande (máx. ${size})`,
  invalidTypeError = 'Tipo de archivo no permitido',
  size: sizeProp,
}: FileUploadProps, ref) {
  const size = useFormSize(sizeProp);
  const isControlled = value !== undefined;
  const [internalFiles, setInternalFiles] = useState<File[]>(defaultValue);
  const [fileErrors, setFileErrors] = useState<Map<File, string>>(new Map());
  const [isDragging, setIsDragging] = useState(false);
  const seenFilesRef = useRef<Set<File>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const inputId = id ?? `file-upload-${generatedId}`;

  const files = isControlled ? value : internalFiles;

  // Acumula todo File que haya pasado por esta instancia para poder revocar su
  // miniatura al desmontar, incluso los que salieron de `value` en modo
  // controlado sin pasar por `removeFile`. Solo se escribe desde efectos.
  useEffect(() => {
    files.forEach(file => seenFilesRef.current.add(file));
  }, [files]);

  useEffect(() => {
    const seen = seenFilesRef.current;
    return () => {
      seen.forEach(revokeThumbUrl);
    };
  }, []);

  const addFiles = useCallback((incoming: FileList | File[]) => {
    if (disabled) return;
    const arr = Array.from(incoming);
    const current = isControlled ? (value ?? []) : internalFiles;
    const errors = new Map<File, string>(fileErrors);
    const nextFiles: File[] = [...current];

    for (const file of arr) {
      if (maxFiles !== undefined && nextFiles.filter(f => !errors.has(f)).length >= maxFiles) break;
      const err = validateFile(file, accept, maxSize, tooLargeError, invalidTypeError);
      if (err) errors.set(file, err);
      nextFiles.push(file);
    }

    setFileErrors(errors);
    if (!isControlled) setInternalFiles(nextFiles);
    onChange?.(nextFiles.filter(f => !errors.has(f)));
  }, [disabled, accept, maxSize, maxFiles, isControlled, value, internalFiles, fileErrors, onChange, tooLargeError, invalidTypeError]);

  const removeFile = useCallback((file: File) => {
    const current = isControlled ? (value ?? []) : internalFiles;
    const next = current.filter(f => f !== file);
    const errors = new Map(fileErrors);
    errors.delete(file);
    revokeThumbUrl(file);
    setFileErrors(errors);
    if (!isControlled) setInternalFiles(next);
    onChange?.(next.filter(f => !errors.has(f)));
    if (inputRef.current) inputRef.current.value = '';
  }, [isControlled, value, internalFiles, fileErrors, onChange]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) addFiles(e.target.files);
  };

  const handleDragOver: React.DragEventHandler = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave: React.DragEventHandler = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop: React.DragEventHandler = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled && e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  const handleDropzoneClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleDropzoneKeyDown: React.KeyboardEventHandler = (e) => {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  const wrapperClasses = [
    'file-upload',
    size !== 'md' ? `file-upload--${size}` : '',
    isDragging ? 'file-upload--dragging' : '',
    error ? 'file-upload--error' : '',
    disabled ? 'file-upload--disabled' : '',
    files.length > 0 ? 'file-upload--has-files' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  const subtextParts: string[] = [];
  if (accept) subtextParts.push(accept);
  if (maxSize) subtextParts.push(maxSizeHint(formatBytes(maxSize)));
  if (multiple && maxFiles) subtextParts.push(maxFilesHint(maxFiles));

  return (
    <div className={wrapperClasses}>
      <VisuallyHidden>
        <input
          ref={(node) => { inputRef.current = node; assignRef(ref, node); }}
          type="file"
          id={inputId}
          name={name}
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          required={required}
          aria-label={ariaLabel ?? ariaLabelNative}
          aria-describedby={describedBy ?? ariaDescribedBy}
          aria-invalid={error || undefined}
          onChange={handleInputChange}
          onBlur={onBlur}
          tabIndex={-1}
        />
      </VisuallyHidden>
      <div
        className="file-upload__dropzone"
        onClick={handleDropzoneClick}
        onKeyDown={handleDropzoneKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        /* El input real está oculto y fuera del tabulador: la zona de arrastre
           es lo que se enfoca, así que es la que lleva ayuda, error y estado. */
        aria-describedby={describedBy ?? ariaDescribedBy}
        aria-invalid={error || undefined}
      >
        <svg
          className="file-upload__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <span className="file-upload__text">
          {isDragging ? dropzoneActiveLabel : dropzoneLabel}
        </span>
        <span className="file-upload__text file-upload__text--secondary">
          {dropzoneHintLabel}
        </span>
        {subtextParts.length > 0 && (
          <span className="file-upload__subtext">{subtextParts.join(' · ')}</span>
        )}
      </div>

      {files.length > 0 && (
        <ul className="file-upload__list" aria-label={filesLabel}>
          {files.map((file, i) => {
            const err = fileErrors.get(file);
            const thumb = thumbUrlFor(file);
            return (
              <li
                key={`${file.name}-${file.size}-${i}`}
                className={`file-upload__item${err ? ' file-upload__item--error' : ''}`}
              >
                <div className="file-upload__item-thumb" aria-hidden="true">
                  {thumb ? (
                    <img src={thumb} alt="" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  )}
                </div>
                <div className="file-upload__item-info">
                  <span className="file-upload__item-name">{file.name}</span>
                  <span className="file-upload__item-size">{formatBytes(file.size)}</span>
                  {err && (
                    <span className="file-upload__item-error-msg" role="alert">{err}</span>
                  )}
                </div>
                <button
                  className="file-upload__item-remove"
                  type="button"
                  onClick={() => removeFile(file)}
                  aria-label={removeFileLabel(file.name)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {progress !== undefined && (
        <div
          className="file-upload__progress"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={progressLabel}
        >
          <div
            className="file-upload__progress-bar"
            style={{ '--file-upload-progress': `${progress}%` } as React.CSSProperties}
          />
        </div>
      )}
    </div>
  );
});
