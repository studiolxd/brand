import type { CompleteBrandMessages } from '../src/stories/messages/BrandMessages';
import { brandMessagesEs } from '../src/stories/messages/brandMessagesEs';

/**
 * El catálogo castellano que monta el Storybook.
 *
 * No se escribe aquí: es el respaldo castellano que lleva el paquete
 * (`src/stories/messages/brandMessagesEs.ts`, D5), reexportado para no tener
 * dos copias que se desincronicen. Solo cambia lo que en el Storybook es de
 * Studio LXD y en el paquete no puede serlo: el nombre accesible del logotipo,
 * que en el respaldo es un «Ir al inicio» sin marca.
 *
 * Que el Storybook monte el catálogo entero hace que sus stories no disparen
 * el aviso de «falta un texto»: el aviso es para las apps.
 */
export const brandMessagesFixture: CompleteBrandMessages = {
  ...brandMessagesEs,
  appHeader: { logo: 'Studio LXD — ir al inicio' },
  siteHeader: { logo: 'Studio LXD — ir al inicio' },
};
