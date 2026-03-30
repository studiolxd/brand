import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hamburger } from './Hamburger';

function InteractiveHamburger(props: React.ComponentProps<typeof Hamburger>) {
  const [isOpen, setIsOpen] = useState(props.isOpen ?? false);
  return (
    <Hamburger
      {...props}
      isOpen={isOpen}
      onClick={() => setIsOpen(!isOpen)}
    />
  );
}

const meta: Meta<typeof Hamburger> = {
  title: 'Atoms/Hamburger',
  component: Hamburger,
  parameters: { layout: 'padded' },
  argTypes: {
    isOpen: { control: { type: 'boolean' } },
    label: { control: { type: 'text' } },
  },
  args: {
    isOpen: false,
    label: 'Menu',
  },
  render: (args) => <InteractiveHamburger {...args} />,
};

export default meta;
type Story = StoryObj<typeof Hamburger>;

export const Default: Story = {};

export const Open: Story = {
  args: { isOpen: true },
};

export const Dark: Story = {
  decorators: [(Story) => <div className="dark" style={{ padding: '1rem' }}><Story /></div>],
  globals: { backgrounds: { value: 'dark' } },
};

export const DarkOpen: Story = {
  args: { isOpen: true },
  decorators: [(Story) => <div className="dark" style={{ padding: '1rem' }}><Story /></div>],
  globals: { backgrounds: { value: 'dark' } },
};
