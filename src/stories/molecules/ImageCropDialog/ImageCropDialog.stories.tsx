import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../atoms/Button/Button';
import { ImageCropDialog } from './ImageCropDialog';

const meta = {
  title: 'Por revisar/Molecules/ImageCropDialog',
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
  title: 'Recorta tu avatar',
  description: 'Arrastra para ajustar la selección.',
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
  args: { ...base, title: 'Recorta la portada', aspect: 16 / 9, outputSize: 1024 },
};

export const Ocupado: Story = {
  name: 'Subiendo (busy)',
  args: { ...base, busy: true },
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
