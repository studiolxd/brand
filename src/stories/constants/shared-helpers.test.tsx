import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { assignRef } from './assign-ref';
import { cssLengthToPx, sideOffsetFromToken } from './side-offset';
import { defaultRenderLink } from './default-render-link';
import { Skeleton } from '../atoms/Skeleton/Skeleton';

afterEach(() => {
  cleanup();
  document.documentElement.style.removeProperty('--test-offset');
  document.documentElement.style.removeProperty('font-size');
});

describe('assignRef', () => {
  it('llama a una ref de función con el nodo', () => {
    const ref = vi.fn();
    const node = document.createElement('div');
    assignRef(ref, node);
    expect(ref).toHaveBeenCalledWith(node);
  });

  it('rellena una ref de objeto y la vacía con null', () => {
    const ref = createRef<HTMLDivElement>();
    const node = document.createElement('div');
    assignRef(ref, node);
    expect(ref.current).toBe(node);
    assignRef(ref, null);
    expect(ref.current).toBeNull();
  });

  it('sin ref no hace nada', () => {
    expect(() => assignRef(undefined, document.createElement('div'))).not.toThrow();
    expect(() => assignRef(null, document.createElement('div'))).not.toThrow();
  });
});

describe('cssLengthToPx', () => {
  it('px y números sueltos van tal cual', () => {
    expect(cssLengthToPx('4px')).toBe(4);
    expect(cssLengthToPx('6')).toBe(6);
  });

  it('rem y em se miden contra la fuente', () => {
    document.documentElement.style.setProperty('font-size', '20px');
    expect(cssLengthToPx('0.5rem')).toBe(10);
    expect(cssLengthToPx('0.25em')).toBe(5);
  });

  it('sin número devuelve 0', () => {
    expect(cssLengthToPx('')).toBe(0);
    expect(cssLengthToPx('auto')).toBe(0);
  });
});

describe('sideOffsetFromToken', () => {
  it('lee el token en cada llamada, no al crearse', () => {
    const offset = sideOffsetFromToken('--test-offset');
    expect(offset()).toBe(0);
    document.documentElement.style.setProperty('--test-offset', '12px');
    expect(offset()).toBe(12);
  });
});

describe('defaultRenderLink', () => {
  it('reenvía todas las props al <a>, también las que inyecta el motor', () => {
    render(
      defaultRenderLink({
        href: '/destino',
        className: 'clase',
        role: 'menuitem',
        tabIndex: -1,
        children: 'Ir',
      }),
    );
    const link = screen.getByRole('menuitem', { name: 'Ir' });
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/destino');
    expect(link).toHaveAttribute('tabindex', '-1');
    expect(link).toHaveClass('clase');
  });
});

describe('Skeleton — ref', () => {
  it('reenvía la ref al <svg>', () => {
    const ref = createRef<SVGSVGElement>();
    render(<Skeleton ref={ref} />);
    expect(ref.current?.tagName.toLowerCase()).toBe('svg');
    expect(ref.current).toHaveClass('skeleton');
  });
});
