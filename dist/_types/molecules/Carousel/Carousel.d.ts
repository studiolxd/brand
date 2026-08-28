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
     * arranca si el sistema pide movimiento reducido.
     */
    autoplay?: number;
    /** Texto accesible del botón «anterior». Por defecto «Anterior». */
    prevLabel?: string;
    /** Texto accesible del botón «siguiente». Por defecto «Siguiente». */
    nextLabel?: string;
    /** Texto accesible del indicador n. Por defecto «Ir a la diapositiva N». */
    indicatorLabel?: (index: number) => string;
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
export declare function Carousel({ children, label, roleDescription, trackLabel, slideSize, controls, indicators, autoplay, prevLabel, nextLabel, indicatorLabel, className, id, }: CarouselProps): import("react/jsx-runtime").JSX.Element;
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
export declare function CarouselSlide({ roleDescription, className, children, ...rest }: CarouselSlideProps): import("react/jsx-runtime").JSX.Element;
