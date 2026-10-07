import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Form } from './Form';
import { InputField } from '../InputField/InputField';
import { PasswordField } from '../PasswordField/PasswordField';
import { CheckboxField } from '../CheckboxField/CheckboxField';
import { TextareaField } from '../TextareaField/TextareaField';
import { Button } from '../../atoms/Button/Button';
import { Link } from '../../atoms/Link/Link';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { SIN_LINK_IN_TEXT_BLOCK } from '../../utils/a11y';

const campos = (
  <>
    <InputField id="form-email" label="Correo electrónico" type="email" autoComplete="email" />
    <PasswordField id="form-password" label="Contraseña" autoComplete="current-password" helperText="Entre 8 y 128 caracteres" />
  </>
);

const meta: Meta<typeof Form> = {
  title: 'Molecules/Form',
  component: Form,
  parameters: { layout: 'padded' },
  args: {
    children: campos,
    actions: <Button variant="primary" type="submit">Entrar</Button>,
    onSubmit: (e) => e.preventDefault(),
  },
  argTypes: {
    size: { control: { type: 'radio' }, options: ['sm', 'md', 'lg'], description: 'Talla de todos los campos y botones.' },
    children: { table: { disable: true } },
    actions: { table: { disable: true } },
    links: { table: { disable: true } },
    alternatives: { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<typeof Form>;

/** Campos apilados y la acción principal. */
export const PorDefecto: Story = {};

/** Con errores del formulario (los que no cuelgan de un campo), enlaces secundarios y alternativas. */
export const Completo: Story = {
  // a11y falso positivo (D43): `link-in-text-block` en oscuro. El enlace va
  // dentro de texto corrido y lleva su línea en reposo, pero axe no ve una
  // línea pintada con `box-shadow` (regla 7). Ver `SIN_LINK_IN_TEXT_BLOCK`.
  parameters: { a11y: SIN_LINK_IN_TEXT_BLOCK },
  args: {
    errors: ['No hemos podido iniciar sesión. Comprueba el correo y la contraseña.'],
    links: (
      <>
        <Paragraph>¿No tienes cuenta? <Link href="#registro">Regístrate</Link>.</Paragraph>
        <Link href="#recuperar">¿Has olvidado la contraseña?</Link>
      </>
    ),
    captcha: <div style={{ inlineSize: '300px', blockSize: '65px', border: '1px dashed currentColor', display: 'grid', placeItems: 'center' }}>captcha</div>,
    alternativesLabel: 'O continúa con',
    alternatives: (
      <>
        <Button variant="outline">Google</Button>
        <Button variant="outline">Enlace mágico</Button>
      </>
    ),
  },
};

/** `size="lg"`: la talla llega sola a campos y botones — es la de las superficies públicas. */
export const TallaGrande: Story = {
  // a11y falso positivo (D43): `link-in-text-block` en oscuro. El enlace va
  // dentro de texto corrido y lleva su línea en reposo, pero axe no ve una
  // línea pintada con `box-shadow` (regla 7). Ver `SIN_LINK_IN_TEXT_BLOCK`.
  parameters: { a11y: SIN_LINK_IN_TEXT_BLOCK },
  args: { ...Completo.args, size: 'lg' },
};

/** Con `CheckboxField` y acción secundaria. */
export const ConCasillaYDosAcciones: Story = {
  args: {
    children: (
      <>
        {campos}
        <CheckboxField id="form-terms" label="Acepto las condiciones" />
      </>
    ),
    actions: (
      <>
        <Button variant="outline">Cancelar</Button>
        <Button variant="primary" type="submit">Crear cuenta</Button>
      </>
    ),
  },
};

/**
 * Casi todo obligatorio, y lo que no, marcado: `optional` en los campos que se
 * pueden dejar vacíos. Se marca la excepción, no la regla.
 */
export const ConCamposOpcionales: Story = {
  args: {
    children: (
      <>
        <InputField id="form-op-nombre" label="Nombre" autoComplete="name" required />
        <InputField id="form-op-email" label="Correo electrónico" type="email" autoComplete="email" required />
        <InputField id="form-op-telefono" label="Teléfono" type="tel" autoComplete="tel" optional />
        <TextareaField id="form-op-mensaje" label="Mensaje" required />
        <InputField id="form-op-empresa" label="Empresa" autoComplete="organization" optional />
      </>
    ),
    actions: <Button variant="primary" type="submit">Enviar</Button>,
  },
};

/** `blockActions`: botones y alternativas a todo el ancho, también en escritorio — el formulario de acceso. */
export const AccionesEnBloque: Story = {
  // a11y falso positivo (D43): `link-in-text-block` en oscuro. El enlace va
  // dentro de texto corrido y lleva su línea en reposo, pero axe no ve una
  // línea pintada con `box-shadow` (regla 7). Ver `SIN_LINK_IN_TEXT_BLOCK`.
  parameters: { a11y: SIN_LINK_IN_TEXT_BLOCK },
  args: { ...Completo.args, size: 'lg', blockActions: true },
};

/** `success`: el mensaje que sustituye al formulario, como texto anunciado, sin caja. */
export const Enviado: Story = {
  args: { children: undefined, actions: undefined, success: '¡Gracias por tu mensaje! Te responderemos lo más pronto posible.', links: <Link href="#inicio">Volver al inicio</Link> },
};

/** Sin campos: solo acciones y un enlace (reenviar un correo, aceptar o rechazar una invitación). */
export const SoloAcciones: Story = {
  args: {
    children: undefined,
    size: 'lg',
    actions: <Button variant="outline">Reenviar correo</Button>,
    links: <Link href="#acceso">Iniciar sesión con otra cuenta</Link>,
  },
};

export const Contrato: Story = {
  name: 'Test — talla heredada, errores anunciados, bloques en orden',
  tags: ['!dev'],
  // a11y falso positivo (D43): `link-in-text-block` en oscuro. El enlace va
  // dentro de texto corrido y lleva su línea en reposo, pero axe no ve una
  // línea pintada con `box-shadow` (regla 7). Ver `SIN_LINK_IN_TEXT_BLOCK`.
  parameters: { a11y: SIN_LINK_IN_TEXT_BLOCK },
  args: { ...Completo.args, size: 'lg', blockActions: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const form = canvasElement.querySelector('form')!;
    await expect(form).toHaveClass('form', 'form--lg');
    await expect(form).toHaveAttribute('novalidate');
    // la talla del Form llega a campos y botones sin pasarla uno a uno
    await expect(canvas.getByLabelText('Correo electrónico')).toHaveClass('input--lg');
    await expect(canvas.getByRole('button', { name: 'Entrar' })).toHaveClass('button--lg');
    await expect(canvas.getByRole('button', { name: 'Google' })).toHaveClass('button--lg');
    // los errores del formulario se anuncian
    await expect(canvas.getByRole('alert').textContent).toContain('No hemos podido');
    // orden: campos → errores → acciones → enlaces → alternativas
    const orden = Array.from(form.children).map((el) => el.className.split(' ')[0]);
    await expect(orden).toEqual(['form__fields', 'form__captcha', 'form__errors', 'form__actions', 'form__links', 'form__alternatives']);
    // en bloque, la principal (última del JSX) queda arriba
    const acciones = canvasElement.querySelector('.form__actions') as HTMLElement;
    await expect(getComputedStyle(acciones).flexDirection).toBe('column-reverse');
    // el enlace con texto delante: el texto no es enlace, solo la acción
    await expect(canvas.getByRole('link', { name: 'Regístrate' })).toBeInTheDocument();
  },
};
