import type { Meta, StoryObj } from '@storybook/react-vite';
import { ClientsSection } from './ClientsSection';

const meta: Meta<typeof ClientsSection> = {
  title: 'Secciones/ClientsSection',
  excludeStories: /^[a-z]/,
  component: ClientsSection,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof ClientsSection>;

export const clients = [
  { id: 'junta-de-andalucia', name: 'Junta de Andalucía', logo: '/clients/logo-junta-de-andalucia.png' },
  { id: 'grupo-mayo', name: 'Grupo Mayo', logo: '/clients/logo-grupo-mayo.png' },
  { id: 'randstad', name: 'Randstad', logo: '/clients/logo-randstad.png' },
  { id: 'meridianos', name: 'Meridianos', logo: '/clients/logo-meridianos.png' },
  { id: 'linkup-coaching', name: 'Linkup Coaching', logo: '/clients/logo-linkup-coaching.png' },
  { id: 'design-training', name: 'Design Training', logo: '/clients/logo-design-training.png' },
  { id: 'sawy', name: 'Sawy', logo: '/clients/logo-sawy.png' },
];

export const Default: Story = {
  args: {
    title: 'Hemos trabajado junto a...',
    clients,
  },
};
