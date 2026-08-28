import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Columns } from '../../atoms/Columns/Columns';
import { Heading } from '../../atoms/Heading/Heading';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Stack } from '../../atoms/Stack/Stack';
import { TableOfContents, type TableOfContentsItem } from './TableOfContents';

const meta = {
  title: 'Molecules/TableOfContents',
  component: TableOfContents,
} satisfies Meta<typeof TableOfContents>;

export default meta;
type Story = StoryObj<typeof meta>;

const items: TableOfContentsItem[] = [
  { id: 'instalacion', label: 'Instalación', level: 2 },
  { id: 'requisitos', label: 'Requisitos previos', level: 3 },
  { id: 'paquete', label: 'Instalar el paquete', level: 3 },
  { id: 'tokens-scss', label: 'Tokens SCSS para aplicaciones no-React', level: 4 },
  { id: 'uso', label: 'Uso', level: 2 },
  { id: 'componentes', label: 'Componentes', level: 3 },
  { id: 'versionado', label: 'Versionado', level: 2 },
];

export const PorDefecto: Story = {
  name: 'Por defecto',
  args: { items, title: 'En esta página', activeId: 'paquete' },
};

/** Sin `activeId` no hay entrada marcada: el índice es una lista de anclas y ya. */
export const SinSeccionActiva: Story = {
  name: 'Sin sección activa',
  args: { items, title: 'En esta página' },
};

/** Sin `title` no se pinta rótulo; el `nav` conserva su nombre accesible. */
export const SinRotulo: Story = {
  name: 'Sin rótulo',
  args: { items, activeId: 'uso' },
};

/**
 * `sticky` fija el índice mientras la página se desplaza. El `activeId` sigue
 * siendo del consumidor: aquí lo mueve un clic, en producción lo movería un
 * `IntersectionObserver`.
 */
export const Fijo: Story = {
  name: 'Fijo al hacer scroll',
  args: { items, title: 'En esta página', sticky: true },
  render: (args) => {
    const [activeId, setActiveId] = useState('instalacion');
    return (
      <Columns ratio="2:1">
        <Stack gap="lg">
          {items.map((item) => (
            <section key={item.id} id={item.id} style={{ minBlockSize: '40vh' }}>
              <Heading level={2}>{item.label}</Heading>
              <Paragraph>Contenido de la sección «{item.label}».</Paragraph>
            </section>
          ))}
        </Stack>
        <TableOfContents
          {...args}
          activeId={activeId}
          onItemClick={(item) => setActiveId(item.id)}
        />
      </Columns>
    );
  },
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { items, title: 'En esta página', activeId: 'paquete' },
};

/**
 * Test: el índice es un `nav` con nombre, sus entradas apuntan al ancla del
 * encabezado, la sangría sale del nivel relativo y solo la sección actual
 * lleva `aria-current="location"`.
 */
export const TestAnclas: Story = {
  name: 'Test — anclas, niveles y sección actual',
  tags: ['!dev'],
  args: { items, title: 'En esta página', activeId: 'paquete' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation', { name: 'En esta página' });

    const enlaces = within(nav).getAllByRole('link');
    await expect(enlaces).toHaveLength(items.length);
    await expect(enlaces[0]).toHaveAttribute('href', '#instalacion');

    const actuales = within(nav).getAllByRole('link').filter(
      (a) => a.getAttribute('aria-current') === 'location',
    );
    await expect(actuales).toHaveLength(1);
    await expect(actuales[0]).toHaveTextContent('Instalar el paquete');

    // El nivel más alto de la lista es 2: marca la profundidad 0.
    const li = nav.querySelectorAll('li');
    await expect(li[0]).toHaveClass('table-of-contents__item--level-0');
    await expect(li[1]).toHaveClass('table-of-contents__item--level-1');
    await expect(li[3]).toHaveClass('table-of-contents__item--level-2');
  },
};

/** Test: `onItemClick` recibe la entrada pulsada, además de seguir el ancla. */
export const TestClic: Story = {
  name: 'Test — onItemClick',
  tags: ['!dev'],
  args: { items, title: 'En esta página' },
  render: (args) => {
    const [ultimo, setUltimo] = useState('');
    return (
      <>
        <TableOfContents
          {...args}
          onItemClick={(item, event) => {
            // El consumidor típico se queda el clic para desplazar suave; aquí
            // además evita que el navegador siga el ancla dentro del test.
            event.preventDefault();
            setUltimo(item.id);
          }}
        />
        <p data-testid="ultimo">{ultimo}</p>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('link', { name: 'Versionado' }));
    await expect(canvas.getByTestId('ultimo')).toHaveTextContent('versionado');
  },
};

export const ContratoPassthrough: Story = {
  name: 'Test — el nav reenvía id, data-* y aria-*',
  tags: ['!dev'],
  args: { items },
  render: (args) => (
    <TableOfContents {...args} id="indice" data-zona="lateral" aria-describedby="pista" />
  ),
  play: async ({ canvasElement }) => {
    const nav = canvasElement.querySelector('nav.table-of-contents')!;
    await expect(nav).toHaveAttribute('id', 'indice');
    await expect(nav).toHaveAttribute('data-zona', 'lateral');
    await expect(nav).toHaveAttribute('aria-describedby', 'pista');
    // el nombre accesible sigue saliendo de `ariaLabel`
    await expect(nav).toHaveAttribute('aria-label', 'En esta página');
  },
};
