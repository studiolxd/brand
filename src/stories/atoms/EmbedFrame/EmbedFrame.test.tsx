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

  it('por defecto llena el contenedor: sin clase de ventana', () => {
    render(<EmbedFrame title="Reproductor del curso" />);
    expect(screen.getByTitle('Reproductor del curso').className).toBe('embed-frame');
  });

  it('fill="viewport" lleva la clase embed-frame--viewport', () => {
    render(<EmbedFrame title="Reproductor del curso" fill="viewport" />);
    expect(screen.getByTitle('Reproductor del curso')).toHaveClass('embed-frame', 'embed-frame--viewport');
  });

  it('className se añade a las clases propias', () => {
    render(<EmbedFrame title="Reproductor del curso" className="extra" />);
    expect(screen.getByTitle('Reproductor del curso')).toHaveClass('embed-frame', 'extra');
  });

  it.each(['mobile', 'tablet'] as const)('device="%s" lleva la clase embed-frame--%s', (device) => {
    render(<EmbedFrame title="Reproductor del curso" device={device} />);
    const frame = screen.getByTitle('Reproductor del curso');
    expect(frame).toHaveClass('embed-frame', `embed-frame--${device}`);
    expect(frame).not.toHaveAttribute('style');
  });

  it('device="desktop" es el de por defecto: sin clase de dispositivo', () => {
    render(<EmbedFrame title="Reproductor del curso" device="desktop" />);
    expect(screen.getByTitle('Reproductor del curso').className).toBe('embed-frame');
  });

  it('device y fill se combinan', () => {
    render(<EmbedFrame title="Reproductor del curso" device="mobile" fill="viewport" />);
    expect(screen.getByTitle('Reproductor del curso')).toHaveClass('embed-frame--viewport', 'embed-frame--mobile');
  });
});

