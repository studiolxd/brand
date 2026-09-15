import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Button } from '../../atoms/Button/Button';
import { ImageCropDialog } from './ImageCropDialog';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixtureEn as EN } from '../../../../.storybook/brandMessagesFixtureEn';

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

/**
 * Mientras la imagen viaja. Elegir un archivo abre el diálogo antes de que el
 * navegador haya descodificado nada, así que el hueco se reserva desde el
 * primer render —mide lo mismo que medirá con la imagen— y enseña el `Spinner`
 * del sistema con su texto. Cuando la imagen llega, aparece en su sitio sin
 * mover nada.
 *
 * La fuente es una dirección que no lleva a ninguna parte (una IP privada sin
 * ruta): la conexión se queda esperando, que es exactamente lo que hace una red
 * lenta. Sin red, el navegador la descarta en el acto y la story enseña el
 * error — el otro camino del mismo hueco.
 */
export const Cargando: Story = {
  args: { ...base, sourceUrl: 'https://10.255.255.1/logotipo.png' },
};

/**
 * La imagen no se puede cargar: el mensaje ocupa el mismo hueco que habría
 * ocupado ella. La fuente es un archivo que dice ser PNG y no lo es.
 */
export const ConError: Story = {
  name: 'La imagen no carga',
  args: { ...base, sourceUrl: 'data:image/png;base64,' + btoa('esto no es una imagen') },
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


/**
 * Un catálogo inglés montado encima. Cambian **solo los dos textos del
 * diálogo** —el aviso de carga y el de error—, que es todo lo que el
 * recortador dice por su cuenta.
 *
 * El título y las dos acciones siguen viniendo de fuera, y por eso aquí están
 * en inglés porque quien abre el diálogo los ha traducido: el recortador no
 * sabe qué se está recortando ni qué pasa al confirmar. Esa es la línea que
 * separa el cromo del contenido en toda la campaña.
 */
export const TextosDelProveedor: Story = {
  name: 'Textos desde el proveedor (otro idioma)',
  args: {
    ...base,
    title: 'Crop your photo',
    cancelLabel: 'Discard',
    confirmLabel: 'Use this image',
    sourceUrl: 'https://10.255.255.1/logotipo.png',
  },
  render: (args) => (
    <BrandMessagesProvider messages={EN}>
      <ImageCropDialog {...args} />
    </BrandMessagesProvider>
  ),
};

/** Test: el cromo sale del catálogo y el contenido sigue llegando por prop. */
export const ContratoProveedor: Story = {
  name: 'Test — el cromo lee del proveedor, el contenido no',
  tags: ['!dev'],
  args: {
    ...base,
    title: 'Crop your photo',
    cancelLabel: 'Discard',
    confirmLabel: 'Use this image',
    sourceUrl: 'https://10.255.255.1/logotipo.png',
  },
  render: (args) => (
    <BrandMessagesProvider messages={EN}>
      <ImageCropDialog {...args} />
    </BrandMessagesProvider>
  ),
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    const panel = await body.findByRole('dialog', { name: 'Crop your photo' });
    await expect(panel).toBeInTheDocument();
    // El cromo, del catálogo.
    await expect(body.getByText('Loading image…')).toBeInTheDocument();
    await expect(body.queryByText('Cargando imagen…')).toBeNull();
    // El contenido, de quien abre el diálogo.
    await expect(body.getByRole('button', { name: 'Use this image' })).toBeInTheDocument();
  },
};
