import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { List, ListItem } from './List';
import { Link } from '../Link/Link';
import { Icon } from '../Icon/Icon';

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
    showSeparators: {
      control: 'boolean',
      description: 'Dibuja una línea de `separator.*` entre filas, con su aire a cada lado.',
    },
  },
  args: {
    type: 'unordered',
    showSeparators: false,
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

/**
 * Con `ListItem`: el mismo `<li>` de siempre, con la clase `list__item`. Se usa
 * cuando la app no puede escribir etiquetas HTML sueltas. El dibujo es idéntico
 * en los tres tipos.
 */
export const ConListItem: Story = {
  name: 'Con ListItem',
  args: { children: null },
  render: () => (
    <>
      <List type="unordered">
        <ListItem>Primer elemento de la lista</ListItem>
        <ListItem>Segundo elemento de la lista</ListItem>
        <ListItem>Tercer elemento de la lista</ListItem>
      </List>
      <List type="ordered">
        <ListItem>Guion y storyboard</ListItem>
        <ListItem>Grabación</ListItem>
        <ListItem>Montaje</ListItem>
      </List>
      <List type="plain">
        <ListItem><Link href="https://studiolxd.com">Sitio web</Link></ListItem>
        <ListItem><Link href="https://www.linkedin.com">LinkedIn</Link></ListItem>
        <ListItem><Link href="https://github.com">GitHub</Link></ListItem>
      </List>
    </>
  ),
};

/**
 * Fila de datos o de ajustes: `ListItem` con línea `secondary` atenuada y
 * accesorio `trailing` al final, en una lista `plain` con `showSeparators`.
 * Es la misma fila que la versión nativa (`BrandListItem` con `secondary` y
 * `trailing`).
 */
export const FilasConSeparadores: Story = {
  name: 'Filas con separadores',
  args: { type: 'plain', showSeparators: true, children: null },
  render: (args) => (
    <List {...args} aria-label="Ajustes">
      <ListItem secondary="Avisos de la comunidad" trailing={<Icon name="chevron-right" size="sm" />}>
        Notificaciones
      </ListItem>
      <ListItem trailing={<span>Español</span>}>Idioma</ListItem>
      <ListItem>Cerrar sesión</ListItem>
    </List>
  ),
};

/** Con `secondary` y `trailing` en una lista con viñetas, las marcas se conservan. */
export const FilasConVinetas: Story = {
  name: 'Filas con viñetas',
  args: { children: null },
  render: () => (
    <List>
      <ListItem secondary="Una línea menor">Primer elemento</ListItem>
      <ListItem trailing="12 min">Segundo elemento</ListItem>
    </List>
  ),
};

/** Test: sin las props nuevas la estructura es la de siempre; con ellas aparece la fila. */
export const ContratoFilas: Story = {
  name: 'Test — filas y separadores',
  tags: ['!dev'],
  args: { children: null },
  render: () => (
    <>
      <List aria-label="simple">
        <ListItem>Uno</ListItem>
      </List>
      <List type="plain" showSeparators aria-label="filas">
        <ListItem secondary="Menor" trailing="T">Uno</ListItem>
        <ListItem>Dos</ListItem>
      </List>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const simple = canvas.getByLabelText('simple');
    await expect(simple.querySelector('.list__item-row')).toBeNull();
    const filas = canvas.getByLabelText('filas');
    await expect(filas).toHaveClass('list--separated');
    const [primera, segunda] = Array.from(filas.querySelectorAll(':scope > li'));
    await expect(getComputedStyle(primera).borderBlockStartWidth).toBe('0px');
    await expect(getComputedStyle(segunda).borderBlockStartWidth).toBe('1px');
    await expect(primera.querySelector('.list__item-secondary')).not.toBeNull();
    await expect(primera.querySelector('.list__item-trailing')).not.toBeNull();
    await expect(getComputedStyle(primera.querySelector('.list__item-secondary')!).color)
      .not.toBe(getComputedStyle(primera).color);
  },
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

/** Test: `ListItem` pone la clase, respeta `as` y deja el aire igual que un `<li>` suelto. */
export const ContratoListItem: Story = {
  name: 'Test — ListItem',
  tags: ['!dev'],
  args: { children: null },
  render: () => (
    <>
      <List aria-label="con clase">
        <ListItem>Uno</ListItem>
        <ListItem className="extra" data-uso="prueba">Dos</ListItem>
      </List>
      <List aria-label="sin clase">
        <li>Uno</li>
        <li>Dos</li>
      </List>
      <List type="plain" aria-label="con as">
        <ListItem as="div" role="listitem">Uno</ListItem>
      </List>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const conClase = canvas.getByLabelText('con clase');
    const [primero, segundo] = Array.from(conClase.querySelectorAll('li'));
    await expect(primero.tagName).toBe('LI');
    await expect(primero).toHaveClass('list__item');
    await expect(segundo).toHaveClass('list__item', 'extra');
    await expect(segundo).toHaveAttribute('data-uso', 'prueba');

    // El aire es el mismo con clase y sin ella: `list__item` no cambia el dibujo.
    const sinClase = canvas.getByLabelText('sin clase');
    const suelto = Array.from(sinClase.querySelectorAll('li'))[1];
    await expect(getComputedStyle(segundo).marginBlockStart)
      .toBe(getComputedStyle(suelto).marginBlockStart);

    const conAs = canvas.getByLabelText('con as').firstElementChild!;
    await expect(conAs.tagName).toBe('DIV');
    await expect(conAs).toHaveClass('list__item');
  },
};
