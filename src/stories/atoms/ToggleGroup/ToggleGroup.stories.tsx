import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { ToggleGroup } from './ToggleGroup';
import { Toggle } from '../Toggle/Toggle';
import { Icon } from '../Icon/Icon';
import { Stack } from '../Stack/Stack';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Atoms/ToggleGroup',
  component: ToggleGroup,
  parameters: { layout: 'padded' },
  argTypes: {
    multiple: { control: { type: 'boolean' } },
    orientation: { control: { type: 'inline-radio' }, options: ['horizontal', 'vertical'] },
    size: { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'] },
    disabled: { control: { type: 'boolean' } },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

/** Exclusivo: elegir un plan suelta el anterior. */
export const PorDefecto: Story = {
  render: () => (
    <ToggleGroup defaultValue={['mensual']} aria-label="Periodo de facturación">
      <Toggle value="mensual">Mensual</Toggle>
      <Toggle value="anual">Anual</Toggle>
    </ToggleGroup>
  ),
};

/** `multiple` deja varios pulsados a la vez: filtros que se suman. */
export const Multiple: Story = {
  render: () => (
    <ToggleGroup multiple defaultValue={['borradores']} aria-label="Filtros">
      <Toggle value="borradores">Borradores</Toggle>
      <Toggle value="publicados">Publicados</Toggle>
      <Toggle value="archivados">Archivados</Toggle>
    </ToggleGroup>
  ),
};

/** Controlado: el valor viaja siempre como lista, también en exclusivo. */
export const Controlado: Story = {
  render: function Controlado() {
    const [vista, setVista] = useState<string[]>(['cuadricula']);
    return (
      <Stack>
        <ToggleGroup value={vista} onValueChange={setVista} aria-label="Vista del listado">
          <Toggle value="cuadricula" iconOnly aria-label="Cuadrícula"><Icon name="grid" size="sm" /></Toggle>
          <Toggle value="lista" iconOnly aria-label="Lista"><Icon name="dashboard" size="sm" /></Toggle>
        </ToggleGroup>
        <span>Vista: {vista[0] ?? '—'}</span>
      </Stack>
    );
  },
};

/** La talla la reparte el grupo: no hay que repetirla botón a botón. */
export const Tallas: Story = {
  render: () => (
    <Stack>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <ToggleGroup key={size} size={size} defaultValue={['dia']} aria-label={`Periodo (${size})`}>
          <Toggle value="dia">Día</Toggle>
          <Toggle value="semana">Semana</Toggle>
          <Toggle value="mes">Mes</Toggle>
        </ToggleGroup>
      ))}
    </Stack>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ToggleGroup orientation="vertical" defaultValue={['izquierda']} aria-label="Alineación">
      <Toggle value="izquierda">Izquierda</Toggle>
      <Toggle value="centro">Centro</Toggle>
      <Toggle value="derecha">Derecha</Toggle>
    </ToggleGroup>
  ),
};

export const Deshabilitado: Story = {
  render: () => (
    <ToggleGroup disabled defaultValue={['anual']} aria-label="Periodo de facturación">
      <Toggle value="mensual">Mensual</Toggle>
      <Toggle value="anual">Anual</Toggle>
    </ToggleGroup>
  ),
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  render: () => (
    <ToggleGroup defaultValue={['anual']} aria-label="Periodo de facturación">
      <Toggle value="mensual">Mensual</Toggle>
      <Toggle value="anual">Anual</Toggle>
    </ToggleGroup>
  ),
};

export const TestExclusivo: Story = {
  name: 'Test — exclusivo: elegir uno suelta el anterior',
  tags: ['!dev'],
  render: () => (
    <ToggleGroup defaultValue={['mensual']} aria-label="Periodo de facturación">
      <Toggle value="mensual">Mensual</Toggle>
      <Toggle value="anual">Anual</Toggle>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const mensual = canvas.getByRole('button', { name: 'Mensual' });
    const anual = canvas.getByRole('button', { name: 'Anual' });

    await expect(mensual).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(anual);
    await expect(anual).toHaveAttribute('aria-pressed', 'true');
    await expect(mensual).toHaveAttribute('aria-pressed', 'false');
  },
};

export const TestTeclado: Story = {
  name: 'Test — el grupo es una parada de tabulación y se recorre con flechas',
  tags: ['!dev'],
  render: () => (
    <ToggleGroup multiple aria-label="Filtros">
      <Toggle value="a">Borradores</Toggle>
      <Toggle value="b">Publicados</Toggle>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const grupo = canvas.getByRole('group', { name: 'Filtros' });
    const primero = within(grupo).getByRole('button', { name: 'Borradores' });

    primero.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(within(grupo).getByRole('button', { name: 'Publicados' })).toHaveFocus();
  },
};
