import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { Modal } from './Modal';
import { Button } from '../../atoms/Button/Button';
import { InputField } from '../InputField/InputField';
import { AsyncSelectField } from '../AsyncSelectField/AsyncSelectField';
import type { AsyncSelectOption } from '../AsyncSelectField/AsyncSelectField';
import { AsyncMultiSelectField } from '../AsyncMultiSelectField/AsyncMultiSelectField';
import type { AsyncMultiSelectOption } from '../AsyncMultiSelectField/AsyncMultiSelectField';
import { SiteShell } from '../../sections/SiteShell/SiteShell';

const meta: Meta<typeof Modal> = {
  title: 'Molecules/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

/**
 * Caso (a) del criterio del pie: el principal **ejecuta** algo, así que lleva
 * `Cancelar`. Los botones no van dentro del `<form>`: van en el `footer` del
 * modal, y el submit se ata al formulario con `form="<id>"`.
 */
export const WithForm: Story = {
  name: 'Formulario',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Solicitar ausencia"
          footer={
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button type="submit" form="solicitar-ausencia">Guardar</Button>
            </>
          }
        >
          <form
            id="solicitar-ausencia"
            onSubmit={(e) => { e.preventDefault(); setOpen(false); }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <InputField id="motivo" label="Motivo" placeholder="Indica el motivo" />
            <InputField id="fecha-inicio" label="Fecha de inicio" placeholder="dd/mm/aaaa" />
            <InputField id="fecha-fin" label="Fecha de fin" placeholder="dd/mm/aaaa" />
          </form>
        </Modal>
      </>
    );
  },
};

/**
 * Caso (b), informativo: aquí no se ejecuta nada, solo se lee. Sin `Cancelar`
 * —no hay nada que cancelar—: se cierra con el aspa, con Escape o, como mucho,
 * con un `Cerrar` en el pie.
 */
export const Informativo: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>Ver novedades</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Novedades de la versión"
          footer={<Button variant="outline" onClick={() => setOpen(false)}>Cerrar</Button>}
        >
          <p style={{ margin: 0, color: 'var(--color-text-on-light)' }}>
            Las ausencias ya se aprueban desde el listado, sin entrar en cada
            solicitud. El calendario del equipo enseña los festivos del centro.
          </p>
        </Modal>
      </>
    );
  },
};

const CENTROS = ['Barcelona', 'Madrid', 'Valencia', 'Sevilla'];

/**
 * Caso (b), selector: elegir un ítem **es** la acción y ya cierra el diálogo,
 * así que no hay principal que confirmar ni, por tanto, `Cancelar`. Sin pie:
 * el aspa y Escape son la salida.
 */
export const Selector: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [centro, setCentro] = useState<string | null>(null);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          {centro ? `Centro: ${centro}` : 'Elegir centro'}
        </Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Elegir centro">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '0.5rem' }}>
            {CENTROS.map((nombre) => (
              <Button
                key={nombre}
                variant="text"
                onClick={() => { setCentro(nombre); setOpen(false); }}
              >
                {nombre}
              </Button>
            ))}
          </div>
        </Modal>
      </>
    );
  },
};

export const Confirm: Story = {
  name: 'Confirmación destructiva',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>Cancelar ausencia</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Cancelar ausencia"
          footer={
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>No, volver</Button>
              <Button destructive onClick={() => setOpen(false)}>Sí, cancelar</Button>
            </>
          }
        >
          <p style={{ margin: 0, color: 'var(--color-text-on-light)' }}>
            ¿Seguro que quieres cancelar esta ausencia? Esta acción no se puede deshacer.
          </p>
        </Modal>
      </>
    );
  },
};

/**
 * El decorator `withSurface` activa `data-theme="dark"` en `document.documentElement`
 * (no envuelve la story en `.surface-dark`), así que las custom properties
 * `surface-dark-*` cascadean hasta el portal del modal en `document.body` sin
 * configuración adicional.
 */
export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Solicitar ausencia">
          <form
            onSubmit={(e) => { e.preventDefault(); setOpen(false); }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <InputField id="motivo-dark" label="Motivo" placeholder="Indica el motivo" />
            <Button type="submit">Guardar</Button>
          </form>
        </Modal>
      </>
    );
  },
};

/**
 * Dentro de `SiteShell` el aspa de cerrar remapea de `md` (caja 40px, glifo
 * 24px: el resto de la aplicación) a `lg` (caja y glifo 48px): el `container`
 * apunta al nodo de `SiteShell` para que el portal —que por defecto monta en
 * `document.body`, fuera de `.site-shell`— herede sus tokens.
 */
export const SuperficiePublica: Story = {
  name: 'En la superficie pública',
  parameters: { layout: 'fullscreen' },
  render: () => {
    const [open, setOpen] = useState(true);
    const [shellNode, setShellNode] = useState<HTMLDivElement | null>(null);
    return (
      <SiteShell ref={setShellNode}>
        <div style={{ padding: 'var(--spacing-6)' }}>
          <Button onClick={() => setOpen(true)}>Abrir modal</Button>
        </div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Preferencias de cookies"
          container={shellNode}
        >
          <p style={{ margin: 0, color: 'var(--color-text-on-light)' }}>
            El cuerpo también lee a 20px, la talla de la superficie pública.
          </p>
        </Modal>
      </SiteShell>
    );
  },
};

/** Test: sin `SiteShell` el aspa es `md` (40/24px); dentro, `lg` (48/48px). */
export const ContratoTallaPorSuperficie: Story = {
  name: 'Test — talla del aspa por superficie',
  tags: ['!dev'],
  render: () => {
    const [shellNode, setShellNode] = useState<HTMLDivElement | null>(null);
    return (
      <SiteShell ref={setShellNode}>
        {shellNode && (
          <Modal open onClose={fn()} title="En SiteShell" container={shellNode}>
            <p>Contenido</p>
          </Modal>
        )}
      </SiteShell>
    );
  },
  play: async () => {
    const close = document.querySelector('.modal__close') as HTMLElement;
    await expect(close).toBeInTheDocument();
    await expect(getComputedStyle(close).inlineSize).toBe('48px');
    await expect(getComputedStyle(close.querySelector('.icon')!).width).toBe('48px');
  },
};

/** Test: fuera de `SiteShell` el aspa es `md` (caja 40px, glifo 24px), la talla de aplicación. */
export const ContratoTallaAplicacion: Story = {
  name: 'Test — talla del aspa fuera de SiteShell',
  tags: ['!dev'],
  render: () => (
    <Modal open onClose={fn()} title="Fuera de SiteShell">
      <p>Contenido</p>
    </Modal>
  ),
  play: async () => {
    const close = document.querySelector('.modal__close') as HTMLElement;
    await expect(getComputedStyle(close).inlineSize).toBe('40px');
    await expect(getComputedStyle(close.querySelector('.icon')!).width).toBe('24px');
  },
};

/** Test: el aspa va en tinta desde el reposo y no cambia ni de fondo ni de color en hover. */
export const ContratoSinHoverEnCerrar: Story = {
  name: 'Test — sin fondo en hover del aspa',
  tags: ['!dev'],
  render: () => (
    <Modal open onClose={fn()} title="Detalle">
      <p>Contenido</p>
    </Modal>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const close = canvas.getByRole('button', { name: 'Cerrar' });
    const before = getComputedStyle(close).backgroundColor;
    // La tinta ya está puesta en reposo: es la misma del título del diálogo.
    const tinta = getComputedStyle(canvas.getByRole('heading')).color;
    await expect(getComputedStyle(close).color).toBe(tinta);
    await userEvent.hover(close);
    const during = getComputedStyle(close).backgroundColor;
    await expect(during).toBe(before);
    await expect(during).toBe('rgba(0, 0, 0, 0)');
    // Y el hover no la toca.
    await expect(getComputedStyle(close).color).toBe(tinta);
  },
};

/** Test: el panel del modal es completamente opaco en reposo, en claro y en oscuro. */
export const ContratoPanelOpaco: Story = {
  name: 'Test — panel opaco en reposo',
  tags: ['!dev'],
  render: () => (
    <Modal open onClose={fn()} title="Detalle">
      <p>Contenido</p>
    </Modal>
  ),
  play: async () => {
    const panel = document.querySelector('.modal__content') as HTMLElement;
    // Espera a que termine la animación de entrada (motion.duration.base).
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
  render: () => (
    <Modal open onClose={fn()} title="Detalle">
      <p>Contenido</p>
    </Modal>
  ),
  play: async () => {
    const panel = document.querySelector('.modal__content') as HTMLElement;
    await new Promise((resolve) => panel.addEventListener('animationend', resolve, { once: true }));
    const cs = getComputedStyle(panel);
    await expect(cs.opacity).toBe('1');
    await expect(cs.backgroundColor).toBe('rgb(17, 30, 48)');
  },
};

const EMPLOYEES: AsyncSelectOption[] = [
  { value: '1', label: 'Ana García' },
  { value: '2', label: 'Carlos López' },
  { value: '3', label: 'María Fernández' },
  { value: '4', label: 'Juan Martínez' },
  { value: '5', label: 'Laura Sánchez' },
];

function mockSearch(query: string): Promise<AsyncSelectOption[]> {
  return new Promise(resolve =>
    setTimeout(() => {
      const q = query.toLowerCase();
      resolve(q ? EMPLOYEES.filter(e => e.label.toLowerCase().includes(q)) : EMPLOYEES);
    }, 400),
  );
}

export const WithAsyncSelect: Story = {
  name: 'Con AsyncSelect',
  render: () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(null);
    const [selectedOption, setSelectedOption] = useState<AsyncSelectOption | null>(null);
    const [multiValue, setMultiValue] = useState<string[]>([]);
    const [selectedMulti, setSelectedMulti] = useState<AsyncMultiSelectOption[]>([]);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir modal con AsyncSelect</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Asignar empleados">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <AsyncSelectField
              id="modal-employee"
              label="Empleado responsable"
              onSearch={mockSearch}
              placeholder="Buscar empleado…"
              value={value}
              selectedOption={selectedOption}
              onValueChange={(v, opt) => { setValue(v); setSelectedOption(opt); }}
            />
            <AsyncMultiSelectField
              id="modal-employees"
              label="Equipo"
              onSearch={q => mockSearch(q) as Promise<AsyncMultiSelectOption[]>}
              placeholder="Buscar empleados…"
              value={multiValue}
              selectedOptions={selectedMulti}
              onValueChange={(vals) => {
                setMultiValue(vals);
                setSelectedMulti(EMPLOYEES.filter(e => vals.includes(e.value)));
              }}
            />
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-on-light)' }}>
              Responsable: <strong>{selectedOption?.label ?? '(ninguno)'}</strong>
              {' · '}
              Equipo: <strong>{selectedMulti.map(e => e.label).join(', ') || '(ninguno)'}</strong>
            </p>
            <Button onClick={() => setOpen(false)}>Guardar</Button>
          </div>
        </Modal>
      </>
    );
  },
};

export const WithLongContent: Story = {
  name: 'Contenido largo (scroll)',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir modal con contenido largo</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Listado de empleados">
          <ul style={{ margin: '0 0 1.5rem', padding: '0 0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {Array.from({ length: 30 }, (_, i) => (
              <li key={i} style={{ color: 'var(--color-text-on-light)' }}>
                Empleado {i + 1} — ejemplo de fila con contenido
              </li>
            ))}
          </ul>
          <Button onClick={() => setOpen(false)}>Cerrar</Button>
        </Modal>
      </>
    );
  },
};

export const NoTitle: Story = {
  name: 'Sin título',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>Abrir modal sin título</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <p style={{ margin: 0, color: 'var(--color-text-on-light)' }}>
            Este modal no tiene título. Solo se muestra el botón de cierre.
            El nombre accesible lo provee un elemento visualmente oculto.
          </p>
        </Modal>
      </>
    );
  },
};

export const WithDescription: Story = {
  name: 'Con descripción',
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Cancelar ausencia"
        description="Se notificará a tu responsable y la ausencia dejará de contar en el calendario del equipo."
      >
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <Button variant="outline" onClick={() => setOpen(false)}>No, volver</Button>
          <Button destructive onClick={() => setOpen(false)}>Sí, cancelar</Button>
        </div>
      </Modal>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    await expect(canvas.getByRole('dialog')).toHaveAccessibleDescription(
      'Se notificará a tu responsable y la ausencia dejará de contar en el calendario del equipo.',
    );
  },
};

export const WithExternalDescription: Story = {
  name: 'Descripción externa (aria-describedby)',
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Eliminar proyecto"
        aria-describedby="modal-external-description"
      >
        <p id="modal-external-description" style={{ margin: '0 0 1.5rem', color: 'var(--color-text-on-light)' }}>
          El proyecto y todas sus tareas se eliminarán de forma permanente.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button destructive onClick={() => setOpen(false)}>Eliminar</Button>
        </div>
      </Modal>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    await expect(canvas.getByRole('dialog')).toHaveAccessibleDescription(
      'El proyecto y todas sus tareas se eliminarán de forma permanente.',
    );
  },
};

export const CustomLabels: Story = {
  name: 'Textos personalizados (i18n)',
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeLabel="Close"
        fallbackTitle="Dialog"
      >
        <p style={{ margin: 0, color: 'var(--color-text-on-light)' }}>
          Modal sin título con `closeLabel`/`fallbackTitle` en inglés.
        </p>
      </Modal>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    await expect(canvas.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    await expect(canvas.getByText('Dialog')).toBeInTheDocument();
  },
};

/**
 * Barrera de eventos: el modal se abre desde una tarjeta clicable, y el clic
 * dentro del diálogo no debe llegar a la tarjeta. Los handlers viajan al popup
 * con `{...rest}`, así que la barrera se pone en el propio `Modal` — sin
 * envolverlo en `div`s de producto.
 */
export const BarreraDeEventos: Story = {
  name: 'Barrera de eventos',
  render: () => {
    const [open, setOpen] = useState(false);
    const [clicsEnLaTarjeta, setClics] = useState(0);
    return (
      <div
        onClick={() => setClics((n) => n + 1)}
        style={{ padding: 'var(--spacing-5)', border: '1px solid currentColor', cursor: 'pointer' }}
      >
        <p>Clics en la tarjeta: {clicsEnLaTarjeta}</p>
        <Button onClick={() => setOpen(true)}>Abrir</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Detalle"
          onClick={(event) => event.stopPropagation()}
        >
          <p>El clic aquí dentro no sale del diálogo.</p>
        </Modal>
      </div>
    );
  },
};

/** Test: `id`, `data-*` y los handlers llegan al popup del diálogo. */
export const ContratoPassthrough: Story = {
  name: 'Test — el popup recibe id, data-* y handlers',
  tags: ['!dev'],
  render: () => {
    const [clics, setClics] = useState(0);
    return (
      <div onClick={() => setClics((n) => n + 1)}>
        <p data-testid="clics">{clics}</p>
        <Modal
          open
          onClose={fn()}
          title="Detalle"
          id="dialogo"
          data-zona="tarjeta"
          onClick={(event) => event.stopPropagation()}
        >
          <p>Contenido</p>
        </Modal>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const popup = document.querySelector('.modal__content') as HTMLElement;
    await expect(popup).toHaveAttribute('id', 'dialogo');
    await expect(popup).toHaveAttribute('data-zona', 'tarjeta');

    // El clic dentro del diálogo no llega a la tarjeta que lo envuelve.
    await userEvent.click(within(popup).getByText('Contenido'));
    await expect(canvas.getByTestId('clics')).toHaveTextContent('0');
  },
};

/**
 * Test (B1, auditoría 2026-08-30): al abrir, el foco entra en el panel — antes
 * se quedaba en el disparador, detrás del velo — y al cerrar vuelve al
 * disparador. El motor es Base UI; el Modal solo deja de estorbarle.
 */
export const ContratoFocoAlAbrir: Story = {
  name: 'Test — el foco entra en el diálogo al abrir',
  tags: ['!dev'],
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Detalle">
          <p>Contenido</p>
        </Modal>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const disparador = canvas.getByRole('button', { name: 'Abrir modal' });
    await userEvent.click(disparador);

    const popup = await within(document.body).findByRole('dialog');
    await waitFor(() => expect(popup.contains(document.activeElement)).toBe(true));
    // El primer elemento focable del panel es el aspa de cerrar.
    await expect(within(popup).getByRole('button', { name: 'Cerrar' })).toHaveFocus();

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(disparador).toHaveFocus());
  },
};

/**
 * Test (B1): un contenido que quiere otro destino inicial lo pide con
 * `initialFocus` — así lo hace `ConfirmDialog` con su salida segura.
 */
export const ContratoFocoInicialPropio: Story = {
  name: 'Test — initialFocus manda sobre el aspa',
  tags: ['!dev'],
  render: () => {
    const destino = useRef<HTMLInputElement>(null);
    return (
      <Modal open onClose={fn()} title="Solicitar ausencia" initialFocus={destino}>
        <InputField id="motivo" label="Motivo" ref={destino} />
      </Modal>
    );
  },
  play: async () => {
    const popup = await within(document.body).findByRole('dialog');
    await waitFor(async () => {
      await expect(within(popup).getByRole('textbox', { name: 'Motivo' })).toHaveFocus();
    });
  },
};

/**
 * El pie del diálogo: fila alineada a la derecha en escritorio y, por debajo
 * del punto de ruptura `md`, botones a todo el ancho y apilados con la acción
 * principal arriba. Es el criterio de las acciones de `Form`, `column-reverse`
 * incluido — estrecha la ventana para verlo.
 */
export const ConPie: Story = {
  name: 'Con pie de acciones',
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Guardar cambios"
          footer={
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button onClick={() => setOpen(false)}>Guardar</Button>
            </>
          }
        >
          <p style={{ margin: 0 }}>Los cambios se aplicarán a toda la organización.</p>
        </Modal>
      </>
    );
  },
};

export const ContratoPieDelDialogo: Story = {
  name: 'Test — el pie apila con la principal arriba',
  tags: ['!dev'],
  render: () => (
    <Modal
      open
      onClose={fn()}
      title="Guardar cambios"
      footer={
        <>
          <Button variant="outline">Cancelar</Button>
          <Button>Guardar</Button>
        </>
      }
    >
      <p>Contenido</p>
    </Modal>
  ),
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument;
    const pie = doc.querySelector('.modal__footer') as HTMLElement;
    await expect(pie).not.toBeNull();
    // La principal va la última del DOM —el orden de la fila—, y en columna es
    // `column-reverse` quien la sube arriba: el mismo trato que en `Form`.
    const botones = Array.from(pie.querySelectorAll('button'));
    await expect(botones.at(-1)?.textContent).toBe('Guardar');
    await expect(getComputedStyle(pie).display).toBe('flex');
    // El pie queda fuera del cuerpo desplazable: los botones no se van con el
    // scroll del contenido.
    await expect(pie.closest('.modal__body')).toBeNull();
  },
};

/**
 * Un título que no cabe en una línea no mueve el aspa: sigue a la altura de la
 * **primera** línea, que es donde la mano la busca y donde queda el borde
 * superior del panel.
 */
export const TituloLargo: Story = {
  name: 'Título de dos líneas',
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Confirmar la baja de la organización y de todos sus proyectos"
          footer={
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button onClick={() => setOpen(false)}>Dar de baja</Button>
            </>
          }
        >
          <p>Esta acción no se puede deshacer.</p>
        </Modal>
      </>
    );
  },
};

/** Test: con el título en dos líneas, el aspa se centra sobre la primera. */
export const ContratoAspaEnLaPrimeraLinea: Story = {
  name: 'Test — el aspa se alinea con la primera línea del título',
  tags: ['!dev'],
  render: () => (
    <Modal
      open
      onClose={fn()}
      title="Confirmar la baja de la organización y de todos sus proyectos"
    >
      <p>Contenido</p>
    </Modal>
  ),
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument;
    const titulo = doc.querySelector('.modal__title') as HTMLElement;
    const aspa = doc.querySelector('.modal__close') as HTMLElement;
    const cajaTitulo = titulo.getBoundingClientRect();
    const cajaAspa = aspa.getBoundingClientRect();
    const interlineado = parseFloat(getComputedStyle(titulo).lineHeight);

    // El caso que motiva la regla: el título ocupa más de una línea.
    await expect(cajaTitulo.height).toBeGreaterThan(interlineado * 1.5);

    // El aspa se centra sobre la primera línea, no sobre el bloque entero.
    const centroPrimeraLinea = cajaTitulo.top + interlineado / 2;
    const centroAspa = cajaAspa.top + cajaAspa.height / 2;
    await expect(Math.abs(centroAspa - centroPrimeraLinea)).toBeLessThanOrEqual(1);
    const centroBloque = cajaTitulo.top + cajaTitulo.height / 2;
    await expect(Math.abs(centroAspa - centroBloque)).toBeGreaterThan(1);
  },
};
