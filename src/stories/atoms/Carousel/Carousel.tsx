import { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType, EmblaPluginType } from 'embla-carousel';
import { Chevron } from '../Chevron/Chevron';
import './Carousel.css';

interface CarouselProps {
  children: React.ReactNode;
  /** Opciones de Embla Carousel */
  options?: EmblaOptionsType;
  /** Plugins de Embla (e.g. AutoScroll) */
  plugins?: EmblaPluginType[];
  /** Oculta los botones prev/next */
  hideButtons?: boolean;
  /** Clase adicional para el wrapper exterior */
  className?: string;
  /**
   * Tamaño de cada slide como flex-basis.
   * Sobreescribe --carousel-slide-size en el wrapper.
   * Ejemplo: 'calc(100% / 1.5)', '80%', '300px'
   */
  slideSize?: string;
  /**
   * Color de fondo sobre el que se dibuja el degradado de los botones.
   * Por defecto hereda --color-background-default.
   * Útil en secciones con fondo oscuro o de color.
   */
  gradientColor?: string;
  /** Texto accesible del botón "anterior". Por defecto "Anterior". */
  prevLabel?: string;
  /** Texto accesible del botón "siguiente". Por defecto "Siguiente". */
  nextLabel?: string;
}

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function Carousel({
  children,
  options,
  plugins,
  hideButtons,
  className,
  slideSize,
  gradientColor,
  prevLabel = 'Anterior',
  nextLabel = 'Siguiente',
}: CarouselProps) {
  const effectivePlugins = prefersReducedMotion ? [] : plugins;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, ...options }, effectivePlugins);

  useEffect(() => {
    const node = emblaApi?.rootNode();
    if (!node) return;

    const plugins = emblaApi?.plugins() as Record<string, { stop?: () => void; play?: () => void }> | undefined;
    const pause = () => {
      plugins?.autoScroll?.stop?.();
      plugins?.autoplay?.stop?.();
    };
    const resume = () => {
      plugins?.autoScroll?.play?.();
      plugins?.autoplay?.play?.();
    };

    node.addEventListener('mouseenter', pause);
    node.addEventListener('mouseleave', resume);
    node.addEventListener('focusin', pause);
    node.addEventListener('focusout', resume);

    return () => {
      node.removeEventListener('mouseenter', pause);
      node.removeEventListener('mouseleave', resume);
      node.removeEventListener('focusin', pause);
      node.removeEventListener('focusout', resume);
    };
  }, [emblaApi]);

  const style = {
    ...(slideSize ? { '--carousel-slide-size': slideSize } : {}),
    ...(gradientColor ? { '--carousel-gradient-color': gradientColor } : {}),
  } as React.CSSProperties;

  return (
    <div className={['carousel', className].filter(Boolean).join(' ')} style={style} role="region" aria-roledescription="carousel">
      {!hideButtons && (
        <button
          className="carousel__btn carousel__btn--prev"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label={prevLabel}
          type="button"
        >
          <Chevron className="carousel__chevron carousel__chevron--prev" size="lg" />
        </button>
      )}

      <div className="carousel__viewport" ref={emblaRef}>
        <div className="carousel__track">
          {children}
        </div>
      </div>

      {!hideButtons && (
        <button
          className="carousel__btn carousel__btn--next"
          onClick={() => emblaApi?.scrollNext()}
          aria-label={nextLabel}
          type="button"
        >
          <Chevron className="carousel__chevron" size="lg" />
        </button>
      )}
    </div>
  );
}

interface CarouselSlideProps {
  children: React.ReactNode;
  className?: string;
}

export function CarouselSlide({ children, className }: CarouselSlideProps) {
  return (
    <div className={['carousel__slide', className].filter(Boolean).join(' ')} role="group" aria-roledescription="slide">
      {children}
    </div>
  );
}
