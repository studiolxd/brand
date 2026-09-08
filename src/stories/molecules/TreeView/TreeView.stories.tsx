import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import { TreeView, type TreeViewNode } from './TreeView';
import { Icon } from '../../atoms/Icon/Icon';
import { Stack } from '../../atoms/Stack/Stack';
import { Button } from '../../atoms/Button/Button';
import { Menu } from '../Menu/Menu';

const meta: Meta<typeof TreeView> = {
  title: 'Molecules/TreeView',
  component: TreeView,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof TreeView>;

const matriz: TreeViewNode[] = [
  {
    id: 'modulo-1',
    label: 'Módulo 1 · Fundamentos',
    children: [
      { id: 'leccion-1-1', label: 'Qué es el diseño instruccional' },
      { id: 'leccion-1-2', label: 'Objetivos de aprendizaje' },
      {
        id: 'leccion-1-3',
        label: 'Evaluación',
        children: [
          { id: 'actividad-1-3-1', label: 'Cuestionario inicial' },
          { id: 'actividad-1-3-2', label: 'Rúbrica' },
        ],
      },
    ],
  },
  {
    id: 'modulo-2',
    label: 'Módulo 2 · Producción',
    children: [
      { id: 'leccion-2-1', label: 'Guion didáctico' },
      { id: 'leccion-2-2', label: 'Recursos multimedia' },
    ],
  },
  { id: 'anexos', label: 'Anexos', disabled: true },
];

/** Todo cerrado de salida: el árbol se abre rama a rama. */
export const PorDefecto: Story = {
  args: { items: matriz, label: 'Matriz del curso' },
};

/** `defaultExpanded` abre ramas al montar. */
export const ConRamasAbiertas: Story = {
  args: {
    items: matriz,
    label: 'Matriz del curso',
    defaultExpanded: ['modulo-1', 'leccion-1-3'],
    defaultSelected: 'leccion-1-2',
  },
};

/** Controlado: la apertura y la selección las lleva el consumidor. */
export const Controlado: Story = {
  render: function Controlado() {
    const [abiertas, setAbiertas] = useState<string[]>(['modulo-1']);
    const [elegido, setElegido] = useState('leccion-1-1');
    return (
      <Stack>
        <TreeView
          items={matriz}
          label="Matriz del curso"
          expanded={abiertas}
          onExpandedChange={setAbiertas}
          selected={elegido}
          onSelectedChange={setElegido}
        />
        <span>Elegido: {elegido} · Abiertas: {abiertas.join(', ') || '—'}</span>
      </Stack>
    );
  },
};

/** Con marca delante del rótulo, para distinguir tipos de nodo. */
export const ConIconos: Story = {
  args: {
    label: 'Espacio de trabajo',
    defaultExpanded: ['carpeta'],
    items: [
      {
        id: 'carpeta',
        label: 'Cursos publicados',
        icon: <Icon name="folder" size="sm" />,
        children: [
          { id: 'curso-a', label: 'Prevención de riesgos', icon: <Icon name="file-text" size="sm" /> },
          { id: 'curso-b', label: 'Protección de datos', icon: <Icon name="file-text" size="sm" /> },
        ],
      },
    ] satisfies TreeViewNode[],
  },
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: {
    items: matriz,
    label: 'Matriz del curso',
    defaultExpanded: ['modulo-1'],
    defaultSelected: 'leccion-1-2',
  },
};

export const TestEstructura: Story = {
  name: 'Test — monta el patrón tree con niveles y estado',
  tags: ['!dev'],
  args: { items: matriz, label: 'Matriz del curso', defaultExpanded: ['modulo-1'] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const arbol = canvas.getByRole('tree', { name: 'Matriz del curso' });

    const modulo = within(arbol).getByRole('treeitem', { name: 'Módulo 1 · Fundamentos' });
    await expect(modulo).toHaveAttribute('aria-expanded', 'true');
    await expect(modulo).toHaveAttribute('aria-level', '1');

    const leccion = within(arbol).getByRole('treeitem', { name: 'Objetivos de aprendizaje' });
    await expect(leccion).toHaveAttribute('aria-level', '2');
  },
};

export const TestTeclado: Story = {
  name: 'Test — las flechas abren, cierran y recorren',
  tags: ['!dev'],
  args: { items: matriz, label: 'Matriz del curso' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const modulo = canvas.getByRole('treeitem', { name: 'Módulo 1 · Fundamentos' });

    modulo.focus();
    await expect(modulo).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    await expect(modulo).toHaveAttribute('aria-expanded', 'true');

    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('treeitem', { name: 'Qué es el diseño instruccional' })).toHaveFocus();

    await userEvent.keyboard('{ArrowLeft}');
    await expect(modulo).toHaveFocus();
  },
};

/* ── Árbol de carpetas de una barra lateral ─────────────────────────── */

/** El menú de tres puntos de una carpeta, tal cual va en la ranura `actions`. */
function AccionesDeCarpeta({ nombre }: { nombre: string }) {
  return (
    <Menu
      align="end"
      size="sm"
      items={[
        { type: 'button', label: 'Nueva carpeta', icon: <Icon name="folder" size="sm" />, onClick: () => {} },
        { type: 'button', label: 'Renombrar', icon: <Icon name="settings" size="sm" />, onClick: () => {} },
        { type: 'separator' },
        { type: 'button', label: 'Eliminar', icon: <Icon name="trash" size="sm" />, destructive: true, onClick: () => {} },
      ]}
      trigger={
        <Button variant="ghost" size="sm" iconOnly aria-label={`Acciones de ${nombre}`}>
          <Icon name="dots" size="sm" />
        </Button>
      }
    />
  );
}

const carpeta = <Icon name="folder" size="sm" />;
const carpetaAbierta = <Icon name="folder-open" size="sm" />;

/** El árbol de carpetas de `bricks`: raíz «Todos los contenidos» y tres niveles. */
const carpetas: TreeViewNode[] = [
  {
    id: 'raiz',
    label: 'Todos los contenidos',
    icon: <Icon name="inbox" size="sm" />,
    iconExpanded: <Icon name="inbox" size="sm" />,
    actions: <AccionesDeCarpeta nombre="Todos los contenidos" />,
    children: [
      {
        id: 'formacion',
        label: 'Formación continua',
        icon: carpeta,
        iconExpanded: carpetaAbierta,
        actions: <AccionesDeCarpeta nombre="Formación continua" />,
        children: [
          {
            id: 'prl',
            label: 'Prevención de riesgos',
            icon: carpeta,
            iconExpanded: carpetaAbierta,
            actions: <AccionesDeCarpeta nombre="Prevención de riesgos" />,
            children: [
              { id: 'prl-oficina', label: 'Riesgos en oficina y teletrabajo', icon: carpeta, iconExpanded: carpetaAbierta, actions: <AccionesDeCarpeta nombre="Riesgos en oficina y teletrabajo" /> },
              { id: 'prl-obra', label: 'Riesgos en obra', icon: carpeta, iconExpanded: carpetaAbierta, actions: <AccionesDeCarpeta nombre="Riesgos en obra" /> },
            ],
          },
          { id: 'datos', label: 'Protección de datos', icon: carpeta, iconExpanded: carpetaAbierta, actions: <AccionesDeCarpeta nombre="Protección de datos" /> },
        ],
      },
      { id: 'onboarding', label: 'Onboarding', icon: carpeta, iconExpanded: carpetaAbierta, actions: <AccionesDeCarpeta nombre="Onboarding" /> },
    ],
  },
];

/** Envuelve el árbol en el ancho real de una barra lateral. */
function EnLaBarra({ children }: { children: React.ReactNode }) {
  return <div style={{ inlineSize: '240px' }}>{children}</div>;
}

/**
 * Cada carpeta lleva su menú de acciones a la derecha. Ocupa su sitio siempre
 * —el rótulo no se mueve— y aparece al pasar el puntero o con el foco dentro.
 */
export const ConAcciones: Story = {
  name: 'Con acciones por carpeta',
  render: () => (
    <EnLaBarra>
      <TreeView
        label="Carpetas"
        items={carpetas}
        defaultExpanded={['raiz', 'formacion']}
        defaultSelected="datos"
      />
    </EnLaBarra>
  ),
};

/** La carpeta cerrada y la abierta tienen marca propia (`icon` / `iconExpanded`). */
export const IconosAbiertoYCerrado: Story = {
  name: 'Carpeta abierta y cerrada',
  render: () => (
    <EnLaBarra>
      <TreeView label="Carpetas" items={carpetas} defaultExpanded={['raiz']} />
    </EnLaBarra>
  ),
};

/**
 * Durante un arrastre la aplicación marca cada carpeta: `dropTarget` la que
 * puede recibir lo que se suelta y `dropDisabled` la que no. El árbol solo
 * viste el estado; el arrastre lo lleva dnd-kit.
 */
export const DestinoDeArrastre: Story = {
  name: 'Destino de arrastre y prohibido',
  render: () => (
    <EnLaBarra>
      <TreeView
        label="Carpetas"
        defaultExpanded={['raiz', 'formacion']}
        items={[
          {
            ...carpetas[0],
            children: [
              {
                ...(carpetas[0].children as TreeViewNode[])[0],
                dropDisabled: true,
                children: [
                  { ...((carpetas[0].children as TreeViewNode[])[0].children as TreeViewNode[])[0], dropDisabled: true },
                  { ...((carpetas[0].children as TreeViewNode[])[0].children as TreeViewNode[])[1], dropTarget: true },
                ],
              },
              { ...(carpetas[0].children as TreeViewNode[])[1], dropTarget: true },
            ],
          },
        ]}
      />
    </EnLaBarra>
  ),
};

/**
 * Cuatro niveles en el ancho de una barra: a partir del cuarto el rótulo se
 * trunca con puntos suspensivos y el nombre entero se lee en `title`.
 */
export const CuatroNiveles: Story = {
  name: 'Cuatro niveles con truncado',
  render: () => (
    <EnLaBarra>
      <TreeView
        label="Carpetas"
        items={carpetas}
        defaultExpanded={['raiz', 'formacion', 'prl']}
        defaultSelected="prl-oficina"
      />
    </EnLaBarra>
  ),
};

export const CarpetasEnSuperficieOscura: Story = {
  name: 'Carpetas en superficie oscura',
  parameters: { surface: 'dark' },
  render: () => (
    <EnLaBarra>
      <TreeView
        label="Carpetas"
        defaultExpanded={['raiz', 'formacion']}
        defaultSelected="datos"
        items={[
          {
            ...carpetas[0],
            children: [
              (carpetas[0].children as TreeViewNode[])[0],
              { ...(carpetas[0].children as TreeViewNode[])[1], dropTarget: true },
            ],
          },
        ]}
      />
    </EnLaBarra>
  ),
};

export const TestAcciones: Story = {
  name: 'Test — el menú de acciones no elige la fila ni le roba el foco',
  tags: ['!dev'],
  render: () => (
    <EnLaBarra>
      <TreeView label="Carpetas" items={carpetas} defaultExpanded={['raiz']} defaultSelected="raiz" />
    </EnLaBarra>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const onboarding = canvas.getByRole('treeitem', { name: 'Onboarding' });
    await expect(onboarding).toHaveAttribute('aria-selected', 'false');

    const disparador = canvas.getByRole('button', { name: 'Acciones de Onboarding' });
    await userEvent.click(disparador);

    // El menú se abrió y la fila NO cambió de estado.
    await expect(await screen.findByRole('menu')).toBeInTheDocument();
    await expect(onboarding).toHaveAttribute('aria-selected', 'false');
    await expect(canvas.getByRole('treeitem', { name: 'Todos los contenidos' })).toHaveAttribute('aria-selected', 'true');

    // Al cerrar, el foco vuelve al disparador, que vive dentro de la fila.
    await userEvent.keyboard('{Escape}');
    // Base UI devuelve el foco al disparador al terminar de cerrar.
    await waitFor(() => expect(disparador).toHaveFocus());
    await expect(onboarding.contains(document.activeElement)).toBe(true);
  },
};

export const TestArrastre: Story = {
  name: 'Test — los estados de arrastre se marcan con data-drop',
  tags: ['!dev'],
  render: () => (
    <EnLaBarra>
      <TreeView
        label="Carpetas"
        defaultExpanded={['raiz']}
        items={[
          {
            ...carpetas[0],
            children: [
              { ...(carpetas[0].children as TreeViewNode[])[0], dropDisabled: true },
              { ...(carpetas[0].children as TreeViewNode[])[1], dropTarget: true },
            ],
          },
        ]}
      />
    </EnLaBarra>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const prohibida = canvas.getByRole('treeitem', { name: 'Formación continua' });
    const destino = canvas.getByRole('treeitem', { name: 'Onboarding' });

    await expect(destino).toHaveAttribute('data-drop', 'target');
    await expect(prohibida).toHaveAttribute('data-drop', 'disabled');
    // Prohibida para soltar, pero NO deshabilitada: sigue navegable y elegible.
    await expect(prohibida).not.toHaveAttribute('aria-disabled');
  },
};
