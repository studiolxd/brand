import { Children, useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import './Carousel.css';

export interface CarouselProps {
  /** Las diapositivas: uno o varios `CarouselSlide`. */
  children: React.ReactNode;
  /** Nombre accesible de la región. Por defecto «Carrusel», en castellano. */
  label?: string;
  /**
   * Texto de `aria-roledescription` de la región. Por defecto «carrusel», en
   * castellano: es el lector de pantalla quien lo lee, así que se traduce.
   */
  roleDescription?: string;
  /** Nombre accesible de la pista, que es la que recibe el foco para desplazarse con el teclado. Por defecto «Diapositivas». */
  trackLabel?: string;
  /**
   * Ancho de cada diapositiva — cualquier medida CSS (`'50%'`, `'18rem'`,
   * `'calc(100% / 3)'`). Sobreescribe `--carousel-slide-size`, que por defecto
   * es la pista entera (una diapositiva a la vista).
   */
  slideSize?: string;
  /** Botones anterior/siguiente. Por defecto sí. */
  controls?: boolean;
  /** Barra de indicadores, una por diapositiva. Por defecto no. */
  indicators?: boolean;
  /**
   * Avance automático, en milisegundos entre saltos. Sin la prop no hay
   * autoplay. Se detiene mientras el puntero o el foco están dentro, y no
   * arranca si el sistema pide movimiento reducido. Con la prop aparece
   * además el botón de pausa/reproducción, que exige WCAG 2.2.2 para todo
   * movimiento automático: pararlo así es definitivo, no se reanuda solo.
   */
  autoplay?: number;
  /** Texto accesible del botón «anterior». Por defecto «Anterior». */
  prevLabel?: string;
  /** Texto accesible del botón «siguiente». Por defecto «Siguiente». */
  nextLabel?: string;
  /** Texto accesible del indicador n. Por defecto «Ir a la diapositiva N». */
  indicatorLabel?: (index: number) => string;
  /** Texto accesible del botón que detiene el avance automático. Por defecto «Pausar». */
  pauseLabel?: string;
  /** Texto accesible del botón que reanuda el avance automático. Por defecto «Reproducir». */
  playLabel?: string;
  /**
   * Texto que se anuncia al cambiar de diapositiva. Por defecto «Diapositiva N
   * de M». Lo lee el lector de pantalla: se traduce.
   */
  slideStatusLabel?: (index: number, count: number) => string;
  className?: string;
  id?: string;
}

/**
 * Carrusel de scroll nativo: la pista es un contenedor con `overflow` y
 * `scroll-snap`, así que arrastrar, deslizar en móvil y las teclas de flecha
 * funcionan sin JavaScript. El componente solo añade lo que el navegador no
 * da: los botones anterior/siguiente, los indicadores de posición y el
 * avance automático opcional.
 *
 * No pinta fondo ni tiene tallas: el ancho de cada diapositiva lo decide quien
 * lo usa (`slideSize`), y lo que va dentro son componentes del sistema
 * —tarjetas, logotipos, citas—, no maquetación propia.
 */
export function Carousel({
  children,
  label = 'Carrusel',
  roleDescription = 'carrusel',
  trackLabel = 'Diapositivas',
  slideSize,
  controls = true,
  indicators = false,
  autoplay,
  prevLabel = 'Anterior',
  nextLabel = 'Siguiente',
  indicatorLabel = (index) => `Ir a la diapositiva ${index + 1}`,
  pauseLabel = 'Pausar',
  playLabel = 'Reproducir',
  slideStatusLabel = (index, total) => `Diapositiva ${index + 1} de ${total}`,
  className,
  id,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  // El autoplay necesita la posición sin volver a montar su temporizador en
  // cada scroll: la lee de la ref, no del estado.
  const currentRef = useRef(0);
  // Dos pausas distintas: la de cortesía (puntero o foco dentro), que se
  // deshace sola al salir, y la que pide quien usa el carrusel con el botón,
  // que manda sobre la anterior y no se levanta hasta que la levanten.
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);
  const count = Children.count(children);
  const playing = autoplay !== undefined && !stopped;

  const slidesOf = (track: HTMLDivElement) => Array.from(track.children) as HTMLElement[];

  /** Lleva la pista a la diapositiva `index`, dando la vuelta por los dos extremos. */
  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slides = slidesOf(track);
    if (slides.length === 0) return;
    const target = slides[(index + slides.length) % slides.length];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: target.offsetLeft - slides[0].offsetLeft, behavior: reduced ? 'auto' : 'smooth' });
  }, []);

  // La posición sale del scroll, no de un estado propio: así el arrastre, el
  // teclado y la rueda quedan reflejados en los indicadores sin duplicar nada.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const read = () => {
      const slides = slidesOf(track);
      if (slides.length === 0) return;
      const origin = slides[0].offsetLeft;
      let nearest = 0;
      let best = Infinity;
      slides.forEach((slide, i) => {
        const distance = Math.abs(slide.offsetLeft - origin - track.scrollLeft);
        if (distance < best) {
          best = distance;
          nearest = i;
        }
      });
      currentRef.current = nearest;
      setCurrent(nearest);
    };
    read();
    track.addEventListener('scroll', read, { passive: true });
    return () => track.removeEventListener('scroll', read);
  }, [children]);

  useEffect(() => {
    if (!autoplay || stopped || hovered || count < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => goTo(currentRef.current + 1), autoplay);
    return () => window.clearInterval(timer);
  }, [autoplay, stopped, hovered, count, goTo]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(current + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(current - 1);
    }
  };

  const style = slideSize ? ({ '--carousel-slide-size': slideSize } as React.CSSProperties) : undefined;

  return (
    <div
      id={id}
      className={['carousel', className].filter(Boolean).join(' ')}
      style={style}
      role="region"
      aria-roledescription={roleDescription}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div
        ref={trackRef}
        className="carousel__track"
        tabIndex={0}
        role="group"
        aria-label={trackLabel}
        onKeyDown={onKeyDown}
      >
        {children}
      </div>

      {/* Mientras el carrusel avanza solo, la región calla: anunciar cada salto
          automático sería justo el ruido que evita WCAG. En cuanto se detiene
          —a mano o porque nunca hubo autoplay—, cada cambio se anuncia. */}
      <VisuallyHidden as="div" role="status" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
        {slideStatusLabel(current, count)}
      </VisuallyHidden>

      {(controls || indicators || autoplay !== undefined) && (
        <div className="carousel__controls">
          {indicators && (
            <div className="carousel__indicators">
              {Array.from({ length: count }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className="carousel__indicator"
                  aria-label={indicatorLabel(i)}
                  aria-current={i === current ? 'true' : undefined}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          )}
          {(controls || autoplay !== undefined) && (
            <div className="carousel__buttons">
              {/* WCAG 2.2.2: todo movimiento automático necesita una parada. */}
              {autoplay !== undefined && (
                <Button
                  variant="ghost"
                  iconOnly
                  aria-label={playing ? pauseLabel : playLabel}
                  onClick={() => setStopped((s) => !s)}
                >
                  <Icon name={playing ? 'pause' : 'play'} />
                </Button>
              )}
              {controls && (
                <>
                  <Button variant="ghost" iconOnly aria-label={prevLabel} onClick={() => goTo(current - 1)}>
                    <Icon name="arrow-left" />
                  </Button>
                  <Button variant="ghost" iconOnly aria-label={nextLabel} onClick={() => goTo(current + 1)}>
                    <Icon name="arrow" />
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export interface CarouselSlideProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * Texto de `aria-roledescription` de la diapositiva. Por defecto
   * «diapositiva», en castellano.
   */
  roleDescription?: string;
  children: React.ReactNode;
}

/**
 * Una diapositiva de la pista. Es un `group` con `aria-roledescription`, para
 * que el lector de pantalla anuncie de qué se trata; el contenido lo pone
 * quien la usa.
 */
export function CarouselSlide({
  roleDescription = 'diapositiva',
  className,
  children,
  ...rest
}: CarouselSlideProps) {
  return (
    <div
      className={['carousel__slide', className].filter(Boolean).join(' ')}
      role="group"
      aria-roledescription={roleDescription}
      {...rest}
    >
      {children}
    </div>
  );
}
