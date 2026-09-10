import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { ErrorText } from './ErrorText';
import { InputField } from '../../molecules/InputField/InputField';
import { Switcher } from '../Switcher/Switcher';
import { Label } from '../Label/Label';
import { Stack } from '../Stack/Stack';
import { Inline } from '../Inline/Inline';

const meta: Meta<typeof ErrorText> = {
  title: 'Atoms/ErrorText',
  component: ErrorText,
  parameters: { layout: 'padded' },
  argTypes: {
    as: { control: { type: 'inline-radio' }, options: ['p', 'div', 'span'] },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorText>;

/** El error, solo: aparecer ya es anunciarse. */
export const PorDefecto: Story = {
  args: { children: 'No se pudo calcular el importe del complemento.' },
};

/**
 * El caso por el que existe: un control que **no** es un campo —aquí un
 * interruptor y el importe que lo acompaña— y que falla igual. El mensaje se
 * ata al control con `aria-describedby`.
 */
export const JuntoAUnControlQueNoEsCampo: Story = {
  name: 'Junto a un control que no es campo',
  render: () => (
    <Stack>
      <Inline>
        <Switcher id="addon-actas" defaultChecked aria-describedby="addon-actas-error" />
        <Label htmlFor="addon-actas">Actas firmadas digitalmente</Label>
      </Inline>
      <ErrorText id="addon-actas-error">
        No se pudo calcular el importe del complemento. Vuelve a intentarlo en unos minutos.
      </ErrorText>
    </Stack>
  ),
};

/**
 * La misma cara que el `errorMessage` de un campo: mismo cuerpo, mismo peso y
 * misma tinta. Es lo que hace que los dos errores de una misma pantalla no se
 * lean como dos cosas distintas.
 */
export const LaMismaCaraQueUnCampo: Story = {
  name: 'La misma cara que un campo',
  render: () => (
    <Stack>
      <InputField
        id="correo-facturacion"
        label="Correo de facturación"
        defaultValue="no-es-un-correo"
        errorMessage="Escribe una dirección de correo válida."
      />
      <ErrorText>No se pudo calcular el importe del complemento.</ErrorText>
    </Stack>
  ),
};

/** En línea, dentro de una fila con el control: `as="span"`. */
export const EnLinea: Story = {
  name: 'En línea',
  render: () => (
    <Inline>
      <Switcher id="addon-inline" aria-describedby="addon-inline-error" />
      <Label htmlFor="addon-inline">Certificados</Label>
      <ErrorText as="span" id="addon-inline-error">Importe no disponible.</ErrorText>
    </Inline>
  ),
};

/** El par oscuro viene con el token: no hay regla de superficie propia. */
export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  render: () => (
    <Stack>
      <InputField
        id="correo-facturacion-oscuro"
        label="Correo de facturación"
        defaultValue="no-es-un-correo"
        errorMessage="Escribe una dirección de correo válida."
      />
      <ErrorText>No se pudo calcular el importe del complemento.</ErrorText>
    </Stack>
  ),
};

/**
 * La cara del átomo y la del `errorMessage` de un `InputField` son la misma,
 * comprobada sobre el estilo ya calculado por el navegador.
 */
export const TestMismosTokens: Story = {
  name: 'Test — la cara es la del error de un campo',
  tags: ['!dev'],
  render: () => (
    <Stack>
      <InputField
        id="campo-comparado"
        label="Correo de facturación"
        defaultValue="no-es-un-correo"
        errorMessage="Escribe una dirección de correo válida."
      />
      <ErrorText data-testid="suelto">No se pudo calcular el importe.</ErrorText>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const suelto = canvas.getByTestId('suelto');
    const delCampo = canvas.getByText('Escribe una dirección de correo válida.');

    expect(suelto).toHaveAttribute('role', 'alert');
    expect(suelto).toHaveClass('error-text');
    expect(delCampo).toHaveClass('error-text');

    const a = getComputedStyle(suelto);
    const b = getComputedStyle(delCampo);
    for (const prop of ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'color'] as const) {
      expect(a[prop], prop).toBe(b[prop]);
    }
  },
};
