import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './Collapsible';
import { Paragraph } from '../Paragraph/Paragraph';
import { Stack } from '../Stack/Stack';

const meta: Meta<typeof Collapsible> = {
  title: 'Atoms/Collapsible',
  component: Collapsible,
  parameters: { layout: 'padded' },
  argTypes: {
    defaultOpen: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

const detalle = (
  <Paragraph>
    El curso se publica con la matriculación abierta y las fechas de inicio y fin ya fijadas.
    Los cambios posteriores no afectan a quien ya se ha matriculado.
  </Paragraph>
);

/** Cerrado de salida: el disparador dice qué hay dentro. */
export const PorDefecto: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger>Detalles de publicación</CollapsibleTrigger>
      <CollapsibleContent>{detalle}</CollapsibleContent>
    </Collapsible>
  ),
};

/** `defaultOpen` lo deja abierto al montar. */
export const Abierto: Story = {
  render: () => (
    <Collapsible defaultOpen>
      <CollapsibleTrigger>Detalles de publicación</CollapsibleTrigger>
      <CollapsibleContent>{detalle}</CollapsibleContent>
    </Collapsible>
  ),
};

/** Controlado: el estado lo lleva el consumidor con `open` + `onOpenChange`. */
export const Controlado: Story = {
  render: function Controlado() {
    const [abierto, setAbierto] = useState(false);
    return (
      <Stack>
        <Collapsible open={abierto} onOpenChange={setAbierto}>
          <CollapsibleTrigger>Detalles de publicación</CollapsibleTrigger>
          <CollapsibleContent>{detalle}</CollapsibleContent>
        </Collapsible>
        <span>Estado: {abierto ? 'abierto' : 'cerrado'}</span>
      </Stack>
    );
  },
};

/** Sin chevron, para cuando el disparador ya se lee como tal. */
export const SinChevron: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger chevron={false}>Ver detalles</CollapsibleTrigger>
      <CollapsibleContent>{detalle}</CollapsibleContent>
    </Collapsible>
  ),
};

export const Deshabilitado: Story = {
  render: () => (
    <Collapsible disabled>
      <CollapsibleTrigger>Detalles de publicación</CollapsibleTrigger>
      <CollapsibleContent>{detalle}</CollapsibleContent>
    </Collapsible>
  ),
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  render: () => (
    <Collapsible defaultOpen>
      <CollapsibleTrigger>Detalles de publicación</CollapsibleTrigger>
      <CollapsibleContent>{detalle}</CollapsibleContent>
    </Collapsible>
  ),
};

export const TestAbreYCierra: Story = {
  name: 'Test — el disparador abre y cierra el panel',
  tags: ['!dev'],
  render: () => (
    <Collapsible>
      <CollapsibleTrigger>Detalles</CollapsibleTrigger>
      <CollapsibleContent>Contenido plegado</CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const disparador = canvas.getByRole('button', { name: 'Detalles' });

    await expect(disparador).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(disparador);
    await expect(disparador).toHaveAttribute('aria-expanded', 'true');
    await expect(canvas.getByText('Contenido plegado')).toBeVisible();
  },
};
