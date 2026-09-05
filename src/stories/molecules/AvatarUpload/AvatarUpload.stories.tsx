import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, userEvent, waitFor, within, fn } from 'storybook/test';
import { FormSizeContext } from '../../constants/form-size';
import { AvatarUpload } from './AvatarUpload';

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
    buttonLabel: 'Subir',
    buttonAccessibleLabel: 'Subir avatar',
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
    buttonAccessibleLabel: 'Subir logo',
    cropTitle: 'Recortar logotipo',
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
      'Formato no admitido. Se aceptan JPEG, PNG, WEBP.',
    );
  },
};

/** Mientras el consumidor sube: el botón y la diana quedan bloqueados. */
export const Subiendo: Story = {
  args: { busy: true, buttonLabel: 'Subiendo…', buttonAccessibleLabel: 'Subiendo avatar…' },
};

/**
 * La talla la manda el contexto, no el call-site: dentro de un `Form` (o de
 * cualquier `FormSizeContext`, como el pie de `OnboardingShell`) el botón sube
 * a `lg` y el avatar con él, a 64px. Nadie tiene que acordarse de nada.
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

/** En superficie oscura el anillo de la diana es la tinta de la superficie. */
export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
};

export const ContratoTeclado: Story = {
  name: 'Test — el teclado llega al botón y abre el diálogo del sistema',
  tags: ['!dev'],
  args: { src: undefined },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const boton = canvas.getByRole('button', { name: 'Subir avatar' });

    // El único camino de teclado es el botón: el input real no es una parada.
    await userEvent.tab();
    await expect(boton).toHaveFocus();

    // Y describe lo que se puede subir, que el `accept` no anuncia solo.
    await expect(boton).toHaveAccessibleDescription('JPEG, PNG, WEBP · máx. 5.0 MB');

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
    arrastre(window, 'dragenter', [imagen()]);
    await waitFor(() => expect(bloque).toHaveClass('avatar-upload--armed'));
    await expect(canvas.getByRole('status')).toHaveTextContent(
      'Suelta la imagen sobre el avatar para subirla',
    );

    // La zona sensible no crece: el anillo se pinta con `outline`, que no ocupa
    // maqueta, así que la diana mide exactamente lo que mide el avatar.
    const avatar = canvasElement.querySelector('.avatar')!;
    await expect(Math.round(diana.getBoundingClientRect().width))
      .toBe(Math.round(avatar.getBoundingClientRect().width));
    await expect(avatar).toHaveClass('avatar--xl');

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
    await expect(canvas.getByRole('button', { name: 'Subir avatar' })).toHaveClass('button--lg');
    await expect(canvasElement.querySelector('.avatar')).toHaveClass('avatar--2xl');
    await expect(
      Math.round(canvasElement.querySelector('.avatar')!.getBoundingClientRect().width),
    ).toBe(96);
  },
};

/**
 * El avatar de 96px es la diana del arrastre, y a la vez tiene que caber con
 * su botón al lado en la pantalla más estrecha que servimos. La story mide la
 * fila dentro de una caja de 375px con el inset del contenedor.
 */
export const ContratoCabeEnMovil: Story = {
  name: 'Test — a talla lg la fila cabe en 375px',
  tags: ['!dev'],
  render: (args) => (
    <div style={{ inlineSize: 375, paddingInline: 'var(--spacing-5)', boxSizing: 'border-box' }}>
      <FormSizeContext.Provider value="lg">
        <AvatarUpload {...args} />
      </FormSizeContext.Provider>
    </div>
  ),
  args: { src: undefined, buttonLabel: 'Subir', buttonAccessibleLabel: 'Subir logo', shape: 'square' },
  play: async ({ canvasElement }) => {
    const fila = canvasElement.querySelector('.avatar-upload') as HTMLElement;
    // Una sola línea, sin desbordar: el avatar y el botón caben al lado.
    await expect(fila.scrollWidth).toBeLessThanOrEqual(fila.clientWidth);
    const avatar = canvasElement.querySelector('.avatar')!.getBoundingClientRect();
    const boton = within(canvasElement).getByRole('button', { name: 'Subir logo' }).getBoundingClientRect();
    await expect(Math.round(avatar.top)).toBe(Math.round(boton.top + (boton.height - avatar.height) / 2));
  },
};
