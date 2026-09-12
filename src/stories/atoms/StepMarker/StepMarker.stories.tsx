import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { StepMarker } from './StepMarker';
import type { StepMarkerState, StepMarkerTone } from './StepMarker';
import { SOLO_OSCURO } from '../../utils/chromaticModes';

const meta = {
  title: 'Atoms/StepMarker',
  component: StepMarker,
  parameters: { layout: 'padded' },
  args: { state: 'current', count: 2 },
  argTypes: { className: { table: { disable: true } } },
} satisfies Meta<typeof StepMarker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PorDefecto: Story = {};

const STATES: StepMarkerState[] = ['pending', 'current', 'done', 'neutral'];

/** `done` siempre muestra el check, aunque se le pase `count`: el estado manda sobre el contenido. */
export const Estados: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      {STATES.map((state) => (
        <StepMarker key={state} {...args} state={state} count={3} />
      ))}
    </div>
  ),
};

const TONES: StepMarkerTone[] = [
  'primary', 'accent-1', 'accent-2', 'support-1', 'support-2', 'danger', 'success', 'neutral',
];

/** El tono solo pinta los estados rellenos: `pending` es siempre hueco, sin tono. */
export const Tonos: Story = {
  args: { state: 'neutral' },
  render: (args) => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
      {TONES.map((tone) => (
        <StepMarker key={tone} {...args} tone={tone} count={1} />
      ))}
    </div>
  ),
};

export const Tallas: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <StepMarker {...args} size="sm" />
      <StepMarker {...args} size="md" />
    </div>
  ),
};

/** Con `icon` en vez de `count`: el paso que trae un glifo en lugar de una cifra. */
export const ConIcono: Story = {
  args: { state: 'neutral', icon: 'settings', count: undefined },
};

export const Contrato: Story = {
  name: 'Test — cuadrada, aria-hidden y contenido por estado',
  tags: ['!dev'],
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      <StepMarker state="done" count={1} />
      <StepMarker state="pending" count={2} />
      <StepMarker state="neutral" icon="settings" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const markers = canvasElement.querySelectorAll('.step-marker');
    await expect(markers.length).toBe(3);
    for (const marker of markers) {
      await expect(marker.getAttribute('aria-hidden')).toBe('true');
      const r = marker.getBoundingClientRect();
      await expect(Math.round(r.width)).toBe(Math.round(r.height));
    }
    const done = canvasElement.querySelector('.step-marker--state-done');
    await expect(done?.querySelector('svg')).not.toBeNull();
    const pending = canvasElement.querySelector('.step-marker--state-pending');
    await expect(pending?.textContent).toBe('2');
  },
};

/**
 * Solo `primary` y `neutral` se invierten en oscuro (el prusia es el lienzo); el resto son
 * colores saturados que ya contrastan en cualquier superficie.
 */
export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark', chromatic: SOLO_OSCURO },
  render: (args) => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
      {TONES.map((tone) => (
        <StepMarker key={tone} {...args} state="neutral" tone={tone} count={1} />
      ))}
    </div>
  ),
};
