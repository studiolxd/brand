import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OnboardingShell } from './OnboardingShell';

/**
 * El pie de acciones se marca en el orden del renglón de escritorio —«Atrás»,
 * la salida y, cerrándolo, la principal—: es lo que hace el pie de un `Form`,
 * y es lo que recorre el tabulador. Las dos disposiciones (fila en escritorio,
 * columna en móvil) salen del mismo marcado, sin `order` ni `row-reverse` que
 * separen el foco de lo que se ve en la fila.
 */
describe('OnboardingShell — el pie de acciones', () => {
  function Paso() {
    return (
      <OnboardingShell
        backAction={<button type="button">Atrás</button>}
        exitAction={<button type="button">Omitir por ahora</button>}
        primaryAction={<button type="button">Continuar</button>}
      >
        <p>el paso</p>
      </OnboardingShell>
    );
  }

  it('marca las acciones en el orden del renglón: «Atrás», la salida y la principal', () => {
    render(<Paso />);
    const acciones = screen.getByRole('group', { name: 'Acciones del paso' });
    const rotulos = Array.from(acciones.querySelectorAll('button')).map((b) => b.textContent);
    expect(rotulos).toEqual(['Atrás', 'Omitir por ahora', 'Continuar']);
  });

  it('el tabulador las recorre en ese mismo orden', async () => {
    const usuario = userEvent.setup();
    render(<Paso />);

    await usuario.tab();
    expect(document.activeElement).toHaveTextContent('Atrás');

    await usuario.tab();
    expect(document.activeElement).toHaveTextContent('Omitir por ahora');

    await usuario.tab();
    expect(document.activeElement).toHaveTextContent('Continuar');
  });
});

/**
 * La marca y las preferencias son chrome: van en las ranuras de cabecera y de
 * preferencias del marco, fuera del `main`. Es lo que las saca del aire del
 * contenido —el `Container` con `space="xl"`— y les deja el del chrome
 * público. Sin marco (`shell={false}`) vuelven a la columna, porque ahí manda
 * el `AppShell`.
 */
describe('OnboardingShell — el chrome, fuera del `main`', () => {
  it('la marca va en la ranura de cabecera y las preferencias en la banda del marco', () => {
    const { container } = render(
      <OnboardingShell brand={<span>Marca</span>} preferences={<span>Idioma</span>}>
        <p>el paso</p>
      </OnboardingShell>,
    );
    const main = screen.getByRole('main');
    const barra = container.querySelector('.onboarding-shell__top')!;
    const ajustes = container.querySelector('.public-page-shell__preferences')!;
    const marco = container.querySelector('.site-shell')!;

    expect(main).not.toContainElement(barra as HTMLElement);
    expect(main).not.toContainElement(ajustes as HTMLElement);
    expect(marco.firstElementChild).toBe(barra);
    expect(marco.lastElementChild).toContainElement(ajustes as HTMLElement);
    expect(barra).toHaveClass('onboarding-shell__top--band');
    // La marca cuelga de la barra en los dos modos: es de ahí de donde hereda
    // los peldaños de alto de móvil y teléfono.
    expect(barra).toContainElement(container.querySelector('.onboarding-shell__brand'));
    // La banda del alta ya no es suya: es la del marco, con su nombre.
    expect(container.querySelector('.onboarding-shell__settings')).toBeNull();
    expect(ajustes).toHaveAttribute('aria-label', 'Preferencias');
  });

  it('`switchers` sigue valiendo como alias de `preferences`', () => {
    const { container } = render(
      <OnboardingShell brand={<span>Marca</span>} switchers={<span>Idioma</span>}>
        <p>el paso</p>
      </OnboardingShell>,
    );
    const banda = container.querySelector('.public-page-shell__preferences')!;
    expect(banda).toHaveTextContent('Idioma');
  });

  it('con los dos, manda `preferences`', () => {
    const { container } = render(
      <OnboardingShell preferences={<span>Nuevo</span>} switchers={<span>Viejo</span>}>
        <p>el paso</p>
      </OnboardingShell>,
    );
    const banda = container.querySelector('.public-page-shell__preferences')!;
    expect(banda).toHaveTextContent('Nuevo');
    expect(banda).not.toHaveTextContent('Viejo');
  });

  it('sin marco, marca y preferencias vuelven a la columna y sin la banda', () => {
    const { container } = render(
      <OnboardingShell shell={false} brand={<span>Marca</span>} preferences={<span>Idioma</span>}>
        <p>el paso</p>
      </OnboardingShell>,
    );
    expect(screen.queryByRole('main')).toBeNull();
    const alta = container.querySelector('.onboarding-shell')!;
    const barra = container.querySelector('.onboarding-shell__top')!;
    expect(alta).toContainElement(barra as HTMLElement);
    expect(barra).not.toHaveClass('onboarding-shell__top--band');
    expect(barra).toContainElement(container.querySelector('.onboarding-shell__brand'));
    // Sin marco no hay banda: las preferencias vuelven a la rejilla del alta,
    // pero conservan su nombre accesible.
    expect(container.querySelector('.public-page-shell__preferences')).toBeNull();
    const ajustes = container.querySelector('.onboarding-shell__settings')!;
    expect(alta).toContainElement(ajustes as HTMLElement);
    expect(ajustes).toHaveAttribute('aria-label', 'Preferencias');
  });
});
