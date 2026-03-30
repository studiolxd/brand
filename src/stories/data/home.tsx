/**
 * Datos de contenido de la página Home.
 * Importado tanto por Home.tsx como por las stories de cada sección.
 */

export const reviews = [
  {
    id: 'ana-garcia',
    photo: 'https://i.pravatar.cc/120?img=47',
    author: 'Ana García',
    role: 'Diseñadora instruccional',
    quote: 'El curso cambió completamente mi forma de diseñar formaciones. Ahora entiendo la pedagogía detrás de cada decisión.',
  },
  {
    id: 'carlos-martinez',
    photo: 'https://i.pravatar.cc/120?img=12',
    author: 'Carlos Martínez',
    role: 'Responsable de formación',
    quote: 'Muy práctico y directo al grano. Aprendí más en unas semanas que en años de prueba y error por mi cuenta.',
  },
  {
    id: 'laura-sanchez',
    photo: 'https://i.pravatar.cc/120?img=32',
    author: 'Laura Sánchez',
    role: 'Técnica de RRHH',
    quote: 'El acompañamiento del equipo de Studio LXD durante todo el proceso fue clave. No me sentí sola en ningún momento.',
  },
  {
    id: 'miguel-torres',
    photo: 'https://i.pravatar.cc/120?img=68',
    author: 'Miguel Torres',
    role: 'Consultor de e-learning',
    quote: 'Herramientas reales, casos reales. Exactamente lo que necesitaba para dar el salto profesional que buscaba.',
  },
  {
    id: 'sofia-ruiz',
    photo: 'https://i.pravatar.cc/120?img=5',
    author: 'Sofía Ruiz',
    role: 'Coordinadora de formación',
    quote: 'El enfoque centrado en el aprendizaje me ayudó a replantear todos mis proyectos. Una visión totalmente nueva.',
  },
  {
    id: 'pablo-jimenez',
    photo: 'https://i.pravatar.cc/120?img=15',
    author: 'Pablo Jiménez',
    role: 'Desarrollador instruccional',
    quote: 'Muy buena relación entre teoría y práctica. Pude aplicar lo aprendido desde el primer módulo en mi trabajo diario.',
  },
  {
    id: 'elena-moreno',
    photo: 'https://i.pravatar.cc/120?img=9',
    author: 'Elena Moreno',
    role: 'Formadora corporativa',
    quote: 'El programa me dio el marco conceptual que me faltaba. Ahora diseño con mucha más seguridad y criterio.',
  },
  {
    id: 'david-lopez',
    photo: 'https://i.pravatar.cc/120?img=53',
    author: 'David López',
    role: 'Técnico de formación',
    quote: 'Superó mis expectativas. El contenido está muy bien estructurado y el equipo resuelve dudas con rapidez y claridad.',
  },
];

export const projects = [
  {
    id: 'onboarding-randstad',
    category: 'E-learning',
    tagVariant: 'secondary' as const,
    photo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80&fit=crop',
    title: 'Onboarding digital para Randstad',
    description: 'Diseñamos un itinerario de incorporación 100% online para 1.200 nuevos empleados al año.',
  },
  {
    id: 'liderazgo-retail',
    category: 'Formación presencial',
    tagVariant: 'tertiary' as const,
    photo: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80&fit=crop',
    title: 'Taller de liderazgo para mandos intermedios',
    description: 'Programa presencial de tres módulos para 80 responsables de equipo de una empresa del sector retail.',
  },
  {
    id: 'catalogo-grupo-mayo',
    category: 'Diseño instruccional',
    tagVariant: 'quaternary' as const,
    photo: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80&fit=crop',
    title: 'Rediseño del catálogo formativo de Grupo Mayo',
    description: 'Auditamos y rediseñamos desde cero un catálogo de 40 cursos desactualizados.',
  },
  {
    id: 'moodle-junta-andalucia',
    category: 'Plataformas LMS',
    tagVariant: 'quinary' as const,
    photo: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80&fit=crop',
    title: 'Implantación de Moodle para la Junta de Andalucía',
    description: 'Configuramos y personalizamos una instancia de Moodle para 15.000 usuarios.',
  },
  {
    id: 'estrategia-linkup',
    category: 'Consultoría',
    tagVariant: 'primary' as const,
    photo: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80&fit=crop',
    title: 'Estrategia L&D para Linkup Coaching',
    description: 'Acompañamos a su equipo en la definición de una estrategia de aprendizaje alineada con el plan de negocio.',
  },
  {
    id: 'compliance-elearning',
    category: 'E-learning',
    tagVariant: 'secondary' as const,
    photo: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80&fit=crop',
    title: 'Curso de compliance y prevención de riesgos',
    description: 'Módulo e-learning con escenarios de decisión ramificados para garantizar la comprensión real de la normativa.',
  },
  {
    id: 'guia-formadores-sawy',
    category: 'Diseño instruccional',
    tagVariant: 'quaternary' as const,
    photo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80&fit=crop',
    title: 'Guía didáctica para formadores internos de Sawy',
    description: 'Creamos una guía metodológica para que el equipo interno pudiera replicar y actualizar los contenidos.',
  },
  {
    id: 'migracion-lms',
    category: 'Plataformas LMS',
    tagVariant: 'quinary' as const,
    photo: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80&fit=crop',
    title: 'Migración de TalentLMS a Canvas',
    description: 'Gestionamos la migración completa de contenidos, usuarios y datos históricos.',
  },
];

export const clients = [
  { id: 'junta-de-andalucia', name: 'Junta de Andalucía', logo: '/clients/logo-junta-de-andalucia.png' },
  { id: 'grupo-mayo', name: 'Grupo Mayo', logo: '/clients/logo-grupo-mayo.png' },
  { id: 'randstad', name: 'Randstad', logo: '/clients/logo-randstad.png' },
  { id: 'meridianos', name: 'Meridianos', logo: '/clients/logo-meridianos.png' },
  { id: 'linkup-coaching', name: 'Linkup Coaching', logo: '/clients/logo-linkup-coaching.png' },
  { id: 'design-training', name: 'Design Training', logo: '/clients/logo-design-training.png' },
  { id: 'sawy', name: 'Sawy', logo: '/clients/logo-sawy.png' },
];

export const steps = [
  { text: 'Preguntamos para conocer vuestras necesidades.' },
  { text: 'Colaboramos con vuestro equipo quienes tienen el know how de la organización.' },
  { text: 'Asesoramos sobre las mejores soluciones.' },
  { text: 'Acompañamos hasta implementar la solución.' },
];

export const solutionItems = [
  {
    href: '#',
    color: 'secondary' as const,
    title: 'Contenidos elearning',
    description: 'Diseñamos contenidos multimedia interactivos para formación online, utilizando estándares como SCORM y xAPI.',
    ctaLabel: 'Ver más sobre contenidos elearning',
  },
  {
    href: '#',
    color: 'tertiary' as const,
    title: 'Plataformas elearning',
    description: 'Desarrollamos plataformas elearning adaptadas a tu identidad visual y centradas en las personas usuarias para lograr una experiencia de aprendizaje gratificante.',
    ctaLabel: 'Ver más sobre plataformas elearning',
  },
];

export const privacyLabel = (
  <>
    He leído la{' '}
    <a href="#">política de privacidad</a>
  </>
);

export const contactArgs = {
  title: '¿Hablamos?',
  form: {
    privacyLabel,
    emailPlaceholder: 'Escribe aquí tu correo electrónico',
    messagePlaceholder: 'Cuéntanos brevemente qué necesitas',
    buttonLabel: 'Envía el mensaje',
    submittingLabel: 'Enviando mensaje...',
    successMessage: '¡Gracias por tu mensaje! Nos pondremos en contacto contigo lo antes posible.',
  },
  whatsappTitle: '¿Mejor por WhatsApp?',
  whatsappLabel: 'Escríbenos',
  whatsappHref: 'https://wa.me/34600000000',
};
