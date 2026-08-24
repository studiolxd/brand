export type CropRegion = {
  /** Desplazamiento en píxeles sobre la imagen mostrada. */
  x: number;
  /** Desplazamiento en píxeles sobre la imagen mostrada. */
  y: number;
  width: number;
  height: number;
};

export type CropToBlobOptions = {
  /** Lado del lienzo de salida en píxeles (cuadrado). Por defecto 512. */
  outputSize?: number;
  /** Tipo MIME de salida. Por defecto image/jpeg. */
  mimeType?: 'image/jpeg' | 'image/png' | 'image/webp';
  /** Calidad 0–1 para formatos con pérdida. Por defecto 0.9. */
  quality?: number;
};

/**
 * Vuelca una región de un `<img>` en un lienzo nuevo, reescalada a una salida
 * cuadrada, y devuelve el resultado como Blob listo para subir.
 *
 * La región va en píxeles *mostrados* (los que ve el usuario en
 * react-image-crop); aquí se escala a la resolución natural de la fuente para
 * recortar siempre sobre los píxeles originales.
 */
export async function cropImageToBlob(
  src: HTMLImageElement,
  region: CropRegion,
  opts: CropToBlobOptions = {},
): Promise<Blob> {
  const outputSize = opts.outputSize ?? 512;
  const mime = opts.mimeType ?? 'image/jpeg';
  const quality = opts.quality ?? 0.9;

  const canvas = document.createElement('canvas');
  canvas.width = outputSize;
  canvas.height = outputSize;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to acquire 2D canvas context');

  const scaleX = src.naturalWidth / src.width;
  const scaleY = src.naturalHeight / src.height;

  ctx.drawImage(
    src,
    region.x * scaleX,
    region.y * scaleY,
    region.width * scaleX,
    region.height * scaleY,
    0,
    0,
    outputSize,
    outputSize,
  );

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Canvas toBlob returned null'))),
      mime,
      quality,
    );
  });
}
