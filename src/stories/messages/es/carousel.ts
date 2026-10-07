import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `carousel` (ver `../brandMessagesEs.ts`). */
export const carouselEs: CompleteBrandMessages['carousel'] = {
  label: 'Carrusel',
  roleDescription: 'carrusel',
  track: 'Diapositivas',
  previous: 'Anterior',
  next: 'Siguiente',
  indicator: (index) => `Ir a la diapositiva ${index + 1}`,
  pause: 'Pausar',
  play: 'Reproducir',
  slideStatus: (index, total) => `Diapositiva ${index + 1} de ${total}`,
  slideRoleDescription: 'diapositiva',
};
