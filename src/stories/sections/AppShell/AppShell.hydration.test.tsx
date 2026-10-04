import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, type ReactNode } from 'react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot, type Root } from 'react-dom/client';
import { AppShell } from './AppShell';
import { AppHeader } from '../AppHeader/AppHeader';
import { Sidebar } from '../Sidebar/Sidebar';
import { ChatShell } from '../../templates/ChatShell/ChatShell';
import { BrandMessagesProvider } from '../../messages';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';

/*
 * El servidor no conoce el ancho y pinta la columna de escritorio. Si el
 * primer render del cliente leyera `matchMedia`, por debajo del punto de
 * ruptura pintaría el cajón y React 19 tiraría la hidratación (encargo de
 * Homenize, Next.js 16 con SSR, a 1000px). Aquí se hace el viaje entero
 * —`renderToString` y `hydrateRoot` sobre ese HTML— con una ventana estrecha y
 * otra ancha, y se exige que React no se queje.
 */

function ventana(ancho: number) {
  window.matchMedia = ((query: string) => {
    const min = /min-width:\s*(\d+)px/.exec(query);
    return {
      matches: min ? ancho >= Number(min[1]) : false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    };
  }) as typeof window.matchMedia;
}

function Armazon() {
  return (
    <BrandMessagesProvider messages={ES}>
      <AppShell
        header={<AppHeader sidebarId="app-sidebar" />}
        sidebar={
          <Sidebar id="app-sidebar">
            <a href="/inicio">Inicio</a>
          </Sidebar>
        }
      >
        Contenido
      </AppShell>
    </BrandMessagesProvider>
  );
}

function Chat() {
  return (
    <BrandMessagesProvider messages={ES}>
      <ChatShell list={<ul><li>Conversación</li></ul>} header={<span>Ana</span>}>
        Hilo
      </ChatShell>
    </BrandMessagesProvider>
  );
}

let root: Root | null = null;
let container: HTMLDivElement;
const originalMatchMedia = window.matchMedia;

beforeEach(() => {
  // `hydrateRoot` a pelo, sin Testing Library: hay que declarar el entorno de
  // `act` a mano o React avisa por `console.error`, que es lo que se espía.
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  act(() => root?.unmount());
  root = null;
  container.remove();
  window.matchMedia = originalMatchMedia;
  vi.restoreAllMocks();
});

/** Pinta en servidor, hidrata en cliente y devuelve todo lo que React se quejó. */
async function hidratar(ui: ReactNode, ancho: number) {
  const html = renderToString(ui);
  container.innerHTML = html;
  ventana(ancho);
  const errores: unknown[] = [];
  vi.spyOn(console, 'error').mockImplementation((...args) => errores.push(args));
  await act(async () => {
    root = hydrateRoot(container, ui, {
      onRecoverableError: (error) => errores.push(error),
    });
  });
  return { html, errores };
}

describe('AppShell — hidratación sin desajustes', () => {
  it('ventana estrecha (1000px): hidrata sin avisos y acaba en cajón cerrado', async () => {
    const { html, errores } = await hidratar(<Armazon />, 1000);
    expect(errores).toEqual([]);

    // El servidor no sabe el ancho: columna de escritorio y sin `data-layout`,
    // que es lo que `AppShell.css` usa para esconderla por debajo de lg.
    expect(html).not.toContain('data-layout');

    // Tras hidratar, el cajón con su accesibilidad completa.
    const shell = container.querySelector('.app-shell')!;
    expect(shell).toHaveAttribute('data-layout', 'drawer');
    const aside = container.querySelector('aside#app-sidebar')!;
    expect(aside).toHaveClass('sidebar', 'sidebar--drawer');
    expect(aside).toHaveAttribute('data-state', 'closed');
    expect(aside).toHaveAttribute('inert');
    expect(aside).toHaveAttribute('tabindex', '-1');
    expect(container.querySelector('.sidebar__resizer')).toBeNull();
    const boton = container.querySelector('.menu-button')!;
    expect(boton).toHaveAttribute('aria-expanded', 'false');
    expect(boton).toHaveAttribute('aria-label', ES.menuButton.open);
    expect(boton).toHaveAttribute('aria-controls', 'app-sidebar');
  });

  it('ventana ancha (1280px): hidrata sin avisos y acaba en columna abierta y redimensionable', async () => {
    const { errores } = await hidratar(<Armazon />, 1280);
    expect(errores).toEqual([]);

    expect(container.querySelector('.app-shell')).toHaveAttribute('data-layout', 'column');
    const aside = container.querySelector('aside#app-sidebar')!;
    expect(aside).toHaveClass('sidebar', 'sidebar--open');
    expect(aside).toHaveAttribute('data-state', 'open');
    expect(aside).not.toHaveAttribute('inert');
    expect(container.querySelector('.sidebar__resizer')).toHaveAttribute('role', 'separator');
    expect(container.querySelector('.menu-button')).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('ChatShell — hidratación sin desajustes', () => {
  it('ventana estrecha: hidrata sin avisos y la lista pasa al cajón', async () => {
    const { errores } = await hidratar(<Chat />, 1000);
    expect(errores).toEqual([]);
    expect(container.querySelector('.chat-shell')).toHaveAttribute('data-layout', 'drawer');
    expect(container.querySelector('.chat-shell__list')).toBeNull();
    expect(container.querySelector('.chat-shell__list-trigger')).not.toBeNull();
  });

  it('ventana ancha: hidrata sin avisos y la lista es columna', async () => {
    const { errores } = await hidratar(<Chat />, 1280);
    expect(errores).toEqual([]);
    expect(container.querySelector('.chat-shell')).toHaveAttribute('data-layout', 'column');
    expect(container.querySelector('.chat-shell__list')).not.toBeNull();
  });
});
