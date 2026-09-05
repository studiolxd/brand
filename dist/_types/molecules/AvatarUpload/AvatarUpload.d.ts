import { type ReactNode } from 'react';
import { type FormSize } from '../../constants/form-size';
import './AvatarUpload.css';
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
     * Talla del sistema: mueve a la vez el botón y el avatar (que va un peldaño
     * por encima: `md` → 40px, `lg` → 48px, `xl` → 64px).
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
    /** Título del diálogo de recorte. Default: "Recorta la imagen". */
    cropTitle?: string;
    /** Descripción del diálogo. Default: "Arrastra para ajustar la selección." */
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
export declare function AvatarUpload({ src, name, alt, shape, size: sizeProp, accept, maxSize, outputMimeType, outputSize, disabled, busy, errorMessage, onChange, onSelect, onError, buttonLabel, buttonAccessibleLabel, hintLabel, formatsLabel, maxSizeHint, invalidTypeError, tooLargeError, dropActiveMessage, cropTitle, cropDescription, cropCancelLabel, cropConfirmLabel, cropCloseLabel, className, }: AvatarUploadProps): import("react/jsx-runtime").JSX.Element;
