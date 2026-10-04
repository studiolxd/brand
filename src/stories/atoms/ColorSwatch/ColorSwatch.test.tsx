import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { ColorSwatch } from './ColorSwatch';

describe('ColorSwatch', () => {
  it('con `label` es una imagen con nombre', () => {
    render(<ColorSwatch color="#baabff" label="Lavanda" />);
    expect(screen.getByRole('img', { name: 'Lavanda' })).toBeInTheDocument();
  });

  it('sin `label` es decorativa', () => {
    const { container } = render(<ColorSwatch color="#baabff" />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('pinta cualquier color CSS en el `fill`, tal cual', () => {
    const { container } = render(<ColorSwatch color="rgb(17 30 48 / 50%)" />);
    expect(container.querySelector('rect')).toHaveAttribute('fill', 'rgb(17 30 48 / 50%)');
  });

  it('sin color no pinta rectángulo: solo el damero', () => {
    const { container } = render(<ColorSwatch color={null} />);
    expect(container.querySelector('rect')).toBeNull();
    expect(container.querySelector('svg')).toHaveClass('color-swatch--empty');
  });

  it('el HTML del servidor no lleva ningún atributo `style`', () => {
    const html = renderToString(<ColorSwatch color="#ffcd00" size="lg" label="Amarillo" />);
    expect(html).toContain('fill="#ffcd00"');
    expect(html).not.toContain('style=');
    expect(html).toContain('color-swatch--lg');
  });
});
