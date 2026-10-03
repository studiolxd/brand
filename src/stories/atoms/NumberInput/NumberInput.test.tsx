import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render as renderRTL, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { NumberInput } from './NumberInput';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';

const Catalogo = ({ children }: { children: ReactNode }) => (
  <BrandMessagesProvider messages={ES}>{children}</BrandMessagesProvider>
);
const render = (ui: React.ReactElement) => renderRTL(ui, { wrapper: Catalogo });

const campo = () => screen.getByRole('textbox') as HTMLInputElement;

describe('NumberInput — HTML sin cambios', () => {
  it('sin las props nuevas, el HTML es el de siempre', () => {
    const base = render(<NumberInput id="n" value={3} aria-label="Cantidad" />).container.innerHTML;
    const explicito = render(
      <NumberInput id="n" value={3} aria-label="Cantidad" commitMode="change" compact={false} />,
    ).container.innerHTML;
    expect(explicito).toBe(base);
    expect(base).toContain('class="number-input"');
    expect(base).not.toContain('compact');
  });
});

describe('NumberInput — commitMode="change" (por defecto)', () => {
  it('avisa con cada tecla', () => {
    const onChange = vi.fn();
    render(<NumberInput defaultValue={1} aria-label="n" onChange={onChange} />);
    fireEvent.change(campo(), { target: { value: '12' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(12);
  });
});

describe('NumberInput — commitMode="blur"', () => {
  it('lo escrito a mano no avisa hasta salir del campo, y entonces una sola vez', () => {
    const onChange = vi.fn();
    render(<NumberInput defaultValue={1} commitMode="blur" aria-label="n" onChange={onChange} />);
    campo().focus();
    fireEvent.change(campo(), { target: { value: '1' } });
    fireEvent.change(campo(), { target: { value: '12' } });
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.blur(campo());
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(12);
    expect(campo().value).toBe('12');
  });

  it('Enter confirma y el blur posterior no vuelve a avisar', () => {
    const onChange = vi.fn();
    render(<NumberInput defaultValue={1} commitMode="blur" aria-label="n" onChange={onChange} />);
    fireEvent.change(campo(), { target: { value: '7' } });
    fireEvent.keyDown(campo(), { key: 'Enter' });
    fireEvent.blur(campo());
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(7);
  });

  it('Escape descarta lo escrito y vuelve al último valor', () => {
    const onChange = vi.fn();
    render(<NumberInput defaultValue={4} commitMode="blur" aria-label="n" onChange={onChange} />);
    fireEvent.change(campo(), { target: { value: '99' } });
    fireEvent.keyDown(campo(), { key: 'Escape' });
    expect(campo().value).toBe('4');
    fireEvent.blur(campo());
    expect(onChange).not.toHaveBeenCalled();
  });

  it('no avisa si lo confirmado es el valor que ya había', () => {
    const onChange = vi.fn();
    render(<NumberInput value={4} commitMode="blur" aria-label="n" onChange={onChange} />);
    fireEvent.change(campo(), { target: { value: '4' } });
    fireEvent.blur(campo());
    expect(onChange).not.toHaveBeenCalled();
  });

  it('ajusta a min/max al confirmar', () => {
    const onChange = vi.fn();
    render(<NumberInput defaultValue={1} min={0} max={9} commitMode="blur" aria-label="n" onChange={onChange} />);
    fireEvent.change(campo(), { target: { value: '50' } });
    fireEvent.blur(campo());
    expect(onChange).toHaveBeenCalledWith(9);
  });

  it('los botones − y + avisan al momento', () => {
    const onChange = vi.fn();
    render(<NumberInput defaultValue={3} commitMode="blur" aria-label="n" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Incrementar' }));
    expect(onChange).toHaveBeenLastCalledWith(4);
    fireEvent.click(screen.getByRole('button', { name: 'Decrementar' }));
    expect(onChange).toHaveBeenLastCalledWith(3);
  });

  it('con onEmpty, vaciar y salir avisa de «sin valor» una sola vez', () => {
    const onChange = vi.fn();
    const onEmpty = vi.fn();
    render(<NumberInput defaultValue={3} commitMode="blur" aria-label="n" onChange={onChange} onEmpty={onEmpty} />);
    fireEvent.change(campo(), { target: { value: '' } });
    expect(onEmpty).not.toHaveBeenCalled();
    fireEvent.blur(campo());
    expect(onEmpty).toHaveBeenCalledTimes(1);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('sin onEmpty, vaciar y salir recupera el último número sin avisar', () => {
    const onChange = vi.fn();
    render(<NumberInput defaultValue={3} commitMode="blur" aria-label="n" onChange={onChange} />);
    fireEvent.change(campo(), { target: { value: '' } });
    fireEvent.blur(campo());
    expect(campo().value).toBe('3');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('respeta el onKeyDown del consumidor', () => {
    const onKeyDown = vi.fn();
    render(<NumberInput defaultValue={1} commitMode="blur" aria-label="n" onKeyDown={onKeyDown} />);
    fireEvent.keyDown(campo(), { key: 'a' });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });
});

describe('NumberInput — compact', () => {
  it('añade la clase --compact y sustituye la de talla', () => {
    const { container } = render(<NumberInput compact size="lg" aria-label="n" />);
    const raiz = container.firstElementChild!;
    expect(raiz.className).toContain('number-input--compact');
    expect(raiz.className).not.toContain('number-input--lg');
  });
});
