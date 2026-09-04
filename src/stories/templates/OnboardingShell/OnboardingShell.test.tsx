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
