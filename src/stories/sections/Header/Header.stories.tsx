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
    dark: { control: { type: 'boolean' } },
    logoHref: { control: { type: 'text' } },
    navLabel: { control: { type: 'text' } },
  },
  args: {
    navItems,
    featuredLink,
    actions: sampleActions,
    logoHref: '/',
    navLabel: 'Main navigation',
    dark: false,
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
  args: { dark: true },
};
