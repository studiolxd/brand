import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { Button } from '../../atoms/Button/Button';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Sheet } from './Sheet';
import { SiteShell } from '../../sections/SiteShell/SiteShell';

const meta = {
  title: 'Molecules/Sheet',
  component: Sheet,
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const body = (
  <>
    <Paragraph>
      El panel deja ver el contexto que hay detrás, a diferencia de un modal
      centrado: sirve para editar algo sin perder de vista dónde estabas.
    </Paragraph>
    <Paragraph>
      Base UI se encarga del foco, del cierre con Escape y del clic fuera.
    </Paragraph>
  </>
);

function Demo(args: Parameters<typeof Sheet>[0]) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet
      {...args}
      open={open}
      onOpenChange={setOpen}
      trigger={<Button variant="outline">Abrir panel</Button>}
    />
  );
}

export const Default: Story = {
  name: 'Desde la derecha',
  args: {
    open: false,
    onOpenChange: () => {},
    title: 'Ajustes del bloque',
    description: 'Los cambios se guardan al cerrar.',
    children: body,
  },
  render: Demo,
};

export const Izquierda: Story = {
  name: 'Desde la izquierda',
  args: { ...Default.args, side: 'left', title: 'Navegación' },
  render: Demo,
};

export const Abajo: Story = {
  name: 'Desde abajo',
  args: { ...Default.args, side: 'bottom', title: 'Detalle' },
  render: Demo,
};

export const ConPie: Story = {
  name: 'Con acciones al pie',
  args: {
    ...Default.args,
    footer: (
      <>
        <Button variant="outline">Cancelar</Button>
        <Button>Guardar</Button>
      </>
    ),
  },
  render: Demo,
};

export const TituloOculto: Story = {
  name: 'Título solo accesible',
  args: {
    ...Default.args,
    title: 'Panel de accesibilidad',
    titleHidden: true,
    description: undefined,
  },
  render: Demo,
};

/**
 * El decorator `withSurface` activa `data-theme="dark"` en `document.documentElement`;
 * como el panel se monta en el portal de Base UI (`document.body`), las
 * custom properties `surface-dark-*` de `Modal` —de las que `Sheet` toma
 * prestadas `bg`, `title-color`, `description-color` y las del aspa— cascadean
 * hasta él sin configuración adicional.
 */
export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: Default.args,
  render: Demo,
};

export const Contrato: Story = {
  name: 'Test — abre, cierra con el aspa y devuelve el foco',
  tags: ['!dev'],
  args: Default.args,
  render: Demo,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Abrir panel' });

    await userEvent.click(trigger);

    const body = within(canvasElement.ownerDocument.body);
    const dialog = await body.findByRole('dialog', { name: 'Ajustes del bloque' });
    const closeButton = within(dialog).getByRole('button', { name: 'Cerrar' });

    // El aspa marca foco visible (tokens propios `sheet.close-*`).
    closeButton.focus();
    await expect(closeButton).toHaveFocus();

    await userEvent.click(closeButton);
    // Base UI mantiene el panel montado durante la animación de salida
    // (`data-closed` + `data-ending-style`) y lo desmonta al terminar.
    await waitFor(() => expect(dialog).not.toBeInTheDocument());
    await expect(trigger).toHaveFocus();
  },
};

/** Test: `id`, `data-*` y los handlers llegan al popup del panel. */
export const ContratoPassthrough: Story = {
  name: 'Test — el popup recibe id, data-* y handlers',
  tags: ['!dev'],
  args: { open: true, onOpenChange: () => {}, title: 'Detalle', children: null },
  render: () => {
    const [clics, setClics] = useState(0);
    return (
      <div onClick={() => setClics((n) => n + 1)}>
        <p data-testid="clics">{clics}</p>
        <Sheet
          open
          onOpenChange={() => {}}
          title="Detalle"
          id="panel"
          data-zona="tarjeta"
          onClick={(event) => event.stopPropagation()}
        >
          <p>Contenido</p>
        </Sheet>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const popup = document.querySelector('.sheet') as HTMLElement;
    await expect(popup).toHaveAttribute('id', 'panel');
    await expect(popup).toHaveAttribute('data-zona', 'tarjeta');
    // La clase propia sigue en su sitio y el lado no se pierde.
    await expect(popup).toHaveClass('sheet');
    await expect(popup).toHaveAttribute('data-side', 'right');

    // El clic dentro del panel no llega a la tarjeta que lo envuelve.
    await userEvent.click(within(popup).getByText('Contenido'));
    await expect(canvas.getByTestId('clics')).toHaveTextContent('0');
  },
};

/**
 * Dentro de `SiteShell` el aspa remapea de `sm` (32px) a `lg` (48px): el
 * `container` apunta al nodo de `SiteShell` para que el portal —que por
 * defecto monta en `document.body`, fuera de `.site-shell`— herede sus
 * tokens.
 */
export const SuperficiePublica: Story = {
  name: 'En la superficie pública',
  parameters: { layout: 'fullscreen' },
  args: { open: true, onOpenChange: () => {}, title: 'Detalle', children: null },
  render: () => {
    const [open, setOpen] = useState(true);
    const [shellNode, setShellNode] = useState<HTMLDivElement | null>(null);
    return (
      <SiteShell ref={setShellNode}>
        <div style={{ padding: 'var(--spacing-6)' }}>
          <Button onClick={() => setOpen(true)}>Abrir panel</Button>
        </div>
        <Sheet
          open={open}
          onOpenChange={setOpen}
          title="Preferencias de cookies"
          description="El cuerpo también lee a 20px, la talla de la superficie pública."
          container={shellNode}
        >
          {body}
        </Sheet>
      </SiteShell>
    );
  },
};

/** Test: sin `SiteShell` el aspa mide `sm` (32px); dentro, `lg` (48px). */
export const ContratoTallaPorSuperficie: Story = {
  name: 'Test — talla del aspa por superficie',
  tags: ['!dev'],
  args: { open: true, onOpenChange: () => {}, title: 'Detalle', children: null },
  render: () => {
    const [shellNode, setShellNode] = useState<HTMLDivElement | null>(null);
    return (
      <SiteShell ref={setShellNode}>
        {shellNode && (
          <Sheet open onOpenChange={fn()} title="En SiteShell" container={shellNode}>
            <p>Contenido</p>
          </Sheet>
        )}
      </SiteShell>
    );
  },
  play: async () => {
    const close = document.querySelector('.sheet__close') as HTMLElement;
    await expect(close).toBeInTheDocument();
    await expect(getComputedStyle(close).inlineSize).toBe('48px');
    await expect(getComputedStyle(close.querySelector('.icon')!).width).toBe('24px');
  },
};

/** Test: fuera de `SiteShell` el aspa se queda en `sm` (32px), la talla de aplicación. */
export const ContratoTallaAplicacion: Story = {
  name: 'Test — talla del aspa fuera de SiteShell',
  tags: ['!dev'],
  args: { open: true, onOpenChange: () => {}, title: 'Detalle', children: null },
  render: () => (
    <Sheet open onOpenChange={fn()} title="Fuera de SiteShell">
      <p>Contenido</p>
    </Sheet>
  ),
  play: async () => {
    const close = document.querySelector('.sheet__close') as HTMLElement;
    await expect(getComputedStyle(close).inlineSize).toBe('32px');
    await expect(getComputedStyle(close.querySelector('.icon')!).width).toBe('16px');
  },
};

/** Test: el aspa no cambia de fondo ni de borde en hover — solo el color del glifo. */
export const ContratoSinHoverEnCerrar: Story = {
  name: 'Test — sin fondo en hover del aspa',
  tags: ['!dev'],
  args: { open: true, onOpenChange: () => {}, title: 'Detalle', children: null },
  render: () => (
    <Sheet open onOpenChange={fn()} title="Detalle">
      <p>Contenido</p>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const close = canvas.getByRole('button', { name: 'Cerrar' });
    const before = getComputedStyle(close).backgroundColor;
    await userEvent.hover(close);
    const during = getComputedStyle(close).backgroundColor;
    await expect(during).toBe(before);
    await expect(during).toBe('rgba(0, 0, 0, 0)');
  },
};

/** Test: el panel del Sheet es completamente opaco en reposo, en claro y en oscuro. */
export const ContratoPanelOpaco: Story = {
  name: 'Test — panel opaco en reposo',
  tags: ['!dev'],
  args: { open: true, onOpenChange: () => {}, title: 'Detalle', children: null },
  render: () => (
    <Sheet open onOpenChange={fn()} title="Detalle">
      <p>Contenido</p>
    </Sheet>
  ),
  play: async () => {
    const panel = document.querySelector('.sheet') as HTMLElement;
    await new Promise((resolve) => panel.addEventListener('animationend', resolve, { once: true }));
    const cs = getComputedStyle(panel);
    await expect(cs.opacity).toBe('1');
    await expect(cs.backgroundColor).toBe('rgb(255, 255, 255)');
  },
};

/** Test: igual que `ContratoPanelOpaco`, en superficie oscura. */
export const ContratoPanelOpacoOscuro: Story = {
  name: 'Test — panel opaco en reposo (oscuro)',
  tags: ['!dev'],
  parameters: { surface: 'dark' },
  args: { open: true, onOpenChange: () => {}, title: 'Detalle', children: null },
  render: () => (
    <Sheet open onOpenChange={fn()} title="Detalle">
      <p>Contenido</p>
    </Sheet>
  ),
  play: async () => {
    const panel = document.querySelector('.sheet') as HTMLElement;
    await new Promise((resolve) => panel.addEventListener('animationend', resolve, { once: true }));
    const cs = getComputedStyle(panel);
    await expect(cs.opacity).toBe('1');
    await expect(cs.backgroundColor).toBe('rgb(17, 30, 48)');
  },
};
