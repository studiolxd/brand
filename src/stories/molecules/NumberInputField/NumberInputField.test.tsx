import { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render as renderRTL, screen } from '@testing-library/react';
import { NumberInputField } from './NumberInputField';
import type { ReactNode } from 'react';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';

const Catalogo = ({ children }: { children: ReactNode }) => (
  <BrandMessagesProvider messages={ES}>{children}</BrandMessagesProvider>
);
const render = (ui: React.ReactElement) => renderRTL(ui, { wrapper: Catalogo });

const html = (el: React.ReactElement) => render(el).container.innerHTML;

describe('NumberInputField — HTML sin cambios', () => {
  it('con valor, con ayuda y con error', () => {
    expect(html(<NumberInputField id="n" label="Cantidad" value={3} min={0} max={9} />)).toMatchInlineSnapshot(`"<div class="number-input-field"><label class="label" for="n">Cantidad</label><div class="number-input"><button class="number-input__btn number-input__btn--decrement" type="button" aria-label="Decrementar" tabindex="-1"><svg class="icon icon--sm" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path vector-effect="non-scaling-stroke" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" d="M4 12l16 0"></path></svg></button><input class="number-input__field" inputmode="numeric" pattern="[0-9]*" id="n" type="text" value="3"><button class="number-input__btn number-input__btn--increment" type="button" aria-label="Incrementar" tabindex="-1"><svg class="icon icon--sm" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path vector-effect="non-scaling-stroke" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" d="M12 4l0 16"></path><path vector-effect="non-scaling-stroke" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" d="M4 12l16 0"></path></svg></button></div></div>"`);
    expect(html(<NumberInputField id="m" label="Cantidad" defaultValue={2} helperText="Ayuda" errorMessage="Mal" size="sm" />)).toMatchInlineSnapshot(`"<div class="number-input-field"><label class="label label--sm" for="m">Cantidad</label><div class="number-input number-input--sm number-input--error"><button class="number-input__btn number-input__btn--decrement" type="button" aria-label="Decrementar" tabindex="-1"><svg class="icon icon--sm" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path vector-effect="non-scaling-stroke" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" d="M4 12l16 0"></path></svg></button><input class="number-input__field" inputmode="numeric" pattern="[0-9]*" aria-invalid="true" aria-describedby="m-error m-helper" id="m" type="text" value="2"><button class="number-input__btn number-input__btn--increment" type="button" aria-label="Incrementar" tabindex="-1"><svg class="icon icon--sm" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path vector-effect="non-scaling-stroke" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" d="M12 4l0 16"></path><path vector-effect="non-scaling-stroke" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" d="M4 12l16 0"></path></svg></button></div><p role="alert" class="error-text" id="m-error">Mal</p><span id="m-helper" class="number-input-field__helper">Ayuda</span></div>"`);
  });

  it('sin valor ni defaultValue arranca en 0, como siempre', () => {
    expect(html(<NumberInputField id="z" label="Cantidad" />)).toContain('value="0"');
  });
});

describe('NumberInputField — foco desde fuera', () => {
  it('el ref llega al <input> y permite darle el foco', () => {
    const ref = createRef<HTMLInputElement>();
    const { container } = render(<NumberInputField id="f" label="Cantidad" ref={ref} />);
    expect(ref.current).toBe(container.querySelector('input'));
    ref.current?.focus();
    expect(document.activeElement).toBe(ref.current);
  });
});

describe('NumberInputField — sin valor (null)', () => {
  it('value={null} se muestra vacío', () => {
    const { container } = render(<NumberInputField id="v" label="Cantidad" value={null} />);
    expect(container.querySelector('input')?.value).toBe('');
  });

  it('defaultValue={null} arranca vacío', () => {
    const { container } = render(<NumberInputField id="w" label="Cantidad" defaultValue={null} />);
    expect(container.querySelector('input')?.value).toBe('');
  });

  it('desde vacío, + cuenta desde 0 y respeta min/max; − también', () => {
    const onChange = vi.fn();
    render(<NumberInputField id="x" label="Cantidad" value={null} min={1} max={9} step={2} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Incrementar'));
    expect(onChange).toHaveBeenLastCalledWith(2);
    fireEvent.click(screen.getByLabelText('Decrementar'));
    expect(onChange).toHaveBeenLastCalledWith(1);
  });

  it('con onEmpty, vaciar el texto avisa; sin ella no emite nada', () => {
    const onEmpty = vi.fn();
    const onChange = vi.fn();
    const { container, rerender } = render(<NumberInputField id="y" label="Cantidad" defaultValue={4} onEmpty={onEmpty} onChange={onChange} />);
    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '' } });
    expect(onEmpty).toHaveBeenCalledTimes(1);
    expect(onChange).not.toHaveBeenCalled();
    expect(input.value).toBe('');
    fireEvent.blur(input);
    expect(input.value).toBe('');

    onEmpty.mockClear();
    rerender(<NumberInputField id="y" label="Cantidad" defaultValue={4} onChange={onChange} />);
    fireEvent.change(input, { target: { value: '' } });
    expect(onEmpty).not.toHaveBeenCalled();
  });
});

describe('NumberInputField — props nuevas', () => {
  it('commitMode="blur" y compact llegan al control', () => {
    const onChange = vi.fn();
    const { container } = render(<NumberInputField id="c" label="Cantidad" defaultValue={1} compact commitMode="blur" onChange={onChange} />);
    expect(container.querySelector('.number-input--compact')).not.toBeNull();
    const input = container.querySelector('input')!;
    fireEvent.change(input, { target: { value: '5' } });
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.blur(input);
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('decrementLabel e incrementLabel (declaradas en el tipo) nombran los botones', () => {
    render(<NumberInputField id="l" label="Cantidad" decrementLabel="Menos" incrementLabel="Más" />);
    expect(screen.getByRole('button', { name: 'Menos' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Más' })).toBeTruthy();
  });
});
