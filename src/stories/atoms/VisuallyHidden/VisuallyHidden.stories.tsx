import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { VisuallyHidden } from './VisuallyHidden';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Atoms/VisuallyHidden',
  component: VisuallyHidden,
  parameters: { layout: 'padded' },
  argTypes: { className: { table: { disable: true } } },
};
export default meta;

type Story = StoryObj<typeof VisuallyHidden>;

/** El texto oculto está en el DOM y lo anuncian los lectores de pantalla; a la vista, no se nota. */
export const PorDefecto: Story = {
  render: () => (
    <p>
      Este párrafo tiene un texto visible
      <VisuallyHidden> (y este inciso solo lo leen los lectores de pantalla)</VisuallyHidden>
      {' '}y nada más aparente.
    </p>
  ),
};

/**
 * Nombre accesible de un botón que solo enseña un icono, sin recurrir a
 * `aria-label`. Ojo: la prop `iconOnly` de `Button` (la que lo hace cuadrado)
 * exige `aria-label` o `aria-labelledby` por tipo — ahí el nombre no puede
 * venir de aquí.
 */
export const NombreDeBoton: Story = {
  render: () => (
    <Button variant="ghost">
      <Icon name="close" size="sm" />
      <VisuallyHidden>Cerrar</VisuallyHidden>
    </Button>
  ),
};

/** Completar un enlace cuyo texto visible es genérico. */
export const EnlaceCompleto: Story = {
  render: () => (
    <a href="#">
      Ver proyecto<VisuallyHidden> — Onboarding digital para Randstad</VisuallyHidden>
    </a>
  ),
};

export const Contrato: Story = {
  name: 'Test — accesible, no visible, reenvía atributos',
  tags: ['!dev'],
  render: () => (
    <>
      <VisuallyHidden id="titulo-oculto" data-testid="oculto">Título del diálogo</VisuallyHidden>
      <div role="dialog" aria-labelledby="titulo-oculto">…</div>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const oculto = canvas.getByTestId('oculto');
    await expect(oculto).toHaveAttribute('id', 'titulo-oculto');
    await expect(oculto.getBoundingClientRect().width).toBeLessThanOrEqual(1);
    await expect(canvas.getByRole('dialog', { name: 'Título del diálogo' })).toBeInTheDocument();
  },
};
