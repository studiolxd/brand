import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
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
 * Los nombres de la v51 (D6.5): el nombre accesible se pasa con el atributo
 * nativo `aria-label`, y los enlaces internos se pintan con `renderLink`. Sus
 * alias obsoletos (`ariaLabel`, `linkComponent`) se retiraron en la v53.
 */
describe('aria-label', () => {
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
    it(`${nombre}: aria-label nombra el control`, () => {
      render(pinta({ 'aria-label': 'Nombre nuevo' }));
      expect(screen.getByRole(rol, { name: 'Nombre nuevo' })).toBeInTheDocument();
    });
  }

  it('FileUpload: una sola prop de nombre; el input nativo la toma', () => {
    const { container } = render(<FileUpload aria-label="Subir factura" />);
    expect(container.querySelector('input[type="file"]')).toHaveAttribute('aria-label', 'Subir factura');
  });
});

describe('renderLink', () => {
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
    });
  }
});
