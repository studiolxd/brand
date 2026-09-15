import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, userEvent, waitFor, within, fn } from 'storybook/test';
import { FormSizeContext } from '../../constants/form-size';
import { AvatarUpload } from './AvatarUpload';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixtureEn as EN } from '../../../../.storybook/brandMessagesFixtureEn';

const meta = {
  title: 'Molecules/AvatarUpload',
  component: AvatarUpload,
  parameters: { layout: 'padded' },
  argTypes: {
    shape: { control: 'inline-radio', options: ['circle', 'square'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    className: { table: { disable: true } },
  },
  args: {
    name: 'Ana García',
    src: 'https://i.pravatar.cc/128?img=47',
    maxSize: 5 * 1024 * 1024,
    // Qué se sube es contenido de la pantalla y entra por `subject`; el verbo
    // («Subir») y la plantilla que lo envuelve salen del catálogo.
    cropTitle: 'Recortar la imagen',
    onChange: fn(),
  },
} satisfies Meta<typeof AvatarUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Una imagen con extensión y peso reales, para las pruebas de arrastre. */
function imagen(name = 'retrato.png', type = 'image/png', bytes = 64): File {
  return new File([new Uint8Array(bytes)], name, { type });
}

/**
 * El arrastre, simulado. No se construye un `DragEvent` con su `DataTransfer`
 * porque el navegador solo rellena esa carga en un arrastre de verdad (el que
 * inicia el sistema operativo): en uno sintético llega vacía. Lo que sí viaja
 * es un evento con la carga colgada a mano, que es exactamente lo que leen el
 * componente y React.
 */
function arrastre(target: EventTarget, type: string, files: File[]) {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.defineProperty(event, 'dataTransfer', {
    value: { files, types: files.length ? ['Files'] : [], dropEffect: 'none' },
  });
  target.dispatchEvent(event);
}

/** Arrastrar y soltar un archivo sobre un elemento, como lo haría el navegador. */
function soltar(target: Element, files: File[]) {
  arrastre(window, 'dragenter', files);
  arrastre(target, 'dragover', files);
  arrastre(target, 'drop', files);
}

/** Una persona: avatar redondo. */
export const Persona: Story = {};

/** Una organización: el cuadrado es lo que la distingue de una persona. */
export const Organizacion: Story = {
  name: 'Organización',
  args: {
    name: 'Studio LXD',
    src: undefined,
    shape: 'square',
    outputMimeType: 'image/png',
    subject: 'el logo',
    cropTitle: 'Recortar el logotipo',
  },
};

/** Sin imagen todavía: el avatar enseña las iniciales, y la diana es la misma. */
export const SinImagen: Story = {
  name: 'Sin imagen',
  args: { src: undefined },
};

/**
 * Lo que se acepta no se enseña de primeras —ensucia—: lo dice la validación
 * cuando falla, y siempre diciendo qué SÍ vale. Por el botón este error es
 * imposible (el `accept` filtra el diálogo del sistema); arrastrando no hay
 * filtro y ahí sí se puede soltar un PDF de 40 MB.
 */
export const ArchivoInvalido: Story = {
  name: 'Archivo inválido (arrastrando)',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    soltar(canvasElement.querySelector('.avatar-upload__target')!, [
      new File(['x'], 'contrato.pdf', { type: 'application/pdf' }),
    ]);
    await expect(await canvas.findByRole('alert')).toHaveTextContent(
      'Formato no admitido. Se aceptan JPEG, PNG o WEBP.',
    );
  },
};

/** Mientras el consumidor sube: el botón y la diana quedan bloqueados. */
export const Subiendo: Story = {
  // Con el verbo cambiado, el nombre accesible se pasa entero: la plantilla
  // del catálogo dice «Subir …», y aquí ya no se está subiendo, se subió.
  args: { busy: true, buttonLabel: 'Subiendo…', buttonAccessibleLabel: 'Subiendo…' },
};

/**
 * La talla la manda el contexto, no el call-site: dentro de un `Form` (o de
 * cualquier `FormSizeContext`, como el pie de `OnboardingShell`) el botón sube
 * a `lg` y el avatar con él, a 192px. Nadie tiene que acordarse de nada.
 */
export const TallaPorContexto: Story = {
  name: 'La talla la pone el contexto',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <FormSizeContext.Provider value="sm">
        <AvatarUpload {...args} />
      </FormSizeContext.Provider>
      <AvatarUpload {...args} />
      <FormSizeContext.Provider value="lg">
        <AvatarUpload {...args} />
      </FormSizeContext.Provider>
    </div>
  ),
};

/** El recorte que entrega la pieza, puesto como imagen actual: el ciclo entero. */
export const Interactiva: Story = {
  name: 'Ciclo completo',
  render: (args) => {
    const [url, setUrl] = useState<string | undefined>(undefined);
    return (
      <AvatarUpload
        {...args}
        src={url}
        onChange={(blob) => setUrl(URL.createObjectURL(blob))}
      />
    );
  },
  args: { src: undefined },
};

export const ContratoTeclado: Story = {
  name: 'Test — el teclado llega al botón y abre el diálogo del sistema',
  tags: ['!dev'],
  args: { src: undefined },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const boton = canvas.getByRole('button', { name: 'Subir el avatar' });

    // El único camino de teclado es el botón: el input real no es una parada.
    await userEvent.tab();
    await expect(boton).toHaveFocus();

    // Y describe lo que se puede subir, que el `accept` no anuncia solo.
    await expect(boton).toHaveAccessibleDescription('JPEG, PNG o WEBP · máx. 5,0 MB');

    // Enter sobre el botón dispara el input oculto.
    const input = canvasElement.querySelector<HTMLInputElement>('.avatar-upload__input')!;
    await expect(input.tabIndex).toBe(-1);
    let abierto = false;
    input.addEventListener('click', () => { abierto = true; });
    await userEvent.keyboard('{Enter}');
    await expect(abierto).toBe(true);
  },
};

export const ContratoArrastre: Story = {
  name: 'Test — la diana se anuncia y acepta el archivo',
  tags: ['!dev'],
  args: { src: undefined, onSelect: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const bloque = canvasElement.querySelector('.avatar-upload')!;
    const diana = canvasElement.querySelector('.avatar-upload__target')!;

    // Empieza un arrastre en cualquier punto de la ventana: la diana se anuncia
    // antes de que el archivo llegue, y se dice en voz alta.
    // El escucha de `dragenter` lo instala un efecto, y el `play` arranca justo
    // tras el commit de React: en un navegador de verdad puede llegar antes de
    // que el efecto haya montado nada (en local no se nota porque el runner
    // renderiza dentro de `act`, que vacía los efectos). Se reintenta el
    // arrastre hasta que el bloque se arma.
    await waitFor(() => {
      arrastre(window, 'dragenter', [imagen()]);
      expect(bloque).toHaveClass('avatar-upload--armed');
    });
    await expect(canvas.getByRole('status')).toHaveTextContent(
      'Suelta la imagen sobre el avatar para subirla',
    );

    // La zona sensible no crece: el anillo se pinta con `outline`, que no ocupa
    // maqueta, así que la diana mide exactamente lo que mide el avatar.
    const avatar = canvasElement.querySelector('.avatar')!;
    await expect(Math.round(diana.getBoundingClientRect().width))
      .toBe(Math.round(avatar.getBoundingClientRect().width));
    await expect(avatar).toHaveClass('avatar--3xl');

    soltar(diana, [imagen()]);
    await expect(args.onSelect).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(bloque).not.toHaveClass('avatar-upload--armed'));
    // Un archivo válido abre el recorte; no hay error que enseñar.
    await expect(await screen.findByRole('dialog')).toBeInTheDocument();
  },
};

export const ContratoTalla: Story = {
  name: 'Test — el contexto manda la talla del botón y del avatar',
  tags: ['!dev'],
  render: (args) => (
    <FormSizeContext.Provider value="lg">
      <AvatarUpload {...args} />
    </FormSizeContext.Provider>
  ),
  args: { src: undefined },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Subir el avatar' })).toHaveClass('button--lg');
    await expect(canvasElement.querySelector('.avatar')).toHaveClass('avatar--4xl');
    await expect(
      Math.round(canvasElement.querySelector('.avatar')!.getBoundingClientRect().width),
    ).toBe(192);
  },
};

/**
 * El retrato de 192px es la diana del arrastre y no cabe con su botón al lado en
 * la pantalla más estrecha que servimos: la fila envuelve y el botón baja. Lo
 * que no puede pasar es que desborde. La story lo mide dentro de una caja de
 * 375px con el inset del contenedor.
 */
export const ContratoCabeEnMovil: Story = {
  name: 'Test — a talla lg la fila envuelve en 375px sin desbordar',
  tags: ['!dev'],
  render: (args) => (
    <div style={{ inlineSize: 375, paddingInline: 'var(--spacing-5)', boxSizing: 'border-box' }}>
      <FormSizeContext.Provider value="lg">
        <AvatarUpload {...args} />
      </FormSizeContext.Provider>
    </div>
  ),
  args: { src: undefined, subject: 'el logo', shape: 'square' },
  play: async ({ canvasElement }) => {
    const fila = canvasElement.querySelector('.avatar-upload') as HTMLElement;
    // Sin desbordar: la fila envuelve en vez de sacar barra horizontal.
    await expect(fila.scrollWidth).toBeLessThanOrEqual(fila.clientWidth);
    const avatar = canvasElement.querySelector('.avatar')!.getBoundingClientRect();
    await expect(Math.round(avatar.width)).toBe(192);
    // El botón baja: ya no cabe al lado de un retrato de 192px.
    const boton = within(canvasElement).getByRole('button', { name: 'Subir el logo' }).getBoundingClientRect();
    await expect(boton.top).toBeGreaterThanOrEqual(avatar.bottom);
  },
};

/**
 * El botón no flota a media altura del retrato: la columna se alinea con el
 * borde inferior del avatar, y bajo el botón va la pista de que además se
 * puede arrastrar —lo único de esta pieza que no se adivina mirándola—.
 */
export const ContratoAlPie: Story = {
  name: 'Test — el botón y su pista cierran a la altura del avatar',
  tags: ['!dev'],
  args: { src: undefined },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const columna = canvasElement.querySelector('.avatar-upload__body')!.getBoundingClientRect();
    const diana = canvasElement.querySelector('.avatar-upload__target')!.getBoundingClientRect();
    await expect(Math.round(columna.bottom)).toBe(Math.round(diana.bottom));

    const pista = canvas.getByText('…o arrastra la imagen hasta el avatar');
    const boton = canvas.getByRole('button', { name: 'Subir el avatar' }).getBoundingClientRect();
    await expect(pista.getBoundingClientRect().top).toBeGreaterThanOrEqual(boton.bottom);
  },
};


/**
 * El mismo componente con un catálogo inglés montado encima: cambian el verbo
 * del botón, la pista de arrastre y los dos mensajes de validación. Lo que NO
 * cambia con el idioma es el sujeto —qué se sube— ni el título del recorte:
 * son de la pantalla.
 *
 * Y el peso se escribe con el `locale`, no con el idioma: los dos bloques
 * llevan el mismo catálogo inglés, y el de arriba dice «5.0 MB» y el de abajo
 * «5,0 MB».
 */
export const TextosDelProveedor: Story = {
  name: 'Textos desde el proveedor (otro idioma)',
  args: { src: undefined },
  render: (args) => (
    <BrandMessagesProvider messages={EN}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <AvatarUpload {...args} locale="en-US" subject="the profile photo" cropTitle="Crop your photo" />
        <AvatarUpload {...args} locale="es-ES" subject="the logo" shape="square" cropTitle="Crop your logo" />
      </div>
    </BrandMessagesProvider>
  ),
};

/**
 * Test: el par visible/accesible del botón sale ENTERO del catálogo, y el
 * accesible contiene al visible (WCAG 2.5.3) en el idioma que sea.
 */
export const ContratoProveedor: Story = {
  name: 'Test — el par del botón sale entero del catálogo',
  tags: ['!dev'],
  args: { src: undefined },
  render: (args) => (
    <BrandMessagesProvider messages={EN}>
      <AvatarUpload {...args} subject="the logo" cropTitle="Crop your logo" />
    </BrandMessagesProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const boton = canvas.getByRole('button', { name: 'Upload the logo' });
    // Lo visible es el verbo suelto; el nombre accesible lo contiene.
    await expect(boton).toHaveTextContent('Upload');
    await expect(boton.getAttribute('aria-label')).toContain('Upload');
    await expect(canvas.queryByText('Subir')).toBeNull();
    await expect(canvas.getByText('…or drag the image onto the logo')).toBeInTheDocument();
  },
};

/**
 * Test: el peso se escribe con el `locale` aunque el catálogo sea otro. Mismo
 * catálogo inglés, dos locales: «5.0 MB» y «5,0 MB».
 */
export const ContratoPesoPorLocale: Story = {
  name: 'Test — el peso lo escribe el locale, no el catálogo',
  tags: ['!dev'],
  args: { src: undefined },
  render: (args) => (
    <BrandMessagesProvider messages={EN}>
      <div>
        <AvatarUpload {...args} locale="en-US" subject="the photo" cropTitle="Crop" />
        <AvatarUpload {...args} locale="es-ES" subject="the logo" cropTitle="Crop" />
      </div>
    </BrandMessagesProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Upload the photo' }))
      // Coma de Oxford incluida: la conjunción la escribe `Intl.ListFormat`,
      // que es justo lo que un `join(', ')` con una «or» pegada no sabe hacer.
      .toHaveAccessibleDescription('JPEG, PNG, or WEBP · max. 5.0 MB');
    await expect(canvas.getByRole('button', { name: 'Upload the logo' }))
      .toHaveAccessibleDescription('JPEG, PNG o WEBP · max. 5,0 MB');
  },
};
