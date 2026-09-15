import { type ReactNode } from 'react';
import { type FormSize } from '../../constants/form-size';
import './AvatarUpload.css';
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
     * Etiqueta del aspa de cerrar. Se reenvía **tal cual** al `ImageCropDialog`
     * y de ahí al `Modal`, que todavía no lee del proveedor: mientras no se
     * migre, sin esta prop el aspa dice lo que diga `Modal`.
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
export declare function AvatarUpload({ src, name, alt, shape, size: sizeProp, accept, maxSize, outputMimeType, outputSize, disabled, busy, errorMessage, onChange, onSelect, onError, subject: subjectProp, buttonLabel, buttonAccessibleLabel, hintLabel, formatsLabel, locale, maxSizeHint, invalidTypeError, tooLargeError, dropActiveMessage, dropHintLabel, cropTitle, cropDescription, cropCancelLabel, cropConfirmLabel, cropCloseLabel, cropLoadingLabel, cropErrorMessage, className, }: AvatarUploadProps): import("react/jsx-runtime").JSX.Element;
