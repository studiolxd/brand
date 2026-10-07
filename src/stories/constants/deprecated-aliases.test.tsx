import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest';
import { render, screen } from '@testing-library/react';
import { resetWarnings } from './env';
import { Input } from '../atoms/Input/Input';
import { NumberInput } from '../atoms/NumberInput/NumberInput';
import { FileUpload } from '../atoms/FileUpload/FileUpload';
import { Sparkline } from '../atoms/Sparkline/Sparkline';
import { Pagination } from '../molecules/Pagination/Pagination';
import { Breadcrumb } from '../molecules/Breadcrumb/Breadcrumb';
import { FilterBar } from '../molecules/FilterBar/FilterBar';
import { TableOfContents } from '../molecules/TableOfContents/TableOfContents';
import { PrevNextNav } from '../molecules/PrevNextNav/PrevNextNav';
import { CalendarRoster } from '../molecules/CalendarRoster/CalendarRoster';

/**
 * Los alias obsoletos de la v51. Cada uno
 * sigue funcionando y avisa una vez en desarrollo. Este fichero entero se
 * borra en la v52, cuando se retiran.
 */
describe('alias obsoleto ariaLabel → aria-label (v51)', () => {
  let warn: MockInstance;
  beforeEach(() => {
    resetWarnings();
    warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => warn.mockRestore());

  const avisa = (componente: string) =>
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining(`\`<${componente} ariaLabel>\` está obsoleta; usa \`aria-label\``),
    );

  // Sin proveedor, el catálogo avisa de las claves que faltan: lo que se mira
  // aquí es solo el aviso de obsolescencia.
  const noAvisa = () =>
    expect(warn).not.toHaveBeenCalledWith(expect.stringContaining('obsoleta'));

  const casos: Array<[string, (props: Record<string, string>) => React.ReactElement, string]> = [
    ['Input', (p) => <Input {...p} />, 'textbox'],
    ['NumberInput', (p) => <NumberInput {...p} />, 'textbox'],
    ['Pagination', (p) => <Pagination total={30} page={1} pageSize={10} {...p} />, 'navigation'],
    ['Breadcrumb', (p) => <Breadcrumb items={[{ label: 'Inicio' }]} {...p} />, 'navigation'],
    ['FilterBar', (p) => <FilterBar {...p} />, 'search'],
    ['TableOfContents', (p) => <TableOfContents items={[{ id: 'a', label: 'A', level: 2 }]} {...p} />, 'navigation'],
    ['Sparkline', (p) => <Sparkline values={[1, 2, 3]} {...p} />, 'img'],
  ];

  for (const [nombre, pinta, rol] of casos) {
    it(`${nombre}: aria-label nombra el control sin avisar`, () => {
      render(pinta({ 'aria-label': 'Nombre nuevo' }));
      expect(screen.getByRole(rol, { name: 'Nombre nuevo' })).toBeInTheDocument();
      noAvisa();
    });

    it(`${nombre}: el alias ariaLabel sigue nombrando y avisa`, () => {
      render(pinta({ ariaLabel: 'Nombre viejo' }));
      expect(screen.getByRole(rol, { name: 'Nombre viejo' })).toBeInTheDocument();
      avisa(nombre);
    });
  }

  it('FileUpload: una sola prop de nombre; el input nativo la toma', () => {
    const { container } = render(<FileUpload aria-label="Subir factura" />);
    expect(container.querySelector('input[type="file"]')).toHaveAttribute('aria-label', 'Subir factura');
    noAvisa();
  });

  it('FileUpload: el alias ariaLabel sigue nombrando y avisa; si llegan las dos, gana aria-label', () => {
    const { container, rerender } = render(<FileUpload ariaLabel="Viejo" />);
    const input = container.querySelector('input[type="file"]');
    expect(input).toHaveAttribute('aria-label', 'Viejo');
    avisa('FileUpload');
    rerender(<FileUpload ariaLabel="Viejo" aria-label="Nuevo" />);
    expect(input).toHaveAttribute('aria-label', 'Nuevo');
  });
});

/** D6.5: `linkComponent` → `renderLink` en Pagination, PrevNextNav y CalendarRoster. */
describe('alias obsoleto linkComponent → renderLink (v51)', () => {
  let warn: MockInstance;
  beforeEach(() => {
    resetWarnings();
    warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => warn.mockRestore());

  function RouterLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return <a data-router="" {...props} />;
  }

  const casos: Array<[string, (props: Record<string, unknown>) => React.ReactElement]> = [
    ['Pagination', (p) => <Pagination total={30} page={1} pageSize={10} hrefBuilder={(n) => `?p=${n}`} {...p} />],
    ['PrevNextNav', (p) => <PrevNextNav prevHref="/a" nextHref="/b" {...p} />],
    [
      'CalendarRoster',
      (p) => (
        <CalendarRoster month={new Date(2026, 0, 1)} rows={[]} hrefBuilder={(m) => `?m=${m.getMonth()}`} {...p} />
      ),
    ],
  ];

  for (const [nombre, pinta] of casos) {
    it(`${nombre}: renderLink pinta los enlaces con todas sus props`, () => {
      const { container } = render(
        pinta({ renderLink: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <RouterLink {...props} /> }),
      );
      const enlaces = container.querySelectorAll('a[href]');
      expect(enlaces.length).toBeGreaterThan(0);
      for (const a of enlaces) {
        expect(a).toHaveAttribute('data-router');
        expect(a.getAttribute('class')).toBeTruthy();
      }
      expect(warn).not.toHaveBeenCalledWith(expect.stringContaining('obsoleta'));
    });

    it(`${nombre}: el alias linkComponent sigue funcionando y avisa`, () => {
      const { container } = render(pinta({ linkComponent: RouterLink }));
      const enlaces = container.querySelectorAll('a[href]');
      expect(enlaces.length).toBeGreaterThan(0);
      for (const a of enlaces) expect(a).toHaveAttribute('data-router');
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining(`\`<${nombre} linkComponent>\` está obsoleta; usa \`renderLink\``),
      );
    });
  }
});
