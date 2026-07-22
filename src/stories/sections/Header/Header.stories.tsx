import { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';
import { Button } from '../../atoms/Button/Button';
import { Select } from '../../atoms/Select/Select';
import { DEFAULT_NAV_ITEMS, DEFAULT_FEATURED_LINK } from '../../constants/navigation';

export const navItems = DEFAULT_NAV_ITEMS;
export const featuredLink = DEFAULT_FEATURED_LINK;

const langOptions = [
  { value: 'es', label: 'ES' },
  { value: 'en', label: 'EN' },
];

const sampleActions = (
  <>
    <Select options={langOptions} defaultValue="es" />
    <Button variant="primary">Entra a la academia</Button>
  </>
);

const meta: Meta<typeof Header> = {
  title: 'Sections/Header',
  excludeStories: /^[a-z]/,
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    logoHref: { control: { type: 'text' } },
    navLabel: { control: { type: 'text' } },
  },
  args: {
    navItems,
    featuredLink,
    actions: sampleActions,
    logoHref: '/',
    navLabel: 'Main navigation',
  },
  decorators: [
    (Story) => (
      <div style={{ paddingBlockStart: 'var(--header-height-overlay)', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {};

export const WithoutFeaturedLink: Story = {
  args: { featuredLink: undefined },
};

export const WithoutActions: Story = {
  args: { actions: undefined },
};

export const Dark: Story = {
  name: 'Dark (root-level, html.dark)',
  render: (args) => {
    // Header no tiene prop dark — reacciona a .surface-dark/[data-theme="dark"]/
    // html.dark igual que el resto del sistema. Activamos html.dark mientras
    // esta story está montada para demostrarlo.
    useEffect(() => {
      document.documentElement.classList.add('dark');
      return () => document.documentElement.classList.remove('dark');
    }, []);
    return <Header {...args} />;
  },
};
