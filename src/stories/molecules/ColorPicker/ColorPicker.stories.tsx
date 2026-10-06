import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, userEvent, waitFor, within } from 'storybook/test';
import { DirectionProvider } from '@base-ui/react/direction-provider';
import { ColorPicker } from './ColorPicker';
import type { ColorPickerPreset } from './ColorPicker';
import { Button } from '../../atoms/Button/Button';
import { ColorSwatch } from '../../atoms/ColorSwatch/ColorSwatch';
import { Inline } from '../../atoms/Inline/Inline';
import { Toggle } from '../../atoms/Toggle/Toggle';
import { Table, TableBody, TableCell, TableRow } from '../Table/Table';
import { Stack } from '../../atoms/Stack/Stack';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixtureEn as EN } from '../../../../.storybook/brandMessagesFixtureEn';

/** La paleta de brand como predefinidos: los primitivos de `tokens/color/`. */
const PALETA: ColorPickerPreset[] = [
  { color: '#111e30', title: 'Prusia' },
  { color: '#baabff', title: 'Lavanda' },
  { color: '#ffcd00', title: 'Amarillo' },
  { color: '#20e38e', title: 'Esmeralda' },
  { color: '#f05e1c', title: 'Cayena' },
  { color: '#ffffff', title: 'Blanco' },
  { color: '#d0d0d0', title: 'Gris claro' },
  { color: '#000000', title: 'Negro' },
];

const meta: Meta<typeof ColorPicker> = {
  title: 'Molecules/ColorPicker',
  component: ColorPicker,
  args: {
    onValueChange: fn(),
    onValueCommitted: fn(),
  },
  argTypes: {
    size: { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'] },
    alpha: { control: { type: 'boolean' } },
    clearable: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

/** Controlado: el valor vive fuera y vuelve en cada cambio. */
function Controlado(args: React.ComponentProps<typeof ColorPicker>) {
  const [valor, setValor] = useState<string | null>(args.value ?? '#baabff');
  return (
    <Inline gap="sm" align="center">
      <ColorPicker
        {...args}
        value={valor}
        onValueChange={(hex) => { setValor(hex); args.onValueChange?.(hex); }}
        onClear={() => { setValor(null); args.onClear?.(); }}
      />
      <code>{valor ?? '—'}</code>
    </Inline>
  );
}

export const Default: Story = {
  args: { 'aria-label': 'Color de acento' },
  render: (args) => <Controlado {...args} />,
};

/** Los colores del tema, a un clic. Cada uno se anuncia con su `title`. */
export const ConPredefinidos: Story = {
  name: 'Con predefinidos',
  args: { 'aria-label': 'Color de acento', presets: PALETA },
  render: (args) => <Controlado {...args} />,
};

/** `alpha` pinta la banda de opacidad y emite `#rrggbbaa`. */
export const ConTransparencia: Story = {
  name: 'Con transparencia',
  args: { 'aria-label': 'Velo de la portada', alpha: true, value: '#111e3080' },
  render: (args) => <Controlado {...args} />,
};

/** `clearable` añade «Quitar color» al pie: el valor pasa a `null`. */
export const ConQuitar: Story = {
  name: 'Con quitar color',
  args: { 'aria-label': 'Color del texto', clearable: true, presets: PALETA },
  render: (args) => <Controlado {...args} />,
};

/** El disparador mide la talla de los controles: 32, 40 y 48. */
export const Tallas: Story = {
  render: () => (
    <Inline gap="md" align="center">
      <ColorPicker size="sm" aria-label="Pequeño" defaultValue="#ffcd00" />
      <ColorPicker size="md" aria-label="Mediano" defaultValue="#ffcd00" />
      <ColorPicker size="lg" aria-label="Grande" defaultValue="#ffcd00" />
    </Inline>
  ),
};

export const Deshabilitado: Story = {
  args: { 'aria-label': 'Color de acento', disabled: true, defaultValue: '#20e38e' },
};

/** `onValueChange` en cada paso; `onValueCommitted` al soltar: el sitio del guardado. */
export const MientrasYAlSoltar: Story = {
  name: 'Mientras se elige y al soltar',
  render: function MientrasYAlSoltar() {
    const [vivo, setVivo] = useState('#f05e1c');
    const [guardado, setGuardado] = useState('#f05e1c');
    return (
      <Stack>
        <ColorPicker aria-label="Color de la categoría" value={vivo} onValueChange={setVivo} onValueCommitted={setGuardado} />
        <span>Mientras se elige: <code>{vivo}</code> · Al soltar: <code>{guardado}</code></span>
      </Stack>
    );
  },
};

export const TextosDelProveedor: Story = {
  name: 'Textos desde el proveedor (otro idioma)',
  render: () => (
    <BrandMessagesProvider messages={EN}>
      <ColorPicker defaultValue="#baabff" alpha clearable presets={PALETA} />
    </BrandMessagesProvider>
  ),
};

// ─── Tests ──────────────────────────────────────────────────────────────────

const abrir = async (canvasElement: HTMLElement, name = 'Color de acento') => {
  const canvas = within(canvasElement);
  const body = within(canvasElement.ownerDocument.body);
  await userEvent.click(canvas.getByRole('button', { name }));
  const panel = await body.findByRole('dialog');
  return { canvas, body, panel };
};

/**
 * Test: el área vive dentro del `Popover` de Base UI. Al abrir, el foco va a
 * su pulgar; las flechas lo mueven sin cerrar el panel; Escape lo cierra y
 * devuelve el foco al disparador.
 */
export const ContratoAreaEnPopover: Story = {
  name: 'Test — el área dentro del panel: foco, teclado y Escape',
  tags: ['!dev'],
  args: { 'aria-label': 'Color de acento', value: '#808080' },
  render: (args) => <Controlado {...args} />,
  play: async ({ canvasElement, args }) => {
    const { canvas, body } = await abrir(canvasElement);
    const area = body.getByRole('slider', { name: 'Saturación y brillo' });
    await waitFor(() => expect(area).toHaveFocus());
    await expect(area).toHaveAttribute('aria-roledescription', 'deslizador bidimensional');
    await expect(area).toHaveAttribute('aria-valuetext', 'Saturación 0 %, brillo 50 %');

    await userEvent.keyboard('{ArrowUp}{ArrowRight}');
    await expect(area).toHaveAttribute('aria-valuetext', 'Saturación 1 %, brillo 51 %');
    await userEvent.keyboard('{PageDown}');
    await expect(area).toHaveAttribute('aria-valuetext', 'Saturación 1 %, brillo 41 %');
    await expect(body.getByRole('dialog')).toBeInTheDocument();
    await expect(args.onValueCommitted).toHaveBeenCalledTimes(3);

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByRole('dialog')).toBeNull());
    await expect(canvas.getByRole('button', { name: 'Color de acento' })).toHaveFocus();
  },
};

/**
 * Test: arrastrar en el área —aunque el puntero acabe fuera del panel— no
 * cuenta como clic fuera: el panel sigue abierto y el gesto se guarda una vez,
 * al soltar.
 */
export const ContratoArrastre: Story = {
  name: 'Test — arrastrar el área no cierra el panel',
  tags: ['!dev'],
  args: { 'aria-label': 'Color de acento', value: '#ff0000' },
  render: (args) => <Controlado {...args} />,
  play: async ({ canvasElement, args }) => {
    const { body } = await abrir(canvasElement);
    const thumb = body.getByRole('slider', { name: 'Saturación y brillo' });
    const area = thumb.parentElement!;
    const rect = area.getBoundingClientRect();
    const pointer = (type: string, x: number, y: number) =>
      area.dispatchEvent(new PointerEvent(type, {
        bubbles: true, cancelable: true, pointerId: 7, pointerType: 'mouse', button: 0, buttons: 1, clientX: x, clientY: y,
      }));

    // Pulsar en el centro, arrastrar hasta muy fuera del panel (abajo a la
    // izquierda: sin saturación ni brillo) y soltar allí.
    pointer('pointerdown', rect.left + rect.width / 2, rect.top + rect.height / 2);
    await waitFor(() => expect(thumb).toHaveFocus());
    pointer('pointermove', rect.left - 200, rect.bottom + 200);
    pointer('pointerup', rect.left - 200, rect.bottom + 200);

    await expect(body.getByRole('dialog')).toBeInTheDocument();
    await expect(thumb).toHaveAttribute('aria-valuetext', 'Saturación 0 %, brillo 0 %');
    await expect(args.onValueCommitted).toHaveBeenCalledTimes(1);
    await expect(args.onValueCommitted).toHaveBeenLastCalledWith('#000000');
  },
};

/** Test: con `DirectionProvider` en RTL, `→` resta saturación. */
export const ContratoRtl: Story = {
  name: 'Test — en RTL la flecha sigue al pulgar',
  tags: ['!dev'],
  args: { 'aria-label': 'Color de acento', value: '#808080' },
  render: (args) => (
    <DirectionProvider direction="rtl">
      <div dir="rtl"><Controlado {...args} value="#bf6060" /></div>
    </DirectionProvider>
  ),
  play: async ({ canvasElement }) => {
    const { body } = await abrir(canvasElement);
    const area = body.getByRole('slider', { name: 'Saturación y brillo' });
    await waitFor(() => expect(area).toHaveFocus());
    await expect(area).toHaveAttribute('aria-valuetext', 'Saturación 50 %, brillo 75 %');
    await userEvent.keyboard('{ArrowRight}');
    await expect(area).toHaveAttribute('aria-valuetext', 'Saturación 49 %, brillo 75 %');
  },
};

/** Test: el hex escrito se emite normalizado, en minúsculas; uno a medias no. */
export const ContratoHex: Story = {
  name: 'Test — el campo hex emite minúsculas',
  tags: ['!dev'],
  args: { 'aria-label': 'Color de acento', value: '#000000' },
  render: (args) => <Controlado {...args} />,
  play: async ({ canvasElement, args }) => {
    const { body } = await abrir(canvasElement);
    const campo = body.getByRole('textbox', { name: 'Hexadecimal' });
    await userEvent.clear(campo);
    await userEvent.type(campo, '#BAAB');
    await expect(args.onValueCommitted).not.toHaveBeenCalled();
    await userEvent.type(campo, 'FF');
    await expect(args.onValueCommitted).toHaveBeenLastCalledWith('#baabff');
  },
};

/** Test: un predefinido emite su hex y queda marcado (`aria-pressed`). */
export const ContratoPredefinidos: Story = {
  name: 'Test — elegir un predefinido',
  tags: ['!dev'],
  args: { 'aria-label': 'Color de acento', value: '#000000', presets: PALETA },
  render: (args) => <Controlado {...args} />,
  play: async ({ canvasElement, args }) => {
    const { body } = await abrir(canvasElement);
    const grupo = body.getByRole('group', { name: 'Colores predefinidos' });
    const lavanda = within(grupo).getByRole('button', { name: 'Lavanda' });
    await expect(lavanda).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(lavanda);
    await expect(args.onValueCommitted).toHaveBeenLastCalledWith('#baabff');
    await expect(lavanda).toHaveAttribute('aria-pressed', 'true');
    await expect(body.getByRole('dialog')).toBeInTheDocument();
  },
};

/** Test: con `alpha` la banda de opacidad emite `#rrggbbaa`. */
export const ContratoAlfa: Story = {
  name: 'Test — la opacidad emite ocho dígitos',
  tags: ['!dev'],
  args: { 'aria-label': 'Color de acento', value: '#111e30', alpha: true },
  render: (args) => <Controlado {...args} />,
  play: async ({ canvasElement, args }) => {
    const { body } = await abrir(canvasElement);
    const opacidad = body.getByRole('slider', { name: 'Opacidad' });
    opacidad.focus();
    await userEvent.keyboard('{PageDown}');
    await expect(args.onValueCommitted).toHaveBeenLastCalledWith('#111e30e6');
  },
};

/** Test: «Quitar color» llama a `onClear` y cierra el panel. */
export const ContratoQuitar: Story = {
  name: 'Test — quitar el color',
  tags: ['!dev'],
  args: { 'aria-label': 'Color de acento', value: '#ffcd00', clearable: true, onClear: fn() },
  render: (args) => <Controlado {...args} />,
  play: async ({ canvasElement, args }) => {
    const { canvas, body } = await abrir(canvasElement);
    await userEvent.click(body.getByRole('button', { name: 'Quitar color' }));
    await expect(args.onClear).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(body.queryByRole('dialog')).toBeNull());
    await expect(canvas.getByText('—')).toBeInTheDocument();
  },
};

/** Test: el disparador mide la talla del sistema (32/40/48), como un campo. */
export const ContratoTalla: Story = {
  name: 'Test — talla del sistema',
  tags: ['!dev'],
  render: () => (
    <div>
      <div data-t="sm"><ColorPicker size="sm" aria-label="sm" /></div>
      <div data-t="md"><ColorPicker size="md" aria-label="md" /></div>
      <div data-t="lg"><ColorPicker size="lg" aria-label="lg" /></div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const lado = (sel: string) => {
      const rect = canvasElement.querySelector(sel)!.getBoundingClientRect();
      return [Math.round(rect.width), Math.round(rect.height)];
    };
    await expect(lado('[data-t="sm"] .color-picker__trigger')).toEqual([32, 32]);
    await expect(lado('[data-t="md"] .color-picker__trigger')).toEqual([40, 40]);
    await expect(lado('[data-t="lg"] .color-picker__trigger')).toEqual([48, 48]);
  },
};

/**
 * Test: con `open` controlado, quien lo usa cierra el panel al elegir —en
 * `onValueCommitted`—, que es lo que hace la celda de una tabla.
 */
export const ContratoAperturaControlada: Story = {
  name: 'Test — apertura controlada: se cierra al elegir',
  tags: ['!dev'],
  args: { 'aria-label': 'Color de acento', presets: PALETA, onOpenChange: fn() },
  render: function AperturaControlada(args) {
    const [abierto, setAbierto] = useState(false);
    const [valor, setValor] = useState<string | null>('#000000');
    return (
      <Inline gap="sm" align="center">
        <ColorPicker
          {...args}
          value={valor}
          open={abierto}
          onOpenChange={(next, details) => { setAbierto(next); args.onOpenChange?.(next, details); }}
          onValueChange={setValor}
          onValueCommitted={(hex) => { args.onValueCommitted?.(hex); setAbierto(false); }}
        />
        <code>{valor}</code>
      </Inline>
    );
  },
  play: async ({ canvasElement, args }) => {
    const { canvas, body } = await abrir(canvasElement);
    await expect(args.onOpenChange).toHaveBeenLastCalledWith(true, expect.anything());
    await userEvent.click(within(body.getByRole('group', { name: 'Colores predefinidos' })).getByRole('button', { name: 'Cayena' }));
    await expect(args.onValueCommitted).toHaveBeenLastCalledWith('#f05e1c');
    await waitFor(() => expect(body.queryByRole('dialog')).toBeNull());
    await expect(canvas.getByText('#f05e1c')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Color de acento' })).toHaveAttribute('aria-expanded', 'false');
  },
};

/**
 * Disparador propio: un `Toggle` de barra de herramientas con su glifo y, al
 * lado, la muestra pequeña del color actual. El `pressed` lo decide quien lo
 * usa —aquí, que haya color—; el selector le pone lo del disparador.
 */
function ConDisparadorPropio(args: React.ComponentProps<typeof ColorPicker>) {
  const [valor, setValor] = useState<string | null>(args.value ?? '#f05e1c');
  return (
    <Inline gap="sm" align="center">
      <ColorPicker
        {...args}
        value={valor}
        onValueChange={(hex) => { setValor(hex); args.onValueChange?.(hex); }}
        onClear={() => { setValor(null); args.onClear?.(); }}
        trigger={(
          <Toggle size="sm" pressed={valor !== null}>
            A
            <ColorSwatch size="sm" color={valor} />
          </Toggle>
        )}
      />
      <code>{valor ?? '—'}</code>
    </Inline>
  );
}

export const DisparadorPropio: Story = {
  name: 'Con disparador propio',
  args: { 'aria-label': 'Color del texto', presets: PALETA, clearable: true },
  render: (args) => <ConDisparadorPropio {...args} />,
};

const CELDAS = ['A1', 'B1', 'A2', 'B2'];

/**
 * Anclado sin disparador: el panel lo abre otra cosa —aquí el botón de cada
 * celda; en un editor, su menú contextual— y se coloca contra la celda. No se
 * pinta ninguna muestra: `open` controlado y `anchor`.
 */
function CeldasConColor(args: React.ComponentProps<typeof ColorPicker>) {
  const [colores, setColores] = useState<Record<string, string | null>>({ A1: '#baabff' });
  const [abierta, setAbierta] = useState<{ celda: string; ancla: HTMLElement } | null>(null);
  const elegir = (celda: string, hex: string | null) => setColores((prev) => ({ ...prev, [celda]: hex }));
  const fila = (celdas: string[]) => (
    <TableRow>
      {celdas.map((celda) => (
        <TableCell key={celda}>
          <Inline gap="sm" align="center">
            <ColorSwatch size="sm" color={colores[celda] ?? null} />
            <Button
              variant="text"
              size="sm"
              onClick={(event) => {
                const ancla = event.currentTarget.closest('td');
                if (ancla) setAbierta({ celda, ancla });
              }}
            >
              {`Color de ${celda}`}
            </Button>
          </Inline>
        </TableCell>
      ))}
    </TableRow>
  );
  return (
    <>
      <Table caption="Celdas con color de fondo">
        <TableBody>
          {fila(CELDAS.slice(0, 2))}
          {fila(CELDAS.slice(2))}
        </TableBody>
      </Table>
      {abierta && (
        <ColorPicker
          {...args}
          dialogLabel={`Fondo de ${abierta.celda}`}
          anchor={abierta.ancla}
          value={colores[abierta.celda] ?? null}
          open
          onOpenChange={(next, details) => {
            if (!next) setAbierta(null);
            args.onOpenChange?.(next, details);
          }}
          onValueCommitted={(hex) => {
            elegir(abierta.celda, hex);
            setAbierta(null);
            args.onValueCommitted?.(hex);
          }}
          onClear={() => {
            elegir(abierta.celda, null);
            setAbierta(null);
          }}
        />
      )}
    </>
  );
}

export const AncladoSinDisparador: Story = {
  name: 'Anclado sin disparador',
  args: { presets: PALETA, clearable: true },
  render: (args) => <CeldasConColor {...args} />,
};

/**
 * Test: el disparador propio abre el panel con el ratón y con el teclado,
 * lleva `aria-expanded` y la descripción del valor, y Escape devuelve el foco.
 */
export const ContratoDisparadorPropio: Story = {
  name: 'Test — disparador propio: apertura, aria-expanded, Escape y foco',
  tags: ['!dev'],
  // a11y falso positivo (D16): `aria-hidden-focus` salta en los `span[data-base-ui-focus-guard]`
  // que Base UI pone alrededor del popup, que siguen montados mientras el panel
  // acaba de cerrarse tras el Escape. Son centinelas `aria-hidden` con
  // `tabindex="0"` que devuelven el foco al popup o al disparador: que el lector
  // no los vea es justo lo correcto.
  parameters: { a11y: { config: { rules: [{ id: 'aria-hidden-focus', enabled: false }] } } },
  args: { 'aria-label': 'Color del texto', value: '#f05e1c' },
  render: (args) => <ConDisparadorPropio {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const boton = canvas.getByRole('button', { name: 'Color del texto' });
    await expect(canvasElement.querySelector('.color-picker__trigger')).toBeNull();
    await expect(boton).toHaveClass('toggle');
    await expect(boton).toHaveAttribute('aria-haspopup', 'dialog');
    await expect(boton).toHaveAttribute('aria-pressed', 'true');
    await expect(boton).toHaveAccessibleDescription('Color actual: #f05e1c');
    await expect(boton).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(boton);
    await body.findByRole('dialog');
    await expect(boton).toHaveAttribute('aria-expanded', 'true');
    await waitFor(() => expect(body.getByRole('slider', { name: 'Saturación y brillo' })).toHaveFocus());
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByRole('dialog')).toBeNull());
    await expect(boton).toHaveAttribute('aria-expanded', 'false');
    await waitFor(() => expect(boton).toHaveFocus());

    // Con el teclado, igual.
    await userEvent.keyboard('{Enter}');
    await body.findByRole('dialog');
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(boton).toHaveFocus());
  },
};

/**
 * Test: sin disparador, el panel se abre con `open` contra la celda y, al
 * cerrarse con Escape, el foco vuelve a donde estaba antes de abrir.
 */
export const ContratoAncla: Story = {
  name: 'Test — anclado sin disparador: open controlado y foco de vuelta',
  tags: ['!dev'],
  args: { presets: PALETA },
  render: (args) => <CeldasConColor {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await expect(canvasElement.querySelector('.color-picker__trigger')).toBeNull();
    const abre = canvas.getByRole('button', { name: 'Color de B2' });
    await userEvent.click(abre);
    const panel = await body.findByRole('dialog', { name: 'Fondo de B2' });
    // El panel cae bajo la celda, no en otro sitio.
    const celda = abre.closest('td') as HTMLElement;
    await waitFor(() => {
      const a = celda.getBoundingClientRect();
      const p = panel.getBoundingClientRect();
      expect(Math.round(p.top)).toBeGreaterThanOrEqual(Math.round(a.bottom));
      expect(Math.abs(p.left - a.left)).toBeLessThan(2);
    });
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByRole('dialog')).toBeNull());
    await waitFor(() => expect(abre).toHaveFocus());
  },
};
