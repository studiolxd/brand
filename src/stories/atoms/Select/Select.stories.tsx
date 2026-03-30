import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const options = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
];

const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    dark: { table: { disable: true } },
  },
  args: {
    options,
    placeholder: 'Seleccionar…',
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: 'es' },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'es' },
};

export const Dark: Story = {
  name: 'Oscuro',
  args: { defaultValue: 'es' },
  decorators: [(Story) => <div className="dark" style={{ padding: '1rem' }}><Story /></div>],
  globals: {
    backgrounds: { value: 'dark' },
  },
};

export const DarkDisabled: Story = {
  name: 'Oscuro deshabilitado',
  args: { disabled: true, defaultValue: 'es' },
  decorators: [(Story) => <div className="dark" style={{ padding: '1rem' }}><Story /></div>],
  globals: {
    backgrounds: { value: 'dark' },
  },
};
