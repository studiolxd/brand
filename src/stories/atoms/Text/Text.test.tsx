import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Text, LineBreak } from './Text';

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

  it('`error` (un estado) tiene su propia clase, distinta de `destructive` (una acción)', () => {
    render(<Text tone="error">no es válido</Text>);
    expect(screen.getByText('no es válido')).toHaveClass('text', 'text--error');
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

describe('LineBreak', () => {
  it('es un <br> con la clase del sistema', () => {
    const { container } = render(<LineBreak />);
    const salto = container.firstElementChild as HTMLElement;
    expect(salto.tagName).toBe('BR');
    expect(salto.className).toBe('text__break');
  });

  it('className se añade DESPUÉS de la clase propia', () => {
    const { container } = render(<LineBreak className="propia" />);
    expect(container.firstElementChild).toHaveClass('text__break', 'propia');
  });
});

const html = (el: React.ReactElement) => render(el).container.innerHTML;

describe('Text — HTML sin la prop nueva (idéntico al anterior)', () => {
  it('span, em, strong y tonos', () => {
    expect(html(<Text>hola</Text>)).toBe('<span class="text">hola</span>');
    expect(html(<Text as="em" tone="muted">x</Text>)).toBe('<em class="text text--muted">x</em>');
    expect(html(<Text as="strong" tone="destructive" lang="en" dir="ltr" className="extra">x</Text>))
      .toBe('<strong class="text text--destructive extra" lang="en" dir="ltr">x</strong>');
  });
});

describe('Text — tachado', () => {
  it('`strikethrough` añade la clase y no cambia el elemento', () => {
    expect(html(<Text strikethrough>leche</Text>)).toBe('<span class="text text--strikethrough">leche</span>');
  });

  it('`del` y `s` son el elemento y van tachados sin la prop', () => {
    expect(html(<Text as="del">49 €</Text>)).toBe('<del class="text text--strikethrough">49 €</del>');
    expect(html(<Text as="s">gratis</Text>)).toBe('<s class="text text--strikethrough">gratis</s>');
  });

  it('con un tono, la clase del tono va después para ganarle el color', () => {
    expect(html(<Text strikethrough tone="destructive">x</Text>))
      .toBe('<span class="text text--strikethrough text--destructive">x</span>');
  });
});
