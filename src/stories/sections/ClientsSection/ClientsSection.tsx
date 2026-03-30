import AutoScroll from 'embla-carousel-auto-scroll';
import { Carousel, CarouselSlide } from '../../atoms/Carousel/Carousel';
import { Heading } from '../../atoms/Heading/Heading';
import './ClientsSection.css';

interface Client {
  /** Identificador único. */
  id: string;
  /** Nombre del cliente — usado como alt de la imagen. */
  name: string;
  /** URL del logotipo. */
  logo: string;
}

interface ClientsSectionProps {
  /** Título de la sección. */
  title?: string;
  /** Lista de clientes. */
  clients: Client[];
}

export function ClientsSection({ title = 'Hemos trabajado junto a...', clients }: ClientsSectionProps) {
  return (
    <section className="clients-section">
      <Heading level={2}>{title}</Heading>
      <Carousel
        options={{ align: 'start' }}
        plugins={[AutoScroll({ speed: 1, stopOnInteraction: false })]}
        hideButtons
      >
        {clients.map((client) => (
          <CarouselSlide key={client.id} className="clients-section__slide">
            <img
              src={client.logo}
              alt={client.name}
              className="clients-section__logo"
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </section>
  );
}
