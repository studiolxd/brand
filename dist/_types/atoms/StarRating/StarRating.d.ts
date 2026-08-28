import './StarRating.css';
export interface StarRatingProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange' | 'defaultValue'> {
    /** Valoración mostrada. En lectura se redondea a media estrella. */
    value?: number;
    /** Valoración al montar, cuando la entrada no está controlada. */
    defaultValue?: number;
    /** Se llama con la valoración elegida. Solo en entrada (`readOnly={false}`). */
    onValueChange?: (value: number) => void;
    /** Cuántas estrellas tiene la escala. */
    max?: number;
    /**
     * Solo lectura (por defecto). El componente nace para **mostrar** una media;
     * para capturar una valoración hay que pedirlo con `readOnly={false}`.
     */
    readOnly?: boolean;
    /** Deshabilita la entrada. */
    disabled?: boolean;
    /** Talla de la estrella, relativa al texto que la rodea. */
    size?: 'sm' | 'md' | 'lg';
    /** `name` de los radios que envían la valoración con el formulario. */
    name?: string;
    /** Idioma con el que se escribe el número del nombre accesible. */
    locale?: string;
    /**
     * Nombre accesible en lectura: recibe el valor ya redondeado a media estrella
     * y el máximo. Por defecto, en castellano: «4,5 de 5 estrellas».
     */
    valueLabel?: (value: number, max: number) => string;
    /**
     * Nombre accesible de cada estrella elegible. Por defecto, en castellano:
     * «3 de 5 estrellas».
     */
    optionLabel?: (value: number, max: number) => string;
    /**
     * Nombre accesible del grupo en modo entrada. Por defecto, en castellano:
     * «Valoración».
     */
    groupLabel?: string;
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
}
/**
 * Valoración en estrellas, de lectura o de entrada.
 *
 * **En lectura** es una sola imagen: `role="img"` con el valor exacto en el
 * nombre accesible («4,5 de 5 estrellas»), no cinco iconos que el lector tenga
 * que contar. Admite **media estrella**, que es como se lee una media.
 *
 * **En entrada** (`readOnly={false}`) es un grupo de radios nativos —teclado,
 * envío de formulario y estado marcado vienen del navegador— con una estrella
 * por opción. La entrada va en pasos enteros: la media estrella describe una
 * media calculada, no algo que una persona elija.
 */
export declare function StarRating({ value: valueProp, defaultValue, onValueChange, max, readOnly, disabled, size, name: nameProp, locale, valueLabel, optionLabel, groupLabel, className, ...rest }: StarRatingProps): import("react/jsx-runtime").JSX.Element;
