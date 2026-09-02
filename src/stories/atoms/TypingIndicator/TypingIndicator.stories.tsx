import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { TypingIndicator } from './TypingIndicator';

const meta = {
  title: 'Atoms/TypingIndicator',
  component: TypingIndicator,
  parameters: { layout: 'centered' },
  args: {
    label: 'El asistente está escribiendo…',
  },
} satisfies Meta<typeof TypingIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Los puntos toman su tinta del par oscuro (`surface-dark-dot-color`): blancos sobre prusia. */
export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
};

/** Test: rol, anuncio y tres puntos cuadrados (sin border-radius). */
export const Accesibilidad: Story = {
  name: 'Test — rol, label y puntos cuadrados',
  tags: ['!dev'],
  args: { label: 'Ana está escribiendo…' },
  play: async ({ canvasElement }) => {
    const status = within(canvasElement).getByRole('status');
    await expect(status).toHaveTextContent('Ana está escribiendo…');
    const dots = status.querySelectorAll('.typing-indicator__dot');
    await expect(dots).toHaveLength(3);
    await expect(getComputedStyle(dots[0]).borderRadius).toBe('0px');
  },
};

/**
 * Test: con `prefers-reduced-motion: reduce` los puntos se quedan quietos y el
 * texto accesible sigue anunciándose. La preferencia no se puede emular desde
 * la story, así que se comprueba sobre la hoja de estilo real que sirve el
 * navegador —la regla existe y para la animación— más el anuncio, que es quien
 * informa cuando no hay movimiento.
 */
export const MovimientoReducido: Story = {
  name: 'Test — con movimiento reducido',
  tags: ['!dev'],
  args: { label: 'Ana está escribiendo…' },
  play: async ({ canvasElement }) => {
    const status = within(canvasElement).getByRole('status');
    await expect(status).toHaveTextContent('Ana está escribiendo…');

    const reglas = Array.from(document.styleSheets).flatMap((hoja) => {
      try {
        return Array.from(hoja.cssRules);
      } catch {
        // Hoja de otro origen: no se puede leer y no es la nuestra.
        return [];
      }
    });
    const media = reglas.filter(
      (r): r is CSSMediaRule =>
        r instanceof CSSMediaRule && r.conditionText.includes('prefers-reduced-motion'),
    );
    const paraLaAnimacion = media.some((r) =>
      Array.from(r.cssRules).some(
        (dentro) =>
          dentro instanceof CSSStyleRule &&
          dentro.selectorText.includes('.typing-indicator__dot') &&
          dentro.style.animationName === 'none',
      ),
    );
    await expect(paraLaAnimacion).toBe(true);
  },
};
