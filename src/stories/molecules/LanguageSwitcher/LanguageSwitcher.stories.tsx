import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import { LanguageSwitcher, type Language } from './LanguageSwitcher';

const idiomas: Language[] = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'pt', label: 'Português' },
];

/** ~30 idiomas: el caso real que sacó el bug (el panel se salía de la pantalla en móvil). */
const muchosIdiomas: Language[] = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'pt', label: 'Português' },
  { code: 'it', label: 'Italiano' },
  { code: 'ca', label: 'Català' },
  { code: 'eu', label: 'Euskara' },
  { code: 'gl', label: 'Galego' },
  { code: 'pl', label: 'Polski' },
  { code: 'ro', label: 'Română' },
  { code: 'sv', label: 'Svenska' },
  { code: 'no', label: 'Norsk' },
  { code: 'da', label: 'Dansk' },
  { code: 'fi', label: 'Suomi' },
  { code: 'is', label: 'Íslenska' },
  { code: 'cs', label: 'Čeština' },
  { code: 'sk', label: 'Slovenčina' },
  { code: 'hu', label: 'Magyar' },
  { code: 'el', label: 'Ελληνικά' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'ru', label: 'Русский' },
  { code: 'uk', label: 'Українська' },
  { code: 'ar', label: 'العربية' },
  { code: 'he', label: 'עברית' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'zh', label: '中文' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'th', label: 'ไทย' },
  { code: 'vi', label: 'Tiếng Việt' },
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

/** En la barra: el mismo campo desplegable que el de tema, con la etiqueta oculta y el código del idioma actual. */
export const Compacto: Story = {};

/** Con la etiqueta visible, para un formulario de ajustes. */
export const EtiquetaOculta: Story = { args: { labelHidden: true } };

/** En el pie: los idiomas desplegados. Con `hrefFor`, cada uno es un enlace. */
export const Lista: Story = {
  args: { variant: 'list', hrefFor: (code) => `/${code}` },
};

export const Contrato: Story = {
  name: 'Test — nombre del idioma visible, opciones en su idioma, cambio anunciado',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const boton = canvas.getByRole('button', { name: 'Idioma' });
    await expect(boton.textContent).toContain('Español');
    await userEvent.click(boton);
    // el menú lista los idiomas, cada uno marcado con su `lang`
    const fr = await within(document.body).findByText('Français');
    await expect(fr).toHaveAttribute('lang', 'fr');
    await userEvent.click(fr);
    await expect(boton.textContent).toContain('Français');
  },
};

/**
 * Con ~30 idiomas en un móvil, el panel no puede salirse de la pantalla: se
 * limita a la altura disponible y hace scroll (Foundations → Menu § «Altura
 * y scroll»).
 */
export const MuchasOpciones: Story = {
  name: 'Muchas opciones',
  args: { languages: muchosIdiomas },
  globals: { viewport: { value: 'mobile1' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Idioma' }));

    // El panel va en un portal, fuera del canvas de la story.
    const menu = await within(document.body).findByRole('menu');

    await waitFor(() => {
      expect(menu.scrollHeight).toBeGreaterThan(menu.clientHeight);
      expect(menu.getBoundingClientRect().bottom).toBeLessThanOrEqual(window.innerHeight);
    });
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
