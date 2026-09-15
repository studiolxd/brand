import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatShell } from './ChatShell';

/**
 * `test/setup.ts` deja `matchMedia` siempre en `matches: false`, es decir
 * pantalla estrecha. Para el caso de escritorio se sustituye en la prueba.
 */
function anchoDeEscritorio() {
  const original = window.matchMedia;
  window.matchMedia = ((query: string) => ({
    matches: true,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;
  return () => { window.matchMedia = original; };
}

let restaurar: (() => void) | undefined;
afterEach(() => { restaurar?.(); restaurar = undefined; });

function Armazon(props: Partial<React.ComponentProps<typeof ChatShell>>) {
  return (
    <ChatShell list={<nav aria-label="Lista">conversaciones</nav>} {...props}>
      <p>hilo</p>
    </ChatShell>
  );
}

describe('ChatShell', () => {
  it('en escritorio la lista es columna y no hay botón de cajón', () => {
    restaurar = anchoDeEscritorio();
    render(<Armazon />);

    expect(screen.getByRole('complementary', { name: 'Conversaciones' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Abrir conversaciones' })).not.toBeInTheDocument();
  });

  it('por debajo del punto de ruptura la lista se pliega a un cajón accesible', async () => {
    render(<Armazon />);

    // Ni columna ni tira: la lista no está en la maqueta hasta que se abre.
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: 'Lista' })).not.toBeInTheDocument();

    const trigger = screen.getByRole('button', { name: 'Abrir conversaciones' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(trigger);

    const cajon = await screen.findByRole('dialog', { name: 'Conversaciones' });
    expect(cajon).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Lista' })).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  /**
   * El invariante de verdad —misma caja y mismo punto de la pantalla— se mide
   * en el navegador, en la story «Test — el disparador no salta al abrir el
   * cajón»: jsdom no maqueta, así que aquí se fija lo que sí se puede leer sin
   * layout, que es de dónde sale esa coincidencia: el cajón repite la fila de
   * cabecera del armazón y pone dentro un botón idéntico al de la cabecera.
   */
  it('el cajón repite la fila de cabecera con el mismo botón', async () => {
    render(<Armazon />);

    const enLaCabecera = screen.getByRole('button', { name: 'Abrir conversaciones' });
    await userEvent.click(enLaCabecera);

    const cajon = await screen.findByRole('dialog', { name: 'Conversaciones' });
    const fila = cajon.querySelector('.chat-shell__header');
    expect(fila).not.toBeNull();

    const enElCajon = fila!.querySelector('.chat-shell__list-trigger') as HTMLElement;
    expect(enElCajon).not.toBeNull();
    // El mismo botón declarado igual: misma variante, misma talla, mismo glifo.
    expect(enElCajon.className).toBe(enLaCabecera.className);
    expect(enElCajon.querySelector('svg')?.getAttribute('class')).toBe(
      enLaCabecera.querySelector('svg')?.getAttribute('class'),
    );

    // Y el cajón anula el relleno propio del `Sheet`, que era lo que hacía
    // nacer la fila 48px más abajo y 32px a la derecha.
    const panel = cajon as HTMLElement;
    expect(panel.classList.contains('chat-shell__drawer')).toBe(true);
  });

  it('el cajón se puede controlar desde el producto', async () => {
    const onListOpenChange = vi.fn();
    render(<Armazon listOpen={false} onListOpenChange={onListOpenChange} />);

    await userEvent.click(screen.getByRole('button', { name: 'Abrir conversaciones' }));
    expect(onListOpenChange).toHaveBeenCalledWith(true);
    // Controlado: sin que el producto mueva `listOpen`, el cajón no se abre.
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('sin lista no hay cajón ni botón que lo abra', () => {
    render(<ChatShell><p>hilo</p></ChatShell>);
    expect(screen.queryByRole('button', { name: 'Abrir conversaciones' })).not.toBeInTheDocument();
  });

  it('los textos del cajón se traducen', () => {
    render(<Armazon listLabel="Conversations" listTriggerLabel="Open conversations" />);
    expect(screen.getByRole('button', { name: 'Open conversations' })).toBeInTheDocument();
  });
});
