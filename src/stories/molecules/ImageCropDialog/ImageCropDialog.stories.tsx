import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../atoms/Button/Button';
import { ImageCropDialog } from './ImageCropDialog';

const meta = {
  title: 'Molecules/ImageCropDialog',
  component: ImageCropDialog,
} satisfies Meta<typeof ImageCropDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// Imagen embebida: las stories no dependen de red y el recorte funciona igual.
const SAMPLE =
  'data:image/svg+xml;base64,' +
  btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480">
       <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
         <stop offset="0%" stop-color="#0b3c5d"/><stop offset="100%" stop-color="#d9b310"/>
       </linearGradient></defs>
       <rect width="640" height="480" fill="url(#g)"/>
       <circle cx="320" cy="240" r="120" fill="rgba(255,255,255,0.35)"/>
     </svg>`,
  );

const base = {
  sourceUrl: SAMPLE,
  title: 'Recortar imagen',
  outputMimeType: 'image/jpeg' as const,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Guardar',
  closeLabel: 'Cerrar',
  onConfirm: () => {},
  onClose: () => {},
};

export const Default: Story = {
  name: 'Recorte cuadrado',
  args: base,
};

export const Circular: Story = {
  name: 'Selección circular (avatar)',
  args: { ...base, circularCrop: true },
};

export const Panoramico: Story = {
  name: 'Relación 16:9 (portada)',
  args: { ...base, title: 'Recortar portada', aspect: 16 / 9, outputSize: 1024 },
};

export const Ocupado: Story = {
  name: 'Subiendo (busy)',
  args: { ...base, busy: true },
};

/**
 * El decorator `withSurface` activa `data-theme="dark"` en `document.documentElement`;
 * el diálogo se monta en el portal de `Modal` (`document.body`), así que la
 * superficie oscura llega hasta ahí sin configuración adicional. El área de
 * recorte pasa a `surface.secondary-on-dark` (gris oscuro) y el marco de
 * `react-image-crop` (blanco/gris a rayas) sigue leyéndose igual: sus marcas
 * dibujan sobre la imagen, no sobre el fondo del área.
 */
export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: base,
};

export const DesdeUnBoton: Story = {
  name: 'Abierto desde un botón',
  args: base,
  render: (args) => {
     
    const [url, setUrl] = useState<string | null>(null);
    return (
      <>
        <Button variant="outline" onClick={() => setUrl(SAMPLE)}>
          Cambiar avatar
        </Button>
        <ImageCropDialog
          {...args}
          sourceUrl={url}
          onClose={() => setUrl(null)}
          onConfirm={() => setUrl(null)}
        />
      </>
    );
  },
};
