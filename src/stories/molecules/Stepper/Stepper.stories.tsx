import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Stepper, type StepperStep } from './Stepper';

const ALTA: StepperStep[] = [
  { id: 'perfil', label: 'Perfil' },
  { id: 'organizacion', label: 'Organización' },
  { id: 'logotipo', label: 'Logotipo' },
  { id: 'invitaciones', label: 'Invitaciones' },
];

const CON_DETALLE: StepperStep[] = [
  { id: 'contexto', label: 'Contexto', description: 'Qué se está diseñando' },
  { id: 'criterios', label: 'Criterios', description: 'Qué se va a comparar' },
  { id: 'opciones', label: 'Opciones', description: 'Qué caminos hay' },
  { id: 'decision', label: 'Decisión', description: 'Qué se elige y por qué' },
];

const meta: Meta<typeof Stepper> = {
  title: 'Molecules/Stepper',
  component: Stepper,
  parameters: { layout: 'padded' },
  args: { steps: ALTA, current: 1 },
  argTypes: {
    current: { control: { type: 'number', min: 0, max: 3 } },
    onStepSelect: { table: { disable: true } },
    steps: { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<typeof Stepper>;

/** El alta del hub: cuatro pasos, el segundo en curso. */
export const PorDefecto: Story = {};

/** Recién empezado: nada completado todavía. */
export const PrimerPaso: Story = { name: 'Primer paso', args: { current: 0 } };

/** El último paso: todo el camino recorrido. */
export const UltimoPaso: Story = { name: 'Último paso', args: { current: 3 } };

/** Con una línea de detalle bajo cada etiqueta: el asistente de matriz de diseño. */
export const ConDetalle: Story = { name: 'Con detalle', args: { steps: CON_DETALLE, current: 2 } };

/**
 * Con un solo paso no se pinta nada: un «paso 1 de 1» es ruido. La plantilla
 * puede montar siempre el hueco del progreso y despreocuparse.
 */
export const UnSoloPaso: Story = {
  name: 'Con un solo paso no se pinta',
  args: { steps: [{ id: 'espera', label: 'Sala de espera' }], current: 0 },
};

/** Con `onStepSelect`, los pasos ya hechos son botones. Los pendientes nunca. */
export const VolverAtras: Story = {
  name: 'Volver a un paso hecho',
  render: (args) => {
    const [paso, setPaso] = useState(2);
    return <Stepper {...args} current={paso} onStepSelect={(index) => setPaso(index)} />;
  },
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
};

export const Contrato: Story = {
  name: 'Test — lista ordenada, aria-current y estados',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const lista = canvas.getByRole('list', { name: 'Progreso' });
    await expect(lista.tagName).toBe('OL');
    const items = within(lista).getAllByRole('listitem');
    await expect(items).toHaveLength(4);
    await expect(items[0]).toHaveClass('stepper__step--completed');
    await expect(items[1]).toHaveClass('stepper__step--current');
    await expect(items[3]).toHaveClass('stepper__step--pending');
    await expect(lista.querySelectorAll('[aria-current="step"]')).toHaveLength(1);
    await expect(items[1].querySelector('[aria-current="step"]')).not.toBeNull();
    await expect(canvasElement).toHaveTextContent('Paso 2 de 4');
  },
};

export const ContratoUnSoloPaso: Story = {
  name: 'Test — un solo paso no pinta nada',
  tags: ['!dev'],
  args: UnSoloPaso.args,
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.stepper')).not.toBeInTheDocument();
  },
};

export const ContratoAlcanzables: Story = {
  name: 'Test — solo los pasos hechos son alcanzables',
  tags: ['!dev'],
  args: { current: 2 },
  render: VolverAtras.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const botones = canvas.getAllByRole('button');
    await expect(botones).toHaveLength(2);
    await userEvent.click(botones[0]);
    const items = within(canvas.getByRole('list', { name: 'Progreso' })).getAllByRole('listitem');
    await expect(items[0]).toHaveClass('stepper__step--current');
    await expect(canvas.queryAllByRole('button')).toHaveLength(0);
  },
};
