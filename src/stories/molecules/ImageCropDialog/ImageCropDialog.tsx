'use client';

import { useRef, useState, type ReactNode } from 'react';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
  type PixelCrop,
} from 'react-image-crop';
import { Button } from '../../atoms/Button/Button';
import { Spinner } from '../../atoms/Spinner/Spinner';
import { Alert } from '../Alert/Alert';
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
  loadingLabel = 'Cargando imagen…',
  errorMessage = 'No hemos podido cargar la imagen. Prueba con otro archivo.',
  onConfirm,
  onClose,
  className,
}: ImageCropDialogProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  // Cómo va la imagen. Elegir un archivo abre el diálogo antes de que el
  // navegador haya descodificado nada: sin este estado el título salía solo,
  // sin hueco ni señal, y parecía roto.
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  // Otra imagen es otra carga: se reinicia durante el render, no con un efecto,
  // para que el primer pintado del archivo nuevo ya salga cargando.
  const [lastUrl, setLastUrl] = useState(sourceUrl);
  if (sourceUrl !== lastUrl) {
    setLastUrl(sourceUrl);
    setStatus('loading');
    setCrop(undefined);
    setCompletedCrop(undefined);
  }

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
    // Confirmado y aceptado por quien escucha, el diálogo se cierra solo: la
    // imagen ya está donde tenía que estar. Si `onConfirm` lanza, se queda
    // abierto con la selección intacta para volver a intentarlo.
    await onConfirm(blob);
    close();
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
      // El pie lo reparte `Modal`, igual que en el resto de diálogos.
      footerClassName="image-crop-dialog__actions"
      footer={
        <>
          <Button variant="outline" disabled={busy} onClick={close}>
            {cancelLabel}
          </Button>
          <Button disabled={busy || !completedCrop?.width} onClick={handleConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className={['image-crop-dialog', className].filter(Boolean).join(' ')}>
        {/* El hueco se reserva desde el primer render y no cambia de alto al
            llegar la imagen: la señal de carga, el error y la propia imagen
            comparten la misma celda. */}
        <div className="image-crop-dialog__area">
          {status === 'loading' && <Spinner size="lg" label={loadingLabel} />}
          {status === 'error' && (
            <Alert variant="error" description={errorMessage} className="image-crop-dialog__error" />
          )}
          {sourceUrl && status !== 'error' && (
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
                  setStatus('ready');
                  setCrop(
                    centerCrop(
                      makeAspectCrop({ unit: '%', width: 80 }, aspect, width, height),
                      width,
                      height,
                    ),
                  );
                }}
                onError={() => setStatus('error')}
              />
            </ReactCrop>
          )}
        </div>
      </div>
    </Modal>
  );
}
