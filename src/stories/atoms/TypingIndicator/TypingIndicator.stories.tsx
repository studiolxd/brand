import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { TypingIndicator } from './TypingIndicator';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixtureEn as EN } from '../../../../.storybook/brandMessagesFixtureEn';

const meta = {
  title: 'Atoms/TypingIndicator',
  component: TypingIndicator,
  parameters: { layout: 'centered' },
  args: {
    name: 'Ola',
  },
} satisfies Meta<typeof TypingIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * El anuncio sale del catálogo —`typingIndicator.typing`, la plantilla— con el
 * nombre que pasa la pantalla: aquí, el asistente de la suite.
 */
export const Default: Story = {};

/**
 * La frase tiene **dos mitades**: el verbo lo pone el catálogo y el nombre lo
 * pone quien monta la pantalla. Con el catálogo en inglés, «Ola is typing…» —
 * el nombre no se traduce, porque es el del asistente.
 */
export const TextosDelProveedor: Story = {
  name: 'Textos desde el proveedor (otro idioma)',
  render: () => (
    <BrandMessagesProvider messages={EN}>
      <TypingIndicator name="Ola" />
    </BrandMessagesProvider>
  ),
};

/** Test: la plantilla sale del catálogo y el nombre, de la prop. */
export const ContratoProveedor: Story = {
  name: 'Test — el verbo sale del catálogo y el nombre de la prop',
  tags: ['!dev'],
  render: () => (
    <BrandMessagesProvider messages={EN}>
      <TypingIndicator name="Ola" />
    </BrandMessagesProvider>
  ),
  play: async ({ canvasElement }) => {
    const status = within(canvasElement).getByRole('status');
    await expect(status).toHaveTextContent('Ola is typing…');
  },
};

/** Test: rol, anuncio y tres puntos cuadrados (sin border-radius). */
export const Accesibilidad: Story = {
  name: 'Test — rol, label y puntos cuadrados',
  tags: ['!dev'],
  args: { name: 'Ana', label: 'Ana está escribiendo…' },
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
  args: { name: 'Ana', label: 'Ana está escribiendo…' },
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
