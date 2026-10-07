import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `themeSwitcher` (ver `../brandMessagesEs.ts`). */
export const themeSwitcherEs: CompleteBrandMessages['themeSwitcher'] = {
  group: 'Tema',
  light: 'Claro',
  dark: 'Oscuro',
  system: 'Sistema',
  trigger: (group, theme) => `${group}: ${theme}`,
};
