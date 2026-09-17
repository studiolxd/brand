import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Prose } from './Prose';

describe('Prose — contenido en HTML (`html`)', () => {
  it('pinta el HTML dentro del contenedor, que es quien lo viste', () => {
    render(
      <Prose
        data-testid="texto"
        html="<h2>Objetivos</h2><p>Reconocer los <strong>huecos crudos</strong> de un ladrillo.</p>"
      />,
    );
    const nodo = screen.getByTestId('texto');
    expect(nodo).toHaveClass('prose');
    expect(nodo.querySelector('h2')).toHaveTextContent('Objetivos');
    expect(nodo.querySelector('p strong')).toHaveTextContent('huecos crudos');
  });

  it('respeta `size`, `measure` y `as` igual que con `children`', () => {
    render(<Prose as="article" size="sm" measure={false} data-testid="texto" html="<p>Cita</p>" />);
    const nodo = screen.getByTestId('texto');
    expect(nodo.tagName).toBe('ARTICLE');
    expect(nodo).toHaveClass('prose', 'prose--sm', 'prose--full');
  });

  it('sigue admitiendo `children` de React', () => {
    render(
      <Prose data-testid="texto">
        <p>Un párrafo de React</p>
      </Prose>,
    );
    expect(screen.getByTestId('texto').querySelector('p')).toHaveTextContent('Un párrafo de React');
  });
});
