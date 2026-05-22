import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';
import type { IconName } from './Icon';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  args: { name: 'chevron', size: 'md' },
  argTypes: {
    name: {
      control: 'select',
      options: ['arrow', 'chevron', 'close', 'dot', 'eye', 'eye-off', 'folder', 'search'] satisfies IconName[],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllIcons: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
      {(['arrow', 'chevron', 'close', 'dot', 'eye', 'eye-off', 'folder', 'search'] satisfies IconName[]).map((name) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <Icon {...args} name={name} />
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle, #595959)' }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-end' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <Icon {...args} size={size} />
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle, #595959)' }}>{size}</span>
        </div>
      ))}
    </div>
  ),
};
