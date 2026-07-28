import { forwardRef } from 'react';
import './PricingCard.css';
import { Heading } from '../../atoms/Heading/Heading';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { List } from '../../atoms/List/List';
import { Icon, type IconName } from '../../atoms/Icon/Icon';
import { Tag } from '../../atoms/Tag/Tag';
import { Button } from '../../atoms/Button/Button';
import { Arrow } from '../../atoms/Arrow/Arrow';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';

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

export const PricingCard = forwardRef<HTMLElement, PricingCardProps>(function PricingCard({
  planName,
  price,
  priceSuffix,
  description,
  features,
  featured = false,
  featuredLabel,
  href,
  external = false,
  ctaLabel,
  footerLabel,
  footerVariant = 'primary',
  onFooterClick,
  className,
}, ref) {
  const classes = ['pricing-card', featured ? 'pricing-card--featured' : '', className ?? '']
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {featured && featuredLabel && <Tag className="pricing-card__featured-label">{featuredLabel}</Tag>}
      {planName && <Heading level={3} size={1} className="pricing-card__plan-name">{planName}</Heading>}
      {(price || priceSuffix) && (
        <div className="pricing-card__price-row">
          {price && <span className="pricing-card__price">{price}</span>}
          {priceSuffix && <span className="pricing-card__price-suffix">{priceSuffix}</span>}
        </div>
      )}
      {description && <Paragraph className="pricing-card__description">{description}</Paragraph>}
      {features && features.length > 0 && (
        <List type="plain" className="pricing-card__features">
          {features.map((feature) => (
            <li key={feature.text} className="pricing-card__feature">
              {feature.icon && <Icon name={feature.icon} size="sm" />}
              <span>{feature.text}</span>
            </li>
          ))}
        </List>
      )}
    </>
  );

  if (href !== undefined) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
        <VisuallyHidden>{ctaLabel}</VisuallyHidden>
        <Arrow size="lg" className="pricing-card__arrow" />
      </a>
    );
  }

  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className={classes}>
      {content}
      {footerLabel && (
        <Button variant={footerVariant} onClick={onFooterClick} className="pricing-card__footer-button">
          {footerLabel}
        </Button>
      )}
    </div>
  );
});
