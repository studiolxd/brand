import { Header } from '../../sections/Header/Header';
import { Select } from '../../atoms/Select/Select';
import { SolutionsSection } from '../../sections/SolutionsSection/SolutionsSection';
import { MethodologySection } from '../../sections/MethodologySection/MethodologySection';
import { HighlightSection } from '../../sections/HighlightSection/HighlightSection';
import { CardSquare } from '../../molecules/CardSquare/CardSquare';
import { CardSplit } from '../../molecules/CardSplit/CardSplit';
import { ProjectsSection } from '../../sections/ProjectsSection/ProjectsSection';
import { ClientsSection } from '../../sections/ClientsSection/ClientsSection';
import { ReviewsSection } from '../../sections/ReviewsSection/ReviewsSection';
import { reviews } from '../../sections/ReviewsSection/ReviewsSection.stories';
import { projects } from '../../sections/ProjectsSection/ProjectsSection.stories';
import { clients } from '../../sections/ClientsSection/ClientsSection.stories';
import { navItems, featuredLink } from '../../sections/Header/Header.stories';
import { steps } from '../../sections/MethodologySection/MethodologySection.stories';
import { contactArgs } from '../../sections/ContactSection/ContactSection.stories';

import { solutionItems } from '../../sections/SolutionsSection/SolutionsSection.stories';
import { ContactSection } from '../../sections/ContactSection/ContactSection';
import { Footer } from '../../sections/Footer/Footer';
import './Home.css';


export function Home() {
  return (
    <div className="home">
      <Header
        navItems={navItems}
        featuredLink={featuredLink}
        actions={<><Select options={[{ value: 'es', label: 'ES' }, { value: 'en', label: 'EN' }]} defaultValue="es" /><a href="https://academy.studiolxd.com" className="btn btn-primary">Entra a la academia</a></>}
      />
      <main className="home__main">
        <section className="home__video-section" aria-hidden="true">
          <div className="home__video-landscape">
            <video autoPlay loop muted playsInline>
              <source src="/videos/hero-landscape.webm" type="video/webm" />
              <source src="/videos/hero-landscape.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="home__video-portrait">
            <video autoPlay loop muted playsInline>
              <source src="/videos/hero-portrait.webm" type="video/webm" />
              <source src="/videos/hero-portrait.mp4" type="video/mp4" />
            </video>
          </div>
        </section>
        <SolutionsSection items={solutionItems} />
        <MethodologySection
          intro="Te acompañamos durante todo el proceso"
          ctaLabel="Descubre cómo trabajamos"
          ctaHref="#"
          steps={steps}
        />
        <ProjectsSection title="Nuestros trabajos" projects={projects} />
        <HighlightSection
          text="Fórmate en la academia de Studio LXD. Aprende sobre diseño instruccional y herramientas para crear contenidos elearning con nuestros cursos."
          align="center"
        />              
        <section className="home__courses">
          <CardSquare
            href="#"
            color="secondary"
            title="Diseño instruccional"
            description="Aprende a diseñar experiencias de aprendizaje efectivas combinando pedagogía, diseño y tecnología."
            ctaLabel="Ver más sobre diseño instruccional"
            image={{
              src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80&fit=crop',
              alt: 'Personas trabajando en equipo',
            }}
          />
          <CardSquare
            href="#"
            color="tertiary"
            title="Herramientas elearning"
            description="Domina las principales herramientas de autoría para crear contenidos interactivos y atractivos."
            ctaLabel="Ver más sobre herramientas elearning"
            image={{
              src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&q=80&fit=crop',
              alt: 'Persona trabajando con ordenador',
            }}
          />
          <CardSplit
            href="#"
            color="quaternary"
            title="Formación de formadores"
            description="Desarrolla las competencias clave para facilitar sesiones formativas presenciales y online con impacto real."
            ctaLabel="Ver más sobre formación de formadores"
            image={{
              src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80&fit=crop',
              alt: 'Sesión de formación en grupo',
            }}
          />
          <CardSplit
            href="#"
            color="quinary"
            title="Moodle y plataformas LMS"
            description="Configura y personaliza tu plataforma de formación online para ofrecer la mejor experiencia a tus estudiantes."
            ctaLabel="Ver más sobre Moodle y plataformas LMS"
            image={{
              src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80&fit=crop',
              alt: 'Pantalla con interfaz digital',
            }}
          />
        </section>
        <ReviewsSection title="Lo que dice nuestro alumnado" reviews={reviews} />
        <ClientsSection title="Clientes" clients={clients} />
        <ContactSection {...contactArgs} />
      </main>
      <Footer />
    </div>
  );
}
