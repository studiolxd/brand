import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { FloatingToolbar, FloatingToolbarButton } from './FloatingToolbar';
import { TooltipProvider } from '../../atoms/Tooltip/Tooltip';
import { Popover } from '../../atoms/Popover/Popover';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { Stack } from '../../atoms/Stack/Stack';
import { Heading } from '../../atoms/Heading/Heading';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';

const meta: Meta<typeof FloatingToolbar> = {
  title: 'Molecules/FloatingToolbar',
  component: FloatingToolbar,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <TooltipProvider><Story /></TooltipProvider>],
  argTypes: {
    layout: { control: { type: 'inline-radio' }, options: ['auto', 'top', 'sides'] },
    alwaysVisible: { control: { type: 'boolean' } },
  },
};

export default meta;
type Story = StoryObj<typeof FloatingToolbar>;

const BLOQUES = [
  { titulo: 'Introducción', texto: 'Qué vas a aprender en esta lección y cuánto se tarda en completarla.' },
  { titulo: 'El ciclo del agua', texto: 'Evaporación, condensación y precipitación, con un esquema para cada fase.' },
  { titulo: 'Comprueba lo aprendido', texto: 'Tres preguntas de opción múltiple sobre el ciclo.' },
];

/**
 * Las acciones de un bloque, declaradas una vez. `index`/`total` deciden qué
 * flechas tienen sentido: el primero no sube y el último no baja.
 */
function acciones(index: number, total: number) {
  return {
    start: (
      <>
        <FloatingToolbarButton label="Editar el bloque" icon={<Icon name="settings" />} />
        <FloatingToolbarButton label="Asistente de IA" icon={<Icon name="sparkles" />} />
      </>
    ),
    end: (
      <>
        {index > 0 && <FloatingToolbarButton label="Subir" icon={<Icon name="chevron-up" />} />}
        {index < total - 1 && <FloatingToolbarButton label="Bajar" icon={<Icon name="chevron-down" />} />}
        <FloatingToolbarButton label="Duplicar" icon={<Icon name="copy" />} />
        <FloatingToolbarButton label="Borrar" icon={<Icon name="trash" />} destructive />
      </>
    ),
  };
}

function Bloque({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <Stack gap="sm">
      <Heading level={3} size={3}>{titulo}</Heading>
      <Paragraph>{texto}</Paragraph>
    </Stack>
  );
}

/**
 * La lista de bloques de un editor. Pasa el puntero por un bloque o entra con
 * el tabulador: su barra aparece. Por debajo de `lg` se pinta encima del
 * bloque; desde `lg`, en dos raíles a sus lados — con las mismas acciones.
 */
export const PorDefecto: Story = {
  name: 'Por defecto',
  render: (args) => (
    <Stack gap="lg">
      {BLOQUES.map((bloque, i) => (
        <FloatingToolbar
          key={bloque.titulo}
          {...args}
          label={`Acciones del bloque ${i + 1}`}
          {...acciones(i, BLOQUES.length)}
        >
          <Bloque {...bloque} />
        </FloatingToolbar>
      ))}
    </Stack>
  ),
};

/** `layout="top"`: siempre encima del elemento, a cualquier anchura. */
export const Arriba: Story = {
  args: { layout: 'top', alwaysVisible: true },
  render: (args) => (
    <FloatingToolbar {...args} label="Acciones del bloque 2" {...acciones(1, 3)}>
      <Bloque {...BLOQUES[1]} />
    </FloatingToolbar>
  ),
};

/** `layout="sides"`: siempre en raíles. El elemento reserva su hueco a cada lado. */
export const ALosLados: Story = {
  name: 'A los lados',
  args: { layout: 'sides', alwaysVisible: true },
  render: (args) => (
    <FloatingToolbar {...args} label="Acciones del bloque 2" {...acciones(1, 3)}>
      <Bloque {...BLOQUES[1]} />
    </FloatingToolbar>
  ),
};

/**
 * El bloque seleccionado. En una pantalla táctil no hay puntero que pase: el
 * producto decide qué bloque está activo (el que se tocó) y lo fija con
 * `alwaysVisible`.
 */
export const Seleccionado: Story = {
  name: 'Elemento seleccionado',
  globals: { viewport: { value: 'mobile1' } },
  render: function Render() {
    const [activo, setActivo] = useState(1);
    return (
      <Stack gap="lg">
        {BLOQUES.map((bloque, i) => (
          <FloatingToolbar
            key={bloque.titulo}
            label={`Acciones del bloque ${i + 1}`}
            alwaysVisible={activo === i}
            onClick={() => setActivo(i)}
            {...acciones(i, BLOQUES.length)}
          >
            <Bloque {...bloque} />
          </FloatingToolbar>
        ))}
      </Stack>
    );
  },
};

/**
 * Un botón de la barra puede abrir un panel: el `FloatingToolbarButton` va de
 * `trigger` de un `Popover`. Mientras el panel está abierto la barra no se va,
 * aunque el puntero y el foco estén en el panel.
 */
export const ConPanel: Story = {
  name: 'Con un panel',
  args: { layout: 'top' },
  render: (args) => (
    <FloatingToolbar
      {...args}
      label="Acciones del bloque 1"
      start={
        <Popover
          side="bottom"
          align="start"
          trigger={<FloatingToolbarButton label="Convertir en…" icon={<Icon name="retry" />} />}
        >
          <Stack gap="sm">
            <Button variant="ghost" size="sm">Texto</Button>
            <Button variant="ghost" size="sm">Cita</Button>
            <Button variant="ghost" size="sm">Lista</Button>
          </Stack>
        </Popover>
      }
      end={<FloatingToolbarButton label="Borrar" icon={<Icon name="trash" />} destructive />}
    >
      <Bloque {...BLOQUES[0]} />
    </FloatingToolbar>
  ),
};

/**
 * Atributos para la barra. `ref` y el resto de props van al ancla; lo que
 * tiene que ir en el `role="toolbar"` —aquí, la marca con la que un editor
 * separa su interfaz del contenido que edita, para que la hoja del contenido
 * no la alcance— va en `toolbarProps`. Llega a la misma barra arriba y en los
 * raíles.
 */
export const AtributosDeLaBarra: Story = {
  name: 'Atributos en la barra',
  args: { alwaysVisible: true },
  render: (args) => (
    <FloatingToolbar
      {...args}
      label="Acciones del bloque 1"
      toolbarProps={{ 'data-editor-ui': '' }}
      {...acciones(0, BLOQUES.length)}
    >
      <Bloque {...BLOQUES[0]} />
    </FloatingToolbar>
  ),
};

/* ── Tests ─────────────────────────────────────────────────────────────── */

function opacidad(el: HTMLElement) {
  return getComputedStyle(el).opacity;
}

export const TestTeclado: Story = {
  name: 'Test — una parada de tabulación, flechas dentro, y aparece con el foco',
  tags: ['!dev'],
  args: { layout: 'top' },
  render: (args) => (
    <Stack gap="lg">
      <Button variant="outline">Antes</Button>
      <FloatingToolbar {...args} label="Acciones del bloque 1" {...acciones(1, 3)}>
        <Bloque {...BLOQUES[0]} />
      </FloatingToolbar>
      <Button variant="outline">Después</Button>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toolbar = canvas.getByRole('toolbar', { name: 'Acciones del bloque 1' });

    await waitFor(() => expect(opacidad(toolbar)).toBe('0'));

    canvas.getByRole('button', { name: 'Antes' }).focus();
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: 'Editar el bloque' })).toHaveFocus();
    await waitFor(() => expect(opacidad(toolbar)).toBe('1'));

    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('button', { name: 'Asistente de IA' })).toHaveFocus();

    // Tab sale de la barra entera, no recorre sus botones.
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: 'Después' })).toHaveFocus();
    await waitFor(() => expect(opacidad(toolbar)).toBe('0'));
  },
};

export const TestRailes: Story = {
  name: 'Test — a los lados se recorre con flechas verticales',
  tags: ['!dev'],
  args: { layout: 'sides' },
  render: (args) => (
    <FloatingToolbar {...args} label="Acciones del bloque 2" {...acciones(1, 3)}>
      <Bloque {...BLOQUES[1]} />
    </FloatingToolbar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toolbar = canvas.getByRole('toolbar', { name: 'Acciones del bloque 2' });
    await expect(toolbar).toHaveAttribute('aria-orientation', 'vertical');

    canvas.getByRole('button', { name: 'Editar el bloque' }).focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(canvas.getByRole('button', { name: 'Asistente de IA' })).toHaveFocus();
    // Del final del raíl izquierdo se pasa al principio del derecho.
    await userEvent.keyboard('{ArrowDown}');
    await expect(canvas.getByRole('button', { name: 'Subir' })).toHaveFocus();
  },
};

export const TestVisibilidad: Story = {
  name: 'Test — oculta sin puntero ni foco; alwaysVisible la fija',
  tags: ['!dev'],
  render: () => (
    <Stack gap="lg">
      <FloatingToolbar layout="top" label="Barra suelta" {...acciones(0, 3)}>
        <Bloque {...BLOQUES[0]} />
      </FloatingToolbar>
      <FloatingToolbar layout="top" label="Barra fijada" alwaysVisible {...acciones(1, 3)}>
        <Bloque {...BLOQUES[1]} />
      </FloatingToolbar>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const suelta = canvas.getByRole('toolbar', { name: 'Barra suelta' });
    const fijada = canvas.getByRole('toolbar', { name: 'Barra fijada' });

    await waitFor(() => expect(opacidad(suelta)).toBe('0'));
    await expect(getComputedStyle(suelta).pointerEvents).toBe('none');
    await waitFor(() => expect(opacidad(fijada)).toBe('1'));

    // El `:hover` real no se puede sintetizar desde un `play` (un evento
    // sintético no lo activa); el foco sí, y es el camino del teclado.
    within(suelta).getByRole('button', { name: 'Editar el bloque' }).focus();
    await waitFor(() => expect(opacidad(suelta)).toBe('1'));
    await expect(getComputedStyle(suelta).pointerEvents).toBe('auto');
  },
};

export const TestAtributosDeLaBarra: Story = {
  name: 'Test — toolbarProps llega a la barra arriba y en los raíles',
  tags: ['!dev'],
  render: () => (
    <Stack gap="lg">
      <FloatingToolbar layout="top" label="Barra arriba" toolbarProps={{ 'data-editor-ui': '' }} {...acciones(0, 2)}>
        <Bloque {...BLOQUES[0]} />
      </FloatingToolbar>
      <FloatingToolbar layout="sides" label="Barra en raíles" toolbarProps={{ 'data-editor-ui': '' }} {...acciones(1, 2)}>
        <Bloque {...BLOQUES[1]} />
      </FloatingToolbar>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const name of ['Barra arriba', 'Barra en raíles']) {
      const toolbar = canvas.getByRole('toolbar', { name });
      await expect(toolbar).toHaveAttribute('data-editor-ui', '');
      await expect(toolbar.closest('.floating-toolbar')).not.toHaveAttribute('data-editor-ui');
    }
  },
};
