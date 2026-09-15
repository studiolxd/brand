import './Carousel.css';
/**
 * El cromo del carrusel: cómo se llaman la región y la pista, qué hacen sus
 * mandos y qué se anuncia al cambiar de diapositiva. Todo cromo — dicen qué es
 * y qué hace el carrusel, nunca qué hay dentro: el contenido de cada
 * diapositiva lo pone quien la monta.
 *
 * Las dos `roleDescription` también van aquí: las lee el lector de pantalla en
 * voz alta, así que son texto y no una palabra clave del motor.
 */
export interface CarouselMessages {
    /** Nombre accesible de la región cuando la pantalla no le da uno propio. */
    label: string;
    /** `aria-roledescription` de la región: qué es esto. */
    roleDescription: string;
    /** Nombre accesible de la pista, la que recibe el foco para desplazarse. */
    track: string;
    /** Nombre accesible del botón de retroceso. */
    previous: string;
    /** Nombre accesible del botón de avance. */
    next: string;
    /** Nombre accesible del indicador n (base 0). Interpola, así que es función. */
    indicator: (index: number) => string;
    /** Nombre accesible del botón que detiene el avance automático. */
    pause: string;
    /** Nombre accesible del botón que lo reanuda. */
    play: string;
    /** Lo que se anuncia al cambiar de diapositiva. Interpola, así que es función. */
    slideStatus: (index: number, total: number) => string;
    /** `aria-roledescription` de cada diapositiva. */
    slideRoleDescription: string;
}
export interface CarouselProps {
    /** Las diapositivas: uno o varios `CarouselSlide`. */
    children: React.ReactNode;
    /**
     * Nombre accesible de la región. **Sin default**: sin él, sale de
     * `carousel.label` del `BrandMessagesProvider`.
     */
    label?: string;
    /**
     * Texto de `aria-roledescription` de la región. **Sin default**: sin él,
     * sale de `carousel.roleDescription`.
     */
    roleDescription?: string;
    /**
     * Nombre accesible de la pista, la que recibe el foco para desplazarse con
     * el teclado. **Sin default**: sin él, sale de `carousel.track`.
     */
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
    /**
     * Texto accesible del botón «anterior». **Sin default**: sin él, sale de
     * `carousel.previous`. Solo se lee con `controls`.
     */
    prevLabel?: string;
    /**
     * Texto accesible del botón «siguiente». **Sin default**: sin él, sale de
     * `carousel.next`. Solo se lee con `controls`.
     */
    nextLabel?: string;
    /**
     * Texto accesible del indicador n. **Sin default**: sin él, sale de
     * `carousel.indicator`. Solo se lee con `indicators`.
     */
    indicatorLabel?: (index: number) => string;
    /**
     * Texto accesible del botón que detiene el avance automático. **Sin
     * default**: sin él, sale de `carousel.pause`. Solo se lee con `autoplay`.
     */
    pauseLabel?: string;
    /**
     * Texto accesible del botón que reanuda el avance automático. **Sin
     * default**: sin él, sale de `carousel.play`. Solo se lee con `autoplay`.
     */
    playLabel?: string;
    /**
     * Texto que se anuncia al cambiar de diapositiva. **Sin default**: sin él,
     * sale de `carousel.slideStatus`.
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
export declare function Carousel({ children, label, roleDescription, trackLabel, slideSize, controls, indicators, autoplay, prevLabel, nextLabel, indicatorLabel, pauseLabel, playLabel, slideStatusLabel, className, id, }: CarouselProps): import("react/jsx-runtime").JSX.Element;
export interface CarouselSlideProps extends React.ComponentPropsWithoutRef<'div'> {
    /**
     * Texto de `aria-roledescription` de la diapositiva. **Sin default**: sin
     * él, sale de `carousel.slideRoleDescription` del `BrandMessagesProvider`.
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
