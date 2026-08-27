import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, fn } from 'storybook/test';
import { OrgSwitcher } from './OrgSwitcher';

const orgs = [
  { id: 'studio', name: 'Studio LXD' },
  { id: 'acme', name: 'Acme Corp' },
  { id: 'vertex', name: 'Vertex Design' },
];

const meta: Meta<typeof OrgSwitcher> = {
  title: 'Molecules/OrgSwitcher',
  component: OrgSwitcher,
  parameters: { layout: 'padded' },
  args: { current: orgs[0], organizations: orgs, onOrgChange: fn() },
  argTypes: { renderLink: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof OrgSwitcher>;

/** Sin logo, la organización son sus iniciales en cuadrado. */
export const PorDefecto: Story = {};

export const ConLogo: Story = {
  args: {
    current: { id: 'studio', name: 'Studio LXD', logoUrl: 'https://placehold.co/64x64/1a2b4a/ffffff?text=S' },
    organizations: [
      { id: 'studio', name: 'Studio LXD', logoUrl: 'https://placehold.co/64x64/1a2b4a/ffffff?text=S' },
      { id: 'acme', name: 'Acme Corp', logoUrl: 'https://placehold.co/64x64/e63946/ffffff?text=A' },
    ],
  },
};

/** Acciones al pie: crear organización, ajustes… */
export const ConAcciones: Story = {
  args: {
    items: [
      { type: 'link' as const, label: 'Ajustes de la organización', href: '#ajustes' },
      { type: 'button' as const, label: 'Crear organización', onClick: () => {} },
    ],
  },
};

/** Con una sola organización el menú solo la confirma; el producto puede ocultar el control. */
export const OrganizacionUnica: Story = {
  args: { organizations: [orgs[0]] },
};

export const Contrato: Story = {
  name: 'Test — la actual marcada, cambiar avisa con el id',
  tags: ['!dev'],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Organización: Studio LXD' }));
    const menu = await within(document.body).findByRole('menu');
    await expect(within(menu).getByRole('menuitemcheckbox', { name: 'Studio LXD' })).toHaveAttribute('aria-checked', 'true');
    await userEvent.click(within(menu).getByRole('menuitem', { name: 'Acme Corp' }));
    await expect(args.onOrgChange).toHaveBeenCalledWith('acme');
  },
};
