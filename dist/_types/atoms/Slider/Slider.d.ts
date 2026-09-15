import { Slider as BaseSlider } from '@base-ui/react/slider';
import './Slider.css';
/**
 * Los nombres genéricos de los pulgares, y son **cromo**: dicen qué pulgar es,
 * no qué mide el deslizador. Lo que mide se dice con `label`, que es de la
 * pantalla, y la cifra es formato.
 */
export interface SliderMessages {
    /** Nombre del pulgar único cuando el deslizador no trae `label`. */
    value: string;
    /** Nombre del primer pulgar de un rango de dos. */
    min: string;
    /** Nombre del segundo pulgar de un rango de dos. */
    max: string;
    /** Nombre del pulgar n (base 1) con tres o más. Interpola, así que es función. */
    valueAt: (index: number) => string;
}
type BaseSliderRootProps = Omit<React.ComponentPropsWithoutRef<typeof BaseSlider.Root>, 'className' | 'value' | 'defaultValue' | 'onValueChange' | 'onValueCommitted'>;
export interface SliderProps extends BaseSliderRootProps {
    /** Valor actual (controlado). Un número, o una lista para un rango. */
    value?: number | number[];
    /** Valor al montar (no controlado). */
    defaultValue?: number | number[];
    /** Se llama mientras se mueve. Devuelve la misma forma que recibió `value`. */
    onValueChange?: (value: number | number[]) => void;
    /** Se llama al soltar: el sitio para guardar, no `onValueChange`. */
    onValueCommitted?: (value: number | number[]) => void;
    /**
     * Nombre accesible del deslizador. Con un solo pulgar es su nombre; con
     * varios lo completa `thumbLabel`.
     */
    label?: string;
    /**
     * Nombre accesible de cada pulgar. **Sin default**: sin él, con un pulgar es
     * `label` —y en su defecto `slider.value`—, con dos son `slider.min` y
     * `slider.max`, y con más, `slider.valueAt`. Cada clave se lee **donde se
     * pinta**: un deslizador de un solo pulgar no exige las del rango.
     */
    thumbLabel?: (index: number, total: number) => string;
    /** Muestra el valor formateado junto a la banda. */
    showValue?: boolean;
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
}
/**
 * Deslizador de un valor o de un rango (Base UI Slider): el espaciado de un
 * editor de tema, el precio máximo de un filtro, la opacidad de una capa.
 *
 * Devuelve **la misma forma que recibe**: un número si se le dio un número, una
 * lista si se le dio una lista. Un pulgar por entrada de la lista.
 *
 * `onValueChange` avisa mientras se arrastra —para la vista previa— y
 * `onValueCommitted` al soltar, que es donde va el guardado.
 */
export declare function Slider({ value, defaultValue, onValueChange, onValueCommitted, label, thumbLabel, showValue, orientation, className, ...rest }: SliderProps): import("react/jsx-runtime").JSX.Element;
export {};
