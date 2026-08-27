import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Form } from './Form';
import { InputField } from '../InputField/InputField';
import { PasswordField } from '../PasswordField/PasswordField';
import { CheckboxField } from '../CheckboxField/CheckboxField';
import { Button } from '../../atoms/Button/Button';
import { Link } from '../../atoms/Link/Link';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';

const campos = (
  <>
    <InputField id="form-email" label="Correo electrónico" type="email" autoComplete="email" />
    <PasswordField id="form-password" label="Contraseña" labelHidden={false} autoComplete="current-password" helperText="Entre 8 y 128 caracteres" />
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
  args: {
    errors: ['No hemos podido iniciar sesión. Comprueba el correo y la contraseña.'],
    links: (
      <>
        <Paragraph>¿No tienes cuenta? <Link href="#registro">Regístrate</Link></Paragraph>
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
  args: { ...Completo.args, size: 'lg' },
};

/** Sobre superficie oscura: cada pieza voltea con sus tokens; el Form no añade nada. */
export const SuperficieOscura: Story = {
  args: { ...Completo.args },
  decorators: [(Story) => <div className="surface-dark" style={{ padding: 'var(--spacing-6)' }}><Story /></div>],
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
  args: { ...Completo.args, size: 'lg' },
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
    // el enlace con texto delante: el texto no es enlace, solo la acción
    await expect(canvas.getByRole('link', { name: 'Regístrate' })).toBeInTheDocument();
  },
};
