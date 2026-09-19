import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { RecurrenceField } from './RecurrenceField';
import { buildRecurrenceRule, parseRecurrenceRule, type RecurrenceValue } from './recurrenceRule';
import { Code } from '../../atoms/Code/Code';
import { SOLO_OSCURO } from '../../utils/chromaticModes';

const meta = {
  title: 'Molecules/RecurrenceField',
  component: RecurrenceField,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxInlineSize: '32rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RecurrenceField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** El editor es controlado: la story guarda el valor, como hará el formulario. */
function Editor({ inicial, ...props }: { inicial: RecurrenceValue | null } & Partial<React.ComponentProps<typeof RecurrenceField>>) {
  const [value, setValue] = useState<RecurrenceValue | null>(inicial);
  return (
    <>
      <RecurrenceField {...props} value={value} onValueChange={setValue} />
      <p>
        <Code>{buildRecurrenceRule(value) || '(sin regla)'}</Code>
      </p>
    </>
  );
}

export const PorDefecto: Story = {
  args: { value: null, onValueChange: () => {} },
  render: () => <Editor inicial={null} legend="Repetición" />,
};

export const CadaSemana: Story = {
  name: 'Cada dos semanas, lunes y jueves',
  args: { value: null, onValueChange: () => {} },
  render: () => (
    <Editor inicial={parseRecurrenceRule('FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,TH')} legend="Repetición" />
  ),
};

export const HastaFecha: Story = {
  name: 'Hasta una fecha',
  args: { value: null, onValueChange: () => {} },
  render: () => (
    <Editor inicial={parseRecurrenceRule('FREQ=MONTHLY;UNTIL=20261231T235959Z')} legend="Repetición" />
  ),
};

export const PorNumeroDeVeces: Story = {
  name: 'Tras un número de veces',
  args: { value: null, onValueChange: () => {} },
  render: () => (
    <Editor inicial={parseRecurrenceRule('FREQ=DAILY;COUNT=10')} legend="Repetición" />
  ),
};

export const SinTitulo: Story = {
  name: 'Sin título de grupo',
  args: { value: null, onValueChange: () => {} },
  render: () => <Editor inicial={parseRecurrenceRule('FREQ=WEEKLY;BYDAY=WE')} />,
};

export const EnIngles: Story = {
  name: 'La semana empieza en domingo',
  args: { value: null, onValueChange: () => {} },
  render: () => (
    <Editor
      inicial={parseRecurrenceRule('FREQ=WEEKLY;BYDAY=SU,SA')}
      legend="Repetición"
      locale="en-US"
      weekStartsOn="sunday"
    />
  ),
};

export const Deshabilitado: Story = {
  args: { value: null, onValueChange: () => {} },
  render: () => (
    <Editor inicial={parseRecurrenceRule('FREQ=WEEKLY;BYDAY=MO,TH')} legend="Repetición" disabled />
  ),
};

export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  args: { value: null, onValueChange: () => {} },
  render: () => (
    <Editor inicial={parseRecurrenceRule('FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,TH')} legend="Repetición" />
  ),
  parameters: { surface: 'dark', chromatic: SOLO_OSCURO },
};

export const TestDiasSoloEnSemanal: Story = {
  name: 'Test — los días solo salen en la frecuencia semanal',
  tags: ['!dev'],
  args: { value: null, onValueChange: () => {} },
  render: () => <Editor inicial={parseRecurrenceRule('FREQ=WEEKLY;BYDAY=MO')} legend="Repetición" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('button', { name: 'lunes' })).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('combobox', { name: 'Frecuencia' }));
    await userEvent.click(await within(document.body).findByRole('option', { name: 'Cada mes' }));

    expect(canvas.queryByRole('button', { name: 'lunes' })).not.toBeInTheDocument();
    expect(canvas.getByText('FREQ=MONTHLY')).toBeInTheDocument();
  },
};
