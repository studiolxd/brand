import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `orgChart` (ver `../brandMessagesEs.ts`). */
export const orgChartEs: CompleteBrandMessages['orgChart'] = {
  label: 'Organigrama',
  managers: 'Responsables',
  members: 'Equipo',
  noManagers: 'Sin responsable',
  noMembers: 'Sin equipo',
  collapse: (name) => `Plegar ${name}`,
  expand: (name) => `Desplegar ${name}`,
  zoomIn: 'Acercar',
  zoomOut: 'Alejar',
  zoomReset: 'Tamaño natural',
};
