import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { TreeView, type TreeViewNode } from './TreeView';
import { Icon } from '../../atoms/Icon/Icon';
import { Stack } from '../../atoms/Stack/Stack';

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
