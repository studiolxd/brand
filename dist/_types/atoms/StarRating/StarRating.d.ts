import './StarRating.css';
/** Lo que no depende del modo ni de los textos. */
export interface StarRatingCommonProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange' | 'defaultValue'> {
    /** Cuántas estrellas tiene la escala. Default: 5. */
    max?: number;
    /** Talla de la estrella, relativa al texto que la rodea. */
    size?: 'sm' | 'md' | 'lg';
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
}
/**
 * El recuento de reseñas y su rótulo viajan juntos: sin `reviewCount` no hay
 * nada que escribir, y con él hace falta saber cómo se escribe.
 */
export type StarRatingCountProps = {
    /**
     * Cuántas reseñas hay detrás de la media: se pinta a continuación («(24)»)
     * y entra en el nombre accesible. **Sin él** la nota es la de UNA reseña
     * suelta, donde un recuento no significa nada.
     */
    reviewCount?: undefined;
    countLabel?: (reviewCount: number) => string;
} | {
    /** Cuántas reseñas hay detrás de la media. Obliga a pasar `countLabel`. */
    reviewCount: number;
    /**
     * Cómo se escribe el recuento visible («(24)»). **Obligatorio** con
     * `reviewCount`: el componente no escribe texto por su cuenta.
     */
    countLabel: (reviewCount: number) => string;
};
/**
 * El valor y el texto del vacío, igual: `emptyLabel` solo se lee cuando `value`
 * puede ser `null`, así que solo lo pide quien pueda pasarlo.
 */
export type StarRatingValueProps = {
    /** Valoración mostrada. Se redondea a media estrella. */
    value: number;
    emptyLabel?: string;
} | {
    /**
     * Valoración mostrada. Se redondea a media estrella.
     *
     * **`null` no es cero**: es «todavía sin reseñas». Con `null` la escala no
     * se dibuja —cinco estrellas vacías son el dibujo de «valorado con 0», que
     * es una nota de verdad y la peor— y en su lugar va `emptyLabel`.
     */
    value: number | null;
    /**
     * Qué se lee y se ve cuando `value` es `null`. **Obligatorio** en cuanto
     * `value` pueda serlo: el componente no escribe «Todavía sin reseñas» por
     * su cuenta.
     */
    emptyLabel: string;
};
/** Modo lectura (el de siempre): una imagen con su nombre accesible. */
export type StarRatingReadProps = StarRatingCommonProps & StarRatingCountProps & StarRatingValueProps & {
    /**
     * Solo lectura (por defecto). El componente nace para **mostrar** una media;
     * para capturar una valoración hay que pedirlo con `readOnly={false}`.
     */
    readOnly?: true;
    /**
     * Nombre accesible de la valoración: recibe el valor ya redondeado a media
     * estrella, el máximo y, si lo hay, el recuento. Es el nombre COMPLETO —el
     * recuento visible queda dentro de la imagen y no se lee aparte—, p. ej.
     * «4,5 de 5 estrellas, 24 reseñas». **Obligatorio**: el nombre accesible lo
     * pasa el consumidor.
     */
    valueLabel: (value: number, max: number, reviewCount?: number) => string;
};
/** Modo entrada (`readOnly={false}`): un grupo de radios nativos. */
export type StarRatingInputProps = StarRatingCommonProps & {
    /** Modo entrada. */
    readOnly: false;
    /** Valoración elegida, cuando la entrada está controlada. */
    value?: number;
    /** Valoración al montar, cuando la entrada no está controlada. */
    defaultValue?: number;
    /** Se llama con la valoración elegida. */
    onValueChange?: (value: number) => void;
    /** Deshabilita la entrada. */
    disabled?: boolean;
    /** `name` de los radios que envían la valoración con el formulario. */
    name?: string;
    /**
     * Nombre accesible de cada estrella elegible, p. ej. «3 de 5 estrellas».
     * **Obligatorio**: lo pasa el consumidor.
     */
    optionLabel: (value: number, max: number) => string;
    /**
     * Nombre accesible del grupo, p. ej. «Valoración». **Obligatorio**, igual que
     * `optionLabel`.
     */
    groupLabel: string;
};
export type StarRatingProps = StarRatingReadProps | StarRatingInputProps;
/**
 * Valoración en estrellas, de lectura o de entrada.
 *
 * **En lectura** es una sola imagen: `role="img"` con el valor exacto en el
 * nombre accesible («4,5 de 5 estrellas»), no cinco iconos que el lector tenga
 * que contar. Admite **media estrella**, que es como se lee una media, y
 * **`value={null}`** para «todavía sin reseñas», que no se dibuja con estrellas
 * porque las estrellas vacías ya significan otra cosa.
 *
 * **En entrada** (`readOnly={false}`) es un grupo de radios nativos —teclado,
 * envío de formulario y estado marcado vienen del navegador— con una estrella
 * por opción. La entrada va en pasos enteros: la media estrella describe una
 * media calculada, no algo que una persona elija.
 */
export declare function StarRating(props: StarRatingProps): import("react/jsx-runtime").JSX.Element;
