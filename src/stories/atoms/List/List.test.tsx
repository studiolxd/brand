import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { List, ListItem } from './List';

const html = (el: React.ReactElement) => render(el).container.innerHTML;

describe('List y ListItem — HTML sin las props nuevas (idéntico al anterior)', () => {
  it('unordered, ordered y plain', () => {
    expect(html(<List><ListItem>Uno</ListItem><li>Dos</li></List>))
      .toBe('<ul class="list list--unordered"><li class="list__item">Uno</li><li>Dos</li></ul>');
    expect(html(<List type="ordered"><ListItem>Uno</ListItem></List>))
      .toBe('<ol class="list list--ordered"><li class="list__item">Uno</li></ol>');
    expect(html(<List type="plain"><ListItem>Uno</ListItem></List>))
      .toBe('<ul class="list list--plain"><li class="list__item">Uno</li></ul>');
  });

  it('className y atributos sueltos', () => {
    expect(html(
      <List className="extra" id="l" aria-label="x" data-uso="p">
        <ListItem className="fila" data-k="1" id="i">Uno</ListItem>
      </List>,
    )).toBe(
      '<ul class="list list--unordered extra" id="l" aria-label="x" data-uso="p">'
      + '<li class="list__item fila" data-k="1" id="i">Uno</li></ul>',
    );
  });

  it('as cambia el elemento', () => {
    expect(html(<List type="plain"><ListItem as="div" role="listitem">Uno</ListItem></List>))
      .toBe('<ul class="list list--plain"><div class="list__item" role="listitem">Uno</div></ul>');
  });

  it('hijos con elementos anidados y listas anidadas', () => {
    expect(html(
      <List>
        <ListItem>
          A<List type="ordered"><ListItem><b>b</b></ListItem></List>
        </ListItem>
      </List>,
    )).toBe(
      '<ul class="list list--unordered"><li class="list__item">A'
      + '<ol class="list list--ordered"><li class="list__item"><b>b</b></li></ol></li></ul>',
    );
  });

  it('props nuevas explícitamente vacías no cambian nada', () => {
    expect(html(<List showSeparators={false}><ListItem secondary={null} trailing={undefined}>Uno</ListItem></List>))
      .toBe('<ul class="list list--unordered"><li class="list__item">Uno</li></ul>');
  });

  it('reenvía ref', () => {
    const l = createRef<HTMLUListElement & HTMLOListElement>();
    const i = createRef<HTMLLIElement>();
    render(<List ref={l}><ListItem ref={i}>Uno</ListItem></List>);
    expect(l.current?.tagName).toBe('UL');
    expect(i.current?.tagName).toBe('LI');
  });
});

describe('List y ListItem — opciones de fila', () => {
  it('showSeparators añade solo la clase list--separated, tras las propias y antes de className', () => {
    expect(html(<List type="plain" showSeparators className="extra"><ListItem>Uno</ListItem></List>))
      .toBe('<ul class="list list--plain list--separated extra"><li class="list__item">Uno</li></ul>');
  });

  it('secondary y trailing montan la estructura de fila', () => {
    expect(html(<ListItem secondary="Menor" trailing={<i>›</i>}>Principal</ListItem>))
      .toBe(
        '<li class="list__item"><div class="list__item-row"><div class="list__item-main">Principal'
        + '<div class="list__item-secondary">Menor</div></div>'
        + '<div class="list__item-trailing"><i>›</i></div></div></li>',
      );
  });

  it('solo secondary o solo trailing no pintan el hueco que falta', () => {
    expect(html(<ListItem secondary="Menor">P</ListItem>)).not.toContain('list__item-trailing');
    expect(html(<ListItem trailing="T">P</ListItem>)).not.toContain('list__item-secondary');
  });

  it('con as, ref y atributos sigue siendo polimórfico', () => {
    const r = createRef<HTMLDivElement>();
    const { container } = render(
      <ListItem as="div" role="listitem" ref={r} data-k="1" className="x" trailing="T">P</ListItem>,
    );
    expect(r.current).toBe(container.firstElementChild);
    expect(r.current?.tagName).toBe('DIV');
    expect(r.current?.getAttribute('role')).toBe('listitem');
    expect(r.current?.getAttribute('data-k')).toBe('1');
    expect(r.current?.className).toBe('list__item x');
  });
});
