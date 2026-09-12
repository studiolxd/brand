import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { CodeBlock } from '../CodeBlock/CodeBlock';
import {
  DescriptionList,
  DescriptionTerm,
  DescriptionDetails,
} from '../../atoms/DescriptionList/DescriptionList';
import { Inline } from '../../atoms/Inline/Inline';
import { CopyButton } from './CopyButton';

const meta = {
  title: 'Molecules/CopyButton',
  component: CopyButton,
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PorDefecto: Story = {
  name: 'Por defecto',
  args: { value: 'sk-live-3f9a2b7c41d8' },
};

/** Con rótulo visible, el acuse sustituye al texto mientras dura. */
export const ConRotulo: Story = {
  name: 'Con rótulo',
  args: { value: 'sk-live-3f9a2b7c41d8', children: 'Copiar clave' },
};

export const Variantes: Story = {
  args: { value: 'sk-live-3f9a2b7c41d8' },
  render: (args) => (
    <Inline>
      <CopyButton {...args} variant="ghost">Ghost</CopyButton>
      <CopyButton {...args} variant="outline">Outline</CopyButton>
      <CopyButton {...args} variant="text">Text</CopyButton>
    </Inline>
  ),
};

export const Tallas: Story = {
  args: { value: 'sk-live-3f9a2b7c41d8' },
  render: (args) => (
    <Inline>
      <CopyButton {...args} size="sm" variant="outline">Pequeño</CopyButton>
      <CopyButton {...args} size="md" variant="outline">Base</CopyButton>
      <CopyButton {...args} size="lg" variant="outline">Grande</CopyButton>
    </Inline>
  ),
};

/**
 * Como función, el valor se evalúa en el clic: aquí se copia la URL que hay al
 * lado, junto a lo que copia. Es el caso del botón suelto: el dato no cuelga
 * de una lista de definiciones, así que no hay `<dd>` que pueda ponerlo por su
 * cuenta.
 */
export const JuntoAlDato: Story = {
  name: 'Junto al dato',
  args: { value: () => 'https://api.studiolxd.com/hooks/8f2c19ab' },
  render: (args) => (
    <Inline gap="sm">
      https://api.studiolxd.com/hooks/8f2c19ab
      <CopyButton {...args} size="sm" label="Copiar la URL del webhook" />
    </Inline>
  ),
};

/**
 * Dentro de una ficha, el botón no se pone a mano: `DescriptionDetails` con
 * `copyable` monta este mismo gesto y además lo alinea al margen derecho de la
 * fila. El `CopyButton` suelto queda para los datos que no están en un `<dl>`.
 */
export const EnUnaFicha: Story = {
  name: 'En una ficha',
  args: { value: 'org_8f2c19ab' },
  render: () => (
    <DescriptionList aria-label="Ficha de la organización">
      <DescriptionTerm>Identificador de la organización</DescriptionTerm>
      <DescriptionDetails copyable copyLabel="Copiar el identificador">
        org_8f2c19ab
      </DescriptionDetails>
    </DescriptionList>
  ),
};

/** El mismo botón que ya llevaba dentro `CodeBlock` con `copyable`. */
export const EnUnBloqueDeCodigo: Story = {
  name: 'En un bloque de código',
  args: { value: 'pnpm add @studiolxd/brand' },
  render: () => (
    <CodeBlock language="bash" copyable>
      pnpm add @studiolxd/brand
    </CodeBlock>
  ),
};

/**
 * Test: al copiar, el acuse llega por dos caminos — el icono cambia para quien
 * ve y una región viva lo anuncia para quien escucha.
 */
export const TestAcuse: Story = {
  name: 'Test — acuse doble',
  tags: ['!dev'],
  args: { value: 'sk-live-3f9a2b7c41d8', children: 'Copiar clave' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Copiar clave' });

    // El navegador del test no concede permiso de portapapeles real: sin este
    // mock, `navigator.clipboard.writeText` rechaza y el botón cae en el
    // estado `error`, no `copied` (mismo patrón que `CodeBlock.stories.tsx`).
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async () => {} },
    });

    await userEvent.click(button);

    await waitFor(async () => {
      await expect(canvas.getByRole('status')).toHaveTextContent('Copiado');
    });
    await expect(button).toHaveTextContent('Copiado');
  },
};
