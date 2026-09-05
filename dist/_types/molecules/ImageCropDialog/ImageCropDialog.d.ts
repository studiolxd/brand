import { type ReactNode } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import './ImageCropDialog.css';
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
    /** Etiqueta del botón de cierre del diálogo. */
    closeLabel?: string;
    /**
     * Lo que se dice mientras la imagen se descarga y descodifica. Se anuncia y
     * se ve. Default castellano: «Cargando imagen…».
     */
    loadingLabel?: string;
    /**
     * Lo que se dice cuando la imagen no se puede cargar. Default castellano:
     * «No hemos podido cargar la imagen. Prueba con otro archivo.».
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
