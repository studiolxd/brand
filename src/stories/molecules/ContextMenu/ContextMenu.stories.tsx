import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, fn } from 'storybook/test';
import { ContextMenu } from './ContextMenu';
import { Icon } from '../../atoms/Icon/Icon';
import { Container } from '../../atoms/Container/Container';

const items = [
  { type: 'button' as const, label: 'Duplicar', onClick: fn() },
  { type: 'button' as const, label: 'Editar', onClick: fn() },
  { type: 'separator' as const },
  { type: 'link' as const, label: 'Ver detalle', href: '#proyecto-1' },
  { type: 'separator' as const },
  { type: 'button' as const, label: 'Eliminar', onClick: fn(), destructive: true },
];

const meta = {
  title: 'Molecules/ContextMenu',
  component: ContextMenu,
  parameters: { layout: 'padded' },
  args: { items },
  argTypes: {
    triggerSize: { control: 'select', options: ['sm', 'md', 'lg'] },
    triggerOrientation: { control: 'select', options: ['horizontal', 'vertical'] },
    renderLink: { table: { disable: true } },
  },
  decorators: [(Story) => <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><Story /></div>],
} satisfies Meta<typeof ContextMenu>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Acciones, un enlace y un destructivo al final, separados. */
export const PorDefecto: Story = {};

export const ConIconos: Story = {
  args: {
    items: [
      { type: 'button' as const, label: 'Duplicar', icon: <Icon name="copy" size="sm" />, onClick: fn() },
      { type: 'link' as const, label: 'Descargar', icon: <Icon name="download" size="sm" />, href: '#descarga' },
      { type: 'separator' as const },
      { type: 'button' as const, label: 'Eliminar', icon: <Icon name="close" size="sm" />, onClick: fn(), destructive: true },
    ],
  },
};

export const ConDeshabilitados: Story = {
  args: {
    items: [
      { type: 'button' as const, label: 'Duplicar', onClick: fn() },
      { type: 'button' as const, label: 'Publicar', onClick: fn(), disabled: true },
      { type: 'link' as const, label: 'Ver archivo', href: '#archivo', disabled: true },
    ],
  },
};

/** Tres puntos en columna, a talla sm: para filas de tabla densas. */
export const CompactoVertical: Story = {
  args: { triggerSize: 'sm', triggerOrientation: 'vertical' },
};

export const AbreArriba: Story = {
  args: { side: 'top' },
  decorators: [(Story) => <div style={{ display: 'flex', justifyContent: 'center', padding: '12rem 4rem 4rem' }}><Story /></div>],
};

export const SuperficieOscura: Story = {
  render: (args) => (
    <Container surface="dark" space="md">
      <div style={{ display: 'flex', justifyContent: 'center' }}><ContextMenu {...args} /></div>
    </Container>
  ),
};

export const Contrato: Story = {
  name: 'Test — abre con el botón de tres puntos, acción y enlace del router',
  tags: ['!dev'],
  args: {
    label: 'Más opciones de Proyecto 1',
    renderLink: ({ children, ...props }) => <a {...props} data-router="sí">{children}</a>,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Más opciones de Proyecto 1' }));
    const menu = await within(document.body).findByRole('menu');
    const enlace = within(menu).getByRole('menuitem', { name: 'Ver detalle' });
    await expect(enlace).toHaveAttribute('data-router', 'sí');
    await expect(enlace).toHaveAttribute('href', '#proyecto-1');
    await userEvent.click(within(menu).getByRole('menuitem', { name: 'Duplicar' }));
    await new Promise((r) => setTimeout(r, 20));
    await expect((args.items[0] as { onClick: () => void }).onClick).toHaveBeenCalled();
  },
};
