import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Sortable } from './Sortable';
import { Stack } from '../Stack/Stack';
import { Card, CardHeader, CardTitle } from '../../molecules/Card/Card';

const meta = {
  title: 'Atoms/Sortable',
  component: Sortable,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Sortable>;

export default meta;
type Story = StoryObj<typeof meta>;

const filas = ['Presentación del módulo', 'Mapa de contenidos', 'Actividad de cierre'];

/**
 * El uso real: cada elemento de una lista reordenable va envuelto en un
 * `Sortable`, que recibe del motor de arrastre de la aplicación (dnd-kit, en
 * la suite) la `ref` del nodo, el desplazamiento y el estado. En reposo no
 * mueve nada.
 */
export const Default: Story = {
  name: 'Lista ordenable (en reposo)',
  args: { children: null },
  render: () => (
    <Stack gap="sm">
      {filas.map((titulo) => (
        <Sortable key={titulo}>
          <Card>
            <CardHeader>
              <CardTitle>{titulo}</CardTitle>
            </CardHeader>
          </Card>
        </Sortable>
      ))}
    </Stack>
  ),
};

/**
 * Mientras se arrastra: el elemento que viaja lleva `dragging` —el original se
 * queda atenuado ocupando su hueco— y los vecinos reciben el desplazamiento
 * que el motor calcula en cada fotograma, que el componente escribe por el
 * CSSOM (`--sortable-x`/`--sortable-y`). El `transform` lo pone la hoja del
 * sistema, nunca un atributo `style`.
 */
export const EnArrastre: Story = {
  name: 'Durante el arrastre',
  args: { children: null },
  render: () => (
    <Stack gap="sm">
      <Sortable dragging>
        <Card>
          <CardHeader>
            <CardTitle>{filas[0]}</CardTitle>
          </CardHeader>
        </Card>
      </Sortable>
      {filas.slice(1).map((titulo) => (
        <Sortable key={titulo} transform={{ x: 0, y: -12 }} transition="transform 200ms ease">
          <Card>
            <CardHeader>
              <CardTitle>{titulo}</CardTitle>
            </CardHeader>
          </Card>
        </Sortable>
      ))}
    </Stack>
  ),
};

/**
 * Test: el desplazamiento llega al `transform` calculado —y por el CSSOM, sin
 * atributo `style` en el marcado, que una CSP `style-src 'self'` descartaría—,
 * y el arrastre se publica como atributo del que cuelga la atenuación.
 */
export const TestTransformYArrastre: Story = {
  name: 'Test — desplazamiento por CSSOM y arrastre por atributo',
  tags: ['!dev'],
  args: { children: null },
  render: () => (
    <Stack gap="sm">
      <Sortable data-testid="arrastrada" dragging>
        <Card>
          <CardHeader>
            <CardTitle>{filas[0]}</CardTitle>
          </CardHeader>
        </Card>
      </Sortable>
      <Sortable data-testid="desplazada" transform={{ x: 8, y: -24, scaleX: 1, scaleY: 1 }}>
        <Card>
          <CardHeader>
            <CardTitle>{filas[1]}</CardTitle>
          </CardHeader>
        </Card>
      </Sortable>
      <Sortable data-testid="quieta">
        <Card>
          <CardHeader>
            <CardTitle>{filas[2]}</CardTitle>
          </CardHeader>
        </Card>
      </Sortable>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const desplazada = canvas.getByTestId('desplazada');
    // matrix(a, b, c, d, tx, ty): las dos últimas son la traslación.
    const matriz = getComputedStyle(desplazada).transform;
    await expect(matriz).toContain('matrix');
    const [tx, ty] = matriz.slice(matriz.indexOf('(') + 1, -1).split(',').slice(4).map(Number);
    await expect(tx).toBeCloseTo(8, 0);
    await expect(ty).toBeCloseTo(-24, 0);

    const quieta = canvas.getByTestId('quieta');
    const matrizQuieta = getComputedStyle(quieta).transform;
    await expect(['none', 'matrix(1, 0, 0, 1, 0, 0)']).toContain(matrizQuieta);

    const arrastrada = canvas.getByTestId('arrastrada');
    await expect(arrastrada).toHaveAttribute('data-dragging');
    const opacidadArrastrada = Number(getComputedStyle(arrastrada).opacity);
    const opacidadQuieta = Number(getComputedStyle(quieta).opacity);
    await expect(opacidadArrastrada).toBeLessThan(opacidadQuieta);

    // El valor va por el CSSOM y la hoja: en el marcado no hay `style`.
    await expect(quieta.getAttribute('style')).toBeNull();
  },
};
