import { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Por revisar/Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Estado controlado — marcado, desmarcado o indeterminado.',
    },
    defaultChecked: {
      control: { type: 'boolean' },
      description: 'Estado inicial sin controlar.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilita el checkbox.',
    },
    onCheckedChange: {
      description: 'Callback al cambiar el estado. Recibe `true`, `false` o `"indeterminate"`.',
    },
  },
  args: {
    disabled: false,
    'aria-label': 'Checkbox',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/**
 * Test: `forwardRef` + composición con `render` de Base UI (`role="checkbox"`). El
 * `ref` apunta al Root; las props del elemento compuesto (`data-*`,
 * `aria-describedby`) aterrizan ahí; el click alterna `data-checked`.
 */
export const RefForwarding: Story = {
  name: 'Test — forwardRef + render (Root)',
  tags: ['!dev'],
  render: () => {
    const ref = useRef<HTMLElement>(null);
    return (
      <div>
        <Checkbox
          ref={ref}
          aria-label="acepto"
          render={<span data-slot="cb" aria-describedby="cb-help" />}
        />
        <button
          type="button"
          onClick={() => {
            const p = document.getElementById('cb-probe');
            if (p) p.textContent = ref.current?.getAttribute('role') ?? 'null';
          }}
        >
          probe
        </button>
        <span id="cb-probe" data-testid="cb-probe" />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const cb = canvas.getByRole('checkbox', { name: 'acepto' });
    await expect(cb).toHaveAttribute('data-slot', 'cb');
    await expect(cb).toHaveAttribute('aria-describedby', 'cb-help');
    await expect(cb).toHaveAttribute('data-unchecked');
    await userEvent.click(cb);
    await expect(cb).toHaveAttribute('data-checked');
    // el ref apunta al Root interactivo (role="checkbox")
    await userEvent.click(canvas.getByRole('button', { name: 'probe' }));
    await expect(canvas.getByTestId('cb-probe')).toHaveTextContent('checkbox');
  },
};

export const Default: Story = {
  name: 'Unchecked',
};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { checked: 'indeterminate' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  name: 'Disabled checked',
  args: { disabled: true, defaultChecked: true },
};

/** Navega con Tab hasta el checkbox para verificar el focus ring */
export const FocusVisible: Story = {
  name: 'Focus visible',
  parameters: { pseudo: { focusVisible: true } },
};
