import { describe, it, expect } from 'vitest';
import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { Sortable } from './Sortable';

describe('Sortable', () => {
  it('escribe el desplazamiento en las variables del CSSOM, sin atributo `style` en el HTML', () => {
    render(
      <Sortable
        data-testid="fila"
        transform={{ x: 12, y: -30, scaleX: 1, scaleY: 1 }}
        transition="transform 200ms ease"
      >
        contenido
      </Sortable>,
    );
    const nodo = screen.getByTestId('fila');
    expect(nodo.style.getPropertyValue('--sortable-x')).toBe('12px');
    expect(nodo.style.getPropertyValue('--sortable-y')).toBe('-30px');
    expect(nodo.style.getPropertyValue('--sortable-transition')).toBe('transform 200ms ease');
    // El transform vive en la hoja (`.sortable`), no en el marcado.
    expect(nodo.style.getPropertyValue('transform')).toBe('');
  });

  it('en reposo (sin transform) no declara ninguna variable', () => {
    render(<Sortable data-testid="fila">contenido</Sortable>);
    const nodo = screen.getByTestId('fila');
    expect(nodo.style.getPropertyValue('--sortable-x')).toBe('');
    expect(nodo).not.toHaveAttribute('data-dragging');
  });

  it('publica el arrastre como atributo, de donde cuelga el CSS', () => {
    render(<Sortable data-testid="fila" dragging>contenido</Sortable>);
    expect(screen.getByTestId('fila')).toHaveAttribute('data-dragging');
  });

  it('reenvía la `ref` al nodo — es lo que registra el motor de arrastre', () => {
    const ref = createRef<HTMLElement>();
    render(<Sortable ref={ref} data-testid="fila">contenido</Sortable>);
    expect(ref.current).toBe(screen.getByTestId('fila'));
  });

  it('con `as="li"` monta el elemento de lista y conserva la clase', () => {
    render(
      <ul>
        <Sortable as="li" data-testid="fila">contenido</Sortable>
      </ul>,
    );
    const nodo = screen.getByTestId('fila');
    expect(nodo.tagName).toBe('LI');
    expect(nodo).toHaveClass('sortable');
  });
});
