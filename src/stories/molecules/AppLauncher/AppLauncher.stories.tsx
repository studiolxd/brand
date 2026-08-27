import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, screen } from 'storybook/test';
import { AppLauncher } from './AppLauncher';
import type { LauncherApp } from './AppLauncher';

const meta: Meta<typeof AppLauncher> = {
  title: 'Molecules/AppLauncher',
  component: AppLauncher,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof AppLauncher>;

const demoApps: LauncherApp[] = [
  { id: 'lmsmarketplace', name: 'LMS Marketplace', url: 'https://lmsmarketplace.slxd.app', accent: '#1a2b4a' },
  { id: 'bricks', name: 'Bricks', url: 'https://bricks.slxd.app', accent: '#e0574c' },
  { id: 'tender', name: 'Tender', url: 'https://tender.slxd.app', accent: '#2f8f5b', isNew: true },
  { id: 'localizia', name: 'Localizia', url: 'https://localizia.slxd.app', accent: '#7c5cf0' },
  { id: 'lrs', name: 'LRS', url: 'https://lrs.slxd.app', accent: '#d99a2b' },
  { id: 'sharescorm', name: 'ShareScorm', url: 'https://sharescorm.slxd.app', accent: '#1f9bb0' },
  { id: 'moodlemcp', name: 'MoodleMCP', url: 'https://moodlemcp.slxd.app', accent: '#c2477f' },
  { id: 'aipricing', name: 'AI Pricing', url: 'https://aipricing.slxd.app', accent: '#4a5568', isNew: true },
];

const labels = { open: 'Abrir launcher de apps', new: 'Nuevo' };

export const Default: Story = {
  args: {
    apps: demoApps,
    labels,
    defaultOpen: true,
  },
};

export const ConAppActual: Story = {
  args: {
    apps: demoApps,
    labels,
    currentAppId: 'bricks',
    defaultOpen: true,
  },
};

export const PocasApps: Story = {
  args: {
    apps: demoApps.slice(0, 3),
    labels,
    defaultOpen: true,
  },
};

export const Cerrado: Story = {
  args: {
    apps: demoApps,
    labels,
  },
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: {
    apps: demoApps.slice(0, 4),
    labels,
    currentAppId: 'tender',
    defaultOpen: true,
  },
};

export const TestContrato: Story = {
  name: 'Test — rol, apertura y app actual',
  tags: ['!dev'],
  args: {
    apps: demoApps.slice(0, 3),
    labels,
    currentAppId: 'bricks',
  },
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', { name: labels.open });
    await expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');

    await userEvent.click(trigger);
    const list = await screen.findByRole('list');
    const links = within(list).getAllByRole('link');
    await expect(links).toHaveLength(3);

    const current = within(list).getByRole('link', { name: /Bricks/ });
    await expect(current).toHaveAttribute('aria-current', 'page');
  },
};
