import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContactSection } from './ContactSection';
import { contactArgs, privacyLabel } from '../../data/home';

const meta: Meta<typeof ContactSection> = {
  title: 'Sections/ContactSection',
  component: ContactSection,
  parameters: {
    layout: 'fullscreen',
  },
  args: contactArgs,
};

export default meta;
type Story = StoryObj<typeof ContactSection>;

export const Default: Story = {};

export const Submitting: Story = {
  args: {
    form: { privacyLabel, submitting: true },
  },
};

export const WithErrors: Story = {
  args: {
    form: {
      privacyLabel,
      errors: [
        'El email es obligatorio.',
        'El mensaje es obligatorio.',
        'Debes aceptar la política de privacidad.',
      ],
    },
  },
};

export const Success: Story = {
  args: {
    form: { privacyLabel, success: true },
  },
};
