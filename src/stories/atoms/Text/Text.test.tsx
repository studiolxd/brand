import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Text } from './Text';

describe('Text', () => {
  it('por defecto es un span sin más significado', () => {
    const { container } = render(<Text>hola</Text>);
    const nodo = container.firstElementChild as HTMLElement;
    expect(nodo.tagName).toBe('SPAN');
    expect(nodo).toHaveClass('text');
  });

  it('`as` elige el significado: énfasis o importancia', () => {
    const { container: conEm } = render(<Text as="em">deprisa</Text>);
    expect(conEm.firstElementChild?.tagName).toBe('EM');

    const { container: conStrong } = render(<Text as="strong">importante</Text>);
    expect(conStrong.firstElementChild?.tagName).toBe('STRONG');
  });

  it('marca el idioma del fragmento', () => {
    render(<Text lang="en">learning by doing</Text>);
    expect(screen.getByText('learning by doing')).toHaveAttribute('lang', 'en');
  });

  it('acepta dirección para un idioma RTL dentro de texto LTR', () => {
    render(<Text lang="ar" dir="rtl">مرحبا</Text>);
    const nodo = screen.getByText('مرحبا');
    expect(nodo).toHaveAttribute('lang', 'ar');
    expect(nodo).toHaveAttribute('dir', 'rtl');
  });

  it('la intención llega a la clase de tono', () => {
    render(<Text tone="destructive" as="strong">borra</Text>);
    expect(screen.getByText('borra')).toHaveClass('text', 'text--destructive');
  });

  it('el tono por defecto no añade clase', () => {
    render(<Text>normal</Text>);
    expect(screen.getByText('normal').className).toBe('text');
  });

  it('className se añade a las clases propias', () => {
    render(<Text className="propia" tone="muted">nota</Text>);
    expect(screen.getByText('nota')).toHaveClass('text', 'text--muted', 'propia');
  });

  it('reenvía atributos al elemento', () => {
    render(<Text id="cita" data-testid="fragmento">texto</Text>);
    expect(screen.getByTestId('fragmento')).toHaveAttribute('id', 'cita');
  });
});
