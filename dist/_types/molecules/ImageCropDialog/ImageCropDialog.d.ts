import { type ReactNode } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import './ImageCropDialog.css';
/**
 * El cromo del recortador, y **solo el cromo**: lo que el diálogo dice por su
 * cuenta mientras la imagen va y viene.
 *
 * Aquí se ve la distinción que gobierna la campaña entera. El título, el
 * «Cancelar» y el «Guardar» **no** están en este espacio y siguen siendo props
 * obligatorias sin valor por defecto: el diálogo no sabe qué se está
 * recortando —una foto de perfil, un logo, la portada de un curso— ni qué pasa
 * al confirmar, y eso es contenido de la pantalla que lo abre, no un rótulo
 * del sistema. Lo que sí sabe es que la imagen puede tardar y puede fallar: el
 * aviso de carga y el de error son suyos, valen igual en todas las pantallas y
 * por eso salen del catálogo.
 */
export interface ImageCropDialogMessages {
    /** Lo que se dice mientras la imagen se descarga y descodifica. Se anuncia y se ve. */
    loading: string;
    /** Lo que se dice cuando la imagen no se puede cargar. */
    error: string;
}
export interface ImageCropDialogProps {
    /** Object URL del fichero elegido; el diálogo está abierto mientras no sea null. */
    sourceUrl: string | null;
    title: string;
    description?: ReactNode;
    /** Selección circular (avatares). El blob resultante sigue siendo cuadrado. */
    circularCrop?: boolean;
    aspect?: number;
    /** Lado mayor del blob producido, en píxeles. */
    outputSize?: number;
    outputMimeType: 'image/jpeg' | 'image/png' | 'image/webp';
    /** Deshabilita ambas acciones y bloquea el cierre mientras el consumidor sube. */
    busy?: boolean;
    cancelLabel: ReactNode;
    confirmLabel: ReactNode;
    /**
     * Nombre accesible del botón de cierre del diálogo. **Reenvío puro** al
     * `Modal`: sin esta prop, el aspa lee `modal.close` del
     * `BrandMessagesProvider`, como la de cualquier otro diálogo del sistema.
     */
    closeLabel?: string;
    /**
     * Lo que se dice mientras la imagen se descarga y descodifica. Se anuncia y
     * se ve. **Sin default**: sin él, sale de `imageCropDialog.loading` del
     * `BrandMessagesProvider`.
     */
    loadingLabel?: string;
    /**
     * Lo que se dice cuando la imagen no se puede cargar. **Sin default**: sin
     * él, sale de `imageCropDialog.error` del `BrandMessagesProvider`.
     */
    errorMessage?: string;
    onConfirm: (blob: Blob) => void | Promise<void>;
    onClose: () => void;
    className?: string;
}
/**
 * Diálogo de recorte de imagen para subidas de avatar y logo: elige una
 * región sobre la imagen y devuelve el recorte ya reescalado como `Blob`.
 *
 * `react-image-crop` aporta el gesto de selección; el DS pone el diálogo, las
 * acciones y el volcado a lienzo (`cropImageToBlob`).
 */
export declare function ImageCropDialog({ sourceUrl, title, description, circularCrop, aspect, outputSize, outputMimeType, busy, cancelLabel, confirmLabel, closeLabel, loadingLabel, errorMessage, onConfirm, onClose, className, }: ImageCropDialogProps): import("react/jsx-runtime").JSX.Element;
