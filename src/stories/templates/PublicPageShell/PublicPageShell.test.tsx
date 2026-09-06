import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PublicPageShell } from './PublicPageShell';

/**
 * La banda de preferencias —idioma y tema— es chrome: ni contenido ni legal.
 * Por eso va en su propia `section` con nombre, entre el `main` y el `footer`,
 * y no dentro de ninguno de los dos: el pie legal es un `footer` y no admite
 * invitados.
 */
describe('PublicPageShell — la banda de preferencias', () => {
  function Pagina(props: Partial<React.ComponentProps<typeof PublicPageShell>> = {}) {
    return (
      <PublicPageShell
        preferences={<button type="button">Idioma</button>}
        footer={<footer>Legales</footer>}
        {...props}
      >
        <p>el contenido</p>
      </PublicPageShell>
    );
  }

  it('es una `section` con nombre, entre el contenido y el pie', () => {
    const { container } = render(<Pagina />);
    const banda = screen.getByRole('region', { name: 'Preferencias' });
    const main = screen.getByRole('main');
    const pie = screen.getByRole('contentinfo');

    expect(banda.tagName).toBe('SECTION');
    expect(main).not.toContainElement(banda);
    expect(pie).not.toContainElement(banda);
    expect(main.compareDocumentPosition(banda) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(banda.compareDocumentPosition(pie) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container.querySelector('.public-page-shell__preferences-row')).not.toBeNull();
  });

  it('el nombre es una prop, no un texto cableado', () => {
    render(<Pagina preferencesLabel="Settings" />);
    expect(screen.getByRole('region', { name: 'Settings' })).toBeInTheDocument();
  });

  it('sin `preferences` no hay banda, y el pie sigue en su sitio', () => {
    const { container } = render(<Pagina preferences={undefined} />);
    expect(container.querySelector('.public-page-shell__preferences')).toBeNull();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('sin marco no se pinta: no hay ranura de pie donde ponerla', () => {
    const { container } = render(<Pagina shell={false} />);
    expect(container.querySelector('.public-page-shell__preferences')).toBeNull();
    expect(screen.queryByRole('main')).toBeNull();
    expect(screen.getByText('el contenido')).toBeInTheDocument();
  });

  it('va en su propio `ErrorBoundary`: si lanza, el resto de la página sigue', () => {
    function Rota(): never {
      throw new Error('los conmutadores lanzan al renderizar');
    }
    const { container } = render(<Pagina preferences={<Rota />} />);
    expect(container.querySelector('.public-page-shell__preferences')).toBeNull();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
