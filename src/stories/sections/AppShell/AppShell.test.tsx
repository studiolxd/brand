import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppShell } from './AppShell';

describe('AppShell — banner sin ResizeObserver', () => {
  let originalResizeObserver: typeof ResizeObserver | undefined;

  beforeEach(() => {
    originalResizeObserver = globalThis.ResizeObserver;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (globalThis as any).ResizeObserver;
  });

  afterEach(() => {
    globalThis.ResizeObserver = originalResizeObserver as typeof ResizeObserver;
  });

  it('no lanza al montar un banner sin ResizeObserver en el entorno', () => {
    expect(() =>
      render(
        <AppShell
          banner={<div>Suplantando a otro usuario</div>}
          header={<div>Cabecera</div>}
          sidebar={<div>Sidebar</div>}
          skipLabel="Saltar al contenido"
        >
          Contenido
        </AppShell>,
      ),
    ).not.toThrow();
    expect(screen.getByText('Suplantando a otro usuario')).toBeInTheDocument();
  });

  it('con ResizeObserver presente, publica el alto de la barra en --app-shell-banner-height', () => {
    class FakeResizeObserver {
      callback: ResizeObserverCallback;
      constructor(callback: ResizeObserverCallback) {
        this.callback = callback;
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    globalThis.ResizeObserver = FakeResizeObserver as unknown as typeof ResizeObserver;

    const { container } = render(
      <AppShell
        banner={<div>Suplantando a otro usuario</div>}
        header={<div>Cabecera</div>}
        sidebar={<div>Sidebar</div>}
        skipLabel="Saltar al contenido"
      >
        Contenido
      </AppShell>,
    );

    const shell = container.querySelector('.app-shell') as HTMLElement;
    expect(shell.style.getPropertyValue('--app-shell-banner-height')).toMatch(/px$/);
  });
});
