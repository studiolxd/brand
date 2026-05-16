import type { Meta, StoryObj } from '@storybook/react-vite';
import { OrgSwitcher } from './OrgSwitcher';

const meta: Meta<typeof OrgSwitcher> = {
  title: 'Molecules/OrgSwitcher',
  component: OrgSwitcher,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof OrgSwitcher>;

const orgs = [
  { id: 'studio', name: 'Studio LXD' },
  { id: 'acme', name: 'Acme Corp' },
  { id: 'vertex', name: 'Vertex Design' },
];

export const Default: Story = {
  args: {
    current: orgs[0],
    organizations: orgs,
    onOrgChange: (id) => console.log('org changed:', id),
  },
};

export const ConLogo: Story = {
  args: {
    current: {
      id: 'studio',
      name: 'Studio LXD',
      logoUrl: 'https://placehold.co/32x32/1a2b4a/ffffff?text=S',
    },
    organizations: [
      {
        id: 'studio',
        name: 'Studio LXD',
        logoUrl: 'https://placehold.co/32x32/1a2b4a/ffffff?text=S',
      },
      {
        id: 'acme',
        name: 'Acme Corp',
        logoUrl: 'https://placehold.co/32x32/e63946/ffffff?text=A',
      },
    ],
    onOrgChange: (id) => console.log('org changed:', id),
  },
};

export const OrganizacionUnica: Story = {
  args: {
    current: orgs[0],
    organizations: [orgs[0]],
    onOrgChange: (id) => console.log('org changed:', id),
  },
};
