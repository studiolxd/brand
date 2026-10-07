import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, renderHook, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { BrandMessagesProvider } from './BrandMessagesProvider';
import { resetMissingMessageWarnings, useBrandMessages } from './BrandMessagesContext';
import type { BrandMessages } from './BrandMessages';
import { brandMessagesEs } from './brandMessagesEs';
import { paginationEs } from './es/pagination';
import { datePickerEs } from './es/datePicker';
import { Pagination } from '../molecules/Pagination/Pagination';

/**
 * El respaldo castellano (D5): **prop → catálogo → castellano**, con un aviso
 * en desarrollo por cada clave que cae al castellano.
 */

let aviso: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  resetMissingMessageWarnings();
  aviso = vi.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

const avisos = () => aviso.mock.calls.map((llamada) => String(llamada[0]));

function con(messages: BrandMessages) {
  return ({ children }: { children: ReactNode }) => (
    <BrandMessagesProvider messages={messages}>{children}</BrandMessagesProvider>
  );
}

describe('useBrandMessages — el castellano de respaldo', () => {
  it('sin proveedor, el componente pinta el castellano en vez de lanzar', () => {
    render(<Pagination total={100} page={3} pageSize={10} />);

    expect(screen.getByRole('navigation', { name: 'Paginación' })).toBeInTheDocument();
    expect(screen.getByLabelText('Página anterior')).toBeInTheDocument();
    expect(avisos()).toContain('@studiolxd/brand: falta «pagination.label» en el catálogo; sale en castellano.');
  });

  it('avisa una sola vez por clave, por muchas veces que se pinte', () => {
    const { result } = renderHook(() => useBrandMessages('pagination', paginationEs));
    result.current('label');
    result.current('label');
    result.current('next');

    expect(avisos()).toEqual([
      '@studiolxd/brand: falta «pagination.label» en el catálogo; sale en castellano.',
      '@studiolxd/brand: falta «pagination.next» en el catálogo; sale en castellano.',
    ]);
  });

  it('con un catálogo a medias, lo que trae gana y solo lo que falta sale en castellano', () => {
    const { result } = renderHook(() => useBrandMessages('pagination', paginationEs), {
      wrapper: con({ pagination: { label: 'Pagination' } }),
    });

    expect(result.current('label')).toBe('Pagination');
    expect(result.current('next')).toBe('Página siguiente');
    expect(avisos()).toEqual([
      '@studiolxd/brand: falta «pagination.next» en el catálogo; sale en castellano.',
    ]);
  });

  it('la prop gana a todo y no avisa', () => {
    const { result } = renderHook(() => useBrandMessages('pagination', paginationEs));

    expect(result.current('label', 'Results')).toBe('Results');
    expect(avisos()).toEqual([]);
  });

  it('un texto compuesto a medias se completa clave a clave', () => {
    const { result } = renderHook(() => useBrandMessages('datePicker', datePickerEs), {
      wrapper: con({ datePicker: { maskLetters: { day: 'jj' } } }),
    });

    expect(result.current('maskLetters')).toEqual({ day: 'jj', month: 'mm', year: 'aaaa' });
    expect(avisos()).toEqual([
      '@studiolxd/brand: falta «datePicker.maskLetters.month» en el catálogo; sale en castellano.',
      '@studiolxd/brand: falta «datePicker.maskLetters.year» en el catálogo; sale en castellano.',
    ]);
  });

  it('en producción sale el castellano igual, pero sin aviso', () => {
    vi.stubEnv('NODE_ENV', 'production');
    const { result } = renderHook(() => useBrandMessages('pagination', paginationEs));

    expect(result.current('label')).toBe('Paginación');
    expect(avisos()).toEqual([]);
  });

  it('el catálogo entero no avisa de nada', () => {
    const { result } = renderHook(() => useBrandMessages('pagination', paginationEs), {
      wrapper: con(brandMessagesEs),
    });

    for (const clave of Object.keys(paginationEs) as (keyof typeof paginationEs)[]) result.current(clave);
    expect(avisos()).toEqual([]);
  });

  it('un lector sin respaldo (fuera de la librería) sigue lanzando si falta el texto', () => {
    const { result } = renderHook(() => useBrandMessages('pagination'));

    expect(() => result.current('label')).toThrow(/pagination\.label/);
  });
});

describe('BrandMessagesProvider fallback="es" — el castellano intencionado (D71)', () => {
  function silenciado(messages?: BrandMessages) {
    return ({ children }: { children: ReactNode }) => (
      <BrandMessagesProvider fallback="es" messages={messages}>
        {children}
      </BrandMessagesProvider>
    );
  }

  it('sin catálogo, pinta el castellano sin avisar', () => {
    const Envoltorio = silenciado();
    render(
      <Envoltorio>
        <Pagination total={100} page={3} pageSize={10} />
      </Envoltorio>,
    );

    expect(screen.getByRole('navigation', { name: 'Paginación' })).toBeInTheDocument();
    expect(screen.getByLabelText('Página anterior')).toBeInTheDocument();
    expect(avisos()).toEqual([]);
  });

  it('con un catálogo a medias, lo que trae gana y lo que falta sale en castellano sin aviso', () => {
    const { result } = renderHook(() => useBrandMessages('pagination', paginationEs), {
      wrapper: silenciado({ pagination: { label: 'Resultados' } }),
    });

    expect(result.current('label')).toBe('Resultados');
    expect(result.current('next')).toBe('Página siguiente');
    expect(avisos()).toEqual([]);
  });

  it('tampoco avisa de los huecos de un texto compuesto', () => {
    const { result } = renderHook(() => useBrandMessages('datePicker', datePickerEs), {
      wrapper: silenciado({ datePicker: { maskLetters: { day: 'dd' } } }),
    });

    expect(result.current('maskLetters')).toEqual({ day: 'dd', month: 'mm', year: 'aaaa' });
    expect(avisos()).toEqual([]);
  });

  it('sin la prop, el mismo catálogo a medias sigue avisando', () => {
    const { result } = renderHook(() => useBrandMessages('pagination', paginationEs), {
      wrapper: con({ pagination: { label: 'Resultados' } }),
    });

    result.current('next');
    expect(avisos()).toEqual([
      '@studiolxd/brand: falta «pagination.next» en el catálogo; sale en castellano.',
    ]);
  });

  it('silenciar no gasta el aviso: un lector fuera de ese proveedor sigue avisando', () => {
    const dentro = renderHook(() => useBrandMessages('pagination', paginationEs), {
      wrapper: silenciado(),
    });
    dentro.result.current('label');
    expect(avisos()).toEqual([]);

    const fuera = renderHook(() => useBrandMessages('pagination', paginationEs));
    fuera.result.current('label');
    expect(avisos()).toEqual([
      '@studiolxd/brand: falta «pagination.label» en el catálogo; sale en castellano.',
    ]);
  });
});
