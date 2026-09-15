import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, screen, userEvent, waitFor, within } from 'storybook/test';
import { Button } from '../../atoms/Button/Button';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Sheet } from './Sheet';
import { SiteShell } from '../../sections/SiteShell/SiteShell';
import { SOLO_OSCURO } from '../../utils/chromaticModes';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixtureEn as EN } from '../../../../.storybook/brandMessagesFixtureEn';

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
    const popup = await screen.findByRole('dialog');
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
    const popup = await screen.findByRole('dialog');
    const close = popup.querySelector('.sheet__close') as HTMLElement;
    await expect(close).toBeInTheDocument();
    await expect(getComputedStyle(close).inlineSize).toBe('48px');
    await expect(getComputedStyle(close.querySelector('.icon')!).width).toBe('48px');
  },
};

/** Test: fuera de `SiteShell` el aspa es `md` (caja 40px, glifo 24px), la talla de aplicación. */
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
    const popup = await screen.findByRole('dialog');
    const close = popup.querySelector('.sheet__close') as HTMLElement;
    await expect(getComputedStyle(close).inlineSize).toBe('40px');
    await expect(getComputedStyle(close.querySelector('.icon')!).width).toBe('24px');
  },
};

/** Test: el aspa va en tinta desde el reposo y no cambia ni de fondo ni de color en hover. */
export const ContratoSinHoverEnCerrar: Story = {
  name: 'Test — sin fondo en hover del aspa',
  tags: ['!dev'],
  args: { open: true, onOpenChange: () => {}, title: 'Detalle', children: null },
  render: () => (
    <Sheet open onOpenChange={fn()} title="Detalle">
      <p>Contenido</p>
    </Sheet>
  ),
  play: async () => {
    const popup = within(await screen.findByRole('dialog'));
    const close = popup.getByRole('button', { name: 'Cerrar' });
    const before = getComputedStyle(close).backgroundColor;
    // La tinta ya está puesta en reposo: es la misma del título del diálogo.
    const tinta = getComputedStyle(popup.getByRole('heading')).color;
    await expect(getComputedStyle(close).color).toBe(tinta);
    await userEvent.hover(close);
    const during = getComputedStyle(close).backgroundColor;
    await expect(during).toBe(before);
    await expect(during).toBe('rgba(0, 0, 0, 0)');
    // Y el hover no la toca.
    await expect(getComputedStyle(close).color).toBe(tinta);
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
    const panel = await screen.findByRole('dialog');
    // Se espera al valor final de la animación de entrada, no al evento
    // `animationend`: donde las animaciones están desactivadas —el navegador de
    // captura de Chromatic— ese evento no llega nunca y el `play` se cuelga.
    await waitFor(() => {
      const cs = getComputedStyle(panel);
      expect(cs.opacity).toBe('1');
      expect(cs.backgroundColor).toBe('rgb(255, 255, 255)');
    });
  },
};

/** Test: igual que `ContratoPanelOpaco`, en superficie oscura. */
export const ContratoPanelOpacoOscuro: Story = {
  name: 'Test — panel opaco en reposo (oscuro)',
  tags: ['!dev'],
  parameters: { surface: 'dark', chromatic: SOLO_OSCURO },
  args: { open: true, onOpenChange: () => {}, title: 'Detalle', children: null },
  render: () => (
    <Sheet open onOpenChange={fn()} title="Detalle">
      <p>Contenido</p>
    </Sheet>
  ),
  play: async () => {
    const panel = await screen.findByRole('dialog');
    // Se espera al valor final de la animación de entrada, no al evento
    // `animationend`: donde las animaciones están desactivadas —el navegador de
    // captura de Chromatic— ese evento no llega nunca y el `play` se cuelga.
    await waitFor(() => {
      const cs = getComputedStyle(panel);
      expect(cs.opacity).toBe('1');
      expect(cs.backgroundColor).toBe('rgb(17, 30, 48)');
    });
  },
};

/**
 * Test: el pie del cajón apila **también en escritorio**. El panel mide lo
 * mismo —320px— en un teléfono que en una pantalla de 27 pulgadas, así que la
 * colocación de su pie la decide el ancho del cajón y no el de la ventana
 * (`@container`, en `dialogSurface.css`). Con la media query de viewport, dos
 * botones se repartían 256px de hueco útil y se quedaban sin sitio para su
 * etiqueta — el caso real es «Cancelar + Guardar» del espacio de trabajo de
 * una oferta.
 */
export const ContratoPieApilaEnElCajon: Story = {
  name: 'Test — el pie del cajón apila aunque la ventana sea ancha',
  tags: ['!dev'],
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Abrir panel' }));

    const dialog = await screen.findByRole('dialog', { name: 'Ajustes del bloque' });
    const pie = dialog.querySelector('.sheet__footer') as HTMLElement;
    const botones = Array.from(pie.querySelectorAll<HTMLElement>('.button'));

    // Cada botón ocupa el pie entero…
    for (const boton of botones) {
      await expect(boton.getBoundingClientRect().width).toBeCloseTo(
        pie.getBoundingClientRect().width,
        0,
      );
    }
    // …y la acción principal —la última del DOM— queda arriba, por el
    // `column-reverse` que comparte con el pie de un `Form`.
    await expect(botones.at(-1)?.textContent).toBe('Guardar');
    await expect(botones.at(-1)!.getBoundingClientRect().bottom).toBeLessThanOrEqual(
      botones[0].getBoundingClientRect().top,
    );
  },
};

/**
 * El panel solo dice una cosa por su cuenta: el nombre del aspa, que sale de
 * `sheet.close`. El título y la descripción son contenido y siguen siendo
 * props —el título, además, obligatorio—.
 */
export const TextosDelProveedor: Story = {
  name: 'Textos desde el proveedor (otro idioma)',
  args: {
    open: true,
    onOpenChange: () => {},
    title: 'Block settings',
    description: 'Changes are saved on close.',
    children: body,
  },
  render: (args) => (
    <BrandMessagesProvider messages={EN}>
      <Sheet {...args} />
    </BrandMessagesProvider>
  ),
};

/** Test: el aspa del cajón sale de `sheet.close`. */
export const ContratoProveedor: Story = {
  name: 'Test — el aspa del cajón lee del proveedor',
  tags: ['!dev'],
  args: {
    open: true,
    onOpenChange: () => {},
    title: 'Block settings',
    children: body,
  },
  render: (args) => (
    <BrandMessagesProvider messages={EN}>
      <Sheet {...args} />
    </BrandMessagesProvider>
  ),
  play: async () => {
    const escena = within(document.body);
    await escena.findByRole('dialog', { name: 'Block settings' });
    await expect(escena.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    await expect(escena.queryByRole('button', { name: 'Cerrar' })).toBeNull();
  },
};
