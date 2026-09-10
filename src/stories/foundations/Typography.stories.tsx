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
    // El `play` corre justo después del commit de React, antes de que el
    // navegador haya hecho maqueta: en ese momento no hay ninguna descarga de
    // fuente pendiente, así que `document.fonts.ready` resuelve sin haber
    // traído nada y `check()` responde `false`. Se piden las tres caras a
    // mano, que no depende de cuándo pinte el navegador.
    const caras = [
      '300 16px "Google Sans Flex"',
      'italic 400 16px "Google Sans Code"',
      'italic 400 16px "Libre Bodoni"',
    ];
    await Promise.all(caras.map((cara) => document.fonts.load(cara)));

    for (const cara of caras) {
      await expect(document.fonts.check(cara)).toBe(true);
    }
  },
};
