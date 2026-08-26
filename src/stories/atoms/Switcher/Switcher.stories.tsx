import { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Switcher } from './Switcher';

const meta: Meta<typeof Switcher> = {
  title: 'Por revisar/Atoms/Switcher',
  component: Switcher,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Estado controlado.',
    },
    defaultChecked: {
      control: { type: 'boolean' },
      description: 'Estado inicial sin controlar.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilita el switcher.',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del switcher.',
    },
    onCheckedChange: {
      description: 'Callback al cambiar el estado. Recibe `true` o `false`.',
    },
  },
  args: {
    disabled: false,
    size: 'md',
    'aria-label': 'Toggle',
  },
};

export default meta;
type Story = StoryObj<typeof Switcher>;

/**
 * Test: `forwardRef` + composición con `render` de Base UI (`role="switch"`). El
 * `ref` apunta al Root; las props del elemento compuesto aterrizan ahí; el click
 * alterna `data-checked`.
 */
export const RefForwarding: Story = {
  name: 'Test — forwardRef + render (Root)',
  tags: ['!dev'],
  render: () => {
    const ref = useRef<HTMLElement>(null);
    return (
      <div>
        <Switcher
          ref={ref}
          aria-label="notificaciones"
          render={<span data-slot="sw" aria-describedby="sw-help" />}
        />
        <button
          type="button"
          onClick={() => {
            const p = document.getElementById('sw-probe');
            if (p) p.textContent = ref.current?.getAttribute('role') ?? 'null';
          }}
        >
          probe
        </button>
        <span id="sw-probe" data-testid="sw-probe" />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const sw = canvas.getByRole('switch', { name: 'notificaciones' });
    await expect(sw).toHaveAttribute('data-slot', 'sw');
    await expect(sw).toHaveAttribute('aria-describedby', 'sw-help');
    await expect(sw).toHaveAttribute('data-unchecked');
    await userEvent.click(sw);
    await expect(sw).toHaveAttribute('data-checked');
    // el ref apunta al Root interactivo (role="switch")
    await userEvent.click(canvas.getByRole('button', { name: 'probe' }));
    await expect(canvas.getByTestId('sw-probe')).toHaveTextContent('switch');
  },
};

export const Default: Story = {
  name: 'Off',
};

export const On: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  name: 'Disabled (off)',
  args: { disabled: true },
};

export const DisabledOn: Story = {
  name: 'Disabled (on)',
  args: { disabled: true, defaultChecked: true },
};

export const FocusVisible: Story = {
  name: 'Focus visible',
  parameters: { pseudo: { focusVisible: true } },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      <Switcher size="sm" aria-label="Small" defaultChecked />
      <Switcher size="md" aria-label="Medium" defaultChecked />
      <Switcher size="lg" aria-label="Large" defaultChecked />
    </div>
  ),
};
