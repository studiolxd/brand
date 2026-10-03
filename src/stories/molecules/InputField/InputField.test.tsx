import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { render as renderRTL } from '@testing-library/react';
import { InputField } from './InputField';
import type { ReactNode } from 'react';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';

const Catalogo = ({ children }: { children: ReactNode }) => (
  <BrandMessagesProvider messages={ES}>{children}</BrandMessagesProvider>
);
const render = (ui: React.ReactElement) => renderRTL(ui, { wrapper: Catalogo });

const html = (el: React.ReactElement) => render(el).container.innerHTML;

describe('InputField — HTML sin cambios', () => {
  it('campo de texto con ayuda y error', () => {
    expect(html(<InputField id="a" label="Nombre" helperText="Ayuda" />)).toMatchInlineSnapshot(`"<div class="input-field"><label class="label" for="a">Nombre</label><input class="input" aria-describedby="a-helper" id="a"><span id="a-helper" class="input-field__helper">Ayuda</span></div>"`);
    expect(html(<InputField id="b" label="Nombre" errorMessage="Mal" type="email" />)).toMatchInlineSnapshot(`"<div class="input-field"><label class="label" for="b">Nombre</label><input class="input input--error" aria-invalid="true" aria-describedby="b-error" id="b" type="email"><p role="alert" class="error-text" id="b-error">Mal</p></div>"`);
  });

  it('búsqueda con aspa', () => {
    expect(html(<InputField id="c" label="Buscar" kind="search" clearable defaultValue="x" />)).toMatchInlineSnapshot(`"<div class="input-field"><label class="label" for="c">Buscar</label><div class="input-field__search input-field__search--clearable"><span class="input-field__search-icon" aria-hidden="true"><svg class="icon icon--md input-field__search-glyph" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle vector-effect="non-scaling-stroke" stroke-width="1" cx="11" cy="11" r="8"></circle><path vector-effect="non-scaling-stroke" stroke-width="1" stroke-linecap="round" d="M21 21 L16.65 16.65"></path></svg></span><input class="input" autocomplete="off" enterkeyhint="search" id="c" type="text" value="x"><button type="button" class="input-field__clear" aria-label="Borrar" aria-controls="c"><svg class="icon icon--md input-field__search-glyph" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path vector-effect="non-scaling-stroke" stroke-width="1" d="M5.64 5.64 L18.36 18.36 M18.36 5.64 L5.64 18.36"></path></svg></button></div></div>"`);
  });
});

describe('InputField — foco desde fuera', () => {
  it('el ref llega al <input> y permite darle el foco', () => {
    const ref = createRef<HTMLInputElement>();
    const { container } = render(<InputField id="d" label="Añadir" ref={ref} />);
    expect(ref.current).toBe(container.querySelector('input'));
    ref.current?.focus();
    expect(document.activeElement).toBe(ref.current);
  });

  it('en búsqueda el ref sigue siendo el <input>, no la caja', () => {
    const ref = createRef<HTMLInputElement>();
    render(<InputField id="e" label="Buscar" kind="search" ref={ref} />);
    expect(ref.current?.tagName).toBe('INPUT');
  });
});
