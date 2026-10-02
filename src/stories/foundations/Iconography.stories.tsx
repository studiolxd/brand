import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconSafeArea } from './IconCatalog';

const meta: Meta<typeof IconSafeArea> = {
  title: 'Foundations/Iconografía',
  component: IconSafeArea,
};
export default meta;

type Story = StoryObj<typeof IconSafeArea>;

/**
 * Todo el catálogo sobre la retícula de 24 con el área útil de 18 (de 3 a 21)
 * rellena detrás: lo que se sale de la mancha, o no la llena, se ve sin medir.
 */
export const AreaUtil: Story = {
  name: 'Área útil',
};
