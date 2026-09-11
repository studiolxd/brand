import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { RecoveryCodes } from './RecoveryCodes';

const CODES = [
  '7F3K-9QRT',
  'M2XW-4LPZ',
  'B8HN-6VCY',
  'K5JD-1WGX',
  'T9RQ-3FML',
  'X4CV-8ZNB',
  'Q7WE-2ASD',
  'L1OP-5KIU',
  'Y6TR-4EWQ',
  'P3AS-9DFG',
];

const labels = {
  list: 'Códigos de recuperación',
  copy: 'Copiar todos',
  copied: 'Copiados',
};

const meta = {
  title: 'Molecules/RecoveryCodes',
  component: RecoveryCodes,
  args: {
    codes: CODES,
    labels,
  },
} satisfies Meta<typeof RecoveryCodes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PorDefecto: Story = {
  name: 'Por defecto',
};

export const UnaColumna: Story = {
  name: 'Una columna',
  args: { columns: 1 },
};

/**
 * `actions` es el sitio para lo que aporta el producto — descargar el
 * archivo, imprimir la página—: `brand` no implementa ninguno de los dos,
 * porque el nombre del archivo, el formato y el disparo de `window.print()`
 * son decisión de cada consumidor.
 */
export const ConAccionesDelProducto: Story = {
  name: 'Con acciones del producto',
  args: {
    actions: (
      <Button variant="outline" size="sm">
        <Icon name="download" size="sm" />
        Descargar .txt
      </Button>
    ),
  },
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
};

/**
 * Test: la lista es una numeración real (`role="list"` / `listitem`, `N`
 * ítems), y el botón de copiar todos copia los códigos unidos por salto de
 * línea. El portapapeles se mockea porque el navegador de test no concede el
 * permiso real (mismo patrón que `CopyButton.stories.tsx`).
 */
export const TestContrato: Story = {
  name: 'Test — Contrato',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const list = canvas.getByRole('list', { name: labels.list });
    const items = within(list).getAllByRole('listitem');
    await expect(items).toHaveLength(CODES.length);

    let written = '';
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async (text: string) => { written = text; } },
    });

    const copyButton = canvas.getByRole('button', { name: labels.copy });
    await userEvent.click(copyButton);

    await waitFor(() => {
      expect(written).toBe(CODES.join('\n'));
    });
    await expect(copyButton).toHaveTextContent(labels.copied);
  },
};
