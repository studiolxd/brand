import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

/**
 * Sin componente propio: fuerza a los tres `font-family` del sistema a pintar
 * texto para que el navegador dispare la descarga, y así `document.fonts`
 * pueda comprobar que las trae el propio DS (`fonts.css`), no el producto.
 */
function FontLoadProbe() {
  return (
    <div aria-hidden>
      <p style={{ fontFamily: 'var(--font-family-sans)' }}>Google Sans Flex</p>
      <p style={{ fontFamily: 'var(--font-family-mono)' }}>Google Sans Code</p>
      <p style={{ fontFamily: 'var(--font-family-serif)' }}>Libre Bodoni</p>
    </div>
  );
}

const meta: Meta<typeof FontLoadProbe> = {
  title: 'Foundations/Tipografía',
  component: FontLoadProbe,
};
export default meta;

type Story = StoryObj<typeof FontLoadProbe>;

export const TestCargaDeFuentes: Story = {
  name: 'Test — las fuentes las trae el DS',
  tags: ['!dev'],
  play: async () => {
    await document.fonts.ready;

    await expect(document.fonts.check('300 16px "Google Sans Flex"')).toBe(true);
    await expect(document.fonts.check('italic 400 16px "Google Sans Code"')).toBe(true);
    await expect(document.fonts.check('italic 400 16px "Libre Bodoni"')).toBe(true);
  },
};
