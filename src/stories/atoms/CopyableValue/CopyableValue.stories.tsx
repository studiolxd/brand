import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { CopyableValue } from './CopyableValue';
import { Code } from '../Code/Code';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../../molecules/Table/Table';

const meta = {
  title: 'Atoms/CopyableValue',
  component: CopyableValue,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CopyableValue>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Suelto en un párrafo: un dato que se copia y no vive en una lista de definición. */
export const PorDefecto: Story = {
  args: {
    children: 'org_8f2c19ab',
  },
  render: (args) => (
    <p>
      El identificador de la organización es{' '}
      <CopyableValue {...args} copyLabel="Copiar el identificador" />.
    </p>
  ),
};

/**
 * Dentro de una celda de tabla, con una URL larga que ocupa dos líneas: el
 * botón se queda pegado al final del valor, nunca suelto en su propia línea.
 */
export const EnUnaCelda: Story = {
  name: 'En una celda de tabla',
  args: { children: null },
  render: () => (
    <Table caption="Endpoints de lmsmcp" size="sm">
      <TableHead>
        <TableRow>
          <TableHeader>Servicio</TableHeader>
          <TableHeader>URL</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Autenticación</TableCell>
          <TableCell style={{ maxWidth: 220 }}>
            <CopyableValue copyLabel="Copiar la URL de autenticación">
              https://lms.studiolxd.com/mcp/auth/token
            </CopyableValue>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Webhook</TableCell>
          <TableCell style={{ maxWidth: 220 }}>
            <CopyableValue copyLabel="Copiar la URL del webhook">
              https://lms.studiolxd.com/mcp/webhooks/inscripciones
            </CopyableValue>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/** `children` no tiene por qué ser texto plano: aquí es un `Code`. */
export const ConCodigo: Story = {
  name: 'Con código',
  args: { children: null },
  render: () => (
    <p>
      La variable de entorno es <CopyableValue copyLabel="Copiar la variable"><Code>LMSMCP_API_KEY</Code></CopyableValue>.
    </p>
  ),
};

/** Test: sin hueco en blanco entre el valor y el botón, y copia el texto del valor. */
export const Contrato: Story = {
  name: 'Test — valor pegado al botón y copia',
  tags: ['!dev'],
  args: { children: null },
  render: () => (
    <p>
      <CopyableValue copyLabel="Copiar el identificador">org_8f2c19ab</CopyableValue>
    </p>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const boton = canvas.getByRole('button', { name: 'Copiar el identificador' });
    const valor = canvasElement.querySelector('.copyable-value__value')!;
    await expect(valor.compareDocumentPosition(boton)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);

    let copiado = '';
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async (texto: string) => { copiado = texto; } },
    });

    await userEvent.click(boton);

    await waitFor(async () => {
      await expect(copiado).toBe('org_8f2c19ab');
      await expect(canvas.getByRole('status')).toHaveTextContent('Copiado');
    });
  },
};

/** Test: `copyText` copia algo distinto de lo que se ve. */
export const ContratoCopyText: Story = {
  name: 'Test — copyText',
  tags: ['!dev'],
  args: { children: null },
  render: () => (
    <p>
      <CopyableValue copyText="https://cuenta.studiolxd.com/callback" copyLabel="Copiar la URL">
        cuenta.studiolxd.com/callback
      </CopyableValue>
    </p>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    let copiado = '';
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async (texto: string) => { copiado = texto; } },
    });

    await userEvent.click(canvas.getByRole('button', { name: 'Copiar la URL' }));

    await waitFor(async () => {
      await expect(copiado).toBe('https://cuenta.studiolxd.com/callback');
    });
  },
};
