import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { LegalFooter } from './LegalFooter';

const links = [
  { id: 'aviso', label: 'Aviso legal', href: '#aviso-legal' },
  { id: 'privacidad', label: 'Privacidad', href: '#privacidad' },
  { id: 'cookies', label: 'Cookies', href: '#cookies' },
  { id: 'condiciones', label: 'Condiciones', href: '#condiciones' },
];

const meta: Meta<typeof LegalFooter> = {
  title: 'Sections/LegalFooter',
  component: LegalFooter,
  parameters: { layout: 'fullscreen' },
  args: { links },
  argTypes: { renderLink: { table: { disable: true } }, className: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof LegalFooter>;

export const PorDefecto: Story = {};

export const ConTitulo: Story = { args: { title: 'Legal' } };

export const SuperficieOscura: Story = { args: { surface: 'dark' } };

export const Contrato: Story = {
  name: 'Test — nav con nombre y enlaces por el router',
  tags: ['!dev'],
  args: { label: 'Legal', renderLink: ({ children, ...props }) => <a {...props} data-router="sí">{children}</a> },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation', { name: 'Legal' });
    const enlaces = within(nav).getAllByRole('link');
    await expect(enlaces).toHaveLength(4);
    await expect(enlaces[1]).toHaveAttribute('href', '#privacidad');
    await expect(enlaces[1]).toHaveAttribute('data-router', 'sí');
    await expect(canvas.getByRole('contentinfo')).toBeInTheDocument();
  },
};
