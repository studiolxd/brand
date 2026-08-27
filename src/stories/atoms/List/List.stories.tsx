import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { List } from './List';
import { Link } from '../Link/Link';

const meta: Meta<typeof List> = {
  title: 'Atoms/List',
  component: List,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    type: {
      control: { type: 'inline-radio' },
      options: ['unordered', 'ordered', 'plain'],
      description: 'Tipo de lista: con viñetas, numerada o sin decoración.',
    },
  },
  args: {
    type: 'unordered',
    children: (
      <>
        <li>Primer elemento de la lista</li>
        <li>Segundo elemento de la lista</li>
        <li>Tercer elemento de la lista</li>
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof List>;

/** Con viñetas: el orden de los elementos no significa nada. */
export const PorDefecto: Story = {};

/** Numerada: los pasos van en ese orden y el número importa. */
export const Numerada: Story = {
  args: { type: 'ordered' },
};

/** Sin decoración: sigue siendo una lista para quien la escucha, pero sin marcas ni sangría. */
export const SinDecoracion: Story = {
  name: 'Sin decoración',
  args: {
    type: 'plain',
    children: (
      <>
        <li><Link href="https://studiolxd.com">Sitio web</Link></li>
        <li><Link href="https://www.linkedin.com">LinkedIn</Link></li>
        <li><Link href="https://github.com">GitHub</Link></li>
      </>
    ),
  },
};

/** Anidada: la lista interior mantiene su propio aire y su sangría. */
export const Anidada: Story = {
  args: {
    children: (
      <>
        <li>Diseño instruccional</li>
        <li>
          Producción
          <List type="unordered">
            <li>Guion y storyboard</li>
            <li>Grabación</li>
            <li>Montaje</li>
          </List>
        </li>
        <li>Despliegue en el LMS</li>
      </>
    ),
  },
};

/** Sobre superficie oscura el texto pasa a blanco por token. */
export const SuperficieOscura: Story = {
  name: 'Superficie oscura',
  parameters: { surface: 'dark' },
  decorators: [
    (Story) => (
      <div className="surface-dark" style={{ padding: '2rem', background: 'var(--color-background-dark)' }}>
        <Story />
      </div>
    ),
  ],
};

/** Test: el elemento sigue al tipo, las clases se componen y las props se reenvían. */
export const Contrato: Story = {
  name: 'Test — elemento por tipo y paso de props',
  tags: ['!dev'],
  args: { children: null },
  render: () => (
    <>
      <List aria-label="viñetas" className="extra" data-uso="prueba">
        <li>Uno</li>
      </List>
      <List type="ordered" aria-label="numerada">
        <li>Uno</li>
      </List>
      <List type="plain" aria-label="sin decoración">
        <li>Uno</li>
      </List>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const vinetas = canvas.getByLabelText('viñetas');
    await expect(vinetas.tagName).toBe('UL');
    await expect(vinetas).toHaveClass('list', 'list--unordered', 'extra');
    await expect(vinetas.className.trim().endsWith('extra')).toBe(true);
    await expect(vinetas).toHaveAttribute('data-uso', 'prueba');

    await expect(canvas.getByLabelText('numerada').tagName).toBe('OL');
    const plana = canvas.getByLabelText('sin decoración');
    await expect(plana.tagName).toBe('UL');
    await expect(getComputedStyle(plana).listStyleType).toBe('none');
  },
};

/** Test: el aire entre ítems lo pone el ítem, no un `gap` del contenedor. */
export const ContratoAire: Story = {
  name: 'Test — aire entre ítems',
  tags: ['!dev'],
  args: { children: null },
  render: () => (
    <List aria-label="lista">
      <li>Uno</li>
      <li>Dos</li>
    </List>
  ),
  play: async ({ canvasElement }) => {
    const lista = within(canvasElement).getByLabelText('lista');
    const [primero, segundo] = Array.from(lista.querySelectorAll('li'));
    await expect(getComputedStyle(primero).marginBlockStart).toBe('0px');
    await expect(getComputedStyle(segundo).marginBlockStart).toBe('8px');
  },
};
