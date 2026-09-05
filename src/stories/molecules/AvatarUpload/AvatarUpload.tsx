'use client';

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Avatar } from '../../atoms/Avatar/Avatar';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import { formatBytes, validateFile } from '../../atoms/FileUpload/validate';
import { ImageCropDialog } from '../ImageCropDialog/ImageCropDialog';
import { useFormSize, type FormSize } from '../../constants/form-size';
import { isDevelopment } from '../../constants/env';
import './AvatarUpload.css';

/**
 * La talla del avatar que le toca a cada talla de control: **cuatro peldaños por
 * encima**. Aquí el avatar no acompaña al botón —es el retrato, el asunto de la
 * pantalla, y además la diana sobre la que se suelta el archivo—, así que se
 * mide con la escala de marca y no con la de controles. En `lg`, la talla del
 * alta, son 192px; a 375px eso ya no cabe con el botón al lado, y la fila
 * envuelve.
 */
const AVATAR_SIZE = { sm: '2xl', md: '3xl', lg: '4xl' } as const;

/** El icono del velo sube con el avatar: sobre 192px, el de 24px se perdía. */
const OVERLAY_ICON_SIZE = { sm: 'md', md: 'lg', lg: 'xl' } as const;

export interface AvatarUploadProps {
  /** URL de la imagen actual. Sin ella, el avatar enseña las iniciales de `name`. */
  src?: string | null;
  /** Nombre de la persona o de la organización: da las iniciales y el nombre accesible. */
  name?: string;
  /** Nombre accesible del avatar. Por defecto, `name`. */
  alt?: string;
  /** `circle` para personas, `square` para organizaciones. También decide la selección del recorte. */
  shape?: 'circle' | 'square';
  /**
   * Talla del sistema: mueve a la vez el botón y el avatar (que va cuatro
   * peldaños por encima: `sm` → 96px, `md` → 128px, `lg` → 192px).
   * Sin ella, la del `Form`/`FormSizeContext` que lo envuelva; sin contexto, `md`.
   */
  size?: FormSize;
  /** Tipos MIME admitidos, como el `accept` del input. */
  accept?: string;
  /** Peso máximo en bytes. Sin él, no hay límite de peso. */
  maxSize?: number;
  /** Formato del recorte que se entrega. */
  outputMimeType?: 'image/jpeg' | 'image/png' | 'image/webp';
  /** Lado del recorte que se entrega, en píxeles. */
  outputSize?: number;
  disabled?: boolean;
  /** El consumidor está subiendo: bloquea el botón, la diana y el diálogo. */
  busy?: boolean;
  /** Error del consumidor (el que devuelve el servidor). Se suma al de la validación de cliente. */
  errorMessage?: string;

  /** El recorte confirmado, con el archivo original del que salió. */
  onChange: (blob: Blob, file: File) => void | Promise<void>;
  /** El archivo elegido (por botón o soltándolo) que ha pasado la validación, antes de recortar. */
  onSelect?: (file: File) => void;
  /** Un archivo rechazado por la validación de cliente, con el mensaje que se enseña. */
  onError?: (message: string) => void;

  /**
   * Texto **visible** del botón. Default: "Subir" (castellano).
   * Corto a propósito: el nombre completo va en `buttonAccessibleLabel`.
   */
  buttonLabel?: string;
  /**
   * Nombre **accesible** del botón, para decir de qué es la subida ("Subir
   * logo", "Subir avatar"). Por defecto, `buttonLabel`.
   *
   * WCAG 2.5.3 (Label in Name) exige que **contenga** el texto visible: quien
   * navega por voz dice lo que ve. "Subir" dentro de "Subir logo" cumple;
   * "Cargar imagen de la organización" no, y deja el control inalcanzable.
   * En desarrollo se avisa por consola si no lo contiene.
   */
  buttonAccessibleLabel?: string;
  /**
   * Qué se puede subir. No se ve: describe el botón (`aria-describedby`),
   * porque el `accept` del input no lo anuncia ningún lector de pantalla.
   * Default: los formatos y el peso máximo ("JPEG, PNG, WEBP · máx. 5 MB").
   */
  hintLabel?: string;
  /**
   * Los formatos, escritos para leer. Default: los subtipos de `accept` en
   * mayúsculas. Con comodines (`image/*`) pásalo escrito.
   */
  formatsLabel?: string;
  /** Pista de peso máximo. Default: `máx. ${size}` (el peso ya viene formateado). */
  maxSizeHint?: (maxSize: string) => string;
  /**
   * Error de formato. Default: `Formato no admitido. Se aceptan ${formatos}.`
   * Dice lo que SÍ se acepta: por el botón el error es imposible (lo filtra el
   * diálogo del sistema), pero soltando un archivo no hay filtro que valga.
   */
  invalidTypeError?: (formats: string) => string;
  /** Error de peso. Default: `El archivo pesa demasiado. El máximo es ${max}.` */
  tooLargeError?: (maxSize: string) => string;
  /**
   * Lo que se anuncia cuando empieza un arrastre sobre la ventana.
   * Default: "Suelta la imagen sobre el avatar para subirla".
   */
  dropActiveMessage?: string;

  /**
   * Título del diálogo de recorte. Default: "Recortar imagen" (castellano).
   * Es una acción, no una invitación: nombra lo que va a pasar, sin segunda
   * persona, como el resto de títulos de diálogo del sistema.
   */
  cropTitle?: string;
  /**
   * Descripción del diálogo de recorte. **Sin default**: el diálogo enseña la
   * imagen y su marco de selección, que se explican solos. Pásala solo si en
   * tu caso hay algo que decir que no esté ya a la vista.
   */
  cropDescription?: ReactNode;
  /** Default: "Cancelar". */
  cropCancelLabel?: ReactNode;
  /** Default: "Guardar". */
  cropConfirmLabel?: ReactNode;
  /** Etiqueta del aspa de cerrar. Default: "Cerrar". */
  cropCloseLabel?: string;

  /** Se añade DESPUÉS de las clases propias del componente. */
  className?: string;
}

/** Los formatos de un `accept`, escritos para leer: `image/jpeg,.png` → `JPEG, PNG`. */
function formatsFrom(accept: string): string {
  return accept
    .split(',')
    .map(part => part.trim())
    .filter(Boolean)
    .map(part => (part.startsWith('.') ? part.slice(1) : (part.split('/')[1] ?? part)))
    .map(part => part.toUpperCase())
    .join(', ');
}

/**
 * El avatar de una entidad —una persona o una organización— con su subida: se
 * elige la imagen con el botón o soltándola sobre el avatar, se recorta y se
 * entrega el recorte. La subida de verdad (a dónde va el archivo) es del
 * producto: el componente pone presentación, interacción, validación de
 * cliente y recorte.
 *
 * La diana es el avatar, no el bloque: lo que acepta el archivo es lo que se
 * va a sustituir. Como diana es pequeña, en cuanto empieza un arrastre sobre
 * la ventana el avatar se anuncia con un anillo (y con un mensaje para quien
 * no ve la pantalla); el anillo se pinta con `outline`, por fuera, así que la
 * zona sensible sigue siendo exactamente el avatar. El botón se queda siempre:
 * arrastrar no existe para el teclado, así que es la vía principal, no un
 * respaldo.
 */
export function AvatarUpload({
  src,
  name,
  alt,
  shape = 'circle',
  size: sizeProp,
  accept = 'image/jpeg,image/png,image/webp',
  maxSize,
  outputMimeType = 'image/jpeg',
  outputSize,
  disabled = false,
  busy = false,
  errorMessage,
  onChange,
  onSelect,
  onError,
  buttonLabel = 'Subir',
  buttonAccessibleLabel,
  hintLabel,
  formatsLabel,
  maxSizeHint = (max) => `máx. ${max}`,
  invalidTypeError = (formats) => `Formato no admitido. Se aceptan ${formats}.`,
  tooLargeError = (max) => `El archivo pesa demasiado. El máximo es ${max}.`,
  dropActiveMessage = 'Suelta la imagen sobre el avatar para subirla',
  cropTitle = 'Recortar imagen',
  cropDescription,
  cropCancelLabel = 'Cancelar',
  cropConfirmLabel = 'Guardar',
  cropCloseLabel = 'Cerrar',
  className,
}: AvatarUploadProps) {
  const size = useFormSize(sizeProp);
  const inputRef = useRef<HTMLInputElement>(null);
  const sourceRef = useRef<{ url: string; file: File } | null>(null);
  const [source, setSource] = useState<{ url: string; file: File } | null>(null);
  // Hay un arrastre en marcha en algún punto de la ventana: la diana se anuncia.
  const [armed, setArmed] = useState(false);
  // El arrastre está justo encima del avatar.
  const [over, setOver] = useState(false);
  const [invalid, setInvalid] = useState<string | null>(null);
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  const formats = formatsLabel ?? formatsFrom(accept);
  const hint = hintLabel ?? [formats, maxSize !== undefined ? maxSizeHint(formatBytes(maxSize)) : null]
    .filter(Boolean)
    .join(' · ');
  const message = invalid ?? errorMessage;
  const inert = disabled || busy;

  const accessibleLabel = buttonAccessibleLabel ?? buttonLabel;
  if (isDevelopment() && !accessibleLabel.toLowerCase().includes(buttonLabel.toLowerCase())) {
    console.warn(
      `[AvatarUpload] El nombre accesible del botón ("${accessibleLabel}") no contiene su texto visible ("${buttonLabel}"). ` +
        'WCAG 2.5.3 (Label in Name) lo exige: quien navega por voz dice lo que ve, y con estos textos no encontraría el control.',
    );
  }

  // El object URL es del componente mientras el diálogo está abierto: se
  // revoca al cerrarlo y al desmontar, nunca se deja colgando.
  useEffect(() => {
    sourceRef.current = source;
  }, [source]);
  useEffect(() => () => {
    if (sourceRef.current) URL.revokeObjectURL(sourceRef.current.url);
  }, []);

  // Un arrastre empieza lejos de la diana. Escuchar en la ventana es lo que
  // permite anunciarla a tiempo, cuando el archivo aún viene de camino.
  useEffect(() => {
    if (inert) return;
    let depth = 0;
    const carriesFiles = (event: DragEvent) =>
      Array.from(event.dataTransfer?.types ?? []).includes('Files');
    const enter = (event: DragEvent) => {
      if (!carriesFiles(event)) return;
      depth += 1;
      setArmed(true);
    };
    const leave = () => {
      depth = Math.max(0, depth - 1);
      if (depth === 0) setArmed(false);
    };
    const end = () => {
      depth = 0;
      setArmed(false);
    };
    window.addEventListener('dragenter', enter);
    window.addEventListener('dragleave', leave);
    window.addEventListener('drop', end);
    window.addEventListener('dragend', end);
    return () => {
      window.removeEventListener('dragenter', enter);
      window.removeEventListener('dragleave', leave);
      window.removeEventListener('drop', end);
      window.removeEventListener('dragend', end);
      setArmed(false);
    };
  }, [inert]);

  const takeFile = useCallback((file: File) => {
    const error = validateFile(file, accept, maxSize, tooLargeError, invalidTypeError(formats));
    if (error) {
      setInvalid(error);
      onError?.(error);
      return;
    }
    setInvalid(null);
    onSelect?.(file);
    setSource({ url: URL.createObjectURL(file), file });
  }, [accept, maxSize, tooLargeError, invalidTypeError, formats, onError, onSelect]);

  const closeDialog = () => {
    if (source) URL.revokeObjectURL(source.url);
    setSource(null);
  };

  const handleConfirm = async (blob: Blob) => {
    if (!source) return;
    await onChange(blob, source.file);
  };

  const classes = [
    'avatar-upload',
    shape === 'square' ? 'avatar-upload--square' : '',
    armed ? 'avatar-upload--armed' : '',
    over ? 'avatar-upload--over' : '',
    inert ? 'avatar-upload--inert' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {/* La diana es el avatar: lo que acepta el archivo es justo lo que se
          sustituye. No es una parada del tabulador —el botón es la vía del
          teclado— y el clic sobre ella es el mismo atajo que el arrastre. */}
      <div
        className="avatar-upload__target"
        onClick={() => { if (!inert) inputRef.current?.click(); }}
        onDragEnter={(event) => { event.preventDefault(); if (!inert) setOver(true); }}
        onDragOver={(event) => {
          event.preventDefault();
          if (inert) return;
          event.dataTransfer.dropEffect = 'copy';
          setOver(true);
        }}
        onDragLeave={(event) => {
          if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
          setOver(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setOver(false);
          setArmed(false);
          if (inert) return;
          const file = event.dataTransfer.files?.[0];
          if (file) takeFile(file);
        }}
      >
        <Avatar
          src={src ?? undefined}
          name={name}
          {...(alt !== undefined ? { alt } : {})}
          shape={shape}
          size={AVATAR_SIZE[size]}
        />
        <span className="avatar-upload__overlay" aria-hidden="true">
          <Icon name="upload" size={OVERLAY_ICON_SIZE[size]} />
        </span>
      </div>

      <div className="avatar-upload__body">
        {/* El control real. No está en el tabulador: el botón de al lado es el
            que se ve, el que se enfoca y el que lo dispara. */}
        <input
          ref={inputRef}
          type="file"
          className="avatar-upload__input"
          accept={accept}
          tabIndex={-1}
          aria-hidden="true"
          disabled={inert}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) takeFile(file);
            // Elegir dos veces el mismo archivo tiene que volver a disparar el
            // change: sin esto el segundo intento no pasa nada.
            event.target.value = '';
          }}
        />
        <Button
          variant="outline"
          size={size}
          disabled={inert}
          onClick={() => inputRef.current?.click()}
          {...(accessibleLabel !== buttonLabel ? { 'aria-label': accessibleLabel } : {})}
          aria-describedby={[hint ? hintId : null, message ? errorId : null].filter(Boolean).join(' ') || undefined}
        >
          {buttonLabel}
        </Button>
        {hint && <VisuallyHidden id={hintId}>{hint}</VisuallyHidden>}
        {message && (
          <span id={errorId} className="avatar-upload__error" role="alert">{message}</span>
        )}
      </div>

      {/* Arrastrar no se ve con un lector de pantalla, pero sí se puede estar
          haciendo con el ratón mientras se escucha: el aviso dice dónde soltar. */}
      <VisuallyHidden role="status">{armed ? dropActiveMessage : ''}</VisuallyHidden>

      <ImageCropDialog
        sourceUrl={source?.url ?? null}
        title={cropTitle}
        description={cropDescription}
        circularCrop={shape === 'circle'}
        outputMimeType={outputMimeType}
        {...(outputSize !== undefined ? { outputSize } : {})}
        busy={busy}
        cancelLabel={cropCancelLabel}
        confirmLabel={cropConfirmLabel}
        closeLabel={cropCloseLabel}
        onConfirm={handleConfirm}
        onClose={closeDialog}
      />
    </div>
  );
}
