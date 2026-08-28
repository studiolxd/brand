import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Columns } from '../../atoms/Columns/Columns';
import { Icon } from '../../atoms/Icon/Icon';
import { StatTile } from './StatTile';

const meta = {
  title: 'Molecules/StatTile',
  component: StatTile,
} satisfies Meta<typeof StatTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PorDefecto: Story = {
  name: 'Por defecto',
  args: {
    label: 'Modelos en el catálogo',
    value: '1.284',
  },
};

/** Con variación, contexto e icono: la baldosa completa. */
export const Completa: Story = {
  args: {
    label: 'Ingresos recurrentes',
    value: '48.900 €',
    icon: <Icon name="report-money" />,
    delta: { value: '+12,4 %', direction: 'up' },
    description: 'Frente a los 43.500 € del mes anterior.',
  },
};

/**
 * `direction` pone la flecha y, por defecto, el tono: subir es bueno. En una
 * métrica donde subir es malo —errores, latencia, bajas—, `tone` lo invierte.
 */
export const Tendencias: Story = {
  args: { label: 'Altas', value: '312' },
  render: () => (
    <Columns columns={3}>
      <StatTile label="Altas" value="312" delta={{ value: '+18', direction: 'up' }} />
      <StatTile label="Bajas" value="27" delta={{ value: '−4', direction: 'down' }} />
      <StatTile
        label="Errores 5xx"
        value="41"
        delta={{ value: '+9', direction: 'up', tone: 'negative' }}
        description="Subir es malo: el tono se invierte."
      />
    </Columns>
  ),
};

/** Sin movimiento, la flecha se queda en reposo y el tono es neutro. */
export const SinCambio: Story = {
  name: 'Sin cambio',
  args: {
    label: 'Proveedores',
    value: '24',
    delta: { value: 'Igual', direction: 'flat' },
    description: 'Ningún alta ni baja en los últimos 30 días.',
  },
};

/** La rejilla la pone `Columns`: la baldosa no sabe nada de rejillas. */
export const EnRejilla: Story = {
  name: 'En rejilla',
  args: { label: 'Modelos', value: '1.284' },
  render: () => (
    <Columns columns={4}>
      <StatTile label="Modelos" value="1.284" delta={{ value: '+36', direction: 'up' }} />
      <StatTile label="Proveedores" value="24" delta={{ value: 'Igual', direction: 'flat' }} />
      <StatTile label="Precios publicados" value="3.910" delta={{ value: '+142', direction: 'up' }} />
      <StatTile label="Fuentes caídas" value="1" delta={{ value: '+1', direction: 'up', tone: 'negative' }} />
    </Columns>
  ),
};

/** `sm` para cuadros de mando densos: misma baldosa, menos aire y cifra menor. */
export const TallaPequena: Story = {
  name: 'Talla sm',
  args: { label: 'Modelos', value: '1.284' },
  render: () => (
    <Columns columns={4}>
      <StatTile size="sm" label="Modelos" value="1.284" />
      <StatTile size="sm" label="Proveedores" value="24" />
      <StatTile size="sm" label="Precios" value="3.910" delta={{ value: '+142', direction: 'up' }} />
      <StatTile size="sm" label="Fuentes" value="7" />
    </Columns>
  ),
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: {
    label: 'Ingresos recurrentes',
    value: '48.900 €',
    icon: <Icon name="report-money" />,
    delta: { value: '+12,4 %', direction: 'up' },
    description: 'Frente a los 43.500 € del mes anterior.',
  },
};

/**
 * Test: la etiqueta va antes de la cifra en el DOM, y la dirección del delta
 * llega al lector de pantalla con texto, no solo con la flecha.
 */
export const TestLectura: Story = {
  name: 'Test — orden de lectura y dirección',
  tags: ['!dev'],
  args: {
    label: 'Ingresos recurrentes',
    value: '48.900 €',
    delta: { value: '+12,4 %', direction: 'up' },
    description: 'Frente al mes anterior.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tile = canvasElement.querySelector('.stat-tile');
    await expect(tile).not.toBeNull();
    await expect(tile).toHaveTextContent(/Ingresos recurrentes.*48\.900 €/s);
    await expect(canvas.getByText('Sube')).toBeInTheDocument();
    await expect(canvasElement.querySelector('.stat-tile__delta-icon--up')).not.toBeNull();
  },
};

/** Test: `tone` invierte la lectura sin tocar la flecha. */
export const TestTonoInvertido: Story = {
  name: 'Test — tono invertido',
  tags: ['!dev'],
  args: {
    label: 'Errores 5xx',
    value: '41',
    delta: { value: '+9', direction: 'up', tone: 'negative', label: 'Empeora' },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Empeora')).toBeInTheDocument();
    await expect(canvasElement.querySelector('.stat-tile__delta')).toHaveClass('tag--danger');
    await expect(canvasElement.querySelector('.stat-tile__delta-icon--up')).not.toBeNull();
  },
};
