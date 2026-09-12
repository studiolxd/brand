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

/**
 * `Range.getClientRects()` da un rect por CAJA (texto, botón…), no uno por
 * línea visual: un texto y un botón en la misma línea ya son dos rects. Para
 * comprobar "todo en una sola línea" se mira que TODOS los rects compartan
 * una franja vertical, no que la lista tenga longitud 1.
 */
function enUnaSolaLinea(rects: DOMRect[]): boolean {
  if (rects.length === 0) return true;
  const maxTop = Math.max(...rects.map((r) => r.top));
  const minBottom = Math.min(...rects.map((r) => r.bottom));
  return maxTop < minBottom;
}

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

/** Test: el botón viaja dentro de la cola del valor, y copia el texto completo. */
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
    const cola = canvasElement.querySelector('.copyable-value__tail')!;
    await expect(valor.contains(boton)).toBe(true);
    await expect(cola.contains(boton)).toBe(true);

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

/**
 * Test: en una celda de tabla estrecha (~420px) con una URL de 50 caracteres,
 * el botón cae en la misma línea que la cola del valor — nunca solo en su
 * propia línea. Se verifica con `getClientRects()` en un navegador real
 * (`test:stories`, Chromium): jsdom no hace layout y no detectaría el corte.
 */
export const ContratoCeldaEstrecha: Story = {
  name: 'Test — en celda estrecha, la cola no deja el botón suelto',
  tags: ['!dev'],
  args: { children: null },
  render: () => (
    <Table caption="Endpoint con URL larga en celda estrecha" size="sm">
      <TableHead>
        <TableRow>
          <TableHeader>URL</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell style={{ maxWidth: 420, width: 420 }}>
            <CopyableValue copyLabel="Copiar la URL del endpoint">
              https://lms.studiolxd.com/mcp/auth/token?scope=read-write
            </CopyableValue>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const valor = canvasElement.querySelector('.copyable-value__value')!;
    const cola = canvasElement.querySelector('.copyable-value__tail')!;

    // La celda estrecha obliga al valor a partirse en más de una línea.
    const rangoValor = document.createRange();
    rangoValor.selectNodeContents(valor);
    await expect(rangoValor.getClientRects().length).toBeGreaterThan(1);

    // Pero la cola (los últimos caracteres + el botón) queda entera en una
    // sola línea: nunca se reparte, y el botón nunca cae solo en la suya.
    const rangoCola = document.createRange();
    rangoCola.selectNodeContents(cola);
    const rectsCola = Array.from(rangoCola.getClientRects()).filter((r) => r.width > 0);
    await expect(enUnaSolaLinea(rectsCola)).toBe(true);
  },
};
