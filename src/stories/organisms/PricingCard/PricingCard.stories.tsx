import type { Meta, StoryObj } from '@storybook/react-vite';
import { PricingCard } from './PricingCard';

const meta: Meta<typeof PricingCard> = {
  title: 'Organisms/PricingCard',
  component: PricingCard,
  parameters: {
    layout: 'padded',
  },
  args: {
    planName: 'Pro',
    price: '49 €',
    priceSuffix: '/mes',
    description: 'Para equipos que necesitan más capacidad y soporte prioritario.',
    features: [
      { text: 'Usuarios ilimitados', icon: 'check' },
      { text: 'Soporte prioritario', icon: 'check' },
      { text: 'Exportación de datos', icon: 'check' },
    ],
    footerLabel: 'Elegir plan',
  },
};

export default meta;
type Story = StoryObj<typeof PricingCard>;

export const Completo: Story = {
  render: (args) => (
    <div style={{ maxWidth: '20rem' }}>
      <PricingCard {...args} />
    </div>
  ),
};

export const Destacado: Story = {
  args: {
    featured: true,
    featuredLabel: 'Recomendado',
  },
  render: (args) => (
    <div style={{ maxWidth: '20rem' }}>
      <PricingCard {...args} />
    </div>
  ),
};

export const SinIconosEnFeatures: Story = {
  args: {
    features: [
      { text: 'Usuarios ilimitados' },
      { text: 'Soporte prioritario' },
      { text: 'Exportación de datos' },
    ],
  },
  render: (args) => (
    <div style={{ maxWidth: '20rem' }}>
      <PricingCard {...args} />
    </div>
  ),
};

export const FooterOutline: Story = {
  args: { footerVariant: 'outline' },
  render: (args) => (
    <div style={{ maxWidth: '20rem' }}>
      <PricingCard {...args} />
    </div>
  ),
};

export const FooterGhost: Story = {
  args: { footerVariant: 'ghost' },
  render: (args) => (
    <div style={{ maxWidth: '20rem' }}>
      <PricingCard {...args} />
    </div>
  ),
};

export const FooterText: Story = {
  args: { footerVariant: 'text' },
  render: (args) => (
    <div style={{ maxWidth: '20rem' }}>
      <PricingCard {...args} />
    </div>
  ),
};

/** Modo link: toda la tarjeta es un `<a>` y muestra `Arrow` al fondo en vez de botón. */
export const ConEnlaceYFlecha: Story = {
  args: {
    href: '#',
    ctaLabel: 'Ver más sobre el plan Pro',
    footerLabel: undefined,
  },
  render: (args) => (
    <div style={{ maxWidth: '20rem' }}>
      <PricingCard {...args} />
    </div>
  ),
};

/** Solo las secciones mínimas: nombre de plan y precio, sin sufijo, descripción, features ni footer. */
export const Minimo: Story = {
  args: {
    planName: 'Free',
    price: '0 €',
    priceSuffix: undefined,
    description: undefined,
    features: undefined,
    footerLabel: undefined,
  },
  render: (args) => (
    <div style={{ maxWidth: '20rem' }}>
      <PricingCard {...args} />
    </div>
  ),
};

/** Sin nombre de plan ni descripción — solo precio, features y footer. */
export const SinNombreDePlan: Story = {
  args: {
    planName: undefined,
    description: undefined,
  },
  render: (args) => (
    <div style={{ maxWidth: '20rem' }}>
      <PricingCard {...args} />
    </div>
  ),
};

export const TresPlanes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
      <div style={{ maxWidth: '20rem', flex: '1 1 16rem' }}>
        <PricingCard
          planName="Free"
          price="0 €"
          description="Para empezar a explorar la plataforma."
          features={[{ text: 'Usuarios ilimitados', icon: 'check' }, { text: '1 proyecto', icon: 'check' }]}
          footerLabel="Empezar gratis"
          footerVariant="outline"
        />
      </div>
      <div style={{ maxWidth: '20rem', flex: '1 1 16rem' }}>
        <PricingCard
          featured
          featuredLabel="Recomendado"
          planName="Pro"
          price="49 €"
          priceSuffix="/mes"
          description="Para equipos que necesitan más capacidad y soporte prioritario."
          features={[
            { text: 'Usuarios ilimitados', icon: 'check' },
            { text: 'Soporte prioritario', icon: 'check' },
            { text: 'Exportación de datos', icon: 'check' },
          ]}
          footerLabel="Elegir plan"
        />
      </div>
      <div style={{ maxWidth: '20rem', flex: '1 1 16rem' }}>
        <PricingCard
          planName="Enterprise"
          price="Personalizado"
          description="Para organizaciones con necesidades específicas."
          features={[{ text: 'Todo lo de Pro', icon: 'check' }, { text: 'SLA dedicado', icon: 'check' }]}
          href="#"
          ctaLabel="Contactar con ventas"
        />
      </div>
    </div>
  ),
};
