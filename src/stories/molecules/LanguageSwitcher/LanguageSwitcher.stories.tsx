import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { LanguageSwitcher, type Language } from './LanguageSwitcher';
import { Container } from '../../atoms/Container/Container';

const idiomas: Language[] = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'pt', label: 'Português' },
];

function Controlado(props: React.ComponentProps<typeof LanguageSwitcher>) {
  const [value, setValue] = useState(props.value);
  return <LanguageSwitcher {...props} value={value} onChange={setValue} />;
}

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'Molecules/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: { layout: 'padded' },
  args: { languages: idiomas, value: 'es' },
  argTypes: {
    variant: { control: 'select', options: ['compact', 'list'] },
    renderLink: { table: { disable: true } },
    hrefFor: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  render: (args) => <Controlado {...args} />,
};
export default meta;

type Story = StoryObj<typeof LanguageSwitcher>;

/** En la barra: el código del idioma actual abre el menú. */
export const Compacto: Story = {};

/** En el pie: los idiomas desplegados. Con `hrefFor`, cada uno es un enlace. */
export const Lista: Story = {
  args: { variant: 'list', hrefFor: (code) => `/${code}` },
};

/** Sobre superficie oscura. */
export const SuperficieOscura: Story = {
  args: { variant: 'list', hrefFor: (code) => `/${code}` },
  render: (args) => (
    <Container surface="dark" space="md">
      <Controlado {...args} />
    </Container>
  ),
};

export const Contrato: Story = {
  name: 'Test — código visible, opciones en su idioma, cambio anunciado',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const boton = canvas.getByRole('button', { name: 'Idioma' });
    await expect(boton.textContent).toContain('es');
    await userEvent.click(boton);
    // el menú lista los idiomas, cada uno marcado con su `lang`
    const fr = await within(document.body).findByText('Français');
    await expect(fr).toHaveAttribute('lang', 'fr');
    await userEvent.click(fr);
    await expect(boton.textContent).toContain('fr');
  },
};

export const ContratoLista: Story = {
  name: 'Test — la lista marca el idioma actual',
  tags: ['!dev'],
  args: { variant: 'list', hrefFor: (code) => `/${code}` },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation', { name: 'Idioma' });
    // el actual no es un enlace: es un dato marcado con aria-current
    await expect(within(nav).queryByRole('link', { name: 'Español' })).toBeNull();
    const actual = within(nav).getByText('Español');
    await expect(actual).toHaveAttribute('aria-current', 'true');
    await expect(actual).toHaveAttribute('lang', 'es');
    await expect(within(nav).getByRole('link', { name: 'Deutsch' })).toHaveAttribute('href', '/de');
  },
};
