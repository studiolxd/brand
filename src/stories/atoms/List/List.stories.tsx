import type { Meta, StoryObj } from '@storybook/react-vite';
import { List } from './List';

const meta: Meta<typeof List> = {
  title: 'Atoms/List',
  component: List,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['unordered', 'ordered'],
      description: 'Tipo de lista: con viñetas o numerada.',
    },
  },
  args: {
    type: 'unordered',
    children: (
      <>
        <li>Primer elemento de la lista</li>
        <li>Segundo elemento de la lista</li>
        <li>Tercer elemento de la lista</li>
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Unordered: Story = {};

export const Ordered: Story = {
  args: { type: 'ordered' },
};

export const Dark: Story = {
  decorators: [(Story) => <div className="dark" style={{ padding: '1rem' }}><Story /></div>],
  globals: {
    backgrounds: { value: 'dark' },
  },
};
