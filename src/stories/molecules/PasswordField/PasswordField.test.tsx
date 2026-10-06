import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { render as renderRTL } from '@testing-library/react';
import { PasswordField } from './PasswordField';
import type { ReactNode } from 'react';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';

const Catalogo = ({ children }: { children: ReactNode }) => (
  <BrandMessagesProvider messages={ES}>{children}</BrandMessagesProvider>
);
const render = (ui: React.ReactElement) => renderRTL(ui, { wrapper: Catalogo });

const html = (el: React.ReactElement) => render(el).container.innerHTML;

describe('PasswordField — HTML sin cambios', () => {
  it('solo campo y botón', () => {
    expect(html(<PasswordField id="p" />)).toMatchInlineSnapshot(`"<div class="password-field"><div class="password-field__wrapper"><input class="input" id="p" type="password"><button type="button" class="password-field__toggle" aria-controls="p" aria-pressed="false"><span class="visually-hidden">Mostrar contraseña</span><svg class="icon icon--md password-field__icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path vector-effect="non-scaling-stroke" stroke-width="1" d="M3 12 C7.5 5.7 16.5 5.7 21 12 C16.5 18.3 7.5 18.3 3 12 Z"></path><circle vector-effect="non-scaling-stroke" stroke-width="1" cx="12" cy="12" r="3.15"></circle></svg></button></div></div>"`);
  });

  it('con etiqueta, ayuda y error', () => {
    expect(html(<PasswordField id="q" label="Contraseña" labelHidden={false} helperText="Ayuda" />)).toMatchInlineSnapshot(`"<div class="password-field"><label class="label" for="q">Contraseña</label><div class="password-field__wrapper"><input class="input" aria-describedby="q-helper" id="q" type="password"><button type="button" class="password-field__toggle" aria-controls="q" aria-pressed="false"><span class="visually-hidden">Mostrar contraseña</span><svg class="icon icon--md password-field__icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path vector-effect="non-scaling-stroke" stroke-width="1" d="M3 12 C7.5 5.7 16.5 5.7 21 12 C16.5 18.3 7.5 18.3 3 12 Z"></path><circle vector-effect="non-scaling-stroke" stroke-width="1" cx="12" cy="12" r="3.15"></circle></svg></button></div><span id="q-helper" class="password-field__helper">Ayuda</span></div>"`);
    expect(html(<PasswordField id="r" label="Contraseña" labelHidden errorMessage="Mal" size="lg" />)).toMatchInlineSnapshot(`"<div class="password-field"><label class="label visually-hidden label--lg" for="r">Contraseña</label><div class="password-field__wrapper password-field__wrapper--lg"><input class="input input--lg input--error" aria-invalid="true" aria-describedby="r-error" id="r" placeholder="Contraseña" type="password"><button type="button" class="password-field__toggle" aria-controls="r" aria-pressed="false"><span class="visually-hidden">Mostrar contraseña</span><svg class="icon icon--md password-field__icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path vector-effect="non-scaling-stroke" stroke-width="1" d="M3 12 C7.5 5.7 16.5 5.7 21 12 C16.5 18.3 7.5 18.3 3 12 Z"></path><circle vector-effect="non-scaling-stroke" stroke-width="1" cx="12" cy="12" r="3.15"></circle></svg></button></div><p role="alert" class="error-text" id="r-error">Mal</p></div>"`);
  });
});

describe('PasswordField — etiqueta', () => {
  it('se ve por defecto, como en InputField, y sin placeholder derivado', () => {
    const { container } = render(<PasswordField id="v" label="Contraseña" />);
    expect(container.querySelector('label')).not.toHaveClass('visually-hidden');
    expect(container.querySelector('input')).not.toHaveAttribute('placeholder');
  });

  it('con labelHidden se oculta a la vista y la etiqueta hace de placeholder', () => {
    const { container } = render(<PasswordField id="w" label="Contraseña" labelHidden />);
    expect(container.querySelector('label')).toHaveClass('visually-hidden');
    expect(container.querySelector('input')).toHaveAttribute('placeholder', 'Contraseña');
  });
});

describe('PasswordField — foco desde fuera', () => {
  it('el ref llega al <input> y permite darle el foco', () => {
    const ref = createRef<HTMLInputElement>();
    const { container } = render(<PasswordField id="s" label="Contraseña" ref={ref} />);
    expect(ref.current).toBe(container.querySelector('input'));
    ref.current?.focus();
    expect(document.activeElement).toBe(ref.current);
  });
});
