import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { AppRoot } from './AppRoot';
import { SiteHeader } from '../SiteHeader/SiteHeader';
import { SiteNav } from '../../molecules/SiteNav/SiteNav';
import { Container } from '../../atoms/Container/Container';
import { Heading } from '../../atoms/Heading/Heading';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { navEntries } from '../AppShell/_datos';

const indice = [
  { id: 'soluciones', label: 'Soluciones', href: '#soluciones', items: navEntries.filter((e) => e.kind === 'group').flatMap((g) => (g.kind === 'group' ? g.items.map((i) => ({ id: i.id, label: i.label, href: i.href })) : [])) },
];

const meta: Meta<typeof AppRoot> = {
  title: 'Sections/AppRoot',
  component: AppRoot,
  parameters: { layout: 'fullscreen' },
  args: {
    children: (
      <>
        <SiteHeader><SiteNav groups={indice} /></SiteHeader>
        <Container as="main" id="main-content" tabIndex={-1} space="xl">
          <Heading level={1} size={7}>Contenido principal</Heading>
          <Paragraph>Con el foco en la página, el primer <kbd>Tab</kbd> revela el enlace de salto; activarlo trae el foco aquí, saltando la cabecera.</Paragraph>
        </Container>
      </>
    ),
  },
  argTypes: { children: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof AppRoot>;

/** El enlace de salto es invisible hasta que recibe el foco; entonces aparece sobre todo. */
export const PorDefecto: Story = {};

export const Contrato: Story = {
  name: 'Test — el salto es lo primero al tabular y apunta a un destino enfocable',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    const skip = canvas.getByRole('link', { name: 'Saltar al contenido principal' });
    await expect(document.activeElement).toBe(skip);
    await expect(skip).toHaveAttribute('href', '#main-content');
    const main = canvasElement.querySelector('#main-content') as HTMLElement;
    await expect(main.tabIndex).toBe(-1);
    main.focus();
    await expect(document.activeElement).toBe(main);
  },
};
