import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Columns } from './Columns';
import { Heading } from '../Heading/Heading';
import { Paragraph } from '../Paragraph/Paragraph';

const Celda = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: 'var(--spacing-5)', border: '1px solid currentColor' }}>{children}</div>
);

const meta: Meta<typeof Columns> = {
  title: 'Atoms/Columns',
  component: Columns,
  parameters: { layout: 'padded' },
  args: {
    children: (
      <>
        <Celda>Primera celda</Celda>
        <Celda>Segunda celda</Celda>
      </>
    ),
  },
  argTypes: {
    columns: { control: { type: 'radio' }, options: [2, 3, 4] },
    ratio: { control: { type: 'radio' }, options: ['1:1', '1:2', '2:1'] },
    align: { control: { type: 'radio' }, options: ['start', 'center', 'stretch'] },
    gap: { control: { type: 'radio' }, options: ['md', 'lg'] },
    stackOrder: { control: { type: 'radio' }, options: ['normal', 'reverse'] },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<typeof Columns>;

/** Dos celdas al mismo nivel, mitad y mitad. */
export const DosColumnas: Story = {};

/** Título a la izquierda y contenido a la derecha: la jerarquía la pone el `header`, no el molde. */
export const TituloYContenido: Story = {
  args: {
    children: (
      <>
        <header>
          <Heading level={1}>Recupera tu contraseña</Heading>
          <Paragraph>Te enviaremos un enlace al correo con el que te registraste.</Paragraph>
        </header>
        <Celda>Aquí iría el formulario</Celda>
      </>
    ),
  },
};

export const Reparto12: Story = { name: 'Reparto 1:2', args: { ratio: '1:2' } };

export const TresColumnas: Story = {
  args: { columns: 3, children: <><Celda>Uno</Celda><Celda>Dos</Celda><Celda>Tres</Celda></> },
};

export const CuatroColumnas: Story = {
  args: { columns: 4, gap: 'lg', children: <><Celda>Uno</Celda><Celda>Dos</Celda><Celda>Tres</Celda><Celda>Cuatro</Celda></> },
};

/** En móvil, la última celda arriba. */
export const ApiladoInverso: Story = {
  args: { stackOrder: 'reverse' },
  globals: { viewport: { value: 'mobile1' } },
};

export const Contrato: Story = {
  name: 'Test — cada hija es una celda, sin semántica del molde, ratio solo con dos',
  tags: ['!dev'],
  args: { ratio: '1:2', children: <><Celda>A</Celda>{null}<Celda>B</Celda></> },
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('.columns')!;
    await expect(root.tagName).toBe('DIV');
    await expect(root).toHaveClass('columns--2', 'columns--ratio-1-2');
    const celdas = root.querySelectorAll(':scope > .columns__col');
    await expect(celdas).toHaveLength(2);
    await expect(root.querySelector('aside, main, section')).toBeNull();
    await expect(getComputedStyle(root).display).toBe('grid');
  },
};
