import { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { EmbedFrame } from './EmbedFrame';

describe('EmbedFrame', () => {
  it('pinta un iframe con el título como nombre accesible', () => {
    render(<EmbedFrame title="Reproductor del curso" src="about:blank" />);
    const frame = screen.getByTitle('Reproductor del curso');
    expect(frame.tagName).toBe('IFRAME');
    expect(frame).toHaveAttribute('src', 'about:blank');
  });

  it('la ref apunta al iframe y da acceso a contentWindow', () => {
    const ref = createRef<HTMLIFrameElement>();
    render(<EmbedFrame ref={ref} title="Reproductor del curso" />);
    expect(ref.current).toBeInstanceOf(HTMLIFrameElement);
    expect(ref.current?.contentWindow).not.toBeNull();
  });

  it('reenvía los atributos nativos del iframe', () => {
    render(
      <EmbedFrame
        title="Reproductor del curso"
        allow="fullscreen"
        sandbox="allow-scripts allow-same-origin"
        loading="lazy"
        referrerPolicy="no-referrer"
        name="player"
      />,
    );
    const frame = screen.getByTitle('Reproductor del curso');
    expect(frame).toHaveAttribute('allow', 'fullscreen');
    expect(frame).toHaveAttribute('sandbox', 'allow-scripts allow-same-origin');
    expect(frame).toHaveAttribute('loading', 'lazy');
    expect(frame).toHaveAttribute('referrerpolicy', 'no-referrer');
    expect(frame).toHaveAttribute('name', 'player');
  });

  it('avisa de la carga con onLoad', () => {
    const onLoad = vi.fn();
    render(<EmbedFrame title="Reproductor del curso" onLoad={onLoad} />);
    fireEvent.load(screen.getByTitle('Reproductor del curso'));
    expect(onLoad).toHaveBeenCalledTimes(1);
  });

  it('no emite atributo style', () => {
    render(<EmbedFrame title="Reproductor del curso" />);
    expect(screen.getByTitle('Reproductor del curso')).not.toHaveAttribute('style');
  });

  it('className se añade a las clases propias', () => {
    render(<EmbedFrame title="Reproductor del curso" className="extra" />);
    expect(screen.getByTitle('Reproductor del curso')).toHaveClass('embed-frame', 'extra');
  });
});
