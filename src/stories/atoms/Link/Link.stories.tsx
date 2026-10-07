import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';
import { Link } from './Link';
import { Paragraph } from '../Paragraph/Paragraph';
import { Stack } from '../Stack/Stack';
import { PageIntro } from '../../molecules/PageIntro/PageIntro';
import { SOLO_CLARO, SOLO_OSCURO } from '../../utils/chromaticModes';

const meta: Meta<typeof Link> = {
  title: 'Atoms/Link',
  component: Link,
  parameters: { layout: 'padded' },
  argTypes: { className: { table: { disable: true } } },
  args: { href: '#', children: 'Ver proyectos', external: false },
};
export default meta;
type Story = StoryObj<typeof Link>;

/** Subrayado en reposo, sin subrayar en hover; el color es el del texto. */
export const PorDefecto: Story = {};

/**
 * Dentro de un párrafo: es texto, no un control. Dentro de texto corrido la
 * línea va en reposo y se quita en hover en las DOS superficies: en oscuro el
 * amarillo no se distingue lo bastante de la tinta blanca que lo rodea.
 */
export const EnTexto: Story = {
  render: () => (
    <Paragraph>
      Los proyectos se organizan por cliente; consulta <Link href="#">la guía de organización</Link> antes de crear uno.
    </Paragraph>
  ),
};

export const ContratoEnTextoOscuro: Story = {
  name: 'Test — en texto corrido, línea en reposo y ninguna en hover también en oscuro; el suelto no cambia',
  tags: ['!dev'],
  parameters: {
    surface: 'dark',
    chromatic: SOLO_OSCURO,
  },
  render: () => (
    <>
      <Paragraph>
        Consulta <a href="#guia" data-testid="en-texto">la guía de organización</a> antes de crear uno.
      </Paragraph>
      <Link href="#suelto" data-testid="suelto">Ver proyectos</Link>
    </>
  ),
  play: async ({ canvasElement }) => {
    const enTexto = canvasElement.querySelector('[data-testid="en-texto"]') as HTMLElement;
    const suelto = canvasElement.querySelector('[data-testid="suelto"]') as HTMLElement;
    // El oscuro lo pone un efecto (`withSurface`): se espera, no se da por hecho.
    await waitFor(() => expect(document.documentElement.dataset.theme).toBe('dark'));
    const grosor = (el: HTMLElement, prop: string) => getComputedStyle(el).getPropertyValue(prop).trim();
    // En texto: subrayado de 1px en reposo (`text-decoration`, que axe sí
    // reconoce como marca: `link-in-text-block` pasa sin desactivarla) y
    // ninguno en hover.
    await waitFor(() => expect(getComputedStyle(enTexto).textDecorationLine).toBe('underline'));
    await expect(getComputedStyle(enTexto).textDecorationThickness).toBe('1px');
    await expect(grosor(enTexto, '--link-hover-decoration-line')).toBe('none');
    // Suelto: en oscuro, sin línea en reposo y con línea en hover, como siempre.
    await expect(getComputedStyle(suelto).textDecorationLine).toBe('none');
    await expect(grosor(suelto, '--link-hover-decoration-line')).toBe('underline');
    await expect(grosor(suelto, '--link-hover-underline-width')).toBe('1px');
  },
};

/** `external`: nueva pestaña con `rel` seguro. */
export const Externo: Story = {
  args: { href: 'https://studiolxd.com', children: 'studiolxd.com', external: true },
};

export const Contrato: Story = {
  name: 'Test — externo seguro, atributos reenviados, misma cara que un <a> crudo',
  // Solo en claro: afirma la línea en reposo del enlace suelto, que en oscuro
  // no la lleva (la tinta amarilla ya lo distingue; ver `surface-dark-*`).
  tags: ['!dev', 'solo-claro'],
  parameters: { chromatic: SOLO_CLARO },
  render: () => (
    <>
      <Link href="https://studiolxd.com" external data-testid="externo">Externo</Link>
      <Link href="#" aria-current="page" data-testid="interno">Interno</Link>
      <a href="#" data-testid="crudo">Crudo</a>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const ext = canvas.getByTestId('externo');
    await expect(ext).toHaveAttribute('target', '_blank');
    await expect(ext).toHaveAttribute('rel', 'noopener noreferrer');
    const int = canvas.getByTestId('interno');
    await expect(int).not.toHaveAttribute('target');
    await expect(int).toHaveAttribute('aria-current', 'page');
    const a = getComputedStyle(int); const b = getComputedStyle(canvas.getByTestId('crudo'));
    await expect(a.color).toBe(b.color);
    // el subrayado es `text-decoration` con grosor y distancia de token (D64): igual en <Link> y en <a> crudo
    await expect(b.textDecorationLine).toBe('underline');
    await expect(a.textDecorationLine).toBe(b.textDecorationLine);
    await expect(a.textDecorationThickness).toBe(b.textDecorationThickness);
    await expect(a.textUnderlineOffset).toBe(b.textUnderlineOffset);
    await expect(a.textUnderlinePosition).toBe('under');
    await expect(a.boxShadow).toBe('none');
    await expect(a.paddingBottom).toBe(b.paddingBottom);
  },
};

/** Con icono delante («← Volver») o detrás. El icono es decorativo: el texto ya lo dice. */
export const ConIcono: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-5)' }}>
      <Link href="#acceso" icon="arrow-left">Volver a iniciar sesión</Link>
      <Link href="#siguiente" icon="arrow" iconPosition="end">Siguiente</Link>
    </div>
  ),
};

/**
 * El icono mide el texto del enlace: no tiene talla propia, mide `1em`. Aquí
 * el mismo enlace vive en tres tipografías —letra menor, cuerpo y título— y
 * el glifo sube y baja con ellas; el último, con el icono detrás, es el caso
 * de «Ver en la plataforma de origen».
 */
export const ElIconoSigueAlTexto: Story = {
  name: 'El icono sigue al texto',
  render: () => (
    <Stack>
      <div style={{ fontSize: 'var(--font-size-1)' }}>
        <Link href="#acceso" icon="arrow-left">Volver a iniciar sesión</Link>
      </div>
      <div style={{ fontSize: 'var(--font-size-2)' }}>
        <Link href="#acceso" icon="arrow-left">Volver a iniciar sesión</Link>
      </div>
      <div style={{ fontSize: 'var(--font-size-5)' }}>
        <Link href="#acceso" icon="arrow-left">Volver a iniciar sesión</Link>
      </div>
      <div style={{ fontSize: 'var(--font-size-5)' }}>
        <Link href="https://studiolxd.com" external icon="external-link" iconPosition="end">
          Ver en la plataforma de origen
        </Link>
      </div>
    </Stack>
  ),
};

export const ContratoIconoTexto: Story = {
  name: 'Test — el icono mide el texto del enlace, delante y detrás',
  tags: ['!dev'],
  render: () => (
    <>
      <div style={{ fontSize: '14px' }}>
        <Link href="#" icon="arrow-left" data-testid="menor">Volver</Link>
      </div>
      <div style={{ fontSize: '32px' }}>
        <Link href="#" icon="external-link" iconPosition="end" data-testid="mayor">
          Ver en la plataforma de origen
        </Link>
      </div>
    </>
  ),
  play: async ({ canvasElement }) => {
    const medir = (testId: string) => {
      const enlace = canvasElement.querySelector(`[data-testid="${testId}"]`) as HTMLElement;
      const glifo = enlace.querySelector('.link__icon') as SVGElement;
      return {
        glifo: Math.round(glifo.getBoundingClientRect().width),
        texto: Math.round(parseFloat(getComputedStyle(enlace).fontSize)),
      };
    };
    const menor = medir('menor');
    const mayor = medir('mayor');
    await expect(menor.glifo).toBe(menor.texto);
    await expect(mayor.glifo).toBe(mayor.texto);
    await expect(mayor.glifo).toBeGreaterThan(menor.glifo);
  },
};

/** Sobre el enlace del router: `render` recibe icono, clases y texto. */
export const ConRender: Story = {
  render: () => <Link icon="arrow-left" render={<a href="#acceso" data-router="sí" />}>Volver a iniciar sesión</Link>,
};

/**
 * Una acción que no navega pero se lee como enlace (deshacer, volver un paso
 * del formulario): `render` sobre un `<button type="button">`. La semántica
 * es la del botón; la cara, la del enlace — nunca un `<a href="#">`.
 */
export const ComoBoton: Story = {
  name: 'Como botón de acción',
  render: () => (
    <Link icon="arrow-left" render={<button type="button" onClick={() => undefined} />}>
      Volver al inicio de sesión
    </Link>
  ),
};

export const ContratoBoton: Story = {
  name: 'Test — sobre <button>, misma cara que un <a>',
  tags: ['!dev'],
  render: () => (
    <>
      <Link render={<button type="button" data-testid="boton" />}>Deshacer</Link>
      <a href="#" data-testid="crudo">Crudo</a>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const boton = canvas.getByRole('button', { name: 'Deshacer' });
    await expect(boton.tagName).toBe('BUTTON');
    await expect(boton).toHaveClass('link');
    const a = getComputedStyle(boton); const b = getComputedStyle(canvas.getByTestId('crudo'));
    await expect(a.color).toBe(b.color);
    await expect(a.textDecorationLine).toBe(b.textDecorationLine);
    await expect(a.textDecorationThickness).toBe(b.textDecorationThickness);
    await expect(a.paddingBottom).toBe(b.paddingBottom);
    await expect(a.fontSize).toBe(b.fontSize);
    await expect(a.fontFamily).toBe(b.fontFamily);
    await expect(a.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    await expect(a.borderTopWidth).toBe('0px');
  },
};

/**
 * Tres tonos: `accent` (por defecto) para texto y acciones —el ejemplo es
 * «¿olvidaste la contraseña?»—; `ink` para lo utilitario (legal, volver);
 * `accent-1` para lo que quiere destacar con el acento 1 de la paleta sin
 * ser un enlace de acción principal. `accent-1` solo se ve en superficie
 * oscura: en claro la lavanda no contrasta y cae al tono por defecto.
 */
export const Tonos: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-5)' }}>
      <Link href="#recuperar">¿Olvidaste tu contraseña?</Link>
      <Link href="#legal" tone="ink">Aviso legal</Link>
      <Link href="#novedades" tone="accent-1">Descubre las novedades</Link>
    </div>
  ),
};

export const ContratoInk: Story = {
  name: 'Test — el tono ink lleva su clase y su color de tinta',
  tags: ['!dev'],
  render: () => <Link href="#legal" tone="ink" data-testid="ink">Aviso legal</Link>,
  play: async ({ canvasElement }) => {
    const a = canvasElement.querySelector('[data-testid="ink"]') as HTMLElement;
    await expect(a).toHaveClass('link--ink');
    await expect(getComputedStyle(a).textDecorationLine).toBe('underline');
  },
};

export const ContratoAccent1: Story = {
  name: 'Test — el tono accent-1 lleva su clase y, en claro, el color del tono por defecto',
  tags: ['!dev', 'solo-claro'],
  // Comprueba el valor en claro; el oscuro lo cubre su pareja `SOLO_OSCURO`.
  // Fuera del modo oscuro de Chromatic y del proyecto `storybook-dark` (D43).
  parameters: { chromatic: SOLO_CLARO },
  render: () => (
    <>
      <Link href="#novedades" tone="accent-1" data-testid="accent-1">Descubre las novedades</Link>{' '}
      <Link href="#proyectos" data-testid="accent">Ver proyectos</Link>
    </>
  ),
  play: async ({ canvasElement }) => {
    const a = canvasElement.querySelector('[data-testid="accent-1"]') as HTMLElement;
    const porDefecto = canvasElement.querySelector('[data-testid="accent"]') as HTMLElement;
    await expect(a).toHaveClass('link--accent-1');
    await expect(getComputedStyle(a).textDecorationLine).toBe('underline');
    // La lavanda sobre blanco da 2,02:1: en claro el tono cae al de por defecto.
    await expect(getComputedStyle(a).color).toBe(getComputedStyle(porDefecto).color);
  },
};

export const ContratoAccent1Oscuro: Story = {
  name: 'Test — el tono accent-1, en oscuro, es la lavanda',
  tags: ['!dev'],
  parameters: { surface: 'dark', chromatic: SOLO_OSCURO },
  render: () => (
    <>
      <Link href="#novedades" tone="accent-1" data-testid="accent-1">Descubre las novedades</Link>
      {/* Sonda: el navegador resuelve el token, sin parsear el color a mano. */}
      <span data-testid="sonda" style={{ color: 'var(--color-accent-1)' }} aria-hidden="true">·</span>
    </>
  ),
  play: async ({ canvasElement }) => {
    const a = canvasElement.querySelector('[data-testid="accent-1"]') as HTMLElement;
    const sonda = canvasElement.querySelector('[data-testid="sonda"]') as HTMLElement;
    await waitFor(() => expect(getComputedStyle(a).color).toBe(getComputedStyle(sonda).color));
  },
};

/**
 * Un enlace de vuelta sobre una cabecera, dentro de un `Stack align="stretch"`
 * (la columna raíz de una página con contenido ancho). El enlace no se estira
 * al ancho del `Stack`: mide su texto, igual que si estuviera en `align="start"`.
 */
export const EnColumna: Story = {
  name: 'El enlace dentro de una columna',
  render: () => (
    <Stack align="stretch" data-testid="columna">
      <Link href="#modelos" icon="arrow-left" data-testid="enlace">Volver a los modelos</Link>
      <PageIntro title="Editar modelo" description="Cambia el nombre, el color y los campos del modelo." />
    </Stack>
  ),
};

export const ContratoColumna: Story = {
  name: 'Test — no se estira dentro de un Stack align="stretch"',
  tags: ['!dev'],
  render: EnColumna.render,
  play: async ({ canvasElement }) => {
    const columna = canvasElement.querySelector('[data-testid="columna"]') as HTMLElement;
    const enlace = canvasElement.querySelector('[data-testid="enlace"]') as HTMLElement;
    await expect(enlace.getBoundingClientRect().width).toBeLessThan(columna.getBoundingClientRect().width);
    // El ancho del enlace es el de su propio contenido, no el que le da el padre.
    await expect(Math.round(enlace.getBoundingClientRect().width))
      .toBe(Math.round(enlace.scrollWidth));
  },
};
