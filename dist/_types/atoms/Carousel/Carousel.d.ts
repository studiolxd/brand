import type { EmblaOptionsType, EmblaPluginType } from 'embla-carousel';
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
export declare function Carousel({ children, options, plugins, hideButtons, className, slideSize, gradientColor }: CarouselProps): import("react/jsx-runtime").JSX.Element;
interface CarouselSlideProps {
    children: React.ReactNode;
    className?: string;
}
export declare function CarouselSlide({ children, className }: CarouselSlideProps): import("react/jsx-runtime").JSX.Element;
export {};
