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
}

export function Carousel({ children, options, plugins, hideButtons, className, slideSize, gradientColor }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, ...options }, plugins);

  const style = {
    ...(slideSize ? { '--carousel-slide-size': slideSize } : {}),
    ...(gradientColor ? { '--carousel-gradient-color': gradientColor } : {}),
  } as React.CSSProperties;

  return (
    <div className={['carousel', className].filter(Boolean).join(' ')} style={style}>
      {!hideButtons && (
        <button
          className="carousel__btn carousel__btn--prev"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Anterior"
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
          aria-label="Siguiente"
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
    <div className={['carousel__slide', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}
