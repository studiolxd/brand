import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `colorPicker` (ver `../brandMessagesEs.ts`). */
export const colorPickerEs: CompleteBrandMessages['colorPicker'] = {
  trigger: 'Elegir color',
  value: (hex) => `Color actual: ${hex}`,
  empty: 'Sin color',
  dialog: 'Selector de color',
  area: 'Saturación y brillo',
  areaDescription: 'deslizador bidimensional',
  areaValue: (saturation, brightness) => `Saturación ${saturation} %, brillo ${brightness} %`,
  hue: 'Tono',
  alpha: 'Opacidad',
  hex: 'Hexadecimal',
  presets: 'Colores predefinidos',
  clear: 'Quitar color',
};
