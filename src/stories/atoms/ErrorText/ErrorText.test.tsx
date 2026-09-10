import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorText } from './ErrorText';

describe('ErrorText', () => {
  it('por defecto es un párrafo que se anuncia solo', () => {
    const { container } = render(<ErrorText>No se pudo calcular el importe.</ErrorText>);
    const nodo = container.firstElementChild as HTMLElement;
    expect(nodo.tagName).toBe('P');
    expect(nodo).toHaveAttribute('role', 'alert');
    expect(nodo).toHaveClass('error-text');
  });

  it('`as` elige el elemento sin tocar el rol ni la clase', () => {
    for (const [as, etiqueta] of [['div', 'DIV'], ['span', 'SPAN']] as const) {
      const { container } = render(<ErrorText as={as}>fallo</ErrorText>);
      const nodo = container.firstElementChild as HTMLElement;
      expect(nodo.tagName).toBe(etiqueta);
      expect(nodo).toHaveAttribute('role', 'alert');
      expect(nodo).toHaveClass('error-text');
    }
  });

  it('el id queda para apuntarlo desde el control con aria-describedby', () => {
    render(
      <>
        <input aria-describedby="importe-error" />
        <ErrorText id="importe-error">Importe no disponible.</ErrorText>
      </>,
    );
    expect(screen.getByRole('alert')).toHaveAttribute('id', 'importe-error');
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Importe no disponible.');
  });

  it('className se añade DESPUÉS de la clase propia', () => {
    render(<ErrorText className="propia">fallo</ErrorText>);
    expect(screen.getByRole('alert').className).toBe('error-text propia');
  });

  it('reenvía atributos al elemento', () => {
    render(<ErrorText data-testid="error" lang="en">Something went wrong</ErrorText>);
    expect(screen.getByTestId('error')).toHaveAttribute('lang', 'en');
  });
});
