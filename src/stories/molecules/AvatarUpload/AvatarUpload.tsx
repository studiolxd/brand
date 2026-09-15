'use client';

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Avatar } from '../../atoms/Avatar/Avatar';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import { DEFAULT_LOCALE, formatFileSize, formatList, validateFile } from '../../atoms/FileUpload/validate';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import { ImageCropDialog } from '../ImageCropDialog/ImageCropDialog';
import { useFormSize, type FormSize } from '../../constants/form-size';
import { isDevelopment } from '../../constants/env';
import './AvatarUpload.css';
import { ErrorText } from '../../atoms/ErrorText/ErrorText';

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

/**
 * El cromo de la subida de avatar. Todo lo de aquí vale igual en la pantalla
 * de la cuenta y en la de la organización; lo que cambia entre las dos —qué se
 * sube— entra por `subject`, que es contenido y sigue siendo prop.
 *
 * **El par visible/accesible del botón está aquí entero, y a propósito.**
 * WCAG 2.5.3 (Label in Name) exige que el nombre accesible **contenga** el
 * texto visible: quien navega por voz dice lo que ve. Si el visible saliera
 * del catálogo común («Subir») y el accesible de la pantalla («Subir logo»),
 * los dos lados del contrato vivirían en ficheros distintos y una traducción
 * podría romperlo sin que nada fallara — el botón quedaría inalcanzable por
 * voz. Por eso el catálogo trae los dos: `button`, el verbo suelto, y
 * `buttonFor`, la **plantilla** que lo envuelve con el sujeto.
 *
 * La plantilla, y no una concatenación en el componente, porque el orden es
 * del idioma: «Subir el logo» y *«Upload the logo»* ponen el verbo delante,
 * pero el alemán lo pone al final («das Logo hochladen»). Un `${verbo}
 * ${sujeto}` cableado aquí sería castellano disfrazado.
 *
 * **La regla del catálogo, en una línea: `buttonFor(x)` tiene que contener
 * `button`.** En desarrollo se avisa por consola si no lo cumple.
 */
export interface AvatarUploadMessages {
  /** Texto **visible** del botón: el verbo suelto («Subir»). */
  button: string;
  /**
   * Nombre **accesible** del botón, con el sujeto dentro («Subir el logo»).
   * Tiene que contener `button`, o WCAG 2.5.3 se rompe.
   */
  buttonFor: (subject: string) => string;
  /** Qué se sube cuando la pantalla no lo dice: el sujeto genérico («el avatar»). */
  subject: string;
  /** Pista **visible** de que además se puede arrastrar. */
  dropHint: (subject: string) => string;
  /** Lo que se anuncia cuando empieza un arrastre sobre la ventana. */
  dropActive: (subject: string) => string;
  /** Pista de peso máximo. Recibe el peso **ya escrito en el locale** («2,5 MB»). */
  maxSize: (maxSize: string) => string;
  /** Error de formato. Recibe los formatos **ya unidos con la conjunción del idioma**. */
  invalidType: (formats: string) => string;
  /** Error de peso. Recibe el peso ya escrito en el locale. */
  tooLarge: (maxSize: string) => string;
  /** Texto del botón que descarta el recorte. */
  cropCancel: string;
  /** Texto del botón que confirma el recorte. */
  cropConfirm: string;
}

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
   * **Qué** se sube, como sintagma con artículo: `"el logo"`, `"la foto de
   * perfil"`. Es lo único de esta pieza que cambia de una pantalla a otra, así
   * que es contenido y entra por aquí, del catálogo de la aplicación.
   *
   * Con él se arman el nombre accesible del botón, la pista de arrastre y el
   * aviso de soltar, cada uno con su plantilla del catálogo. Sin él, el sujeto
   * genérico de `avatarUpload.subject` («el avatar»).
   */
  subject?: string;
  /**
   * Texto **visible** del botón. **Sin default**: sin él, sale de
   * `avatarUpload.button` del `BrandMessagesProvider`.
   *
   * Corto a propósito: el sujeto va en el nombre accesible, que se arma con
   * `subject`.
   */
  buttonLabel?: string;
  /**
   * Nombre **accesible** del botón, entero. Es la salida de emergencia: lo
   * normal es pasar `subject` y dejar que el catálogo lo arme, porque así el
   * verbo visible y el accesible salen del mismo sitio y no se pueden
   * desparejar al traducir.
   *
   * WCAG 2.5.3 (Label in Name) exige que **contenga** el texto visible: quien
   * navega por voz dice lo que ve. "Subir" dentro de "Subir el logo" cumple;
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
   * mayúsculas, unidos con la conjunción del `locale` (`JPEG, PNG o WEBP`).
   * Con comodines (`image/*`) pásalo escrito.
   */
  formatsLabel?: string;
  /**
   * Locale con el que se escriben **el peso** («2,5 MB» / «2.5 MB») y **la
   * conjunción de la lista de formatos** («o» / «or» / «oder»). No decide el
   * idioma de los textos —eso es el catálogo— sino el formato. Default
   * `'es-ES'`.
   */
  locale?: string;
  /**
   * Pista de peso máximo. Recibe el peso **ya escrito en el locale**.
   * **Sin default**: sin ella, sale de `avatarUpload.maxSize`.
   */
  maxSizeHint?: (maxSize: string) => string;
  /**
   * Error de formato. **Sin default**: sin él, sale de
   * `avatarUpload.invalidType`. Dice lo que SÍ se acepta: por el botón el
   * error es imposible (lo filtra el diálogo del sistema), pero soltando un
   * archivo no hay filtro que valga.
   */
  invalidTypeError?: (formats: string) => string;
  /**
   * Error de peso. **Sin default**: sin él, sale de `avatarUpload.tooLarge`.
   */
  tooLargeError?: (maxSize: string) => string;
  /**
   * Lo que se anuncia cuando empieza un arrastre sobre la ventana. **Sin
   * default**: sin él, `avatarUpload.dropActive` con el `subject`.
   */
  dropActiveMessage?: string;
  /**
   * Pista **visible** bajo el botón: dice que además se puede arrastrar, que
   * es lo único de esta pieza que no se adivina mirándola. **Sin default**:
   * sin ella, `avatarUpload.dropHint` con el `subject`. Con cadena vacía no se
   * pinta.
   */
  dropHintLabel?: string;

  /**
   * Título del diálogo de recorte. **Obligatorio y sin default**, como el
   * `title` del propio `ImageCropDialog`: el diálogo no sabe qué se recorta
   * («Recorta tu foto», «Recorta tu logo») y eso es contenido de la pantalla.
   */
  cropTitle: string;
  /**
   * Descripción del diálogo de recorte. **Sin default**: el diálogo enseña la
   * imagen y su marco de selección, que se explican solos. Pásala solo si en
   * tu caso hay algo que decir que no esté ya a la vista.
   */
  cropDescription?: ReactNode;
  /**
   * Texto del botón que descarta el recorte. **Sin default**: sin él, sale de
   * `avatarUpload.cropCancel`.
   *
   * Aquí sí sale del catálogo, al revés que en `ImageCropDialog`: el diálogo
   * genérico no sabe qué confirma («Aplicar», «Usar esta imagen») y por eso lo
   * exige; esta subida sí lo sabe —se descarta o se guarda un recorte— y el
   * par vale igual en todas las pantallas.
   */
  cropCancelLabel?: ReactNode;
  /**
   * Texto del botón que confirma el recorte. **Sin default**: sin él, sale de
   * `avatarUpload.cropConfirm`.
   */
  cropConfirmLabel?: ReactNode;
  /**
   * Nombre accesible del aspa de cerrar. **Reenvío puro** al
   * `ImageCropDialog` y de ahí al `Modal`: sin esta prop, el aspa lee
   * `modal.close` del `BrandMessagesProvider`.
   */
  cropCloseLabel?: string;
  /**
   * Lo que se dice mientras la imagen se carga en el diálogo. Reenvío puro:
   * sin él, el `ImageCropDialog` lo lee de `imageCropDialog.loading`.
   */
  cropLoadingLabel?: string;
  /**
   * Lo que se dice cuando la imagen no se puede cargar. Reenvío puro: sin él,
   * el `ImageCropDialog` lo lee de `imageCropDialog.error`.
   */
  cropErrorMessage?: string;

  /** Se añade DESPUÉS de las clases propias del componente. */
  className?: string;
}

/**
 * Los formatos de un `accept`, escritos para leer: `image/jpeg,image/png,.webp`
 * → `JPEG, PNG o WEBP`.
 *
 * La conjunción la pone `Intl.ListFormat` y no un `join(', ')` con una «o»
 * pegada: la partícula, la coma de Oxford y el espaciado cambian con la lengua,
 * y esta lista acaba dentro de una frase traducida («Se aceptan …»). Antes se
 * unían con comas y no había conjunción en ningún idioma.
 */
function formatsFrom(accept: string, locale: string): string {
  return formatList(
    accept
      .split(',')
      .map(part => part.trim())
      .filter(Boolean)
      .map(part => (part.startsWith('.') ? part.slice(1) : (part.split('/')[1] ?? part)))
      .map(part => part.toUpperCase()),
    locale,
  );
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
  subject: subjectProp,
  buttonLabel,
  buttonAccessibleLabel,
  hintLabel,
  formatsLabel,
  locale = DEFAULT_LOCALE,
  maxSizeHint,
  invalidTypeError,
  tooLargeError,
  dropActiveMessage,
  dropHintLabel,
  cropTitle,
  cropDescription,
  cropCancelLabel,
  cropConfirmLabel,
  cropCloseLabel,
  cropLoadingLabel,
  cropErrorMessage,
  className,
}: AvatarUploadProps) {
  const t = useBrandMessages('avatarUpload');
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

  const subject = t('subject', subjectProp);
  const formats = formatsLabel ?? formatsFrom(accept, locale);
  const hint = hintLabel ?? [
    formats,
    // El peso llega ya escrito en el locale; el catálogo solo lo envuelve.
    maxSize !== undefined ? t('maxSize', maxSizeHint)(formatFileSize(maxSize, locale)) : null,
  ]
    .filter(Boolean)
    .join(' · ');
  const message = invalid ?? errorMessage;
  const inert = disabled || busy;

  const visibleLabel = t('button', buttonLabel);
  // El nombre accesible se arma con la plantilla del catálogo, no aquí: el
  // orden del verbo y del sujeto es del idioma. Así los dos lados del par
  // salen del mismo fichero y WCAG 2.5.3 no se puede romper al traducir.
  const accessibleLabel = buttonAccessibleLabel ?? t('buttonFor')(subject);
  if (isDevelopment() && !accessibleLabel.toLowerCase().includes(visibleLabel.toLowerCase())) {
    console.warn(
      `[AvatarUpload] El nombre accesible del botón ("${accessibleLabel}") no contiene su texto visible ("${visibleLabel}"). ` +
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
    const error = validateFile(
      file,
      accept,
      maxSize,
      t('tooLarge', tooLargeError),
      t('invalidType', invalidTypeError)(formats),
      locale,
    );
    if (error) {
      setInvalid(error);
      onError?.(error);
      return;
    }
    setInvalid(null);
    onSelect?.(file);
    setSource({ url: URL.createObjectURL(file), file });
  }, [accept, maxSize, t, tooLargeError, invalidTypeError, formats, locale, onError, onSelect]);

  const closeDialog = () => {
    if (source) URL.revokeObjectURL(source.url);
    setSource(null);
  };

  const handleConfirm = async (blob: Blob) => {
    if (!source) return;
    await onChange(blob, source.file);
  };

  const dropHint = dropHintLabel ?? t('dropHint')(subject);

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
          {...(accessibleLabel !== visibleLabel ? { 'aria-label': accessibleLabel } : {})}
          aria-describedby={[hint ? hintId : null, message ? errorId : null].filter(Boolean).join(' ') || undefined}
        >
          {visibleLabel}
        </Button>
        {hint && <VisuallyHidden id={hintId}>{hint}</VisuallyHidden>}
        {dropHint && <span className="avatar-upload__hint">{dropHint}</span>}
        {message && (
          <ErrorText id={errorId}>{message}</ErrorText>
        )}
      </div>

      {/* Arrastrar no se ve con un lector de pantalla, pero sí se puede estar
          haciendo con el ratón mientras se escucha: el aviso dice dónde soltar. */}
      <VisuallyHidden role="status">
        {armed ? (dropActiveMessage ?? t('dropActive')(subject)) : ''}
      </VisuallyHidden>

      <ImageCropDialog
        sourceUrl={source?.url ?? null}
        title={cropTitle}
        description={cropDescription}
        circularCrop={shape === 'circle'}
        outputMimeType={outputMimeType}
        {...(outputSize !== undefined ? { outputSize } : {})}
        busy={busy}
        cancelLabel={cropCancelLabel ?? t('cropCancel')}
        confirmLabel={cropConfirmLabel ?? t('cropConfirm')}
        {...(cropCloseLabel !== undefined ? { closeLabel: cropCloseLabel } : {})}
        {...(cropLoadingLabel !== undefined ? { loadingLabel: cropLoadingLabel } : {})}
        {...(cropErrorMessage !== undefined ? { errorMessage: cropErrorMessage } : {})}
        onConfirm={handleConfirm}
        onClose={closeDialog}
      />
    </div>
  );
}
