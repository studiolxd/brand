import { useState, useCallback, useRef, useEffect, useId } from 'react';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
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

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function validateFile(
  file: File,
  accept: string | undefined,
  maxSize: number | undefined,
): string | null {
  if (maxSize !== undefined && file.size > maxSize) {
    return `Archivo demasiado grande (máx. ${formatBytes(maxSize)})`;
  }
  if (accept) {
    const patterns = accept.split(',').map(s => s.trim());
    const ok = patterns.some(p => {
      if (p.startsWith('.')) return file.name.toLowerCase().endsWith(p.toLowerCase());
      if (p.endsWith('/*')) return file.type.startsWith(p.slice(0, -2));
      return file.type === p;
    });
    if (!ok) return 'Tipo de archivo no permitido';
  }
  return null;
}

export function FileUpload({
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
}: FileUploadProps) {
  const isControlled = value !== undefined;
  const [internalFiles, setInternalFiles] = useState<File[]>(defaultValue);
  const [fileErrors, setFileErrors] = useState<Map<File, string>>(new Map());
  const [isDragging, setIsDragging] = useState(false);
  const thumbUrlsRef = useRef<Map<File, string>>(new Map());
  const [thumbUrls, setThumbUrls] = useState<Map<File, string>>(new Map());
  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const inputId = id ?? `file-upload-${generatedId}`;

  const files = isControlled ? value : internalFiles;

  useEffect(() => {
    const prev = thumbUrlsRef.current;
    const next = new Map<File, string>();
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        next.set(file, prev.get(file) ?? URL.createObjectURL(file));
      }
    });
    prev.forEach((url, file) => {
      if (!next.has(file)) URL.revokeObjectURL(url);
    });
    thumbUrlsRef.current = next;
    setThumbUrls(new Map(next));
  }, [files]);

  useEffect(() => {
    return () => {
      thumbUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
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
      const err = validateFile(file, accept, maxSize);
      if (err) errors.set(file, err);
      nextFiles.push(file);
    }

    setFileErrors(errors);
    if (!isControlled) setInternalFiles(nextFiles);
    onChange?.(nextFiles.filter(f => !errors.has(f)));
  }, [disabled, accept, maxSize, maxFiles, isControlled, value, internalFiles, fileErrors, onChange]);

  const removeFile = useCallback((file: File) => {
    const current = isControlled ? (value ?? []) : internalFiles;
    const next = current.filter(f => f !== file);
    const errors = new Map(fileErrors);
    errors.delete(file);
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
    isDragging ? 'file-upload--dragging' : '',
    error ? 'file-upload--error' : '',
    disabled ? 'file-upload--disabled' : '',
    files.length > 0 ? 'file-upload--has-files' : '',
  ].filter(Boolean).join(' ');

  const subtextParts: string[] = [];
  if (accept) subtextParts.push(accept);
  if (maxSize) subtextParts.push(`máx. ${formatBytes(maxSize)}`);
  if (multiple && maxFiles) subtextParts.push(`hasta ${maxFiles} archivos`);

  return (
    <div className={wrapperClasses}>
      <VisuallyHidden>
        <input
          ref={inputRef}
          type="file"
          id={inputId}
          name={name}
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          aria-label={ariaLabel}
          aria-describedby={describedBy}
          onChange={handleInputChange}
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
      >
        <svg
          className="file-upload__icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
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
          {isDragging ? 'Suelta los archivos aquí' : 'Arrastra archivos aquí'}
        </span>
        <span className="file-upload__text file-upload__text--secondary">
          o haz clic para seleccionar
        </span>
        {subtextParts.length > 0 && (
          <span className="file-upload__subtext">{subtextParts.join(' · ')}</span>
        )}
      </div>

      {files.length > 0 && (
        <ul className="file-upload__list" aria-label="Archivos seleccionados">
          {files.map((file, i) => {
            const err = fileErrors.get(file);
            const thumb = thumbUrls.get(file);
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
                  aria-label={`Eliminar ${file.name}`}
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
          aria-label="Progreso de subida"
        >
          <div
            className="file-upload__progress-bar"
            style={{ '--file-upload-progress': `${progress}%` } as React.CSSProperties}
          />
        </div>
      )}
    </div>
  );
}
