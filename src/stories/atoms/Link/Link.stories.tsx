import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Link } from './Link';
import { Paragraph } from '../Paragraph/Paragraph';

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

/** Dentro de un párrafo: es texto, no un control. */
export const EnTexto: Story = {
  render: () => (
    <Paragraph>
      Los proyectos se organizan por cliente; consulta <Link href="#">la guía de organización</Link> antes de crear uno.
    </Paragraph>
  ),
};

/** `external`: nueva pestaña con `rel` seguro. */
export const Externo: Story = {
  args: { href: 'https://studiolxd.com', children: 'studiolxd.com', external: true },
};

export const Contrato: Story = {
  name: 'Test — externo seguro, atributos reenviados, misma cara que un <a> crudo',
  tags: ['!dev'],
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
    // la línea del enlace es una sombra interior (no text-decoration): igual en <Link> y en <a> crudo
    await expect(a.textDecorationLine).toBe('none');
    await expect(b.boxShadow).not.toBe('none');
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

/** Sobre el enlace del router: `render` recibe icono, clases y texto. */
export const ConRender: Story = {
  render: () => <Link icon="arrow-left" render={<a href="#acceso" data-router="sí" />}>Volver a iniciar sesión</Link>,
};

/** Dos tonos: `accent` para texto y acciones; `ink` para lo utilitario (legal, volver, ¿olvidaste la contraseña?). */
export const Tonos: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-5)' }}>
      <Link href="#registro">Regístrate</Link>
      <Link href="#recuperar" tone="ink">¿Olvidaste tu contraseña?</Link>
    </div>
  ),
};

export const ContratoInk: Story = {
  name: 'Test — el tono ink lleva su clase y su color de tinta',
  tags: ['!dev'],
  render: () => <Link href="#recuperar" tone="ink" data-testid="ink">¿Olvidaste tu contraseña?</Link>,
  play: async ({ canvasElement }) => {
    const a = canvasElement.querySelector('[data-testid="ink"]') as HTMLElement;
    await expect(a).toHaveClass('link--ink');
    await expect(getComputedStyle(a).boxShadow).not.toBe('none');
  },
};
