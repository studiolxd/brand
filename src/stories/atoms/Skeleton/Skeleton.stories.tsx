import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Una línea',
  args: {},
  decorators: [(Story) => <div style={{ maxWidth: '24rem' }}><Story /></div>],
};

export const Parrafo: Story = {
  name: 'Párrafo',
  args: {},
  render: () => (
    <div style={{ display: 'grid', gap: '0.5rem', maxWidth: '24rem' }}>
      <Skeleton />
      <Skeleton />
      <Skeleton width="60%" />
    </div>
  ),
};

export const Ficha: Story = {
  name: 'Ficha con avatar',
  args: {},
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', maxWidth: '24rem' }}>
      <Skeleton circle height="2.5rem" />
      <div style={{ display: 'grid', gap: '0.4rem', flex: 1 }}>
        <Skeleton width="40%" />
        <Skeleton width="70%" />
      </div>
    </div>
  ),
};
