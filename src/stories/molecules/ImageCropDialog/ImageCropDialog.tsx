'use client';

import { useRef, useState, type ReactNode } from 'react';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
  type PixelCrop,
} from 'react-image-crop';
import { Button } from '../../atoms/Button/Button';
import { Modal } from '../Modal/Modal';
import { cropImageToBlob } from './crop';
// El recortador es inservible sin su propia hoja (marco de selección y
// tiradores). El DS la carga aquí para que ningún consumidor tenga que
// acordarse — misma regla que el CSS BEM de cualquier otro componente.
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
export function ImageCropDialog({
  sourceUrl,
  title,
  description,
  circularCrop = false,
  aspect = 1,
  outputSize = 512,
  outputMimeType,
  busy = false,
  cancelLabel,
  confirmLabel,
  closeLabel,
  onConfirm,
  onClose,
  className,
}: ImageCropDialogProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const close = () => {
    setCrop(undefined);
    setCompletedCrop(undefined);
    onClose();
  };

  const handleConfirm = async () => {
    const img = imgRef.current;
    if (!img || !completedCrop || completedCrop.width === 0) return;
    const blob = await cropImageToBlob(img, completedCrop, {
      mimeType: outputMimeType,
      outputSize,
    });
    await onConfirm(blob);
    setCrop(undefined);
    setCompletedCrop(undefined);
  };

  return (
    <Modal
      open={sourceUrl !== null}
      onClose={() => {
        if (!busy) close();
      }}
      title={title}
      {...(closeLabel ? { closeLabel } : {})}
      {...(description != null ? { description } : {})}
    >
      <div className={['image-crop-dialog', className].filter(Boolean).join(' ')}>
        {sourceUrl && (
          <div className="image-crop-dialog__area">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              circularCrop={circularCrop}
              minWidth={64}
              keepSelection
            >
              <img
                ref={imgRef}
                src={sourceUrl}
                alt=""
                onLoad={(e) => {
                  const { width, height } = e.currentTarget;
                  setCrop(
                    centerCrop(
                      makeAspectCrop({ unit: '%', width: 80 }, aspect, width, height),
                      width,
                      height,
                    ),
                  );
                }}
              />
            </ReactCrop>
          </div>
        )}

        <div className="image-crop-dialog__actions">
          <Button variant="outline" disabled={busy} onClick={close}>
            {cancelLabel}
          </Button>
          <Button disabled={busy || !completedCrop?.width} onClick={handleConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
