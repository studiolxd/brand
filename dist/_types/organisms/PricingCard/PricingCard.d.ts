import './PricingCard.css';
import { type IconName } from '../../atoms/Icon/Icon';
export interface PricingFeature {
    /** Texto de la característica. */
    text: string;
    /** Icono opcional mostrado antes del texto. */
    icon?: IconName;
}
interface PricingCardBaseProps {
    /** Nombre del plan (pequeño, en la parte superior). */
    planName?: string;
    /** Precio, ya formateado por el consumidor (control de moneda/formato). */
    price?: string;
    /** Sufijo del precio, ej. `"/mes"`. Alineado a la línea base del precio. */
    priceSuffix?: string;
    /** Descripción del plan. */
    description?: string;
    /** Listado de características incluidas. */
    features?: PricingFeature[];
    /** Marca el plan como destacado/recomendado (borde y sombra enfatizados). */
    featured?: boolean;
    /** Etiqueta mostrada sobre el nombre del plan cuando `featured` es `true` (ej. "Recomendado"). */
    featuredLabel?: string;
    /** Se añade DESPUÉS de las clases propias del componente. */
    className?: string;
}
type PricingCardLinkFooter = {
    /** URL de destino — toda la tarjeta se convierte en un enlace con `Arrow` al fondo. */
    href: string;
    /** Adds target="_blank" rel="noopener noreferrer" (solo con href). */
    external?: boolean;
    /** Texto accesible del CTA, visually-hidden. */
    ctaLabel?: string;
    footerLabel?: never;
    footerVariant?: never;
    onFooterClick?: never;
};
type PricingCardButtonFooter = {
    href?: undefined;
    external?: never;
    ctaLabel?: never;
    /** Texto del botón del footer. */
    footerLabel?: string;
    /** Variante visual del botón del footer. Default: `'primary'`. */
    footerVariant?: 'primary' | 'outline' | 'ghost' | 'text';
    onFooterClick?: () => void;
};
/**
 * `href` (link-card, con `Arrow` al fondo) y `footerLabel` (botón) son mutuamente
 * excluyentes — mismo patrón que `Card` para su modo link vs. contenedor.
 */
export type PricingCardProps = PricingCardBaseProps & (PricingCardLinkFooter | PricingCardButtonFooter);
export declare const PricingCard: import("react").ForwardRefExoticComponent<PricingCardProps & import("react").RefAttributes<HTMLElement>>;
export {};
